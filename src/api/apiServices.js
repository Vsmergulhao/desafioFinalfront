import axios from 'axios';

const API_URL = 'http://localhost:3001/api/transaction';

async function getAllTrasanctioPeriod(period) {
  const res = await axios.get(`${API_URL}?period=${period}`);
  const transactions = res.data.map((transaction) => {
    const { description, category, day } = transaction;

    //Inclui os campos LowerCase para facilitar na procura. O Campo isDeleted para realizar a exclusão lógica no array
    return {
      ...transaction,
      descriptionLowerCase: description.toLowerCase(),
      categoryLowerCase: category.toLowerCase(),
    };
  });

  return transactions;
}

async function getlistPeriod() {
  const response = await axios.get(API_URL + '/listaperiodo');
  return response.data;
}

function calcLancamentos(transactions) {
  let totalDespesas = 0;
  let totalReceitas = 0;

  transactions.forEach(({ type, value }) => {
    if (type == '-') {
      totalDespesas += Number(value);
    } else {
      totalReceitas += Number(value);
    }
  });

  return {
    totalLancementos: transactions.length,
    totalReceitas,
    totalDespesas,
    saldo: totalReceitas - totalDespesas,
  };
}

async function getTrasactionFromTransactionType(transactionType) {
  const {
    _id,
    description,
    value,
    category,
    day,
    month,
    year,
    type,
  } = transactionType;

  let descError = [];

  if (!(type === '-' || type === '+')) {
    descError.push({ id: 1, errorMessage: 'Tipo de operador inválido' });
  }
  if (!description || description === '') {
    descError.push({ id: 2, errorMessage: 'Descrição deve ser preenchida' });
  }

  if (!value || value === '' || value === '0' || value === 0) {
    descError.push({ id: 3, errorMessage: 'Valor deve ser preenchida' });
  }

  if (!category || category === '') {
    descError.push({ id: 4, errorMessage: 'Categoria deve ser preenchida' });
  }

  if (!day || day === '') {
    descError.push({ id: 5, errorMessage: 'Dia deve ser preenchido' });
  }

  if (!month || month === '') {
    descError.push({ id: 6, errorMessage: 'Mês deve ser preenchido' });
  }

  if (!year || year === '') {
    descError.push({ id: 7, errorMessage: 'Ano deve ser preenchido' });
  }
  return descError;
}

async function insertTransaction(transaction) {
  const response = await axios.post(API_URL, transaction);
  return response.data._id;
}

async function updateTransaction(transaction) {
  const response = await axios.put(`${API_URL}/${transaction.id}`, transaction);
  return response.data;
}

async function deleteTransaction(_id) {
  try {
    const response = await axios.delete(`${API_URL}/${_id}`);
    return response.data;
  } catch (error) {
    return null;
  }
}

export {
  getAllTrasanctioPeriod,
  getlistPeriod,
  calcLancamentos,
  insertTransaction,
  updateTransaction,
  deleteTransaction,
  getTrasactionFromTransactionType,
};
