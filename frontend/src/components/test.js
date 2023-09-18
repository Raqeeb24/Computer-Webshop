import React, {useEffect, useState} from "react";
import ComputerDataService from "../services/computer";


const Test = props => {

    const getCart = () => {
        ComputerDataService.testretrievesession();
    }
    const addToCart = () => {
        ComputerDataService.testconfiguresession();
    }

    //testing content
    const [message, setMessage] = useState('');

    // Function to send a POST request to set session data
    const setSessionData = async () => {
        try {
            const data = {
                name: "yesssss post"
            }
            await ComputerDataService.testconfiguresession(data);
            setMessage("success post");
        } catch (error) {
            console.error('Error setting session data:', error);
        }
    };

    // Function to send a GET request to retrieve session data
    const getSessionData = async () => {
        try {
            const response = await ComputerDataService.testretrievesession();
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error getting session data:', error);
        }
    };

    useEffect(() => {
        // Load session data when the component mounts
        getSessionData();
    }, []);

    return (
        <>
            <button onClick={addToCart}>addtocart</button>
            <button onClick={getCart}>view cart</button>
            <br />
            <br />
            <div>
                <h1>Session Test</h1>
                <button onClick={setSessionData}>Set Session Data</button>
                <p>Session Message: {message}</p>
            </div>
        </>
    );
}

export default Test;