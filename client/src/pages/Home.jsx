import { useEffect, useState } from "react";
import { api } from "../services/api";

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
        <h1>Home Page</h1>
    </>
    )
}

export default HomePage
