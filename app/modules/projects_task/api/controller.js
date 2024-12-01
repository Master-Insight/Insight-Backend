import { MongoController } from "../../../pkg/customs/controller/controller.mongoose.js";
import Service from "../logic/service.js";

export default class Controller extends MongoController {
  constructor() {
    super(new Service);
  }

  getByProjectId = async (req, res, next) => {
    try {
      const filter = { ...req.query }; // Toma directamente todos los parámetros de consulta
      const { eid } = req.params;
      filter.projectId = eid
      const elements = await this.service.get(filter);
      res.sendSuccessOrNotFound(elements);
    } catch (error) {
      next(error);
    }
  };
}