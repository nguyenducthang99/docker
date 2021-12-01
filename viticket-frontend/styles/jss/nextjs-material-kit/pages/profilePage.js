import { container, containerFluid, title } from "styles/jss/nextjs-material-kit.js";

import imagesStyle from "styles/jss/nextjs-material-kit/imagesStyles.js";

const profilePageStyle = {
  container,
  containerFluid: {
    ...containerFluid,
    width: "calc(100% - 30px)",
    "& button": {
      margin: "0px 0px 15px",
    }
  },
  profile: {
    textAlign: "center",
    "& img": {
      maxWidth: "160px",
      width: "100%",
      margin: "0 auto",
      transform: "translate3d(0, -50%, 0)",
    },
  },
  description: {
    margin: "1.071rem auto 0",
    maxWidth: "600px",
    color: "#999",
    textAlign: "center !important",
  },
  name: {
    marginTop: "-80px",
  },
  ...imagesStyle,
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3",
  },
  mainRaised: {
    margin: "-60px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
  },
  mainRaisedNext: {
    margin: "25px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
  },
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
  },
  socials: {
    marginTop: "0",
    width: "100%",
    transform: "none",
    left: "0",
    top: "0",
    height: "100%",
    lineHeight: "41px",
    fontSize: "20px",
    color: "#999",
  },
  navWrapper: {
    margin: "20px auto 50px auto",
    textAlign: "center",
  },
  verifiedItem: {
    cursor: "pointer",
    padding: "8px 12px",
    margin: "5px 0px",
    "&:hover": {
      background: "#EEE",
    },
    "&:nth-child(even)": {
      border: "1px solid #6200EE",
      borderRightWidth: "5px",
    },
    "&:nth-child(odd)": {
      border: "1px solid #03DAC6",
      borderLeftWidth: "5px",
    },
  },
  headerWrapper: {
    "& h1": {
      color: "#FFF",
    }
  }
};

export default profilePageStyle;
