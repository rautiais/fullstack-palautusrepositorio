import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom/client";
import axios from "axios";
import App from "./App";
const baseUrl = "/api/notes";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

export default { getAll };
