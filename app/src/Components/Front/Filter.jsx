import { useContext, useState } from 'react';
import FrontContext from './FrontContext';

function Filter() {
  const { setFilter, service } = useContext(FrontContext);
  const [serv, setServ] = useState(0);

  const filtering = (e) => {
    setServ(e.target.value);
    setFilter(Number(e.target.value));
  };

  return (
    <>
      <select
        className='sorting'
        value={serv}
        onChange={filtering}
        style={{ maxWidth: '200px' }}
      >
        <option value='0'>Filter by Service</option>
        {service &&
          service.map((col) => (
            <option key={col.id} value={col.id}>
              {col.title}
            </option>
          ))}
      </select>
    </>
  );
}

export default Filter;
