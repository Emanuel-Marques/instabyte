import conectarAoBanco from "../config/dbconfig.js";

const conexao = await conectarAoBanco(process.env.STRING_DE_CONEXAO);

export async function getTodosPosts() {
  const db = conexao.db("imersao-instalikes");
  const coleccao = db.collection("posts");
  return coleccao.find().toArray();
}
