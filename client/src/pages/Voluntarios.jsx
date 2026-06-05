import { useEffect, useState } from "react";
import { api } from "../services/api";
import Header from "../components/common/Header";
import SideNav from "../components/common/SideNav";
import PersonTable from "../components/tables/PersonTable";
import TableHeader from "../components/common/TableHeader";
import ChangePasswordDialog from "../components/dialogs/ChangePasswordDialog";
import CreateVolunteerDialog from "../components/dialogs/CreateVolunteerDialog";
import Notification from "../components/common/Notification";
import '../styles/theme.css'
import '../styles/common.css'

function VoluntariosPage() {
    const [open, setOpen] = useState(true);
    const toggleNav = () => {
        setOpen(prev => !prev);
    };
    /*
    const [person, setPerson] = useState([]);
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
    */

    const [selectedItem, setSelectedItem] = useState(null);

    const handleDelete = async () => {
        if (!selectedItem){ 
            console.warn("Nenhum aluno selecionado para deletar.");
            return;}

        try {
            console.log("Deletando aluno com ID:", selectedItem);
            await api.delete(`/Aluno/delete/${selectedItem}`);
            await fetchItems();
            setSelectedItem(null);
        } catch (error) {
            console.error("Erro ao deletar aluno:", error);
        }
    };

    const [items, setItems] = useState([
        { id: 1, nome: 'Samuel', idade: 22 },
        { id: 2, nome: 'João', idade: 20 },
        { id: 3, nome: 'Maria', idade: 21 },
    ]);
    const [itemsList, setItemsList] = useState(items);

    const onSearch = (filter) => {
        setItemsList(
            items.filter(i => 
                i.nome.toLowerCase().includes(filter.toLowerCase()) ||
                i.idade.toString().includes(filter)
            )
        );
    }

    const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [notification, setNotification] = useState(null);
    return (
    <>
        <Header onToggleNav={toggleNav}></Header>
        <div className="container">
            <SideNav pageIndex={2} open={open}></SideNav>
            <main>
                <TableHeader pageName="Voluntários" icon="volunteer_activism" onDelete={handleDelete} onSearch={onSearch} onAdd={() => setOpenCreateDialog(true)}></TableHeader>
                <div className="table-container">
                    <PersonTable 
                        items={itemsList} selectedItem={selectedItem} onSelect={setSelectedItem} 
                        openPasswordDialog={openPasswordDialog} setOpenPasswordDialog={setOpenPasswordDialog}
                    /> 
                </div>
                <ChangePasswordDialog onNotification={(n) =>setNotification(n)} open={openPasswordDialog} id={selectedItem} onClose={() =>{setSelectedItem(null); setOpenPasswordDialog(false);}}/>
                <CreateVolunteerDialog onNotification={(n) =>setNotification(n)} open={openCreateDialog} onClose={() => {setOpenCreateDialog(false);}}/>
                <Notification message={notification} />
            </main>
        </div>
    </>
    )
}

export default VoluntariosPage
