import { createContext } from "../utils/expressContext";

export default createContext((request) => {
  return { v: 1 };
});
