import express from "express";
import { db } from "../db.js";

export const cursoRouter = express
    .Router()
    .get("/", async (req, res) => {
        const [rows, fields] = await db.execute("SELECT * FROM curso");
        res.send(rows);
    })