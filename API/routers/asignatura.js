import express from "express";
import { db } from "../db.js";

export const asignaturaRouter = express
    .Router()
    .get("/", async (req, res) => {
        const [rows, fields] = await db.execute("SELECT * FROM asignatura");
        res.send(rows);
    })