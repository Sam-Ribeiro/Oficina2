import { useEffect, useState } from "react";
import { api } from "../services/api";
import Header from "../components/Header";
import SideNav from "../components/SideNav";
import '../styles/theme.css'
import '../styles/common.css'

function AlunosPage() {
    const [open, setOpen] = useState(true);
    const toggleNav = () => {
        setOpen(prev => !prev);
    };

    const [alunos, setAlunos] = useState([]);
    useEffect(() => {
        api.get("/Aluno/get")
        .then(res => setAlunos(res.data))
        .catch(err => console.error(err));
    }, []);

    return (
    <>
        <Header onToggleNav={toggleNav}></Header>
        <div className="container">
            <SideNav pageIndex={5} open={open}></SideNav>
            <main>
                <h1>Alunos Page</h1>
            </main>
        </div>
    </>
    )
}

export default AlunosPage
