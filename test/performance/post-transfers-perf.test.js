import http from "k6/http";
import { check, sleep } from "k6";
import { pegarBaseURL } from "../utils/variaveis.js";
import { obterToken } from "../helpers/autenticacaok6.js";

export const options = {
  vus: 5,
  duration: "10s",
};

export default function () {
  const url = pegarBaseURL() + "/transfers";
  const token = obterToken();

  const payload = JSON.stringify({
    from: "wencha",
    to: "vitor",
    value: 100,
  });

  const params = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    "Status é 201": (r) => r.status === 201,
    "Retorno contém 'from'": (r) => r.json().from === "wencha",
    "Retorno contém 'to'": (r) => r.json().to === "vitor",
    "Retorno contém 'value'": (r) => r.json().value === 100,
  });

  sleep(1);
}
