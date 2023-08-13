import {RequestHandler} from "express";
import {User} from "@prisma/client";

import {
  getUser,
  getUserByEmail,
  getUserByEmailWithPassword,
} from "@/models/user";
import {CustomValidator} from "express-validator";
import {HashPassword} from "@/lib/hash_password";

interface AuthenticationSession {
  userId?: number;
}

type AuthenticationSessionOrNullish = AuthenticationSession | null | undefined;

// Provide operations for user attached to the session.
// Do nothing if no session provider is in the middleware.
export class Authentication {
  constructor(private readonly session: AuthenticationSessionOrNullish) {}

  // Call on each request to check if the user id on the cookie is up to date.
  async ensureUserExist(): Promise<void> {
    if (!this.currentUserId) return;
    const user = await getUser(this.currentUserId);
    if (!user) this.logout();
  }

  login(user: User): void {
    if (!this.session) return;
    this.session.userId = user.id;
  }

  logout(): void {
    if (!this.session) return;
    delete this.session.userId;
  }

  get currentUserId(): number | undefined {
    return this.session?.userId;
  }

  get hasSignedin(): boolean {
    return this.session?.userId !== undefined;
  }
}

export const authenticationMiddleware: RequestHandler = async (
  req,
  res,
  next
) => {
  req.authentication = new Authentication(
    req.session as AuthenticationSessionOrNullish
  );
  await req.authentication.ensureUserExist();
  next();
};

export const isUniqueEmail: CustomValidator = async (email: string) => {
  const user = await getUserByEmail(email);
  if (user) {
    throw new Error("Email has already been taken");
  }
};

export const isMatchEmailAndPassword: CustomValidator = async (_, {req}) => {
  const {email, password} = req.body;
  if (!email || !password) return;
  const user = await getUserByEmailWithPassword(email);
  const match =
    user &&
    user.password &&
    (await new HashPassword().compare(password, user.password));
  if (!match) {
    throw new Error("Invalid email/password combination");
  }
};

export const forbidAuthUser: RequestHandler = (req, res, next) => {
  if (req.authentication?.hasSignedin) {
    req.dialogMessage?.setMessage("You are already logged in");
    res.redirect("/posts");
  } else {
    next();
  }
};

export const ensureAuthUser: RequestHandler = (req, res, next) => {
  if (req.authentication?.hasSignedin) {
    next();
  } else {
    req.dialogMessage?.setMessage("You must be logged in");
    res.redirect("/login");
  }
};
