import { useEffect } from "react";
import { Server } from "../services";

export default function ProfilePage() {
  useEffect(() => {
    Server.user.listUsers
      .query()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <h1>ProfilePage</h1>;
}
