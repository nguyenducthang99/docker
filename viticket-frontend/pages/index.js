import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Header from "components/public/Header/Header.js";
import Footer from "components/public/Footer/Footer.js";
import GridContainer from "components/public/Grid/GridContainer.js";
import GridItem from "components/public/Grid/GridItem.js";
import HeaderLinks from "components/public/Header/HeaderLinks.js";
import Parallax from "components/public/Parallax/Parallax.js";
import TopSearch from "components/public/TopSearch/index.js";

import styles from "styles/jss/nextjs-material-kit/pages/landingPage.js";

// Sections for this page
import TopSellerSection from "pages-sections/LandingPage-Sections/TopSellerSection.js";
import CategoriesSection from "pages-sections/LandingPage-Sections/CategoriesSection.js";
import { getCategories } from 'services/event.js'

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const { categories, ...rest } = props;
  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="Viticket"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />
      <Parallax filter responsive image="/img/landing-bg.jpg">
        <div className={classes.container}>
          <GridContainer className={classes.gridContainer}>
            <GridItem xs={12} sm={12} md={12}>
              <h1 className={classes.title}>Let's Make Live Happen.</h1>
              <h4>Shop millions of live events and discover can't-miss concerts, games, theater and more.</h4>
              <TopSearch />
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
          <CategoriesSection categories={categories} />
          <TopSellerSection categories={categories} />
      </div>
      <Footer />
    </div>
  );
}


export async function getServerSideProps() {
  // Fetch data from external API
  const res = await getCategories();
  const categories = res.data?.categories || [];

  // Pass data to the page via props
  return { props: { categories } }
}