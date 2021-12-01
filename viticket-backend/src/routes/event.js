import { Router } from 'express'
import event from '../controllers/account/eventController.js'

const router = Router()

router.get('/owner-events/:user', event.ownerEvents)
router.get('/edit-events/:eventId', event.infoEditEvent)
router.get('/ids', event.getListEventsIds)

router.post('/tao-su-kien', event.taoSuKien)
router.post('/the-loai-event', event.theLoaiEvent)
router.post('/tao-loai-ve-event', event.taoLoaiVeEvent)

export default router
