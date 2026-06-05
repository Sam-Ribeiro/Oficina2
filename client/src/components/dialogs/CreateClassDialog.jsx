import { useState } from "react";
import Select from "react-select";
import "../../styles/dialog.css";

function CreateClassDialog({
    open,
    onClose,
    onNotification,
    workshops,
    students,
    volunteers
}) {
    const [name, setName] = useState("");

    const [selectedStudents, setSelectedStudents] = useState([]);
    const studentOptions = students.map(student => ({
        value: student.id,
        label: student.nome
    }));

    const [selectedWorkshop, setSelectedWorkshop] = useState(null);
    const workshopOptions = workshops.map(workshop => ({
        value: workshop.id,
        label: workshop.nome
    }));

    const [selectedVolunteer, setSelectedVolunteer] = useState(null);
    const volunteerOptions = volunteers.map(volunteer => ({
        value: volunteer.id,
        label: volunteer.nome
    }));

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleSave = () => {
        if (
            !selectedWorkshop ||
            !selectedVolunteer ||
            !startDate ||
            !endDate
        ) {
            onNotification("Preencha todos os campos obrigatórios.");
            return;
        }
        if (startDate < minDate || startDate > maxDate) {
            onNotification("Data de início inválida.");
            return;
        }

        if (endDate < startDate || endDate > maxDate) {
            onNotification("Data final inválida.");
            return;
        }

        const turma = {
            oficinaId: selectedWorkshop?.value,
            voluntarioId: selectedVolunteer?.value,
            alunos: selectedStudents.map(student => student.value),
            dataInicio: startDate,
            dataFim: endDate
        };

        console.log(turma);

        onNotification("Turma criada com sucesso!");
        handleClose();
    };

    const handleClose = () => {
        setSelectedWorkshop(null);
        setSelectedVolunteer(null);
        setSelectedStudents([]);
        setStartDate("");
        setEndDate("");

        onClose();
    };

    const thisYear = new Date().getFullYear();
    const minDate = `${thisYear-1}-01-01`;
    const maxDate = `${thisYear+1}-12-31`;

    if (!open) return null;

    return (
        <div className="dialog-overlay">
            <div className="dialog dialog-register">
                <div className="dialog-header"><h2>Cadastrar Turma</h2> <button onClick={handleClose} className="material-icons close-button">close</button></div>
                <div className="input-group">
                    <label>Oficina</label>

                    <Select
                        options={workshopOptions}
                        placeholder="Pesquisar oficina..."
                        value={selectedWorkshop}
                        onChange={setSelectedWorkshop}
                        isClearable
                    />
                </div>

                

                <div className="input-group-date">
                    <div className="input-group">
                        <label>Voluntário Responsável</label>

                        <Select
                            options={volunteerOptions}
                            placeholder="Pesquisar voluntário..."
                            value={selectedVolunteer}
                            onChange={setSelectedVolunteer}
                            isClearable
                        />
                    </div>

                    <div className="input-group">
                        <label>Data de Início</label>
                        <input
                            id="startDate"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            min={minDate}
                            max={endDate}
                        />
                    </div>
                    <div className="input-group">
                        <label>Data de Fim</label>
                        <input
                            id="endDate"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            min={startDate}
                            max={maxDate}
                        />
                    </div>
                </div>

                <div className="input-group">
                    <label>Alunos</label>

                    <Select
                        isMulti
                        options={studentOptions}
                        placeholder="Pesquisar alunos..."
                        value={selectedStudents}
                        onChange={(selected) => setSelectedStudents(selected || [])}
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
}

export default CreateClassDialog;