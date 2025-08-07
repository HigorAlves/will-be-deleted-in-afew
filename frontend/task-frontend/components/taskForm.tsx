
interface Props {
    onTaskCreated: () => void
}

export function TaskForm({onTaskCreated}: Props) {
    const [title, setTitle] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!title.trim()) return
        // TODO create this function
        await createTask(title)
        setTitle('')
        onTaskCreated()
    }
}