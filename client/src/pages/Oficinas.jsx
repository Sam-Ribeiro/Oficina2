import { useEffect, useState } from "react";
import { api } from "../services/api";
import Header from "../components/common/Header";
import SideNav from "../components/common/SideNav";
import WorkshopTable from "../components/tables/WorkshopTable";
import TableHeader from "../components/common/TableHeader";
import CreateWorkshopDialog from "../components/dialogs/CreateWorkshopDialog";
import Notification from "../components/common/Notification";
import '../styles/theme.css'
import '../styles/common.css'

function OficinasPage() {
    const [open, setOpen] = useState(true);
    const toggleNav = () => setOpen(prev => !prev);

    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState("");

    const fetchItems = async () => {
        try {
            const res = await api.get("/Oficina");
            setItems(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const filteredItems = items.filter(i =>
        i.nome.toLowerCase().includes(filter.toLowerCase()) ||
        i.idade.toString().includes(filter)
    );

    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedItemEdit, setSelectedItemEdit] = useState(null);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [notification, setNotification] = useState(null);

    const handleDelete = async () => {
        if (!selectedItem) {
            console.warn("Nenhuma oficina selecionada para deletar.");
            return;
        }

        try {
            await api.delete(`/Oficina/delete/${selectedItem}`);
            await fetchItems();
            setSelectedItem(null);
        } catch (error) {
            console.error("Erro ao deletar oficina:", error);
            setNotification("Erro ao deletar a oficina")
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

    return (
    <>
        <Header onToggleNav={toggleNav}></Header>
        <div className="container">
            <SideNav pageIndex={3} open={open}></SideNav>
            <main>
                <TableHeader pageName="Oficinas" icon="library_books" onDelete={handleDelete} onSearch={setFilter} onAdd={onAdd} onEdit={editItem}/>
                <div className="table-container">
                    <WorkshopTable items={filteredItems} selectedItem={selectedItem} onSelect={setSelectedItem}/> 
                </div>
                <CreateWorkshopDialog 
                    onNotification={(n) =>setNotification(n)} open={openCreateDialog} onClose={() => {setSelectedItemEdit(null);setOpenCreateDialog(false); fetchItems()}} 
                    oficina={selectedItemEdit}
                />
                <Notification message={notification} />
            </main>
        </div>
    </>
    )
}

export default OficinasPage
