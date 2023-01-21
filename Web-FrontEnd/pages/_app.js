import { ApolloProvider } from "@apollo/client";
import client from "../config/apollo";
import ListState from "../context/list/ListState";

const MyApp = ({ Component, pageProps }) => {
  return (
      <ApolloProvider client={client}>
        <ListState>
          <Component {...pageProps} />
        </ListState>
      </ApolloProvider>
  )
}

export default MyApp
