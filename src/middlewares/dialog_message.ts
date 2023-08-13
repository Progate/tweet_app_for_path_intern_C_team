import {RequestHandler} from "express";

interface DialogMessageSession {
  dialogMessage?: string;
}

type DialogMessageSessionOrNullish = DialogMessageSession | null | undefined;

// Provide operations for dialog message attached to the session.
// Do nothing if no session provider is in the middleware.
export class DialogMessage {
  constructor(private readonly session: DialogMessageSessionOrNullish) {}

  setMessage(message: string): void {
    if (!this.session) return;
    this.session.dialogMessage = message;
  }

  // Returns undefined if no message exists.
  takeMessage(): string | undefined {
    if (!this.session) return;
    const message = this.session.dialogMessage;
    delete this.session.dialogMessage;
    return message;
  }
}

export const dialogMessageMiddleware: RequestHandler = (req, res, next) => {
  req.dialogMessage = new DialogMessage(
    req.session as DialogMessageSessionOrNullish
  );
  const message = req.dialogMessage.takeMessage();
  res.locals.dialogMessage = message;
  next();
};
