/*
 * MongoController: agrega métodos avanzados de MongoDB

 * CRUD
    get
    getBy + getById
    create 
    updateId (update)
    deleteId (delete)
 * AUXLIARES
    exists
    getUniqueValues
    getPaginate
    count
 * METODOS EN LOTE
    insertMany
    updateMany
    deleteMany
 * AVANZADAS
    aggregate (solo mongodb)
 */

import CustomController from "./controller.js";

export class MongoController extends CustomController {
  constructor(service, fieldAllowed = []) {
    super(service, fieldAllowed);
  }

  // Método de agregación específico de MongoDB
  aggregate = async (req, res, next) => {
    try {
      const { pipeline } = req.body;
      const result = await this.service.aggregate(pipeline);
      res.sendSuccess(result);
    } catch (error) {
      next(error);
    }
  };
}