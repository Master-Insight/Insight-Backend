import { v2 as cloudinary } from 'cloudinary'
import configEnv from '../env/env.js'

cloudinary.config({
  cloud_name: configEnv.cloudinary_name,
  api_key: configEnv.cloudinary_key,
  api_secret: configEnv.cloudinary_secret,
})

export default cloudinary