import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const tbl_loaive_sukienSchema = mongoose.Schema({
    PK_iMaLoaiVe: {
        type: Number,
        required: true,
    },
    FK_iMaCTSuKien: {
        type: Number,
        required: true,
    },
    sTenLoaiVe: {
        type: String,
        required: true,
    },
    iSoLuong: {
        type: Number,
        required: true,
    },
    iGiave: {
        type: Number,
        required: true,
    },
    sPhanLoai: {
        type: String,
    },
})

export const tbl_loaive_sukien = mongoose.model('tbl_loaive_sukien', tbl_loaive_sukienSchema);