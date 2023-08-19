import {Like} from "@prisma/client";
import {databaseManager} from "@/db/index";

type LikeData = Pick<Like, "userId" | "postId">;

export const getPostLikedCount = async (postId: number): Promise<number> => {
  const prisma = databaseManager.getInstance();
  const count = await prisma.like.count({
    where: {
      postId,
    },
  });
  return count;
};

export const createLike = async (likeData: LikeData): Promise<Like> => {
  const prisma = databaseManager.getInstance();
  const like = await prisma.like.create({
    data: likeData,
  });
  return like;
};

export const deleteLike = async (likeData: LikeData): Promise<Like> => {
  const prisma = databaseManager.getInstance();
  const like = await prisma.like.delete({
    where: {
      /* eslint-disable camelcase */
      userId_postId: {
        userId: likeData.userId,
        postId: likeData.postId,
      },
      /* eslint-enable camelcase */
    },
  });
  return like;
};

export const hasUserLikedPost = async (
  userId: number,
  postId: number
): Promise<boolean> => {
  const prisma = databaseManager.getInstance();
  const like = await prisma.like.findFirst({
    where: {
      userId,
      postId,
    },
  });
  return like !== null;
};
