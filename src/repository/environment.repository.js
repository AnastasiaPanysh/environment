const { pool } = require('../DB')

class EnvoronmentDB {



    async getEnvironmentDB() {
        const client = await pool.connect()
        const sql = 'select * from environment'
        const data = (await client.query(sql)).rows
        return data
    }

    async getEnvironmentByIdDB(id) {
        const client = await pool.connect()
        const sql = 'select * from environment where id=$1'
        const data = (await client.query(sql, [id])).rows
        return data
    }



    async createEnvironmentDB(label, category, priority) {
        const client = await pool.connect()
        const sql = 'insert into environment(label, category, priority) values($1,$2,$3) returning *'
        const data = (await client.query(sql, [label, category, priority])).rows
        return data
    }

    async updateEnvironmentDB(id, label, category, priority) {
        const client = await pool.connect()
        const sql = 'update environment set label = $1, category = $2, priority =$3 where id=$4 returning *'
        const data = (await client.query(sql, [label, category, priority, id])).rows
        return data
    }

    async patchEnvironmentDB(id, dataFromClient) {
        const client = await pool.connect()
        const sql = 'select * from environment where id = $1'
        const data = (await client.query(sql, [id])).rows[0]
        const mergeData = { ...data, ...dataFromClient }
        const sql2 = 'update environment set label = $1, category = $2, priority =$3 where id=$4 returning *'
        const data2 = (await client.query(sql2, [mergeData.label, mergeData.category, mergeData.priority, id])).rows
        return data2
    }

    async deleteEnvironmentDB(id) {
        const client = await pool.connect()
        const sql = 'delete from environment where id=$1 returning *'
        const data = (await client.query(sql, [id])).rows
        return data
    }
}


module.exports = { EnvoronmentDB }