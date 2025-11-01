import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { fetchData } from "./services/pokeApi.ts";
import "./index.css";
import App from "./App.tsx";

async function main() {
  try {
    const users = await fetchData("https://pokeapi.co/api/v2/pokemon/ditto");
    console.log(users);
  } catch (error) {
    console.error(error);
  }
}

main();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
