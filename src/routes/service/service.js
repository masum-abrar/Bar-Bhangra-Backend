import express from 'express'
import {
  createServices,
  deleteServices,
  getServices,
  singleService,
  updateServices
} from '../../controllers/service/service.js'

const router = express.Router()

router.post('/v1/services', createServices)
router.get('/v1/services', getServices)
router.get('/v1/services/:id', singleService)
router.put('/v1/services/:id', updateServices)
router.delete('/v1/services/:id', deleteServices)

export default router
