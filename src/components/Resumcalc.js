import React from 'react';

export default function Resumcalc({ lacamento, receitas, despesas, saldo }) {

  return (
    <div className="container" style={styles.divResun}>
      <div style={styles.divDetResun}>Laçamentos: {lacamento}</div>
      <div style={styles.divDetResun}>
        Receitas:{' '}
        <span style={styles.valuePos}>
          {receitas.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
          })}
        </span>
      </div>
      <div style={styles.divDetResun}>
        Despesas:{' '}
        <span style={styles.valueNeg}>
          {despesas.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
          })}
        </span>
      </div>
      <div style={styles.divDetResun}>
        Saldo:{' '}
        <span style={styles.valuePos}>
          {saldo.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
          })}
        </span>
      </div>
    </div>
  );
}

const styles = {
  divResun: {
    display: 'flex',
    width: '100%',
    border: '1px solid',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  divDetResun: {
    width: '25%',
    padding: '10px',
    fontWeight: 'bold',
  },

  valuePos: {
    color: '#26a69a',
  },

  valueNeg: {
    color: 'chocolate',
  },
};
