import { request } from "../utils/api";

export default function HomeService() {
  return {
    list: () => {
      return request({
        method: "get",
        baseUrl: "api",
        route: "products"
      });
    },
    get: (id) => {
      return request({
        method: "get",
        baseUrl: "api",
        route: `products/${id}`
      });
    },
    save: (payload) => {
      return request({
        method: "post",
        baseUrl: "api",
        route: `products`,
        payload
      });
    },
    update: (id, payload) => {
      return request({
        method: "put",
        baseUrl: "api",
        route: `products/${id}`,
        payload
      });
    },
    destroy: (id) => {
      return request({
        method: "delete",
        baseUrl: "api",
        route: `products/${id}`
      });
    },
  }
}