import React, { useState, useEffect } from "react";
import { format, set, compareAsc } from 'date-fns';
import { useSelector } from 'react-redux';
import axios from "axios";
import Router from "next/router";
import Link from "next/link";

import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { TableFooter } from "@mui/material";
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import GridItem from "components/public/Grid/GridItem.js";
import Button from "components/public/CustomButtons/Button.js";
import GridContainer from "components/public/Grid/GridContainer.js";

import { API_URL } from "constants/commons.js";
import styles from './styles.js';
import { toast } from 'react-toastify';

const useStyles = makeStyles(styles);
const mapTrangThaiSuKien = {
  1: 'Available',
  2: 'Cancelled'
};

const EventForm = () => {
  const classes = useStyles();
  const [eventsList, setEventsList] = useState([]);
  const [categoriesEvent, setCategoriesEvent] = useState([]);
  const [categories, setCategories] = useState({});
  const userInfo = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    getCategories();
    getOwnerEvents();
  }, []);

  useEffect(() => {
    getEventCategories();
  }, [eventsList]);


  const getCategories = () => {
    axios
      .get(`${API_URL}/account/the-loai`)
      .then((res) => {
        if (res.status === 200 && res.data) {
          const newTheLoai = {};
          res.data.forEach((cat) => {
            newTheLoai[`${cat.PK_iMaTheloai}`] = cat;
          })
          setCategories(newTheLoai);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getEventCategories = () => {
    const eventIDs = eventsList.map((ev) => ev.PK_iMaSukien)
    axios
      .post(`${API_URL}/event/the-loai-event`, {
        eventIDs
      })
      .then((res) => {
        if (res.status === 200 && res.data) {
          getCategories();
          setCategoriesEvent(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const getOwnerEvents = () => {
    axios
      .get(`${API_URL}/event/owner-events/${userInfo._id}`)
      .then((res) => {
        if (res.status === 200 && res.data) {
          setEventsList(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const getTheLoai = (eventId) => {
    const eventCat = categoriesEvent
                      .filter((cat) => cat.PK_iMaSukien === eventId)
                      .map((cat) => {
                        return categories[cat.PK_iMaTheloai]
                      })
    return eventCat.map((cat) => cat.sTenTheloai).join(', ');
  }

  const getTrangThaiSuKien = (event) => {
    const today = new Date().setHours(0, 0, 0, 0);
    const compareStart = compareAsc(new Date(event.dThoigianBatdau).setHours(0, 0, 0, 0), today);
    const compareEnd = compareAsc(today, new Date(event.dThoigianKetthuc).setHours(0, 0, 0, 0));
    if (compareStart === 1) return 'Pendding';
    if (compareEnd === 1) return 'Finished';
    return 'Active now';
  }

  const compareToday = (date) => {
    const today = new Date().setHours(0, 0, 0, 0);
    const dateCompare = new Date(date).setHours(0, 0, 0, 0);
    return compareAsc(dateCompare, today);
  }

  const handleClickEdit = (event) => {
    Router.push(`/sell?event-id=${event.PK_iMaSukien}`)
  }

  const editable = (event) => {
    const isEnd = compareToday(event.dThoigianKetthuc);
    return isEnd !== -1 && event.FK_iMaTrangthai === 1;
  }

  const cancelable = (event) => {
    const isStart = compareToday(event.dThoigianBatdau);
    return editable(event) && isStart === 1;
  }

  return (
    <div className={classes.container}>
      <h2><span>Event list</span></h2>
      <GridContainer>
        <GridItem md={12}>
          <TableContainer className={classes.customTable} component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Event Title</TableCell>
                  <TableCell align="right">Categories</TableCell>
                  <TableCell align="right">Times</TableCell>
                  <TableCell align="right">Location</TableCell>
                  <TableCell align="right">Events</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {eventsList.map((row) => (
                <TableRow
                  key={row.PK_iMaSukien}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{row.sTenSukien}</TableCell>
                  <TableCell align="right">{getTheLoai(row.PK_iMaSukien)}</TableCell>
                  <TableCell align="right">From {format(new Date(row.dThoigianBatdau), 'dd/MM/yyyy')}<br />to {format(new Date(row.dThoigianKetthuc), 'dd/MM/yyyy')}</TableCell>
                  <TableCell align="right">{row.sDiadiem}</TableCell>
                  <TableCell align="right">{row.eventDetails?.length}</TableCell>
                  <TableCell align="right">
                    {row.FK_iMaTrangthai === 1 ? getTrangThaiSuKien(row) : mapTrangThaiSuKien[row.FK_iMaTrangthai]}
                  </TableCell>
                  <TableCell>
                    <Link href={`/add-tickets/${row.PK_iMaSukien}`}>
                      <a href={`/add-tickets/${row.PK_iMaSukien}`} >
                        <Button
                          style={{ margin: "2px" }}
                          size="sm"
                          justIcon
                          round
                          color="info"
                        >
                          <Icon className={classes.icons}>info</Icon>
                        </Button>
                      </a>
                    </Link>
                    {editable(row) ? (
                      <Button
                        style={{ margin: "2px" }}
                        size="sm"
                        justIcon
                        round
                        color="primary"
                        onClick={() => handleClickEdit(row)}
                      >
                        <Icon className={classes.icons}>edit</Icon>
                      </Button>
                    ) : null}
                    {cancelable(row) ? (
                      <Button
                        style={{ margin: "2px" }}
                        size="sm"
                        justIcon
                        round
                        color="danger"
                        onClick={() => handleClickEdit(row)}
                      >
                        <Icon className={classes.icons}>remove</Icon>
                      </Button>
                    ) : null}
                  </TableCell>
                </TableRow>
              ))}
              </TableBody>
            </Table>
          </TableContainer>
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default EventForm;
