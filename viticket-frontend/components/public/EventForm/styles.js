import {
    primaryColor,
    defaultFont,
  } from "styles/jss/nextjs-material-kit.js";

const styles = {
    container: {
        "& h2 span": {
            fontWeight: "700",
            paddingBottom: "10px",
            borderBottom: "3px solid #333",
        }
    },
    disabled: {
      "&:before": {
        borderColor: "transparent !important",
      },
    },
    underline: {
      "&:hover:not($disabled):before,&:before": {
        borderColor: "#D2D2D2 !important",
        borderWidth: "1px !important",
      },
      "&:after": {
        borderColor: primaryColor,
      },
    },
    eventDescription: {
        width: "100%",
        "& label": {
          top: "-6px",
        },
        "& label + div ": {
          marginTop: "10px",
        },
        "& label.MuiInputLabel-outlined.MuiInputLabel-shrink": {
          transform: "translate(0px , 0px ) scale(0.75) !important",
        },
    },
    eventCategory: {
      marginTop: "20px !important",
      width: "100%",
      "& label": {
        top: "0px",
        left: "0px",
        transform: "translate(0px, 20px) scale(1)",
      },
      "& label + div, & label + div>div:first-child, & label + div fieldset": {
        border: "none",
        borderBottom: "1px solid rgba(0, 0, 0, 0.42)",
        borderRadius: "0px",
      },
      "& label.MuiInputLabel-outlined.MuiInputLabel-shrink": {
        transform: "translate(0px , 0px ) scale(0.75) !important",
      },
      "&:focus": {
        outline: "none",
      },
      "& .MuiSelect-select.MuiSelect-outlined": {
        padding: "16px 32px 4px 0px !important",
      }
    },
    selectContainer: {
      "& ul": {
        display: "flex",
      },
    },
    verticalCenter: {
      marginTop: "20px",
    },
    selectContainerForm: {
      width: "100%",
    },
    customTable: {
      "& td": {
        padding: "8px",
      },
      "& td button": {
        margin: "0px 5px",
        marginTop: "0px !important",
      }
    },
    dateRangePicker: {
        width: "100%",
        margin: "0 0 17px 0",
        paddingTop: "27px",
        position: "relative",
        border: "none",
        "& svg,& .fab,& .far,& .fal,& .fas,& .material-icons": {
        color: "#495057",
        },
        "& label": {
            ...defaultFont,
            transform: "translate(0px, 20px) scale(1)",
            color: "#AAAAAA !important",
            fontWeight: "400",
            fontSize: "14px",
            lineHeight: "1.42857",
            top: "0px",
            letterSpacing: "unset",
            "& + $underline": {
              marginTop: "0px",
            },
        },
        "& label.MuiInputLabel-outlined.MuiInputLabel-shrink": {
          transform: "translate(0px , 0px) scale(0.75) !important",
        },
        "& label + div fieldset": {
          border: "none",
          borderBottom: "1px solid rgba(0, 0, 0, 0.42)",
          borderRadius: "0px",
        },
        "& input": {
            color: "#495057",
            height: "unset",
            width: "100%",
            padding: "16px 32px 4px 0px !important",
            "&,&::placeholder": {
                fontSize: "14px",
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                fontWeight: "400",
                lineHeight: "1.42857",
                opacity: "1",

            },
            "&::placeholder": {
                color: "#AAAAAA",
            },
            "&.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
              padding: "17px 14px 5px 0px",
            },
        }
    },
    eventDetailDate: {
      marginTop: "20px",
    },
};

export default styles;