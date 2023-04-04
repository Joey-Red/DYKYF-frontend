import React, { useEffect, useState } from "react";

function DisplayQAList(props) {
  const { QAArray, isHost } = props;
  const [questionArray, setQuestionArray] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  useState(() => {
    const newQuestionArray = QAArray.playerAnswersArray.map(
      ({ username, answers }) => {
        const { questionOne, questionTwo, questionThree } = answers;
        return {
          username,
          questions: [
            {
              question: questionOne.question,
              answerA: questionOne.a,
              answerB: questionOne.b,
              answerC: questionOne.c,
              correctAnswer: answers.answerOne,
            },
            {
              question: questionTwo.question,
              answerA: questionTwo.a,
              answerB: questionTwo.b,
              answerC: questionTwo.c,
              correctAnswer: answers.answerTwo,
            },
            {
              question: questionThree.question,
              answerA: questionThree.a,
              answerB: questionThree.b,
              answerC: questionThree.c,
              correctAnswer: answers.answerThree,
            },
          ],
        };
      }
    );
    setQuestionArray(newQuestionArray);
    setLoading(false);
  }, []);

  const handleNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex >= questionArray.length) {
      setGameOver(true);
    } else {
      setCurrentQuestionIndex(nextIndex % questionArray.length);
    }
  };

  return (
    <div>
      {!loading && !gameOver && (
        <div className="flex flex-col gap-2 text-center">
          <h3>
            {questionArray[Math.floor(currentQuestionIndex / 3)].username}
          </h3>
          <h3>
            {
              questionArray[Math.floor(currentQuestionIndex / 3)].questions[
                currentQuestionIndex % 3
              ].question
            }
          </h3>
          <p className="bg-[red] border-4 border-black rounded">
            {
              questionArray[Math.floor(currentQuestionIndex / 3)].questions[
                currentQuestionIndex % 3
              ].answerA
            }
          </p>
          <p className="bg-[blue] border-4 border-black rounded">
            {
              questionArray[Math.floor(currentQuestionIndex / 3)].questions[
                currentQuestionIndex % 3
              ].answerB
            }
          </p>
          <p className="bg-[green] border-4 border-black rounded">
            {
              questionArray[Math.floor(currentQuestionIndex / 3)].questions[
                currentQuestionIndex % 3
              ].answerC
            }
          </p>
          {isHost && (
            <>
              <button onClick={handleNextQuestion}>Next Question</button>
            </>
          )}
          {!isHost && <div className="h-1"></div>}
        </div>
      )}
      {gameOver && <>Game Over!</>}
    </div>
  );
}

export default DisplayQAList;
