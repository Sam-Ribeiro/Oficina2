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
    const toggleNav = () => {
        setOpen(prev => !prev);
    };
        /*
    const [item, setItem] = useState([]);
    const fetchItems = async () => {
        try {
            const res = await api.get("/Oficinas/get");
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
            console.warn("Nenhuma oficina selecionada para deletar.");
            return;}

        try {
            console.log("Deletando oficina com ID:", selectedItem);
            await api.delete(`/Oficinas/delete/${selectedItem}`);
            await fetchItems();
            setSelectedItem(null);
        } catch (error) {
            console.error("Erro ao deletar oficina:", error);
        }
    };

    const [items, setItem] = useState([
        { id: 1, nome: 'Robótica', tema: 'Tecnologia', descricao: 'Oficina de robótica para iniciantes' },
        { id: 2, nome: 'Pintura', tema: 'Arte', descricao: 'Oficina de pintura para todas as idades' },
        { id: 3, nome: 'Culinária', tema: 'Gastronomia', descricao: 'Oficina de culinária para aprender receitas deliciosas' },
        { id: 4, nome: 'Fotografia', tema: 'Arte', descricao: 'Oficina de fotografia para capturar momentos incríveis' },
        { id: 5, nome: 'Programação', tema: 'Tecnologia', descricao: 'Oficina de programação para iniciantes' },
        { id: 6, nome: 'Dança', tema: 'Arte', descricao: 'Oficina de dança para se expressar através do movimento' },
    ]);

    const [itemsList, setItemsList] = useState(items);

    const onSearch = (filter) => {
        setItemsList(
            items.filter(i => 
                i.nome.toLowerCase().includes(filter.toLowerCase()) ||
                i.tema.toLowerCase().includes(filter.toLowerCase())
            )
        );
    }

    const [selectedItemEdit, setSelectedItemEdit] = useState(
        {
            id:'', nome:'', tema:'', descricao:'',
        }
    )

    const editItem = function(){
        const item = items.find(item => item.id === selectedItem);

        if (!item) {
            console.warn("Nenhum voluntario selecionado");
            return;
        }

        setSelectedItemEdit(item);
        setOpenCreateDialog(true);
    }

    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [notification, setNotification] = useState(null);

    return (
    <>
        <Header onToggleNav={toggleNav}></Header>
        <div className="container">
            <SideNav pageIndex={3} open={open}></SideNav>
            <main>
                <TableHeader pageName="Oficinas" icon="library_books" onDelete={handleDelete} onSearch={onSearch} onAdd={()=> setOpenCreateDialog(true)} onEdit={()=> editItem()}></TableHeader>
                <div className="table-container">
                    <WorkshopTable items={itemsList} selectedItem={selectedItem} onSelect={setSelectedItem}/> 
                </div>
                <CreateWorkshopDialog 
                    onNotification={(n) =>setNotification(n)} open={openCreateDialog} onClose={() => {setSelectedItemEdit(null);setOpenCreateDialog(false);}} oficina={selectedItemEdit}
                />
                <Notification message={notification} />
            </main>
        </div>
    </>
    )
}

export default OficinasPage
