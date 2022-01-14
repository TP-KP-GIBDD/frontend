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
import axios from 'axios';
import { APPOINT_API_URL } from '../Api/Api';
import Loader from '../Components/Loader';
import jwt from 'jwt-decode';

export default function AppointServiceList() {
  const [appoints, setAppoints] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const userId = Number(jwt(localStorage.getItem('token')).id);

    if (userId !== null) {
      const resp = axios
        .get(APPOINT_API_URL + `Main/GetAppointsByCarOwnerId/${userId}`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        })
        .then((response) => {
          setAppoints(response.data);
        });
    } else {
      alert('ERROR');
    }
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
      {appoints.length !== 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Наименование услуги</StyledTableCell>
                <StyledTableCell align="center">Дата</StyledTableCell>
                <StyledTableCell align="center">Статус</StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appoints.map((item) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell component="th" scope="row">
                    {item.service.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {new Date(item.serviceDateTime.date).toLocaleDateString()}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.status}
                  </StyledTableCell>
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
      ) : (
        <Loader />
      )}
    </div>
  );
}
