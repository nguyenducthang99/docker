import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const tbl_theloai_sukienSchema = mongoose.Schema({
    PK_iMaTheloai: {
        type: Number,
        required: true,
    },
    PK_iMaSukien: {
        type: Number,
        required: true,
    },
})

export const tbl_theloai_sukien = mongoose.model('tbl_theloai_sukien', tbl_theloai_sukienSchema);