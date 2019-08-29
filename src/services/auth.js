import { request } from "../utils/api";

export const login = ({ email, password }) => {
  return request({
    method: "post",
    baseUrl: "public",
    route: "signin",
    payload: {
      email,
      password
    }
  });
};

export const signup = payload => {
  return request({
    method: "post",
    baseUrl: "public",
    route: "signup",
    payload
  });
};

export const forgot = ({ email }) => {
  return request({
    method: "get",
    baseUrl: "public",
    route: `recover/${email}`
  });
};

export const change = payload => {
  return request({
    method: "put",
    baseUrl: "public",
    route: "change_password",
    payload
  });
};
