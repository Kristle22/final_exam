import { useContext, useState } from 'react';
import BackContext from '../BackContext';
import Photo from './Photo';


function Create() {
  const { fileInput, image, setImage, setCreateData, service } = useContext(BackContext);

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [position, setPosition] = useState
    ('');
  const [serv, setServ] = useState(0);
  console.log(serv);
  const handleCreate = () => {
    const data = {
      name,
      surname,
      position,
      serv: Number(serv),
      photo: image,
    };
    setCreateData(data);
    setName('');
    setSurname('');
    setPosition('');
    setServ(0);
    setImage(null);
    fileInput.current.value = null;
  };

  return (
    <>
      <div
        className='form-container'
        style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}
      >
        <div className='form create'>
          <h3>Create Master</h3>
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
            <Photo />
            <div className='btns add'>
              <button type='button' className='put' onClick={handleCreate}>
                <svg>
                  <use href='#Add' />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Create;
