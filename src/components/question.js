import { shuffleArray } from "../helper/shuffleArray";

export const Question = ({
    id,
    children: text,
    answer,
    onAnswered,
    choices
}) => {
    return <>
        <p>{text}</p>
        {choices.map(choice => (
            <button onClick={() => onAnswered(id, choice === answer)}>
                {choice}
            </button>
        ))}
    </>

}