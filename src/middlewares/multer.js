import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "uploads");
  },
  filename(req, file, callback) {
    const uniqueId = uuidv4();
    const fileExtensionName = file.originalname.split(".").pop();
    callback(null, `${uniqueId}.${fileExtensionName}`);
  },
});

export const upload = multer({ storage }).array("photos");
