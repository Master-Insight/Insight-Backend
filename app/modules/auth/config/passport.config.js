import configEnv from "../../../../app/pkg/services/env/env.js";
import passport from "passport";
import jwt from "passport-jwt";
// import { Strategy as LinkedInStrategy } from "passport-linkedin-oauth2"
// import Service from "../logic/service.js";

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const initializePassport = () => {
  // JWT
  passport.use("jwt", new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: configEnv.jwt_code,
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload);
        } catch (error) {
          return done(error);
        }
      },
    ),
  );

  // passport.use('linkedin', new LinkedInStrategy({
  //   clientID: configEnv.linkedin_client_id,
  //   clientSecret: configEnv.linkedin_client_secret,
  //   callbackURL: "http://localhost:8080/v1/auth/linkedin/callback",
  //   scope: ['openid', 'profile', 'email'],
  // }, async function(accessToken, refreshToken, profile, done) {
  //     try {
  //       console.log('Authorization Code:', code);  // Log del código recibido
  //       console.log('Access Token:', accessToken); // Log del token de acceso recibido
  //       console.log('LinkedIn Profile:', profile);
    
  //       if (!profile) {
  //         console.error('Failed to fetch user profile.');
  //         return done(new Error('Failed to fetch user profile.'));
  //       }

  //       // Aquí es donde normalmente buscarías o crearías un usuario
  //       return done(null, profile);
  //     } catch (error) {
  //       console.error(error);
  //       return done(error);
  //     }
  //     // try {
  //     //   console.log(profile);
      
  //     //   const service = new Service();
  //     //   const user = await service.registerOrLogin(profile);
  //     //   return done(null, user);
  //     // } catch (error) {
  //     //   console.error('Error fetching user profile:', error);
  //     //   return done(error);
  //     // }
  // }));
};

// https://github.com/bruceskills/linkedin-login-using-nodejs-and-passport
// https://www.youtube.com/watch?v=4zCYJRVGq2A
// https://levelup.gitconnected.com/step-by-step-guide-to-authenticate-users-with-linkedin-in-your-express-app-10af68b91b13


// https://github.com/alexmarinmendez/linkedin-signin-with-openid
export default initializePassport;