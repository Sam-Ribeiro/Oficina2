import { useEffect, useState } from "react";
import { api } from "../services/api";
import Header from "../components/common/Header";
import SideNav from "../components/common/SideNav";
import ClassTable from "../components/tables/ClassTable";
import TableHeader from "../components/common/TableHeader";
import CreateClassDialog from "../components/dialogs/CreateClassDialog";
import ManageClassDialog from "../components/dialogs/ManageClassDialog";
import Notification from "../components/common/Notification";
import '../styles/theme.css'
import '../styles/common.css'
import { data } from "react-router-dom";

function TurmasPage() {
    const [open, setOpen] = useState(true);
    const toggleNav = () => setOpen(prev => !prev);

    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState("");

    const [workshops, setWorkshops] = useState([]);
    const [students, setStudents] = useState([]);
    const [volunteers, setVolunteers] = useState([]);

    const fetchItems = async () => {
        try {
            const resWorkshop = await api.get("/Oficina");
            setWorkshops(resWorkshop.data);
            const resStudents = await api.get("/Aluno/get");
            setStudents(resStudents.data);
            const resVolunteers = await api.get("/Voluntario/get");
            setVolunteers(resVolunteers.data);
        } catch (err) {
            console.error(err);
            setNotification("Erro ao carregar parâmetros.")
        }
        try {
            const res = await api.get("/Turma");
            setItems(res.data);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        fetchItems();
    }, []);    

    /*
    const filteredItems = items.filter(i =>
        i.nome.toLowerCase().includes(filter.toLowerCase()) ||
        i.descricao.toString().includes(filter)
    );
    */const filteredItems = items

    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedItemEdit, setSelectedItemEdit] = useState(null);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [openManageDialog, setOpenManageDialog] = useState(false);
    const [notification, setNotification] = useState(null);

    const handleDelete = async () => {
        if (!selectedItem) {
            console.warn("Nenhuma Turma selecionada para deletar.");
            return;
        }

        try {
            await api.delete(`/Turma/delete/${selectedItem}`);
            await fetchItems();
            setSelectedItem(null);
        } catch (error) {
            console.error("Erro ao deletar Turma:", error);
            setNotification("Erro ao deletar a Turma")
        }
    };

    const editItem = () => {
        const item = items.find(i => i.id === selectedItem);

        if (!item) {
            console.warn("Nenhuma oficina selecionado");
            return;
        }

        setSelectedItemEdit(item);
        setOpenCreateDialog(true);
    };

    const onAdd = () => {
        setSelectedItemEdit(null);
        setOpenCreateDialog(true);
    };

    const handleOpenManageDialog = (id) =>{
        const item = items.find(i => i.id === id);
        setSelectedItemEdit(item);
        setOpenManageDialog(true)
    }

    return (
    <>
        <Header onToggleNav={toggleNav}></Header>
        <div className="container">
            <SideNav pageIndex={4} open={open}></SideNav>
            <main>
                <TableHeader pageName="Turmas" icon="class" onDelete={handleDelete} onSearch={setFilter} onAdd={onAdd} onEdit={editItem}/>
                <div className="table-container">
                    <ClassTable items={filteredItems} selectedItem={selectedItem} onSelect={setSelectedItem} handleOpenManageDialog={handleOpenManageDialog}/> 
                </div>
                <CreateClassDialog 
                    onNotification={(n) =>setNotification(n)} open={openCreateDialog} onClose={() => {setSelectedItemEdit(null);setOpenCreateDialog(false);fetchItems()}}
                    workshops={workshops} students={students} volunteers={volunteers} turma={selectedItemEdit}
                />
                <ManageClassDialog classes={items} onNotification={(n) =>setNotification(n)} open={openManageDialog} id={selectedItem} turma={selectedItemEdit}
                onClose={() =>{setSelectedItem(null); setOpenManageDialog(false); fetchItems()}}/>
                <Notification message={notification} />
            </main>
        </div>
    </>
    )
}

export default TurmasPage
