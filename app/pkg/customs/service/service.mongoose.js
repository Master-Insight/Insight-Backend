/*
 * Servicio específico para MongoDB

 * CRUD
    get
    getBy
    create
    update
    delete
 * AUXLIARES
    exists
    getUniquesValues
    getPaginate
    count
 * MÉTODOS EN LOTE
    insertMany 
    updateMany 
    deleteMany 
 * AVANZADAS
    aggregate (solo mongodb)
 */

import CustomService from './service.js';

export class MongoService extends CustomService {
  constructor(dao) {
    super(dao);
  }

    // CRUD
   get = async (filter = {}, projection = null, options = {}) => await this.dao.get(filter, projection, options);
   getBy = async (filter, projection = null) => await this.dao.getBy(filter, projection);
   update = async (filter, elementUpdate, options = { new: true }) => await this.dao.update(filter, elementUpdate, options);
   delete = async (filter, options = { new: true })=> await this.dao.delete(filter, options);

  // Método de agregación (solo MongoDB)
  aggregate = async (pipeline) => {
    return await this.dao.aggregate(pipeline);
  };
}
