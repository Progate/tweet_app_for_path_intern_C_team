import express from "express";
import {ensureAuthUser} from "@/middlewares/authentication";
import {getPost} from "@/models/post";
import {createFollow, deleteFollow} from "@/models/follow";

export const followRouter = express.Router();

followRouter.post("/:postId/follow", ensureAuthUser, async (req, res, next) => {
  const {postId} = req.params;
  const post = await getPost(Number(postId));
  if (!post || !post.id)
    return next(new Error("Invalid error: The post or post.id is undefined."));
  const currentUserId = req.authentication?.currentUserId;
  if (currentUserId === undefined) {
    // `ensureAuthUser` enforces `currentUserId` is not undefined.
    // This must not happen.
    return next(new Error("Invalid error: currentUserId is undefined."));
  }
  await createFollow({followingId: currentUserId, followedId: post.userId});
  res.redirect(`/posts/${postId}`);
});

followRouter.delete("/:postId/unfollow", ensureAuthUser, async (req, res, next) => {
  const {postId} = req.params;
  const post = await getPost(Number(postId));
  if (!post || !post.id)
    return next(new Error("Invalid error: The post or post.id is undefined."));
  const currentUserId = req.authentication?.currentUserId;
  if (currentUserId === undefined) {
    // `ensureAuthUser` enforces `currentUserId` is not undefined.
    // This must not happen.
    return next(new Error("Invalid error: currentUserId is undefined."));
  }
  await deleteFollow({followingId: currentUserId, followedId: post.userId});
  res.redirect(`/posts/${postId}`);
});