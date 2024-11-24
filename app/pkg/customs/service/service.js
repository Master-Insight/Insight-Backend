/*
 * Servicio Genérico para manejar operaciones CRUD con DAO

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
 */

export default class CustomService {
  constructor(dao) {
    this.dao = dao;
  }
    
  // CRUD
  get = async (filter) => await this.dao.get(filter);
  getBy = async (filter) => await this.dao.getBy(filter);
  create = async (newElement) => await this.dao.create(newElement);
  update = async (filter, elementUpdate) => await this.dao.update(filter, elementUpdate);
  delete = async (filter) => await this.dao.delete(filter);

  // Métodos Auxiliares
  exists = async (filter) => await this.dao.exists(filter);
  getPaginate = async (filter, options) => await this.dao.getPaginate(filter, options);
  getUniquesValues = async (field) => await this.dao.getUniquesValues(field);
  count = async (filter = {}) => await this.dao.count(filter);

  // Métodos en Lote
  insertMany = async (elements) => await this.dao.insertMany(elements);
  updateMany = async (filter, elementUpdate) => await this.dao.updateMany(filter, elementUpdate);
  deleteMany = async (filter) => await this.dao.deleteMany(filter);
}
