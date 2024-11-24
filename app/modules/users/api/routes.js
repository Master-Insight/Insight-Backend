import { clients, handleAuth, users } from "../../../../app/pkg/middleware/handlePolicies.js";
import { uploader } from "../../../../app/pkg/middleware/multer.js";
import CustomRouter from "../../../pkg/customs/router/Router.js";
import Controller from "./controller.js";

const controller = new Controller()

// http://localhost:8080/v1/users/

class UserRouter extends CustomRouter {
  constructor() {
    super();

    // * Public
    this.addRoute('get', '/associates', [], controller.getPublicAssociates);
    this.addRoute('get', '/associatesselective', [], controller.getPublicAssociatesLSelective);
    this.addRoute('get', '/associate/:username', [], controller.getAssociate);

    // * User
    this.addRoute('get', '/current', [ handleAuth(users) ], controller.getUserSession);
    this.addRoute('put', '/current/update', [ handleAuth(users) ], controller.currentUpdate);
    this.addRoute('put', '/current/uploadphoto', [ 
      handleAuth(users),
      uploader(5, ['image/jpeg', 'image/jpg', 'image/png'], true).single('photo') ],
      controller.uploadPhoto);

    // * Admins
    this.addRoute('get', '/', [ handleAuth(['ADMIN']) ], controller.get);
  }
}

export default new UserRouter().getRouter();