import express from "express";

const app = express();
const PORT = 3000;

const posts = [
  {
    id: 1,
    descricao: "Foto teste",
    imagem: "https://placecats.com/millie/300/150",
  },
  {
    id: 2,
    descricao: "Gato preguiçoso tomando sol",
    imagem: "https://placecats.com/millie/300/150",
  },
  {
    id: 3,
    descricao: "Gatinho curioso explorando uma caixa",
    imagem: "https://placecats.com/millie/300/150",
  },
  {
    id: 4,
    descricao: "Gata brincando com um novelo de lã",
    imagem: "https://placecats.com/millie/300/150",
  },
  {
    id: 5,
    descricao: "Gato com olhos azuis esverdeados",
    imagem: "https://placecats.com/millie/300/150",
  },
  {
    id: 6,
    descricao: "Grupo de gatinhos brincando",
    imagem: "https://placecats.com/millie/300/150",
  },
];

function getPostById(id) {
  return posts.findIndex((post) => post.id === Number(id));
}

app.use(express.json());

app.get("/posts", (req, res) => {
  res.status(200).json(posts);
});

app.get("/posts/:id", (req, res) => {
  const index = getPostById(req.params.id);
  res.status(200).json(posts[index]);
});

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
