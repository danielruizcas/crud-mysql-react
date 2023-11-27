import { useState } from "react";
import Axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

function App() {
  const [id, setId] = useState();
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [workPosition, setWorkPosition] = useState("");
  const [workedYears, setWorkedYears] = useState(0);
  const [data, setData] = useState([]);

  const [edit, setEdit] = useState(false);

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/create", {
      name,
      age,
      country,
      workPosition,
      workedYears,
    })
      .then(() => {
        Swal.fire({
          title: "Empleado registrado satisfactoriamente",
          text: `El empleado: ${name} fue registrado satisfactoriamente`,
          icon: "success",
        });
        getEmpleados();
        setName("");
        setAge(0);
        setCountry("");
        setWorkPosition("");
        setWorkedYears(0);
      })
      .catch((error) => {
        Swal.fire({
          title: "Error al momento de registrar el empleado",
          text: `Se presento el error ${error} al momento de registrar`,
          icon: "error",
        });
        console.error(error);
      });
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    Axios.put("http://localhost:3001/update", {
      id,
      name,
      age,
      country,
      workPosition,
      workedYears,
    })
      .then(() => {
        Swal.fire({
          title: "Datos actualizados satisfactoriamente",
          text: `Los datos del empleado ${name} fueron actualizados`,
          icon: "success",
        });
        getEmpleados();
        resetStates();
        setEdit(false);
      })
      .catch((error) => {
        Swal.fire({
          title: "Error al momento de actualizar",
          text: `Se presento el error ${error} al momento de actualizar`,
          icon: "error",
        });
        console.error(error);
      });
  };

  const handleDelete = ({ id, name }) => {
    Swal.fire({
      title: `¿Estas seguro que deseas eliminar al empleado ${name}?`,
      text: "Los datos serán eliminados de manera permanente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${id}`)
          .then(() => {
            Swal.fire({
              title: "Datos eliminados satisfactoriamente",
              text: `Los datos del empleado ${name} fueron eliminados`,
              icon: "success",
            });
            getEmpleados();
            setEdit(false);
          })
          .catch((error) => {
            Swal.fire({
              title: "Error al momento de eliminar",
              text: `Se presento el error ${error} al momento de eliminar`,
              icon: "error",
            });
            console.error(error);
          });
      }
    });
  };

  const getEmpleados = () => {
    Axios.get("http://localhost:3001/empleados")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.error(error));
  };

  const handleEditEmpleado = (valor) => {
    setEdit(true);
    setName(valor.name);
    setAge(valor.age);
    setCountry(valor.country);
    setWorkPosition(valor.workPosition);
    setWorkedYears(valor.workedYears);
    setId(valor.id);
  };

  const handleCancel = () => {
    setEdit(false);
    resetStates();
  };

  const resetStates = () => {
    setId();
    setName("");
    setAge(0);
    setCountry("");
    setWorkPosition("");
    setWorkedYears(0);
  };

  getEmpleados();

  return (
    <div className="container">
      <div className="App">
        <div
          className="card text-center"
          style={{
            marginTop: "10px",
          }}
        >
          <div className="card-header">
            <h3>Gestión de empleados</h3>
          </div>
          <div className="card-body">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Name:
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                onChange={(e) => setName(e.target.value)}
                value={name}
                aria-label="Name"
                aria-describedby="basic-addon1"
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "baseline",
              }}
            >
              <div
                className="input-group mb-3"
                style={{
                  borderRadius: "15px",
                }}
              >
                <span className="input-group-text" id="basic-addon1">
                  Age:
                </span>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Age"
                  onChange={(e) => setAge(e.target.value)}
                  value={age}
                  aria-label="Age"
                  aria-describedby="basic-addon1"
                />
              </div>
              <input
                type="range"
                style={{
                  minWidth: "200px",
                  maxWidth: "800px",
                  width: "400px",
                  margin: "0 20px",
                }}
                max="120"
                onChange={(e) => setAge(e.target.value)}
                value={age}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Country:
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Country"
                onChange={(e) => setCountry(e.target.value)}
                value={country}
                aria-label="Country"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Work position:
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Work position"
                onChange={(e) => setWorkPosition(e.target.value)}
                value={workPosition}
                aria-label="WorkPosition"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Worked years:
              </span>
              <input
                type="number"
                className="form-control"
                placeholder="Worked years"
                onChange={(e) => setWorkedYears(e.target.value)}
                value={workedYears}
                aria-label="Name"
                aria-describedby="basic-addon1"
              />
              <input
                type="range"
                style={{
                  minWidth: "200px",
                  maxWidth: "800px",
                  width: "400px",
                  margin: "0 20px",
                }}
                max="120"
                onChange={(e) => setWorkedYears(e.target.value)}
                value={workedYears}
              />
            </div>
          </div>
          <div className="card-footer text-muted">
            {edit ? (
              <>
                <button
                  className={"btn btn-warning m-2"}
                  onClick={handleSubmitEdit}
                >
                  Guardar cambios
                </button>
                <button className={"btn btn-danger m-2"} onClick={handleCancel}>
                  Cancelar
                </button>
              </>
            ) : (
              <button
                className={"btn btn-success"}
                onClick={handleSubmitRegister}
              >
                Registrar
              </button>
            )}
          </div>
        </div>
        <section>
          <table
            className="table table-success table-striped"
            style={{
              marginTop: "20px",
            }}
          >
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Age</th>
                <th scope="col">Country</th>
                <th scope="col">Work position</th>
                <th scope="col">Worked years</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map(
                ({ id, name, age, country, workPosition, workedYears }) => (
                  <tr key={id}>
                    <th scope="row">{id}</th>
                    <td>{name}</td>
                    <td>{age}</td>
                    <td>{country}</td>
                    <td>{workPosition}</td>
                    <td>{workedYears}</td>
                    <td>
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="Basic example"
                      >
                        <button
                          type="button"
                          className="btn btn-info"
                          onClick={() => {
                            handleEditEmpleado({
                              id,
                              name,
                              age,
                              country,
                              workPosition,
                              workedYears,
                            });
                          }}
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => {
                            handleDelete({ id, name });
                          }}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}

export default App;
