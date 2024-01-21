import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import { ToastContainer, toast } from "react-toastify";

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
        setComputerInfo({ ...computerInfo, [e.target.name]: e.target.value })
    };

    const saveComptuer = async (e) => {
        e.preventDefault();
        try {
            const { data } = await ComputerDataService.createComputer(computerInfo);
            const { success, message } = data;
            if (success) {
                handleSuccess(message);
            } else {
                handleError(message);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleError = (err) =>
        toast.error(err, {
            position: "bottom-left",
        });
    const handleSuccess = (msg) =>
        toast.success(msg, {
            position: "bottom-right",
        });

    return (
        <div className="App">
            <h1>Add a computer</h1>
            <form>
                <label htmlFor="input">Name</label>
                <input type="text"
                    className="form-control"
                    name="name"
                    onChange={changeHandler}
                    placeholder="name" />
                <div className="row">
                    <div className="col">
                        <label htmlFor="input">CPU</label>
                        <input type="text"
                            className="form-control"
                            name="cpu"
                            onChange={changeHandler}
                            placeholder="cpu" />
                    </div>
                    <div className="col">
                        <label htmlFor="input">CPU-cooler</label>
                        <input type="text"
                            className="form-control"
                            name="cpu_cooler"
                            onChange={changeHandler}
                            placeholder="cpu-cooler" />
                    </div>
                </div>
                <label htmlFor="input">Mainboard</label>
                <input type="text"
                    className="form-control"
                    name="mainboard"
                    onChange={changeHandler}
                    placeholder="mainboard" />
                <label htmlFor="input">RAM</label>
                <input type="text"
                    className="form-control"
                    name="ram"
                    onChange={changeHandler}
                    placeholder="ram" />
                <label htmlFor="input">GPU</label>
                <input type="text"
                    className="form-control"
                    name="gpu"
                    onChange={changeHandler}
                    placeholder="gpu" />
                <label htmlFor="input">SSD</label>
                <input type="text"
                    className="form-control"
                    name="ssd"
                    onChange={changeHandler}
                    placeholder="ssd" />
                <label htmlFor="input">Case</label>
                <input type="text"
                    className="form-control"
                    name="case"
                    onChange={changeHandler}
                    placeholder="case" />
                <label htmlFor="input">Power supply</label>
                <input type="text"
                    className="form-control"
                    name="power_supply"
                    onChange={changeHandler}
                    placeholder="power supply" />
                <div className="col-2">
                    <label htmlFor="input">Price</label>
                    <input type="text"
                        className="form-control"
                        name="price"
                        onChange={changeHandler}
                        placeholder="price" /><br />
                </div>
                <button onClick={saveComptuer} type="submit" className="btn btn-primary">submit</button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default AddComputer;