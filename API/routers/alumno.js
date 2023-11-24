import express from "express";
import { db } from "../db.js";

export const alumnoRouter = express
    .Router()
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
    .get("/buscar/:dato", async(req,res) => {
      const dato = req.params.dato;
      const [rows, fields] = await db.execute("SELECT * FROM alumno WHERE dni=:dato OR nombre=:dato OR apellido=:dato ", {
        dato,
      });
      if (rows.length > 0) {
        res.send(rows);
      } else {
        res.status(404).send({ mensaje: "Alumnos no encontrados" });
      }
    })
    .get("/:id/libreta", async (req,res) => {
    const id = req.params.id;
      const [rows, fields] = await db.execute(
        "SELECT concat(alumno.nombre,' ',alumno.apellido) as nombre, curso.nombreDescriptivo as curso, CONCAT(ROUND( libreta.diasAsistidos / (libreta.diasAsistidos + libreta.diasFaltados) * 100, 2 ),'%') as asistencia,\
        libreta.idlibreta FROM libreta  \
        INNER JOIN ALUMNO \
        ON libreta.alumnoid = alumno.idalumno \
        INNER JOIN CURSO \
        ON libreta.cursoid = curso.idcurso \
        where alumnoid = :id", {
        id
      });
      if (rows.length > 0) {
        res.send(rows);
      } else {
        res.status(404).send({ mensaje: "Libreta no encontrada" });
      }
    })

    //[POST] Agregar Alumno
    .post("/", async (req, res) => {
      const alumno = req.body.alumno;
      const [rows] = await db.execute(
        "INSERT INTO alumno (nombre,apellido,dni,fechaNacimiento,direccion,nomCompletoTutor,numeroTutor,direccionTutor)VALUES(:nombre,:apellido,:dni,:fechaNacimiento,:direccion,:nomCompletoTutor,:numeroTutor,:direccionTutor)",
        { nombre: alumno.nombre,
          apellido: alumno.apellido,
          dni: alumno.dni,
          fechaNacimiento: alumno.fechaNacimiento,
          direccion: alumno.direccion,
          nomCompletoTutor: alumno.nomCompletoTutor,
          numeroTutor: alumno.numeroTutor,
          direccionTutor: alumno.direccionTutor
      });
      res.status(201).send({ ...alumno, id: rows.insertId });
  })
    // [PUT] Modificar Informacion Por ID
    .put("/:id", async (req, res) => {
        const id = req.params.id;
        const alumno = req.body.alumno;
        await db.execute(
          "UPDATE alumno SET nombre=:nombre, apellido=:apellido, dni=:dni, fechaNacimiento=:fechaNacimiento, direccion=:direccion, nomCompletoTutor=:nomCompletoTutor, numeroTutor=:numeroTutor, direccionTutor=:direccionTutor WHERE idalumno=:id",
          { id, 
            nombre: alumno.nombre,
            apellido: alumno.apellido,
            dni: alumno.dni,
            fechaNacimiento: alumno.fechaNacimiento,
            direccion: alumno.direccion,
            nomCompletoTutor: alumno.nomCompletoTutor,
            numeroTutor: alumno.numeroTutor,
            direccionTutor: alumno.direccionTutor }
        );
        res.send("ok");
    });
      

