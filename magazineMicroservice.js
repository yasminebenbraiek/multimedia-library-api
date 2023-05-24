const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { Magazine } = require('./models');

const magazineProtoPath = 'magazine.proto';
const magazineProtoDefinition = protoLoader.loadSync(magazineProtoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
const magazineProto = grpc.loadPackageDefinition(magazineProtoDefinition).magazine;
const magazineService = {
    getMagazine: (call, callback) => {
        const { magazine_id } = call.request;
        Magazine.getById(magazine_id, (err, magazine) => {
            if (err) {
                console.error('Error retrieving magazine:', err);
                return callback({ message: 'Internal server error' });
            }
            if (!magazine) {
                return callback({ message: 'Magazine not found' });
            }
            callback(null, { magazine });
        });
    },
    getAllMagazines: (call, callback) => {
        Magazine.getAll((err, magazines) => {
            if (err) {
                console.error('Error retrieving magazines:', err);
                return callback({ message: 'Internal server error' });
            }
            callback(null, { magazines });
        });
    },
    createMagazine: (call, callback) => {
        const {title, category, summary, issue, publisher, language } = call.request;
        const magazine = new Magazine(title, category, summary, issue, publisher, language);
        magazine.save((err, savedMagazineId) => {
            if (err) {
                console.error('Error creating magazine:', err);
                return callback({ message: 'Internal server error' });
            }
            callback(null, { magazine_id: savedMagazineId });
        });
    },
    updateMagazine: (call, callback) => {
        const { magazine_id, title, category, summary, issue, publisher, language } = call.request;
        const updates = { title, category, summary, issue, publisher, language };
        Magazine.update(magazine_id, updates, (err) => {
            if (err) {
                console.error('Error updating magazine:', err);
                return callback({ message: 'Internal server error' });
            }
            callback(null, {});
        });
    },
    deleteMagazine: (call, callback) => {
        const { magazine_id } = call.request;
        Magazine.delete(magazine_id, (err) => {
            if (err) {
                console.error('Error deleting magazine:', err);
                return callback({ message: 'Internal server error' });
            }
            callback(null, { magazine_id });
        });
    },
};

const server = new grpc.Server();
server.addService(magazineProto.MagazineService.service, magazineService);
const port = 50052;
server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), (err, boundPort) => {
    if (err) {
        console.error('Failed to bind server:', err);
        return;
    }
    console.log(`Server is running on port ${boundPort}`);
    server.start();
});
console.log(`Magazine microservice running on port ${port}`);
