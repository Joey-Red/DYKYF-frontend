import React, { useEffect } from "react";

function DisplayQAList(props) {
  const { QAArray } = props;
  return (
    <div>
      {QAArray.playerAnswersArray.map((item) => (
        <div key={item.username}>
          <h2>{item.username}</h2>
          <ul>
            <div className="flex flex-col">
              <strong>{item.answers.questionOne.question}:</strong>{" "}
              <li>CORRECT: {item.answers.answerOne}</li>
              <li>a) {item.answers.questionOne.a}</li>
              <li>b) {item.answers.questionOne.b}</li>
              <li>c) {item.answers.questionOne.c}</li>
            </div>
            <div className="flex flex-col">
              <strong>{item.answers.questionTwo.question}:</strong>{" "}
              <li>CORRECT: {item.answers.answerTwo}</li>
              <li>a) {item.answers.questionTwo.a}</li>
              <li>b) {item.answers.questionTwo.b}</li>
              <li>c) {item.answers.questionTwo.c}</li>
            </div>
            <div className="flex flex-col">
              <strong>{item.answers.questionThree.question}:</strong>{" "}
              <li>CORRECT: {item.answers.answerThree}</li>
              <li>a) {item.answers.questionThree.a}</li>
              <li>b) {item.answers.questionThree.b}</li>
              <li>c) {item.answers.questionThree.c}</li>
            </div>
          </ul>
        </div>
      ))}
    </div>
  );
}

export default DisplayQAList;
