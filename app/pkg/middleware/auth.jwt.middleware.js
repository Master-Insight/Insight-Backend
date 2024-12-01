import jwt from 'jsonwebtoken';
import Service from '../../modules/users/logic/service.js';
import configEnv from '../services/env/env.js';

const usersService = new Service();

export const authMiddleware = () => {
  return async (req, res, next) => {
    try {
      if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) return res.sendUserUnAuthorized('Token requerido');

        // Verificar el token
        let decoded;
        try {
          decoded = jwt.verify(token, configEnv.jwt_code);
        } catch (error) {
          if (error.name === 'TokenExpiredError') {
            return res.sendUserUnAuthorized('Token expirado');
          }
          return res.sendUserUnAuthorized('Token inválido');
        }

        // Obtener el usuario
        const user = await usersService.getBy({ _id: decoded._id });
        if (!user) return res.sendUserUnAuthorized('Usuario no encontrado');

        // Adjuntar el usuario a la solicitud
        req.user = user;
        return next();
      }

      // Manejo de rutas públicas
      if (req.police?.[0] === 'PUBLIC') return next();

      // Si no hay token y no es una ruta pública
      return res.sendUserUnAuthorized('No autorizado, no hay Token');
    } catch (error) {
      req.logger.error('Error en el middleware de autenticación:', error);
      return res.sendServerError()
    };
  };
}