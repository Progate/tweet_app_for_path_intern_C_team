import express from "express";
import {ensureAuthUser} from "@/middlewares/authentication";
import {createLike, deleteLike} from "@/models/like";

export const likeRouter = express.Router();

likeRouter.post("/:postId/likes", ensureAuthUser, async (req, res, next) => {
  const {postId} = req.params;
  const currentUserId = req.authentication?.currentUserId;
  if (currentUserId === undefined) {
    // `ensureAuthUser` enforces `currentUserId` is not undefined.
    // This must not happen.
    return next(new Error("Invalid error: currentUserId is undefined."));
  }
  await createLike({userId: currentUserId, postId: Number(postId)});
  res.redirect(`/posts/${postId}`);
});

likeRouter.delete("/:postId/likes", ensureAuthUser, async (req, res, next) => {
  const {postId} = req.params;
  const currentUserId = req.authentication?.currentUserId;
  if (currentUserId === undefined) {
    // `ensureAuthUser` enforces `currentUserId` is not undefined.
    // This must not happen.
    return next(new Error("Invalid error: currentUserId is undefined."));
  }
  await deleteLike({userId: currentUserId, postId: Number(postId)});
  res.redirect(`/posts/${postId}`);
});
