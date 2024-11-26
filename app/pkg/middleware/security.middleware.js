import Service from '../../modules/users/logic/service.js';

const usersService = new Service();

export const isPublic = ["PUBLIC"]
export const users    = ["USER", "CLIENT"]
export const clients  = ["CLIENT"]

export const protect = (policies) => {
  return async (req, res, next) => {
    try {
      const decoded = req.user
      const user = await usersService.getBy({ _id: decoded._id });
      if (!user) return res.sendUserUnAuthorized('Usuario no encontrado');
      req.user = user;
    } catch (error) {
      res.sendUserUnAuthorized('No autorizado');
    }
  }
}

export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

