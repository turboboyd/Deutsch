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
    const possibleAnswers = randomItem.Objekt.split(' / ');
    if (possibleAnswers.includes(userAnswer.trim())) {
      setResult('Rechts!');
    } else {
      setResult('Falsch. Richtige Antworten: ' + randomItem.Objekt);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    checkAnswer(inputValue);
    setSubmitted(true);
  };

  return (
    <div>
      <form className={css.form} onSubmit={handleSubmit}>
        {randomItem && (
          <>
            <h1>{randomItem.Frage}</h1>
            <p>{randomItem.Wohin}</p>
          </>
        )}
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <button type="submit">Senden</button>
        {submitted && (
          <p
            className={
              result.startsWith('Rechts!') ? css.correct : css.incorrect
            }
          >
            {result}
          </p>
        )}
        <button type="button" onClick={chooseRandomItem}>
          Weiter
        </button>
      </form>
    </div>
  );
};

export default WohinWoherWo;
