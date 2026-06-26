import { useState, useEffect } from "react";
import "../../styles/dialog.css";

function CreateWorkshopDialog({open, onClose, onNotification, oficina}) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [theme, setTheme] = useState("");


    useEffect(() => {
        if (oficina) {
            setName(oficina.nome || "");
            setDescription(oficina.descricao || "");
            setTheme(oficina.tema || "");
        }
    }, [oficina]);

    const handleSave = () => {
        if (
            !name ||
            !description ||
            !theme
        ) {
            onNotification("Preencha todos os campos obrigatórios.");
            return;
        }

        if(oficina){
            onNotification("Oficina editada com sucesso!");
        }
        else{
            onNotification("Oficina cadastrada com sucesso!");
        }
        
        handleClose();
    };

    const handleClose = () => {
        setName("");
        setDescription("");
        setTheme("");
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

                <div className="input-group">
                    <label>Tema</label>
                    <input
                        type="text"
                        placeholder="Digite o tema da oficina"
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
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