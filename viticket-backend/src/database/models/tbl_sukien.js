import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const tbl_sukienSchema = mongoose.Schema({
    PK_iMaSukien: {
        type: Number,
        required: true,
    },
    sTenSukien: {
        type: String,
        required: true,
    },
    sSlugSukien: {
        type: String,
        required: true,
    },
    dThoigianBatdau: {
        type: Date,
        required: true,
    },
    dThoigianKetthuc: {
        type: Date,
        required: true,
    },
    sMota: {
        type: String,
    },
    sDiadiem: {
        type: String,
    },
    sLinkanh: {
        type: String,
    },
    FK_iMaTrangthai: {
        type: Number,
        required: true,
    },
    FK_iMaTaikhoan: {
        type: String,
        required: true,
    },
    eventDetails: {
        type: [Map],
    }
})

export const tbl_sukien = mongoose.model('tbl_sukien', tbl_sukienSchema);