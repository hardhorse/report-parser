import React from 'react';
import { HashRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import MainPage from './pages/MainPage';
import ConcatFiles from './pages/ConcatFiles';
import Prices from './pages/Prices';
import { isSuperUser, enableSuperUser, disableSuperUser } from './superUser';
import './App.css';

const App = () => {
  window.enableSuperUser = enableSuperUser;
  window.disableSuperUser = disableSuperUser;

  return (
    <div className="App">
      <CssBaseline />
      <Router>
        <Switch>
          <>
            {isSuperUser &&
              <>
                <ButtonGroup>
                  <Button component={NavLink} to="/">Получить общий отчет</Button>
                  <Button component={NavLink} to="/concat">Склеить два отчета</Button>
                  <Button component={NavLink} to="/prices">Анализ цен</Button>
                </ButtonGroup>
              </>
            }
            <Container maxWidth={false}>
              {isSuperUser &&
                <>
                  <Route path="/" exact>
                    <MainPage />
                  </Route>
                  <Route path="/concat">
                    <ConcatFiles /> 
                  </Route>
                </>
              }
              <Route path={isSuperUser ? "/prices" : "/"}>
                <Prices /> 
              </Route>
            </Container>
          </>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
