import { QUESTION_INFO, INCORRECT_TITLES } from './util/questions';
import { useQuiz } from './hooks/quiz';

import { Question } from './components/question';
import { shuffleArray } from './helper/shuffleArray';

const generateChoices = (correctTitle) => {
    let incorrectTitles = [...INCORRECT_TITLES];

    QUESTION_INFO.forEach(question => {
        if (correctTitle !== question.title) {
            incorrectTitles.push(question.title);
        }
    })

    let arr = shuffleArray(incorrectTitles).slice(0, 3);
    arr.push(correctTitle);
    return shuffleArray(arr)
}

QUESTION_INFO.forEach(question => {
    question["choices"] = generateChoices(question.title);
})

function App() {
    const [quizState, handleAnswer, resetGame] = useQuiz(QUESTION_INFO);

    return (
        <>
            <p>Hello!</p>
            {JSON.stringify(quizState)}
            <hr />
            {!quizState.gameOver && QUESTION_INFO.map((question, i) => (

                <div key={i}>
                    <Question
                        id={question.id}
                        onAnswered={(id, value) => handleAnswer(id, value)}
                        answer={question.title}
                        choices={QUESTION_INFO[i].choices}>
                        What is {question.name}'s ANDi title?
                    </Question>

                    {question.isCorrect && <b>Correct!</b>}
                </div>
            ))}

            {quizState.gameOver && <button onClick={() => resetGame(QUESTION_INFO)}>YOU LOST! Click to reset</button>}

            {quizState.victory && <p>Nice one</p>}
        </>
    )

}

export default App;
