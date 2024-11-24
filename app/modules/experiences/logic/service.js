import ThisDaoMongo from "../data/dao.mongo.js";
import AppError from "../../../pkg/errors/AppError.js";
import { MongoService } from "../../../pkg/customs/service/service.mongoose.js";

export default class Service extends MongoService {
  constructor() {
    super(new ThisDaoMongo);
  }
}