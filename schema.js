const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    id: Int!
    title: String!
    author: String!
    description: String!
    language: String
    publisher: String
  }

  type Magazine {
    id: Int!
    title: String!
    category: String!
    summary: String!
    issue: String
    publisher: String
    language: String
  }

  type Audiovisual {
    id: Int!
    title: String!
    format: String!
    content: String!
    production: String
    language: String
  }

  type Query {
    book(id: Int!): Book
    books: [Book]
    magazine(id: Int!): Magazine
    magazines: [Magazine]
    audiovisual(id: Int!): Audiovisual
    audiovisuals: [Audiovisual]
  }

  type Mutation {
    createBook(title: String!, author: String!, description: String!, language: String, publisher: String): Book
    updateBook(id: Int!, title: String, author: String, description: String, language: String, publisher: String): Book
    deleteBook(id: Int!): DeleteResponse

    createMagazine(title: String!, category: String!, summary: String!, issue: String, publisher: String, language: String): Magazine
    updateMagazine(id: Int!, title: String, category: String, summary: String, issue: String, publisher: String, language: String): Magazine
    deleteMagazine(id: Int!): DeleteResponse

    createAudiovisual(title: String!, format: String!, content: String!, production: String, language: String): Audiovisual
    updateAudiovisual(id: Int!, title: String, format: String, content: String, production: String, language: String): Audiovisual
    deleteAudiovisual(id: Int!): DeleteResponse
  }

  type DeleteResponse {
    success: Boolean!
  }
`;

module.exports = typeDefs;
