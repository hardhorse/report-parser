import React, {useState} from 'react';
import readXlsxFile from 'read-excel-file';
import FileData from '../components/FileData';
import ResultData from '../components/ResultData';

const FIELDS = ['firstRow', 'lastRow', 'productData', 'productDescription', 'sales', 'rest']
const SKU_REGEXP = /([0-9A-Z]{10})/gim;

const MainPage = () => {
  const [files, setFiles] = useState([]);
  const [fileData, setFileData] = useState({});
  const [resultData, setResultData] = useState(null);

  function onFileChange (e) {
    setFiles([]);
    setFileData({});
    setResultData(null);

    const filesToProceed = e.target.files;
    const promises = [...filesToProceed].map(file => readXlsxFile(file))

    Promise.all(promises).then(files => console.log(files) || setFiles(files.map((data, i) => ({ data, name: filesToProceed[i].name }) )));
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
    setFileData(newFileData)
  }

  function handleResultCalculate () {
    const resultData = {}
    // fileData, files

    files.forEach(({ name: fileName, data }) => {
      const {firstRow, lastRow, sales, productData, productDescription, rest} = fileData[fileName]
      const slicedRows = data.slice(firstRow.row, lastRow.row);
      // go per rows
      slicedRows.forEach(row => {
        const elementName = row[(productDescription || productData).column];
        const elementSales = Number(row[sales.column]);
        const elementRest = Number(row[rest.column]);
        const elementSku = row[productData.column].match(SKU_REGEXP);

        resultData[elementSku] = {
          ...resultData[elementSku],
          name: resultData[elementSku] && resultData[elementSku].name ? resultData[elementSku].name : elementName,
          [fileName]: {
            sales: elementSales,
            rest: elementRest
          }
        }
      })
    })

    setResultData(resultData)
  }

  return (
    <>
      <input type="file" onChange={onFileChange} multiple/>
      {
        !resultData ?
          <>
            <button onClick={handleResultCalculate}>Получить отчет</button>
            {
              files.map((file, index) => <FileData fileData={fileData} onFieldSelect={handleFieldSelect} fields={FIELDS} {...file} key={index} />)
            }
          </> : 
          <ResultData files={files} data={resultData} />
      }
      
    </>
  );
}

export default MainPage;
