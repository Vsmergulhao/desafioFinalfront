import React from 'react';
import SelectPeriod from './SelectPeriod';

export default function Period({ periods, selectedPeriod }) {
  const [index, setIndex] = React.useState(0);
  const actionBackPeriod = () => {
    setIndex(index > 0 ? index - 1 : 0);
  };

  const actionGoPeriod = () => {
    let addItem = index < periods.length ? index + 1 : index;
    setIndex(addItem);
  };

  const handleSelectPeriod = (period) => {
    selectedPeriod(period);
  };

  const buttonBack = '<';
  const buttonGo = '>';
  return (
    <div style={style.periods}>
      <button
        className="btn green"
        style={style.btn}
        onClick={actionBackPeriod}
      >
        {buttonBack}
      </button>
      <SelectPeriod
        allPeriods={periods}
        item={index}
        selectPeriod={handleSelectPeriod}
      />
      <button className="btn green" style={style.btn} onClick={actionGoPeriod}>
        {buttonGo}
      </button>
    </div>
  );
}

const style = {
  btn: {
    marginLeft: '10px',
    marginRight: '10px',
    height: 'auto',
  },
  periods: {
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
};
