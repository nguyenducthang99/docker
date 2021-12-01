import React, { useState, useEffect } from "react";
import Link from 'next/link';

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
import Button from "components/public/CustomButtons/Button.js";
import HeaderLinks from "components/public/Header/HeaderLinks.js";
import Parallax from "components/public/Parallax/Parallax.js";
import TopSearch from "components/public/TopSearch/index.js";

import styles from "./styles.js";
import { getCategories, getCat, getCatEvents } from 'services/event.js'

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  console.log(props)

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
            <div className={classes.section}>
                <h2 className={classes.catTitle}>{props.dataCat.sTenTheloai}</h2>
                <div className={classes.categoriesEventsWrapper}>
                    <div key={props.dataCat.PK_iMaTheloai} className={classes.categoriesEvents}>
                        <div className={classes.events}>
                            {props?.data?.map(event => (
                            <Link key={event.PK_iMaSukien} href={`/event/${event.sSlugSukien}-${event.PK_iMaSukien}`}>
                                <a href={`/event/${event.sSlugSukien}-${event.PK_iMaSukien}`} className={classes.eventWrapper}>
                                <img src={`https://picsum.photos/400/255?random=${props.dataCat.PK_iMaTheloai}${event.PK_iMaSukien}`} />
                                <div className={classes.eventThumb}>
                                    <p>{event.sTenSukien}</p>
                                    <span>{event.eventDetails || 0} Events</span>
                                </div>
                                </a>
                            </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  const res = await getCategories();
  const categories = res.data?.categories || [];
  const paths = categories.map((e) => {
    return {
      params: { slug: e.sSlugTheloai }
    }
  })

  return {
    paths,
    fallback: 'blocking' // See the "fallback" section below
  };
}

export async function getStaticProps(props) {  
  const { params } = props;
  const slug = params.slug.split('-');
  const id = Number(slug[slug.length - 1]);
  const res = await getCatEvents({ id });

  const resCat = await getCat({ id });
  const dataCat = resCat?.data?.cat;

  const data = res?.data?.catEventsId || null;

  if (!data || !dataCat) {
    return {
      notFound: true,
    }
  }

  return {
    props: { data, dataCat }, // will be passed to the page component as props
  }
}