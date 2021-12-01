import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const tbl_hosoSchema = mongoose.Schema({
    PK_iMaHoso: {
        type: Number,
        required: true,
    },
    sCMND: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    sLinkAnhtruoc: {
        type: String,
    },
    sLinkAnhsau: {
        type: String,
    },
    FK_iMaTrangthaiHoso:  {
        type: Number,
        required: true,
    },
    FK_iMaTaiKhoan: {
        type: String,
        required: true,
    },
})

export const tbl_hoso = mongoose.model('tbl_hoso', tbl_hosoSchema);