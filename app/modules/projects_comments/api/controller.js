import { MongoController } from "../../../pkg/customs/controller/controller.mongoose.js";
import Service from "../logic/service.js";

export default class Controller extends MongoController {
  constructor() {
    super(new Service);
  }

  // CRUD
  get = async (req, res, next) => {
    try {
      const { tid } = req.params;
      const filter = { ...req.query }; // Toma directamente todos los parámetros de consulta
      if ( tid ) filter.taskId = tid
      const elements = await this.service.get(filter);
      res.sendSuccessOrNotFound(elements);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { eid, tid } = req.params;
      const element = await this.service.getBy({ _id: eid, taskId: tid });
      res.sendSuccessOrNotFound(element);
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const { tid } = req.params;
      const newElement = req.body;
      newElement.taskId = tid
      const element = await this.service.create(newElement);
      res.sendSuccess(element);
    } catch (error) {
      next(error);
    }
  };

  updateId = async (req, res, next) => {
    try {
      const { eid, tid } = req.params;
      const newElement = req.body;
      newElement.taskId = tid
      const element = await this.service.update({ _id: eid }, newElement);
      res.sendSuccess(element);
    } catch (error) {
      next(error);
    }
  };

  deleteId = async (req, res, next) => {
    try {
      const { eid, tid } = req.params;
      const element = await this.service.delete({ _id: eid, taskId: tid });
      res.sendSuccessOrNotFound(element);
    } catch (error) {
      next(error);
    }
  };
}