const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { Book, Magazine, Audiovisual } = require('./models');

// Load book proto file
const bookProtoPath = 'book.proto';
const bookProtoDefinition = protoLoader.loadSync(bookProtoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
const bookProto = grpc.loadPackageDefinition(bookProtoDefinition).book;
const clientBooks = new bookProto.BookService('localhost:50051', grpc.credentials.createInsecure());

// Load magazine proto file
const magazineProtoPath = 'magazine.proto';
const magazineProtoDefinition = protoLoader.loadSync(magazineProtoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
const magazineProto = grpc.loadPackageDefinition(magazineProtoDefinition).magazine;
const clientMagazines = new magazineProto.MagazineService('localhost:50052', grpc.credentials.createInsecure());

// Load audiovisual proto file
const audiovisualProtoPath = 'audiovisual.proto';
const audiovisualProtoDefinition = protoLoader.loadSync(audiovisualProtoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
const audiovisualProto = grpc.loadPackageDefinition(audiovisualProtoDefinition).audiovisual;
const clientAudiovisuals = new audiovisualProto.AudiovisualService('localhost:50053', grpc.credentials.createInsecure());

const resolvers = {
    Query: {
        book: (_, { id }) => {
            return new Promise((resolve, reject) => {
                clientBooks.getBook({ book_id: id }, (err, response) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(response.book);
                    }
                });
            });
        },
        books: () => {
            return new Promise((resolve, reject) => {
                clientBooks.getAllBooks({}, (err, response) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(response.books);
                    }
                });
            });
        },
        magazine: (_, { id }) => {
            return new Promise((resolve, reject) => {
                clientMagazines.getMagazine({ magazine_id: id }, (err, response) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(response.magazine);
                    }
                });
            });
        },
        magazines: () => {
            return new Promise((resolve, reject) => {
                clientMagazines.getAllMagazines({}, (err, response) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(response.magazines);
                    }
                });
            });
        },
        audiovisual: (_, { id }) => {
            return new Promise((resolve, reject) => {
                clientAudiovisuals.getAudiovisual({ audiovisual_id: id }, (err, response) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(response.audiovisual);
                    }
                });
            });
        },
        audiovisuals: () => {
            return new Promise((resolve, reject) => {
                clientAudiovisuals.getAllAudiovisuals({}, (err, response) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(response.audiovisuals);
                    }
                });
            });
        },
    },
    Mutation: {
        createBook: (_, { title, author, description, language, publisher }) => {
            return new Promise((resolve, reject) => {
                const book = new Book(title, author, description, language, publisher);
                book.save((err, savedBookId) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({
                            id: savedBookId,
                            title: title,
                            author: author,
                            description: description,
                            language: language,
                            publisher: publisher,
                        });
                    }
                });
            });
        },
        updateBook: (_, { id, title, author, description, language, publisher }) => {
            return new Promise((resolve, reject) => {
                const updates = { title, author, description, language, publisher };
                Book.update(id, updates, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({
                            id: id,
                            title: title,
                            author: author,
                            description: description,
                            language: language,
                            publisher: publisher,
                        });
                    }
                });
            });
        },
        deleteBook: (_, { id }) => {
            return new Promise((resolve, reject) => {
                Book.delete(id, (err, affectedRows) => {
                    if (err) {
                        reject(err);
                    } else {
                        if (affectedRows === 0) {
                            const error = new Error(`Book with ID ${id} does not exist.`);
                            reject(error);
                        } else {
                            resolve({ success: true });
                        }
                    }
                });
            });
        },
        createMagazine: (_, { title, category, summary, issue, publisher, language }) => {
            return new Promise((resolve, reject) => {
                const magazine = new Magazine(title, category, summary, issue, publisher, language);
                magazine.save((err, savedMagazineId) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({
                            id: savedMagazineId,
                            title: title,
                            category: category,
                            summary: summary,
                            issue: issue,
                            publisher: publisher,
                            language: language,
                        });
                    }
                });
            });
        },
        updateMagazine: (_, { id, title, category, summary, issue, publisher, language }) => {
            return new Promise((resolve, reject) => {
                const updates = { title, category, summary, issue, publisher, language };
                Magazine.update(id, updates, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({
                            id: id,
                            title: title,
                            category: category,
                            summary: summary,
                            issue: issue,
                            publisher: publisher,
                            language: language,
                        });
                    }
                });
            });
        },
        deleteMagazine: (_, { id }) => {
            return new Promise((resolve, reject) => {
                Magazine.delete(id, (err, affectedRows) => {
                    if (err) {
                        reject(err);
                    } else {
                        if (affectedRows === 0) {
                            const error = new Error(`Magazine with ID ${id} does not exist.`);
                            reject(error);
                        } else {
                            resolve({ success: true });
                        }
                    }
                });
            });
        },
        createAudiovisual: (_, { title, format, content, production, language }) => {
            return new Promise((resolve, reject) => {
                const audiovisual = new Audiovisual(title, format, content, production, language);
                audiovisual.save((err, savedAudiovisualId) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({
                            id: savedAudiovisualId,
                            title: title,
                            format: format,
                            content: content,
                            production: production,
                            language: language,
                        });
                    }
                });
            });
        },
        updateAudiovisual: (_, { id, title, format, content, production, language }) => {
            return new Promise((resolve, reject) => {
                const updates = { title, format, content, production, language };
                Audiovisual.update(id, updates, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({
                            id: id,
                            title: title,
                            format: format,
                            content: content,
                            production: production,
                            language: language,
                        });
                    }
                });
            });
        },
        deleteAudiovisual: (_, { id }) => {
            return new Promise((resolve, reject) => {
                Audiovisual.delete(id, (err, affectedRows) => {
                    if (err) {
                        reject(err);
                    } else {
                        if (affectedRows === 0) {
                            const error = new Error(`Audiovisual with ID ${id} does not exist.`);
                            reject(error);
                        } else {
                            resolve({ success: true });
                        }
                    }
                });
            });
        },
    },
};

module.exports = resolvers;
