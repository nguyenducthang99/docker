import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "styles/jss/nextjs-material-kit/pages/landingPageSections/categoriesStyle.js";
import CatEventsSection from "pages-sections/LandingPage-Sections/CatEventsSection.js";

const useStyles = makeStyles(styles);
export default function ProductSection(props) {
  const classes = useStyles();
  const { categories } = props;

  return (
    <div className={classes.section}>
      <h2 className={classes.title}>Browse by Event</h2>
      <div className={classes.categoriesEventsWrapper}>
        {categories.map(cat => (
          <CatEventsSection key={cat.PK_iMaTheloai} cat={cat} />
        ))}
      </div>
    </div>
  );
}
