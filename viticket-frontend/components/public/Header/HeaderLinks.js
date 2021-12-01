/*eslint-disable*/
import React from "react";
import Link from "next/link";

import { useSelector, useDispatch } from 'react-redux';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import { AccountCircle } from "@material-ui/icons";

// core components
import CustomDropdown from "components/public/CustomDropdown/CustomDropdown.js";
import Button from "components/public/CustomButtons/Button.js";

import { setUserInfo } from "../../../store/actions/user";
import styles from "styles/jss/nextjs-material-kit/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);

  const handleLogout = () => {
    dispatch(setUserInfo(null));
  };

  const mySelling = userInfo?.FK_iMaQuyen === 2 && userInfo?.FK_iMaTrangthai === 1 ? (
    <Link href="/sell">
      <a  href="/sell" className={classes.navLink}><Icon className={classes.icons}>money</Icon>&nbsp; My Selling</a>
    </Link>
  ) : null;

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Link href="/category/concerts-1">
          <a
            href="/category/concerts-1"
            color="transparent"
            className={classes.navLink}
          >
            <Icon className={classes.icons}>auto_awesome</Icon> Concerts
          </a>
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link href="/category/sports-2">
          <a
            href="/category/sports-2"
            color="transparent"
            className={classes.navLink}
          >
            <Icon className={classes.icons}>sports_soccer</Icon> Sports
          </a>
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link href="/category/art-theater-3">
          <a
            href="/category/art-theater-3"
            color="transparent"
            className={classes.navLink}
          >
            <Icon className={classes.icons}>sports_martial_arts</Icon> Art & Theater
          </a>
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link href="/category/family-4">
          <a
            href="/category/family-4"
            color="transparent"
            className={classes.navLink}
          >
            <Icon className={classes.icons}>family_restroom</Icon> Family
          </a>
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link href="/categorys">
          <a
            href="/categorys"
            color="transparent"
            className={classes.navLink}
          >
            <Icon className={classes.icons}>more</Icon> More
          </a>
        </Link>
      </ListItem>
      {userInfo ? (
        <ListItem className={classes.listItem}>
          <CustomDropdown
            noLiPadding
            navDropdown
            buttonText={`Hi, ${userInfo.sTenNguoidung}`}
            buttonProps={{
              className: classes.navLink,
              color: "transparent",
            }}
            buttonIcon={AccountCircle}
            dropdownList={[
              <Link href="/profile">
                <a href="/profile" className={classes.navLink}><Icon className={classes.icons}>assignment_ind</Icon>&nbsp; My Account</a>
              </Link>,
              <Link href="/orders">
                <a href="/profile" className={classes.navLink}><Icon className={classes.icons}>event</Icon>&nbsp; My Tickets</a>
              </Link>,
              mySelling,
              <Button
                color="transparent"
                className={classes.navLink}
                onClick={handleLogout}
              >
                <Icon className={classes.icons}>logout</Icon>&nbsp; Logout
              </Button>,
            ]}
          />
        </ListItem>
      ) : (

        <ListItem className={classes.listItem}>
          <Button
            href="/login"
            color="transparent"
            className={classes.navLink}
          >
            <Icon className={classes.icons}>login</Icon> Sigin
          </Button>
        </ListItem>
      )
      }
    </List >
  );
}
