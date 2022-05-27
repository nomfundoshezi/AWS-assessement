import React, { useState } from 'react';
import './App.css';
const config = require('./config.json');
 const EMAIL_SUBSCRIPTION_ENDPOINT =  config.EMAIL_SUBSCRIPTION_ENDPOINT

function App() {
    const [email, setEmail] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        fetch(`${EMAIL_SUBSCRIPTION_ENDPOINT}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }, body: JSON.stringify({
                email: email
            })
        })
            .then(function (response) {
                return response.text();
            })
            .then(function (data) {
                setEmail("");
                if(data === "email_exist"){
                    alert("This email has already subscribed.")
                } else if(data === "error") {
                    alert("Some error occured, please try again...")
                } else if(data === "success") {
                    alert("Successfuly subscribed.")
                }
            })
            .catch(function (error) {
                alert("An error occured, maybe check your internet connection and try again...")
            });
    };

    return (
        <div className="App">
            <h2>AWS Assessment</h2>
            <hr />
            <form onSubmit={handleSubmit}>
                <label>Email: </label>
                <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                <button type="submit">Subscribe</button>
                <hr />
            </form>
        </div>
    );
}

export default App;
