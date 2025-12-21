import prisma from '../../utils/prismaClient.js'

export const getServices = async (req, res) => {
  const data = await prisma.services.findMany({
    include: { liftTypes: true }
  })

  res.json(data)
}

// GET /services/:id
export const singleService = async (req, res) => {
  const { id } = req.params

  const service = await prisma.services.findUnique({
    where: { id: parseInt(id) }, // Convert to number if your ID is Int
    include: { liftTypes: true }
  })

  if (!service) {
    return res.status(404).json({ message: 'Service not found' })
  }

  res.json(service)
}

export const createServices = async (req, res) => {
  const { slug, title, shortDescription, fullDescription } = req.body
  const service = await prisma.services.create({
    data: {
      slug,
      title,
      shortDescription,
      fullDescription
    }
  })
  res.json(service)
}

export const updateServices = async (req, res) => {
  const { id } = req.params
  const { slug, title, shortDescription, fullDescription } = req.body
  const updated = await prisma.services.update({
    where: { id: Number(id) },
    data: { slug, title, shortDescription, fullDescription }
  })
  res.json(updated)
}

export const deleteServices = async (req, res) => {
  const { id } = req.params
  await prisma.liftType.deleteMany({ where: { serviceId: Number(id) } }) // cascade delete
  await prisma.services.delete({ where: { id: Number(id) } })
  res.json({ success: true })
}
