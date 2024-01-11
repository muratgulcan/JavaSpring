import http from "../../src/lib/http";

export function signIn(body) {
  return http.post("/api/v1/auth", body);
}
