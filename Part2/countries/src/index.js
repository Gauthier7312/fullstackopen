import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import App from './App';

axios
  .get('https://restcountries.eu/rest/v2/all')
  .then((response) => {
    ReactDOM.render(<App count={response.data} />, document.getElementById('root'));
  });