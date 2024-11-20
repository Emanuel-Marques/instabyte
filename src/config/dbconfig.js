import { MongoClient } from "mongodb";

export default async function conectarAoBanco(stringDeConexao){
    let mongoClient;

    try {
        mongoClient = new MongoClient(stringDeConexao);
        console.log("Conectando ao banco de dados...");
        await mongoClient.connect();
        console.log("Conexão estabelecida com sucesso!");

        return mongoClient;
    } catch(erro) {
        console.error("Erro ao conectar ao banco de dados: ", erro);
        process.exit();
    }
}