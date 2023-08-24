// 20230824_藤澤がmodels/like.tsを元に作成

import {Follow} from "@prisma/client";
import {databaseManager} from "@/db/index";

type FollowData = Pick<Follow, "followingId" | "followedId">; // 自信なし

// 自分がフォローしているユーザーをカウントする
export const getFollowingCount = async (followingId: number): Promise<number> => {
  const prisma = databaseManager.getInstance();
  const count = await prisma.follow.count({   // prisma.followingじゃなくていいのか？
    where: {
      followingId,
    },
  });
  return count;
};

// 自分をフォローしているユーザーをカウントする
export const getFollowedCount = async (followedId: number): Promise<number> => {
  const prisma = databaseManager.getInstance();
  const count = await prisma.follow.count({   // 【疑問】prisma.followedじゃなくていいのか？
    where: { 
      followedId,
    },
  });
  return count;
};

// follow機能
export const createFollow = async (followData: FollowData): Promise<Follow> => {
  const prisma = databaseManager.getInstance();
  const follow = await prisma.follow.create({
    data: followData,
  });
  return follow;
};

// follow解除機能
export const deleteFollow = async (followData: FollowData): Promise<Follow> => {
  const prisma = databaseManager.getInstance();
  const follow = await prisma.follow.delete({
    where: {
      /* eslint-disable camelcase */
      followingId_followedId: {
        followingId: followData.followingId,
        followedId: followData.followedId,
      },
      /* eslint-enable camelcase */
    },
  });
  return follow;
};

// ユーザー（自分）がフォローをしている相手の画面上で、「Follow」ボタンを「Following」と表示させるための機能
export const hasUserFollowed = async (
  followingId: number,
  followedId: number
): Promise<boolean> => {
  const prisma = databaseManager.getInstance();
  const follow = await prisma.follow.findFirst({
    where: {
      followingId,
      followedId,
    },
  });
  return follow !== null;
};
