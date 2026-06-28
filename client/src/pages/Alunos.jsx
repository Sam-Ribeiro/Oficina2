import { useEffect, useState } from "react";
import { api } from "../services/api";
import Header from "../components/common/Header";
import SideNav from "../components/common/SideNav";
import PersonTable from "../components/tables/PersonTable";
import TableHeader from "../components/common/TableHeader";
import ChangePasswordDialog from "../components/dialogs/ChangePasswordDialog";
import CreateStudentDialog from "../components/dialogs/CreateStudentDialog";
import Notification from "../components/common/Notification";
import '../styles/theme.css';
import '../styles/common.css';

function AlunosPage() {
    const [open, setOpen] = useState(true);
    const toggleNav = () => setOpen(prev => !prev);

    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState("");

    const fetchPersons = async () => {
        try {
            const res = await api.get("/Aluno/get");
            setItems(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchPersons();
    }, []);

    const filteredItems = items.filter(i =>
        i.nome.toLowerCase().includes(filter.toLowerCase()) ||
        i.idade.toString().includes(filter)
    );

    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedItemEdit, setSelectedItemEdit] = useState(null);

    const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [notification, setNotification] = useState(null);

    const handleDelete = async () => {
        if (!selectedItem) {
            console.warn("Nenhum aluno selecionado para deletar.");
            return;
        }

        try {
            await api.delete(`/Aluno/delete/${selectedItem}`);
            await fetchPersons();
            setSelectedItem(null);
        } catch (error) {
            console.error("Erro ao deletar aluno:", error);
        }
    };

    const editItem = () => {
        const item = items.find(i => i.id === selectedItem);

        if (!item) {
            console.warn("Nenhum aluno selecionado");
            return;
        }

        setSelectedItemEdit(item);
        setOpenCreateDialog(true);
    };

    const onAdd = () => {
        setSelectedItemEdit(null);
        setOpenCreateDialog(true);
    };

    return (
        <>
            <Header onToggleNav={toggleNav} />

            <div className="container">
                <SideNav pageIndex={5} open={open} />
                <main>
                    <TableHeader pageName="Alunos" icon="people" onDelete={handleDelete} onSearch={setFilter} onAdd={onAdd} onEdit={editItem}/>
                    <div className="table-container">
                        <PersonTable items={filteredItems} selectedItem={selectedItem} onSelect={setSelectedItem} 
                            openPasswordDialog={openPasswordDialog} setOpenPasswordDialog={setOpenPasswordDialog}
                        />
                    </div>
                    <ChangePasswordDialog onNotification={setNotification} open={openPasswordDialog} person={items.find(i => i.id === selectedItem)}
                        onClose={() => { setSelectedItem(null); setOpenPasswordDialog(false); fetchPersons()}}
                    />
                    <CreateStudentDialog onNotification={setNotification} open={openCreateDialog}
                        onClose={() => { setSelectedItemEdit(null); setOpenCreateDialog(false); fetchPersons()}} aluno={selectedItemEdit}
                    />
                    <Notification message={notification} />
                </main>
            </div>
        </>
    );
}

export default AlunosPage;