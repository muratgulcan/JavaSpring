import axios from "axios";
import { i18nInstance } from "../../src/locales";
import http from "../../src/lib/http";

export function signUp(body) {
  return http.post("/api/v1/users", body);
}
