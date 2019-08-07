const { MongoClient } = require('mongodb')
const { BadRequestError } = require('./errors')

const DB_NAME = 'home'
const DB_URL = 'mongodb://root:root@db:27017';

async function getDb() {
    const client = new MongoClient(DB_URL);
    try {
        // Use connect method to connect to the Server
        await client.connect();
        return client.db(DB_NAME);
    } catch (err) {
        throw new HomeError(`Unable to connect with MongoDB database: ${err.stack}`)
    }
}

async function getNextSequence(name) {
    const db = await getDb()
    const res = await db
        .collection("counters")
        .findOneAndUpdate( { _id: name }, { $inc: { seq: 1 } }, { upsert: true})
    return res
}

class Collection {
    constructor(colName) {
        this.colName = colName
    }

    async getAll(page, limit) {
        const db = await getDb()
        return await db
            .collection(this.colName)
            .find({})
            .skip(page * limit)
            .limit(limit)
            .toArray()
    }

    async getById(id) {
        const db = await getDb()
        return await db
            .collection(this.colName)
            .findOne({ id: parseInt(id) })
    }

    async create(item) {
        const seqName = `${this.colName}_id`
        const db = await getDb()
        const res = await getNextSequence(seqName)
        if (res.ok) {
            const id = await db.collection('counters').findOne({ _id: seqName }, { seq: 1})
            const result = await db.collection(this.colName).insertOne({...item, id: id.seq })
            return result
        } else {
            throw new BadRequestError(`Document not created correctly in collection "${this.colName}"`)
        }
    }
}

module.exports = {
    Collection,
}
