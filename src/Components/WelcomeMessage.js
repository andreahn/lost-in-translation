import React from 'react';

export default function WelcomeMessage() {
    return (
        <div id="welcomeMessage">
            <img src={require("../assets/Logo.png")} alt="Logo" />
            <h1>Lost in Translation</h1>
            <h2>Get started</h2>
        </div>
    );
}
