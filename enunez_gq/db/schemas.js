const { gql } = require('apollo-server');

const typeDefs = gql `
    type Usuario {
        id: ID
        nombre: String
        apellido: String
        email: String
        creado: String
    }
    
    type Banco {
        id: ID
        nombre: String
    }
    
    type Token {
        token: String
    }
    
    input UsuarioInput {
        nombre: String!
        apellido: String!
        email: String!
        password: String!
    }
    
    input AutenticarInput {
        email: String
        password: String
    }

    input BancoInput {
        nombre: String!
    }
    
    type Query {
        #Usuarios
        obtenerUsuario(token: String): Usuario
        obtenerBancos: [Banco]
        obtenerBancoId(id: ID!): Banco
    }
    
    type Mutation {
        #Usuarios
        nuevoUsuario(input: UsuarioInput ): Usuario
        autenticarUsuario(input: AutenticarInput ): Token
        nuevoBanco(input: BancoInput): Banco
        actualizarBanco(id: ID!, input: BancoInput): Banco
        eliminarBanco(id: ID!): String
    }
`;

module.exports = typeDefs;