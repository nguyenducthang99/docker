import React, { useState, useEffect } from "react";
import { format, set } from 'date-fns';
import { useSelector } from 'react-redux';
import axios from "axios";
import Router from "next/router";

import Icon from "@material-ui/core/Icon";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";

import addWeeks from 'date-fns/addWeeks';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateRangePicker from '@mui/lab/DateRangePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

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

import { DropzoneArea } from 'material-ui-dropzone';

import GridItem from "components/public/Grid/GridItem.js";
import Button from "components/public/CustomButtons/Button.js";
import GridContainer from "components/public/Grid/GridContainer.js";
import CustomInput from "components/public/CustomInput/CustomInput.js";

import { API_URL } from "constants/commons.js";
import styles from './styles.js';
import { toast } from 'react-toastify';

const getWeeksAfter = (date, amount) => {
  return date ? addWeeks(date, amount) : undefined;
}

const mapStatusEvent = {
  1: "Active",
  2: "Cancel"
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
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

const useStyles = makeStyles(styles);

const EventForm = (props) => {
  const { event } = props;
  const classes = useStyles();
  const [isOpenModal, setOpenModal] = useState(false);
  const [listEventDetails, setListEventDetails] = useState([]);
  const initialState = event ? {
    PK_iMaSukien: event.PK_iMaSukien,
    sTenSukien: event.sTenSukien,
    sSlugSukien: event.sSlugSukien,
    dThoigianBatdau: event.dThoigianBatdau,
    dThoigianKetthuc: event.dThoigianKetthuc,
    sMota: event.sMota,
    sDiadiem: event.sDiadiem,
    sLinkanh: event.sLinkanh,
    FK_iMaTrangthai: event.FK_iMaTrangthai,
    FK_iMaTaikhoan: event.FK_iMaTaikhoan,
  } : {
    PK_iMaSukien: 0,
    sTenSukien: '',
    sSlugSukien: '',
    dThoigianBatdau: null,
    dThoigianKetthuc: null,
    sMota: '',
    sDiadiem: '',
    sLinkanh: '',
    FK_iMaTrangthai: 1,
    FK_iMaTaikhoan: null,
  };
  const initialDetailState = {
    PK_iMaCTSuKien: 0,
    FK_iMaSuKien: 1,
    dNgayToChuc: new Date(),
    sThongTinChiTiet: "",
    sMoTa: "",
    iThoiLuong: 0,
    sViTri: "",
    iTrangThai: 1,
  };
  const [eventEdit, setEventEdit] = useState(initialState);
  const [eventEditCategories, setEventEditCategories] = useState([]);
  const [eventDetailEdit, setEventDetailEdit] = useState(initialDetailState);
  const [categories, setCategories] = useState([]);

  const userInfo = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    if (userInfo) {
      getCategories();
    } else {
      Router.push('/');
    }
  }, [userInfo]);

  useEffect(() => {
    if (event) {
      const listDetail = event.eventDetails.map((detail) => {
        return {
          PK_iMaCTSuKien: detail.PK_iMaCTSuKien,
          FK_iMaSuKien: detail.FK_iMaSuKien,
          dNgayToChuc: new Date(detail.dNgayToChuc),
          sThongTinChiTiet: detail.sThongTinChiTiet,
          sMoTa: detail.sMoTa,
          iThoiLuong: detail.iThoiLuong,
          sViTri: detail.sViTri,
          iTrangThai: detail.iTrangThai,
        }
      })
      setListEventDetails(listDetail);
    }
  }, event) 


  const getCategories = () => {
    axios
      .get(`${API_URL}/account/the-loai`)
      .then((res) => {
        if (res.status === 200 && res.data) {
          setCategories(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeFile = (files) => {
    console.log(files)
  };

  const handleChangeStatus = (status) => {
    console.log(status)
  };

  const handleChangeDateSubEvent = (newValue) => {
    console.log(newValue);
  }

  const handleOnSubmit = (e) => {
    const validate = validateEvent();
    if (validate) {
      const newEvent = {...eventEdit}
      newEvent.PK_iMaSukien = new Date().getTime();
      newEvent.FK_iMaTaikhoan = userInfo._id;
      let ID = new Date().getTime();

      const newEventDetail = listEventDetails.map((detail) => {
        return {
          ...detail,
          PK_iMaCTSuKien: ID++,
          FK_iMaSuKien: newEvent.PK_iMaSukien
        }
      });

      const newEventCategories = eventEditCategories.map((cat) => {
        return {
          PK_iMaTheloai: cat,
          PK_iMaSukien: newEvent.PK_iMaSukien
        }
      })

      saveEvent(newEvent, newEventDetail, newEventCategories);
    }
  };

  const saveEvent = (event, details, categories) => {
    axios.post(`${API_URL}/event/tao-su-kien`, {
      event, details, categories
    })
      .then(res => {
        if (res.status === 200 && res.data) {
          setEventEdit(initialState);
          setEventDetailEdit(initialDetailState);
          setEventEditCategories([]);
          setListEventDetails([]);
          toast.success(`Create event successfully!`)
        };
      })
      .catch(err => {
        toast.error(`Somethings wrong when create event, please try again!`);
        console.error(err);
      })
  }

  const handleChangeCategry = (e) => {
    setEventEditCategories(e.target.value);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  }

  const handleClickEdit = (detail) => {
    const newDetail = { ...detail }
    setOpenModal(true);
    setEventDetailEdit(newDetail);
  }

  const handleClickAddDetail = () => {
    setOpenModal(true);
    setEventDetailEdit(initialDetailState);
  }

  const handleChangeTimeEvent = (time) => {
    const newEventEdit = { ...eventEdit };
    newEventEdit.dThoigianBatdau = time[0];
    newEventEdit.dThoigianKetthuc = time[1];
    setEventEdit(newEventEdit);
  }

  const handleOnSubmitDetail = () => {
    const checkValidate = validateEventDetail();
    if (!checkValidate) return false;

    let newListEventDetail = [...listEventDetails];
    if (eventDetailEdit?.PK_iMaCTSuKien) {
      newListEventDetail = listEventDetails.map((detail) => {
        return (newDetail?.PK_iMaCTSuKien === detail?.PK_iMaCTSuKien) ? eventDetailEdit : detail;
      })
    } else {
      newListEventDetail.push({...eventDetailEdit, PK_iMaCTSuKien: new Date().getTime()});
    }
    setListEventDetails(newListEventDetail);
    setOpenModal(false);
  }

  const handleOnCloseDetail = () => {
    setOpenModal(false);
  }
  const validateEvent = () => {
    for (const [key, value] of Object.entries(eventEdit)) {
      if ([
        'PK_iMaSukien', 
        'FK_iMaTrangthai', 
        'FK_iMaTaikhoan',
        'sLinkanh',
      ].includes(key)) continue;
      if (!value) {
        toast.error(`${key} can't be empty!`);
        return false;
      };
    };
    if (!eventEditCategories.length) {
      toast.error(`Category of event can't be empty!`);
      return false;
    }
    return true;
  }

  const validateEventDetail = () => {
    for (const [key, value] of Object.entries(eventDetailEdit)) {
      if (key === 'PK_iMaCTSuKien') continue;
      if (key === 'iThoiLuong' && value < 1) {
        toast.error(`Time can't be lower than 1 minutes!`);
        return false;
      }
      if (!value) {
        toast.error(`${key} can't be empty!`);
        return false;
      };
    };
    return true;
  }
  const handleInputEventChange = (e, key) => {
    const newEventEdit = { ...eventEdit };
    newEventEdit[`${key}`] = e.target.value;
    if (key === 'sTenSukien') {
      newEventEdit.sSlugSukien = slugify(e.target.value);
    }
    setEventEdit(newEventEdit);
  };
  
  const slugify = (string) => {
    const a = 'àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;'
    const b = 'aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')
    return string.toString().toLowerCase()
      .replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a')
      .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e')
      .replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i')
      .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o')
      .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u')
      .replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y')
      .replace(/đ/gi, 'd')
      .replace(/\s+/g, '-')
      .replace(p, c => b.charAt(a.indexOf(c)))
      .replace(/&/g, '-and-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '')
  }

  return (
    <div className={classes.container}>
      <h2><span>Create new event</span></h2>
      <GridContainer>
        <GridItem md={12}>
          <CustomInput
            labelText="Event name..."
            id="eventName"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              onChange: (e) => handleInputEventChange(e, 'sTenSukien'),
              value: eventEdit?.sTenSukien || '',
              endAdornment: (
                <InputAdornment position="end">
                  <Icon className={classes.icons}>architecture</Icon>
                </InputAdornment>
              ),
            }}
          />
        </GridItem>
        <GridItem md={6}>
          <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateRangePicker
                disablePast
                value={[eventEdit.dThoigianBatdau, eventEdit.dThoigianKetthuc]}
                onChange={handleChangeTimeEvent}
                renderInput={(startProps, endProps) => (
                  <React.Fragment>
                    <TextField label="Date start" className={classes.dateRangePicker} {...startProps} />
                    <Box sx={{ mx: 2 }}> to </Box>
                    <TextField label="Date end" className={classes.dateRangePicker} {...endProps} />
                  </React.Fragment>
                )}
              />
            </LocalizationProvider>
          </div>
          <div className={classes.selectContainer}>
            <FormControl style={{ width: "100%" }} className={classes.eventCategory}>
              <InputLabel id="event-category-label">Event category</InputLabel>
              <Select
                labelId="event-category-label"
                id="event-category"
                multiple
                value={eventEditCategories}
                onChange={handleChangeCategry}
                input={<OutlinedInput label="Category" />}
                MenuProps={MenuProps}
              >
                {categories.map((option) => (
                  <MenuItem
                    key={option.PK_iMaTheloai}
                    value={option.PK_iMaTheloai}
                  >
                    {option.sTenTheloai}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div>
            <CustomInput
              labelText="Event location..."
              id="eventLocation"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                onChange: (e) => handleInputEventChange(e, 'sDiadiem'),
                value: eventEdit?.sDiadiem || '',
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon className={classes.icons}>map</Icon>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div>
            <TextField
              id="eventDescription"
              label="Event description..."
              multiline
              variant="standard"
              className={classes.eventDescription}
              onChange={(e) => handleInputEventChange(e, 'sMota')}
              value={eventEdit?.sMota || ''}
            />
          </div>
        </GridItem>
        <GridItem md={6}>
          <DropzoneArea
            acceptedFiles={['image/*']}
            dropzoneText={"Event thumbnails"}
            onChange={(files) => handleChangeFile(files)}
            dropzoneClass={classes.fileWrapper}
            filesLimit={1}
          />
        </GridItem>
        <GridItem md={12}>
          <br /><br />
          <TableContainer className={classes.customTable} component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Sub Event Title</TableCell>
                  <TableCell align="right">Datetime start</TableCell>
                  <TableCell align="right">Long (minutes)</TableCell>
                  <TableCell align="right">Place</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listEventDetails.map((row) => (
                  <TableRow
                    key={row.PK_iMaCTSuKien}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{row.sThongTinChiTiet}</TableCell>
                    <TableCell align="right">{format(row.dNgayToChuc, 'HH:mm dd/MM/yyyy')}</TableCell>
                    <TableCell align="right">{row.iThoiLuong}</TableCell>
                    <TableCell align="right">{row.sViTri}</TableCell>
                    <TableCell align="right">{mapStatusEvent[row.iTrangThai]}</TableCell>
                    <TableCell align="right">
                      <Button
                        style={styles.verticalCenter}
                        size="sm"
                        justIcon
                        round
                        color="primary"
                        onClick={() => handleClickEdit(row)}
                      >
                        <Icon className={classes.icons}>edit</Icon>
                      </Button>
                      <Button style={styles.verticalCenter} size="sm" justIcon round color="danger">
                        <Icon className={classes.icons}>delete_forever</Icon>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={7} style={{ textAlign: "right" }}>
                    <Button round color="info" onClick={handleClickAddDetail}>
                      <Icon className={classes.icons}>add</Icon> &nbsp; Add event detail
                    </Button>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </GridItem>
        <GridItem md={12} style={{ textAlign: "center" }}>
          <Button round color="success" style={{ marginTop: "20px" }} onClick={handleOnSubmit}>
            <Icon className={classes.icons}>check</Icon> &nbsp; Create event
          </Button>
        </GridItem>
      </GridContainer>
      <Modal
        open={isOpenModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {eventDetailEdit?.PK_iMaCTSuKien ? 'Edit event detail' : 'Add event detail'}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <GridContainer>
              <GridItem md={12}>
                <CustomInput
                  labelText="Event detail name..."
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    value: eventDetailEdit?.sThongTinChiTiet || '',
                    onChange: (e) => setEventDetailEdit({
                      ...eventDetailEdit,
                      sThongTinChiTiet: e.target.value,
                    }),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className={classes.icons}>drive_file_rename_outline</Icon>
                      </InputAdornment>
                    ),
                  }}
                />
              </GridItem>
              <GridItem md={12}>
                <TextField
                  value={eventDetailEdit?.sMoTa || ''}
                  label="Event detail description..."
                  multiline
                  variant="standard"
                  className={classes.eventDescription}
                  onChange={(e) => setEventDetailEdit({
                    ...eventDetailEdit,
                    sMoTa: e.target.value,
                  })}
                />
              </GridItem>
              <GridItem md={6}>
                <div className={classes.eventDetailDate}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      label="Event detail date"
                      onChange={(date) => setEventDetailEdit({
                        ...eventDetailEdit,
                        dNgayToChuc: date,
                      })}
                      value={eventDetailEdit?.dNgayToChuc}
                      renderInput={(params) => <TextField className={classes.dateRangePicker} {...params} />}
                    />
                  </LocalizationProvider>
                </div>
              </GridItem>
              <GridItem md={6}>
                <CustomInput
                  labelText="Time long (minutes)"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    value: eventDetailEdit?.iThoiLuong || '',
                    onChange: (e) => setEventDetailEdit({
                      ...eventDetailEdit,
                      iThoiLuong: e.target.value,
                    }),
                    type: "number",
                    min: 1,
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className={classes.icons}>timer</Icon>
                      </InputAdornment>
                    ),
                  }}
                />
              </GridItem>
              <GridItem md={6}>
                <TextField
                  value={eventDetailEdit?.sViTri || ''}
                  label="Place..."
                  multiline
                  variant="standard"
                  className={classes.eventDescription}
                  onChange={(e) => setEventDetailEdit({
                    ...eventDetailEdit,
                    sViTri: e.target.value,
                  })}
                />
              </GridItem>
              <GridItem md={6}>
                <FormControl fullWidth className={classes.eventDescription}>
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Event status
                  </InputLabel>
                  <NativeSelect
                    inputProps={{
                      value: eventDetailEdit?.iTrangThai || '',
                      onChange: (e) => setEventDetailEdit({
                        ...eventDetailEdit,
                        iTrangThai: e.target.value,
                      }),
                      name: 'event-status',
                      id: 'event-status',
                    }}
                  >
                    <option value={1}>Active</option>
                    <option value={2}>Cancel</option>
                  </NativeSelect>
                </FormControl>
              </GridItem>
              <GridItem md={12} style={{ textAlign: "center" }}>
                <Button round color="success" style={{ marginTop: "20px" }} onClick={handleOnSubmitDetail}>
                  <Icon className={classes.icons}>check</Icon> &nbsp; {eventDetailEdit?.PK_iMaCTSuKien ? 'Save event detail' : 'Add event detail'}
                </Button>
                &emsp;
                <Button round color="default" style={{ marginTop: "20px" }} onClick={handleOnCloseDetail}>
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

export default EventForm;