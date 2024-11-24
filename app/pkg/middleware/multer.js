import multer from 'multer'
import path from 'node:path'
import __dirname from '../utilities/dirname.js'
import AppError from '../errors/AppError.js'

/**
 * Configuración de Multer para almacenamiento en disco o memoria
 * @param {number} maxSize - Tamaño máximo permitido del archivo en MB
 * @param {Array} type - Tipos de archivos permitidos (ej: ['image/jpeg', 'image/png'])
 * @param {boolean} useMemoryStorage - Define si se debe usar almacenamiento en memoria - por defecto "true"
 * @param {string} folder - Carpeta donde almacenar el archivo en caso de ser en disco - por defecto "files"
 */

// // almacena archivo en el disco
// export const uploader = (folder, maxSize, type) => multer({
    
//     storage: multer.diskStorage({        
//         destination: (req, file, cb) => {
//             cb(null, path.join(`public/assets/${folder}`))
//         },
//         filename: (req, file, cb) => {
//             cb(null, `${req.user.family_name}_${Date.now()}.${file.originalname.split('.')[1]}`)
//         }
//     }),
//     limits: {
//         fileSize: 1024 * 1024 * maxSize
//     },
//     fileFilter: (req, file, cb) => {
//         if (!type) return cb(null, true)
//         if (type.includes(file.mimetype)){
//             cb(null, true)
//         } else {
//             cb(new AppError(`File type not accepted. Expected: ${type}`, 415))
//         }
//     }
// })

export const uploader = (maxSize, type, useMemoryStorage = true, folder = "profiles") => {
    // Configuración para almacenamiento en memoria
    const memoryStorage = multer.memoryStorage();

    // Configuración para almacenamiento en disco
    const diskStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, `public/assets/${folder}`));
        },
        filename: (req, file, cb) => {
            const extension = path.extname(file.originalname);
            cb(null, `${req.user._id}${extension}`);
        }
    });

    // Definir el tipo de almacenamiento (memoria o disco)
    const storage = useMemoryStorage ? memoryStorage : diskStorage;

    // Configuración general de Multer
    return multer({
        storage,
        limits: {
            fileSize: 1024 * 1024 * maxSize // Límite de tamaño en MB
        },
        fileFilter: (req, file, cb) => {
            if (!type) return cb(null, true); // Si no se especifica tipo, aceptar todos
            if (type.includes(file.mimetype)) {
                cb(null, true); // Si el tipo es aceptado, continuar
            } else {
                cb(new AppError(`File type not accepted. Expected: ${type}`, 415)); // Lanzar error si el tipo no coincide
            }
        }
    });
};