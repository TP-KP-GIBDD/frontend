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
import UserContext from '../Context';
import { Link } from 'react-router-dom';

export default function AppointServiceList() {
  const { inputValue } = useContext(UserContext);

  const [appoints, setAppoints] = useState([
    {
      id: 1,
      name: 'Получение водительского удостоверения',
      date: '14.12.2021',
      status: 'Ожидает выполнения',
    },
    {
      id: 2,
      name: 'Регистрация транспортного средства',
      date: '17.12.2021',
      status: 'Отказано',
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
      <h1>Мои записи на услуги</h1>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Наименование услуги</StyledTableCell>
              <StyledTableCell align="right">Дата</StyledTableCell>
              <StyledTableCell align="right">Статус</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appoints.map((item) => (
              <StyledTableRow key={item.name}>
                <StyledTableCell component="th" scope="row">
                  {item.name}
                </StyledTableCell>
                <StyledTableCell align="right">{item.date}</StyledTableCell>
                <StyledTableCell align="right">{item.status}</StyledTableCell>
                <StyledTableCell align="right">
                  <Link to={`/AppointDetails/${item.id}`}>
                    <Button>Подробнее</Button>
                  </Link>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
