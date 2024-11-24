import { MongoController } from "../../../pkg/customs/controller/controller.mongoose.js";
import Service from "../logic/service.js";

export default class Controller extends MongoController {
  constructor() {
    super(new Service);
  }

  get = async (req, res, next) => {
    try {
      const filters = {};

      // Recorrer las claves del query y generar el objeto filters
      Object.keys(req.query).forEach((key) => {
        if (req.query[key]) {  // Ignorar valores vacíos
          if (['createdAt', 'updatedAt'].includes(key)) {
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
      next(error);
    }
  };
}