import React from "react";
import "./ResultData.css";
import { downloadXLSX } from "../helpers";

const ResultData = ({ data, files }) => {
  const skus = Object.keys(data);
  const fileNames = files.map(item => item.name);

  const header = ["Название", "Артикул"];
  const subheader = [null, null];

  fileNames.forEach((fileName, index) => {
    header.push(fileName);
    header.push(null);
    subheader.push("Продажи");
    subheader.push("Остаток");
  });

  const result = [header, subheader];

  skus.forEach((skuName, skuIndex) => {
    const { name, ...filesData } = data[skuName];
    const skuResult = [name, skuName];

    fileNames.forEach((fileName, index) => {
      skuResult.push(filesData[fileName] ? filesData[fileName].sales : null);
      skuResult.push(filesData[fileName] ? filesData[fileName].rest : null);
    });

    result.push(skuResult);
  });

  const download = () => downloadXLSX(result);

  return (
    <div>
      <button onClick={download}>Скачать XLX</button>
      <div className="sku-row">
        <div className="sku-cell sku-cell--name">Название</div>
        <div className="sku-cell sku-cell--name">Артикул</div>
        {fileNames.map((fileName, index) => (
          <div className="sku-cell sku-cell--header" key={index}>
            {" "}
            {fileName}{" "}
          </div>
        ))}
      </div>

      <div className="sku-row">
        <div className="sku-cell sku-cell--name"></div>
        <div className="sku-cell sku-cell--name"></div>
        {fileNames.map((fileName, index) => (
          <>
            <div className="sku-cell sku-cell--value" key={`sales_${index}`}>
              {" "}
              Продажи{" "}
            </div>
            <div className="sku-cell sku-cell--value" key={`rest_${index}`}>
              {" "}
              Остаток{" "}
            </div>
          </>
        ))}
      </div>
      {skus.map((skuName, skuIndex) => {
        const { name, ...filesData } = data[skuName];

        return (
          <div className="sku-row" key={skuIndex}>
            <div className="sku-cell sku-cell--name">{name}</div>
            <div className="sku-cell sku-cell--name">{skuName}</div>
            {fileNames.map((fileName, index) => (
              <>
                <div
                  className="sku-cell sku-cell--value"
                  key={`sales_${index}`}
                >
                  {" "}
                  {filesData[fileName] && filesData[fileName].sales}{" "}
                </div>
                <div className="sku-cell sku-cell--value" key={`rest_${index}`}>
                  {" "}
                  {filesData[fileName] && filesData[fileName].rest}{" "}
                </div>
              </>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default ResultData;
