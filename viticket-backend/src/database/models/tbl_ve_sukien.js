import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const tbl_ve_sukienSchema = mongoose.Schema({
    PK_iMaVe: {
        type: Number,
        required: true,
    },
    FK_iMaLoaiVe: {
        type: Number,
        required: true,
    },
    sViTri: {
        type: String,
    },
    iGiave: {
        type: Number,
        required: true,
    },
    iTrangThai: {
        type: Number,
        required: true,
    },
})

export const tbl_ve_sukien = mongoose.model('tbl_ve_sukien', tbl_ve_sukienSchema);