import jsonResponse from '../../utils/jsonResponse.js';
import prisma from '../../utils/prismaClient.js'
import uploadToCLoudinary from '../../utils/uploadToCloudinary.js';

export const getLiftType = async (req, res) => {
  const liftTypes = await prisma.liftType.findMany({
    include: { service: true }
  })
  res.json(liftTypes)
}



// Create Lift Type
export const createLiftType = async (req, res) => {
  try {
    const { title, badge, description, feature, serviceId } = req.body;

    let imageUrl = "";
    if (req.file) {
      imageUrl = await new Promise((resolve, reject) => {
        uploadToCLoudinary(req.file, "liftType", (err, result) => {
          if (err) return reject(err);
          if (!result?.secure_url) return reject("Upload failed");
          resolve(result.secure_url);
        });
      });
    }

    const liftType = await prisma.liftType.create({
      data: {
        title,
        badge,
        description,
        feature: feature.split(",").map((f) => f.trim()),
        image: imageUrl,
        serviceId: parseInt(serviceId),
      },
    });

    res.json(jsonResponse(true, "Lift type created successfully", liftType));
  } catch (error) {
    console.error(error);
    res.status(500).json(jsonResponse(false, "Server error", null));
  }
};


// Update Lift Type
export const updateLiftType = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, badge, description, feature, serviceId } = req.body;

    let imageUrl;
    if (req.file) {
      imageUrl = await new Promise((resolve, reject) => {
        uploadToCLoudinary(req.file, "liftType", (err, result) => {
          if (err) return reject(err);
          if (!result?.secure_url) return reject("Image upload failed");
          resolve(result.secure_url);
        });
      });
    }

    const updated = await prisma.liftType.update({
      where: { id: Number(id) },
      data: {
        title,
        badge,
        description,
        feature: feature.split(",").map((f) => f.trim()),
        ...(imageUrl && { image: imageUrl }),
        serviceId: parseInt(serviceId),
      },
    });

    res.json(jsonResponse(true, "Lift type updated successfully", updated));
  } catch (error) {
    console.error(error);
    res.status(500).json(jsonResponse(false, "Server error", null));
  }
};


export const deleteLiftType = async (req, res) => {
  await prisma.liftType.delete({
    where: { id: Number(req.params.id) }
  })
  res.json({ success: true })
}
