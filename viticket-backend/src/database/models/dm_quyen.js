import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const dm_quyenSchema = mongoose.Schema({
    PK_iMaQuyen: {
        type: Number,
        required: true,
    },
    sTenQuyen: {
        type: String,
        required: true,
    },
})

export const dm_quyen = mongoose.model('dm_quyen', dm_quyenSchema);