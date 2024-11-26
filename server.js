import express from "express";
import routes from "./src/routes/postsRoutes.js";

const app = express();
app.use(express.static("uploads"))
routes(app);
const PORT = 3000;

function getPostById(id) {
  return posts.findIndex((post) => post.id === Number(id));
}

app.use(express.json());


app.get("/posts/:id", (req, res) => {
  const index = getPostById(req.params.id);
  res.status(200).json(posts[index]);
});

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
