import { useState, useEffect } from "react";
import "../../styles/dialog.css";
import { api } from "../../services/api";

function CreateWorkshopDialog({open, onClose, onNotification, oficina}) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (oficina) {
            setName(oficina.nome || "");
            setDescription(oficina.descricao || "");
        }
    }, [oficina]);

    const handleSave = async () => {
        if (
            !name ||
            !description
        ) {
            onNotification("Preencha todos os campos obrigatórios.");
            return;
        }

        if(oficina){
            try{
                let editOficina = {
                    id: 0,
                    nome: name,
                    descricao: description,
                }
                const res = await api.put(`/Oficina/update/${oficina.id}`, editOficina);
                onNotification("Oficina editada com sucesso!");
                handleClose();
            } catch (err) {
                console.log(err)
                onNotification("Erro: Verifique os campos e tente novamente.")
            }
        }
        else{
            try{
                let novaOficina = {
                    id: 0,
                    nome: name,
                    descricao: description,
                }
                const res = await api.post("/Oficina/create", novaOficina)
                onNotification("Oficina cadastrada com sucesso!");
                handleClose();
            } catch (err) {
                console.log(err)
                onNotification("Erro: Verifique os campos e tente novamente.")
            }
        }
    };

    const handleClose = () => {
        setName("");
        setDescription("");
        onNotification(null);
        onClose();
    };

    if (!open) return null;

    return (
        <div className="dialog-overlay">
            <div className="dialog dialog-register">
                <div className="dialog-header"><h2>{oficina?.id ? "Editar Oficina" : "Cadastrar Oficina"}</h2> <button onClick={handleClose} className="material-icons close-button">close</button></div>
                <div className="input-group">
                    <label>Nome da Oficina</label>
                    <input
                        type="text"
                        placeholder="Digite o nome da oficina"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <label>Descrição</label>
                    <input
                        type="text"
                        placeholder="Digite a descrição da oficina"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <button onClick={handleSave} id="btnSave">
                    Salvar
                </button>

                <button className="button-cancel" onClick={handleClose} id="btnCancel">
                    Cancelar
                </button>
            </div>
        </div>
    );
};
export default CreateWorkshopDialog;