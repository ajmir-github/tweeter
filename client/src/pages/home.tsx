import { test } from "../services/products";

export default function HomePage() {
  return (
    <div>
      <h1>HomePage</h1>
      <button onClick={test}>RUN</button>
    </div>
  );
}
