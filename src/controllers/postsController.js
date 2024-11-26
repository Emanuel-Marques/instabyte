import { getTodosPosts, addUser } from "../models/postModel.js";

export async function listarPosts(req, res) {
  const posts = await getTodosPosts();
  res.status(200).json(posts);
}

export async function addUsers(req, res) {
  const { name, email, age } = req.body;
  const user = { name, email, age };
  const resultado = await addUser(user);
  res.status(201).json({message: "User created!", user: resultado});
}
