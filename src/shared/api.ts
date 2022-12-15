import axios from "axios";

const BASE_URL = "http://localhost:3000/";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
export default api;

export const commentAPI = {
  postComment: (id: any, req: any) => api.post(`/api/comments?id=${id}`, req),
  deleteComment: (req: any) => api.delete(`/api/comments`, req),
};
