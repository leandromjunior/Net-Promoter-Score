import express, { request, response } from 'express';

const app = express();

//http://localhost:3333/users
app.get("/", (request, response) => {

    return response.json({ message: "Hello World - NLW#4" }); //Retorna o arquivo em json
});

// 1 param -> Rota(Recurso API)
// 2 param -> request, response
app.post("/", (request, response) => {

    //API recebeu os dados para salvar
    return response.json({ message: "Os dados foram salvos com sucesso" });
});

app.listen(3333, () => console.log("Server is running")); //Criando servidor (porta 3333 esta livre)