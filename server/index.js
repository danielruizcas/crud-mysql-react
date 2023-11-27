const express = require("express");
const app = express();
const PORT = 3001;
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud_mysql",
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const workPosition = req.body.workPosition;
  const workedYears = req.body.workedYears;

  db.query(
    "INSERT INTO empleados(name,age,country,workPosition,workedYears) VALUES(?,?,?,?,?)",
    [name, age, country, workPosition, workedYears],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Empleado registrado con éxito!!");
      }
    }
  );
});

app.get("/empleados", (req, res) => {
  db.query("SELECT * FROM empleados", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const workPosition = req.body.workPosition;
  const workedYears = req.body.workedYears;

  db.query(
    "UPDATE empleados SET name=?,age=?,country=?,workPosition=?,workedYears=? WHERE id=?",
    [name, age, country, workPosition, workedYears, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Empleado actualizado con éxito!!");
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM empleados WHERE id=?", [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Empleado eliminado con éxito!!");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Corriendo desde el puerto ${PORT}`);
});
