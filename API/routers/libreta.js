import express from "express";
import { db } from "../db.js";

export const libretaRouter = express
    .Router()
    .get("/notas/:id", async (req,res) => {
        const id = req.params.id;
        const [rows, fields] = await db.execute(
            "SELECT libas.nota, asig.nombreDescritivo as asignatura, libas.asignaturaid FROM `libreta-asignatura` as libas \
            INNER JOIN libreta \
            ON  libreta.idlibreta = libas.libretaid \
            INNER JOIN asignatura as asig \
            ON libas.asignaturaid = asig.idasignatura \
            WHERE libas.libretaid = :id", {
            id
        });
        if (rows.length > 0) {
            res.send(rows);
        } else {
            res.status(404).send({ mensaje: "Notas no encontrada" });
        }
    })
    .get("/notas/:id/:idas", async (req,res) => {
        const id = req.params.id;
        const idas = req.params.idas;
        const [rows, fields] = await db.execute(
            "SELECT libas.nota, asig.nombreDescritivo as asignatura , libas.asignaturaid FROM `libreta-asignatura` as libas \
            INNER JOIN libreta \
            ON  libreta.idlibreta = libas.libretaid \
            INNER JOIN asignatura as asig \
            ON libas.asignaturaid = asig.idasignatura \
            WHERE libas.libretaid = :id AND libas.asignaturaid = :idas", {
            id, idas
        });
        res.send(rows);
    })
    .post("/:idalumno/:idcurso", async (req, res) => {
        const idalumno = req.params.idalumno;
        const idcurso = req.params.idcurso
        const [rows] = await db.execute(
          "INSERT INTO libreta (alumnoid,cursoid,diasFaltados,diasAsistidos)VALUES(:idalumno,:idcurso,:diasFaltados,:diasAsistidos)",
          { idalumno,idcurso,diasFaltados:0, diasAsistidos:0});
        res.status(201).send("nueva libreta añadida");
    })
    .post("/notas/:id/:idas/:nota", async (req,res) => {
        const id = req.params.id;
        const idas = req.params.idas;
        const nota = req.params.nota
        const [rows, fields] = await db.execute(
            "INSERT INTO `libreta-asignatura`(libretaid, asignaturaid, nota) VALUE(:id, :idas, :nota)", {
            id, idas, nota
        });
        res.send(rows);
    })