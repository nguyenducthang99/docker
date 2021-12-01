import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const tbl_chucnang = mongoose.Schema({
    PK_sMaChucnang: {
        type: Number,
        required: true,
    },
    sTenChucnang: {
        type: String,
        required: true,
    },
    FK_iMaNhomchucnang: {
        type: Number,
        required: true,
    },
})

export const tbl_chucnang = mongoose.model('tbl_chucnang', tbl_chucnangSchema);