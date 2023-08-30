import {Retweet} from "@prisma/client";
import {databaseManager} from "@/db/index";
import {PostWithUser} from "@/models/post";
import {UserWithoutPassword, getFollowingUserIds} from "@/models/user";
import {selectUserColumnsWithoutPassword} from "@/models/user";
import { get } from "http";

type RetweetData = Pick<Retweet, "userId" | "postId">;

export const getAllRetweetedPosts = async (): Promise<
  Array<{retweetedAt: Date; user: UserWithoutPassword; post: PostWithUser}>
> => {
  const prisma = databaseManager.getInstance();
  const retweetedPosts = await prisma.retweet.findMany({
    select: {
      user: {
        select: {
          ...selectUserColumnsWithoutPassword,
        },
      },
      retweetedAt: true,
      post: {
        select: {
          id: true,
          content: true,
          userId: true,
          createdAt: true,
          updatedAt: true,
          user: {
            select: {
              ...selectUserColumnsWithoutPassword,
            },
          },
        },
      },
    },
  });
  return retweetedPosts;
};

export const getFollowingRetweetedPosts = async (userId: number): Promise<
	Array<{ retweetedAt: Date; user: UserWithoutPassword; post: PostWithUser }>
> => {
	const prisma = databaseManager.getInstance();
	const followingUserIds = await getFollowingUserIds(userId);
	const retweetedPosts = await prisma.retweet.findMany({
		where: {
			userId: {
				in: followingUserIds
			}
		},
		select: {
			retweetedAt: true,
			user: {
				select: {
					...selectUserColumnsWithoutPassword,
				},
			},
			post: {
				select: {
					id: true,
					content: true,
					userId: true,
					createdAt: true,
					updatedAt: true,
					user: {
						select: {
							...selectUserColumnsWithoutPassword,
						},
					},
				},
			},
		},
	});
	return retweetedPosts;
};

export const getPostRetweetedCount = async (
  postId: number
): Promise<number> => {
  const prisma = databaseManager.getInstance();
  const count = await prisma.retweet.count({
    where: {
      postId,
    },
  });
  return count;
};

export const createRetweet = async (
  retweetData: RetweetData
): Promise<Retweet> => {
  const prisma = databaseManager.getInstance();
  const retweet = await prisma.retweet.create({
    data: retweetData,
  });
  return retweet;
};

export const deleteRetweet = async (
  retweetData: RetweetData
): Promise<Retweet> => {
  const prisma = databaseManager.getInstance();
  const retweet = await prisma.retweet.delete({
    where: {
      /* eslint-disable camelcase */
      userId_postId: {
        userId: retweetData.userId,
        postId: retweetData.postId,
      },
      /* eslint-enable camelcase */
    },
  });
  return retweet;
};

export const hasUserRetweetedPost = async (
  userId: number,
  postId: number
): Promise<boolean> => {
  const prisma = databaseManager.getInstance();
  const retweet = await prisma.retweet.findFirst({
    where: {
      userId,
      postId,
    },
  });
  return retweet !== null;
};
