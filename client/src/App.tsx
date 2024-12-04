
import { useEffect, useRef, useState } from "react";

interface TaskType {
    id: number;
    category: string;
    title: string;
    status: "pending" | "completed";
    description: string;
}

const initialTasks: TaskType[] = [
    {
        "id": 1,
        "category": "Shopping",
        "title": "Shopping",
        "status": "pending",
        "description": "Get essentials from Trader Joe's"
    },
    {
        "id": 2,
        "category": "Shopping",
        "title": "Shoes",
        "status": "pending",
        "description": "Purchase running shoes"
    },
    {
        "id": 3,
        "category": "Work",
        "title": "Presentation",
        "status": "completed",
        "description": "Create slides for team meeting"
    },
    {
        "id": 4,
        "category": "Work",
        "title": "Review",
        "status": "pending",
        "description": "Review frontend team's pull request"
    },
    {
        "id": 5,
        "category": "Home",
        "title": "Garage",
        "status": "pending",
        "description": "Organize tools and discard unnecessary items"
    },
    {
        "id": 6,
        "category": "Home",
        "title": "Plants",
        "status": "completed",
        "description": "Water indoor and outdoor plants"
    },
    {
        "id": 7,
        "category": "Health",
        "title": "Exercise",
        "status": "pending",
        "description": "Complete 30-minute yoga session"
    },
    {
        "id": 8,
        "category": "Health",
        "title": "Appointment",
        "status": "pending",
        "description": "Visit dentist for routine check-up"
    }
]



const TaskCard: React.FC<{
    task: TaskType
    handleTaskComplete: (id: number) => void
    handleDeleteTask: (id: number) => void
}> = ({ task, handleTaskComplete, handleDeleteTask }) => {

    return <div style={{
        width: "500px",
        height: "90px",
        border: "1px solid black",
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        margin: "10px",
        background: task.status === "completed" ? "lightgreen" : "white"
    }}>
        <div>
            <p>{task.title}</p>
            <p>{task.description}</p>
        </div>
        <div>
            <button onClick={() => {
                handleTaskComplete(task.id)
            }}>Done</button>
            <button onClick={() => { handleDeleteTask(task.id) }}>Delete</button>
        </div>
    </div>
}


const App = () => {
    const [newTaskFormData, setNewTaskFormData] = useState<null | {
        title: string,
        description: string
        category: string
    }>(null)
    const [searchDraft, setSearchDraft] = useState("")
    const [search, setSearch] = useState("")
    const [tasks, setTasks]: [TaskType[], any] = useState(initialTasks)

    const handleSearch = (e) => {
        setSearch(searchDraft)
    }

    const handleCancel = () => {
        setSearch("")
        setSearchDraft("")
    }

    const handleAddNewTask: (title: string, description: string, category: string) => void = (
        title,
        description,
        category
    ) => {
        setTasks(prev => ([{
            id: Math.random(),
            category,
            title,
            status: "pending",
            description
        }, ...prev]))
        setNewTaskFormData(null)
    }

    const handleTaskComplete = (id: number) => {

        setTasks(prev => {
            return prev.map(prevTask => {
                if (prevTask.id === id) {
                    return {
                        ...prevTask,
                        status: "completed"
                    }
                }
                return prevTask
            })
        })

    }

    const handleDeleteTask = (id: number) => {
        setTasks(prev => {
            return prev.filter(prevTask => prevTask.id !== id)
        })
    }

    return <div style={{
        margin: "30px"
    }}>
        <div>
            <button onClick={() => {
                setNewTaskFormData({
                    title: "",
                    category: "",
                    description: ""
                })
            }}>Add Task</button>

            <input
                placeholder="Search by category" onChange={(e) => {
                    setSearchDraft(e.target.value)
                }} />
            <button onClick={handleSearch}>Search</button>

            <button onClick={handleCancel}>Cancel</button>
        </div >

        {
            newTaskFormData ? <div style={{
                padding: "5px",
                margin: "5px",
                border: "1px solid black"
            }}>
                <div>
                    <p>Title</p>
                    <input value={newTaskFormData.title}
                        onChange={(e) => {
                            setNewTaskFormData(prev => ({
                                ...prev,
                                title: e.target.value
                            }))
                        }}
                    ></input>
                </div>
                <div>
                    <p>Description</p>
                    <input value={newTaskFormData.description}
                        onChange={(e) => {
                            setNewTaskFormData(prev => ({
                                ...prev,
                                description: e.target.value
                            }))
                        }}
                    ></input>
                </div>
                <div>
                    <p>Category</p>
                    <input value={newTaskFormData.category}
                        onChange={(e) => {
                            setNewTaskFormData(prev => ({
                                ...prev,
                                category: e.target.value
                            }))
                        }}
                    ></input>
                </div>

                <button onClick={() => {
                    handleAddNewTask(newTaskFormData.title, newTaskFormData.description, newTaskFormData.category)
                }}>Add</button>
                <button
                    onClick={() => {
                        setNewTaskFormData(null)
                    }}>Cancel</button>

            </div> : null
        }
        <div>{
            tasks?.filter(task => {
                if (search) {
                    return task.category.includes(search)
                }
                return true
            }).map((task) => {
                return <TaskCard task={task} key={task.id}
                    handleTaskComplete={handleTaskComplete}
                    handleDeleteTask={handleDeleteTask}
                />
            })
        }</div>

    </div >
}

export default App