import React, { useState } from 'react';
import './App.css';

function App() {

    const [email, setEmail] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        fetch(`https://65awihmhdcvc3ssfiaopkevu4u0ahbbq.lambda-url.us-east-1.on.aws/${email}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                setEmail("");
                console.log(data);
            })
            .catch(function (error) {
                console.log("Error in storing email");
            });
    };

    return (
        <div className="App">
            <h2>AWS Assessment</h2>
            <hr />
            <form onSubmit={handleSubmit}>
                <label>Email: </label>
                <input type="email" onChange={(e) => setEmail(e.target.value)} />
                <button type="submit">Subscribe</button>
                <hr />
            </form>
        </div>
    );
}

export default App;
