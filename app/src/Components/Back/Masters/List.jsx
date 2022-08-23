import { useContext } from 'react';
import Row from './Row';
import BackContext from '../BackContext';
// import Search from '../Search';
// import Filter from '../Filter';
// import SortBtns from '../SortBtns';

function List() {
  const { masters } = useContext(BackContext);

  return (
    <>
      <div className='heading'>
        <h2>List of Masters</h2>
      </div>
      <div className='flex-card'>
        <div className="flex-nw sb">
          {/* <Search /> */}
          {/* <Filter /> */}
          {/* <SortBtns /> */}
        </div>
        <div style={{ width: '80%' }} className='order-7'>
          <h4>Photo</h4>
          <h4>Name</h4>
          <h4>Surname</h4>
          <h4>Position</h4>
          <h4>Service</h4>
          <h4>City</h4>
          <h4>Rating</h4>
        </div>
        {masters ? masters.map((m) => <Row key={m.id} row={m} />) : null}
      </div>
    </>
  );
}

export default List;
