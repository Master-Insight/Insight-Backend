import configEnv from "../../../pkg/services/env/env.js";
import ThisDaoMongo from "../data/dao.mongo.js";
import AppError from "../../../pkg/errors/AppError.js";
import { MongoService } from "../../../pkg/customs/service/service.mongoose.js";


export default class Service extends MongoService {
  constructor() {
    super(new ThisDaoMongo);
    this.admins = configEnv.uadmins || []
    this.admin_pass = configEnv.uadmin_pass
  }

  // Función auxiliar para eliminar password de la proyección
  handlePasswordProjection = (projection) => {
    const finalProjection = {};
    
    if (projection) {
      if (Object.values(projection).some(value => value === 1)) {
        Object.assign(finalProjection, projection);
        delete finalProjection.password; // Eliminar password si se incluye un campo positivo
      } else {
        Object.assign(finalProjection, { password: 0, ...projection }); // Agregar password: 0
      }
    } else {
      finalProjection.password = 0; // Sin proyección, agregar password: 0
    }

    return finalProjection;
  };
  
  get = async (filter = {}, projection = null, options = {}) => {
    const finalProjection = this.handlePasswordProjection(projection);
    return await this.dao.get(filter, finalProjection, options);
  };
  getBy = async (filter, projection = null) => {
    const finalProjection = this.handlePasswordProjection(projection);
    return await this.dao.getBy(filter, finalProjection);
  };

  // ACTUALIZACION DE IMAGEN
  updatePhoto = async (uid, path) => {
    return await this.dao.update({_id: uid}, {photo: path})
  }
}