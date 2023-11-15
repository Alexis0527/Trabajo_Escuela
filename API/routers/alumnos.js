import express from "express";
import { db } from "../db.js";
import cors from "cors";

export const alumnoRouter = express
    .Router()
    .use(cors())
    // [GET] Obtener Todos los Alumnos
    .get("/", async (req, res) => {
        const [rows, fields] = await db.execute("SELECT * FROM alumno");
        res.send(rows);
    })

    // [GET] Obtener Alumno por ID
    .get("/:id", async (req, res) => {
        const id = req.params.id;
        const [rows, fields] = await db.execute("SELECT * FROM alumno WHERE idalumno=:id", {
          id,
        });
        if (rows.length > 0) {
          res.send(rows[0]);
        } else {
          res.status(404).send({ mensaje: "Alumno no encontrado" });
        }
      })

    //[POST] Agregar Alumno
    .post("/", async (req, res) => {
      const alumno = req.body.alumno;
      const [rows] = await db.execute(
        "INSERT INTO alumno (idalumno,nombre,apellido,dni,fechaNacimiento,direccion,nomCompletoTutor,direccionTutor)VALUES(:idalumno ,:nombre,:apellido,:dni>,:fechaNacimiento,:direccion,:nomCompletoTutor,:numeroTutor,:direccionTutor)",
        { nombre: alumno.nombre,
          apellido: alumno.apellido,
          dni: alumno.dni,
          fechaNaciminto: alumno.fechaNacimiento,
          direccion: alumno.direccion,
          nomCompletoTutor: alumno.nomCompletoTutor,
          numeroTutor: alumno.numeroTutor,
          direccionTutor: alumno.direccionTutor
      });
      res.status(201).send({ ...alumno, id: rows.insertId });
  })
    // [PUT] Modificar Informacion Por ID
    .put("/alumno/:id", async (req, res) => {
        const id = req.params.id;
        const alumno = req.body.alumno;
        await db.execute(
          "UPDATE alumno SET nombre=:nombre, apellido=:apellido, dni=:dni, fechaNacimiento=:fechaNacimiento, direccion=:direccion, nomCompletoTutor=:nomCompletoTutor, numeroTutor=:numeroTutor, direccionTutor=:direccionTutor WHERE idalumno=:id",
          { id, nombre: alumno.nombre, apellido: alumno.apellido, dni: alumno.dni, fechaNacimiento: alumno.fechaNacimiento, direccion: alumno.direccion, nomCompletoTutor: alumno.nomCompletoTutor, numeroTutor: alumno.numeroTutor, direccionTutor: alumno.direccionTutor }
        );
        res.send("ok");
    });
      

