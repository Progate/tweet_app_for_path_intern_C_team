import express from "express";
import {body, validationResult} from "express-validator";
import {formatDate} from "@/lib/convert_date";
import {getPost, createPost, updatePost, deletePost} from "@/models/post";
import {getPostRetweetedCount, hasUserRetweetedPost} from "@/models/retweet";
import {getAllPostTimeline} from "@/models/user_timeline";
import {getPostLikedCount, hasUserLikedPost} from "@/models/like";
import {ensureAuthUser} from "@/middlewares/authentication";
import {ensureOwnerOfPost} from "@/middlewares/current_user";
import {hasUserFollowed} from "@/models/follow";
export const postRouter = express.Router();

postRouter.get("/", ensureAuthUser, async (req, res) => {
  const timeline = await getAllPostTimeline();
  res.render("posts/index", {
    timeline,
  });
});

postRouter.get("/following", ensureAuthUser, async (req, res) => {
  const timeline = await getAllPostTimeline();
  res.render("posts/following", {
    timeline,
  });
});

postRouter.get("/new", ensureAuthUser, (req, res) => {
  res.render("posts/new", {
    post: {
      content: "",
    },
    errors: [],
  });
});

postRouter.get("/:postId", ensureAuthUser, async (req, res, next) => {
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

  const likeCount = await getPostLikedCount(post.id);
  const hasLiked = await hasUserLikedPost(currentUserId, post.id);
  const isFollowing = await hasUserFollowed(currentUserId, post.userId);
  const retweetCount = await getPostRetweetedCount(post.id);
  const hasRetweeted = await hasUserRetweetedPost(currentUserId, post.id);
  res.render("posts/show", {
    post,
    formatDate,
    likeCount,
    hasLiked,
    retweetCount,
    hasRetweeted,
    isFollowing,
    currentUserId
  });
});

postRouter.post(
  "/",
  ensureAuthUser,
  body("content", "Content can't be blank").notEmpty(),
  async (req, res, next) => {
    const {content} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("posts/new", {
        post: {
          content,
        },
        errors: errors.array(),
      });
    }

    const currentUserId = req.authentication?.currentUserId;
    if (currentUserId === undefined) {
      // `ensureAuthUser` enforces `currentUserId` is not undefined.
      // This must not happen.
      return next(new Error("Invalid error: currentUserId is undefined."));
    }
    await createPost({content, userId: currentUserId});
    req.dialogMessage?.setMessage("Post successfully created");
    res.redirect("/posts");
  }
);

postRouter.get(
  "/:postId/edit",
  ensureAuthUser,
  ensureOwnerOfPost,
  async (req, res) => {
    const {postId} = req.params;
    const post = await getPost(Number(postId));
    res.render("posts/edit", {
      post,
      errors: [],
    });
  }
);

postRouter.patch(
  "/:postId",
  ensureAuthUser,
  ensureOwnerOfPost,
  body("content", "Content can't be blank").notEmpty(),
  async (req, res) => {
    const {content} = req.body;
    const {postId} = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("posts/edit", {
        post: {
          content,
        },
        errors: errors.array(),
      });
    }
    await updatePost(Number(postId), content);
    req.dialogMessage?.setMessage("Post successfully edited");
    res.redirect("/posts");
  }
);

postRouter.delete(
  "/:postId",
  ensureAuthUser,
  ensureOwnerOfPost,
  async (req, res) => {
    const {postId} = req.params;
    await deletePost(Number(postId));
    req.dialogMessage?.setMessage("Post successfully deleted");
    res.redirect("/posts");
  }
);
