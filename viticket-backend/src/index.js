import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'

import routes from './routes/index.js'
import database from './database/connect.js'

import {tbl_ve_sukien} from './database/models/tbl_ve_sukien.js'
import {tbl_loaive_sukien} from './database/models/tbl_loaive_sukien.js'
import {tbl_theloai} from './database/models/tbl_theloai.js'
import { tbl_theloai_sukien } from './database/models/tbl_theloai_sukien.js'
import { tbl_sukien } from './database/models/tbl_sukien.js'

const app = express()
app.use(cors())

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true }))

var schema = buildSchema(`
    type Query {
        ticketsEvent(type_id: String): [Tickets]
        ticketsTypeEvent(sub_event_ids: [String]): [TicketTypes]
        categories: [Category]
        catEventsId(id: Int): [Event]
        cat(id: Int): Category
    },
    type TicketTypes {
      PK_iMaLoaiVe: String
      FK_iMaCTSuKien: String
      sTenLoaiVe: String
      iSoLuong: Int
      iGiave: Int
      sPhanLoai: String
    },
    type Tickets {
      PK_iMaVe: String
      FK_iMaLoaiVe: String
      sViTri: String
      iGiave: Int
      iTrangThai: Int
    },
    type Category {
      PK_iMaTheloai: String
      sTenTheloai: String
      sSlugTheloai: String
      sLinkAnh: String
    },
    type Event {
      PK_iMaSukien: String
      sTenSukien: String
      sSlugSukien: String
      dThoigianBatdau: String
      dThoigianKetthuc: String
      sMota: String
      sDiadiem: String
      sLinkanh: String
      eventDetails: Int
    }
`);

const getTickesOfEvent = async (args) => {
  const { type_id } = args;
  const docs = await tbl_ve_sukien.find({
    FK_iMaLoaiVe: type_id
  }).exec();
  return docs;
}

const getTicketsTypeEvent = async (args) => {
  const { sub_event_ids } = args;
  const docs = await tbl_loaive_sukien.find({
    FK_iMaCTSuKien: { $in: sub_event_ids },
  })
  return docs;
}

const getCategories = async () => {
  const docs = await tbl_theloai.find();
  return docs;
}

const getCat = async (args) => {
  const { id } = args;
  const docs = await tbl_theloai.findOne({ PK_iMaTheloai: id });
  return docs;
}

const getCatEventsById = async (args) => {
  const { id } = args;
  const eventType = await tbl_theloai_sukien.find({ PK_iMaTheloai: id });
  const ids = eventType.map(e => e.PK_iMaSukien);
  const events = await tbl_sukien.find({
    PK_iMaSukien: { $in: ids }
  })
  return events.map(e => {
    const s = JSON.parse(JSON.stringify(e))
    s.eventDetails = Math.floor(Math.random() * 5) + 1;
    return s;
  });
}

const root = { 
  ticketsTypeEvent: getTicketsTypeEvent,
  ticketsEvent: getTickesOfEvent,
  categories: getCategories,
  catEventsId: getCatEventsById,
  cat: getCat,
};

// * Routes * //
app.use('/api/account', routes.account)
app.use('/api/event', routes.event)

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

// * Start * //

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
)
