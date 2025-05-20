import type { Router, Request } from "express";

export type IRouter = {
  path?: string;
  router: Router;
};

export type ICorsOptions = {
  origin: string;
  credentials: boolean;
};

export type IDecoded = {
  id: string;
  email: string;
  iat: number;
  exp: number;
};

export type IRequest = {
  method: string;
  userId: string;
  user: IDecoded;
  body: any;
  params: any;
  query: any;
  headers: {
    authorization: string;
  };
}