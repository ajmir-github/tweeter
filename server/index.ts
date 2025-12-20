import app from "./app";
import { ClientURL, PORT } from "./constants";
export { type AppRouter as default } from "./trpc";

// app listener
app.listen(PORT, () =>
  console.log(`Server is running\n\tport: ${PORT}\n\tclient: ${ClientURL}`)
);
