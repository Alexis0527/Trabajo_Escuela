import express from "express";
import cors from "cors";
import { alumnoRouter } from "./routers/alumnos.js";


// Creo aplicacion express
const app = express();

app.use(express.json());
app.use(cors());
app.use("/alumno", alumnoRouter)

// Registrar metodo GET en ruta raiz ('/')
app.get("/", (req, res) => {
  res.send("[HOME]");
});



//[POST] Agregar Alumno/Profesor

app.post("/profesor", async (req, res) => {
  const profesor = req.body.profesor;
  const [rows] = await db.execute(
    "INSERT INTO `escuela`.`profesor` (`nombre`, `apellido`,`dni`, `direccion`) VALUES (:nombre, :apellido, :dni, :direccion);",
    {
      nombre: profesor.nombre,
      apellido: profesor.apellido,
      dni: profesor.dni,
      direccion: profesor.direccion,
    }
  );

  res.status(201).send({ ...profesor, id: rows.insertId });
});

app.get("/profesor", async (req, res) => {
  const [rows, fields] = await db.execute("SELECT * FROM profesor");
  res.send(rows);
});


app.get("/profesor/:id", async (req, res) => {
  const id = req.params.id;
  const [rows, fields] = await db.execute("SELECT * FROM profesor WHERE idprofesor=:id", {
    id,
  });
  if (rows.length > 0) {
    res.send(rows[0]);
  } else {
    res.status(404).send({ mensaje: "Profesor no encontrado" });
  }
});

app.put("/profesor/:id", async (req, res) => {
  const id = req.params.id;
  const profesor = req.body.profesor;
  await db.execute(
    "UPDATE profesor SET nombre=:nombre, apellido=:apellido, dni=:dni, direccion=:direccion WHERE idprofesor=:id",
    { id, nombre:profesor.nombre, apellido:profesor.apellido, dni:profesor.dni,direccion:profesor.direccion}
  );
  res.send("ok");
});


// Pongo en funcionamiento la API en puerto 3000
app.listen(4000, () => {
  console.log("Base De Datos Conectada [i]");
  console.log("API en Funcionamiento [i]");
});
