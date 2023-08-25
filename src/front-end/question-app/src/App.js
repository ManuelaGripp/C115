import React, { useState, useEffect } from 'react';

function App() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('http://localhost:5001/question');
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleAnswerChange = (questionId, selectedAnswer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedAnswer,
    }));
  };

  const handleSubmitAnswers = async () => {
    try {
      for (const question of questions) {
        const selectedAnswer = answers[question._id] || '';
        const response = await fetch(`http://localhost:5001/question?id=${question._id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ answer: selectedAnswer }),
        });
        const result = await response.text();
        console.log(result);
      }
    } catch (error) {
      console.error('Error submitting answers:', error);
    }
  };

  return (
    <div className="App">
      <h1>Quiz App</h1>
      <div>
        {questions.map((question) => (
          <div key={question._id}>
            <h3>{question.title}</h3>
            <ul>
              {question.alternatives.map((alternative, index) => (
                <li key={index}>
                  <label>
                    <input
                      type="radio"
                      name={`question_${question._id}`}
                      value={alternative}
                      checked={answers[question._id] === alternative}
                      onChange={() => handleAnswerChange(question._id, alternative)}
                    />
                    {alternative}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <button onClick={handleSubmitAnswers}>Submit Answers</button>
    </div>
  );
}

export default App;
