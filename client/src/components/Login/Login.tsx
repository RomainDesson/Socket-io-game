import {useContext, useEffect, useState} from "react";
import {SocketContext} from "../../contexts/socket";
import { useNavigate } from "react-router-dom"

export const Login = () => {
    const [username, setUsername] = useState("anonymous")
    const navigate = useNavigate()
    const socket = useContext(SocketContext)

    const handleSubmitLogin = () => {
        if (username.length > 0) {
            navigate("/app", {state: { username: username, isConnected: true }})
            socket.emit("user_connection", username)
        }
    }
    return (
        <div>
            <form>
                <div>
                    <span>Username</span>
                    <input type="text" onChange={e => setUsername(e.target.value)}/>
                </div>
                <button type="submit" onClick={handleSubmitLogin}>Access</button>
            </form>
        </div>
    )
}
