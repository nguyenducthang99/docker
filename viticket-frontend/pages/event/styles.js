import { container, containerFluid, title } from "styles/jss/nextjs-material-kit.js";

import imagesStyle from "styles/jss/nextjs-material-kit/imagesStyles.js";

const profilePageStyle = {
  container: {
    zIndex: "12",
    color: "#FFFFFF",
    ...container,
    paddingRight: "0px",
  },
  gridContainer: {
    marginRight: "0px"
  },
  subtitle: {
    fontSize: "1.313rem",
    maxWidth: "500px",
    margin: "10px auto 0",
  },
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
  section: {
    padding: "20px 20px 70px",
    textAlign: "center",
  },
  title: {
    ...title,
    marginBottom: "1rem",
    marginTop: "0px",
    minHeight: "32px",
    textDecoration: "none",
    textAlign: "left",
    color: "#FFF",
    '@media (max-width: 768px)': {
      fontSize: "24px",
    },
  },
  catTitle: {
    ...title,
    marginBottom: "1rem",
    marginTop: "0px",
    minHeight: "32px",
    textDecoration: "none",
    textAlign: "left",
    '@media (max-width: 768px)': {
      fontSize: "24px",
    },
  },
  description: {
    color: "#999",
  },
  containerFluid: {
    ...containerFluid,
    width: "calc(100% - 30px)",
    "& button": {
      margin: "0px 0px 15px",
    }
  },
  events: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  eventWrapper: {
    position: "relative",
    width: "calc(100% / 4 - 14px)",
    marginBottom: "10px",
    borderRadius: "3px",
    '@media (max-width: 768px)': {
      width: "calc(100% / 2 - 5px)",
      marginBottom: "0px",
    },
    '@media (max-width: 576px)': {
      width: "100%",
    },
    "& img": {
      width: "100%",
      objectFit: "contain",
      opacity: "1",
      zIndex: 1,
      transition: "all ease .25s",
      borderRadius: "3px",
    },
  },
  eventThumb: {
    zIndex: 2,
    color: '#FFF',
    left: '10px',
    bottom: '10px', 
    position: 'absolute',
    padding: "5px 8px",
    borderRadius: "4px",
    background: "rgba(0, 0, 0, 0.65)",
    textAlign: "left",
    '@media (max-width: 576px)': {
      left: '3px',
      padding: "2px 3px",
    },
    "& p": {
      fontWeight: 700,
      margin: "0 0 5px",
    },
    "& span": {
      fontSize: "14px",
    }
  }
};

export default profilePageStyle;
