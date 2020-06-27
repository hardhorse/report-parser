import React, { useState, useRef } from "react";
import rp from "request-promise-native";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
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
  alert: {
    marginTop: 10, 
    marginBottom: 10, 
  },
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function CircularProgressWithLabel({className, ...props}) {
  return (
    <Box position="relative" className={className} display="inline-flex">
      <CircularProgress variant="static" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

async function fetchData(numbers, urlFuncion, setProgress, setAlert, cb) {
  const data = []
  for (let i = 0; i < numbers.length; i++) {
    const item = numbers[i];
    const options = {
      method: "GET",
      url: urlFuncion(item),
      json: true,
    };
    try {
      const body = await rp(options);
      //waiting before sleep function executes using it synchronously
      await sleep(2000);
      setProgress(prevProgress => (prevProgress + 1));
      data.push(body);
      cb(body, item);
    } catch (e) {
      console.log('Failed to fetch data');
      setAlert(item);
    }
  }

  return data;
}

const Prices = () => {
  const [numbers, setNumbers] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [progress, setProgress] = React.useState(0);
  const [alerts, setAlerts] = React.useState([]);
  const classes = useStyles();
  const table = useRef(null);
  const productItems = useRef({});

  const setAlert = msg => id => {
    setAlerts(prevAlerts => [...prevAlerts, `${msg} ${id}`]);
  }
  const handleTextareaChange = e => {
    setNumbers(e.target.value);
  };

  const splittedNumbers = numbers.split(/\n/).filter(Boolean);

  const handleGetResults = async () => {
    setAlerts([]);
    setIsReady(false);
    setInProgress(true);

    if(splittedNumbers.length >= 1) {
      await fetchData(splittedNumbers, getApiUrl, setProgress, setAlert('Не получилось загрузить данные по ценам для'), (data, item) => {
        if (data.positions) {
          const availableShops = getShops(data.positions.primary);

          productItems.current[item] = { ...productItems.current[item], ...availableShops};
        }
      });
      await fetchData(splittedNumbers, getDetailsUrl, setProgress, setAlert('Не получилось загрузить данные по товару для'), (data, item) => {
        productItems.current[item] = {
          ...productItems.current[item],
          ...getProductData(data)
        }
      });

      if (!Object.keys(productItems.current).length) {
        setIsReady(true);
        setInProgress(false);
        setProgress(0);
        return;
      }

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
      setProgress(0);
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
        {
          Boolean(alerts.length) && alerts.map((item, index) => <Alert className={classes.alert} key={index} severity="warning">{item}</Alert>)
        }
        </Container>
        {inProgress && <CircularProgressWithLabel className={classes.root} value={(progress / (splittedNumbers.length*2)) * 100} />}
        {isReady && !inProgress && table.current && table.current.map((item, index) => <DenseTable data={item} key={index} />) }
    </>
  );
};

export default Prices;
