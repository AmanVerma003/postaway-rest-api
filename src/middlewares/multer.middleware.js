import multer from "multer";
import path from "path";

// Configure storage engine for Multer
const storage = multer.diskStorage({
     // Set destination folder for uploaded files
    destination:(req,file,callback)=>{
        const filePath =  path.resolve("src","public", "postUploads"); // Builds absolute path to 'src/public/postUploads'
        callback(null,filePath);// Send the filePath as the destination
    },
    // Customize filename before saving
    filename:(req,file,callback)=>{
        const filenam = Date.now()+"-"+file.originalname; // Prepend current timestamp to original filename
        callback(null,filenam);  // Use the new filename
    }
});
// Create multer instance using the above storage configuration
const upload = multer({storage:storage});
export default upload;