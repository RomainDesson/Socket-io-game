import {TargetScoreContainer} from "./style";
import {generateRandomNumber} from "../../utils/generateRandomNumber";

type TargetScoreProps = {
    randomNumber: number
}

export const TargetScore = ({ randomNumber }: TargetScoreProps) => {

    return (
        <TargetScoreContainer>
            <span>Target: {randomNumber}</span>
        </TargetScoreContainer>
    )
}
