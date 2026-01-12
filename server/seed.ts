import { faker } from "@faker-js/faker";
import cliColor from "cli-color";
import { database, NotificationType } from "./prisma";
import { hashPassword } from "./utils/encryptions";

async function createArrayOf<T>(
  size: number,
  factoryFunc: (index: number) => T | Promise<T>
) {
  const list: T[] = [];
  for (let index = 1; index <= size; index++) {
    const res = await factoryFunc(index);
    list.push(res);
  }
  return list;
}

async function traceProcess(label: string, func: Function) {
  const startedAt = Date.now();
  console.log(cliColor.blue(`--- ${label} started`));
  await func();
  const endedAt = Date.now();
  console.log(cliColor.blue(`--- ${label} ended`));
  console.log(cliColor.blue(`--- ${label} took ${endedAt - startedAt}`));
}

const counts = {
  users: 100,
  followers: 1000,
  tweets: 1000,
  likes: 10000,
  notifications: 10000,
};

async function createUsers(number: number = counts.users) {
  const password: string = await hashPassword("123465");
  const { count } = await database.user.createMany({
    data: await createArrayOf(number, (id) => ({
      id,
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password,
      avatarURL: faker.image.avatar(),
      bio: faker.person.bio(),
    })),
    skipDuplicates: true,
  });
  if (!count) return console.log("No user added!");
  console.log(`Added ${count} user/s!`);
}

async function createTweets(number: number = counts.tweets) {
  const hashtags = await createArrayOf(100, () => faker.book.genre());
  const images = await createArrayOf(100, () => faker.image.url());
  const tweets = await createArrayOf(number, (id) => ({
    id,
    authorId: faker.number.int({ min: 1, max: counts.users }),
    content: faker.lorem.paragraph(),
    hashtags: faker.helpers.arrayElements(hashtags, { min: 0, max: 5 }),
    images: faker.helpers.arrayElements(images, { min: 0, max: 5 }),
  }));
  const replies = await createArrayOf(number, (id) => ({
    id: number + id,
    authorId: faker.number.int({ min: 1, max: counts.users }),
    parentId: faker.number.int({ min: 1, max: number }),
    content: faker.lorem.paragraph(),
    hashtags: faker.helpers.arrayElements(hashtags, { min: 0, max: 5 }),
    images: faker.helpers.arrayElements(images, { min: 0, max: 5 }),
  }));

  const { count } = await database.tweet.createMany({
    data: [...tweets, ...replies],
    skipDuplicates: true,
  });
  if (!count) return console.log("No tweet added!");
  console.log(`Added ${count} tweet/s!`);
}

async function createLikes() {
  const { count } = await database.like.createMany({
    data: await createArrayOf(counts.likes, () => ({
      tweetId: faker.number.int({ min: 1, max: counts.tweets }),
      userId: faker.number.int({ min: 1, max: counts.users }),
    })),
    skipDuplicates: true,
  });
  console.log("createLikes: ", count);
}

async function createFollowers() {
  const { count } = await database.follower.createMany({
    data: await createArrayOf(counts.followers, () => ({
      followerId: faker.number.int({ min: 1, max: counts.users }),
      followingId: faker.number.int({ min: 1, max: counts.users }),
    })),
    skipDuplicates: true,
  });
  console.log("createFollowers: ", count);
}

async function createNotifications() {
  const { count } = await database.notification.createMany({
    data: await createArrayOf(counts.notifications, () => ({
      recipientId: faker.number.int({ min: 1, max: counts.users }),
      actorId: faker.datatype.boolean()
        ? faker.number.int({ min: 1, max: counts.users })
        : null,
      type: faker.helpers.arrayElement([
        NotificationType.FOLLOW,
        NotificationType.LIKE,
        NotificationType.MENTION,
        NotificationType.REPLY,
      ]),
    })),
    skipDuplicates: true,
  });
  console.log("createNotifications: ", count);
}

traceProcess("Seeding", async () => {
  await createUsers();
  await createTweets();
  await createLikes();
  await createFollowers();
  await createNotifications();
});
