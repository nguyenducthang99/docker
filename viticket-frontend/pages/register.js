import React, { useState } from "react";
import Router from "next/router";
import axios from "axios";
import { toast } from 'react-toastify';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "components/public/Header/Header.js";
import HeaderLinks from "components/public/Header/HeaderLinks.js";
import Footer from "components/public/Footer/Footer.js";
import GridContainer from "components/public/Grid/GridContainer.js";
import GridItem from "components/public/Grid/GridItem.js";
import Button from "components/public/CustomButtons/Button.js";
import Card from "components/public/Card/Card.js";
import CardBody from "components/public/Card/CardBody.js";
import CardHeader from "components/public/Card/CardHeader.js";
import CardFooter from "components/public/Card/CardFooter.js";
import CustomInput from "components/public/CustomInput/CustomInput.js";

import { API_URL } from "constants/commons.js";

import styles from "styles/jss/nextjs-material-kit/pages/loginPage.js";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  const [state, setState] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async () => {
    const validate = checkValidate();
    if (!validate) return;

    const checkEmail = await axios.get(`${API_URL}/account/check-email/${state.email}`);
    if (checkEmail.status === 200 && checkEmail.data) {
      toast.error(`This email ${state.email} already in use!`);
      return;
    };

    const checkPhone = await axios.get(`${API_URL}/account/check-phone/${state.phone}`);
    if (checkPhone.status === 200 && checkPhone.data) {
      toast.error(`This phone number ${state.phone} already in use!`);
      return;
    };

    register();
  };

  const register = () => {
    const newAccount = {
      PK_iMaTaikhoan: new Date().getTime(),
      sTenNguoidung: state.fullName,
      sEmail: state.email,
      sSodienthoai: state.phone,
      sMatkhau: state.password,
      FK_iMaTrangthai: 2,
      FK_iMaQuyen: 1,
    }
    axios.post(`${API_URL}/account/tao-tai-khoan`, { newAccount })
      .then(res => {
        if (res.status === 200 && res.data) toast.success(`Register new account successfully!`);
        Router.push('/login');
      })
      .catch(err => {
        toast.error(`Somethings wrong when register, please try again!`);
        console.error(err);
      })
  };

  const checkValidate = () => {
    for (const [key, value] of Object.entries(state)) {
      if (value === '') {
        toast.error(`${key} can't be empty!`);
        return;
      }
    }

    const checkValidateEmail = validateEmail(state.email);
    if (!checkValidateEmail) {
      toast.error(`Please enter a valid email address!`);
      return;
    }

    if (state.password.length < 6) {
      toast.error(`The password is too weak. Please make it stronger!`);
      return;
    }

    if (state.password !== state.confirmPassword) {
      toast.error(`Password and confirm password does not match!`);
      return;
    }

    return true;
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const handleInputChange = (e, key) => {
    const newState = { ...state };
    newState[`${key}`] = e.target.value.trim();
    setState(newState);
  };

  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="Viticket"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url('/img/bg7.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justifyContent="center">
            <GridItem xs={12} sm={6} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Register</h4>
                  </CardHeader>
                  <CardBody>
                    <CustomInput
                      labelText="Full Name..."
                      id="first"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: (e) => handleInputChange(e, 'fullName'),
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText="Email..."
                      id="email"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: (e) => handleInputChange(e, 'email'),
                        type: "email",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText="Phone..."
                      id="phone"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: (e) => handleInputChange(e, 'phone'),
                        type: "text",
                        inputMode: 'numeric', pattern: '[0-9]*',
                        endAdornment: (
                          <Icon className={classes.inputIconsColor}>
                            phone
                          </Icon>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText="Password..."
                      id="pass"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: (e) => handleInputChange(e, 'password'),
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
                    />
                    <CustomInput
                      labelText="Confirm Password..."
                      id="confirmpass"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: (e) => handleInputChange(e, 'confirmPassword'),
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color="primary" size="lg" onClick={handleSubmit}>
                      Submit
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
