import {useState} from "react";
import {Alert, AlertColor} from "@mui/material";
import {AlertContainer} from "./style";

export const useConnectionAlert = () => {
    const [showAlert, setShowAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    const [severity, setSeverity] = useState<AlertColor>()

    const showUserConnectionAlert = (username: string) => {
        setShowAlert(true)
        setAlertMessage(`${username} joined the room`)
        setSeverity("success")
        setTimeout(() => {
            setShowAlert(false)
        }, 5000)
    }

    const showUserLogoutAlert = (username: string) => {
        setShowAlert(true)
        setAlertMessage(`${username} left the room`)
        setSeverity("error")
        setTimeout(() => {
            setShowAlert(false)
        }, 5000)
    }

    const AlertBanner = () => {
        return (
            <AlertContainer>
                <Alert severity={severity}>{alertMessage}</Alert>
            </AlertContainer>
        )
    }

    return { showAlert, showUserConnectionAlert, showUserLogoutAlert, AlertBanner }
}
