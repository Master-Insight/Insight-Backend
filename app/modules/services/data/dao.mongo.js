import dataModel from "./model.js";
import DaoMongo from "../../../pkg/customs/dao/dao.mongo.js";

export default class ThisDaoMongo extends DaoMongo {
  constructor() {
    super(dataModel);
  }
}

