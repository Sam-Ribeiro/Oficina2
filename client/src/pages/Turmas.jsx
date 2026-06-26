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
        { id: 1, oficinaId: 1, oficina: 'Robótica', dataInicio: '2026-01-01', dataTermino: '2026-06-01', status: 'Ativa', responsavel: 'Samuel', voluntarioId: 1,
            alunos:  [{id:1, nome: "Claudinho"}, {id:3, nome: "Teste"}]
         },
        { id: 2, oficinaId: 2, oficina: 'Pintura', dataInicio: '2026-02-01', dataTermino: '2026-07-01', status: 'Ativa', responsavel: 'Nicoly', voluntarioId: 2,
            alunos:  [{id:2, nome:"Renato"}]
         },
        { id: 3, oficinaId: 1, oficina: 'Robótica', dataInicio: '2026-06-01', dataTermino: '2026-11-01', status: 'Ativa', responsavel: 'Mariana', voluntarioId: 3,
            alunos:  [{id:2, nome:"Renato"}, {id:3, nome: "Teste"}, ]
         },
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
        { id: 2, nome: 'Maria' },
        { id: 3, nome: 'João' }
    ]);

    const [classes, setClasses] = useState([
        { id: 1, data: '2026-01-15', conteudo: 'Introdução à Robótica', status: 'Concluído' },
        { id: 2, data: '2026-01-22', conteudo: 'Montagem de Circuitos', status: 'Pendente' },
        { id: 3, data: '2026-01-29', conteudo: 'Programação de Robôs', status: 'Pendente' },
    ]);

    const [itemsList, setItemsList] = useState(items);

    const onSearch = (filter) => {
        setItemsList(
            items.filter(i => 
                i.oficina.toLowerCase().includes(filter.toLowerCase())
            )
        );
    }

    const [selectedItemEdit, setSelectedItemEdit] = useState(
        {
            id: "", alunos: [],dataTermino: "",dataInicio: "",oficinaId: "",voluntarioId: "", status: "",
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
    const [openManageDialog, setOpenManageDialog] = useState(false);
    const [notification, setNotification] = useState(null);
    return (
    <>
        <Header onToggleNav={toggleNav}></Header>
        <div className="container">
            <SideNav pageIndex={4} open={open}></SideNav>
            <main>
                <TableHeader pageName="Turmas" icon="class" onSearch={onSearch} onDelete={handleDelete} onAdd={() => setOpenCreateDialog(true)} onEdit={()=> editItem()}></TableHeader>
                <div className="table-container">
                    <ClassTable items={itemsList} selectedItem={selectedItem} onSelect={setSelectedItem} setOpenManageDialog={setOpenManageDialog}></ClassTable>
                </div>
                <CreateClassDialog 
                    onNotification={(n) =>setNotification(n)} open={openCreateDialog} onClose={() => {setSelectedItemEdit(null);setOpenCreateDialog(false);}}
                    workshops={workshops} students={students} volunteers={volunteers} turma={selectedItemEdit}
                />
                <ManageClassDialog classes={classes} onNotification={(n) =>setNotification(n)} open={openManageDialog} id={selectedItem} onClose={() =>{setSelectedItem(null); setOpenManageDialog(false);}}/>
                <Notification message={notification} />
            </main>
        </div>
    </>
    )
}

export default TurmasPage
