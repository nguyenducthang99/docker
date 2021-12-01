import mongoose from 'mongoose'
const Schema = mongoose.Schema

const dm_trangthaitaikhoanSchema = mongoose.Schema({
    PK_iMaTrangthai: {
        type: Number,
        required: true,
    },
    sTenTrangthai: {
        type: String,
        required: true,
    },
})

export const dm_trangthaitaikhoan = mongoose.model('dm_trangthaitaikhoan', dm_trangthaitaikhoanSchema);