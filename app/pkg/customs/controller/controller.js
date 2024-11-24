/*
 * Controlador Genérico para manejar respuestas y errores.

 * CRUD
    get
    getBy + getById
    create 
    updateId (update)
    deleteId (delete)
 * AUXLIARES
    exists
    getUniqueValues ( fieldAllowed determian cuales columnas son permitidas )
    getPaginate
    count
 * METODOS EN LOTE
    insertMany
    updateMany
    deleteMany
 */

export default class CustomController {
  constructor(service, fieldAllowed = []) {
    this.service = service;
    this.fieldAllowed = fieldAllowed;
  }

  // CRUD
  get = async (req, res, next) => {
    try {
      const filter = { ...req.query }; // Toma directamente todos los parámetros de consulta
      const elements = await this.service.get(filter);
      res.sendSuccessOrNotFound(elements);
    } catch (error) {
      next(error);
    }
  };

  getBy = async (req, res, next) => {
    try {
      const { ekey, evalue } = req.query;
      const filter = {};
      filter[ekey] = evalue;
      const element = await this.service.getBy(filter);
      res.sendSuccessOrNotFound(element);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { eid } = req.params;
      const element = await this.service.getBy({ _id: eid });
      res.sendSuccessOrNotFound(element);
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const newElement = req.body;
      const element = await this.service.create(newElement);
      res.sendSuccess(element);
    } catch (error) {
      next(error);
    }
  };

  updateId = async (req, res, next) => {
    try {
      const { eid } = req.params;
      const newElement = req.body;
      const element = await this.service.update({ _id: eid }, newElement);
      res.sendSuccess(element);
    } catch (error) {
      next(error);
    }
  };

  deleteId = async (req, res, next) => {
    try {
      const { eid } = req.params;
      const element = await this.service.delete({ _id: eid });
      res.sendSuccessOrNotFound(element);
    } catch (error) {
      next(error);
    }
  };

  // AUXILIARES
  exists = async (req, res, next) => {
    try {
      const filter = req.query;
      const exists = await this.service.exists(filter);
      res.sendSuccess({ exists });
    } catch (error) {
      next(error);
    }
  };

  getUniqueValue = async (req, res, next) => {
    try {
      const { field } = req.params;
      if (!this.fieldAllowed.includes(field)) {
        res.sendUserError('El campo buscado no está permitido');
      } else {
        const uniqueValues = await this.service.getUniquesValues(field);
        res.sendSuccess(uniqueValues);
      }
    } catch (error) {
      next(error);
    }
  };

  getPaginate = async (req, res, next) => {
    try {
      const { limit, page } = req.query;
      const options = { limit: parseInt(limit) || 10, offset: parseInt(page) || 0 };
      const result = await this.service.getPaginate({}, options);
      res.sendSuccess(result);
    } catch (error) {
      next(error);
    }
  };

  count = async (req, res, next) => {
    try {
      const count = await this.service.count(req.query);
      res.sendSuccess({ count });
    } catch (error) {
      next(error);
    }
  };

  // MÉTODOS EN LOTE
  insertMany = async (req, res, next) => {
    try {
      const elements = req.body;
      const result = await this.service.insertMany(elements);
      res.sendSuccess(result);
    } catch (error) {
      next(error);
    }
  };

  updateMany = async (req, res, next) => {
    try {
      const { filter, update } = req.body;
      const updatedCount = await this.service.updateMany(filter, update);
      res.sendSuccess({ updatedCount });
    } catch (error) {
      next(error);
    }
  };

  deleteMany = async (req, res, next) => {
    try {
      const filter = req.body.filter;
      const deletedCount = await this.service.deleteMany(filter);
      res.sendSuccess({ deletedCount });
    } catch (error) {
      next(error);
    }
  };
}
