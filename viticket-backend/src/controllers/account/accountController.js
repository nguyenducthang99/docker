import {dm_trangthaitaikhoan} from '../../database/models/dm_trangthaitaikhoan.js'
import {dm_quyen} from '../../database/models/dm_quyen.js'
import {tbl_taikhoan} from '../../database/models/tbl_taikhoan.js'
import {tbl_hoso} from '../../database/models/tbl_hoso.js'
import {tbl_theloai} from '../../database/models/tbl_theloai.js'

const  account = {
    initTrangThaiTaiKhoan: (request, response) => {
        const list = [
            {
                PK_iMaTrangthai: 0,
                sTenTrangthai: 'Đang khóa',
            },
            {
                PK_iMaTrangthai: 1,
                sTenTrangthai: 'Hoạt động',
            },
            {
                PK_iMaTrangthai: 2,
                sTenTrangthai: 'Chưa xác thực',
            },
        ];
        dm_trangthaitaikhoan.deleteMany({}, () => {
            list.forEach((el) => {
                let newObj = new dm_trangthaitaikhoan(el);
                newObj.save();
            }); 
        });
        response.json(list);
    },
    initQuyen: (request, response) => {
        const list = [
            {
                PK_iMaQuyen: 100,
                sTenQuyen: 'Admin',
            },
            {
                PK_iMaQuyen: 10,
                sTenQuyen: 'Người quan trị',
            },
            {
                PK_iMaQuyen: 2,
                sTenQuyen: 'Người bán',
            },
            {
                PK_iMaQuyen: 1,
                sTenQuyen: 'Người mua',
            },
        ];
        dm_quyen.deleteMany({}, () => {
            list.forEach((el) => {
                let newObj = new dm_quyen(el);
                newObj.save();
            }); 
        });
        response.json(list);
    },
    initTheLoai: (request, response) => {
        let timestamp = new Date().getTime();
        const list = [
            {
                PK_iMaTheloai: 1,
                sTenTheloai: 'Concerts',
                sSlugTheloai: 'concerts',
                sLinkAnh: "",
                iThutu: 1,
                FK_iMaNguoithem: 1633179710981,
            },
            {
                PK_iMaTheloai: 2,
                sTenTheloai: 'Sports',
                sSlugTheloai: 'sports',
                sLinkAnh: "",
                iThutu: 2,
                FK_iMaNguoithem: 1633179710981,
            },
            {
                PK_iMaTheloai: 3,
                sTenTheloai: 'Art & Theater',
                sSlugTheloai: 'art-theater',
                sLinkAnh: "",
                iThutu: 3,
                FK_iMaNguoithem: 1633179710981,
            },
            {
                PK_iMaTheloai: 4,
                sTenTheloai: 'Family',
                sSlugTheloai: 'family',
                sLinkAnh: "",
                iThutu: 4,
                FK_iMaNguoithem: 1633179710981,
            },
        ];
        tbl_theloai.deleteMany({}, () => {
            list.forEach((el) => {
                let newObj = new tbl_theloai(el);
                newObj.save();
            }); 
        });
        response.json(list);
    },
    listTrangThaiTaiKhoan: (request, response) => {
        dm_trangthaitaikhoan.find({}, (err, doc) => {
            if (err)
                response.send(err)
            response.json(doc)
        })
    },
    listQuyen: (request, response) => {
        dm_quyen.find({}, (err, doc) => {
            if (err)
                response.send(err)
            response.json(doc)
        })
    },
    listHoSo: (request, response) => {
        const filter  = { FK_iMaTaiKhoan: request.params.user }
        tbl_hoso.find(filter, (err, doc) => {
            if (err)
                response.send(err)
            response.json(doc)
        })
    },
    listTheLoai: (request, response) => {
        const filter  = request.params.filter;
        tbl_theloai.find(filter, (err, doc) => {
            if (err)
                response.send(err)
            response.json(doc)
        })
    },
    quyen: (request, response) => {
        const rule = request.params.rule
        dm_quyen.findOne({ PK_iMaQuyen: rule }, (err, doc) => {
            if (err)
                response.send(err)
            response.json(doc)
        })
    },
    checkUsername: (request, response) => {
        const username = request.params.username
        tbl_taikhoan
            .findOne({ sTenNguoidung: username })
            .exec(function (err, doc) {
                if (err)
                    response.send(err)
                response.json(!!doc)
            })
    },
    checkEmail: (request, response) => {
        const email = request.params.email
        tbl_taikhoan
            .findOne({ sEmail: email })
            .exec(function (err, doc) {
                if (err)
                    response.send(err)
                response.json(!!doc)
            })
    },
    checkUserEmail: (request, response) => {
        const { user, email } = request.params
        tbl_taikhoan
            .findOne({ sEmail: email, PK_iMaTaikhoan: { $ne: user } })
            .exec(function (err, doc) {
                if (err)
                    response.send(err)
                response.json(!!doc)
            })
    },
    checkPhone: (request, response) => {
        const phone = request.params.phone
        tbl_taikhoan
            .findOne({ sSodienthoai: phone })
            .exec(function (err, doc) {
                if (err)
                    response.send(err)
                response.json(!!doc)
            })
    },
    checkUserCMND: (request, response) => {
        const { user, cmnd } = request.params
        const filter = { PK_iMaTaikhoan: { $ne: user }, sCMND: cmnd, FK_iMaTrangthaiHoso: 1 }

        tbl_hoso
            .findOne(filter)
            .exec(function (err, doc) {
                if (err)
                    response.send(err)
                response.json(!!doc)
            })
    },
    checkUserPhone: (request, response) => {
        const { user, phone } = request.params
        tbl_taikhoan
            .findOne({ sSodienthoai: phone, PK_iMaTaikhoan: { $ne: user } })
            .exec(function (err, doc) {
                if (err)
                    response.send(err)
                response.json(!!doc)
            })
    },
    checkDangNhap: (request, response) => {
        const {email, password} = request.body
        tbl_taikhoan
            .findOne({ sEmail: email, sMatkhau: password })
            .exec(function (err, doc) {
                if (err)
                    response.send(err)
                response.json(doc)
            })
    },
    taoTaiKhoan: (request, response) => {
        const newAccount = new tbl_taikhoan(request.body.newAccount);
        newAccount.save((err, doc) => {
            if (err)
                response.send(err)
            response.json(doc)
        });
    },
    taoHoSo: (request, response) => {
        const { _id } = request.params
        const hoSo = request.body.cmnd;
        const newHoSo = new tbl_hoso(hoSo);

        newHoSo.save((err, doc) => {
            if (err)
                response.send(err)
            response.json(doc)
        });
    },
    danhSachTaiKhoan: (request, response) => {
        tbl_taikhoan.find({ FK_iMaQuyen: { $lt: 100 } }, (err, doc) => {
            if (err)
                response.send(err)
            response.json(doc)
        })
    },
    suaThongTin: (request, response) => {
        const { _id } = request.params
        const newInfo = request.body.newInfo;
        tbl_taikhoan
            .findOneAndUpdate({ _id }, newInfo, (err, doc) => {
                if (err)
                    response.send(err)
                response.json(doc)
            })
    },
    dangKyBan: (request, response) => {
        const { _id } = request.params
        tbl_taikhoan
            .findOneAndUpdate({ _id }, { FK_iMaQuyen: 2 }, (err, doc) => {
                if (err)
                    response.send(err)
                response.json(doc)
            })
    },
    doiMatKhau: (request, response) => {
        const { _id } = request.params
        const password = request.body.password;
        tbl_taikhoan
            .findOneAndUpdate({ _id }, { sMatkhau: password }, (err, doc) => {
                if (err)
                    response.send(err)
                response.json(doc)
            })  
    }
}

export default account