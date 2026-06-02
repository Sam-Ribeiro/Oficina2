import { useNavigate } from 'react-router-dom';

function TableHeader( { pageName, icon, onDelete }) {

    return (
        <div className="page-header">

            <h1>{pageName} <span className="material-icons">{icon}</span></h1>

            <button className="button-add">+ Adicionar</button>

            <input type="text" placeholder="Buscar..." />

            <button><span className="material-icons">search</span></button>

            <button>
                <span className="material-icons">edit</span>
            </button>

            <button onClick={onDelete}>
                <span className="material-icons">delete</span>
            </button>

        </div>
    );
}

export default TableHeader;