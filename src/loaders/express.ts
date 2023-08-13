import express, {Express} from "express";
import session from "cookie-session";
import expressLayouts from "express-ejs-layouts";
import helmet from "helmet";
import logger from "morgan";
import path from "node:path";
import methodOverride from "method-override";
import {homeRouter} from "@/routes/home";
import {userRouter} from "@/routes/user";
import {authRouter} from "@/routes/auth";
import {postRouter} from "@/routes/post";
import {likeRouter} from "@/routes/like";
import {retweetRouter} from "@/routes/retweet";
import {dialogMessageMiddleware} from "@/middlewares/dialog_message";
import {currentUserMiddleware} from "@/middlewares/current_user";
import {authenticationMiddleware} from "@/middlewares/authentication";

export const loadMiddlewaresForTweetApp = (app: Express): void => {
  loadMethodOverride(app);
  loadSecureHeaders(app);
  loadLogger(app);
  loadViews(app);
  loadStatic(app);
  loadBodyParser(app);
  loadSession(app);
  loadUser(app);
  loadMessage(app);
  loadRouter(app);
};

const loadMethodOverride = (app: Express): void => {
  app.use(methodOverride("_method"));
};

const loadLogger = (app: Express): void => {
  app.use(logger("dev"));
};

const loadViews = (app: Express): void => {
  app.set("view engine", "ejs");
  app.set("views", path.join(path.resolve(), "src/views"));
  app.use(expressLayouts);
};

const loadStatic = (app: Express): void => {
  app.use(express.static("public"));
};

const loadBodyParser = (app: Express): void => {
  app.use(express.json());
  app.use(express.urlencoded({extended: false}));
};

const loadSession = (app: Express): void => {
  app.use(
    session({
      name: "session",
      keys: ["some random secret key here"],
      // `secure` is set to true only when the app is running in production.
      //
      // If you are behind a reverse proxy, you must enable 'trust proxy' option
      // by `app.set('trust proxy', 1)`.
      // See https://expressjs.com/en/guide/behind-proxies.html for more details.
      secure: app.get("env") === "production",
      httpOnly: true,
      sameSite: "lax",
      // This MUST be true, otherwise malicious users can set arbitrary cookies
      // and it can lead data breach.
      signed: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week in milliseconds
    })
  );
};

/**
 * Display a dialog message when an action succeeds
 * Message is displayed only the first time and disappears after reload
 * e.g. Display a "Success" message on redirect after form submission
 */
const loadMessage = (app: Express): void => {
  app.use(dialogMessageMiddleware);
};

/**
 * Pass login information to view
 * null is passed when user is not logged in
 */
const loadUser = (app: Express): void => {
  app.use(authenticationMiddleware);
  app.use(currentUserMiddleware);
};

const loadRouter = (app: Express): void => {
  app.use("/", homeRouter);
  app.use("/", authRouter);
  app.use("/users", userRouter);
  app.use("/posts", postRouter, likeRouter, retweetRouter);
};

const loadSecureHeaders = (app: Express): void => {
  app.use(helmet());
  if (app.get("env") === "development" || app.get("env") === "test") {
    // Setting upgradeInsecureRequests to null in development/test environment
    // since safari redirects to https even on localhost and the page cannot be displayed.
    app.use(
      helmet.contentSecurityPolicy({
        useDefaults: true,
        directives: {
          upgradeInsecureRequests: null,
        },
      })
    );
  }
};
