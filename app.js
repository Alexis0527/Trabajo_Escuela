import express  from "express";
import mysql from "mysql2/promise";
import cors from "cors";




//conectar base de datos
const db= await mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'escuela',
    namedPlaceholders: true,
});
console.log('Conectado a base de datos');
// Creo aplicacion express
const app = express();

app.use(express.json());
app.use(cors());

// Registrar metodo GET en ruta raiz ('/')
app.get("/", (req, res) => {
  res.send("Hola mundo");
});

// GET /alumno: Leer todos los alumnos
app.get("/alumno", async (req, res) => {
  const [rows, fields] = await db.execute("SELECT * FROM alumno");
  res.send(rows);
});

// GET /alumnos/:id: Leer alumno por :id
app.get("/alumno/:id", async (req, res) => {
  const id = req.params.id;
  const [rows, fields] = await db.execute(
    "SELECT * FROM alumno WHERE idalumno=:id",
    {
      id,
    }
  );
  if (rows.length > 0) {
    res.send(rows[0]);
  } else {
    res.status(404).send({ mensaje: "Alumno no encontrado" });
  }
});

// POST /alumno: Agregar nuevo alumno
app.post("/alumno", async (req, res) => {
  const alumno = req.body.alumno;
  const [rows] = await db.execute(
    "INSERT INTO `escuela`.`alumno` (`nombre`, `apellido`, `dni`, `turno`, `fechaNacimiento`, `direccion`, `nomCompletoTutor`, `numeroTutor`, `direccionTutor`) VALUES (:nombre, :apellido, :dni, :turno, :fechaNacimiento, :direccion, :nomCompletoTutor, :numeroTutor, :direccionTutor);",
    {
      nombre: alumno.nombre,
      apellido: alumno.apellido,
      dni: alumno.dni,
      turno: alumno.turno,
      fechaNacimiento: alumno.fechaNacimiento,
      direccion: alumno.direccion,
      nomCompletoTutor: alumno.nomCompletoTutor,
      numeroTutor: alumno.numeroTutor,
      direccionTutor: alumno.direccionTutor,
    }
  );

  res.status(201).send({ ...alumno, id: rows.insertId });
});
// POST /profesor: Agregar nuevo profesor
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


// PUT /tareas/:id: Modificar tarea con :id
app.put("/tareas/:id", async (req, res) => {
  const id = req.params.id;
  const tarea = req.body.tarea;
  await db.execute(
    "UPDATE tareas SET descripcion=:descripcion, lista=:lista WHERE id=:id",
    { id, descripcion: tarea.descripcion, lista: tarea.lista }
  );
  res.send("ok");
});

// Pongo en funcionamiento la API en puerto 3000
app.listen(3000, () => {
  console.log("API en funcionamiento");
});
