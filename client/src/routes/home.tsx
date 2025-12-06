import { Server } from "../services";

export default function HomePage() {
  const handleRequest = async () => {
    const data = await Server.userList.query({ limit: 22 });
    console.log(data);
  };

  return (
    <div>
      <h1>HomePage</h1>
      <button onClick={handleRequest}>RUN</button>
    </div>
  );
}
