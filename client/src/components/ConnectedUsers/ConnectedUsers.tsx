import {ListContainer, MainContainer, ScoreContainer} from "./style";
import {User} from "../../types/User";

type ConnectedUsersType = {
    users: User[]
}

export const ConnectedUsers = ({ users }: ConnectedUsersType) => {
    return (
        <MainContainer>
            <ListContainer>
                {users.map((user) => {
                    return (
                        <ul key={user.username}>
                            <ScoreContainer>
                                <span>{user.username}</span>
                                <span>{user.score}</span>
                            </ScoreContainer>
                        </ul>
                    )
                })}
            </ListContainer>
        </MainContainer>
    )
}
