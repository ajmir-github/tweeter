import { TRPCClientError } from "@trpc/client";
import { useState } from "react";
import { Server } from "../services";

export default function ProfilePage() {
  const [input, setInput] = useState("");
  const handleSend = async () => {
    Server.test
      .query({
        name: input,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        if (!(err instanceof TRPCClientError)) throw err;
        console.log(err.message);
        console.log(err.data.errors);
      });
  };

  return (
    <div className="grid gap-2">
      <input
        value={input}
        onChange={(t) => setInput(t.target.value)}
        type="text"
        className="border rounded-4xl text-xl px-4 py-2 "
      />
      <button onClick={handleSend} className="bg-blue-400 p-2 rounded-4xl">
        Send
      </button>
    </div>
  );
}
