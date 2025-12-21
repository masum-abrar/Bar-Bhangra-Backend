import express from 'express'
import multer from 'multer'
import {
  createLiftType,
  deleteLiftType,
  getLiftType,
  updateLiftType
} from '../../controllers/lifttype/lifttype.js'

const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = express.Router()

router.post('/v1/lift-types', upload.single('image'), createLiftType)
router.get('/v1/lift-types', getLiftType)
router.put('/v1/lift-types/:id', upload.single('image'), updateLiftType)
router.delete('/v1/lift-types/:id', deleteLiftType)

export default router
