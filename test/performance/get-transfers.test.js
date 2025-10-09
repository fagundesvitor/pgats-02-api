import http from "k6/http";
import { sleep, check } from "k6";
import { pegarBaseURL } from "../utils/variaveis.js";
import { obterToken } from "../helpers/autenticacaok6.js";

export const options = {
  stages: [
    { duration: "5s", target: 10 },
    { duration: "20s", target: 10 },
    { duration: "5s", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(90)<3000", "max<5000"],
    http_req_failed: ["rate<0.01"],
  },
};

export default function () {
  const token = obterToken();
  const url = pegarBaseURL() + "/transfers";
  const params = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const res = http.get(url, params);
  check(res, {
    "Status é 200": (r) => r.status === 200,
    "Retorno é array": (r) => Array.isArray(r.json()),
  });
  sleep(1);
}