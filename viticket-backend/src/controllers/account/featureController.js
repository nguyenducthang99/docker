import {tbl_nhomchucnang} from '../../database/models/tbl_nhomchucnang.js'
import {tbl_chucnang} from '../../database/models/tbl_chucnang.js'

const  account = {
    initNhomChucNang: (request, response) => {
        const list = [
            {
                PK_iMaNhomchucnang: 1,
                sTenNhomchucnang: 'Danh mục',
            },
            {
                PK_iMaNhomchucnang: 2,
                sTenNhomchucnang: 'Quản lý tài khoản',
            },
            {
                PK_iMaNhomchucnang: 3,
                sTenNhomchucnang: 'Quản lý sự kiện',
            },
        ];
        tbl_nhomchucnang.deleteMany({}, () => {
            list.forEach((el) => {
                let newObj = new tbl_nhomchucnang(el);
                newObj.save();
            }); 
        });
        response.json(list);
    },
    initChucNang: (request, response) => {
        const list = [
            {
                PK_sMaChucnang: 'danh-muc/quyen',
                sTenChucnang: 'Quyền',
                FK_iMaNhomchucnang: 1,
            },
            {
                PK_sMaChucnang: 2,
                sTenChucnang: '',
                FK_iMaNhomchucnang: 'Admin',
            },
            {
                PK_sMaChucnang: 3,
                sTenChucnang: 'Admin',
                FK_iMaNhomchucnang: 'Admin',
            },
            {
                PK_sMaChucnang: 4,
                sTenChucnang: 'Admin',
                FK_iMaNhomchucnang: 'Admin',
            },
            {
                PK_sMaChucnang: 5,
                sTenChucnang: 'Admin',
                FK_iMaNhomchucnang: 'Admin',
            },
            {
                PK_sMaChucnang: 6,
                sTenChucnang: 'Admin',
                FK_iMaNhomchucnang: 'Admin',
            },
        ];
        tbl_chucnang.deleteMany({}, () => {
            list.forEach((el) => {
                let newObj = new tbl_chucnang(el);
                newObj.save();
            }); 
        });
        response.json(list);
    },
}

export default account