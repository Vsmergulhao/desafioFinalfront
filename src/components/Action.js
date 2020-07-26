import React from 'react';

export default function Action({ id, type, entityTransaction, onActionClick }) {
  const handleIconClick = () => {
    onActionClick(id, type, entityTransaction);
  };
  return (
    <span
      className="material-icons"
      onClick={handleIconClick}
      style={{ cursor: 'pointer' }}
    >
      {type}
    </span>
  );
}
