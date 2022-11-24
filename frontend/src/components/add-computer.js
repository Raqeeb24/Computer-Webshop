import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import ComputerDataService from "../services/computer";


function AddComputer() {

    const [computerInfo, setComputerInfo] = useState({
        name: '',
        cpu: '',
        cpu_cooler: '',
        mainboard: '',
        ram: '',
        gpu: '',
        ssd: '',
        case: '',
        power_supply: '',
        price: ''
    });

    const changeHandler = e => {
        setComputerInfo({...computerInfo, [e.target.name]: e.target.value})
    };

    const saveComptuer = () => {
        var data = {
            computer: computerInfo
        };
        
        ComputerDataService.createComputer(computerInfo)
        .then(response => {
            console.log(response.computerInfo);
          })
          .catch(e => {
            console.log(e);
          });
    }
    return (
        <div className="App">
            <head>
                <title>AddComputer</title>
            </head>
            <h1>Add a computer</h1>
            <form>
                <label for="input">Name</label>
                <input type="text"
                    class="form-control"
                    name="name"
                    onChange={changeHandler}
                    placeholder="name" />
                <div class="row">
                    <div class="col">
                        <label for="input">CPU</label>
                        <input type="text"
                            class="form-control"
                            name="cpu"
                            onChange={changeHandler}
                            placeholder="cpu" />
                    </div>
                    <div class="col">
                        <label for="input">CPU-cooler</label>
                        <input type="text"
                            class="form-control"
                            name="cpu_cooler"
                            onChange={changeHandler}
                            placeholder="cpu-cooler" />
                    </div>
                </div>
                <label for="input">Mainboard</label>
                <input type="text"
                    class="form-control"
                    name="mainboard"
                    onChange={changeHandler}
                    placeholder="mainboard" />
                <label for="input">RAM</label>
                <input type="text"
                    class="form-control"
                    name="ram"
                    onChange={changeHandler}
                    placeholder="ram" />
                <label for="input">GPU</label>
                <input type="text"
                    class="form-control"
                    name="gpu"
                    onChange={changeHandler}
                    placeholder="gpu" />
                <label for="input">SSD</label>
                <input type="text"
                    class="form-control"
                    name="ssd"
                    onChange={changeHandler}
                    placeholder="ssd" />
                <label for="input">Case</label>
                <input type="text"
                    class="form-control"
                    name="case"
                    onChange={changeHandler}
                    placeholder="case" />
                <label for="input">Power supply</label>
                <input type="text"
                    class="form-control"
                    name="power_supply"
                    onChange={changeHandler}
                    placeholder="power supply" />
                <div class="col-2">
                    <label for="input">Price</label>
                    <input type="text"
                        class="form-control"
                        name="price"
                        onChange={changeHandler}
                        placeholder="price" /><br />
                </div>

                <button onClick={saveComptuer} type="submit" class="btn btn-primary">submit</button>
            </form>
        </div>
    );
}

export default AddComputer;