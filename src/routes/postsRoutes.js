import express from "express";
import { addUsers, listarPosts } from "../controllers/postsController.js";

const routes = (app) => {
  app.use(express.json());

  app.get("/posts", listarPosts);
  app.post("/users", addUsers);
};

export default routes;
