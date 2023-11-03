import express  from "express";
import mysql from "mysql2/promise";
import cors from "cors";




//conectar base de datos
const db= await mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'practico1',
    namedPlaceholders: true,
});
console.log('Conectado a base de datos');
//Creacion aplicacion express
const app=express();
app.use(express.json());
app.use(cors());

//Registrar metodo GET en ruta raiz ('/')
app.get('/',(req, res)=>{
    res.send("Hola Mundo");
});

//POST
app.post("/personas",async (req, res)=>{
    const persona= req.body.persona;
    await db.execute('INSERT INTO personas (descripcion, lista) VALUES(:descripcion, :lista)',
    {descripcion:persona.descripcion, lista: persona.lista}
    );
    res.status(201).send(persona);
})

//Get/personas//Leer todas las personas
app.get("/personas",async (req,res)=>{
    const [rows, fields]= await db.execute('SELECT * FROM personas')
    res.send(rows);
});

app.get("/personas/:id",async(req,res)=>{
    const id= req.params.id;
    const [rows, fields] = await db.execute(
        'SELECT * FROM personas WHERE id=?',[id]
    );
    if (rows.length>0){
        res.send(rows[0]);
    }else{
        res.status(404).send({mensaje: "persona no encontrada"});
    }

});


//Borrar elemento del arreglo

app.delete("/personas/:id",async (req, res)=>{
    const id= req.params.id;
    const [rows, fields] = await db.execute(
        'DELETE FROM personas WHERE id=?',[id]
    );
    res.send('ok')

});

//PUT

app.put("/personas/:id",async (req,res)=>{
    const id = req.params.id;
    const persona= req.body.persona;
    await db.execute(
        'UPDATE personas SET descripcion=:descripcion, lista=:lista WHERE id=:id', {
            descripcion:descripcion, lista:lista
        }
    )
    res.send('ok')
});



//Pongo en funcionamiento en la API
app.listen(3000, ()=>{
    console.log("API en funcionamiento");
})