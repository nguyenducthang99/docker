import {tbl_theloai} from '../../database/models/tbl_theloai.js'
import {tbl_sukien} from '../../database/models/tbl_sukien.js'
import {tbl_theloai_sukien} from '../../database/models/tbl_theloai_sukien.js'
import {tbl_chitiet_sukien} from '../../database/models/tbl_chitiet_sukien.js'
import {tbl_loaive_sukien} from '../../database/models/tbl_loaive_sukien.js'
import {tbl_ve_sukien} from '../../database/models/tbl_ve_sukien.js'

const  event = {
    taoTheloai: (request, response) => {
        const newCategory = new tbl_theloai(request.body.newCategory);
        newCategory.save((err, doc) => {
            if (err)
                response.send(err)
            response.json(doc)
        });
    },
    listTheloai: (request, response) => {
        tbl_theloai.find({}, (err, doc) => {
            if (err)
                response.send(err)
            response.json(doc)
        })
    },
    getCategory: (request, response) => {
        const { id } = request.params.id
        tbl_theloai
            .findOne({ PK_iMaTheloai: id })
            .exec(function (err, doc) {
                if (err)
                    response.send(err)
                response.json(doc)
            })
    },
    updateCategory: (request, response) => {
        const { id } = request.params.id
        const newCategory = request.body.newCategory;

        tbl_theloai
            .findOneAndUpdate({ PK_iMaTheloai: id }, newCategory)
            .exec(function (err, doc) {
                if (err)
                    response.send(err)
                response.json(doc)
            })
    },
    deleteCategory: (request, response) => {
        const id = request.body.id;

        tbl_theloai
            .findOneAndRemove({ PK_iMaTheloai: id })
            .exec(function (err, doc) {
                if (err)
                    response.send(err)
                response.json(doc)
            })
    },
    taoSuKien: (request, response) => {
        const { event, details, categories } = request.body;
        event.eventDetails = details;
        const newEvent = new tbl_sukien(event);
        newEvent.save((err, doc) => {
            if (err)
                response.send(err)
            else {
                response.json(doc)
                categories.forEach( function(cat) {
                    const newEventCat = new tbl_theloai_sukien(cat);
                    newEventCat.save();
                });
                if (details.length) {
                    details.forEach( function(detail) {
                        const newEventDetail = new tbl_chitiet_sukien(detail);
                        newEventDetail.save();
                    });

                }
            }
        });
    },
    ownerEvents: (request, response) => {
        const user = request.params.user;
        const filter = { FK_iMaTaikhoan: user };
        tbl_sukien.find(filter, (err, doc) => {
            if (err)
                response.send(err)
            response.json(doc)
        })
    },
    theLoaiEvent: (request, response) => {
        const eventIDs = request.body.eventIDs;
        const filter = { PK_iMaSukien: { $in: eventIDs } };
        tbl_theloai_sukien.find(filter, (err, doc) => {
            if (err)
                response.send(err)
            response.json(doc)
        })
    },
    infoEditEvent: (request, response) => {
        const eventId = request.params.eventId;
        const filter = { PK_iMaSukien: eventId };
        tbl_sukien.findOne(filter, (err, doc) => {
            if (err)
                response.send(err)
            response.json(doc)
        })
    },
    getListEventsIds: (request, response) => {
        const query = tbl_sukien.find({}).select('PK_iMaSukien');
        query.exec(function (err, someValue) {
            if (err) response.send(err)
            response.json(someValue);
        });
    },
    taoLoaiVeEvent: (request, response) => {
        const { loaiVe, listVe } = request.body;
        const newLoaiVe = new tbl_loaive_sukien(loaiVe);
        newLoaiVe.save((err, doc) => {
            if (err)
                response.send(err)
            else {
                listVe.forEach((ve) => {
                    const newVe = new tbl_ve_sukien(ve);
                    newVe.save();
                })
                response.json(doc);
            }
        })
    },
}

export default event