import { MongoController } from "../../../pkg/customs/controller/controller.mongoose.js";
import Service from "../logic/service.js";

export default class Controller extends MongoController {
  constructor() {
    super(new Service);
  }

  getBySlug = async (req, res, next) => {
    try {
      const { slug } = req.params;
      const element = await this.service.getBy({ slug });
      res.sendSuccessOrNotFound(element);
    } catch (error) {
      next(error);
    }
  };
}