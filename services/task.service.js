import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const {Pool} = pg

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

await pool.query(`
    CREATE TABLE IF NOT EXISTS tasks (
        id UUID PRIMARY KEY,
        title TEXT NOT NULL,
        completed  BOOLEAN DEFAULT FALSE
    )
`)

export async function getAllTasks(){
    const data = await pool.query('SELECT * FROM tasks')
    return data.rows || []
}

export async function createTask({id, title, completed}){
    const data = await pool.query('INSERT INTO tasks (id, title, completed) VALUES ($1, $2, $3) RETURNING *', [id, title, completed])
    const result = data.rows[0]
    return result
}

export async function updateTask(id, {title, completed}){
    const data = await pool.query('UPDATE tasks SET title = $1, completed = $2 WHERE id = $3 RETURNING *', [title, completed, id])
    return data.rows[0]
}

export async function deleteTask(id){
    const data = await pool.query('DELETE FROM tasks WHERE id = $1', [id])
    return res.rowCount > 0
}
