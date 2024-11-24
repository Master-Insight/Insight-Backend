import AppError from "../../../../app/pkg/errors/AppError.js";
import cloudinary from "../../../../app/pkg/services/images/cloudinary.js";
import { MongoController } from "../../../pkg/customs/controller/controller.mongoose.js";
import Service from "../logic/service.js";
import fs from 'node:fs'

export default class Controller extends MongoController {
  constructor() {
    super(new Service);
  }

  getUserSession = (req, res) => res.sendSuccess(req.user)

  getPublicAssociates =  async (req, res, next) => {
    try {
      const associates = await this.service.get({public: true}) 
      res.sendSuccess(associates)
    } catch (error) {
      next(error)
    }
  }

  getPublicAssociatesLSelective =  async (req, res, next) => {
    try {
      const associates = await this.service.get({public: true},  { _id: 1, full_name: 1, email: 1 }) 
      res.sendSuccess(associates)
    } catch (error) {
      next(error)
    }
  }

  getAssociate =  async (req, res, next) => {
    try {
      const { username } = req.params
      const associate = await this.service.getBy({username: username}) 
      res.sendSuccess(associate)
    } catch (error) {
      next(error)
    }
  }

  currentUpdate = async (req, res, next) => {
    try{
      let { updateUser } = req.body
      const updatedUser = await this.service.update(req.user._id, updateUser)
      res.sendSuccess(updatedUser)
    } catch(error) {
      next(error)
    }
  }

  // SUBIR FOTO PERFIL
  uploadPhoto = async (req, res, next) => {
    try {
      // Verificar si el archivo está presente
      if (!req.file) { new AppError("No file provided", 400) }

      // Opciones comunes para la carpeta en Cloudinary
      const options = {
        folder: "users",
        public_id: `${req.user._id}`,
        overwrite: true // Habilitar sobrescritura de archivos
      }

      // Verificar si el archivo está almacenado en memoria o en disco
      // Si el archivo está en memoria (buffer), subirlo directamente
      // Sino user el archivo está en disco, por usar la ruta para subirlo y luego elimianrlo
      if (req.file.buffer) {

        cloudinary.uploader.upload_stream(options, async (error, result) => {
          if (error) return next(error);
          const secureUrl = result.secure_url;
          await this.service.updatePhoto(req.user._id, secureUrl)
          res.sendSuccess({photoUrl: secureUrl}, "Photo uploaded")
        }).end(req.file.buffer);

      } else {
        const filePath = req.file.path;
        const result = await cloudinary.uploader.upload(filePath, options);
        const secureUrl = result.secure_url;
        await this.service.updatePhoto(req.user._id, secureUrl);
        fs.unlinkSync(filePath);
        res.sendSuccess({photoUrl: secureUrl}, "Photo uploaded")
      }

    } catch (error) {
      next(error)
    }
  }
}