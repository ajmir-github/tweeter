import { createTRPCClient, httpBatchLink } from "@trpc/client";
import superJSON from "superjson";
import type AppRouter from "../../../server";
import LocalToken from "../utils/LocalToken";

export const Server = createTRPCClient<AppRouter>({
  links: [
    // httpBatchLink({
    //   url: TRPC_URL,

    //   // You can pass any HTTP headers you wish here
    //   async headers() {
    //     return {
    //       authorization: LocalToken.get(),
    //     };
    //   },
    //   transformer: superJSON,
    // }),
    httpBatchLink({
      url: "http://10.0.29.29:3001/trpc",

      // You can pass any HTTP headers you wish here
      async headers() {
        return {
          authorization: LocalToken.get(),
        };
      },
      transformer: superJSON,
    }),
  ],
});

export type { AppRouter };
