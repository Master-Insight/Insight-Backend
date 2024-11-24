/*
 * DAO para MongoDB utilizando Mongoose

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
 * METODOS EN LOTE
    insertMany 
    updateMany 
    deleteMany 
 * AVANZADAS
    aggregate (solo mongoose)

 */
    export default class DaoMongo {
      constructor(model) {
        this.model = model;
      }
    
      // Métodos CRUD
      get = async (filter = {}, projection = null, options = {}) => {
        return await this.model.find(filter, projection, options);
      };
    
      getBy = async (filter, projection = null) => {
        return await this.model.findOne(filter, projection);
      };
    
      create = async (newElement) => {
        return await this.model.create(newElement);
      };
    
      update = async (filter, elementUpdate, options = { new: true }) => {
        return await this.model.findOneAndUpdate(filter, elementUpdate, options);
      };
    
      delete = async (filter, options = { new: true }) => {
        return await this.model.findOneAndDelete(filter, options);
      };
    
      // Métodos auxiliares
      exists = async (filter) => {
        return !!(await this.getBy(filter));
      };
    
      getUniquesValues = async (field) => {
        return await this.model.distinct(field);
      };
    
      getPaginate = async (filter, options) => {
        return await this.model.paginate(filter, options);
      };
    
      count = async (filter = {}) => {
        return await this.model.countDocuments(filter);
      };
    
      // Métodos en lote
      insertMany = async (elements) => {
        return await this.model.insertMany(elements);
      };
    
      updateMany = async (filter, elementUpdate) => {
        return await this.model.updateMany(filter, elementUpdate, { new: true });
      };
    
      deleteMany = async (filter) => {
        return await this.model.deleteMany(filter);
      };
    
      // Agregación avanzada
      aggregate = async (pipeline) => {
        return await this.model.aggregate(pipeline);
      };
    }
    