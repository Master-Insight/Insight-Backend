//import { MongoController } from "../../../pkg/customs/controller/controller.mongoose.js";
import Service from "../../auth/logic/service.js";
import { Authorization, Redirect } from "../config/authLinkedIn.js";
import { getProfileData } from "../config/profileService.js";

export default class Controller {
  constructor() {
    this.service = new Service;
  }

  autorize = async (req, res, next) => {
    // redirecciona al endpont de autorización
    res.redirect(Authorization())
  }

  redirect = async (req, res, next) => {
    try{
      const profile = await Redirect(req.query.code)
      if (!profile?.data) {
        throw new AppError("LinkedIn authorization Error", 401);
      }
      const { token } = await this.service.registerOrLogin(profile, "Linkedin")
      // TODO debe redirigir al front
      // res.sendCreated({token}, "Auth success")
      // Redirecciona al frontend con el token en la URL
      res.redirect(`${configEnv.cors_origin}/auth/linkedin?token=${token}`);
    } catch(error) {
      next(error)
    }
  }

  profile = async (req, res, next) => {
    try {
      const { linkedinAccessToken, linkedinTokenExpiry } = req.user || {};

      // Verifica que exista token Linkedin
      if (!linkedinAccessToken) {
        throw new AppError("Non-existent LinkedIn Token", 401);
      }

      // Verifica si el token ha expirado
      const currentTime = Date.now();
      if (linkedinTokenExpiry && currentTime >= linkedinTokenExpiry) {
        throw new AppError("LinkedIn Token Expired", 401);
      }
      
      // Si el token es válido, obtén los datos de perfil
      const data = await getProfileData(linkedinAccessToken)
      res.sendSuccess(data)
    } catch (error) {
      next(error)
    }
  }
}