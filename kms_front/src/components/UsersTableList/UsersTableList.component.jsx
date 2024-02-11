import React from 'react'
import "./UsersTableList.styles.scss";

import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

function UsersTableList({users}) {
  return (
    <div>

<TableContainer component={Paper}>
      <Table sx={{ mWidth: 650 }} aria-label="simple table">

        <TableHead>
          <TableRow>
            <TableCell>Nom complet</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Rôle</TableCell>
            <TableCell align="left">Directions</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody className='user'>
          {users.map((user) => (
            <TableRow
              key={user._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              className={`${user.role==="editor" ? "editor" : ""}`}
            >
              <TableCell component="th" scope="row">
                <div  className='avatar flex-center'>
                    <Avatar alt="Oussama belbachir" src="https://cdn.sanity.io/images/gkcbanss/production/aa05e9269c07d593259360a2c9480507b5dea65c-1000x667.jpg?rect=2,0,997,667&w=768&h=514&auto=format" />
                    <div className={`fullname ${!user.active && "inactive"}`}>{user.first_name} {user.last_name}</div>
                </div>
              </TableCell>
              <TableCell align="left">{user.email}</TableCell>
              <TableCell align="left" className='role'><span>{user.role === "reader" ? "Lecteur" : user.role === "editor" ? "Éditeur" : user.role}</span></TableCell>
              
              <TableCell align="left">
                <div className='directions'>
                    {Object.keys(user.direction_departments).map(el => <div key={el}># {el}</div>)}
                </div>
              </TableCell>

              <TableCell align="left" className='actions'>
                <div className='flex-center'>
                  <div><Link className='details left' to={"/users"}><VisibilityIcon /></Link></div>
                  <div><Link className='details' to={`${user._id}/modifier`}><EditIcon /></Link></div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default UsersTableList