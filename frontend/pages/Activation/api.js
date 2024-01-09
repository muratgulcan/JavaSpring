import axios from "axios";
import http from "../../src/lib/http";

export function activateUser(token) {
  return http.patch(`/api/v1/users/${token}/active`);
}
