

function socket(server) {
    const io = require('socket.io')(server);

    io.on("connection", (socket) => {
        socket.emit("hello", "maulik")
        socket.on("hello", (avg) => {
            console.log(avg);
        })
    })
}

module.exports = socket