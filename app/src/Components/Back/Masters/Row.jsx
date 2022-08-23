import { useContext } from 'react';
import BackContext from '../BackContext';

function Row({ row }) {
  const { setDeleteData, setModalData } = useContext(BackContext);
  const handleDelete = () => {
    setDeleteData(row);
  };
  const handleModal = () => {
    setModalData(row);
  };
  // console.log(row);
  return (
    <>
      <div className='order-7 frame'>
        <img
          src={row.photo}
          alt='master'
        />
        <p>{row.name}</p>
        <p>{row.surname}</p>
        <p>{row.position}</p>
        <p>{row.autoservice}</p>
        <p>{row.city}</p>
        <p>{row.rating}</p>
      </div>
      <div className='btns row'>
        <button type='button' className='edt' onClick={handleModal}>
          <svg>
            <use href='#Edit' />
          </svg>
        </button>
        <button type='button' className='dlt' onClick={handleDelete}>
          <svg>
            <use href='#Delete' />
          </svg>
        </button>
      </div>
    </>
  );
}

export default Row;