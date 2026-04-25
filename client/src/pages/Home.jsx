import { useEffect, useState } from "react";
import { api } from "../services/api";
import Header from "../components/Header";
import '../styles/theme.css'
import '../styles/common.css'

function HomePage() {
    const [count, setCount] = useState(0)
    const [alunos, setAlunos] = useState([]);
    useEffect(() => {
        api.get("/Aluno/get")
        .then(res => setAlunos(res.data))
        .catch(err => console.error(err));
    }, []);

    return (
    <>
        <Header></Header>
        <main>
            <h1>Home Page</h1>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </main>
    </>
    )
}

export default HomePage
