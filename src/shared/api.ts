import axios from "axios";

const BASE_URL = process.env.LOCAL_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
export default api;

export const commentAPI = {
  postComment: (id: any, req: any) => api.post(`/api/comments?id=${id}`, req),
  deleteComment: (id: any) => api.delete(`/api/comments/${id}`),
};

type postImageReq = {
  avatar: string;
};
export const myAPI = {
  getMyData: () => api.get(`/api/users/me`),
  getMyImage: () => api.get(`/api/image`),
  postMyImage: (req: postImageReq) => api.post(`/api/users/me`, req),
};

interface videoReqData {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
}
export const videoAPI = {
  getVideos: () => api.get(`/api/videos`),
  // serverSideRendering issue
  getEachVideo: (id: string) =>
    api.get(`/api/videos/${id}`, {
      headers: {
        Cookie: process.env.GET_API_HEADERS_COOKIE,
      },
    }),
  postVideo: (req: videoReqData) => api.post(`/api/videos`, req),
  deleteVideo: (id: string) => api.delete(`/api/videos/${id}`),

  // for cloudflare request
  getCloudVideo: () => api.get(`/api/video`),

  // like
  postLikeReq: (pageQuery: string) => api.post(`/api/videos/${pageQuery}/fav`),
  // subs
  getSubsReq: () => api.get(`/api/users/me`),
  postSubsReq: (createdUserId: string) =>
    api.post(`/api/subscribe/${createdUserId}`),
};
