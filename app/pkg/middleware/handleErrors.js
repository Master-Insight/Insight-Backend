import { logger } from "./logger.js";
import AppError from '../errors/AppError.js';
import { isCelebrateError } from 'celebrate';

const handleErrors = (err, req, res, next) => {
  // Default status code and message for unhandled errors
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Error interno del servidor';

  /**
   * Manejo de SyntaxError (por ejemplo, JSON malformado en la solicitud)
   * Este error ocurre cuando el JSON enviado en el cuerpo de la solicitud no es válido.
   */
  if (err instanceof SyntaxError) {
    statusCode = 400; // Bad Request
    message = 'JSON mal formateado';
    logger.error(`Status ${statusCode} - SyntaxError: ${err.message}`);

  /**
   * Manejo de errores de tamaño de archivo (por ejemplo, Multer)
   * Este error ocurre cuando el archivo subido excede el tamaño máximo permitido.
   */
  } else if (err.code === 'LIMIT_FILE_SIZE') {
    statusCode = 413; // Payload Too Large
    message = 'Archivo demasiado grande';
    logger.error(`Status ${statusCode} - MulterError: ${err.message}`);

  /**
   * Manejo de errores de validación de Celebrate
   * Estos errores ocurren cuando la validación de las entradas de la API falla.
   */
  } else if (isCelebrateError(err)) {
    statusCode = 400; // Bad Request
    message = 'Error de validación: ' + Array.from(err.details.values())
      .map(detail => detail.message)
      .join(', ');
    logger.error(`Status ${statusCode} - CelebrateError: ${message}`);

  /**
   * Manejo de errores personalizados de la aplicación (AppError)
   * Este bloque maneja errores definidos explícitamente como parte de la lógica de la aplicación.
   */
  } else if (err instanceof AppError) {
    // Se respeta el statusCode y el mensaje definidos en el error
    logger.error(`Status ${statusCode} - AppError: ${err.message}`);

  /**
   * Manejo de errores generales (cualquier otro error no manejado anteriormente)
   * Este bloque captura todos los demás errores que no han sido específicamente manejados.
   */
  } else {
    logger.error(`Status ${statusCode} - Error: ${err.message}`);
  }

  // Responder con el error manejado al cliente
  return res.status(statusCode).json({ isError: true, message });
};

export default handleErrors;
