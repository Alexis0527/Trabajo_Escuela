import express from "express";
import { db } from "../db.js";

export const cursoRouter = express
    .Router()
    .get("/", async (req, res) => {
        const [rows, fields] = await db.execute("SELECT * FROM curso");
        res.send(rows);
    })
    
    .get("/:id", async (req, res) => {
        const id = req.params.id;
        const [rows, fields] = await db.execute("SELECT * FROM curso WHERE idcurso=:id", {
          id,
        });
        if (rows.length > 0) {
          res.send(rows[0]);
        } else {
          res.status(404).send({ mensaje: "Curso No Encontrado" });
        }
    })
    .get("/buscar/:dato", async(req,res) => {
      const dato = req.params.dato;
      const [rows, fields] = await db.execute("SELECT * FROM curso WHERE nombreDescriptivo=:dato OR turno=:dato", {
        dato,
      });
      if (rows.length > 0) {
        res.send(rows);
      } else {
        res.status(404).send({ mensaje: "Curso No Encontrado." });
      }
    })
    .post("/", async (req, res) => {
        const curso = req.body.curso;
        const [rows] = await db.execute(
          "INSERT INTO curso ( nombreDescriptivo, turno) VALUES ( :nombreDescriptivo, :turno);",
          {
            nombreDescriptivo: curso.nombreDescriptivo,
            turno: curso.turno
          }
        );
      
        res.status(201).send({ ...curso, id: rows.insertId });
    })

    // [PUT] Modificar Informacion Por ID
    .put("/:id", async (req, res) => {
        const id = req.params.id;
        const curso = req.body.curso;
        await db.execute(
          "UPDATE curso SET nombreDescriptivo=:nombreDescriptivo, turno=:turno WHERE idcurso=:id",
          { id, nombreDescriptivo:curso.nombreDescriptivo, turno:curso.turno}
        );
        res.send("ok");
    })
    .delete("/:id", async (req, res) => {
      const id = req.params.id;
      await db.execute("DELETE FROM curso WHERE idcurso=:id", { id });
      res.send("ok");
  });  