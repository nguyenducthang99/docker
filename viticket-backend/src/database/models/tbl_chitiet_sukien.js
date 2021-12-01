import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const tbl_chitiet_sukienSchema = mongoose.Schema({
    PK_iMaCTSuKien: {
        type: Number,
        required: true,
    },
    FK_iMaSuKien: {
        type: Number,
        required: true,
    },
    dNgayToChuc: {
        type: Date,
        required: true,  
    },
    sThongTinChiTiet: {
        type: String,
        required: true,  
    },
    sMoTa: {
        type: String,
        required: true,  
    },
    iThoiLuong: {
        type: Number,
        required: true,  
    },
    sViTri: {
        type: String,
        required: true,  
    },
    iTrangThai: {
        type: Number,
        required: true,  
    }
})

export const tbl_chitiet_sukien = mongoose.model('tbl_chitiet_sukien', tbl_chitiet_sukienSchema);