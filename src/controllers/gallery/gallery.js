import prisma from "../../utils/prismaClient.js";
import jsonResponse from "../../utils/jsonResponse.js";
import uploadImage from "../../utils/uploadImage.js";
import uploadToCLoudinary from "../../utils/uploadToCloudinary.js";
import validateInput from "../../utils/validateInput.js";



export const createGallery = async (req, res) => {
  try {
    return await prisma.$transaction(async (tx) => {
      const { title, description } = req.body;

      if (!title || !description) {
        return res
          .status(400)
          .json(jsonResponse(false, "Title and description are required", null));
      }

      if (!req.files || req.files.length === 0) {
        const newGallery = await prisma.gallery.create({
          data: { title, description, images: [] },
        });

        return res
          .status(200)
          .json(jsonResponse(true, "Gallery has been created", newGallery));
      }

      // upload images one by one (callback style)
      const newImages = [];

      await uploadToCLoudinary(req.files, "gallery", async (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return res.status(404).json(jsonResponse(false, error, null));
        }

        if (!result.secure_url) {
          return res
            .status(404)
            .json(
              jsonResponse(false, "Something went wrong while uploading image", null)
            );
        }

        newImages.push({ image: result.secure_url });

        if (req.files.length === newImages.length) {
          const newGallery = await prisma.gallery.create({
            data: {
              title,
              description,
              images: newImages.map(img => img.image), // <-- fix here
            },
          });

          return res
            .status(200)
            .json(jsonResponse(true, "Gallery has been created", newGallery));
        }
      });
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(jsonResponse(false, "Server error creating gallery", null));
  }
};







// READ
export const getGallery = async (req, res) => {
  try {
    const galleries = await prisma.gallery.findMany();
    res.status(200).json(galleries);
  } catch (error) {
    res.status(500).json(jsonResponse(false, "Error fetching galleries"));
  }
};

export const getGalleryById = async (req, res) => {
  try {
    const { id } = req.params;

    const gallery = await prisma.gallery.findUnique({
      where: { id: Number(id) },
    });

    if (!gallery) {
      return res
        .status(404)
        .json(jsonResponse(false, "Gallery item not found"));
    }

    return res
      .status(200)
      .json(jsonResponse(true, "Gallery item found", gallery));
  } catch (error) {
    console.error(error);
    return res.status(500).json(jsonResponse(false, "Server error"));
  }
};

// UPDATE
export const updateGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    // Handle image update if new files are provided
    let updatedImages = [];

    if (req.files && req.files.length > 0) {
      await uploadToCLoudinary(req.files, "gallery", async (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return res.status(404).json(jsonResponse(false, error, null));
        }

        if (!result.secure_url) {
          return res
            .status(404)
            .json(
              jsonResponse(false, "Something went wrong while uploading image", null)
            );
        }

        updatedImages.push(result.secure_url);

        if (req.files.length === updatedImages.length) {
          const updatedGallery = await prisma.gallery.update({
            where: { id: Number(id) },
            data: {
              title,
              description,
              images: updatedImages, // replace with new Cloudinary URLs
            },
          });

          return res
            .status(200)
            .json(
              jsonResponse(true, "Gallery updated successfully", updatedGallery)
            );
        }
      });
    } else {
      // no new images, just update title/description
      const updatedGallery = await prisma.gallery.update({
        where: { id: Number(id) },
        data: { title, description },
      });

      return res
        .status(200)
        .json(jsonResponse(true, "Gallery updated successfully", updatedGallery));
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(jsonResponse(false, "Server error updating gallery"));
  }
};


// DELETE
export const deleteGallery = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedGallery = await prisma.gallery.delete({
      where: { id: Number(id) },
    });

    return res
      .status(200)
      .json(jsonResponse(true, "Gallery deleted successfully", deletedGallery));
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(jsonResponse(false, "Server error deleting gallery"));
  }
};
