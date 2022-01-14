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
import { Link } from 'react-router-dom';
import jwt from 'jwt-decode';

export default function FineCheck() {
  // const { inputValue } = useContext(UserContext);

  const [fines, setFines] = useState([]);

  useEffect(() => {
    fetchData();

    fines.filter((item) => item.statusFine !== 'Не оплачен');
  }, []);

  const fetchData = () => {
    axios
      .get(
        FINE_API_URL +
          `GetFineByPersonId?id=${jwt(localStorage.getItem('token')).id}`,
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        }
      )
      .then((resp) => {
        // resp.data.filter((item) => item.statusFine !== 'Не оплачен');

        let result = resp.data.filter(
          (item) => item.statusFine === 'Не оплачен'
        );
        setFines(result);
      })
      .catch((e) => alert(e));
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
      {/* {fines.length !== undefined ? (
        <h1 className="profile-heading">У вас имеются неоплаченные штрафы:</h1>
      ) : (
        <h1 className="profile-heading">
          У вас нету неоплаченных штрафов штрафы:
        </h1>
      )} */}
      <h1 className="profile-heading">Ваши неоплаченные штрафы:</h1>
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
                  {item.sumaryFine}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.typeFine?.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.statusFine}
                </StyledTableCell>

                <StyledTableCell align="center">
                  <Link
                    to={`/FineDetails/${item.id}?avtoId=${item.avtoId}&personId=${item.personId}`}
                  >
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
