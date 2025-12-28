import cli from "cli-color";
import app from "./app";
import { PORT } from "./constants";

// app listener
app.listen(PORT, () =>
  console.log(cli.green(`Server is running on port: ${PORT}`))
);
