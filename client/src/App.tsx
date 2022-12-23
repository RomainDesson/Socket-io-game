import './App.css'
import {socket, SocketContext} from "./contexts/socket";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import {Counter} from "./components/Counter/Counter";
import {Login} from "./components/Login/Login";

function App() {
    return (
        <SocketContext.Provider value={socket}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/app" element={<Counter />} />
                </Routes>
            </BrowserRouter>
        </SocketContext.Provider>
    )
}

export default App
