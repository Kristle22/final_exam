import { useContext } from 'react';
import Row from './Row';
import FrontContext from '../FrontContext';
// import SortBtns from '../SortBtns';
import Filter from '../Filter';
import Search from '../Search';

function List() {
  const { masters } = useContext(FrontContext);

  return (
    <>
      <div className='front-logo'></div>
      <div className='flex-card front'>
        <div style={{ display: 'flex' }}>
          <Filter />
          {/* <SortBtns /> */}
          <Search />
        </div>
        <div className='flex-row order-7'>
          {/* <h4>Photo</h4>
          <h4>Name</h4>
          <h4>Type</h4>
          <h4>Surname</h4>
          <h4>Position</h4>
          <h4>Service</h4>
          <h4>City</h4> */}
        </div>
        {masters ? masters.map((m) => <Row key={m.id} row={m} />) : null}
      </div>
    </>
  );
}

export default List;
