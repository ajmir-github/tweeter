import { createTRPCClient, httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import type AppRouter from "../../../server";
import { SERVER_URL } from "../constants";

function getAuthToken() {
  return localStorage.getItem("AUTH") || "";
}

console.log(SERVER_URL);

export const Server = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${SERVER_URL}/trpc`,
      // You can pass any HTTP headers you wish here
      async headers() {
        return {
          authorization: getAuthToken(),
        };
      },
      transformer: superjson,
    }),
  ],
});
