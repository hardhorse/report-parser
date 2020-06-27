import React from 'react';
import './ResultData.css';
import { downloadXLSX } from '../helpers';

const ResultData = ({ data, files }) => {
    const skus = Object.keys(data);

    const header = ['Название', 'Артикул', 'Продажи', 'Остаток', 'Заказчик'];

    const result = [header]

    skus.forEach((skuName, skuIndex) => {
        const { name, sales = null, rest = null, customer } = data[skuName];
        const skuResult = [name, skuName, sales, rest, customer];

        result.push(skuResult)
    })

    const download = () => downloadXLSX(result, 'Склеенные отчеты', 'concated')

    return (
      <div>
        <button onClick={download}>Скачать XLX</button>
        <div className="sku-row">
            <div className="sku-cell sku-cell--name" >Название</div>
            <div className="sku-cell sku-cell--name" >Артикул</div>
            <div className="sku-cell sku-cell--name">Продажи</div>
            <div className="sku-cell sku-cell--name">Остатки</div>
            <div className="sku-cell sku-cell--name">Заказчик</div>
            
        </div> 
        {skus.map((skuName, skuIndex) => {
          const { name, sales, rest, customer } = data[skuName];

          return (
            <div className="sku-row" key={skuIndex}>
              <div className="sku-cell sku-cell--name">{name}</div>
              <div className="sku-cell sku-cell--name">{skuName}</div>
              <div className="sku-cell sku-cell--name">{sales}</div>
              <div className="sku-cell sku-cell--name">{rest}</div>
              <div className="sku-cell sku-cell--name">{customer}</div>
              
            </div>
          );
        })}
      </div>
    );
}

export default ResultData