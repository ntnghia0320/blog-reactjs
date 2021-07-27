import React, { useEffect, useState } from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import userService from '../../../services/user.service';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: '#333333',
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
      wordWrap: 'break-word'
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        table: {
            minWidth: 700,
        },
    }),
);

export default function UserManagement() {
  const classes = useStyles();
  const postDefault: User[] = [];
    const [users, setUsers] = useState(postDefault);

    useEffect(() => {
        userService.getUsers().then(
            (res) => {
                setUsers(res);
            },
            (error) => {
                alert(error.message)
            }
        );

        console.log('edit post list');   
    }, []);

    const setRole = (userId: number, roleId: number) =>{

        roleId = roleId === 1 ? 2 : 1;

        userService.setRoleUser(userId, roleId).then(
            (res) => {
                // user.role = {id: 1, name: 'ROLE_ADMIN'};
                // alert(JSON.stringify(res));
                window.location.reload();
            },
            (error) => {
                alert(JSON.stringify(error))
            }
        );
    }
  return (
    <>
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
            <TableHead>
            <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Email <span>&emsp;</span></StyledTableCell>
                <StyledTableCell align="right">Role <span>&emsp;</span></StyledTableCell>
                <StyledTableCell align="right">Set Role <span>&emsp;</span></StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {users.map((user) => (
                <StyledTableRow key={user.id}>
                <StyledTableCell component="th" scope="row">{`${user.firstName} ${user.lastName}`}</StyledTableCell>
                <StyledTableCell align="right">{user.email}</StyledTableCell>
                <StyledTableCell align="right">{user.role.name}</StyledTableCell>
                <StyledTableCell align="right">
                    <Tooltip title={user.role.id === 1 ? 'Set role user' : 'Set role admin' }>
                        <IconButton
                          onClick={() => setRole(Number(user.id), Number(user.role.id))}
                          aria-label="set-role"
                          size="small"
                        >
                          {user.role.id === 1 ? 'Set role user' : 'Set role admin' }
                        </IconButton>
                    </Tooltip>
                </StyledTableCell>
                </StyledTableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </>
  );
}