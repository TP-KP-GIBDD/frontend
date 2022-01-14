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
import { DTP_API_URL } from '../../Api/Api';
import { Link } from 'react-router-dom';

export default function Dtp() {
  const [dtp, setDtp] = useState([]);

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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const resp = axios
      .get(DTP_API_URL + 'GetProtocols', {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      .then((response) => {
        console.log(response.data);
        setDtp(response.data);
      });
  };

  return (
    <div>
      <h1 className="profile-heading">Все ДТП</h1>

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
                Адрес
              </StyledTableCell>
              <StyledTableCell
                class="appoint-service-table-head-fines"
                align="right"
              >
                Дата
              </StyledTableCell>
              <StyledTableCell
                class="appoint-service-table-head-fines"
                align="right"
              >
                Инспектор
              </StyledTableCell>
              <StyledTableCell
                class="appoint-service-table-head-fines"
                align="right"
              >
                Участник
              </StyledTableCell>

              <StyledTableCell
                class="appoint-service-table-head-fines"
                align="right"
              ></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dtp.map((item) => (
              <StyledTableRow key={item.id}>
                <StyledTableCell align="center">{item.id}</StyledTableCell>
                <StyledTableCell align="center">{item.address}</StyledTableCell>
                <StyledTableCell align="center">
                  {new Date(item.dateTime).toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.inspectorId}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.participants.accountId}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Link
                    to={`/DtpDetails/${item.id}?avtoId=${item.avtoId}&personId=${item.participants.accountId}&inspectorId=${item.inspectorId}`}
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
