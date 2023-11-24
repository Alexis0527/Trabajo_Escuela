import express from "express";
import { db } from "../db.js";

export const profesorRouter = express
    .Router()
    .get("/", async (req, res) => {
        const [rows, fields] = await db.execute("SELECT * FROM profesor");
        res.send(rows);
    })
    .get("/:id", async (req, res) => {
        const id = req.params.id;
        const [rows, fields] = await db.execute("SELECT * FROM profesor WHERE idprofesor=:id", {
          id,
        });
        if (rows.length > 0) {
          res.send(rows[0]);
        } else {
          res.status(404).send({ mensaje: "Profesor no encontrado" });
        }
    })
    .get("/buscar/:dato", async(req,res) => {
      const dato = req.params.dato;
      const [rows, fields] = await db.execute("SELECT * FROM profesor WHERE dni=:dato OR nombre=:dato OR apellido=:dato ", {
        dato,
      });
      if (rows.length > 0) {
        res.send(rows);
      } else {
        res.status(404).send({ mensaje: "Profesores no encontrados" });
      }
    })
    .post("/", async (req, res) => {
        const profesor = req.body.profesor;
        const [rows] = await db.execute(
          "INSERT INTO profesor (nombre,apellido,dni,direccion) VALUES (:nombre, :apellido, :dni, :direccion);",
          {
            nombre: profesor.nombre,
            apellido: profesor.apellido,
            dni: profesor.dni,
            direccion: profesor.direccion,
          }
        );
      
        res.status(201).send({ ...profesor, id: rows.insertId });
    })

    // [PUT] Modificar Informacion Por ID
    .put("/:id", async (req, res) => {
        const id = req.params.id;
        const profesor = req.body.profesor;
        await db.execute(
          "UPDATE profesor SET nombre=:nombre, apellido=:apellido, dni=:dni, direccion=:direccion WHERE idprofesor=:id",
          { id, nombre:profesor.nombre, apellido:profesor.apellido, dni:profesor.dni,direccion:profesor.direccion}
        );
        res.send("ok");
    })
    .delete("/:id", async (req, res) => {
      const id = req.params.id;
      await db.execute("DELETE FROM profesor WHERE idprofesor=:id", { id });
      res.send("ok");
  });  
