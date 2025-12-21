import express from 'express'
import multer from 'multer'
import {
  createGallery,
  deleteGallery,
  getGallery,
  getGalleryById,
  updateGallery
} from '../../controllers/gallery/gallery.js'

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router()

router.post('/v1/gallery', upload.array('images'), createGallery)
router.get('/v1/gallery', getGallery)
router.put('/v1/gallery/:id', upload.array('images'), updateGallery)
router.get('v1/gallery/:id', getGalleryById)
router.delete('/v1/gallery/:id', deleteGallery)

export default router
