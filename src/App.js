import React from 'react';
import QuoteCard from './components/QuoteCards';
import axios from 'axios';

function App() {
  const [showSimpson, setShowSimpson] = React.useState(false);
  function handleShowSimpsonClick() {
    setShowSimpson(!showSimpson);
  }

  const [quoteList, setQuoteList] = React.useState([
    {
      quote:
        "These are my only friends...grown-up nerds like Gore Vidal. And even he's kissed more boys than I ever will.",
      character: 'Lisa Simpson',
      image:
        'https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FLisaSimpson.png?1497567512083',
      characterDirection: 'Right'
    },
  ]);

  const getSimpsons = () => {
    axios
      .get('https://simpsons-quotes-api.herokuapp.com/quotes?count=5')
      .then((response) => response.data)
      .then((data) => {
        setQuoteList(data);
      });
  };

  return (
    <div>
      <button onClick={handleShowSimpsonClick}>
        Simpsons family only : {showSimpson ? 'ON' : 'OFF'}
      </button>
      <button type="button" onClick={getSimpsons}>Get Simpsons</button>
      <h2>Simpsons' Characters</h2>
      <div>
        {quoteList
          .filter(
            (quote) => !showSimpson || quote.character.includes('Simpson')
          )
          .map((quote, index) => (
            <QuoteCard key={index} {...quote} />
          ))}
      </div>
    </div>
  );
}

export default App;
