import React, { useEffect, useState } from "react";
import Router from "next/router";
import axios from "axios";
import { toast } from 'react-toastify';
import { format } from 'date-fns'

import { useSelector, useDispatch } from 'react-redux';

// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Save from "@material-ui/icons/Save";
import Email from "@material-ui/icons/Email";
import Phone from "@material-ui/icons/Phone";
import People from "@material-ui/icons/People";
import Lock from "@material-ui/icons/Lock";
import Check from "@material-ui/icons/Check";

import { DropzoneArea } from 'material-ui-dropzone';

// core components
import Header from "components/public/Header/Header.js";
import Footer from "components/public/Footer/Footer.js";
import Button from "components/public/CustomButtons/Button.js";
import GridContainer from "components/public/Grid/GridContainer.js";
import GridItem from "components/public/Grid/GridItem.js";
import HeaderLinks from "components/public/Header/HeaderLinks.js";
import Parallax from "components/public/Parallax/Parallax.js";
import CustomInput from "components/public/CustomInput/CustomInput.js";

import { API_URL } from "constants/commons.js";
import { setUserInfo } from "../store/actions/user"; 
import styles from "styles/jss/nextjs-material-kit/pages/profilePage.js";

const useStyles = makeStyles(styles);
const mapTrangThaiHoSo = {
  1: 'Verified',
  2: 'Pendding',
}

