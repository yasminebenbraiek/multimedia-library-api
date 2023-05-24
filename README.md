# SOA
SOA Course Project - Spring 2023
# Multimedia Library API

This project implements a Multimedia Library API architecture using Node.js. The objective is to create a microservices system for managing books, magazines, and audiovisual materials, interconnected through an API Gateway. The API Gateway serves data to clients via RESTful and GraphQL endpoints. Additionally, a simple frontend is included to facilitate testing for REST clients.

## Features

- Microservices architecture for books, magazines, and audiovisual materials
- API Gateway as a centralized entry point
- RESTful endpoints for CRUD operations on library resources
- GraphQL endpoint for flexible data retrieval and manipulation
- Simple frontend for testing and interaction

## Installation

1. Clone the repository: `git clone https://github.com/your-username/multimedia-library-api.git`
2. Navigate to the project directory: `cd multimedia-library-api`
3. Install dependencies: `npm install`

## Usage

1. Start the microservices:
   - Book microservice: `npm run start:book`
   - Magazine microservice: `npm run start:magazine`
   - Audiovisual microservice: `npm run start:audiovisual`

2. Start the API Gateway: `npm run start:gateway`

3. Access the API and frontend:
   - API Gateway endpoint: `http://localhost:3000`
   - Frontend: `http://localhost:3000/frontend`

## Microservices and Data Management

The microservices are implemented using gRPC, a high-performance, open-source framework for remote procedure calls. Each microservice is responsible for managing data specific to a particular type of content, namely books, magazines, or audiovisual materials. 

The gRPC framework allows for efficient communication and data exchange between the microservices and the API Gateway. It provides a reliable and scalable solution for handling requests and responses, ensuring seamless integration and management of multimedia library data.

## Database

The project uses an SQLite3 database to store data for all three microservices. The database is automatically created and managed by the microservices.

## API Endpoints

### RESTful Endpoints

#### Books

- `GET /books` - Get all books
- `GET /books/:id` - Get a specific book by ID
- `POST /books` - Create a new book
- `PUT /books/:id` - Update a book by ID
- `DELETE /books/:id` - Delete a book by ID

#### Magazines

- `GET /magazines` - Get all magazines
- `GET /magazines/:id` - Get a specific magazine by ID
- `POST /magazines` - Create a new magazine
- `PUT /magazines/:id` - Update a magazine by ID
- `DELETE /magazines/:id` - Delete a magazine by ID

#### Audiovisuals

- `GET /audiovisuals` - Get all audiovisuals
- `GET /audiovisuals/:id` - Get a specific audiovisual by ID
- `POST /audiovisuals` - Create a new audiovisual
- `PUT /audiovisuals/:id` - Update an audiovisual by ID
- `DELETE /audiovisuals/:id` - Delete an audiovisual by ID

### GraphQL Endpoint

- Endpoint: `http://localhost:3000/graphql`
- Use GraphQL queries and mutations to interact with the library data.

GraphQL Schema Description:

The GraphQL schema defines the types of data available and the possible queries and mutations for books, magazines, and audiovisuals.

#### Book

- `id` (Int!): The unique identifier of the book.
- `title` (String!): The title of the book.
- `author` (String!): The author of the book.
- `description` (String!): The description of the book.
- `language` (String): The language of the book.
- `publisher` (String): The publisher of the book.

#### Magazine

- `id` (Int!): The unique identifier of the magazine.
- `title` (String!): The title of the magazine.
- `category` (String!): The category of the magazine.
- `summary` (String!): The summary of the magazine.
- `issue` (String): The issue of the magazine.
- `publisher` (String): The publisher of the magazine.
- `language` (String): The language of the magazine.

#### Audiovisual

- `id` (Int!): The unique identifier of the audiovisual.
- `title` (String!): The title of the audiovisual.
- `format` (String!): The format of the audiovisual.
- `content` (String!): The content of the audiovisual.
- `production` (String): The production of the audiovisual.
- `language` (String): The language of the audiovisual.

#### Query

- `book(id: Int!)`: Retrieve a specific book by ID.
- `books`: Retrieve all books.
- `magazine(id: Int!)`: Retrieve a specific magazine by ID.
- `magazines`: Retrieve all magazines.
- `audiovisual(id: Int!)`: Retrieve a specific audiovisual by ID.
- `audiovisuals`: Retrieve all audiovisuals.

#### Mutation

- `createBook(title: String!, author: String!, description: String!, language: String, publisher: String)`: Create a new book.
- `updateBook(id: Int!, title: String, author: String, description: String, language: String, publisher: String)`: Update a book by ID.
- `deleteBook(id: Int!)`: Delete a book by ID.
- `createMagazine(title: String!, category: String!, summary: String!, issue: String, publisher: String, language: String)`: Create a new magazine.
- `updateMagazine(id: Int!, title: String, category: String, summary: String, issue: String, publisher: String, language: String)`: Update a magazine by ID.
- `deleteMagazine(id: Int!)`: Delete a magazine by ID.
- `createAudiovisual(title: String!, format: String!, content: String!, production: String, language: String)`: Create a new audiovisual.
- `updateAudiovisual(id: Int!, title: String, format: String, content: String, production: String, language: String)`: Update an audiovisual by ID.
- `deleteAudiovisual(id: Int!)`: Delete an audiovisual by ID.

## Frontend

The included frontend provides a user-friendly interface for testing and interacting with the API endpoints. It offers a comprehensive set of features, including all CRUD (Create, Read, Update, Delete) functionalities for managing the library resources. Use the provided web interface to explore and perform actions such as:

- Searching for books
- Browsing magazines
- Accessing audiovisual materials
- Creating new items
- Updating existing items
- Deleting items

The frontend is designed to streamline the testing and interaction process, allowing you to easily manipulate the library's data using an intuitive graphical interface.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests for any enhancements or bug fixes.

