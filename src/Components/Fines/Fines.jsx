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

export default function Fines() {
  // const { inputValue } = useContext(UserContext);

  const [fines, setFines] = useState([
    {
      id: 1,
      owner: 1,
      summ: '1000',
      type: 'Превышение скорости',
      status: 'Не оплачен',
    },
    {
      id: 2,
      owner: 2,
      summ: '2500',
      type: 'Остановка в неположеном месте',
      status: 'Не оплачен',
    },
  ]);

  useEffect(() => {}, []);

  const fetchData = (userId) => {
    // Запрос к севреру по userid
    return 0;
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
              <StyledTableRow key={item.name}>
                <StyledTableCell component="th" scope="row" align="center">
                  {item.id}
                </StyledTableCell>
                <StyledTableCell align="center">{item.owner}</StyledTableCell>
                <StyledTableCell align="center">{item.summ}</StyledTableCell>
                <StyledTableCell align="center">{item.type}</StyledTableCell>
                <StyledTableCell align="center">{item.status}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button>Оплачен</Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
