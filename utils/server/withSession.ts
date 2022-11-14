import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOptions = {
  cookieName: "cookiezip",
  password:
    "a8wda64we4v6aw4gaw68aw9ev4a5w9v15ds6v1ae8d4w6ds1v56aw1bv8ae9rn4ea9n4a56f4e6fe6vas5d1va9rha98e1fafa65d4f",
};

export function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}
