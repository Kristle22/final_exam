import { useContext, useState } from 'react';
import BackContext from '../BackContext';

function Create() {
  const { setCreateService } = useContext(BackContext);

  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');

  const handleCreate = () => {
    const data = { title, city };
    setCreateService(data);
    setTitle('');
    setCity('');
  };
  return (
    <>
      <div className='form-container' style={{ marginTop: '10px' }}>
        <div className='form color'>
          <h3>Insert Service</h3>
          <form>
            <label>Title</label>
            <input
              className='color'
              type='text'
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
              placeholder='place here...'
            />
            <label>City</label>
            <input
              className='color'
              type='text'
              onChange={(e) => {
                setCity(e.target.value);
              }}
              value={city}
              placeholder='place here...'
            />
            <button type='button' className='put' onClick={handleCreate}>
              <svg className='put'>
                <use href='#Add' />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Create;
