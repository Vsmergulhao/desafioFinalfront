import React, { useEffect, useState } from 'react';
import * as api from './api/apiServices.js';
import ModalTransaction from './components/ModalTransaction.js';
import Period from './components/Period.js';
import Resumcalc from './components/Resumcalc.js';
import Spinner from './components/Spinner.js';
import TransactionControl from './components/TransactionControl.js';

export default function App() {
  //Inicializa as variáveis
  const [allTransactions, setAllTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState({});
  const [allPeriod, setAllPeriod] = useState([]);
  const [currentPeriod, setCurrentPeriod] = useState(allPeriod[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [finalLancamento, setfinalLancamento] = useState(0);
  const [finalTransactionReceita, setFinalTransactionReceita] = useState(0);
  const [finalTransactionDespesa, setFinalTransactionDespesa] = useState(0);
  const [finalSaldo, setFinalSaldo] = useState(0);

  useEffect(() => {
    let idPeriod = 0;
    let listPeriod = [];
    api.getlistPeriod().then((periods) => {
      periods.forEach((period) => {
        idPeriod++;
        listPeriod.push({ id: idPeriod, period: period });
      });
      setAllPeriod(listPeriod);
      setCurrentPeriod(listPeriod[0].period);
    });
  }, []);
  //Se o useEffet for executado apenas uma vez os [] devem ser vazios
  useEffect(() => {
    const getTransactions = async () => {
      api.getAllTrasanctioPeriod(currentPeriod).then((transactions) => {
        setTimeout(() => {
          setAllTransactions(transactions);
        }, 2000);
      });
    };

    getTransactions();
  }, [currentPeriod]);

  useEffect(() => {
    setfinalLancamento(allTransactions.length);

    setFinalTransactionReceita(
      allTransactions.reduce((acc, curr) => {
        return acc + (curr.type === '+' ? curr.value : 0);
      }, 0)
    );

    setFinalTransactionDespesa(
      allTransactions.reduce((acc, curr) => {
        return acc + (curr.type === '-' ? curr.value : 0);
      }, 0)
    );
  }, [allTransactions]);

  useEffect(() => {
    setFinalSaldo(finalTransactionReceita - finalTransactionDespesa);
  }, [finalTransactionReceita, finalTransactionDespesa]);

  const handleSelectPeriod = (period) => {
    setCurrentPeriod(period);
  };

  const handleDelete = async (id) => {
    const data = 'aaa'; //await api.deleteTransaction(id);
    if (data != null) {
      const deleteTransactionIndex = allTransactions.findIndex(
        (transaction) => transaction._id === id
      );

      const newTransactions = Object.assign([], allTransactions);
      newTransactions.splice(deleteTransactionIndex, deleteTransactionIndex);
      setAllTransactions(newTransactions);
    }
  };

  const handlePersist = (transaction) => {
    console.log(transaction);
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handlePersistData = () => {
    console.log('handlePersistData');
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const selectedTransacation = () => {
    console.log('selectedTransacation');
  };
  return (
    <div style={{ padding: '10px' }}>
      <h1 className="center">Bootcamp Full Stack - Desafio Final</h1>
      <Period periods={allPeriod} selectedPeriod={handleSelectPeriod} />
      <Resumcalc
        lacamento={finalLancamento}
        receitas={finalTransactionReceita}
        despesas={finalTransactionDespesa}
        saldo={finalSaldo}
      />
      {allTransactions.length === 0 && <Spinner />}
      {allTransactions.length > 0 && (
        <TransactionControl
          transactions={allTransactions} //Trafega as variáveis
          onDelete={handleDelete} //Executa a função handleDelete
          onPersist={handlePersist} //Executa a função handlePersist
        />
      )}
      {/*Realiza o conrtrole de apresentação do modal*/}
      {isModalOpen && (
        <ModalTransaction
          onSave={handlePersistData}
          onClose={handleClose}
          selectedTransacation={selectedTransaction}
        />
      )}
    </div>
  );
}
