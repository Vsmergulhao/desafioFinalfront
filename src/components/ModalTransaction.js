import Modal from 'react-modal';
import React, { useState, useEffect } from 'react';
import * as api from '../api/apiServices';
import moment from 'moment';

Modal.setAppElement('#root');

export default function ModalTransaction({
  onSave,
  onClose,
  selectedTransacation,
}) {
  const {
    _id,
    description,
    value,
    category,
    day,
    month,
    year,
    type,
  } = selectedTransacation;

  const titulo = 'Inclusão de Lançamento';
  const dNow = new Date();

  const [transactionDescription, setTransactionDescription] = useState(
    description
  );
  const dateVerify = !_id
    ? ('00' + dNow.getDate()).slice(-2) +
      '/' +
      ('00' + (dNow.getMonth() + 1)).slice(-2) +
      '/' +
      dNow.getFullYear()
    : `${year}-${month}-${day}`;

  const [transactionValue, setTransactionValue] = useState(value);
  const [transactionCategory, setTransactionCategory] = useState(category);
  const [transactionDay, setTransactionDay] = useState(day);
  const [transactionMonth, setTransactionMonth] = useState(month);
  const [transactionYear, setTransactionYear] = useState(year);
  const [transactionType, setTransactionType] = useState(type);
  const [editDate, setEditDate] = useState(
    moment(dateVerify).format('YYYY-MM-DD')
  );

  const [transactionValidation, setTransactionValidation] = useState(
    selectedTransacation
  );
  const [errorMessage, setErrorMessage] = useState([]);

  useEffect(() => {
    const getErrorDescription = async () => {
      const errorDescription = await api.getTrasactionFromTransactionType(
        transactionValidation
      );
      setErrorMessage(errorDescription);
    };

    getErrorDescription();
    return;
  }, [transactionValidation]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      //Tira o efeito do keydown ao sair do modal
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose(null);
    }
  };

  const handleFormSubmit = (event) => {};

  const handleTransactionChange = (event) => {
    console.log(event.target);
    const { id: inputId, name: inputName, value: inputValues } = event.target;

    setTransactionDescription(
      inputId === 'inputDescription' ? inputValues : description
    );
    console.log(inputId === 'inputValor' ? inputValues : value);
    setTransactionType(inputName === 'typeTrasanction' ? inputValues : type);
    setTransactionValue(inputId === 'inputValor' ? inputValues : value);
    setTransactionCategory(
      inputId === 'inputCategory' ? inputValues : category
    );
    setEditDate(inputId === 'dataTransaction' ? inputValues : dateVerify);
    /*setTransactionDay;
    setTransactionMonth;
    setTransactionYear;*/
  };

  const handleClose = () => {
    onClose(null);
  };

  return (
    <div>
      <Modal isOpen={true}>
        <div style={styles.divTitulo}>
          <span style={styles.titulo}>{titulo}</span>
          <button
            className="waves=effect waves-ligths btn red dark4"
            onClick={handleClose}
          >
            X
          </button>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div style={{ border: '1px solid #d6dee0' }}>
            <div style={styles.divRadio} onChange={handleTransactionChange}>
              <div style={styles.divRadio}>
                <label>
                  <input
                    name="typeTrasanction"
                    type="radio"
                    id="inputTypeDespesa"
                    defaultChecked={transactionType === '-'}
                    value="-"
                  />
                  <span style={{ color: 'chocolate' }}>Despesa </span>
                </label>
              </div>
              <div style={styles.divRadio}>
                <label>
                  <input
                    name="typeTrasanction"
                    type="radio"
                    id="inputTypeReceita"
                    defaultChecked={transactionType === '+'}
                    value="+"
                  />
                  <span style={{ color: '#26a69a' }}>Receita</span>
                </label>
              </div>
            </div>
            <div className="input-field">
              <input
                id="inputDescription"
                type="text"
                defaultValue={transactionDescription}
                onChange={handleTransactionChange}
              />
              <label className="active" htmlFor="inputDescription">
                Descrição:
              </label>
            </div>
            <div className="input-field">
              <input
                id="inputCategory"
                type="text"
                defaultValue={transactionCategory}
                onChange={handleTransactionChange}
              />
              <label className="active" htmlFor="inputCategory">
                Categoria:
              </label>
            </div>
            <div>
              <div className="input-field">
                <input
                  id="inputValor"
                  type="number"
                  value={transactionValue}
                  onChange={handleTransactionChange}
                />
                <label className="active" htmlFor="inputValor">
                  Valor:
                </label>
              </div>
              <div className="input-field">
                {' '}
                <input
                  id="dataTransaction"
                  type="date"
                  defaultValue={editDate}
                  onChange={handleTransactionChange}
                />
                <label className="active" htmlFor="dataTransaction">
                  Data Trasanction:
                </label>
              </div>
            </div>
            <div style={(styles.divTitulo, styles.errorMessage)}>
              <button
                className="waves-effect waves-light btn"
                disabled={errorMessage.length > 1}
              >
                Salvar
              </button>
              {errorMessage.map(({ id, errorMessage }) => {
                return <span id={id}>{errorMessage}</span>;
              })}
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}

const styles = {
  divRadio: {
    display: 'flex',
    alignItems: 'center',
    margin: '30px',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  titulo: {
    fontSize: '1.3rem',
    fontWeigth: 'bold',
  },

  divTitulo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '40px',
  },

  errorMessage: {
    justifyContent: 'flex-start',
    color: 'red',
    fontWeigth: 'bold',
  },
};
