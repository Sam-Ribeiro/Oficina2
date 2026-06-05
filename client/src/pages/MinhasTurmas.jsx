import { useEffect, useState } from "react";
import { api } from "../services/api";
import Header from "../components/common/Header";
import SideNav from "../components/common/SideNav";
import ClassTable from "../components/tables/ClassTable";
import TableHeader from "../components/common/TableHeader";
import CreateClassDialog from "../components/dialogs/CreateClassDialog";
import Notification from "../components/common/Notification";
import '../styles/theme.css'
import '../styles/common.css'

function MinhasTurmasPage() {
const [open, setOpen] = useState(true);
    const toggleNav = () => {
        setOpen(prev => !prev);
    };
        /*
    const [item, setItem] = useState([]);
    const fetchItems = async () => {
        try {
            const res = await api.get("/Turmas/get");
            setItem(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);
    */
    const [selectedItem, setSelectedItem] = useState(null);

    const handleDelete = async () => {
        if (!selectedItem){ 
            console.warn("Nenhuma turma selecionada para deletar.");
            return;}

        try {
            console.log("Deletando turma com ID:", selectedItem);
            await api.delete(`/Turmas/delete/${selectedItem}`);
            await fetchItems();
            setSelectedItem(null);
        } catch (error) {
            console.error("Erro ao deletar turma:", error);
        }
    };

    const [items, setItem] = useState([
        { id: 1, oficina: 'Robótica', dataInicio: '2026-01-01', dataTermino: '2026-06-01', status: 'Ativa', responsavel: 'Samuel' },
        { id: 2, oficina: 'Pintura', dataInicio: '2026-02-01', dataTermino: '2026-07-01', status: 'Ativa', responsavel: 'Samuel' },
        { id: 3, oficina: 'Culinária', dataInicio: '2026-03-01', dataTermino: '2026-08-01', status: 'Inativa', responsavel: 'Samuel' },
    ]);

    const [workshops, setWorkshops] = useState([
        { id: 1, nome: 'Robótica' },
        { id: 2, nome: 'Pintura' },
        { id: 3, nome: 'Culinária' },
        { id: 4, nome: 'Fotografia' },
        { id: 5, nome: 'Programação' }
    ]);

    const [students, setStudents] = useState([
        { id: 1, nome: 'Alice' },
        { id: 2, nome: 'Bob' },
        { id: 3, nome: 'Charlie' }
    ]);

    const [volunteers, setVolunteers] = useState([
        { id: 1, nome: 'Samuel' },
    ]);


    const [itemsList, setItemsList] = useState(items);

    const onSearch = (filter) => {
        setItemsList(
            items.filter(i => 
                i.oficina.toLowerCase().includes(filter.toLowerCase())
            )
        );
    }
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [notification, setNotification] = useState(null);
    return (
    <>
        <Header onToggleNav={toggleNav}></Header>
        <div className="container">
            <SideNav pageIndex={1} open={open}></SideNav>
            <main>
                <TableHeader pageName="Minhas Turmas" icon="groups" onSearch={onSearch} onDelete={handleDelete} onAdd={() => setOpenCreateDialog(true)}></TableHeader>
                <div className="table-container">
                    <ClassTable items={itemsList} selectedItem={selectedItem} onSelect={setSelectedItem}></ClassTable>
                </div>
                <CreateClassDialog 
                    onNotification={(n) =>setNotification(n)} open={openCreateDialog} onClose={() => {setOpenCreateDialog(false);}}
                    workshops={workshops} students={students} volunteers={volunteers}
                />
                <Notification message={notification} />
            </main>
        </div>
    </>
    )
}

export default MinhasTurmasPage
