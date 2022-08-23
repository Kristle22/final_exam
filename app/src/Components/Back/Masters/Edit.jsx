import { useState, useEffect, useContext } from 'react';
import BackContext from '../BackContext';
import { useRef } from 'react';
import Photo from './Photo';

function Edit() {
  const {
    image,
    setImage,
    modalData,
    setModalData,
    setEditData,
    service,
  } = useContext(BackContext);

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [position, setPosition] = useState
    ('');
  const [serv, setServ] = useState(0);

  // console.log(modalData);

  const handleDeletePhoto = () => {
    setModalData((p) => ({ ...p, photo: null }));
  };

  useEffect(() => {
    if (null === modalData) {
      return;
    }
    setServ(
      service.filter((s) => modalData.autoservice === s.title)[0]?.id ?? null
    );
    setName(modalData.name);
    setSurname(modalData.surname);
    setPosition(modalData.position);
    setImage(modalData.photo);
  }, [modalData, service, setImage]);

  const handleEdit = () => {
    const data = {
      id: modalData.id,
      name,
      surname,
      position,
      serv: Number(serv),
      photo: image,
    };
    setEditData(data);
    console.log(data);
    setModalData(null);
  };
  if (null === modalData) {
    return null;
  }

  return (
    <>
      <div className='modal-layer'>
        <div className='modal-cont'>
          <div className='modal'>
            <div className='left-side'>
              <button
                type='button'
                className='close-x'
                onClick={() => setModalData(null)}
              >
                &times;
              </button>
              <button className='remove'
                type='button'
                onClick={handleDeletePhoto}>
                Remove Photo
              </button>
              <Photo />
            </div>
            <div className='right-side form'>
              <form>
                <label>Name:</label>
                <input
                  className='create'
                  type='text'
                  onChange={(e) =>
                    setName(e.target.value)}
                  value={name}
                  placeholder='Enter master name'
                />
                <label>Surname:</label>
                <input
                  className='create'
                  type='text'
                  onChange={(e) =>
                    setSurname(e.target.value)}
                  value={surname}
                  placeholder='Enter master surname'
                />
                <label>Position:</label>
                <input
                  className='create'
                  type='text'
                  onChange={(e) =>
                    setPosition(e.target.value)}
                  value={position}
                  placeholder='Enter master position'
                />
                <select value={serv} onChange={e => setServ(e.target.value)}>
                  <option defaultValue='0'>Choose service</option>
                  {service
                    ? service.map((s) => (
                      <option
                        key={s.id}
                        value={s.id}>
                        {s.title}
                      </option>
                    ))
                    : null}
                </select>
                <div className='btns-modal'>
                  <button
                    type='button'
                    className='close'
                    onClick={() => setModalData(null)}
                  >
                    <svg>
                      <use href='#Exit' />
                    </svg>
                  </button>
                  <button type='button' className='put' onClick={handleEdit}>
                    <svg className='put'>
                      <use href='#Save' />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div >
    </>
  );
}

export default Edit;
