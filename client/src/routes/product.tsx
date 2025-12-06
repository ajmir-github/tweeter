import { useParams } from "react-router";

export default function ProductPage() {
  const params = useParams<{ productId: string }>();
  return <h1>ProductPage:{params.productId}</h1>;
}
