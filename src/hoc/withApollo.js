import withApollo from "next-with-apollo";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const apiBaseUrl = "https://apollo-express-mongodb.evgenyantipin.vercel.app";

export default withApollo(
  ({ initialState, headers }) => {
    return new ApolloClient({fetchOptions: {
      mode: 'cors',
    },
      uri: `${apiBaseUrl}/graphql`,
      cache: new InMemoryCache().restore(initialState || {}),
    });
  },
  {
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    },
  }
);
