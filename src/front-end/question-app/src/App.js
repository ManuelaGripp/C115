import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetchQuestions();
  }, []);

  async function fetchQuestions() {
    try {
      const response = await fetch('http://localhost:5001/question');
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleCheckboxChange(event, questionId) {
    const value = event.target.value;
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: prevAnswers[questionId]
        ? [...prevAnswers[questionId], value]
        : [value],
    }));
  }

  async function handleSubmit() {
    try {
      const response = await fetch('http://localhost:5001/question/answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(answers),
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="App">
      <h1>Questionário</h1>
      {questions.map(question => (
        <div key={question._id} className="question">
          <h3>{question.title}</h3>
          {question.alternatives.map((alternative, index) => (
            <label key={index}>
              <input
                type="checkbox"
                value={index}
                onChange={e => handleCheckboxChange(e, question._id)}
              />
              {alternative}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Enviar</button>
    </div>
  );
}

export default App;