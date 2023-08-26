import React, { useState, useEffect } from 'react';

function App() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [correct, setCorrect] = useState([]);

  const translateOptions = (index) => {
    switch (index) {
      case 0:
        return 'a';
      case 1:
        return 'b';
      case 2:
        return 'c';
      case 3:
        return 'd';
    }
  }

  useEffect(() => {
    fetchQuestions();
  }, []);
  useEffect(() => {
    console.log(correct)
  }, [correct]);
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

  const handleAnswerChange = (questionId, selectedAnswer, index) => {

    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: index,
    }));
  };

  const handleSubmitAnswers = async () => {
    try {
      for (const question of questions) {
        const selectedAnswer = answers[question._id] ?? '';
        console.log(translateOptions(selectedAnswer));
        const response = await fetch(`http://localhost:5001/question?id=${question._id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ answer: translateOptions(selectedAnswer) }),
        });
        const result = await response.text();
        setCorrect((prev) => ({
          ...prev,
          [question._id]: result === 'A resposta está exata',
        }))
      }
    } catch (error) {
      console.error('Error submitting answers:', error);
    }
  };

  const definingColor = (question, index) => {



    if(answers[question._id] === index && correct[question._id] !== undefined){
      return correct[question._id] === true ? 'green' : 'red'
    }

    if(question.answer === translateOptions(index) && correct[question._id] !== undefined ){
        return 'green'
    }

  }

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
                  <label style={{ color: `${definingColor(question, index)}` }} >
                    <input
                      type="radio"
                      name={`question_${question._id}`}
                      value={alternative}
                      checked={answers[question._id] === index}
                      onChange={() => handleAnswerChange(question._id, alternative, index)}

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
    </div >
  );
}

export default App;
