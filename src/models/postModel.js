import conectarAoBanco from "../config/dbconfig.js";

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

export async function addUser({name, email, age}){
  const db = conexao.db("imersao-instalikes");
  const coleccao = db.collection("users");
  const user = {name, email, age};
  return coleccao.insertOne({...user, createdAt: new Date()});
}