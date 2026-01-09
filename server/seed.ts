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

async function createUsers(number: number = 1000) {
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

async function createTweets(number: number = 10000) {
  const hashtags = await createArrayOf(100, () => faker.book.genre());
  const images = await createArrayOf(100, () => faker.image.url());
  const tweets = await createArrayOf(number, (id) => ({
    id,
    authorId: faker.number.int({ min: 1, max: 1000 }),
    content: faker.lorem.paragraph(),
    hashtags: faker.datatype.boolean()
      ? faker.helpers.arrayElements(hashtags)
      : faker.helpers.arrayElements(hashtags),
    images: faker.datatype.boolean() ? faker.helpers.arrayElements(images) : [],
  }));
  const replies = await createArrayOf(number, (id) => ({
    id: number + id,
    authorId: faker.number.int({ min: 1, max: 1000 }),
    parentId: faker.number.int({ min: 1, max: number }),
    content: faker.lorem.paragraph(),
    hashtags: faker.datatype.boolean()
      ? faker.helpers.arrayElements(hashtags)
      : faker.helpers.arrayElements(hashtags),
    images: faker.datatype.boolean() ? faker.helpers.arrayElements(images) : [],
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
    data: await createArrayOf(100000, () => ({
      tweetId: faker.number.int({ min: 1, max: 10000 }),
      userId: faker.number.int({ min: 1, max: 1000 }),
    })),
    skipDuplicates: true,
  });
  console.log("createLikes: ", count);
}

async function createFollowers() {
  const { count } = await database.follower.createMany({
    data: await createArrayOf(10000, () => ({
      followerId: faker.number.int({ min: 1, max: 1000 }),
      followingId: faker.number.int({ min: 1, max: 1000 }),
    })),
    skipDuplicates: true,
  });
  console.log("createFollowers: ", count);
}

async function createNotifications() {
  const { count } = await database.notification.createMany({
    data: await createArrayOf(10000, () => ({
      recipientId: faker.number.int({ min: 1, max: 1000 }),
      actorId: faker.datatype.boolean()
        ? faker.number.int({ min: 1, max: 1000 })
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
  //   await createUsers();
  //   await createTweets();
  //   await createLikes();
  //   await createFollowers();
  //   await createNotifications();
});
