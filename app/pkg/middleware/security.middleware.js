export const isPublic = ["PUBLIC"]
export const users = ["USER", "CLIENT"]
export const clients = ["CLIENT"]
export const admin = ["ADMIN"]

export const securityMiddleware = (policies) => {
  return async (req, res, next) => {
    try {
      // Asignar políticas a la solicitud
      req.police = policies || req.police || isPublic;

      // Crear un usuario genérico si es una ruta pública
      if (!req.user && req.police.includes("PUBLIC")) {
        req.user = { given_name: "Generic", role: "PUBLIC" };
      }

      // Permitir acceso a rutas públicas
      if (req.police.includes("PUBLIC")) return next();

      // Verificar que el usuario exista
      if (!req.user) return res.sendUserUnAuthorized("Token inválido o usuario no autenticado");

      // Permitir acceso a administradores
      if (req.user.role.toUpperCase() === "ADMIN") return next();

      // Verificar si el rol del usuario está permitido por las políticas
      if (!req.police.includes(req.user.role.toUpperCase())) {
        return res.sendUserForbidden("Usuario no autorizado para esta acción");
      }

      // Pasar al siguiente middleware si todo está correcto
      return next();
    } catch (error) {
      // Loggear errores en el middleware de seguridad
      req.logger.error('Error en el middleware security:', error);
      res.sendUserUnAuthorized('No autorizado');
    }
  }
}

export const giveRole = (policies) => {
  return async (req, res, next) => {
    req.police = policies || isPublic;
    next();
  }
}

