import React from 'react';
import Action from './Action';

export default function TransactionControl({
  transactions,
  onDelete,
  onPersist,
}) {
  const tableTransactions = [];
  let currentDay = transactions[0].day;
  let currentType = transactions[0].type;
  let currentTransactions = [];
  let id = 1;

  transactions.forEach((transaction) => {
    if (transaction.day !== currentDay) {
      tableTransactions.push({
        id: id++,
        day: currentDay,
        type: currentType,
        transactions: currentTransactions,
      });

      currentDay = transaction.day;
      currentTransactions = [];
    }

    if (transaction.type !== currentType) {
      currentType = transaction.type;
    }

    currentTransactions.push(transaction);
  });

  //Após o loop para adicionar o último elemento
  tableTransactions.push({
    id: id++,
    day: currentDay,
    type: currentType,
    transactions: currentTransactions,
  });

  const handleActionClick = (id, type, entityTransaction) => {
    if (type === 'delete') {
      onDelete(id);
    } else {
      onPersist(entityTransaction);
    }
  };

  //Recebe da props chamada no APP.js "transactions={allTransactions}"  onDelete, onPersist
  return (
    <div className="container">
      {tableTransactions.map(({ id, transactions }) => {
        const finalTransactionReceita = transactions.reduce((acc, curr) => {
          return acc + (curr.type === '+' ? curr.value : 0);
        }, 0);

        const finalTransactionDespesa = transactions.reduce((acc, curr) => {
          return acc + (curr.type === '-' ? curr.value : 0);
        }, 0);

        return (
          <div style={styles.divTable} key={id}>
            <table className="striped" key={id} style={styles.table}>
              <thead>
                <tr>
                  <th style={{ width: '5%' }}>Dia</th>
                  <th style={{ width: '10%' }}>Categoria / Descrição</th>
                  <th style={{ width: '5%' }}>Valor</th>
                  <th style={{ width: '1%' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => {
                  const {
                    _id,
                    description,
                    value,
                    category,
                    day,
                    type,
                  } = transaction;

                  const transactionStyle =
                    type === '+' ? styles.receita : styles.despesa;
                  return (
                    <tr key={_id} style={transactionStyle}>
                      <td
                        style={{
                          width: '5%',
                          fontWeight: 'bold',
                          fontFamily: 'monospace',
                        }}
                      >
                        {day.toString().padStart(2, '0')}
                      </td>
                      <td
                        style={{
                          width: '5%',
                        }}
                      >
                        <div>
                          <p>
                            <span style={{ fontWeight: 'bold' }}>
                              {category}
                            </span>
                          </p>
                          {description}
                        </div>
                      </td>
                      <td
                        style={{
                          textAlign: 'right',
                          width: '5%',
                          fontFamily: 'monospace',
                        }}
                      >
                        {value.toLocaleString('pt-br', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </td>
                      <td>
                        <div>
                          <Action
                            onActionClick={handleActionClick}
                            id={_id}
                            type="edit"
                            entityTransaction={transaction}
                          />
                          <Action
                            onActionClick={handleActionClick}
                            id={_id}
                            type="delete"
                            entityTransaction={null}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td style={{ textAlign: 'right' }}>
                    <strong>Total Despesas:</strong>{' '}
                    {finalTransactionDespesa.toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <strong>Total Receita</strong>{' '}
                    {finalTransactionReceita.toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <strong>Saldo</strong>{' '}
                    {(
                      finalTransactionReceita - finalTransactionDespesa
                    ).toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </td>
                  <td>&nbsp;</td>
                </tr>
              </tfoot>
            </table>
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  receita: {
    backgroundColor: '#26a69a',
    padding: '10px',
  },

  despesa: {
    backgroundColor: 'chocolate',
    padding: '10px',
  },

  table: {
    margin: '10px',
    padding: '10px',
    borderCollapse: 'separate',
    borderSpacing: '0cm 1em',
  },

  divTable: {
    width: '100%',
    height: '50%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
};
