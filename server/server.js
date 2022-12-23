const express = require('express')
const { Server } = require("socket.io");
const http = require('http');
const cors = require("cors")
const app = express()
const port = 8080
const server = http.createServer(app);

app.use(cors());
const io = new Server(server)

let users = []
let randomNumber = Math.floor(Math.random() * (70 - 30)) + 30

for(i = 0; i < 1; i++) {
    setInterval(() => {
        console.log(users)
    }, 5000)
}

io.on("connection", (socket) => {

    socket.on("user_connection", (username) => {

        users.push({ username: username, score: 0 })

        const user = users.find(user => user.username === username)
        console.log(randomNumber)

        socket.emit("user_connection", user)
        socket.emit("generate_random_number", randomNumber)
        socket.broadcast.emit("other_user_connected", user)
        io.emit("users_list", users)

        socket.on("user_disconnect", () => {
            const usersUsername = users.map(user => user.username)
            const index = usersUsername.indexOf(user.username)
            if (index > -1){
                users.splice(index, 1)
            }

            io.emit("users_list", users)
            socket.broadcast.emit("user_disconnect", user)
        })

        socket.on("disconnect", () => {
            const usersUsername = users.map(user => user.username)
            const index = usersUsername.indexOf(user.username)
            if (index > -1){
                users.splice(index, 1)
            }

            io.emit("users_list", users)
            socket.broadcast.emit("user_disconnect", user)
        })

        socket.on("add_score", (addScore) => {
            users = users.map(userInList => {
                if (userInList.username === user.username) {
                    user.score = user.score + addScore
                    return {...userInList, score: user.score}
                }
                return userInList
            })
            io.emit("add_score", users)
        })
    })

});



server.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
