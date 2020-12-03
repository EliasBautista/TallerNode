const express = require('express');
const app = express();
const empleado = require('./routes/empleado')

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res, next) =>{
    return res.status(200).json({ code: 200, message: "Bienvenido al sistema de RH"});
});

app.use("/empleado", empleado);

app.use((req, res, next) => {
    return res.status(404).json({code: 404, message: "Url no encontrada"});
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Server listening");
});