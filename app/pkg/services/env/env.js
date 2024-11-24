import dotenv from 'dotenv';

dotenv.config()

const configEnv = {
  port:         process.env.PORT,
  cors_origin:  process.env.CORS_ORIGIN,
  mongo_uri:    process.env.MONGO_URI,

  // users module
  jwt_code:     process.env.JWT_SECRET_CODE,
  uadmins:      process.env.USERS_ADMIN,
  uadmin_pass:  process.env.USER_ADMIN_PASS,

  // email module
  gmail_user_name:  process.env.GMAIL_USER_NAME,
  gmail_user_app:   process.env.GMAIL_USER_APP,
  gmail_pass_app:   process.env.GMAIL_PASS_APP,

  // linkedin
  linkedin_client_id:     process.env.LINKEDIN_CLIENT_ID,
  linkedin_client_secret: process.env.LINKEDIN_CLIENT_SECRET,
  linkedin_redirect_uri:  process.env.LINKEDIN_REDIRECT_URI,
  linkedin_scope:         process.env.LINKEDIN_SCOPE,

  // cloudinary
  cloudinary_name:    process.env.CLOUDINARY_NAME,
  cloudinary_key:     process.env.CLOUDINARY_KEY,
  cloudinary_secret:  process.env.CLOUDINARY_SECRET,
  cloudinary_url:     process.env.CLOUDINARY_URL,
}

export default configEnv;
