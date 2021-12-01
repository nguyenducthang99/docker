import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const tbl_nhomchucnangSchema = mongoose.Schema({
    PK_iMaNhomchucnang: {
        type: Number,
        required: true,
    },
    sTenNhomchucnang: {
        type: String,
        required: true,
    },
})

export const tbl_nhomchucnang = mongoose.model('tbl_nhomchucnang', tbl_nhomchucnangSchema);