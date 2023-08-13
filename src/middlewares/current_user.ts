import {RequestHandler} from "express";
import {getUser} from "@/models/user";
import {getPost} from "@/models/post";

/**
 * If logged in, set the user information to currentUser.
 * If not logged in, set null.
 */
export const currentUserMiddleware: RequestHandler = async (req, res, next) => {
  if (req.authentication?.currentUserId === undefined) {
    res.locals.currentUser = null;
  } else {
    res.locals.currentUser = await getUser(req.authentication.currentUserId);
  }
  next();
};

export const ensureCorrectUser: RequestHandler = async (req, res, next) => {
  if (req.session === null || req.session === undefined) {
    next();
    return;
  }
  const {userId} = req.params;
  if (req.authentication?.currentUserId === Number(userId)) {
    next();
  } else {
    req.dialogMessage?.setMessage("Unauthorized access");
    res.redirect("/posts");
  }
};

export const ensureOwnerOfPost: RequestHandler = async (req, res, next) => {
  const {postId} = req.params;
  const post = await getPost(Number(postId));
  const owner = await post?.user;
  if (owner && owner.id === req.authentication?.currentUserId) {
    next();
  } else {
    req.dialogMessage?.setMessage("Unauthorized access");
    res.redirect("/posts");
  }
};
