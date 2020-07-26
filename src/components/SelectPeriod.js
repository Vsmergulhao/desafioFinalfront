import React from 'react';
import M from 'materialize-css';

export default function SelectPeriod({ allPeriods, item, selectPeriod }) {
  React.useEffect(() => {
    M.AutoInit();
  }, []);

  const [currentPeriod, setCurrentPeriod] = React.useState(allPeriods[item]);

  const handlePeriodChange = (event) => {
    //console.log('select', event.target.value);
    setCurrentPeriod(event.target.value);
    selectPeriod(event.target.value);
    console.log(currentPeriod);
  };

  return (
    <div>
      <select
        className="browser-default"
        style={style.btn}
        value={currentPeriod}
        onChange={handlePeriodChange}
      >
        {allPeriods.map(({ id, period }) => {
          return (
            <option key={id} value={period}>
              {period}
            </option>
          );
        })}
      </select>
    </div>
  );
}

const style = {
  btn: {    
    width: '200px'
  },
};
