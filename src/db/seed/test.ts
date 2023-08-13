import {insertUsers, insertPosts, insertLikes} from "@/db/seed/index";

const main = async (): Promise<void> => {
  await insertUsers([
    // -- BASE USER TEST && UPDATE POST TEST USER
    {
      id: 1,
      name: "Ken the Ninja",
      email: "ninja@progate.com",
      imageName: "/image/users/default_user.jpg",
      password: "$2b$10$eWozvPlv.OwVm3TUeZifjOsu5ylPs1727cnR7AzmRsNe/DD2UOOtq",
      createdAt: new Date("2021-04-18 08:06:52.739"),
      updatedAt: new Date("2021-04-18 08:06:52.739"),
    },
    // -- UPDATE TEST USER
    {
      id: 2,
      name: "Master Wooly",
      email: "master@progate.com",
      imageName: "/image/users/2.jpg",
      password: "$2b$10$eWozvPlv.OwVm3TUeZifjOsu5ylPs1727cnR7AzmRsNe/DD2UOOtq",
      createdAt: new Date("2021-04-23 11:41:53.913"),
      updatedAt: new Date("2021-04-23 11:41:53.913"),
    },
    // -- DELETE POST TEST USER
    {
      id: 3,
      name: "Ben the Baby Ninja",
      email: "baby@progate.com",
      imageName: "/image/users/3.jpg",
      password: "$2b$10$eWozvPlv.OwVm3TUeZifjOsu5ylPs1727cnR7AzmRsNe/DD2UOOtq",
      createdAt: new Date("2021-04-23 11:43:49.518"),
      updatedAt: new Date("2021-04-23 11:43:49.518"),
    },
    {
      id: 4,
      name: "Mike",
      email: "mike@progate.com",
      imageName: "/image/users/4.jpg",
      password: "$2b$10$eWozvPlv.OwVm3TUeZifjOsu5ylPs1727cnR7AzmRsNe/DD2UOOtq",
      createdAt: new Date("2021-04-23 11:44:06.890"),
      updatedAt: new Date("2021-04-23 11:44:06.890"),
    },
    {
      id: 5,
      name: "Kate",
      email: "kate@progate.com",
      imageName: "/image/users/5.jpg",
      password: "$2b$10$eWozvPlv.OwVm3TUeZifjOsu5ylPs1727cnR7AzmRsNe/DD2UOOtq",
      createdAt: new Date("2021-04-23 11:44:18.073"),
      updatedAt: new Date("2021-04-23 11:44:18.073"),
    },
    {
      id: 6,
      name: "for user show",
      email: "6@progate.com",
      imageName: "/image/users/default_user.jpg",
      password: "$2b$10$eWozvPlv.OwVm3TUeZifjOsu5ylPs1727cnR7AzmRsNe/DD2UOOtq",
      createdAt: new Date("2021-04-23 11:44:18.073"),
      updatedAt: new Date("2021-04-23 11:44:18.073"),
    },
    {
      id: 7,
      name: "for user like",
      email: "7@progate.com",
      imageName: "/image/users/default_user.jpg",
      password: "$2b$10$eWozvPlv.OwVm3TUeZifjOsu5ylPs1727cnR7AzmRsNe/DD2UOOtq",
      createdAt: new Date("2021-04-23 11:44:18.073"),
      updatedAt: new Date("2021-04-23 11:44:18.073"),
    },
    {
      id: 8,
      name: "for create post",
      email: "8@progate.com",
      imageName: "/image/users/default_user.jpg",
      password: "$2b$10$eWozvPlv.OwVm3TUeZifjOsu5ylPs1727cnR7AzmRsNe/DD2UOOtq",
      createdAt: new Date("2021-04-23 11:44:18.073"),
      updatedAt: new Date("2021-04-23 11:44:18.073"),
    },
    {
      id: 9,
      name: "for post show",
      email: "9@progate.com",
      imageName: "/image/users/default_user.jpg",
      password: "$2b$10$eWozvPlv.OwVm3TUeZifjOsu5ylPs1727cnR7AzmRsNe/DD2UOOtq",
      createdAt: new Date("2021-04-23 11:44:18.073"),
      updatedAt: new Date("2021-04-23 11:44:18.073"),
    },
    {
      id: 10,
      name: "for like post",
      email: "10@progate.com",
      imageName: "/image/users/default_user.jpg",
      password: "$2b$10$eWozvPlv.OwVm3TUeZifjOsu5ylPs1727cnR7AzmRsNe/DD2UOOtq",
      createdAt: new Date("2021-04-23 11:44:18.073"),
      updatedAt: new Date("2021-04-23 11:44:18.073"),
    },
  ]);
  await insertPosts([
    // -- BASE POSTS INDEX TEST && BASE LIKE TEST POST
    {
      id: 1,
      content: "Looking for a good book to read.",
      userId: 1,
      createdAt: new Date("2021-03-31 05:24:15.529"),
      updatedAt: new Date("2021-03-31 05:24:15.529"),
    },
    {
      id: 2,
      content: "Today's lunch was great!",
      userId: 2,
      createdAt: new Date("2021-03-31 05:24:32.004"),
      updatedAt: new Date("2021-03-31 05:24:32.004"),
    },
    {
      id: 3,
      content:
        "Master Wooly taught me how to use Git! Now I can teach my little brother Ben.",
      userId: 1,
      createdAt: new Date("2021-03-31 06:00:32.004"),
      updatedAt: new Date("2021-03-31 06:00:32.004"),
    },
    // -- DELETE POSTS TEST
    {
      id: 4,
      content:
        "My brother Ken is studying so hard! Apparently he wants to become an engineer. Maybe I should also give it a shot.",
      userId: 3,
      createdAt: new Date("2021-04-15 07:24:32.004"),
      updatedAt: new Date("2021-04-15 07:24:32.004"),
    },
    // -- LIKE POSTS TEST
    {
      id: 5,
      content: "Learning to code on Progate. I just completed Rails/Study/3!",
      userId: 4,
      createdAt: new Date("2021-03-31 09:24:32.004"),
      updatedAt: new Date("2021-03-31 09:24:32.004"),
    },
    // -- UNLIKE POSTS TEST
    {
      id: 6,
      content:
        "I went to a programming workshop at Progate! Learned so much & got a really cute sticker :)",
      userId: 5,
      createdAt: new Date("2021-03-31 09:24:32.004"),
      updatedAt: new Date("2021-03-31 09:24:32.004"),
    },
    // -- UPDATE POSTS TEST
    {
      id: 7,
      content: "Almost done with our TweetApp!",
      userId: 1,
      createdAt: new Date("2021-06-01 02:32:59.458"),
      updatedAt: new Date("2021-06-01 02:32:59.458"),
    },
    {
      id: 8,
      content: "oldest like",
      userId: 1,
      createdAt: new Date("2021-06-02 02:32:59.458"),
      updatedAt: new Date("2021-06-02 02:32:59.458"),
    },
    {
      id: 9,
      content: "second oldest like",
      userId: 1,
      createdAt: new Date("2021-06-03 02:32:59.458"),
      updatedAt: new Date("2021-06-03 02:32:59.458"),
    },
    {
      id: 10,
      content: "user show oldest post",
      userId: 6,
      createdAt: new Date("2021-06-04 02:32:59.458"),
      updatedAt: new Date("2021-06-04 02:32:59.458"),
    },
    {
      id: 11,
      content: "user show second oldest post",
      userId: 6,
      createdAt: new Date("2021-06-05 02:32:59.458"),
      updatedAt: new Date("2021-06-05 02:32:59.458"),
    },
    {
      id: 12,
      content: "user like oldest post",
      userId: 7,
      createdAt: new Date("2021-06-04 02:32:59.458"),
      updatedAt: new Date("2021-06-04 02:32:59.458"),
    },
    {
      id: 13,
      content: "user like second oldest post",
      userId: 7,
      createdAt: new Date("2021-06-05 02:32:59.458"),
      updatedAt: new Date("2021-06-05 02:32:59.458"),
    },
    {
      id: 14,
      content: "show post",
      userId: 9,
      createdAt: new Date("2021-06-01 02:32:59.458"),
      updatedAt: new Date("2021-06-01 02:32:59.458"),
    },
    {
      id: 15,
      content: "like post",
      userId: 10,
      createdAt: new Date("2021-06-01 02:32:59.458"),
      updatedAt: new Date("2021-06-01 02:32:59.458"),
    },
  ]);
  await insertLikes([
    {
      userId: 1,
      postId: 2,
      createdAt: new Date("2021-06-15 11:08:17.693"),
    },
    {
      userId: 1,
      postId: 4,
      createdAt: new Date("2021-06-23 02:55:59.682"),
    },
    {
      userId: 1,
      postId: 5,
      createdAt: new Date("2021-06-23 02:56:19.331"),
    },
    {
      userId: 1,
      postId: 6,
      createdAt: new Date("2021-06-23 02:56:26.741"),
    },
    {
      userId: 2,
      postId: 7,
      createdAt: new Date("2021-06-23 02:57:59.387"),
    },
    {
      userId: 2,
      postId: 5,
      createdAt: new Date("2021-06-23 02:58:05.392"),
    },
    {
      userId: 2,
      postId: 3,
      createdAt: new Date("2021-06-23 02:58:14.214"),
    },
    {
      userId: 2,
      postId: 6,
      createdAt: new Date("2021-06-23 02:58:19.997"),
    },
    {
      userId: 3,
      postId: 7,
      createdAt: new Date("2021-06-23 02:58:47.299"),
    },
    {
      userId: 3,
      postId: 5,
      createdAt: new Date("2021-06-23 02:58:59.211"),
    },
    {
      userId: 3,
      postId: 3,
      createdAt: new Date("2021-06-23 02:59:08.061"),
    },
    {
      userId: 3,
      postId: 1,
      createdAt: new Date("2021-06-23 02:59:16.910"),
    },
    {
      userId: 3,
      postId: 2,
      createdAt: new Date("2021-06-23 02:59:22.134"),
    },
    {
      userId: 5,
      postId: 7,
      createdAt: new Date("2021-06-23 02:59:42.179"),
    },
    {
      userId: 5,
      postId: 4,
      createdAt: new Date("2021-06-23 02:59:49.338"),
    },
    {
      userId: 5,
      postId: 6,
      createdAt: new Date("2021-06-23 03:00:06.638"),
    },
    {
      userId: 5,
      postId: 3,
      createdAt: new Date("2021-06-23 03:00:12.878"),
    },
    {
      userId: 5,
      postId: 1,
      createdAt: new Date("2021-06-23 03:00:28.501"),
    },
    {
      userId: 4,
      postId: 8,
      createdAt: new Date("2021-06-10 14:25:43.532"),
    },
    {
      userId: 4,
      postId: 9,
      createdAt: new Date("2021-04-11 14:25:43.532"),
    },
    {
      userId: 7,
      postId: 12,
      createdAt: new Date("2021-04-11 14:25:43.532"),
    },
    {
      userId: 7,
      postId: 13,
      createdAt: new Date("2021-04-11 14:25:43.532"),
    },
    {
      userId: 9,
      postId: 15,
      createdAt: new Date("2021-04-11 14:25:43.532"),
    },
  ]);
};

main().catch(async e => {
  console.error(e);
});
