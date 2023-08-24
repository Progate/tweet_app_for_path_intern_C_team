import express from "express";
import {ensureAuthUser} from "@/middlewares/authentication";
import {createFollow, deleteFollow} from "@/models/follow";

export const followRouter = express.Router();

followRouter.post("/:postId/follows", ensureAuthUser, async (req, res, next) => {
  const {userId} = req.params;
  const currentUserId = req.authentication?.currentUserId;
  if (currentUserId === undefined) {
    // `ensureAuthUser` enforces `currentUserId` is not undefined.
    // This must not happen.
    return next(new Error("Invalid error: currentUserId is undefined."));
  }
  await createFollow({followingId: currentUserId, followedId: Number(userId)});
  res.redirect(`/posts/${userId}`);
});

followRouter.delete("/:userId/follows", ensureAuthUser, async (req, res, next) => {
  const {userId} = req.params;
  const currentUserId = req.authentication?.currentUserId;
  if (currentUserId === undefined) {
    // `ensureAuthUser` enforces `currentUserId` is not undefined.
    // This must not happen.
    return next(new Error("Invalid error: currentUserId is undefined."));
  }
  await deleteFollow({followingId: currentUserId, followedId: Number(userId)});
  res.redirect(`/posts/${userId}`);
});
