import { getUser } from "./services/userServices";

async function main() {
  console.log(await getUser(1, 10));
}

main();
