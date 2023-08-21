const socket = new WebSocket("wss://echo-ws-service.herokuapp.com")

socket.addEventListener("message", (event) =>{
    const recivedMessage = event.data;
    let messageData;

    try {
        messageData = JSON.parse(recivedMessage);
    } catch (error) {
        const chat = document.querySelector(".chat_main");
        const messageDiv = document.createElement("div");
        messageDiv.className = "message response";
        messageDiv.textContent = recivedMessage;
        chat.appendChild(messageDiv);
    }
})

function sendMessage() {
    const messageInput = document.querySelector(".message_input");
    const message = messageInput.value;
    if (message.trim() === "") {
        return;
    }
    const chat = document.querySelector(".chat_main");
    const messageDiv = document.createElement("div");
    messageDiv.className = "message";
    messageDiv.textContent = message;
    chat.appendChild(messageDiv);
    socket.send(message);
    messageInput.value = "";
}

function sendLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position)=> {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const mapLink = `https://www.openstreetmap.org/#map=14/${latitude}/${longitude}`;

            const chat = document.querySelector(".chat_main");
            const messageDiv = document.createElement("div");
            messageDiv.className = "message response";
            messageDiv.innerHTML = `<a href="${mapLink}" target="_blank">Гео-локация</a>`
            chat.appendChild(messageDiv);

            const locationData = {
                latitude: latitude,
                longitude: longitude
            };
            socket.send(JSON.stringify(locationData))
        })
    }
}