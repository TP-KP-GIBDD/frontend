import React, { useState, useContext, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import axios from 'axios';
import { FINE_API_URL } from '../../Api/Api';

export default function Fines() {
  // const { inputValue } = useContext(UserContext);

  const [fines, setFines] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(FINE_API_URL + `GetFines`)
      .then((resp) => {
        setFines(resp.data);
      })
      .catch((e) => alert(e));

    console.log(fines);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <div>
      <h1 className="profile-heading">Все штрафы</h1>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell
                class="appoint-service-table-head-fines"
                align="left"
              >
                №
              </StyledTableCell>
              <StyledTableCell
                class="appoint-service-table-head-fines"
                align="left"
              >
                Владелец
              </StyledTableCell>
              <StyledTableCell
                class="appoint-service-table-head-fines"
                align="right"
              >
                Сумма
              </StyledTableCell>
              <StyledTableCell
                class="appoint-service-table-head-fines"
                align="right"
              >
                Тип штрафа
              </StyledTableCell>
              <StyledTableCell
                class="appoint-service-table-head-fines"
                align="right"
              >
                Статус
              </StyledTableCell>
              <StyledTableCell
                class="appoint-service-table-head-fines"
                align="right"
              ></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fines.map((item) => (
              <StyledTableRow key={item.id}>
                <StyledTableCell component="th" scope="row" align="center">
                  {item.id}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.personId}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.sumaryFine}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.typeFine?.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.statusFine}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button>Подробнее</Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
