/* COMANDOS NECESSÁRIOS PARA RODAR

$ npx prisma db push (habilita o prisma ao DB)
$ npx prisma studio (mostra o conteudo do banco em real time (abrir outro terminal paralelo mk m))
$ npm run dev (roda o script para iniciar a conexão (node --watch server.js))
*/

import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/usuarios", async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).json({ message: "Usuarios já cadastrados", users });
});

app.post("/usuarios", async (req, res) => {
  const users = await prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    },
  });

  res.status(201).json({ message: "Usuario criado com sucesso", users });
});

app.put("/usuarios/:id", async (req, res) => {
  const users = await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    },
  });
  res.status(200).json({ message: "Usuario modificado com sucesso", users });
});

app.delete("/usuarios/:id", async (req, res) => {
  const users = await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({ message: "Usuario excluido com sucesso", users });
});

app.listen(3000);

/* http://localhost:3000

/* DB - usuario: lamarckj
DB - senha: NnjLezNuj6BhKU9b
*/
