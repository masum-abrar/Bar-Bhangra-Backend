import { v2 as cloudinary } from "cloudinary";
import { extname } from "path";
import sharp from "sharp";
import { Readable } from "stream";

export const uploadToCloudinary = (file, folder) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!file) return resolve(null);

      const file_extension = extname(file.originalname).toLowerCase();
      if (![".jpg", ".jpeg", ".png", ".webp"].includes(file_extension)) {
        return reject(new Error("Invalid file type"));
      }

      // convert image to webp buffer
      const buffer = await sharp(file.buffer).webp({ quality: 80 }).toBuffer();

      // buffer to stream
      const readable = new Readable({
        read() {
          this.push(buffer);
          this.push(null);
        },
      });

      const stream = cloudinary.uploader.upload_stream(
        { folder },
        (err, result) => {
          if (err) return reject(err);
          resolve(result); // this will contain secure_url
        }
      );

      readable.pipe(stream);
    } catch (err) {
      reject(err);
    }
  });
};
export default uploadToCloudinary;
