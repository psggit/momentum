import React, { useState } from "react";
import DialogBox from "../Dialog";
import InputLabel from "../InputLabel";
import Inputbase from "../Inputbase";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { IconButton } from "@mui/material";
import femaleIcon from "./../../Images/female.png";
import maleIcon from "./../../Images/male.png";
import { createUser } from "./../../utils/http/index";

const SignupPopup = () => {
  const [inputs, setInputs] = useState({
    profilePic: "",
    username: "",
    country: "",
    phone: "",
    email: "",
    dob: "",
    gender: "",
  });
  const [isCreatingAccnt, setIsCreatingAccnt] = useState(false);
  const [errorObj, setErrorObj] = useState({
    hasError: false,
    errorMsg: "",
    field: "",
  });

  const classes = useStyles();
  const imageInputRef = React.createRef();

  const uploadImage = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      //setProfilePic(reader.result);
      setInputs({ ...inputs, profilePic: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const uploadFileUpload = () => {
    imageInputRef.current.click();
  };

  const handleCreateAccount = () => {
    validateInputFields();
    if (!errorObj.hasError) {
      createMomentumUser();
    }
  };

  const getFormattedDate = (date) => {
    const formattedDate = new Date(date);
    return `${formattedDate.getDay()}/${formattedDate.getMonth()}/${formattedDate.getFullYear()}`;
  };

  const createMomentumUser = () => {
    setIsCreatingAccnt(true);
    const payload = {
      username: inputs.username,
      dob: getFormattedDate(inputs.dob),
      gender: "female",
      phoneNumber: inputs.phone,
      country: inputs.country,
      mailId: inputs.email,
    };

    createUser(payload)
      .then((response) => {
        console.log("user");
        localStorage.setItem("userInfo", JSON.stringify(response));
        setIsCreatingAccnt(false);
        window.location.href = "/dashboard";
      })
      .catch((error) => {
        setIsCreatingAccnt(false);
        console.log("Error in creating user", error);
      });
  };

  const handleChange = (e) => {
    setErrorObj({ hasError: false, message: "", field: "" });
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const validateInputFields = () => {
    const phoneRegex = /^\d{10}$/;
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    if (inputs.username.trim().length === 0) {
      setErrorObj({
        hasError: true,
        message: "Invalid username",
        field: "username",
      });
    } else if (inputs.country.trim().length === 0) {
      setErrorObj({
        hasError: true,
        message: "Invalid country",
        field: "country",
      });
    } else if (
      inputs.phone.trim().length === 0 ||
      !phoneRegex.test(inputs.phone)
    ) {
      setErrorObj({ hasError: true, message: "Invalid phone", field: "phone" });
    } else if (
      inputs.email.trim().length === 0 ||
      !emailRegex.test(inputs.email)
    ) {
      setErrorObj({ hasError: true, message: "Invalid email", field: "email" });
    } else if (inputs.dob.trim().length === 0) {
      setErrorObj({ hasError: true, message: "Invalid dob", field: "dob" });
    }
  };

  const handleGenderChange = (gender) => {
    setErrorObj({ hasError: false, message: "", field: "" });
    setInputs({ ...inputs, gender: gender });
  };

  return (
    <DialogBox
      id="login"
      title="Create a Account"
      handleCloseDialog={() => {}}
      styleObj={{ width: "561px", maxHeight: "689px", textAlign: "center" }}
    >
      <div className={classes.fileInput} onClick={uploadFileUpload}>
        <div className={classes.uploadImage}>
          <input
            type="file"
            ref={imageInputRef}
            onChange={uploadImage}
            accept="image/*"
            style={{ display: "none" }}
          />
          {inputs.profilePic && (
            <img
              src={inputs.profilePic}
              alt=""
              className={classes.fileInputImage}
            />
          )}
          {!inputs.profilePic && (
            <IconButton className={classes.fileInputImage}>
              <CloudUploadIcon />
            </IconButton>
          )}
        </div>
      </div>
      <div className={classes.genderInfo}>
        <img
          src={maleIcon}
          alt="male"
          onClick={() => handleGenderChange("male")}
        />
        <img
          src={femaleIcon}
          alt="female"
          onClick={() => handleGenderChange("female")}
        />
      </div>
      <div className={classes.inputWrapper}>
        <InputLabel style={{ width: "100%", textAlign: "left" }}>
          User Name
        </InputLabel>
        <Inputbase
          id="inputbase-text"
          classname="input-base-class"
          name="username"
          className={classes.inputbase}
          style={{ width: "100%" }}
          defaultValue={inputs.username}
          handleTextChange={handleChange}
          disabled={isCreatingAccnt}
        />
        {errorObj.hasError && errorObj.field === "username" && (
          <p className={classes.errorNote}>* {errorObj.message}</p>
        )}
      </div>
      <div
        className={classes.inputWrapper}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className={classes.inputField}>
          <InputLabel style={{ width: "100%", textAlign: "left" }}>
            Country
          </InputLabel>
          <Inputbase
            id="inputbase-text"
            classname="input-base-class"
            name="country"
            handleTextChange={handleChange}
            className={classes.inputbase}
            style={{ width: "100%", marginRight: 20 }}
            defaultValue={inputs.country}
            disabled={isCreatingAccnt}
          />
          {errorObj.hasError && errorObj.field === "country" && (
            <p className={classes.errorNote}>* {errorObj.message}</p>
          )}
        </div>
        <div className={classes.inputField}>
          <InputLabel style={{ width: "100%", textAlign: "left" }}>
            Phone Number
          </InputLabel>
          <Inputbase
            id="inputbase-text"
            classname="input-base-class"
            name="phone"
            handleTextChange={handleChange}
            className={classes.inputbase}
            style={{ width: "100%" }}
            defaultValue={inputs.phone}
            disabled={isCreatingAccnt}
          />
          {errorObj.hasError && errorObj.field === "phone" && (
            <p className={classes.errorNote}>* {errorObj.message}</p>
          )}
        </div>
      </div>
      <div
        className={classes.inputWrapper}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className={classes.inputField}>
          <InputLabel style={{ width: "100%", textAlign: "left" }}>
            Email Address
          </InputLabel>
          <Inputbase
            id="inputbase-text"
            classname="input-base-class"
            name="email"
            handleTextChange={handleChange}
            className={classes.inputbase}
            style={{ width: "100%", marginRight: 20 }}
            defaultValue={inputs.email}
            disabled={isCreatingAccnt}
          />
          {errorObj.hasError && errorObj.field === "email" && (
            <p className={classes.errorNote}>* {errorObj.message}</p>
          )}
        </div>
        <div className={classes.inputField}>
          <InputLabel style={{ width: "100%", textAlign: "left" }}>
            Date of Birth
          </InputLabel>
          <Inputbase
            id="inputbase-text"
            type="date"
            classname="input-base-class"
            name="dob"
            handleTextChange={handleChange}
            className={classes.inputbase}
            style={{ width: "100%" }}
            defaultValue={inputs.dob}
            disabled={isCreatingAccnt}
          />
          {errorObj.hasError && errorObj.field === "dob" && (
            <p className={classes.errorNote}>* {errorObj.message}</p>
          )}
        </div>
      </div>
      <p className={classes.note}>
        By clicking on Create you agree to the Terms and Conditions
      </p>
      <Button
        variant="contained"
        className="login"
        color="primary"
        style={{ width: "100%" }}
        onClick={handleCreateAccount}
        disabled={isCreatingAccnt}
      >
        Create Account
      </Button>
    </DialogBox>
  );
};

const useStyles = makeStyles((theme) => ({
  fileInput: {
    cursor: "pointer",
    marginRight: 10,
    marginBottom: 20,
  },
  fileInputImage: {
    width: "130px",
    height: "130px",
    objectFit: "contain",
    borderRadius: "50%",
    border: "1px solid red",
  },
  uploadImage: {
    display: "block",
  },
  genderInfo: {
    display: "inline-block",
    marginBottom: 20,
    "& img": {
      cursor: "pointer",
    },
    "& img:first-child": {
      marginRight: 20,
    },
  },
  inputWrapper: {
    marginBottom: 20,
  },
  inputField: {
    margin: 0,
    width: "48%",
  },
  note: {
    fontSize: 12,
    fontWeight: 600,
    marginBottom: 20,
    textTransform: "uppercase",
    color: "#0F63B2",
  },
  errorNote: {
    color: "#C81922",
    fontSize: 12,
    textAlign: "left",
  },
}));

export default SignupPopup;
