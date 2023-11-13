import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";


// Conectar a base de datos
const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "escuela",
  namedPlaceholders: true,
});
console.log("Conectado a base de datos...[i]");

// Creo aplicacion express
const app = express();

app.use(express.json());
app.use(cors());

// Registrar metodo GET en ruta raiz ('/')
app.get("/", (req, res) => {
  res.send("[HOME]");
});

//[POST] Agregar Alumno/Profesor
app.post("/alumno", async (req, res) => {
  const alumno = req.body.alumno;
  const [rows] = await db.execute(
    "INSERT INTO `escuela`.`alumno` (`nombre`, `apellido`, `dni`, `turno`, `fechaNacimiento`, `direccion`, `nomCompletoTutor`, `numeroTutor`, `direccionTutor`) VALUES (:nombre, :apellido, :dni, :turno, :fechaNacimiento, :direccion, :nomCompletoTutor, :numeroTutor, :direccionTutor);",
    { nombre: alumno.nombre, apellido: alumno.apellido, dni:alumno.dni, turno: alumno.turno, fechaNacimiento: alumno.fechaNacimiento, direccion: alumno.direccion, nomCompletoTutor: alumno.nomCompletoTutor, numeroTutor: alumno.numeroTutor, direccionTutor: alumno.direccionTutor  }
  );
 
  res.status(201).send({ ...alumno, id: rows.insertId });
});

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

// [GET] Obtener Todos los Alumnos/Profesor
app.get("/alumno", async (req, res) => {
  const [rows, fields] = await db.execute("SELECT * FROM alumno");
  res.send(rows);
});

app.get("/profesor", async (req, res) => {
  const [rows, fields] = await db.execute("SELECT * FROM profesor");
  res.send(rows);
});

//[GET] Obtener Profesor


//[GET] Por Nombre
app.get("/profesor/nombre/:nombre", async (req, res) => {
  const nombre = req.params.nombre;
  const [rows, fields] = await db.execute("SELECT * FROM profesor WHERE nombre=:nombre", {
    nombre,
  });
  if (rows.length > 0) {
    res.send(rows[0]);
  } else {
    res.status(404).send({ mensaje: "Profesor no encontrado" });
  }
});

//[GET] Por DNI
app.get("/profesor/dni/:numeroDocumento", async (req, res) => {
  const nombre = req.params.nombre;
  const [rows, fields] = await db.execute("SELECT * FROM profesor WHERE dni=:numeroDocumento", {
    nombre,
  });
  if (rows.length > 0) {
    res.send(rows[0]);
  } else {
    res.status(404).send({ mensaje: "Profesor no encontrado" });
  }
});
//-----------------------------------------------------------------------------------------------------------------------

//[GET] Obtener Alumno

//[GET] Por Nombre

app.get("/alumno/nombre/:nombre", async (req, res) => {
  const nombre = req.params.nombre;
  const [rows, fields] = await db.execute("SELECT * FROM alumno WHERE nombre=:nombre", {
    nombre,
  });
  if (rows.length > 0) {
    res.send(rows[0]);
  } else {
    res.status(404).send({ mensaje: "Alumno no encontrado" });
  }
});

//[GET] Por DNI
app.get("/alumno/dni/:numeroDocumento", async (req, res) => {
  const numeroDocumento = req.params.numeroDocumento;
  const [rows, fields] = await db.execute("SELECT * FROM alumno WHERE dni=:numeroDocumento", {
    numeroDocumento,
  });
  if (rows.length > 0) {
    res.send(rows[0]);
  } else {
    res.status(404).send({ mensaje: "Alumno no encontrado" });
  }
});

// [PUT] Modificar Informacion Por ID
app.put("/alumno/:id", async (req, res) => {
  const id = req.params.id;
  const alumno = req.body.alumno;
  await db.execute(
    "UPDATE alumno SET nombre=:nombre, apellido=:apellido, dni=:dni, turno=:turno, fechaNacimiento=:fechaNacimiento, direccion=:direccion, nomCompletoTutor=:nomCompletoTutor, numeroTutor=:numeroTutor, direccionTutor=:direccionTutor WHERE idalumno=:id",
    { id, nombre: alumno.nombre, apellido: alumno.apellido, dni: alumno.dni, turno: alumno.turno, fechaNacimiento: alumno.fechaNacimiento, direccion: alumno.direccion, nomCompletoTutor: alumno.nomCompletoTutor, numeroTutor: alumno.numeroTutor, direccionTutor: alumno.direccionTutor }
  );
  res.send("ok");
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
