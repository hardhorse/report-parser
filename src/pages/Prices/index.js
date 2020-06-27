import React, { useState, useRef } from "react";
import rp from "request-promise-native";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import DenseTable from '../../components/Table'
import { downloadXLSX } from "../../helpers";
import { TABLET_TYPE, LAPTOP_TYPE, SHOPS } from './constants';
import {
    getApiUrl,
    getShops,
    getDetailsUrl,
    getProductData,
    getParametersList,
    createTable,
    isTablet,
    getProductPrice
} from './helpers';

const useStyles = makeStyles({
  root: {
    marginTop: 20
  },
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchData(numbers, urlFuncion, cb) {
  const data = []
  for (let i = 0; i < numbers.length; i++) {
    const item = numbers[i];
    const options = {
      method: "GET",
      url: urlFuncion(item),
      json: true,
    };
    const body = await rp(options);
    console.log(`Awaiting 2s ...`);
    //waiting before sleep function executes using it synchronously
    await sleep(2000);
    data.push(body);
    cb(body, item);
  }

  return data;
}

const Prices = () => {
  const [numbers, setNumbers] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const classes = useStyles();
  const table = useRef(null);
  const productItems = useRef({});

  const handleTextareaChange = e => {
    setNumbers(e.target.value);
  };

  const handleGetResults = async () => {

    setIsReady(false);
    setInProgress(true);
    const splittedNumbers = numbers.split(/\n/);

    if(splittedNumbers.length >= 1) {
      await fetchData(splittedNumbers, getApiUrl, (data, item) => {
        if (data.positions) {
          const availableShops = getShops(data.positions.primary);

          productItems.current[item] = { ...productItems.current[item], ...availableShops};
        }
      });
      await fetchData(splittedNumbers, getDetailsUrl, (data, item) => {
        productItems.current[item] = {
          ...productItems.current[item],
          ...getProductData(data)
        }
      });

      const productData = splittedNumbers.map(item => {
          const product = productItems.current[item];

          if (!product) {
              return [...SHOPS.map(() => null)]
          }
          
          return [
              ...getParametersList(isTablet(product))
                  .map(item =>product[item] && product[item].value),
              ...SHOPS.map(shop => getProductPrice(product[shop]))
          ]
        }).sort(item => item[1] === TABLET_TYPE ? 1 : -1);

      const notebooks = productData.filter(item => item[1] !== TABLET_TYPE);
      const tablets = productData.filter(item => item[1] === TABLET_TYPE);


      table.current = [createTable(notebooks, LAPTOP_TYPE), createTable(tablets, TABLET_TYPE)].filter(Boolean);

      setIsReady(true);
      setInProgress(false);
    }
  };

  const download = () => downloadXLSX(table.current, 'Анализ цен', 'price-analysis');

  return (
    <>
      <Container maxWidth="sm" className={classes.root}>
        <TextField
            label="SKU продуктов"
            multiline
            fullWidth
            rows={10}
            cols={20}
            variant="outlined"
            size="medium"
            onChange={handleTextareaChange}
            value={numbers}
          />
        <ButtonGroup color="primary"  className={classes.root}>
          <Button onClick={handleGetResults}>Найти</Button>
          {isReady && table.current && <Button onClick={download}>Скачать XLS</Button>}
        </ButtonGroup>
        </Container>
        {inProgress && <CircularProgress className={classes.root} />}
        {isReady && !inProgress && table.current && table.current.map((item, index) => <DenseTable data={item} key={index} />) }
    </>
  );
};

export default Prices;
