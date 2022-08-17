import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  //const [rates, setRates] = React.useState({});
  const ratesRef = React.useRef({});

  const [fromCurrency, setFromCurrency] = React.useState('RUB');
  const [toCurrency, setToCurrency] = React.useState('USD');
  const [fromPrice, setFromPrice] = React.useState(0);
  const [toPrice, setToPrice] = React.useState(1);

  React.useEffect(() => {
    fetch('https://cdn.cur.su/api/latest.json')
      .then((res) => res.json())
      .then((json) => {
        //setRates(json.rates);
        ratesRef.current = json.rates;
        onChangeToPrice(1);
      })
      .catch((err) => {
        console.warn(err);
        alert('Не удалось получить информацию');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeFromPrice = (value) => {
    const price = value / ratesRef.current[fromCurrency];
    const result = price * ratesRef.current[toCurrency];
    setToPrice(Number(result.toFixed(3)));
    setFromPrice(value);
  };

  const onChangeToPrice = (value) => {
    const result = (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;
    setFromPrice(Number(result.toFixed(3)));
    setToPrice(value);
  };

  React.useEffect(() => {
    onChangeFromPrice(fromPrice);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromCurrency]);

  React.useEffect(() => {
    onChangeToPrice(toPrice);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toCurrency]);

  return (
    <div className="App">
      <Block
        value={ fromPrice }
        currency={ fromCurrency }
        onChangeCurrency={ setFromCurrency }
        onChangeValue={ onChangeFromPrice }
      />
      <Block
        value={ toPrice }
        currency={ toCurrency }
        onChangeCurrency={ setToCurrency }
        onChangeValue={ onChangeToPrice }
      />
    </div>
  );
}

export default App;
