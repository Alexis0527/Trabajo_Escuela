import express from "express";
import cors from "cors";
import { alumnoRouter } from "./routers/alumno.js";
import { profesorRouter } from "./routers/profesor.js";


// Creo aplicacion express
const app = express();

app.use(express.json());
app.use(cors());
app.use("/alumno", alumnoRouter)
app.use("/profesor",profesorRouter)

// Registrar metodo GET en ruta raiz ('/')
app.get("/", (req, res) => {
  res.send("[HOME]");
});

// Pongo en funcionamiento la API en puerto 3000
app.listen(4000, () => {
  console.log("Base De Datos Conectada [i]");
  console.log("API en Funcionamiento [i]");
});
