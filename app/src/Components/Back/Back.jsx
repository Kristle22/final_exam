import { useEffect, useState, useRef, useReducer } from 'react';
import Reducer from './Reducer';
import BackContext from './BackContext';
import Nav from './Nav';
import MastersCrud from './Masters/Crud'
import ServiceCrud from './Service/Crud';
import axios from 'axios';
import { authConfig } from '../../Functions/auth';

function Back({ show }) {
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [message, setMessage] = useState(null);

  const [createData, setCreateData] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);

  const [masters, dispachMasters] = useReducer(Reducer, []);

  const fileInput = useRef();
  const [image, setImage] = useState(null);

  const [service, setService] = useState(null);
  const [createService, setCreateService] = useState(null);
  const [deleteService, setDeleteService] = useState(null);

  const [filter, setFilter] = useState(0);
  const [search, setSearch] = useState('');

  const showMessage = (mes) => {
    setMessage(mes);
    setTimeout(() => setMessage(null), 5000);
  };
  // ///////////AXIOS GET/CREATE/DELETE/UPDATE DATA///////////
  // Read
  useEffect(() => {
    let query;
    if (filter === 0 && !search) {
      query = '';
    } else if (filter) {
      query = 'ser-id=' + filter;
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

  // Create
  useEffect(() => {
    if (null === createData) return;
    axios
      .post('http://localhost:3003/meistrai', createData, authConfig())
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [createData]);

  // Delete
  useEffect(() => {
    if (null === deleteData) return;
    axios
      .delete('http://localhost:3003/meistrai/' + deleteData.id, authConfig())
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [deleteData]);

  // Edit
  useEffect(() => {
    if (null === editData) return;
    axios
      .put('http://localhost:3003/meistrai/' + editData.id, editData, authConfig())
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [editData]);

  // /////////////AXIOS services////////////////
  // READ 
  useEffect(() => {
    axios.get('http://localhost:3003/servisai', authConfig()).then((res) => {
      setService(res.data);
    });
  }, [lastUpdate]);

  // Create
  useEffect(() => {
    if (null === createService) return;
    axios
      .post('http://localhost:3003/servisai', createService, authConfig())
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [createService]);

  // Delete
  useEffect(() => {
    if (null === deleteService) return;
    axios
      .delete('http://localhost:3003/servisai/' + deleteService.id, authConfig())
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [deleteService]);

  return (
    <BackContext.Provider
      value={{
        masters,
        service,
        fileInput,
        image,
        setImage,
        setCreateData,
        setDeleteData,
        modalData,
        setModalData,
        setEditData,
        setCreateService,
        setDeleteService,
        filter,
        setFilter,
        setSearch,
        message,
      }}
    >
      {show === 'admin' ? (
        <>
          <Nav />
          <div className='admin'>
            <div className='center'>
              <img
                src={require('../../img/admin-1.png')}
                alt='admin panel'
                style={{
                  maxWidth: '350px',
                  opacity: '0.5'
                }}
              />
            </div>
          </div>
        </>
      ) : show === 'masters' ? (
        <MastersCrud />
      ) : show === 'services' ? (
        <ServiceCrud />
      ) : null}
    </BackContext.Provider>
  );
}

export default Back;
