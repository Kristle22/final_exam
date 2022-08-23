import { useContext } from "react";
import FrontContext from "../FrontContext";

function Row({ row }) {
  const { rate, setRate, setCreateRates } = useContext(FrontContext);


  const rateNow = (e) => {
    setRate(e.target.value);
    setCreateRates({ rate: Number(e.target.value), id: row.id })
  }

  return (
    < div className="flex book">
      <div className='flex-col book frame'>
        <img
          className='pad'
          src={row.photo}
          alt='master'
        />
        <div className='rateIt center'>
          <label htmlFor={row.id} style={{}}>
            <svg><use href='#like' /></svg></label>
          <input Style={{ position: 'absolute', left: '200px', zIndex: '-999', width: '10px' }}
            id={row.id}
            type="radio"
            name={row.id}
            value={row.id}
            onChange={rateNow} />
          <p className='heading'>Ivertino({row.rating})</p>
        </div>
        <h2>{row.name}</h2>
        <h3>{row.surname}</h3>
        <u>{row.position}</u>
        <p>{row.autoservice}</p>
        <i>{row.city}</i>
        <div className="flex-row short">
        </div>
      </div>
      <div className="flex">
      </div>
    </div>
  );
}

export default Row;
