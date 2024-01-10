import http from "../../src/lib/http";

export function getAllUsers(page = 0) {
  return http.get("/api/v1/users", { params: { page, size: 5 } });
}
