import ThisDaoMongo from "../data/dao.mongo.js";
import AppError from "../../../pkg/errors/AppError.js";
import DaoUsers from "../../users/data/dao.mongo.js";
import { MongoService } from "../../../pkg/customs/service/service.mongoose.js";

export default class Service extends MongoService {
  constructor() {
    super(new ThisDaoMongo);
    this.daoUsers = new DaoUsers();
  }

  getContributionsByUser = async (userId) => {
    const contributions = await this.dao.get({ contributedBy: userId })
    if (!contributions.length) throw new AppError("El usuario no tiene contribuciones", 404)
    return contributions
  }

  isValidUser = async (filter) => {
    const isValidUser = await this.daoUsers.exists(filter)
    if (!isValidUser) throw new AppError("El usuario no existe", 400)
    return !!isValidUser
  }
}