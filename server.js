import express from "express";
import conectarAoBanco from "./src/config/dbconfig.js";


const conexao = await conectarAoBanco(process.env.STRING_DE_CONEXAO);
const app = express();
const PORT = 3000;

const posts = [
  {
    id: 1,
    descricao: "Foto teste",
    imgUrl: "https://placecats.com/millie/300/150",
  },
  {
    id: 2,
    descricao: "Gato preguiçoso tomando sol",
    imgUrl: "https://placecats.com/millie/300/150",
  },
  {
    id: 3,
    descricao: "Gatinho curioso explorando uma caixa",
    imgUrl: "https://placecats.com/millie/300/150",
  },
  {
    id: 4,
    descricao: "Gata brincando com um novelo de lã",
    imgUrl: "https://placecats.com/millie/300/150",
  },
  {
    id: 5,
    descricao: "Gato com olhos azuis esverdeados",
    imgUrl: "https://placecats.com/millie/300/150",
  },
  {
    id: 6,
    descricao: "Grupo de gatinhos brincando",
    imagem: "https://placecats.com/millie/300/150",
  },
];

async function getTodosPosts() {
  const db = conexao.db("imersao-instalikes");
  const coleccao = db.collection("posts");
  return coleccao.find().toArray();
}

function getPostById(id) {
  return posts.findIndex((post) => post.id === Number(id));
}

app.use(express.json());

app.get("/posts", async (req, res) => {
  const posts = await getTodosPosts();
  res.status(200).json(posts);
});

app.get("/posts/:id", (req, res) => {
  const index = getPostById(req.params.id);
  res.status(200).json(posts[index]);
});

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
