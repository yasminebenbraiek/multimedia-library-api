const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { Audiovisual } = require('./models');

const audiovisualProtoPath = 'audiovisual.proto';
const audiovisualProtoDefinition = protoLoader.loadSync(audiovisualProtoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

const audiovisualProto = grpc.loadPackageDefinition(audiovisualProtoDefinition).audiovisual;
const audiovisualService = {
    getAudiovisual: (call, callback) => {
        const { audiovisual_id } = call.request;
        Audiovisual.getById(audiovisual_id, (err, audiovisual) => {
            if (err) {
                console.error('Error retrieving audiovisual:', err);
                return callback({ message: 'Internal server error' });
            }
            if (!audiovisual) {
                return callback({ message: 'Audiovisual not found' });
            }
            callback(null, { audiovisual });
        });
    },
    getAllAudiovisuals: (call, callback) => {
        Audiovisual.getAll((err, audiovisuals) => {
            if (err) {
                console.error('Error retrieving audiovisuals:', err);
                return callback({ message: 'Internal server error' });
            }
            callback(null, { audiovisuals });
        });
    },
    createAudiovisual: (call, callback) => {
        const { title, format, content, production, language } = call.request;
        const audiovisual = new Audiovisual( title, format, content, production, language);
        audiovisual.save((err, savedAudiovisualId) => {
            if (err) {
                console.error('Error creating audiovisual:', err);
                return callback({ message: 'Internal server error' });
            }
            callback(null, { id : savedAudiovisualId });
        });
    },
    updateAudiovisual: (call, callback) => {
        const { audiovisual_id, title, format, content, production, language } = call.request;
        const updates = { title, format, content, production, language };
        Audiovisual.update(audiovisual_id, updates, (err,audiovisual) => {
            if (err) {
                console.error('Error updating audiovisual:', err);
                return callback({ message: 'Internal server error' });
            }
            callback(null, {audiovisual});
        });
    },
    deleteAudiovisual: (call, callback) => {
        const { audiovisual_id } = call.request;
        Audiovisual.delete(audiovisual_id, (err,audiovisual_id) => {
            if (err) {
                console.error('Error deleting audiovisual:', err);
                return callback({ message: 'Internal server error' });
            }
            callback(null, { audiovisual_id });
        });
    },
};

const server = new grpc.Server();
server.addService(audiovisualProto.AudiovisualService.service, audiovisualService);
const port = 50053;
server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), (err, boundPort) => {
    if (err) {
        console.error('Failed to bind server:', err);
        return;
    }
    console.log(`Server is running on port ${boundPort}`);
    server.start();
});
console.log(`Audiovisual microservice running on port ${port}`);
