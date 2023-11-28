import React, { useEffect, useState } from 'react';
import data from '../../Test.json';
import css from './WohinWoherWo.module.css';

const WohinWoherWo = () => {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');
  const [randomItem, setRandomItem] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    chooseRandomItem();
  }, []);

  const chooseRandomItem = () => {
    const randomIndex = Math.floor(Math.random() * data.length);
    setRandomItem(data[randomIndex]);
    setResult('');
    setInputValue('');
    setSubmitted(false);
  };

  const checkAnswer = userAnswer => {
    const possibleAnswers = randomItem.preposition.split(' / ');
    if (possibleAnswers.includes(userAnswer.trim())) {
      setResult('Rechts! ' + randomItem.preposition);
    } else {
      setResult('Falsch. Richtige Antworten: ' + randomItem.preposition);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (inputValue.trim() === '') {
      return;
    }
    checkAnswer(inputValue.toLowerCase());
    setSubmitted(true);
  };

  return (
    <div>
      <form className={css.form} onSubmit={handleSubmit}>
        {randomItem && (
          <>
            <h1>{randomItem.question}</h1>
            <p>{randomItem.name}</p>
          </>
        )}
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <button type="submit">Senden</button>
        {submitted && (
          <>
            <p
              className={
                result.startsWith('Rechts!') ? css.correct : css.incorrect
              }
            >
              {result}
              <br />
            </p>
            {randomItem.answer && (
              <span>Richtige Antwort: {randomItem.answer}</span>
            )}
          </>
        )}
        <button type="button" onClick={chooseRandomItem}>
          Weiter
        </button>
      </form>
    </div>
  );
};

export default WohinWoherWo;
