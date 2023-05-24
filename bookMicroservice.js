const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { Book } = require('./models');

const bookProtoPath = 'book.proto';
const bookProtoDefinition = protoLoader.loadSync(bookProtoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
const bookProto = grpc.loadPackageDefinition(bookProtoDefinition).book;
const bookService = {
    getBook: (call, callback) => {
        const { book_id } = call.request;
        Book.getById(book_id, (err, book) => {
            if (err) {
                console.error('Error retrieving book:', err);
                return callback({ message: 'Internal server error' });
            }
            if (!book) {
                return callback({ message: 'Book not found' });
            }
            callback(null, { book });
        });
    },
    getAllBooks: (call, callback) => {
        Book.getAll((err, books) => {
            if (err) {
                console.error('Error retrieving books:', err);
                return callback({ message: 'Internal server error' });
            }
            callback(null, { books });
        });
    },
    createBook: (call, callback) => {
        const {title, author, description, language, publisher } = call.request;
        const book = new Book(title, author, description, language, publisher);
        book.save((err, savedBookId) => {
            if (err) {
                console.error('Error creating book:', err);
                return callback({ message: 'Internal server error' });
            }
            callback(null, { book_id: savedBookId });
        });
    },
    updateBook: (call, callback) => {
        const { book_id, title, author, description, language, publisher } = call.request;
        const updates = { title, author, description, language, publisher };
        Book.update(book_id, updates, (err) => {
            if (err) {
                console.error('Error updating book:', err);
                return callback({ message: 'Internal server error' });
            }
            callback(null, {});
        });
    },
    deleteBook: (call, callback) => {
        const { book_id } = call.request;
        Book.delete(book_id, (err) => {
            if (err) {
                console.error('Error deleting book:', err);
                return callback({ message: 'Internal server error' });
            }
            callback(null, { book_id });
        });
    },
};

const server = new grpc.Server();
server.addService(bookProto.BookService.service, bookService);
const port = 50051;
server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), (err, boundPort) => {
    if (err) {
        console.error('Failed to bind server:', err);
        return;
    }
    console.log(`Server is running on port ${boundPort}`);
    server.start();
});
console.log(`Book microservice running on port ${port}`);
