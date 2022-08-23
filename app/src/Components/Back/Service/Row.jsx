import { useContext } from 'react';
import BackContext from '../BackContext';

function Row({ row }) {

  const { setDeleteService } = useContext(BackContext);

  const handleDelete = () => {
    setDeleteService(row);
  };
  console.log(row);
  return (
    <>
      <div className='flex-row'>
        <p
          className='heading-sm'
        >
          {row.title} <i>({row.city})</i>
        </p>
        {row.id === row.ser_id ? (
          ''
        ) : (
          <button type='button' className='dlt' onClick={handleDelete}>
            <svg>
              <use href='#Delete' />
            </svg>
          </button>
        )}
      </div>
    </>
  );
}

export default Row;
