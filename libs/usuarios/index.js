const DaoObject = require('../../dao/DaoObject');

module.exports = class Usuario {
    usuarioDao = null;

    constructor(usuarioDao = null) {
        if (!(usuarioDao instanceof DaoObject)) {
            throw new Error('An Instance of DAO Object is Required');
        }
        this.usuarioDao = usuarioDao;
    }
    async init() {
        await this.usuarioDao.init();
        await this.usuarioDao.setup();
    }

    async getVersion() {
        return {
            entity: 'Usuarios',
            version: '1.0.0',
            description: 'CRUD de Usuarios'
        };
    }

    async addUsuarios({
            name,
            email,
            status,
            password,
            avatar
    }) {
        const result = await this.usuarioDao.insertOne({
            name,
            email,
            status,
            password,
            avatar
        });
        return {
            name,
            email,
            status,
            password,
            avatar,
            id: result.lastID
        };
    };

    async getUsuarios() {
        return this.usuarioDao.getAll();
    }

    async getUsuarioById({
        codigo
    }) {
        return this.usuarioDao.getById({
            codigo
        });
    }

    async updateUsuario({
            name,
            email,
            status,
            password,
            avatar,
            codigo
    }) {
        const result = await this.usuarioDao.updateOne({
            codigo,
            name,
            email,
            status,
            password,
            avatar
        });
        return {
            name,
            email,
            status,
            password,
            avatar,
            codigo,
            modified: result.changes
        }
    }

    async deleteUsuario({
        codigo
    }) {
        const usuarioToDelete = await this.usuarioDao.getById({
            codigo
        });
        const result = await this.usuarioDao.deleteOne({
            codigo
        });
        return {
            ...usuarioToDelete,
            deleted: result.changes
        };
    }
}