export default function ProfilePage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const dispatch = useDispatch();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  const userInfo = useSelector((state) => state.user.userInfo);

  const [userBasicInfo, setUserBasicInfo] = useState({
    sTenNguoidung: userInfo?.sTenNguoidung,
    sEmail: userInfo?.sEmail,
    sSodienthoai: userInfo?.sSodienthoai,
  });
  const [userPassword, setUserPassword] = useState({
    password: '',
    confirmPassword: '',
  });
  const [userCMND, setUserCMND] = useState({
    sCMND: '',
  });
  const [accountRule, setAccountRule] = useState(null);
  const [verifyHistory, setVerifyHistory] = useState([]);

  useEffect(() => {
    if (userInfo) {
      getAccountRules();
      getVerifyHistory();
    } else {
      Router.push('/');
    }
  }, [userInfo]);

  const getAccountRules = () => {
    axios
      .get(`${API_URL}/account/quyen/${userInfo.FK_iMaQuyen}`)
      .then((res) => {
        if (res.status === 200 && res.data) {
          setAccountRule(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const getVerifyHistory = () => {
    axios
      .get(`${API_URL}/account/ho-so/${userInfo._id}`)
      .then((res) => {
        console.log(res.data)
        if (res.status === 200 && res.data) {
          setVerifyHistory(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeFileBefore = (files) => {
    console.log(files)
  };
  const handleChangeFileAfter = (files) => {
    console.log(files)
  };

  const handleInputInfoChange = (e, key) => {
    const newUserBasicInfo = { ...userBasicInfo };
    newUserBasicInfo[`${key}`] = e.target.value.trim();
    setUserBasicInfo(newUserBasicInfo);
  };

  const handleSubmitInfo = async () => {
    const validate = await checkValidate();
    if (validate) {
      const newInfo = {...userBasicInfo};
      axios.post(`${API_URL}/account/sua-thong-tin/${userInfo._id}`, { newInfo })
        .then(res => {
          if (res.status === 200 && res.data) {
            toast.success(`Update info successfully!`)
            const newUserInfo = {...userInfo, ...newInfo};
            dispatch(setUserInfo(newUserInfo));
          };
        })
        .catch(err => {
          toast.error(`Somethings wrong when update, please try again!`);
          console.error(err);
        })
    }
  }

  const checkValidate = async () => {
    for (const [key, value] of Object.entries(userBasicInfo)) {
      if (value === '') {
        toast.error(`${key} can't be empty!`);
        return;
      }
    }

    const checkValidateEmail = validateEmail(userBasicInfo.sEmail);
    if (!checkValidateEmail) {
      toast.error(`Please enter a valid email address!`);
      return;
    }

    const checkEmail = await axios.get(`${API_URL}/account/check-email/${userInfo.PK_iMaTaikhoan}/${userBasicInfo.sEmail}`);
    if (checkEmail.status === 200 && checkEmail.data) {
      toast.error(`This email ${userBasicInfo.sEmail} already in use!`);
      return;
    };

    const checkPhone = await axios.get(`${API_URL}/account/check-phone/${userInfo.PK_iMaTaikhoan}/${userBasicInfo.sSodienthoai}`);
    if (checkPhone.status === 200 && checkPhone.data) {
      toast.error(`This phone number ${userBasicInfo.sSodienthoai} already in use!`);
      return;
    };

    return true;
  }

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const checkPassword = () => {
    if (userPassword.password.length < 6) {
      toast.error(`The password is too weak. Please make it stronger!`);
      return;
    }

    if (userPassword.password !== userPassword.confirmPassword) {
      toast.error(`Password and confirm password does not match!`);
      return;
    }
    return true;
  }

  const handleInputPasswordChange = (e, key) => {
    const newUserPassword = { ...userPassword };
    newUserPassword[`${key}`] = e.target.value.trim();
    setUserPassword(newUserPassword);
  };

  const handleSubmitPassword = async () => {
    const validate = checkPassword();
    if (validate) {
      const password = userPassword.password;
      axios.post(`${API_URL}/account/doi-mat-khau/${userInfo._id}`, { password })
        .then(res => {
          if (res.status === 200 && res.data) {
            toast.success(`Change password successfully!`)
          };
        })
        .catch(err => {
          toast.error(`Somethings wrong when change password, please try again!`);
          console.error(err);
        })
    }
  }

  const handleInputCMTChange = (e, key) => {
    const newUserCMND = { ...userCMND };
    newUserCMND[`${key}`] = e.target.value.trim();
    setUserCMND(newUserCMND);
  };


  const handleSubmitCMND = async () => {
    const validate = await checkCMND();
    if (validate) {
      const cmnd = {
        PK_iMaHoso: new Date().getTime(), 
        sCMND: userCMND.sCMND,
        createdAt: new Date(),
        sLinkAnhtruoc: '',
        sLinkAnhsau: '',
        FK_iMaTrangthaiHoso: 2,
        FK_iMaTaiKhoan: userInfo._id,
      }

      axios.post(`${API_URL}/account/gui-ho-so/${userInfo._id}`, { cmnd })
        .then(res => {
          if (res.status === 200 && res.data) {
            toast.success(`Submit profile successfully!`)
            getVerifyHistory();
          };
        })
        .catch(err => {
          toast.error(`Somethings wrong when submit profile, please try again!`);
          console.error(err);
        })
    }
  }

  const checkCMND = async () => {
    if (userCMND.sCMND === '') {
      toast.error(`CMND can't be empty!`);
      return;
    }

    const checkCMND = await axios.get(`${API_URL}/account/check-cmnd/${userInfo.PK_iMaTaikhoan}/${userCMND.sCMND}`);
    if (checkCMND.status === 200 && checkCMND.data) {
      toast.error(`This CMND ${userCMND.sCMND} already in use!`);
      return;
    };

    return true;
  }

  const handleSwitchSeller = () => {
    axios.post(`${API_URL}/account/dang-ky-ban/${userInfo._id}`)
      .then(res => {
        if (res.status === 200 && res.data) {
          toast.success(`Switch seller successfully!`)
          const newUserInfo = {...userInfo, FK_iMaQuyen: 2};
          dispatch(setUserInfo(newUserInfo));
        };
      })
      .catch(err => {
        toast.error(`Somethings wrong when switch seller, please try again!`);
        console.error(err);
      })
  }

  if (!userInfo) return null;

  return (
    <div>
      <Header
        color="transparent"
        brand="Viticket"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white",
        }}
        {...rest}
      />
      <Parallax small filter image="/img/profile-bg.jpg" />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div style={{ paddingBottom: "20px" }}>
          <div className={classes.container}>
            <GridContainer justifyContent="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img
                      src="/img/faces/christian.jpg"
                      alt="..."
                      className={imageClasses}
                    />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>{userInfo.sTenNguoidung}</h3>
                    <h6>{accountRule?.sTenQuyen}</h6>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <GridContainer justifyContent="center">
              <GridItem sm={12}>
                <h3 style={{ textAlign: "center" }}>Updates Profile</h3>
              </GridItem>
              <GridItem sm={4}>
                <CustomInput
                  labelText="Fullname..."
                  id="fullName"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    onChange: (e) => handleInputInfoChange(e, 'sTenNguoidung'),
                    defaultValue: userBasicInfo?.sTenNguoidung,
                    endAdornment: (
                      <InputAdornment position="end">
                        <People className={classes.inputIconsColor} />
                      </InputAdornment>
                    ),
                  }}
                />
              </GridItem>
              <GridItem sm={4}>
                <CustomInput
                  labelText="Email..."
                  id="email"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    onChange: (e) => handleInputInfoChange(e, 'sEmail'),
                    defaultValue: userBasicInfo?.sEmail,
                    endAdornment: (
                      <InputAdornment position="end">
                        <Email className={classes.inputIconsColor} />
                      </InputAdornment>
                    ),
                  }}
                />
              </GridItem>
              <GridItem sm={4}>
                <CustomInput
                  labelText="Phone..."
                  id="phone"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    onChange: (e) => handleInputInfoChange(e, 'sSodienthoai'),
                    defaultValue: userBasicInfo?.sSodienthoai,
                    endAdornment: (
                      <InputAdornment position="end">
                        <Phone className={classes.inputIconsColor} />
                      </InputAdornment>
                    ),
                  }}
                />
              </GridItem>
              <GridItem sm={12} style={{ textAlign: "center", marginBottom: "15px" }}>
                <Button round color="success" onClick={handleSubmitInfo}>
                  <Save className={classes.icons} />&nbsp; Save
                </Button>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <div className={classNames(classes.main, classes.mainRaisedNext)}>
        <div style={{ paddingBottom: "20px" }}>
          <div className={classes.container}>
            <GridContainer justifyContent="center">
              <GridItem sm={12}>
                <h3 style={{ textAlign: "center" }}>Change Password</h3>
              </GridItem>
              <GridItem sm={4}>
                <CustomInput
                  labelText="New Password..."
                  id="newPassword"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    onChange: (e) => handleInputPasswordChange(e, 'password'),
                    type: "password",
                    endAdornment: (
                      <InputAdornment position="end">
                        <Lock className={classes.inputIconsColor} />
                      </InputAdornment>
                    ),
                  }}
                />
              </GridItem>
              <GridItem sm={4}>
                <CustomInput
                  labelText="Confirm Password..."
                  id="confirmPassword"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    onChange: (e) => handleInputPasswordChange(e, 'confirmPassword'),
                    type: "password",
                    endAdornment: (
                      <InputAdornment position="end">
                        <Lock className={classes.inputIconsColor} />
                      </InputAdornment>
                    ),
                  }}
                />
              </GridItem>
              <GridItem sm={4} style={{ textAlign: "right" }}>
                <Button round color="info" style={{ marginTop: "20px" }} onClick={handleSubmitPassword}>
                  <Save className={classes.icons} />&nbsp; Change
                </Button>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <div className={classNames(classes.main, classes.mainRaisedNext)}>
        <div style={{ paddingBottom: "20px" }}>
          <div className={classes.container}>
            <GridContainer justifyContent="center">  
            {(userInfo?.FK_iMaQuyen === 1 && userInfo?.FK_iMaTrangthai === 2) ? (
              <GridItem md={6}>
                <h3 style={{ textAlign: "center" }}>Verify buyer information</h3>
                <br />
                <GridContainer>
                  <GridItem md={12}>
                  <CustomInput
                    labelText="CMT/CCCD..."
                    id="cmt"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      onChange: (e) => handleInputCMTChange(e, 'sCMND'),
                      type: "text",
                      endAdornment: (
                        <InputAdornment position="end">
                          <People className={classes.inputIconsColor} />
                        </InputAdornment>
                      ),
                    }}
                />
                  </GridItem>
                  <GridItem md={12}>
                    <DropzoneArea
                      acceptedFiles={['image/*']}
                      dropzoneText={"Ảnh mặt trước CMT/CCCD"}
                      onChange={(files) => handleChangeFileBefore(files)}
                      dropzoneClass={classes.fileWrapper}
                      filesLimit={1}
                    />
                    <br />
                  </GridItem>
                  <GridItem md={12}>
                    <DropzoneArea
                      acceptedFiles={['image/*']}
                      dropzoneText={"Ảnh mặt sau CMT/CCCD"}
                      onChange={(files) => handleChangeFileAfter(files)}
                      dropzoneClass={classes.fileWrapper}
                      filesLimit={1}
                    />
                    <br />
                  </GridItem>
                  <GridItem md={12} style={{ textAlign: "center" }}>
                    <Button round color="warning" style={{ marginTop: "20px" }} onClick={handleSubmitCMND}>
                      <Check className={classes.icons} />&nbsp; Submit
                    </Button>
                  </GridItem>
                </GridContainer>
              </GridItem>) : (
              <GridItem md={6}>
                <h3 style={{ textAlign: "center" }}>Verify successfully</h3>
              </GridItem>
              )}
              <GridItem md={6}>
                <h3 style={{ textAlign: "center" }}>Verify history</h3>
                <br />
                <div>
                  {verifyHistory.map((hs) => (
                    <div className={classes.verifiedItem} key={hs.PK_iMaHoso}>
                      <p>Gửi lúc: {format(new Date(hs.createdAt), 'dd/MM/yyyy HH:ii')}</p>
                      <p>Trạng thái: {mapTrangThaiHoSo[hs.FK_iMaTrangthaiHoso]}</p>
                    </div>
                  ))}
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      {(userInfo?.FK_iMaQuyen === 1 && userInfo?.FK_iMaTrangthai === 1) ? (
        <div className={classNames(classes.main, classes.mainRaisedNext)}>z
          <div style={{ paddingBottom: "20px" }}>
            <div className={classes.container}>
              <GridContainer justifyContent="center">
                <h3 style={{ textAlign: "center" }}>Seller Zone</h3>
                <br />
                <GridItem md={12} style={{ textAlign: "center" }}>
                  <Button round color="primary" style={{ marginTop: "20px" }} onClick={handleSwitchSeller}>
                    <Check className={classes.icons} />&nbsp; Đăng ký với tư cách người bán
                  </Button>
                </GridItem>
              </GridContainer>
            </div>
          </div>
        </div>
      ) : null}
      <Footer />
    </div>
  );
}
