export const roleMiddleware = (allowedRoles = []) => (req, res, next) => {
  const userRole = req.user?.role?.toUpperCase();
  
  if (!userRole) return res.sendUserUnAuthorized('Usuario no autenticado');
  
  // si el espacio es publico, permite acceso completo
  if(allowedRoles[0] === 'PUBLIC') return next();

  // Si el rol del usuario es 'Admin', permite acceso completo
  if (userRole === 'ADMIN') return next();
  
  // Verifica que el rol del usuario esté en la lista permitida
  if (!allowedRoles.includes(userRole)) {
    return res.sendUserForbidden('Usuario no autorizado');
  }
  
  next();
};

export const isPublic = ["PUBLIC"]
export const users    = ["USER", "CLIENT"]
export const clients  = ["CLIENT"]