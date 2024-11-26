import "dotenv/config"
import conectarAoBanco from "../config/dbconfig.js";
import { ObjectId } from "mongodb";

const conexao = await conectarAoBanco(process.env.STRING_DE_CONEXAO);

export async function getTodosPosts() {
  const db = conexao.db("imersao-instalikes");
  const coleccao = db.collection("posts");
  return coleccao.find().toArray();
}

export async function criarPost(newPost){
  const db = conexao.db("imersao-instalikes");
  const coleccao = db.collection("posts");
  const post = newPost;
  return coleccao.insertOne(post);
}

export async function actualizarPost(id, post){
  const db = conexao.db("imersao-instalikes");
  const coleccao = db.collection("posts");
  const objId = ObjectId.createFromHexString(id); // Convertendo o id em um objecto que o MongoDB entende
  return coleccao.updateOne({ _id: new ObjectId(objId) }, {$set: post} ) // Actualizando dados no MongoDB
}

export async function addUser({name, email, age}){
  const db = conexao.db("imersao-instalikes");
  const coleccao = db.collection("users");
  const user = {name, email, age};
  return coleccao.insertOne({...user, createdAt: new Date()});
}