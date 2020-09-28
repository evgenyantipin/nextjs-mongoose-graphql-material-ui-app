import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";
import withApollo from "hoc/withApollo";
import { USER_QUERY } from "graphql/users";

const User = ({ user }) => {
  const classes = useStyles({});
  const { register, handleSubmit, errors } = useForm();

  return (
    <Container maxWidth="sm" className={classes.root}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          name="username"
          variant="filled"
          defaultValue={user.username}
          inputRef={register({ required: "Please, enter username" })}
          inputProps={{
            "aria-label": "Enter username",
          }}
          autoFocus
          error={!!errors.username}
        />

        <TextField
          label="Email"
          name="email"
          variant="filled"
          defaultValue={user.email}
          inputRef={register({ required: "Please, enter email" })}
          inputProps={{
            "aria-label": "Enter email",
          }}
          error={!!errors.email}
        />
      </form>
    </Container>
  );
};

User.getInitialProps = async ({ apolloClient, query }) => {
  const {
    data: { user },
  } = await apolloClient.query({
    query: USER_QUERY,
    variables: { id: query.id },
  });

  return {
    user,
  };
};

export default withApollo(User);

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        display: "inline-block",
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
      },
    },
    button: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  })
);
