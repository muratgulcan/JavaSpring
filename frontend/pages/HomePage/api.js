import http from "../../src/lib/http";

export function getUsers() {
  return http.get("/api/v1/users");
}
