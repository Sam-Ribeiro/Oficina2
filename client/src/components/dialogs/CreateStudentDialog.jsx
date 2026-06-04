import { useState } from "react";
import '../../styles/dialog.css';

function CreateStudentDialog({ open, onClose, onNotification }) {
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [idade, setIdade] = useState("");

    const handleSave = () => {
        onNotification("Aluno cadastrado com sucesso!");

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
                <h2>Cadastrar Aluno</h2>

                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="CPF"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Idade"
                    value={idade}
                    onChange={(e) => setIdade(e.target.value)}
                />

                <button onClick={handleSave}>
                    Salvar
                </button>

                <button
                    onClick={onClose}
                    className="button-cancel"
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
}

export default CreateStudentDialog;