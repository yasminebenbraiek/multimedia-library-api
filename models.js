const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    }
    console.log('Database connected.');
});

db.run(`CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    author TEXT,
    description TEXT,
    language TEXT,
    publisher TEXT
)`);

db.run(`CREATE TABLE IF NOT EXISTS magazines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    category TEXT,
    summary TEXT,
    issue TEXT,
    publisher TEXT,
    language TEXT
)`);

db.run(`CREATE TABLE IF NOT EXISTS audiovisuals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    format TEXT,
    content TEXT,
    production TEXT,
    language TEXT
)`);

db.run(`CREATE TABLE IF NOT EXISTS audiovisuals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    format TEXT,
    content TEXT,
    production TEXT,
    language TEXT
)`);

class Book {
    constructor(title, author, description, language, publisher) {
        this.title = title;
        this.author = author;
        this.description = description;
        this.language = language;
        this.publisher = publisher;
    }

    save(callback) {
        db.run(
            `INSERT INTO books (title, author, description, language, publisher) VALUES (?, ?, ?, ?, ?)`,
            [this.title, this.author, this.description, this.language, this.publisher],
            function (err) {
                if (err) {
                    console.error(err.message);
                    return callback(err);
                }
                console.log(`Book added with ID ${this.lastID}`);
                callback(null, this.lastID);
            }
        );
    }

    static getById(id, callback) {
        db.get(
            'SELECT * FROM books WHERE id = ?',
            [id],
            function (err, row) {
                if (err) {
                    console.error(err.message);
                    return callback(err);
                }
                if (!row) {
                    callback(null, null);
                } else {
                    const book = new Book(row.title, row.author, row.description, row.language, row.publisher);
                    book.id = row.id;
                    callback(null, book);
                }
            }
        );
    }

    static getAll(callback) {
        db.all('SELECT * FROM books', function (err, rows) {
            if (err) {
                console.error(err.message);
                return callback(err);
            }
            const books = rows.map((row) => {
                const book = new Book(row.title, row.author, row.description, row.language, row.publisher);
                book.id = row.id;
                return book;
            });
            callback(null, books);
        });
    }

    static update(id, updates, callback) {
        const { title, author, description, language, publisher } = updates;
        db.run(
            'UPDATE books SET title = ?, author = ?, description = ?, language = ?, publisher = ? WHERE id = ?',
            [title, author, description, language, publisher, id],
            function (err) {
                if (err) {
                    console.error(err.message);
                    return callback(err);
                }
                console.log(`Book ${id} updated.`);
                callback(null);
            }
        );
    }

    static delete(id, callback) {
        db.run('DELETE FROM books WHERE id = ?', [id], function (err) {
            if (err) {
                console.error(err.message);
                return callback(err);
            }
            console.log(`Book ${id} deleted.`);
            callback(null, this.changes);
        });
    }
}

class Magazine {
    constructor(title, category, summary, issue, publisher, language) {
        this.title = title;
        this.category = category;
        this.summary = summary;
        this.issue = issue;
        this.publisher = publisher;
        this.language = language;
    }

    save(callback) {
        db.run(
            `INSERT INTO magazines (title, category, summary, issue, publisher, language) VALUES (?, ?, ?, ?, ?, ?)`,
            [this.title, this.category, this.summary, this.issue, this.publisher, this.language],
            function (err) {
                if (err) {
                    console.error(err.message);
                    return callback(err);
                }
                console.log(`Magazine added with ID ${this.lastID}`);
                callback(null, this.lastID);
            }
        );
    }

    static getById(id, callback) {
        db.get(
            'SELECT * FROM magazines WHERE id = ?',
            [id],
            function (err, row) {
                if (err) {
                    console.error(err.message);
                    return callback(err);
                }
                if (!row) {
                    callback(null, null);
                } else {
                    const magazine = new Magazine(row.title, row.category, row.summary, row.issue, row.publisher, row.language);
                    magazine.id = row.id;
                    callback(null, magazine);
                }
            }
        );
    }

    static getAll(callback) {
        db.all('SELECT * FROM magazines', function (err, rows) {
            if (err) {
                console.error(err.message);
                return callback(err);
            }
            const magazines = rows.map((row) => {
                const magazine = new Magazine(row.title, row.category, row.summary, row.issue, row.publisher, row.language);
                magazine.id = row.id;
                return magazine;
            });
            callback(null, magazines);
        });
    }

    static update(id, updates, callback) {
        const { title, category, summary, issue, publisher, language } = updates;
        db.run(
            'UPDATE magazines SET title = ?, category = ?, summary = ?, issue = ?, publisher = ?, language = ? WHERE id = ?',
            [title, category, summary, issue, publisher, language, id],
            function (err) {
                if (err) {
                    console.error(err.message);
                    return callback(err);
                }
                console.log(`Magazine ${id} updated.`);
                callback(null);
            }
        );
    }

    static delete(id, callback) {
        db.run('DELETE FROM magazines WHERE id = ?', [id], function (err) {
            if (err) {
                console.error(err.message);
                return callback(err);
            }
            console.log(`Magazine ${id} deleted.`);
            callback(null, this.changes);
        });
    }
}


class Audiovisual {
    constructor(title, format, content, production, language) {
        this.title = title;
        this.format = format;
        this.content = content;
        this.production = production;
        this.language = language;
    }

    save(callback) {
        db.run(
            `INSERT INTO audiovisuals (title, format, content, production, language) VALUES (?, ?, ?, ?, ?)`,
            [this.title, this.format, this.content, this.production, this.language],
            function (err) {
                if (err) {
                    console.error(err.message);
                    return callback(err);
                }
                console.log(`Audiovisual added with ID ${this.lastID}`);
                callback(null, this.lastID);
            }
        );
    }

    static getById(id, callback) {
        db.get(
            'SELECT * FROM audiovisuals WHERE id = ?',
            [id],
            function (err, row) {
                if (err) {
                    console.error(err.message);
                    return callback(err);
                }
                if (!row) {
                    callback(null, null);
                } else {
                    const audiovisual = new Audiovisual(row.title, row.format, row.content, row.production, row.language);
                    audiovisual.id = row.id;
                    callback(null, audiovisual);
                }
            }
        );
    }

    static getAll(callback) {
        db.all('SELECT * FROM audiovisuals', function (err, rows) {
            if (err) {
                console.error(err.message);
                return callback(err);
            }
            const audiovisuals = rows.map((row) => {
                const audiovisual = new Audiovisual(row.title, row.format, row.content, row.production, row.language);
                audiovisual.id = row.id;
                return audiovisual;
            });
            callback(null, audiovisuals);
        });
    }

    static update(id, updates, callback) {
        const { title, format, content, production, language } = updates;
        db.run(
            'UPDATE audiovisuals SET title = ?, format = ?, content = ?, production = ?, language = ? WHERE id = ?',
            [title, format, content, production, language, id],
            function (err) {
                if (err) {
                    console.error(err.message);
                    return callback(err);
                }
                console.log(`Audiovisual ${id} updated.`);
                callback(null);
            }
        );
    }

    static delete(id, callback) {
        db.run('DELETE FROM audiovisuals WHERE id = ?', [id], function (err) {
            if (err) {
                console.error(err.message);
                return callback(err);
            }
            console.log(`Audiovisual ${id} deleted.`);
            callback(null, this.changes);
        });
    }
}

module.exports = {
    Book,
    Magazine,
    Audiovisual,
};



