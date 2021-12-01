import { title } from "styles/jss/nextjs-material-kit.js";

const productStyle = {
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
    '@media (max-width: 768px)': {
      fontSize: "24px",
    },
  },
  description: {
    color: "#999",
  },
  categoriesWrapper: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  category: {
    position: "relative",
    width: "calc(100% / 4 - 10px)",
    textAlign: "center",
    '@media (max-width: 768px)': {
      width: "calc(100% / 2 - 5px)",
    },
    '@media (max-width: 576px)': {
      width: "100%",
    },
    "&:hover img": {
      opacity: "0.7"
    },
    "& img": {
      width: "100%",
      objectFit: "contain",
      opacity: "1",
      zIndex: 1,
      transition: "all ease .25s"
    },
    "& span": {
      zIndex: 2,
      color: '#FFF',
      left: '10px',
      bottom: '10px', 
      position: 'absolute',
      padding: "5px 8px",
      borderRadius: "4px",
      background: "rgba(0, 0, 0, 0.65)",
      fontWeight: 600,
      '@media (max-width: 576px)': {
        left: '3px',
        padding: "2px 3px",
      },
    }
  },
  categoriesEvents: {
    "& h3": {
      fontWeight: 400,
      textAlign: "left",
      marginTop: "25px",
      marginBottom: "25px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      '@media (max-width: 768px)': {
        fontSize: "20px",
      },
      "& span": {
        borderBottom: "3px solid #00acc1",
        paddingBottom: "10px",
      }
    }
  },
  seeAll: {
    color: "rgb(2, 108, 223)",
    transition: "all ease .25s",
    fontSize: "18px",
    "&:hover": {
      color: "rgb(1, 80, 167)",
    },
    '@media (max-width: 768px)': {
      fontSize: "14px",
    },
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

export default productStyle;
