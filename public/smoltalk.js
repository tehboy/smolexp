"use strict";

import { Resolver } from "./resolver.js";

// Define a Model class constructed with an empty string for a command buffer, and an empty list of previously executed commands.
class Model {
    constructor() {
        this.commandBuffer = '';
        this.previousCommands = [];
        this.resolver = new Resolver();
        this.value = this.resolver;
    }

    handleKey(key, code) {
        // If the key is Enter, send the command buffer to the server
        if (key === "Enter") {
            this.sendCommand();
        } else if (key === "Backspace") {
            // If the key is Backspace, remove the last character from the command buffer
            this.commandBuffer = this.commandBuffer.slice(0, -1);
        } else if (key.length === 1) {
            // If the key is not a control key, add it to the command buffer
            this.commandBuffer += key;
        }
    }

    // Method to send the command buffer to the server
    sendCommand() {
        console.log(this.commandBuffer);
        this.value = this.resolver.resolve(this.commandBuffer);
        this.previousCommands.push(this.commandBuffer);
        this.commandBuffer = '';
    }
}

var model = new Model();
function addKeyHandler() {
    // Create a function to create and append a div element to the body
    function createAndAppendDiv(id) {
        const div = document.createElement("div");
        div.id = id;
        document.body.appendChild(div);
        return div;
    }

    // Use the function to create the keyEventDisplay div
    const keyEventDisplay = createAndAppendDiv("keyEventDisplay");
    keyEventDisplay.style = "position: fixed; bottom: 10px; right: 10px; background-color: white; padding: 10px; border: 1px solid black; z-index: 1000;";
    const commandBufferDisplay = createAndAppendDiv("commandBufferDisplay");
    commandBufferDisplay.style = "position: fixed; bottom: 10px; left: 10px; background-color: white; padding: 10px; border: 1px solid black; z-index: 1000;";
    const elementDisplay = createAndAppendDiv("elementDisplay");


    // Add a keydown event listener to the document
    document.addEventListener("keydown", function (event) {
        // Get the key that was pressed
        const key = event.key;
        // Get the code of the key that was pressed
        const code = event.code;
        // Set the inner HTML of the new div to display the key and code
        keyEventDisplay.innerHTML = `Key: ${key}, Code: ${code}`;
        model.handleKey(key, code)
        commandBufferDisplay.innerHTML = `Buffer: ${model.commandBuffer}`;
        elementDisplay.innerHTML = model.value.display();
    });
}

addKeyHandler();
