import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Link from "next/link";
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
import { setUserInfo } from "../store/actions/user"; 
import styles from "styles/jss/nextjs-material-kit/pages/loginPage.js";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  const dispatch = useDispatch();

  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const userInfo = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    if (userInfo) Router.push('/');
  }, [userInfo]);

  const handleOnSubmit = () => {
    const validate = checkValidate();
    if (!validate) return;

    login();
  };

  const login = () => {
    const userInfo = { email: state.email, password: state.password }

    axios.post(`${API_URL}/account/check-dang-nhap`, userInfo)
      .then((res) => {
        if (res.data) {
          const newUserInfo = res.data;
          delete newUserInfo.sMatkhau;
          dispatch(setUserInfo(newUserInfo));
          toast.success(`Login successfully!`);
        } else {
          toast.error(`Username or password is incorrect!`);
        }
      })
      .catch(err => {
        console.error(err);
        toast.error(`Somethings wrong, please check again!`);
      })
  };

  const handleInputChange = (e, key) => {
    const newState = { ...state };
    newState[`${key}`] = e.target.value.trim();
    setState(newState);
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

    return true;
  }

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

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
                    <h4>Sign In</h4>
                  </CardHeader>
                  <CardBody>
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
                      labelText="Password"
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
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <div>
                      <Button simple color="primary" size="lg" onClick={handleOnSubmit}>Login</Button>
                    </div>
                    <div>
                      <Link
                        href="/register"
                      >
                        Create an account now?
                      </Link>
                    </div>
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
