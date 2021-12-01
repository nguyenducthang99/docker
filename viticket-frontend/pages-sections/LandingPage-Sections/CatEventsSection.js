import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Link from 'next/link';
import styles from "styles/jss/nextjs-material-kit/pages/landingPageSections/categoriesStyle.js";
import { useLazyQuery, useQuery } from "@apollo/client";
import client from "../../services";
import { catEventsQuery, getCatEvents } from 'services/event.js'

const useStyles = makeStyles(styles);

export default function ProductSection(props) {
  const classes = useStyles();
  const { cat } = props;
  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    const res = await getCatEvents({ id: Number(cat.PK_iMaTheloai) });
    console.log(res);
    setEvents(res?.data?.catEventsId);
    console.log(res?.data?.catEventsId)
  }

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className={classes.categoriesEvents}>
      <h3>
        <span>{cat.sTenTheloai}</span>
        <Link href={`/category/${cat.sSlugTheloai}-${cat.PK_iMaTheloai}`}>
          <a className={classes.seeAll} href={`/category/${cat.sSlugTheloai}-${cat.PK_iMaTheloai}`}>See All {cat.sTenTheloai}</a>
        </Link>
      </h3>

      <div className={classes.events}>
        {events?.map(event => (
          <Link key={event.PK_iMaSukien} href={`/event/${event.sSlugSukien}-${event.PK_iMaSukien}`}>
            <a href={`/event/${event.sSlugSukien}-${event.PK_iMaSukien}`} className={classes.eventWrapper}>
              <img src={`https://picsum.photos/400/255?random=${cat.PK_iMaTheloai}${event.PK_iMaSukien}`} />
              <div className={classes.eventThumb}>
                <p>{event.sTenSukien}</p>
                <span>{event.eventDetails || 0} Events</span>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
