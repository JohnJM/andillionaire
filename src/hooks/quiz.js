import { useCallback, useReducer } from 'react';

const checkVictory = (quizState) => {
    let correct = [];
    quizState.questions.forEach(question => {
        return question.isCorrect ? correct.push(true) : null
    })

    return correct.length === quizState.questions.length
}

const quizReducer = (state, action) => {
    switch (action.type) {
        case "SELECTED_ANSWER":
            console.log(action.isCorrect, action.id);
            let newState = state;

            if (!action.isCorrect) {
                newState.gameOver = true;
            }

            newState.questions[action.id].isCorrect = action.isCorrect;

            return {
                ...newState,
                victory: checkVictory(newState)
            }

        case "RESET_GAME": {
            let newQuestions = action.questions;
            // would be faster doing this inside the return with spread op?
            newQuestions.map(question => {
                question["isCorrect"] = false;
                return question
            })

            return {
                questions: newQuestions,
                gameOver: false
            }
        }
        default:
            return state;
    }
}

export const useQuiz = (questions) => {
    questions.map(question => {
        if (!question.hasOwnProperty('isCorrect')) {
            question['isCorrect'] = false;
        }

        return question;
    })

    const [quizState,
        dispatch] = useReducer(quizReducer,
            { questions }
        );

    const selectionHandler = useCallback((id, isCorrect) => {
        dispatch({ type: 'SELECTED_ANSWER', id, isCorrect })
    }, [])

    const resetGame = (questions) => {
        dispatch({ type: 'RESET_GAME', questions })
    }

    return [quizState, selectionHandler, resetGame]
}