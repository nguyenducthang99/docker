import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const tbl_chucnang_quyenSchema = mongoose.Schema({
    PK_iMaQuyen: {
        type: Number,
        required: true,
    },
    PK_iMaChucnang: {
        type: Number,
        required: true,
    },
    iStt: {
        type: Number,
    }
})

export const tbl_chucnang_quyen = mongoose.model('tbl_chucnang_quyen', tbl_chucnang_quyenSchema);