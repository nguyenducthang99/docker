import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from 'react-toastify';
import axios from "axios";
import { useQuery, useLazyQuery } from '@apollo/client';

import { format, set, compareAsc } from 'date-fns';
import { useSelector } from 'react-redux';
import client from 'services/index.js'
import { eventTickets, eventTicketTypes } from 'services/event.js'

import Icon from "@material-ui/core/Icon";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "components/public/Header/Header.js";
import Footer from "components/public/Footer/Footer.js";
import Button from "components/public/CustomButtons/Button.js";
import GridContainer from "components/public/Grid/GridContainer.js";
import GridItem from "components/public/Grid/GridItem.js";
import HeaderLinks from "components/public/Header/HeaderLinks.js";
import Parallax from "components/public/Parallax/Parallax.js";

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateRangePicker from '@mui/lab/DateRangePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

import InputAdornment from "@material-ui/core/InputAdornment";
import CustomInput from "components/public/CustomInput/CustomInput.js";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { TableFooter } from "@mui/material";
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { API_URL } from "constants/commons.js";
import styles from "./styles.js";

const useStyles = makeStyles(styles);

const getEventIds = async () => {
  return await axios.get(`${API_URL}/event/ids`);
}
const mapTrangThaiSuKien = {
  1: 'Available',
  2: 'Cancelled'
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "50vw",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AddTicketsPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const { id } = props;
  const [isOpenModal, setOpenModal] = useState(false);
  const [eventInfo, setEventInfo] = useState(null);
  const [categoriesEvent, setCategoriesEvent] = useState([]);
  const [categories, setCategories] = useState({});
  const [activeDetail, setActiveDetail] = useState(null);
  const [ticketType, setTicketType] = useState(['Normal', 'Hight'])
  const init = {
    chosenType: ticketType[0],
    enterType: '',
    price: 0,
    amount: 0,
    prefix: '',
  };
  const [ticketState, setTicketState] = useState(init);

  const initialDetailState = {
    FK_iMaLoaive: null,
    sVitri: "",
    iGiave: "",
    iTrangThai: "",
  };
  const [editAddTicket, setEditAddTicket] = useState(initialDetailState);
  const [mapTicketsType, setMapTicketsType] = useState({});

  const userInfo = useSelector((state) => state.user.userInfo);
  const router = useRouter();

  const [getTicketTypes] = useLazyQuery(eventTicketTypes, {
    client: client,
    onCompleted: (data) => {
      if (data.ticketsTypeEvent) {
        const newMapTicketsType = {};
        data.ticketsTypeEvent.forEach(type => {
          newMapTicketsType[`${type.FK_iMaCTSuKien}`] ? newMapTicketsType[`${type.FK_iMaCTSuKien}`].push(type) : newMapTicketsType[`${type.FK_iMaCTSuKien}`] = [type];
        })
        setMapTicketsType(newMapTicketsType);
      }
    }
  });

  useEffect(() => {
    if (eventInfo?.eventDetails) getTicketTypes({ variables: { sub_event_ids: eventInfo.eventDetails.map((detail) => detail.PK_iMaCTSuKien.toString()) } })
  }, [eventInfo?.eventDetails])

  useEffect(() => {
    if (userInfo) {
      getEventInfo();
    } else {
      router.push('/');
    }
  }, [userInfo]);

  const handleCloseModal = () => {
    setOpenModal(false);
  }

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
    const eventIDs = [id];
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

  const getEventInfo = () => {
    axios
      .get(`${API_URL}/event/edit-events/${id}`)
      .then((res) => {
        if (res.status === 200 && res.data) {
          setEventInfo(res.data)
          getEventCategories();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const compareToday = (date) => {
    const today = new Date().setHours(0, 0, 0, 0);
    const dateCompare = new Date(date).setHours(0, 0, 0, 0);
    return compareAsc(dateCompare, today);
  }


  const getTrangThaiSuKien = (event) => {
    const today = new Date().setHours(0, 0, 0, 0);
    const compareStart = compareAsc(new Date(event.dThoigianBatdau).setHours(0, 0, 0, 0), today);
    const compareEnd = compareAsc(today, new Date(event.dThoigianKetthuc).setHours(0, 0, 0, 0));
    if (compareStart === 1) return 'Pendding';
    if (compareEnd === 1) return 'Finished';
    return 'Active now';
  }

  const getTheLoai = (eventId) => {
    const eventCat = categoriesEvent
                      .filter((cat) => cat.PK_iMaSukien === eventId)
                      .map((cat) => {
                        return categories[cat.PK_iMaTheloai]
                      })
    return eventCat?.map((cat) => cat?.sTenTheloai).join(', ');
  }

  const onClickAddTicket = (detail) => {
    setOpenModal(true);
    setActiveDetail(detail);
  }

  useEffect(() => {
    if (!isOpenModal) setTicketState(init);
  }, [isOpenModal])

  const handleOnCloseTicket = () => {
    setOpenModal(false);
  }

  const handleOnSubmitTicket = () => {
    let timestamps = new Date().getTime();
    const newTicketType = {
      PK_iMaLoaiVe: timestamps,
      FK_iMaCTSuKien: activeDetail.PK_iMaCTSuKien,
      sTenLoaiVe: ticketState.enterType || ticketState.chosenType,
      iSoLuong: ticketState.amount,
      iGiave: ticketState.price,
      sPhanLoai: ticketState.prefix.trim(),
    };

    const listTicket = [];

    for (let index = 0; index < ticketState.amount; index++) {
      listTicket.push({
        PK_iMaVe: timestamps++,
        FK_iMaLoaiVe: newTicketType.PK_iMaLoaiVe,
        sViTri: `${newTicketType.sPhanLoai}-${index}`,
        iGiave: newTicketType.iGiave,
        iTrangThai: 1,
      });
    }

    axios.post(`${API_URL}/event/tao-loai-ve-event`, {
      loaiVe: newTicketType, listVe: listTicket
    })
      .then(res => {
        if (res.status === 200 && res.data) {
          console.log(res.data);
          toast.success(`Create tickets event successfully!`)
          getTicketTypes({ variables: { sub_event_ids: eventInfo.eventDetails.map((detail) => detail.PK_iMaCTSuKien.toString()) } })
        };
      })
      .catch(err => {
        toast.error(`Somethings wrong when create event, please try again!`);
        console.error(err);
      })
  }

  const editable = new Date().getTime() < new Date(eventInfo?.dThoigianBatdau || 'today').getTime();
  
  if (!userInfo || !eventInfo) return null;

  return (
    <div>
      <Header
        color="transparent"
        brand="Viticket"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white",
        }}
        {...rest}
      />
      <Parallax small filter image="/img/profile-bg.jpg">
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12} className={classes.headerWrapper}>
              <h1 className={classes.title}>Let's Make Live Happen.</h1>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div style={{ paddingBottom: "20px" }}>
          <div className={classes.containerFluid}>
            <h2 className={classes.eventTitle}>Main event</h2>
            <GridContainer>
              <GridItem md={3}>
                <div className={classes.thumbnailWrapper}>
                  <img src="https://images.baodantoc.vn/uploads/2021/Th%C3%A1ng%208/Ng%C3%A0y_16/Thanh/photo1626255844591-16262558446831291916611.jpg" />
                </div>
              </GridItem>
              <GridItem md={9}>
                <div className={classes.infoWrapper}>
                  <h3>
                    <Icon className={classes.icons}>loyalty</Icon>&nbsp; {eventInfo?.sTenSukien}
                  </h3>
                  <p><b>Status: </b>{eventInfo.FK_iMaTrangthai === 1 ? getTrangThaiSuKien(eventInfo) : mapTrangThaiSuKien[eventInfo.FK_iMaTrangthai]}</p>
                  <div className={classes.eventInfoWapper}>
                    <GridContainer>
                      <GridItem md={4}>
                        <p><b>#&nbsp; Place:</b> {eventInfo.sDiadiem}</p>
                      </GridItem>
                      <GridItem md={8}>
                        <p><b>#&nbsp; Time: </b>From {format(new Date(eventInfo.dThoigianBatdau), 'dd/MM/yyyy')} to {format(new Date(eventInfo.dThoigianKetthuc), 'dd/MM/yyyy')}</p>
                      </GridItem>
                      <GridItem md={12}>
                        <p><b>#&nbsp; Categories:</b> {getTheLoai(eventInfo.PK_iMaSukien)}</p>
                      </GridItem>
                      <GridItem md={12}>
                        <p><b>#&nbsp; Description:</b></p>
                        <p>{eventInfo.sMota}</p>
                      </GridItem>
                    </GridContainer>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      
      {eventInfo.eventDetails?.map((detail) => (
        <div className={classNames(classes.main, classes.mainRaisedNext)}>
          <div style={{ paddingBottom: "20px" }}>
            <div className={classes.containerFluid}>
              <div className={classes.subEventHeader}>
              </div>
              <GridContainer>
                <GridItem md={8}>
                  <h3 className={classes.subEventTitle}>{detail.sThongTinChiTiet}</h3>
                </GridItem>
                <GridItem md={4}>
                  <h5 
                    className={classes.subEventStatus}
                    style={{
                      color: detail.iTrangThai === 1 ? '#1976d2' : '#ED6C02',
                    }}
                  >
                    {mapTrangThaiSuKien[detail.iTrangThai]}
                  </h5>
                </GridItem>
                <GridItem md={4}>
                  <p><b>#&nbsp; Location: </b>{detail.sViTri}</p>
                </GridItem>
                <GridItem md={8}>
                  <p><b>#&nbsp; Time: </b>start from {format(new Date(detail.dNgayToChuc), 'dd/MM/yyyy HH:mm')} - long {detail.iThoiLuong} minutes</p>
                </GridItem>
                <GridItem md={12}>
                  <TableContainer className={classes.customTable} component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Ticket type</TableCell>
                          <TableCell align="right">Price</TableCell>
                          <TableCell align="right">Total</TableCell>
                          <TableCell align="right">Sold</TableCell>
                          <TableCell align="right">Action</TableCell>
                        </TableRow>
                        {detail.iTrangThai === 1 && editable ? (
                          <TableRow>
                            <TableCell colSpan={5} align="right">
                              <Button size="sm" round color="info" onClick={() => onClickAddTicket(detail)}>
                                <Icon className={classes.icons}>add</Icon> Add ticket
                              </Button>
                            </TableCell>
                          </TableRow>
                        ) : null}
                      </TableHead>
                      <TableBody>
                        {mapTicketsType[`${detail.PK_iMaCTSuKien}`] && mapTicketsType[`${detail.PK_iMaCTSuKien}`].map((type) => (
                          <TableRow
                            key={type.PK_iMaLoaiVe}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell>{type.sTenLoaiVe}</TableCell>
                            <TableCell align="right">{type.iGiave}</TableCell>
                            <TableCell align="right">{type.iGiave}</TableCell>
                            <TableCell align="right">{type.iSoLuong}</TableCell>
                            <TableCell align="right">{0}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </GridItem>
              </GridContainer>
            </div>
          </div>
        </div>
      ))}
      <Footer />

      <Modal
        open={isOpenModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add ticket for: {activeDetail?.sThongTinChiTiet}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <GridContainer>
              <GridItem md={6}>
                <FormControl fullWidth className={classes.ticketType}>
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Choose ticket type
                  </InputLabel>
                  <NativeSelect
                    inputProps={{
                      value: ticketState.chosenType,
                      onChange: (e) => setTicketState({
                        ...ticketState,
                        chosenType: e.target.value,
                      }),
                      name: 'event-status',
                      id: 'event-status',
                    }}
                  >
                    {ticketType.map((type) => <option value={type}>{type}</option>)}
                  </NativeSelect>
                </FormControl>
              </GridItem>
              <GridItem md={6}>
                <CustomInput
                  labelText="Or enter ticket type"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    value: ticketState.enterType,
                    onChange: (e) => setTicketState({
                      ...ticketState,
                      enterType: e.target.value,
                    }),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className={classes.icons}>drive_file_rename_outline</Icon>
                      </InputAdornment>
                    ),
                  }}
                />
              </GridItem>
              <GridItem md={4}>
                <CustomInput
                  labelText="Ticket type prefix"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    value: ticketState.prefix,
                    onChange: (e) => setTicketState({
                      ...ticketState,
                      prefix: e.target.value,
                    }),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className={classes.icons}>horizontal_rule</Icon>
                      </InputAdornment>
                    ),
                  }}
                />
              </GridItem>
              <GridItem md={4}>
                <CustomInput
                  labelText="Amount"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    type: "number",
                    min: 1,
                    value: ticketState.amount,
                    onChange: (e) => setTicketState({
                      ...ticketState,
                      amount: e.target.value,
                    }),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className={classes.icons}>bar_chart</Icon>
                      </InputAdornment>
                    ),
                  }}
                />
              </GridItem>
              <GridItem md={4}>
                <CustomInput
                  labelText="Price"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    type: "number",
                    min: 1,
                    value: ticketState.price,
                    onChange: (e) => setTicketState({
                      ...ticketState,
                      price: e.target.value,
                    }),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className={classes.icons}>money</Icon>
                      </InputAdornment>
                    ),
                  }}
                />
              </GridItem>
              <GridItem md={12} style={{ textAlign: "center" }}>
                <Button round color="success" style={{ marginTop: "20px" }} onClick={handleOnSubmitTicket}>
                  <Icon className={classes.icons}>check</Icon> &nbsp; Add ticket type
                </Button>
                &emsp;
                <Button round color="default" style={{ marginTop: "20px" }} onClick={handleOnCloseTicket}>
                  <Icon className={classes.icons}>close</Icon> &nbsp; Close
                </Button>
              </GridItem>
            </GridContainer>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export async function getStaticPaths() {
  const res = await getEventIds();
  const items = res?.data || [];
  const paths = items.map((item) => ({
      params: { id: item.PK_iMaSukien.toString() },
  }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps(props) {
  const { id } = props.params;

  return {
    props: {
      id,
    },
  }
}
