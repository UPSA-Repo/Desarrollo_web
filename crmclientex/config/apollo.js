//Después de instalar las dependencias, se crea un directorio en la raiz
// y se lo llama config. Aquí se crea este archivo llamado apollo.js.

import {ApolloClient, ApolloLink, HttpLink, InMemoryCache} from "@apollo/client";
import fetch from "node-fetch";

const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: 'http://localhost:4000',
        fetch
    })
});

export default client;
