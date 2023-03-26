import { memo, useMemo, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

// import local library
import { toast } from 'react-toastify';

// import types and interfaces
import { InterfaceUserTableComponents } from '~@types/components/comps-userList';
import { InterfaceUser } from '~@types/models/user';

// import local services
import userServ from '@services/userServ';

// import local utils
import { axiosErrorHandling } from '../../utils';

// import local components
import InnerSpinner from '../Spinner/InnerSpinner';
import ConfirmModal from '../Modal/ConfirmModal';

// import MUI components
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const Table = memo(
  ({ filterValue, selectedUserRef, setFormOpen }: InterfaceUserTableComponents) => {
    const queryClient = useQueryClient();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // form and modal
    const [modalOpen, setModalOpen] = useState(false);

    // fetching user data
    const { data: userList } = useQuery({ queryKey: ['user-list'], queryFn: userServ.getUserList });
    const filterUserList = useMemo(() => {
      if (!userList) return null;
      return userList.filter((user) => {
        const isAgePassed = filterValue.ageLimit
          ? filterValue.ageLimit.max >= +user.age && filterValue.ageLimit.min <= +user.age
          : true;
        return (
          filterValue.idReg.test(user.id) &&
          filterValue.fullNameReg.test(user.fullName) &&
          isAgePassed
        );
      });
    }, [userList, filterValue]);

    if (!userList || !filterUserList)
      return (
        <Box component='div' sx={{ flexGrow: 1, position: 'relative' }}>
          <InnerSpinner color='error' size='3rem' thickness={4} disableAbsolute={false} />
        </Box>
      );

    // TABLE Context Handling
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const handleEditClick = (userInfo: InterfaceUser) => () => {
      selectedUserRef.current = userInfo;
      setFormOpen(true);
    };

    const handleDeleteClick = (userInfo: InterfaceUser) => () => {
      selectedUserRef.current = userInfo;
      setModalOpen(true);
    };

    // MODAL handling
    const handleCloseModal = () => {
      setModalOpen(false);
    };

    // User API Handling
    const handleDeleteUser = async () => {
      try {
        await userServ.deleteUser(selectedUserRef.current.id);
        toast.success('Delete user successfully.');
        queryClient.invalidateQueries(['user-list']);
        setModalOpen(false);
      } catch (err) {
        axiosErrorHandling(err);
      }
    };

    return (
      <>
        <Box component='div' sx={{ flexGrow: 1 }}>
          <TableContainer component={Paper}>
            <MuiTable sx={{ minWidth: 650 }} aria-label='simple table' size='small'>
              <TableHead sx={{ bgcolor: 'whitesmoke' }}>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Full Name</TableCell>
                  <TableCell align='right'>Age</TableCell>
                  <TableCell align='center'></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filterUserList.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      sx={{
                        height: 400,
                        textAlign: 'center'
                      }}
                    >
                      <img
                        src='https://act.hoyolab.com/app/community-game-records-sea/images/empty@2x.4bb1eff6.png'
                        alt='no-user-found'
                        style={{ maxWidth: '50%' }}
                      />
                      <Typography sx={{ fontSize: '1.5rem', fontWeight: 700, color: 'lightgray' }}>
                        No user found
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filterUserList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user, index) => (
                      <TableRow
                        key={user.id + index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        hover
                      >
                        <TableCell component='th' scope='row' sx={{ fontWeight: 600 }}>
                          {user.id}
                        </TableCell>
                        <TableCell>{user.fullName}</TableCell>
                        <TableCell align='right'>{user.age}</TableCell>
                        <TableCell align='center'>
                          <Box
                            component='div'
                            sx={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center'
                            }}
                          >
                            <IconButton color='warning' onClick={handleEditClick(user)}>
                              <BorderColorIcon />
                            </IconButton>
                            <IconButton color='error' onClick={handleDeleteClick(user)}>
                              <DeleteOutlineIcon />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                )}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows
                    }}
                  >
                    <TableCell colSpan={4} />
                  </TableRow>
                )}
              </TableBody>
            </MuiTable>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10]}
            component='div'
            count={filterUserList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
        <ConfirmModal
          open={modalOpen}
          handleClose={handleCloseModal}
          handleConfirm={handleDeleteUser}
          confirmContent={
            <span>
              Are you sure to delete{' '}
              <span style={{ fontWeight: 600 }}>{selectedUserRef.current.fullName}</span>?
            </span>
          }
        />
      </>
    );
  }
);

export default Table;
