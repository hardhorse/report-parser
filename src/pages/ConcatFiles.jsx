import React, {useState} from 'react';
import readXlsxFile from 'read-excel-file';
import FileData from '../components/FileData';
import ConcatFilesData from '../components/ConcatFilesData';

const FIELDS = ['firstRow', 'lastRow', 'productData'];
const OPTIONAL_FIELDS = ['customer', 'sales', 'rest', 'productDescription'];
const SKU_REGEXP = /([0-9A-Z]{10})/gim;

const MainPage = () => {
  const [files, setFiles] = useState([]);
  const [fileData, setFileData] = useState({});
  const [resultData, setResultData] = useState(null);
  const [needToSumData, setNeedToSumData] = useState(false);

  function onFileChange (e) {
    setFiles([]);
    setFileData({});
    setResultData(null);

    const filesToProceed = e.target.files;
    const promises = [...filesToProceed].map(file => readXlsxFile(file))

    Promise.all(promises).then(files => setFiles(files.map((data, i) => ({ data, name: filesToProceed[i].name }) )));
  }

  const handleFieldSelect = (name, activeField) => (row, column) => {
    if(!activeField) { return }
    const newFileData = {
      ...fileData,
      [name]: {
        ...fileData[name],
        [activeField]: {
          row,
          column
        }
      }
    }
    setFileData(newFileData);
  }

  function handleResultCalculate () {
    const resultData = {};
  
    files.forEach(({ name: fileName, data }) => {
      const {firstRow, lastRow, sales, productData, rest, productDescription, customer} = fileData[fileName];

      const slicedRows = data.slice(firstRow.row, lastRow.row + 1);
      // go per rows
      slicedRows.forEach(row => {
        const elementName = row[productDescription.column];
        const elementSku = (row[productData.column] || elementName).match(SKU_REGEXP);
        const {
          [elementSku] : {
            customer: customerResult = '',
            sales: salesResult = 0,
            rest: restResult = 0,
          } = {}
        } = resultData;
  
        const elementCustomer = customerResult || (customer && row[customer.column]);
        const currentRest = rest ? Number(row[rest.column]) : 0;
        const currentSales = sales ? Number(row[sales.column]) : 0;
        const elementRest = !needToSumData ? (restResult || currentRest) : (restResult + currentRest);
        const elementSales = !needToSumData ? (salesResult || currentSales) : (salesResult + currentSales);

        resultData[elementSku] = {
          ...resultData[elementSku],
          name: elementName || elementSku,
          sku: elementSku,
          sales: elementSales,
          rest: elementRest,
          customer: elementCustomer
        }
      })
    })
    setResultData(resultData)
  }

  function handleCheckboxChange (e) {
    const { target: { checked } } = e;

    setNeedToSumData(checked);
  }

  return (
    <>
      <input type="file" onChange={onFileChange} multiple/>
      {
        !resultData ?
          <>
            <button onClick={handleResultCalculate}>Срастить отчеты</button>
            <label>
              <input type="checkbox" checked={needToSumData} onChange={handleCheckboxChange}/>
              Складывать значения
            </label>
            {
              files.map((file, index) =>
                <FileData
                    fileData={fileData}
                    onFieldSelect={handleFieldSelect}
                    optionalFields={OPTIONAL_FIELDS}
                    fields={FIELDS}
                    {...file}
                    key={index}
                />)
            }
          </> : 
          <ConcatFilesData files={files} data={resultData} />
      }
      
    </>
  );
}

export default MainPage;
