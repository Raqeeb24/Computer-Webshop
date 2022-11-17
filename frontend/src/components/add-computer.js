import React from "react";
import 'bootstrap/dist/css/bootstrap-grid.min.css';

function AddComputer() {
    return (
        <div className="App">
            <head>
                <title>AddComputer</title>
            </head>
            <h1>Add a computer</h1>
            <form>
                <label for="input">Name</label>
                <input type="text" class="form-control" placeholder="name" />
                <div class="row">
                    <div class="col">
                        <label for="input">CPU</label>
                        <input type="text" class="form-control" placeholder="cpu" />
                    </div>
                    <div class="col">
                        <label for="input">CPU-cooler</label>
                        <input type="text" class="form-control" placeholder="cpu-cooler" />
                    </div>
                </div>
                <label for="input">Mainboard</label>
                <input type="text" class="form-control" placeholder="mainboard" />
                <label for="input">RAM</label>
                <input type="text" class="form-control" placeholder="ram" />
                <label for="input">GPU</label>
                <input type="text" class="form-control" placeholder="gpu" />
                <label for="input">SSD</label>
                <input type="text" class="form-control" placeholder="ssd" />
                <label for="input">Case</label>
                <input type="text" class="form-control" placeholder="case" />
                <label for="input">Power supply</label>
                <input type="text" class="form-control" placeholder="power supply" />
                <div class="col-2">
                    <label for="input">Price</label>
                    <input type="text" class="form-control" placeholder="price" /><br />
                </div>

                <button type="submit" class="btn btn-primary">submit</button>
            </form>
        </div>
    );
}

export default AddComputer;