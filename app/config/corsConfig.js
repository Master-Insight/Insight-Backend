import configEnv from "../pkg/services/env/env.js";
const allowedOrigins = configEnv.cors_origin;


// Forma simple solo web;
// const corsOptions = {origin:configEnv.cors_origin}

// en app mobile, cambiar "localhost" por la "IP"

const corsOptions = {
  origin: (origin, callback) => {
    // console.log('Origen de la solicitud:', origin); // Log para identificar el origen / depuracion

    // Permitir solicitudes desde la web y solicitudes sin origen (móvil)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  // credentials: true, // Permitir cookies/credenciales si es necesario
};

export default corsOptions