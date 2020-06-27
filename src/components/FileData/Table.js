import React from 'react';
import './Table.css';
import { isArray } from 'util';

const getItemColor = ({ fields, fileData, rowIndex, columnIndex }) => {
    const selectedFields = Object.keys(fileData);

    for(let i = 0; i < selectedFields.length; i++) {
        const item = selectedFields[i];
        const itemData = fileData[item];
        if ((item === 'firstRow' || item === 'lastRow') && itemData.row === rowIndex) {
            return 'active-row'
        }
        if ((item === 'rest' || item === 'sales' || item === 'productData' || item === 'productDescription' || item === 'customer') && itemData.column === columnIndex) {
            return 'active-column'
        }
    }

}

const Table = ({ data, onFieldSelect, fields, fileData = {} }) =>
  data.map((row, rowIndex) => (
    <div
      className={`table-row ${getItemColor({ fileData, rowIndex })}`}
      key={`row_${rowIndex}`}
    >
      {row.map((column, columnIndex) => (
        <div
          className={`table-cell ${getItemColor({ fileData, columnIndex })}`}
          onClick={() => onFieldSelect(rowIndex, columnIndex)}
          key={`${rowIndex}_${columnIndex}`}
        >
          {(typeof column === "number" ||typeof column === "string" || isArray(column)) && column}
        </div>
      ))}
    </div>
  ));

export default Table;