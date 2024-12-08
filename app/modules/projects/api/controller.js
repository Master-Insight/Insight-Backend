import { MongoController } from "../../../pkg/customs/controller/controller.mongoose.js";
import Service from "../logic/service.js";

export default class Controller extends MongoController {
  constructor() {
    super(new Service);
  }

  getUsersAssigned = async (req, res, next) => {
    try {
      const pipeline = [
        { // Descomponemos el array de usuarios en documentos individuales
          $unwind: '$users'
        },
        { // Agrupamos por ID de usuario
          $group: {
            _id: '$users',
          }
        },
        { // Ordenamos por cantidad de proyectos (opcional)
          $sort: { projectCount: -1 }
        },
        { // Vinculamos con la colección de usuarios para obtener detalles
          $lookup: {
            from: 'users', // Nombre de la colección de usuarios
            localField: '_id',
            foreignField: '_id',
            as: 'userDetails'
          }
        },
        { // Aplanamos el array de userDetails y seleccionamos solo lo necesario
          $project: {
            _id: 1,
            full_name: { $arrayElemAt: ['$userDetails.full_name', 0] }
          }
        }
      ];

      const result = await this.service.aggregate(pipeline);
      res.sendSuccess(result);
    } catch (error) {
      next(error);
    }
  };
}