import dataModel from "./model.js";
import DaoMongo from "../../../pkg/customs/dao/dao.mongo.js";

export default class ThisDaoMongo extends DaoMongo {
  constructor() {
    super(dataModel);
  }

  updateConection = async (filter) => await this.model.findOneAndUpdate(
    filter,
    { connection: Date.now() },
    { new: true, timestamps: false }
  )
}

