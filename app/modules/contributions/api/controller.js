import { MongoController } from "../../../pkg/customs/controller/controller.mongoose.js";
import Service from "../logic/service.js";

export default class Controller extends MongoController {
  constructor() {
    super(new Service);
  }

  get    = async (req, res, next) => {
    try {
      const filters = {};

      // Recorrer las claves del query y generar el objeto filters
      Object.keys(req.query).forEach((key) => {
        if (req.query[key]) {  // Ignorar valores vacíos
          if (['professions', 'languages', 'frameworks', 'libraries'].includes(key)) {
            // Convertir valores de arrays si son strings separadas por comas
            filters[key] = Array.isArray(req.query[key]) ? req.query[key] : req.query[key].split(',');
          } else if (['createdAt', 'updatedAt'].includes(key)) {
            // Convertir los valores de fechas a objetos Date
            filters[key] = new Date(req.query[key]);
          } else {
            // Para otros campos, simplemente los asignamos
            filters[key] = req.query[key];
          }
        }
      });
      console.log(filters);
      
      const element = await this.service.get(filters);
      res.sendSuccessOrNotFound(element);
    } catch (error) {
      next(error)
    }
  }
  
  create = async (req, res, next) => {
    try {
      const newElement = req.body
      await this.service.isValidUser({_id: newElement.contributedBy});
      const element = await this.service.create(newElement);
      res.sendSuccess(element)
    } catch (error) {
      next(error)
    }
  }

  getContributionsByUser = async (req, res, next) => {
    try {
      const { uid } = req.params;
      if (!uid) {return res.sendUserError("Usuario no indicado")}

      const contributions = await this.service.getContributionsByUser(uid);
      res.sendSuccess(contributions);

    } catch (error) {
      next(error)
    }
  } 
}