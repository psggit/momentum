/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import SectionOneImage from "./../Images/graphicss.png";
import SectionTwoImage from "./../Images/product.png";
import SectionThreeImage from "./../Images/graphics.png";
import SectionFourthImage from "./../Images/apps.png";
import clsx from "clsx";
import WrapperBox from "../Components/WrapperBox";
import { useTranslation } from "react-i18next";
import SectionOneBg from "./../Images/section1bg.png";
import SectionTwoBg from "./../Images/section2bg.png";

const Home = () => {
  const classes = useStyles();
  const { t, i18n } = useTranslation("translation", { keyPrefix: "home" });

  const { data, error, status } = useQuery(
    "users",
    () => fetch("http://booksapi.nzlouis.com/api/authors"),
    {
      refetchInterval: 200000,
      refetchOnMount: false,
    }
  );

  useEffect(() => {
    const defaultLang = localStorage.getItem("language");
    i18n.changeLanguage(defaultLang ? defaultLang : "en");
  }, []);

  return (
    <WrapperBox>
      <div className={classes.container}>
        <div
          className={clsx(classes.section, classes.section1)}
          style={{ backgroundImage: `url(${SectionOneBg})` }}
        >
          <div className={classes.note}>
            <h1>{t("section1.title")}</h1>
            <p>{t("section1.note")}</p>
            <Button
              variant="contained"
              className="demo"
              color="primary"
              classes={{ root: classes.root }}
            >
              {t("section1.btnText")}
            </Button>
          </div>
          <div style={{ textAlign: "end" }}>
            <img src={SectionOneImage} alt="" />
          </div>
        </div>
        <div
          className={clsx(classes.section, classes.section2)}
          style={
            {
              // backgroundImage: `url(${SectionTwoBg})`,
              // backgroundPosition: "unset",
              // backgroundSize: "499px 697px",
            }
          }
        >
          <div className={classes.note}>
            <h1>{t("section2.title")}</h1>
            <p>{t("section2.note")}</p>
            <Button
              variant="contained"
              className="demo"
              color="primary"
              classes={{ root: classes.root }}
            >
              {t("section2.btnText")}
            </Button>
          </div>
          <div style={{ textAlign: "end" }}>
            <img src={SectionTwoImage} alt="" />
          </div>
        </div>
        <div className={clsx(classes.section, classes.section3)}>
          <div style={{ textAlign: "end" }}>
            <img src={SectionThreeImage} alt="" />
          </div>
          <div className={classes.note}>
            <h1>{t("section3.title")}</h1>
            <p>{t("section3.note")}</p>
            <Button
              variant="contained"
              className="demo"
              color="primary"
              classes={{ root: classes.root }}
              style={{ backgroundColor: "#102A5E" }}
            >
              {t("section3.btnText")}
            </Button>
          </div>
        </div>
        <div className={clsx(classes.section, classes.section4)}>
          <div className={classes.note}>
            <h1>{t("section4.title")}</h1>
            <p>{t("section4.note")}</p>
            <Button
              variant="contained"
              className="demo"
              color="primary"
              classes={{ root: classes.root }}
              style={{ backgroundColor: "#102A5E" }}
            >
              {t("section4.btnText")}
            </Button>
          </div>
          <div style={{ textAlign: "end" }}>
            <img src={SectionFourthImage} alt="" />
          </div>
        </div>
        {/* <SignupPopup /> */}
      </div>
    </WrapperBox>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    "& h1": {
      lineHeight: "71px",
      fontSize: 65,
    },
    "& p": {
      lineHeight: "35px",
      fontWeight: 300,
      marginBottom: 22,
    },
    "@media (max-width: 900px)": {
      "& h1": {
        fontSize: 30,
        lineHeight: "36px",
      },
    },
  },
  section: {
    padding: "63px 120px",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    color: "#FFFFFF",
    backgroundColor: "#102A5E",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    "@media (max-width: 900px)": {
      flexDirection: "column",
      padding: 50,
      "& img": {
        width: 300,
        height: 300,
      },
    },
  },
  section1: {
    backgroundColor: "#102A5E",
  },
  section2: {
    backgroundColor: "#092152",
  },
  section3: {
    backgroundColor: "#0F63B2",
  },
  section4: {
    backgroundColor: "#638DFF",
    paddingBottom: 100,
  },
  note: {
    textAlign: "left",
    width: "30%",
    "@media (max-width: 900px)": {
      margin: 30,
      width: "100%",
    },
  },
}));

export default Home;
