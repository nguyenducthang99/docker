import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Link from 'next/link';

import styles from "styles/jss/nextjs-material-kit/pages/landingPageSections/categoriesStyle.js";

const useStyles = makeStyles(styles);

export default function ProductSection(props) {
  const classes = useStyles();
  const { categories } = props;

  return (
    <div className={classes.section}>
      <h2 className={classes.title}>Browse by Category</h2>
      <div className={classes.categoriesWrapper}>
        {categories.map(cat => (
          <Link key={cat.PK_iMaTheloai} href={`/category/${cat.sSlugTheloai}-${cat.PK_iMaTheloai}`}>
            <a  className={classes.category} href={`/category/${cat.sSlugTheloai}-${cat.PK_iMaTheloai}`}>
              <img src={cat.sLinkAnh} />
              <span>{cat.sTenTheloai}</span>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
