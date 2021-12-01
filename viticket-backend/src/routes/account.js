import { Router } from 'express'
import account from '../controllers/account/accountController.js'

const router = Router()

router.get('/init-trang-thai-tai-khoan', account.initTrangThaiTaiKhoan)
router.get('/init-quyen', account.initQuyen)
router.get('/init-the-loai', account.initTheLoai)
router.get('/list-trang-thai-tai-khoan', account.listTrangThaiTaiKhoan)
router.get('/list-quyen', account.listQuyen)
router.get('/quyen/:rule', account.quyen)
router.get('/check-username/:username', account.checkUsername)
router.get('/check-email/:email', account.checkEmail)
router.get('/check-email/:user/:email', account.checkUserEmail)
router.get('/check-phone/:phone', account.checkPhone)
router.get('/check-phone/:user/:phone', account.checkUserPhone)
router.get('/check-cmnd/:user/:cmnd', account.checkUserCMND)
router.get('/danh-sach-tai-khoan', account.danhSachTaiKhoan)
router.get('/ho-so/:user', account.listHoSo)
router.get('/the-loai/', account.listTheLoai)

router.post('/tao-tai-khoan', account.taoTaiKhoan)
router.post('/check-dang-nhap', account.checkDangNhap)
router.post('/sua-thong-tin/:_id', account.suaThongTin)
router.post('/doi-mat-khau/:_id', account.doiMatKhau)
router.post('/gui-ho-so/:_id', account.taoHoSo)
router.post('/dang-ky-ban/:_id', account.dangKyBan)

export default router
