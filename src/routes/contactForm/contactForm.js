import express from 'express'
import {
  createMessage,
  getMessage,
  replyContact
} from '../../controllers/contactForm/contactForm.js'

const router = express.Router()

router.post('/v1/contact', createMessage)
router.get('/v1/contact', getMessage)
router.patch('/v1/contact/:id/reply', replyContact)

// router.post('/v1/gallery', upload.array('images', 5), createGallery)
// router.get('/v1/gallery', getGallery)
// router.put('/v1/gallery/:id', upload.array('images', 5), updateGallery)
// router.get('v1/gallery/:id', getGalleryById)
// router.delete('/v1/gallery/:id', deleteGallery)

export default router
