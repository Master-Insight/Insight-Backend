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
/*
OPCION 1:
  $project: {
    _id: 1,
    full_name: { $arrayElemAt: ['$userDetails.full_name', 0] }
  }
  
OBTIENE:
  [
    {
      "_id": "64d7b3e8a5c4ef0012ab1234",
      "full_name": "John Doe"
    },
    {
      "_id": "64d7b3e8a5c4ef0012ab5678",
      "full_name": "Jane Smith"
    }
  ]
*/


/*
OPCION 2:
  $project: {
    _id: 0, // Excluimos el `_id` de la salida
    label: { $arrayElemAt: ['$userDetails.full_name', 0] },
    value: { $toString: '$_id' } // Convertimos `_id` en string
  }
  
OBTIENE:
  [
    {
      "label": "John Doe",
      "value": "64d7b3e8a5c4ef0012ab1234"
    },
    {
      "label": "Jane Smith",
      "value": "64d7b3e8a5c4ef0012ab5678"
    }
  ]
*/