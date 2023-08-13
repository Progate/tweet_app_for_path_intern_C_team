import express from "express";
import {loadMiddlewaresForTweetApp} from "@/loaders/express";

export const app = express();
loadMiddlewaresForTweetApp(app);
