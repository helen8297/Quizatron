import React, { useState, useEffect } from "react";
import "./App.css";
import CorrectResponse from "../CorrectResponse";
import IncorrectResponse from "../IncorrectResponse";

function App() {
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [revisedAnswers, setRevisedAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [userResult, setUserResult] = useState(null);
  const [nextQuestion, setNextQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [numberOfQuestions, setNumberOfQuestions] = useState(1);

  useEffect(() => {
    async function getQuestion() {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=1&difficulty=easy&type=multiple"
      );
      const jsonResponse = await response.json();
      setQuestion(jsonResponse.results[0].question);
      setCorrectAnswer(jsonResponse.results[0].correct_answer);
      setAnswers([
        jsonResponse.results[0].correct_answer,
        jsonResponse.results[0].incorrect_answers[0],
        jsonResponse.results[0].incorrect_answers[1],
        jsonResponse.results[0].incorrect_answers[2],
      ]);
    }

    getQuestion();
  }, [nextQuestion]);

  useEffect(() => {
    checkQuestion();
  }, [question, answers]);

  function checkQuestion() {
    const quotationMarks = /&quot;/g;
    const apostrophe = /&#039;/g;
    const otherWeirdThing = /&rsquo;/g;
    //need to work out how to put acute accents back onto relevant letter. Annoying
    const acute = /$[a-z]acute;/gi;

    let revisedQuestion = question
      .replace(quotationMarks, '"')
      .replace(apostrophe, "'")
      .replace(otherWeirdThing, "'");

    let revisedAnswers = answers.map((item) =>
      item
        .replace(quotationMarks, '"')
        .replace(apostrophe, "'")
        .replace(otherWeirdThing, "'")
    );
    setQuestion(revisedQuestion);
    setRevisedAnswers(revisedAnswers);
  }

  //when an answer is selected the user result state is either set to true or false
  useEffect(() => {
    if (correctAnswer && selectedAnswer) {
      if (correctAnswer === selectedAnswer) {
        setUserResult(true);
        setScore(score + 1);
        setTimeout(() => {
          renderNextQuestion();
        }, 3000);
      } else {
        setUserResult(false);
        setTimeout(() => {
          renderNextQuestion();
        }, 3000);
      }
    }
  }, [selectedAnswer]);

  function renderNextQuestion() {
    setNextQuestion(!nextQuestion);
    setUserResult(null);
    setNumberOfQuestions(numberOfQuestions + 1);
    console.log("question:", numberOfQuestions);
  }

  answers.sort();
  return (
    <div className={"maindiv"}>
      {/* <button onClick={getQuestion}>Click me</button> */}
      <h1>Quizatron</h1>

      <p className={"question"}>
        {numberOfQuestions}: {question}
      </p>

      <span className={"options"}>
        <p
          className={"option"}
          id={"a1"}
          onClick={() => setSelectedAnswer(revisedAnswers[0])}
        >
          A: {revisedAnswers[0]}
        </p>
        <p
          className={"option"}
          id={"a2"}
          onClick={() => setSelectedAnswer(revisedAnswers[1])}
        >
          B: {revisedAnswers[1]}
        </p>
        <p
          className={"option"}
          id={"a3"}
          onClick={() => setSelectedAnswer(revisedAnswers[2])}
        >
          C: {revisedAnswers[2]}
        </p>
        <p
          className={"option"}
          id={"a4"}
          onClick={() => setSelectedAnswer(revisedAnswers[3])}
        >
          D: {revisedAnswers[3]}
        </p>
      </span>

      <div className={"result"}>
        {userResult != null && userResult && (
          <CorrectResponse correctAnswer={correctAnswer} />
        )}
        {userResult != null && !userResult && (
          <IncorrectResponse correctAnswer={correctAnswer} />
        )}
      </div>
      <p id={"score"}>score:</p>
      <h1 id={"score"}>{score}</h1>
    </div>
  );
}

export default App;
