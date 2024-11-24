import jwt from 'jsonwebtoken';
import Service from '../../modules/users/logic/service.js';
import configEnv from '../services/env/env.js';


const usersService = new Service();

export const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) return res.sendUserUnAuthorized('Token requerido');

  try {
    const decoded = jwt.verify(token, configEnv.codes.jwt); // Asegúrate de usar el secreto correcto
    const user = await usersService.getBy({ _id: decoded._id });
    
    if (!user) return res.sendUserUnAuthorized('Usuario no encontrado');
    
    req.user = user;
    next();
  } catch (error) {
    res.sendUserUnAuthorized('Token inválido');
  }
};
