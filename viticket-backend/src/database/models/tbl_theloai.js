import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const tbl_theloaiSchema = mongoose.Schema({
    PK_iMaTheloai: {
        type: Number,
        required: true,
    },
    sTenTheloai: {
        type: String,
        required: true,
    },
    sSlugTheloai: {
        type: String,
        required: true,
    },
    sLinkAnh: {
        type: String,
    },
    iThutu: {
        type: Number,
    },
    FK_iMaNguoithem: {
        type: Number,
        required: true,
    },
})

export const tbl_theloai = mongoose.model('tbl_theloai', tbl_theloaiSchema);