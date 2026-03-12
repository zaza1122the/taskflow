import { useState, useEffect } from "react";
import "./index.css";

function App() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [tasks, setTasks] = useState([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("TODO");



    const getTasks = async () => {

        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:8080/api/tasks", {
            headers: {
                Authorization: "Bearer " + token
            }
        });

        if (!response.ok) return;

        const data = await response.json();

        setTasks(data);

    };



    const login = async () => {

        const response = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const token = await response.text();

        localStorage.setItem("token", token);

        setLoggedIn(true);

        await getTasks();

    };



    const logout = () => {

        localStorage.removeItem("token");

        setLoggedIn(false);

    };



    const addTask = async () => {

        const token = localStorage.getItem("token");

        await fetch("http://localhost:8080/api/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            },
            body: JSON.stringify({
                title,
                description,
                status
            })
        });

        setTitle("");
        setDescription("");
        setStatus("TODO");

        await getTasks();

    };



    const deleteTask = async (id) => {

        const token = localStorage.getItem("token");

        await fetch(`http://localhost:8080/api/tasks/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + token
            }
        });

        await getTasks();

    };



    const updateTaskStatus = async (task, newStatus) => {

        const token = localStorage.getItem("token");

        await fetch(`http://localhost:8080/api/tasks/${task.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            },
            body: JSON.stringify({
                title: task.title,
                description: task.description,
                status: newStatus
            })
        });

        await getTasks();

    };



    useEffect(() => {

        const token = localStorage.getItem("token");

        if (token) {
            setLoggedIn(true);
            getTasks();
        }

    }, []);



    return (

        <div className="container">

            {!loggedIn ? (

                <div className="loginCard">

                    <h1>TaskFlow</h1>

                    <input
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button onClick={login}>Login</button>

                </div>

            ) : (

                <div className="dashboard">

                    <div className="header">

                        <h1>TaskFlow Dashboard</h1>

                        <button onClick={logout}>Logout</button>

                    </div>



                    <div className="taskForm">

                        <h2>Add Task</h2>

                        <input
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <input
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="TODO">TODO</option>
                            <option value="IN_PROGRESS">IN_PROGRESS</option>
                            <option value="DONE">DONE</option>
                        </select>

                        <button onClick={addTask}>Add Task</button>

                        <button onClick={getTasks}>Refresh</button>

                    </div>



                    <div className="kanban">

                        <div className="column">

                            <h2>TODO</h2>

                            {tasks
                                .filter(t => t.status === "TODO")
                                .map(task => (

                                    <div key={task.id} className="taskCard">

                                        <h3>{task.title}</h3>
                                        <p>{task.description}</p>

                                        <select
                                            value={task.status}
                                            onChange={(e)=>updateTaskStatus(task,e.target.value)}
                                        >
                                            <option value="TODO">TODO</option>
                                            <option value="IN_PROGRESS">IN_PROGRESS</option>
                                            <option value="DONE">DONE</option>
                                        </select>

                                        <button onClick={()=>deleteTask(task.id)}>
                                            Delete
                                        </button>

                                    </div>

                                ))}

                        </div>



                        <div className="column">

                            <h2>IN PROGRESS</h2>

                            {tasks
                                .filter(t => t.status === "IN_PROGRESS")
                                .map(task => (

                                    <div key={task.id} className="taskCard">

                                        <h3>{task.title}</h3>
                                        <p>{task.description}</p>

                                        <select
                                            value={task.status}
                                            onChange={(e)=>updateTaskStatus(task,e.target.value)}
                                        >
                                            <option value="TODO">TODO</option>
                                            <option value="IN_PROGRESS">IN_PROGRESS</option>
                                            <option value="DONE">DONE</option>
                                        </select>

                                        <button onClick={()=>deleteTask(task.id)}>
                                            Delete
                                        </button>

                                    </div>

                                ))}

                        </div>



                        <div className="column">

                            <h2>DONE</h2>

                            {tasks
                                .filter(t => t.status === "DONE")
                                .map(task => (

                                    <div key={task.id} className="taskCard">

                                        <h3>{task.title}</h3>
                                        <p>{task.description}</p>

                                        <select
                                            value={task.status}
                                            onChange={(e)=>updateTaskStatus(task,e.target.value)}
                                        >
                                            <option value="TODO">TODO</option>
                                            <option value="IN_PROGRESS">IN_PROGRESS</option>
                                            <option value="DONE">DONE</option>
                                        </select>

                                        <button onClick={()=>deleteTask(task.id)}>
                                            Delete
                                        </button>

                                    </div>

                                ))}

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}

export default App;