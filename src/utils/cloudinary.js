//cloudinary returns us the path of the file from the server

import { v2 as cloudnairy } from "cloudinary"
import fs from 'fs'
//fs(file system) helps us file to write and read
cloudnairy.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NMAE,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET_KEY
})

const uploadOnCloudnary = async (localFilePath) =>{
  try{
    if(!localFilePath) {
        return null
    }
//upload the file on cloudinary
const response = await cloudnairy.uploader.upload(localFilePath,{
    resource_type:"auto"
})
//file has been uploaded successfull
console.log('file is uploaded on cloudinary', response.url);

return response

  } catch(error){
    //remove the localally saved tempraroy file as the operation got failed
    fs.unlinkSync(localFilePath)
    return null
}
}

export { uploadOnCloudnary}