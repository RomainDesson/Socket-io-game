import logo from "../../logo.svg";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../contexts/socket";
import { useConnectionAlert } from "../../utils/ConnectionAlert/useConnectionAlert";
import {ConnectedUsers} from "../ConnectedUsers/ConnectedUsers";
import {ButtonContainer, HeaderContainer, MainContainer} from "./style";
import {TargetScore} from "../TargetScore/TargetScore";
import {User} from "../../types/User";
import {useNavigate} from "react-router-dom";

export const Counter = () => {
    const socket = useContext(SocketContext)
    const navigate = useNavigate()
    const [isConnected, setIsConnected] = useState(false)
    const [user, setUser] = useState<User>({username: "anonymous", score: 0})
    const [usersList, setUsersList] = useState<User[]>([])
    const [randomNumber, setRandomNumber] = useState<number>(0)
    const { showUserConnectionAlert, showUserLogoutAlert, showAlert, AlertBanner } = useConnectionAlert()

    useEffect(() => {
        socket.on('disconnect', () => {
            console.log('oui')
            navigate('/')
        });
        socket.on("user_connection", (user) => {
            setUser(user)
            setIsConnected(true)
        })
        socket.on("generate_random_number", (randomNumber) => setRandomNumber(randomNumber))
        socket.on("other_user_connected", (user) => showUserConnectionAlert(user.username))
        socket.on("users_list", (users) => setUsersList(users))
        socket.on("user_disconnect", (user) => showUserLogoutAlert(user.username))
        socket.on("add_score", (usersList) => setUsersList(usersList))

        return () => {
            socket.emit("user_disconnect", user.username)
        }

    }, [socket])

    const onClickPlus = (addScore: number) => {
        socket.emit("add_score", addScore)
        console.log(usersList)
        if (user.score >= randomNumber) {
            console.log("gg", user.username)
        }
    }

    return (
        <MainContainer>
            <HeaderContainer>
                {showAlert && <AlertBanner /> }
                <span>{isConnected && `You are connected ${user.username} !`}</span>
            </HeaderContainer>
            <ConnectedUsers users={usersList} />
            <TargetScore randomNumber={randomNumber}/>
            <ButtonContainer>
                <button type="button" onClick={() => onClickPlus(1)}>
                    + 1
                </button>
                <button type="button" onClick={() => onClickPlus(3)}>
                   + 3
                </button>
                <button type="button" onClick={() => onClickPlus(5)}>
                    + 5
                </button>
            </ButtonContainer>
        </MainContainer>
    )
}
