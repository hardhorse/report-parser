import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  root: {
    marginTop: 20
  },
  table: {
    minWidth: 650,
  },
  tableCell: {
      whiteSpace: 'nowrap'
  }
});


export default function DenseTable({ data }) {
  const classes = useStyles();

  const [head, ...products] = data;

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table className={classes.table} size="medium">
        <TableHead>
          <TableRow>
              {
                head.map((row, index) => <TableCell className={classes.tableCell} key={index}>{row}</TableCell>)
              }
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((row, index) => (
            <TableRow key={index}>
                {
                    row.map((cell, cellIndex) =>
                        <TableCell className={classes.tableCell} key={cellIndex} component="th" scope="row">
                            {cell}
                        </TableCell>
                    )
                }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
