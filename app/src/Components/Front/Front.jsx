import { useEffect, useState, useReducer } from 'react';
import Reducer from './Reducer';
import FrontContext from './FrontContext';
import Crud from './Components/Crud';
import axios from 'axios';
import { authConfig } from '../../Functions/auth';

function Front({ show }) {
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [message, setMessage] = useState(null);

  const [masters, dispachMasters] = useReducer(Reducer, []);
  const [service, setService] = useState(null);

  const [filter, setFilter] = useState(0);
  const [search, setSearch] = useState('');

  const [rate, setRate] = useState(0);
  const [createRates, setCreateRates] = useState(null);

  const showMessage = (mes) => {
    setMessage(mes);
    setTimeout(() => setMessage(null), 5000);
  };

  // Read & queries FRONT
  useEffect(() => {
    let query;
    if (filter === 0 && !search) {

      query = '';
    } else if (filter) {
      query = '?ser-id=' + filter;
    } else if (search) {
      query = '?s=' + search;
    }
    axios
      .get('http://localhost:3003/meistrai' + query, authConfig())
      .then((res) => {
        const action = {
          type: 'main_list',
          payload: res.data,
        };
        dispachMasters(action);
      });
  }, [lastUpdate, filter, search]);

  // Simple Read FRONT
  useEffect(() => {
    axios.get('http://localhost:3003/servisai', authConfig()).then((res) => {
      setService(res.data);
    });
  }, [lastUpdate]);

  // CREATE RATING
  useEffect(() => {
    if (null === createRates) return;
    axios
      .put(
        'http://localhost:3003/reitingai/' + createRates.id,
        createRates,
        authConfig()
      )
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [createRates]);

  // //////////////GET USER/////////////////
  function getUser() {
    return localStorage.getItem('username');
  }

  return (
    <FrontContext.Provider
      value={{
        masters,
        service,
        message,
        showMessage,
        setFilter,
        setSearch,
        rate, setRate,
        setCreateRates,
        getUser,
      }}
    >
      {show === 'welcome' ? (
        <Crud />
      ) : null}
    </FrontContext.Provider>
  );
}

export default Front;
