//Dependencias
const morgan = require('morgan');
const express = require('express');
const app = express();
//Routers
const empleado = require('./routes/empleado');
const user = require('./routes/user');
//Middleware
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const index = require('./middleware/index');
const cors = require('./middleware/cors');

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res, next) =>{
    return res.status(200).json({ code: 200, message: "Bienvenido al sistema de RH"});
});

app.use("/user", user);
app.use(auth);
app.use("/empleado", empleado);
app.use(notFound);

app.use((req, res, next) => {
    return res.status(404).json({code: 404, message: "Url no encontrada"});
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Server listening");
});