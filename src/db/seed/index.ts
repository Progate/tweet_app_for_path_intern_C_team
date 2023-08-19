import {PrismaClient, Prisma} from "@prisma/client";
const prisma = new PrismaClient();

export const insertUsers = async (
  data: Prisma.Enumerable<Prisma.UserCreateManyInput>
): Promise<void> => {
  const createMany = await prisma.user.createMany({
    data,
    skipDuplicates: true,
  });
  console.log(
    `successfully inserted records of ${createMany.count} to users table`
  );
};

export const insertPosts = async (
  data: Prisma.Enumerable<Prisma.PostCreateManyInput>
): Promise<void> => {
  const createMany = await prisma.post.createMany({
    data,
    skipDuplicates: true,
  });
  console.log(
    `successfully inserted records of ${createMany.count} to posts table`
  );
};

export const insertLikes = async (
  data: Prisma.Enumerable<Prisma.LikeCreateManyInput>
): Promise<void> => {
  const createMany = await prisma.like.createMany({
    data,
    skipDuplicates: true,
  });
  console.log(
    `successfully inserted records of ${createMany.count} to likes table`
  );
};
