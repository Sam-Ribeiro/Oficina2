import { useEffect, useState } from "react";
import { api } from "../services/api";
import Header from "../components/Header";
import SideNav from "../components/SideNav";
import PersonTable from "../components/PersonTable";
import TableHeader from "../components/TableHeader";
import '../styles/theme.css'
import '../styles/common.css'

function AlunosPage() {
    const [open, setOpen] = useState(true);
    const toggleNav = () => {
        setOpen(prev => !prev);
    };

    const [person, setPerson] = useState([]);
    const [selectedPerson, setSelectedPerson] = useState(null);

    const fetchPersons = async () => {
        try {
            const res = await api.get("/Aluno/get");
            setPerson(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchPersons();
    }, []);

    const handleDelete = async () => {
        if (!selectedPerson){ 
            console.warn("Nenhum aluno selecionado para deletar.");
            return;}

        try {
            console.log("Deletando aluno com ID:", selectedPerson);
            await api.delete(`/Aluno/delete/${selectedPerson}`);
            await fetchPersons();
            setSelectedPerson(null);
        } catch (error) {
            console.error("Erro ao deletar aluno:", error);
        }
    };

    /*const [person, setPerson] = useState([
        { id: 1, nome: 'Samuel', idade: 22 },
        { id: 2, nome: 'João', idade: 20 },
        { id: 3, nome: 'Maria', idade: 21 },
    ]);*/
    return (
    <>
        <Header onToggleNav={toggleNav}></Header>
        <div className="container">
            <SideNav pageIndex={5} open={open}></SideNav>
            <main>
                <TableHeader pageName="Alunos" icon="people" selectedPerson={selectedPerson} onDelete={handleDelete}></TableHeader>
                <div className="table-container">
                    <PersonTable person={person} selectedPerson={selectedPerson} onSelect={setSelectedPerson}/> 
                </div>
            </main>
        </div>
    </>
    )
}

export default AlunosPage
