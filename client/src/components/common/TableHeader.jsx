import { useEffect, useState } from "react";

function TableHeader( { pageName, icon, onDelete, onSearch, onAdd, onEdit } ) {

    const[filter, setFilter] = useState("");

    return (
        <div className="page-header">

            <h1>{pageName} <span className="material-icons">{icon}</span></h1>

            <button className="button-add" onClick={onAdd}>+ Adicionar</button>

            <input type="text" placeholder="Buscar..." value={filter} onChange={(e) => setFilter(e.target.value)} onKeyDown={(e) => e.key === "Enter" && onSearch(filter)}/>

            <button onClick={() => onSearch(filter)}>
                <span className="material-icons">search</span>
            </button>

            <button onClick={onEdit} id="btnEdit">
                <span className="material-icons">edit</span>
            </button>

            <button onClick={onDelete} id="btnDelete">
                <span className="material-icons">delete</span>
            </button>

            <button>
                <span className="material-icons">download</span>
            </button>
        </div>
    );
}

export default TableHeader;