import React from "react";
import Link from "next/link";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Button } from "@material-ui/core";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useForm } from "react-hook-form";
import withApollo from "hoc/withApollo";
import { USERS_QUERY } from "graphql/users";
import { CREATE_USER, DELETE_USER } from "graphql/mutations/users";

const Index = () => {
  const { register, handleSubmit, errors } = useForm();
  const classes = useStyles();
  const { data, loading, refetch } = useQuery(USERS_QUERY);
  const [createUser, { loadingCreate }] = useMutation(CREATE_USER);
  const [deleteUser, { loadingDelele }] = useMutation(DELETE_USER);

  const onSubmit = ({ email, username }) => {
    if (loadingCreate) return;

    createUser({
      variables: {
        email,
        username,
      },
    }).then((response) => {
      if (response.data.createUser.email) {
        refetch();
      }
    });
  };

  const handleDeleteUser = (event) => {
    if (confirm("Are you sure, delete this user ?")) {
      const { id } = event.currentTarget.dataset;

      if (loadingDelele) return;
      deleteUser({
        variables: {
          id,
        },
      }).then((response) => {
        if (response) {
          refetch();
        }
      });
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md">
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container className={classes.root} maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Next.js + Graphql + Material-Ui Users App
      </Typography>

      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.users.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.username}</TableCell>
                <TableCell align="right">
                  <IconButton aria-label="edit">
                    <Link
                      key={row.id}
                      href={`/user/[id]?id=${row.id}`}
                      as={`/user/${row.id}`}
                    >
                      <EditIcon />
                    </Link>
                  </IconButton>

                  <IconButton
                    aria-label="delete"
                    data-id={row.id}
                    onClick={handleDeleteUser}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <form
        className={classes.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
      >
        <TextField
          name="username"
          inputRef={register({ required: "Please, enter username" })}
          label="Username"
          error={!!errors.username}
        />{" "}
        <TextField
          name="email"
          inputRef={register({ required: "Please, enter email" })}
          label="Email"
          error={!!errors.email}
        />
        <Button type="submit" color="primary" variant="contained">
          Add new user
        </Button>
      </form>
    </Container>
  );
};

export default withApollo(Index);

const useStyles = makeStyles((theme) => ({
  form: {
    padding: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
}));
