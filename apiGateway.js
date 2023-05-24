const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const bodyParser = require('body-parser');
const cors = require('cors');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const bookProtoPath = 'book.proto';
const magazineProtoPath = 'magazine.proto';
const audiovisualProtoPath = 'audiovisual.proto';

const resolvers = require('./resolvers');
const typeDefs = require('./schema');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const bookProtoDefinition = protoLoader.loadSync(bookProtoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

const magazineProtoDefinition = protoLoader.loadSync(magazineProtoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

const audiovisualProtoDefinition = protoLoader.loadSync(audiovisualProtoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

const bookProto = grpc.loadPackageDefinition(bookProtoDefinition).book;
const magazineProto = grpc.loadPackageDefinition(magazineProtoDefinition).magazine;
const audiovisualProto = grpc.loadPackageDefinition(audiovisualProtoDefinition).audiovisual;

const clientBooks = new bookProto.BookService(
    'localhost:50051',
    grpc.credentials.createInsecure()
);

const clientMagazines = new magazineProto.MagazineService(
    'localhost:50052',
    grpc.credentials.createInsecure()
);

const clientaudiovisuals = new audiovisualProto.AudiovisualService(
    'localhost:50053',
    grpc.credentials.createInsecure()
);

const server = new ApolloServer({ typeDefs, resolvers });
server.start().then(() => {
    app.use(
        cors(),
        bodyParser.json(),
        expressMiddleware(server),
    );
});

app.get('/books', (req, res) => {
    clientBooks.getAllBooks({}, (err, response) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(response.books);
        }
    });
});

app.get('/books/:id', (req, res) => {
    const id = req.params.id;
    clientBooks.getBook({ book_id: id }, (err, response) => {
        if (err) {
            res.status(500).send(err);
        } else if (!response.book) {
            res.status(404).send('Book not found');
        } else {
            res.json(response.book);
        }
    });
});

app.post('/books', (req, res) => {
    const { id, title, author, description, language, publisher } = req.body;
    clientBooks.createBook(
        {
            book_id: id,
            title: title,
            author: author,
            description: description,
            language: language,
            publisher: publisher,
        },
        (err, response) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(response.book);
            }
        }
    );
});

app.put('/books/:id', (req, res) => {
    const id = req.params.id;
    const { title, author, description, language, publisher } = req.body;
    clientBooks.updateBook(
        {
            book_id: id,
            title: title,
            author: author,
            description: description,
            language: language,
            publisher: publisher,
        },
        (err, response) => {
            if (err) {
                res.status(500).send(err);
            } else if (!response.book) {
                res.status(404).send('Book not found');
            } else {
                res.json(response.book);
            }
        }
    );
});

app.delete('/books/:id', (req, res) => {
    const id = req.params.id;
    clientBooks.deleteBook({ book_id: id }, (err, response) => {
        if (err) {
            res.status(500).send(err);
        } else if (!response.success) {
            res.status(404).send('Book not found');
        } else {
            res.sendStatus(204);
        }
    });
});

app.get('/magazines', (req, res) => {
    clientMagazines.getAllMagazines({}, (err, response) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(response.magazines);
        }
    });
});

app.get('/magazines/:id', (req, res) => {
    const id = req.params.id;
    clientMagazines.getMagazine({ magazine_id: id }, (err, response) => {
        if (err) {
            res.status(500).send(err);
        } else if (!response.magazine) {
            res.status(404).send('Magazine not found');
        } else {
            res.json(response.magazine);
        }
    });
});

app.post('/magazines', (req, res) => {
    const { id, title, category, summary, issue, publisher, language } = req.body;
    clientMagazines.createMagazine(
        {
            magazine_id: id,
            title: title,
            category: category,
            summary: summary,
            issue: issue,
            publisher: publisher,
            language: language,
        },
        (err, response) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(response.magazine);
            }
        }
    );
});

app.put('/magazines/:id', (req, res) => {
    const id = req.params.id;
    const { title, category, summary, issue, publisher, language } = req.body;
    clientMagazines.updateMagazine(
        {
            magazine_id: id,
            title: title,
            category: category,
            summary: summary,
            issue: issue,
            publisher: publisher,
            language: language,
        },
        (err, response) => {
            if (err) {
                res.status(500).send(err);
            } else if (!response.magazine) {
                res.status(404).send('Magazine not found');
            } else {
                res.json(response.magazine);
            }
        }
    );
});

app.delete('/magazines/:id', (req, res) => {
    const id = req.params.id;
    clientMagazines.deleteMagazine({ magazine_id: id }, (err, response) => {
        if (err) {
            res.status(500).send(err);
        } else if (!response.success) {
            res.status(404).send('Magazine not found');
        } else {
            res.sendStatus(204);
        }
    });
});

app.get('/audiovisuals', (req, res) => {
    clientaudiovisuals.getAllAudiovisuals({}, (err, response) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(response.audiovisuals);
        }
    });
});

app.get('/audiovisuals/:id', (req, res) => {
    const id = req.params.id;
    clientaudiovisuals.getAudiovisual({ audiovisual_id: id }, (err, response) => {
        if (err) {
            res.status(500).send(err);
        } else if (!response.audiovisual) {
            res.status(404).send('Audiovisual not found');
        } else {
            res.json(response.audiovisual);
        }
    });
});

app.post('/audiovisuals', (req, res) => {
    const { id, title, format, content, production, language } = req.body;
    clientaudiovisuals.createAudiovisual(
        {
            audiovisual_id: id,
            title: title,
            format: format,
            content: content,
            production: production,
            language: language,
        },
        (err, response) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(response.audiovisual);
            }
        }
    );
});

app.put('/audiovisuals/:id', (req, res) => {
    const id = req.params.id;
    const { title, format, content, production, language } = req.body;
    clientaudiovisuals.updateAudiovisual(
        {
            audiovisual_id: id,
            title: title,
            format: format,
            content: content,
            production: production,
            language: language,
        },
        (err, response) => {
            if (err) {
                res.status(500).send(err);
            } else if (!response.audiovisual) {
                res.status(404).send('Audiovisual not found');
            } else {
                res.json(response.audiovisual);
            }
        }
    );
});

app.delete('/audiovisuals/:id', (req, res) => {
    const id = req.params.id;
    clientaudiovisuals.deleteAudiovisual({ audiovisual_id: id }, (err, response) => {
        if (err) {
            res.status(500).send(err);
        } else if (!response.audiovisual_id) {
            res.status(404).send('Audiovisual not found');
        } else {
            res.sendStatus(204);
        }
    });
});


const port = 3000;
app.listen(port, () => {
    console.log(`API Gateway running on port ${port}`);
});
