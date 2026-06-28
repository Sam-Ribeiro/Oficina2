import { useState, useEffect } from "react";
import '../../styles/dialog.css';
import { api } from "../../services/api";
function CreateVolunteerDialog({ open, onClose, onNotification, voluntario }) {
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [idade, setIdade] = useState("");
    const [ra, setRa] = useState("");

    useEffect(() => {
        if (voluntario) {
            setNome(voluntario.nome || "");
            setCpf(voluntario.cpf || "");
            setEmail(voluntario.email || "");
            setIdade(voluntario.idade || "");
            setRa(voluntario.ra || "");
        }
    }, [voluntario]);

    const handleSave = async () => {
        if(voluntario){
            try{
                let editVoluntario = {
                    id: 0,
                    nome: nome,
                    cpf: cpf,
                    idade: idade,
                    email: email,
                    senha: voluntario.senha,
                    role: "Voluntario",
                    ra: ra,
                }
                const res = await api.put(`/Voluntario/update/${voluntario.id}`, editVoluntario);
                onNotification("Voluntario editado com sucesso!");
                handleClose();
            } catch (err) {
                console.log(err)
                onNotification("Erro: Verifique os campos e tente novamente.")
            }
        }
        else{
            try{
                let novoVoluntario = {
                    id: 0,
                    nome: nome,
                    cpf: cpf,
                    idade: idade,
                    email: email,
                    senha: "123456",
                    role: "Voluntario",
                    ra: ra,
                }
                const res = await api.post("/Voluntario/create", novoVoluntario)
                onNotification("Voluntario cadastrado com sucesso!");
                handleClose();
            } catch (err) {
                console.log(err)
                onNotification("Erro: Verifique os campos e tente novamente.")
            }
        }
    };

    const handleClose = () => {
        setNome("");
        setCpf("");
        setEmail("");
        setIdade("");
        setRa("");

        onClose();
    };

    if (!open) return null;

    return (
        <div className="dialog-overlay">
            <div className="dialog dialog-register">
                <div className="dialog-header"><h2>{voluntario?.id ? "Editar Voluntário" : "Cadastrar Voluntário"}</h2> <button onClick={handleClose} className="material-icons close-button">close</button></div>
                <div className="input-group">
                    <label htmlFor="nome">Nome</label>
                    <input
                        type="text"
                        placeholder="Nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        id="inputNome"
                    />
                    <span className="error-message">O nome é obrigatório.</span>
                </div>

                <div className="input-group">
                    <label htmlFor="ra">RA</label>
                    <input
                        type="text"
                        placeholder="RA"
                        value={ra}
                        onChange={(e) => setRa(e.target.value)}
                        id="inputRa"
                    />
                    <span className="error-message">O RA é obrigatório.</span>
                </div>

                <div className="input-group">
                    <label htmlFor="cpf">CPF</label>
                    <input
                        type="text"
                        placeholder="CPF"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        id="inputCpf"
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
                        id="inputEmail"
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
                        id="inputIdade"
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

export default CreateVolunteerDialog;