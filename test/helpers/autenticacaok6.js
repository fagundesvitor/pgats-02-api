import http from "k6/http";
import { pegarBaseURL } from "../utils/variaveis.js";
const postLoginPerf = JSON.parse(open("../fixtures/postLoginPerf.json"));

export function obterToken() {
  const url = pegarBaseURL() + "/users/login";

  const payload = JSON.stringify(postLoginPerf);

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.post(url, payload, params);

  return res.json("token");
}
