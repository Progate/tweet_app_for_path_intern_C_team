import {insertUsers, insertPosts, insertLikes} from "./index";

const main = async (): Promise<void> => {
  await insertUsers([
    {
      name: "Ken the Ninja",
      email: "ninja@progate.com",
      imageName: "/image/users/default_user.jpg",
      password: "$2b$10$eWozvPlv.OwVm3TUeZifjOsu5ylPs1727cnR7AzmRsNe/DD2UOOtq",
      createdAt: new Date("2021-04-18 08:06:52.739"),
      updatedAt: new Date("2021-04-18 08:06:52.739"),
    },
    {
      name: "Master Wooly",
      email: "master@progate.com",
      imageName: "/image/users/2.jpg",
      password: "$2b$10$eWozvPlv.OwVm3TUeZifjOsu5ylPs1727cnR7AzmRsNe/DD2UOOtq",
      createdAt: new Date("2021-04-23 11:41:53.913"),
      updatedAt: new Date("2021-04-23 11:41:53.913"),
    },
    {
      name: "Ben the Baby Ninja",
      email: "baby@progate.com",
      imageName: "/image/users/3.jpg",
      password: "$2b$10$eWozvPlv.OwVm3TUeZifjOsu5ylPs1727cnR7AzmRsNe/DD2UOOtq",
      createdAt: new Date("2021-04-23 11:43:49.518"),
      updatedAt: new Date("2021-04-23 11:43:49.518"),
    },
    {
      name: "Mike",
      email: "mike@progate.com",
      imageName: "/image/users/4.jpg",
      password: "$2b$10$eWozvPlv.OwVm3TUeZifjOsu5ylPs1727cnR7AzmRsNe/DD2UOOtq",
      createdAt: new Date("2021-04-23 11:44:06.890"),
      updatedAt: new Date("2021-04-23 11:44:06.890"),
    },
    {
      name: "Kate",
      email: "kate@progate.com",
      imageName: "/image/users/5.jpg",
      password: "$2b$10$eWozvPlv.OwVm3TUeZifjOsu5ylPs1727cnR7AzmRsNe/DD2UOOtq",
      createdAt: new Date("2021-04-23 11:44:18.073"),
      updatedAt: new Date("2021-04-23 11:44:18.073"),
    },
  ]);
  await insertPosts([
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
    {
      id: 4,
      content:
        "My brother Ken is studying so hard! Apparently he wants to become an engineer. Maybe I should also give it a shot.",
      userId: 3,
      createdAt: new Date("2021-04-15 07:24:32.004"),
      updatedAt: new Date("2021-04-15 07:24:32.004"),
    },
    {
      id: 5,
      content: "Learning to code on Progate. I just completed Rails/Study/3!",
      userId: 4,
      createdAt: new Date("2021-03-31 09:24:32.004"),
      updatedAt: new Date("2021-03-31 09:24:32.004"),
    },
    {
      id: 6,
      content:
        "I went to a programming workshop at Progate! Learned so much & got a really cute sticker :)",
      userId: 5,
      createdAt: new Date("2021-03-31 09:24:32.004"),
      updatedAt: new Date("2021-03-31 09:24:32.004"),
    },
    {
      id: 7,
      content: "Almost done with our TweetApp!",
      userId: 1,
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
      userId: 4,
      postId: 7,
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
      createdAt: new Date("2021-06-23 02:59:55.121"),
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
      postId: 7,
      createdAt: new Date("2021-06-23 03:00:34.725"),
    },
  ]);
};

main().catch(async e => {
  console.error(e);
});
