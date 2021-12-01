import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const tbl_taikhoanSchema = mongoose.Schema({
    PK_iMaTaikhoan: {
        type: Number,
        required: true,
    },
    sTenNguoidung: {
        type: String,
        required: true,
    },
    sEmail: {
        type: String,
    },
    sSodienthoai: {
        type: String,
    },
    sMatkhau: {
        type: String,
        required: true,
    },
    sLinkHoso: {
        type: String,
    },
    FK_iMaTrangthai:  {
        type: Number,
        required: true,
    },
    FK_iMaQuyen: {
        type: Number,
        required: true,
    },
})

export const tbl_taikhoan = mongoose.model('tbl_taikhoan', tbl_taikhoanSchema);