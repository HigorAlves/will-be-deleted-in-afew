import {useEffect} from "react";

type Task = {
    id: string
    title: string
    completed: boolean
}

export function TaskList() {
    const [tasks, setTasks] = useState<Task[]>([])

    const fetchData = async () => {
        const data = await getTasks();
        setTasks(res.data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleToggle = async (task: Task) => {
        // TODO create those ones once we finish our comp
        await updateTask(task.id, {...task, completed: !task.completed})
        fetchData()
    }

    const handleDelete= async (id: string) => {
        await deleteTask(id)
        fetchData()
    }

    return <ul>
        {tasks.map(item => (
            <li key={item.id}>
                <input
                    type='checkbox'
                    checked={item.completed}
                    onChange={() => handleToggle(task)}
                />
                <p>{item.title}</p>
                <button onClick={() => handleDelete(item.id)}>DELETE</button>
            </li>
        ))}
    </ul>
}