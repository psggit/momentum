/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { homeMenuItems, userMenuItems } from "./routes";
import { makeStyles } from "@mui/styles";
import EngIcon from "./../../Images/united-kingdom.png";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-number-input";
import OtpInput from "react-otp-input";
import "react-phone-number-input/style.css";
import "./header.css";
import "./../../../src/i18n.js";
import clsx from "clsx";
import DialogBox from "../Dialog";
import { authentication } from "../../firebase";
import SignupPopup from "./../../Components/SignupPopup/index";
import {
  //getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getLanguages, loginUser } from "./../../utils/http/index";

const Header = ({ currentRoute, isLoggedIn }) => {
  const classes = useStyles();
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  console.log("isLoggendin", isLoggedIn);

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
    selectedLang: "en",
    isLoginClicked: false,
    showOtpField: false,
    phoneno: "",
    isInvalidOtp: false,
    isSendingCode: false,
    isVerifyingCode: false,
  });

  const [phoneno, setPhoneno] = useState();
  const [otp, setOtp] = useState();

  const [supportedLanguages, setSupportedLanguages] = useState([]);
  const [showSignup, setShowSignup] = useState(false);

  const {
    mobileView,
    drawerOpen,
    selectedLang,
    isLoginClicked,
    showOtpField,
    isSendingCode,
    isInvalidOtp,
    isVerifyingCode,
  } = state;

  useEffect(() => {
    localStorage.setItem("language", "en");
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  useEffect(() => {
    fetchLanguages();
  }, []);

  const fetchLanguages = () => {
    getLanguages()
      .then((response) => {
        console.log("lang resp", response);
        setSupportedLanguages(response);
      })
      .catch((error) => {
        console.log("Error in fetching languages", error);
      });
  };

  const handleChange = useCallback((e) => {
    setState((prevState) => ({ ...prevState, selectedLang: e.target.value }));
    i18n.changeLanguage(e.target.value);
    localStorage.setItem("language", e.target.value);
  }, []);

  const isActive = (path) => {
    return path === currentRoute ? true : false;
  };

  const handleClose = () => {
    setState((prevState) => ({ ...prevState, isLoginClicked: false }));
  };

  const handleLoginClick = () => {
    setState((prevState) => ({ ...prevState, isLoginClicked: true }));
  };

  const handleLogoutClick = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const displayDesktop = () => {
    return (
      <Toolbar className={classes.toolbar}>
        <React.Fragment>
          <div className="logo">Momentum Plus</div>
          <Select
            value={selectedLang}
            onChange={handleChange}
            classes={{ select: classes.select }}
            inputProps={{ "aria-label": "Without label" }}
          >
            {supportedLanguages &&
              supportedLanguages.length > 0 &&
              supportedLanguages.map((language) => {
                return (
                  <MenuItem value={language.code} className={classes.menuItem}>
                    <img src={EngIcon} className={classes.menuItemImg} alt="" />
                    <span>{language.label}</span>
                  </MenuItem>
                );
              })}
          </Select>
        </React.Fragment>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "none", md: "flex" } }}>{getMenuItems()}</Box>
      </Toolbar>
    );
  };

  const handleRouteChange = (selectedRoute) => {
    if (currentRoute !== selectedRoute) window.location.assign(selectedRoute);
  };

  const handleOtpChange = (otp) => {
    setOtp(otp);
    setState((prevState) => ({ ...prevState, isInvalidOtp: false }));
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar className={classes.toolbar}>
        <IconButton
          {...{
            edge: "start",
            color: "inherit",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          {...{
            anchor: "left",
            open: drawerOpen,
            onClose: handleDrawerClose,
            classes: { paper: classes.paper },
          }}
        >
          <div className={classes.drawerContainer}>
            {getDrawerChoices()}
            {!isLoggedIn && (
              <Button
                variant="contained"
                className="login"
                color="primary"
                onClick={handleLoginClick}
              >
                Login / Signup
              </Button>
            )}
            {isLoggedIn && (
              <Button
                variant="contained"
                className="login"
                color="primary"
                onClick={handleLogoutClick}
              >
                Logout
              </Button>
            )}
          </div>
        </Drawer>
        <div className="logo">Momentum Plus</div>
      </Toolbar>
    );
  };

  const getMenuItems = () => {
    return (
      <div className="nav-items">
        {!isLoggedIn &&
          homeMenuItems.map((item) => {
            const active = isActive(item.path);
            return (
              <div
                className={clsx(
                  active ? `active ${classes.activeMenuListItem}` : "",
                  "menu-item"
                )}
                onClick={() => handleRouteChange(item.path)}
              >
                {item.name}
              </div>
            );
          })}

        {isLoggedIn &&
          userMenuItems.map((item) => {
            const active = isActive(item.path);
            return (
              <div
                className={clsx(
                  active ? `active ${classes.activeMenuListItem}` : "",
                  "menu-item"
                )}
                onClick={() => handleRouteChange(item.path)}
              >
                {item.name}
              </div>
            );
          })}

        {!isLoggedIn && (
          <Button
            variant="contained"
            className="login"
            color="primary"
            onClick={handleLoginClick}
          >
            Login / Signup
          </Button>
        )}

        {isLoggedIn && (
          <Button
            variant="contained"
            className="login"
            color="primary"
            onClick={handleLogoutClick}
          >
            Logout
          </Button>
        )}
      </div>
    );
  };

  const getDrawerChoices = () => {
    return homeMenuItems.map(({ name, path }) => {
      const active = isActive(path);
      return (
        <Link
          {...{
            component: RouterLink,
            to: path,
            color: "inherit",
            style: {
              textDecoration: "none",
              display: "flex",
              justifyContent: "center",
            },
            key: name,
          }}
        >
          <MenuItem
            className={clsx(
              active ? `active ${classes.activeMenuListItem}` : "",
              "menu-item"
            )}
            onClick={() => handleRouteChange(path)}
          >
            {name}
          </MenuItem>
        </Link>
      );
    });
  };

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {},
      },
      authentication
    );
  };

  const handleClickHere = () => {
    setState((prevState) => ({ ...prevState, showOtpField: false }));
  };

  const requestOtp = (e) => {
    e.preventDefault();
    setState((prevState) => ({ ...prevState, isSendingCode: true }));
    if (window.recaptchaVerifier === undefined) {
      generateRecaptcha();
    }
    const phoneNumber = phoneno;
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        console.log("otp has been sent");
        setState((prevState) => ({
          ...prevState,
          showOtpField: true,
          isSendingCode: false,
        }));
      })
      .catch((error) => {
        setState((prevState) => ({ ...prevState, isSendingCode: false }));
        console.log("Error in sending otp", error);
      });
  };

  const verifyOtp = async (e) => {
    setState((prevState) => ({ ...prevState, isVerifyingCode: true }));
    window.confirmationResult
      .confirm(otp)
      .then((result) => {
        //const user = result.user;

        //navigate("/dashboard");
        loginUserAccount();
      })
      .catch((error) => {
        setState((prevState) => ({
          ...prevState,
          isInvalidOtp: true,
          isVerifyingCode: false,
        }));
      });
  };

  const loginUserAccount = () => {
    loginUser({
      mobile: phoneno.substring(3),
    })
      .then((response) => {
        //console.log("response", response);
        if (response.message.toLowerCase().includes("existing")) {
          localStorage.setItem("userInfo", JSON.stringify(response.user));
          window.location.href = "/dashboard";
        } else {
          setShowSignup(true);
        }
        setState((prevState) => ({
          ...prevState,
          isVerifyingCode: false,
          isLoginClicked: false,
        }));
      })
      .catch((error) => {
        setState((prevState) => ({
          ...prevState,
          isVerifyingCode: false,
          isLoginClicked: false,
        }));
        console.log("Error in logging user", error);
      });
  };

  return (
    <header id="Header">
      <AppBar classes={{ root: classes.header }}>
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
      {isLoginClicked && (
        <DialogBox
          id="login"
          title="Welcome!"
          handleCloseDialog={handleClose}
          styleObj={{
            width: mobileView ? "100vw" : "561px",
            height: mobileView ? "100vh" : undefined,
            maxHeight: mobileView ? "100vh" : "472px",
          }}
        >
          <div id="recaptcha-container"></div>
          <p className={classes.subtitle}>
            Enter your phone number below and a code will be sent to you for
            verification.
          </p>
          <p className={classes.subheader}>Country Code & Phone Number</p>
          <PhoneInput
            international
            placeholder="Enter phone number"
            value={phoneno}
            onChange={setPhoneno}
            disabled={isSendingCode || showOtpField}
          />
          {!showOtpField && (
            <Button
              variant="contained"
              className={classes.loginBtn}
              color="primary"
              onClick={requestOtp}
              disabled={isSendingCode}
            >
              Send Code
            </Button>
          )}

          {showOtpField && (
            <div style={{ marginTop: 20 }}>
              <p className={classes.subheader}>
                Please enter the verification code
              </p>
              <OtpInput
                numInputs={6}
                value={otp}
                onChange={handleOtpChange}
                inputStyle={{
                  width: "3rem",
                  height: "3rem",
                  borderRadius: 4,
                  border: "1px solid rgba(0,0,0,0.3)",
                }}
              />
              {isInvalidOtp && (
                <p className={classes.errorNote}>* Invalid otp</p>
              )}
            </div>
          )}
          {showOtpField && (
            <>
              <div style={{ display: "flex" }}>
                <Button
                  variant="outlined"
                  className={classes.loginBtn}
                  onClick={requestOtp}
                  style={{ marginRight: 20 }}
                  disabled={isSendingCode}
                >
                  Send New Code
                </Button>
                <Button
                  variant="contained"
                  className={classes.loginBtn}
                  color="primary"
                  onClick={verifyOtp}
                  disabled={isVerifyingCode}
                >
                  Verify Code
                </Button>
              </div>
              <div className={classes.warningContainer}>
                <span className={classes.warning}>
                  Did you enter a wrong number or would you like to change your
                  number?
                </span>
                <a href="#" onClick={() => handleClickHere()}>
                  Click here
                </a>
              </div>
            </>
          )}

          <p className={classes.note}>
            By providing your phone number, you consent to receiving a one-time
            passcode sent by text message to help you sign into App.
          </p>
        </DialogBox>
      )}
      {showSignup && <SignupPopup phone={phoneno} />}
    </header>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 270,
    backgroundColor: "#102A5E !important",
    color: "#ffffff !important",
  },
  header: {
    backgroundColor: "#102A5E !important",
    "@media (max-width: 900px)": {
      marginLeft: 0,
    },
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    height: 103,
    padding: 0,
    margin: 0,
    "@media (max-width: 900px)": {
      margin: 0,
    },
  },
  drawerContainer: {
    padding: "20px 10px",
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
  },
  menuItemImg: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  activeMenuListItem: {
    textDecoration: "underline !important",
    color: "#1C85E8 !important",
  },
  select: {
    border: "none !important",
    display: "flex !important",
    alignItems: "center",
    color: "#ffffff !important",
  },
  subtitle: {
    fontWeight: 400,
    fontSize: 16,
    // lineHeight: 20,
    color: "#74747C",
    marginBottom: 20,
  },
  subheader: {
    fontSize: 13,
    color: "#102453",
    marginBottom: 4,
  },
  note: {
    fontWeight: 400,
    fontSize: 14,
    // lineHeight: 20,
    color: "#74747C",
  },
  loginBtn: {
    marginTop: "20px !important",
    marginBottom: "20px !important",
    width: "100%",
  },
  errorNote: {
    color: "#C81922",
  },
  warningContainer: {
    marginBottom: 10,
  },
  warning: {
    marginRight: 10,
  },
}));

export default Header;
