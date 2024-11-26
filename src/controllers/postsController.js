import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";
import { getTodosPosts, addUser, criarPost, actualizarPost } from "../models/postModel.js";

export async function listarPosts(req, res) {
  const posts = await getTodosPosts();
  res.status(200).json(posts);
}

export async function postarNovoPost(req, res) {
  const newPost = req.body;
  try {
    const psotCriado = await criarPost(newPost);
    res.status(201).json(psotCriado);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function uploadImagem(req, res) {
  const novoPost = {
    descricao: "",
    imgUrl: req.file.originalname,
    alt: "",
  };
  try {
    const postCriado = await criarPost(novoPost);
    const imagemActualizada = `uploads/${postCriado.insertedId}.${req.file.originalname.split(".").pop()}`;
    fs.renameSync(req.file.path, imagemActualizada);
    res.status(201).json(postCriado);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function actualizaNovoPost(req, res){
  const postId = req.params.id;
  const urlImagem = `http://localhost:3000/${postId}.jpg`;

  try {
    // Gerando buffer da imagem e criando descricao da imagem com Gemini
    const imgBuffer = fs.readFileSync(`uploads/${postId}.jpg`);
    const descricao = await gerarDescricaoComGemini(imgBuffer);

    const post = {
      imgUrl: urlImagem,
      descricao,
      alt: req.body.alt
    }

    const postActualizado = await actualizarPost(postId, post);
    res.status(200).json(postActualizado);
  } catch(error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" })
  }
}

export async function addUsers(req, res) {
  const { name, email, age } = req.body;
  const user = { name, email, age };
  const resultado = await addUser(user);
  res.status(201).json({ message: "User created!", user: resultado });
}
