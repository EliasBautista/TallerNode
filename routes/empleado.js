const express = require('express');
const empleado = express.Router();
const db = require('../config/database');

empleado.post("/", async (req, res, next) =>{
    const {Nombre, Apellido, Telefono, Email, Direccion} = req.body;

    if (Nombre && Apellido && Telefono && Email && Direccion) {
        let query = "INSERT INTO empleado (Nombre, Apellido, Telefono, Email, Direccion)";
        query += `VALUES ('${Nombre}','${Apellido}','${Telefono}','${Email}','${Direccion}')`;
        const rows = await db.query(query);
        //console.log(rows);

        if (rows.affectedRows == 1) {
            return res.status(201).json({code: 201, message: "Empleado Insertado correctamente"});
        }
        return res.status(500).json({code: 500, message: "Ocurrió un error"});
    }
    return res.status(500).json({code: 500, message: "Campos Incompletos"});
});

empleado.delete("/:id([0-9]{1,3})", async(req, res, next) =>{
    const query = `DELETE FROM empleado WHERE Id_empleado = ${req.params.id}`;

    const rows = await db.query(query);

    if (rows.affectedRows == 1) {
        return res.status(200).json({code: 200, message: "Empleado borrado correctamente"});
    }
    return res.status(404).json({code: 404, message: "Empleado no encontrado"});
});

empleado.put("/:id([0-9]{1,3})", async(req, res, next) =>{
    const {Nombre, Apellido, Telefono, Email, Direccion} = req.body;

    if (Nombre && Apellido && Telefono && Email && Direccion) {
        let query = `UPDATE empleado SET Nombre='${Nombre}', Apellido='${Apellido}',`;
        query += `Telefono='${Telefono}', Email='${Email}', Direccion='${Direccion}' WHERE Id_empleado=${req.params.id};`;

        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(200).json({code: 200, message: "Empleado Actualizado Correctamente"});
        }
        return res.status(500).json({code: 500, message: "Ocurrió un error"});
    }
    return res.status(500).json({code: 500, message: "Campos Incompletos"});

});

empleado.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const id = req.params.id;
    const emp = await db.query("SELECT * FROM empleado WHERE Id_empleado = " + id);
    if (Object.entries(emp).length === 0){
        return res.status(404).json({code: 404, message: "Empleado no encontrado"});
    }else{
        return res.status(200).json({code: 200, message: emp});
    }
    // if (id >= 0 && id <= 150) {
    //     return res.status(200).send(pk[req.params.id - 1]);
    // }
});

empleado.get("/", async(req, res, next) => {
    const emp = await db.query("SELECT * FROM empleado");
    //console.log(emp);
    return res.status(200).json(emp);
});

empleado.get('/:name([A-Za-z]+)', async (req, res, next) => {
    const name = req.params.name.toLowerCase();
    const emp = await db.query("SELECT * FROM empleado WHERE Nombre = '" + name + "'");
    if (Object.entries(emp).length === 0){
        return res.status(404).json({code: 404, message: "Empleado no encontrado"});
    }else{
        return res.status(200).json({code: 200, message: emp});
    }
})

module.exports = empleado;