// GET all contacts

import jsonResponse from '../../utils/jsonResponse.js'
import prisma from '../../utils/prismaClient.js'

export const getMessage = async (req, res) => {
  try {
    const contacts = await prisma.contactForm.findMany({
      orderBy: { createdAt: 'desc' }
    })
    res.json(contacts)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch contacts' })
  }
}

// POST new contact
export const createMessage = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body
    const newContact = await prisma.contactForm.create({
      data: { name, email, phone, message }
    })
    res.status(201).json(newContact)
  } catch (err) {
    res.status(500).json({ error: 'Failed to create contact' })
  }
}

// Reply to a contact
export const replyContact = async (req, res) => {
  try {
    const { id } = req.params
    const { reply } = req.body
    console.log(req.body)

    const contact = await prisma.contactForm.update({
      where: { id: Number(id) },
      data: { 
        reply,
        repliedAt: new Date()
      },
    })

    res.json({ success: true, data: contact })
  } catch (err) {
    console.error('Reply error:', err)
    res.status(500).json({ success: false, message: 'Failed to reply contact' })
  }
}

