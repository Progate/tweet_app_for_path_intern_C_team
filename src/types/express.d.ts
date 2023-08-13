declare namespace Express {
  export interface Request {
    uploadError?: import("express-validator").ValidationError;
    authentication?: import("@/middlewares/authentication").Authentication;
    dialogMessage?: import("@/middlewares/dialog_message").DialogMessage;
  }
}
