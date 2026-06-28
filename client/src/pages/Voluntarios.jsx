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
    const toggleNav = () => setOpen(prev => !prev);

    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState("");

    const fetchPersons = async () => {
        try {
            const res = await api.get("/Voluntario/get");
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
            console.warn("Nenhum voluntario selecionado para deletar.");
            return;
        }

        try {
            await api.delete(`/Voluntario/delete/${selectedItem}`);
            await fetchPersons();
            setSelectedItem(null);
        } catch (error) {
            console.error("Erro ao deletar voluntario:", error);
        }
    };

    const editItem = () => {
        const item = items.find(i => i.id === selectedItem);

        if (!item) {
            console.warn("Nenhum voluntario selecionado");
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
        <Header onToggleNav={toggleNav}></Header>
        <div className="container">
            <SideNav pageIndex={2} open={open}></SideNav>
            <main>
                <TableHeader pageName="Voluntários" icon="volunteer_activism" onDelete={handleDelete} onSearch={setFilter} onAdd={onAdd} onEdit={editItem}/>
                    <div className="table-container">
                        <PersonTable items={filteredItems} selectedItem={selectedItem} onSelect={setSelectedItem} 
                            openPasswordDialog={openPasswordDialog} setOpenPasswordDialog={setOpenPasswordDialog}
                        />
                    </div>
                    <ChangePasswordDialog onNotification={setNotification} open={openPasswordDialog} person={items.find(i => i.id === selectedItem)}
                        onClose={() => { setSelectedItem(null); setOpenPasswordDialog(false); fetchPersons()}}
                    />
                    <CreateVolunteerDialog onNotification={setNotification} open={openCreateDialog}
                        onClose={() => { setSelectedItemEdit(null); setOpenCreateDialog(false); fetchPersons()}} voluntario={selectedItemEdit}
                    />
                    <Notification message={notification} />
            </main>
        </div>
    </>
    )
}

export default VoluntariosPage
