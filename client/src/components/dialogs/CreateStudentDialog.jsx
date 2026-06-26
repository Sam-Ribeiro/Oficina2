import { useState, useEffect } from "react";
import '../../styles/dialog.css';

function CreateStudentDialog({ open, onClose, onNotification, aluno }) {


    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [idade, setIdade] = useState("");

    useEffect(() => {
        if (aluno) {
            console.log(aluno)
            setNome(aluno.nome || "");
            setCpf(aluno.cpf || "");
            setEmail(aluno.email || "");
            setIdade(aluno.idade || "");
        }
    }, [aluno]);

    const handleSave = () => {
        if(aluno){
            onNotification("Aluno editado com sucesso!");
        }
        else{
            onNotification("Aluno cadastrado com sucesso!");
        }
        handleClose();
    };

    const handleClose = () => {
        setNome("");
        setCpf("");
        setEmail("");
        setIdade("");

        onClose();
    };

    if (!open) return null;

    return (
        <div className="dialog-overlay">
            <div className="dialog dialog-register">
                <div className="dialog-header"><h2>{aluno?.id ? "Editar Aluno" : "Cadastrar Aluno"}</h2> <button onClick={handleClose} className="material-icons close-button">close</button></div>
                <div className="input-group">
                    <label htmlFor="nome">Nome</label>
                    <input
                        type="text"
                        placeholder="Nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                    <span className="error-message">O nome é obrigatório.</span>
                </div>

                <div className="input-group">
                    <label htmlFor="cpf">CPF</label>
                    <input
                        type="text"
                        placeholder="CPF"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                    />
                    <span className="error-message">O CPF deve ser único.</span>
                </div>

                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <span className="error-message">O email é obrigatório e deve ser válido.</span>
                </div>

                
                <div className="input-group">
                    <label htmlFor="idade">Idade</label>
                    <input
                        type="number"
                        placeholder="Idade"
                        value={idade}
                        onChange={(e) => setIdade(e.target.value)}
                    />
                    <span className="error-message">A idade deve ser um número entre 0 e 120.</span>
                </div>

                <button onClick={handleSave} id="btnSave">
                    Salvar
                </button>

                <button onClick={handleClose} className="button-cancel" id="btnCancel">
                    Cancelar
                </button>
            </div>
        </div>
    );
}

export default CreateStudentDialog;