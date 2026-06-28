
import '../../styles/table.css'

function ClassTable({ items, selectedItem, onSelect, handleOpenManageDialog }) {
    return (
        <table>
            <thead>
                <tr>
                    <th className='small-column center'><button onClick={selectedItem === null ? () => onSelect(null) : () => onSelect(null)} className="material-symbols-outlined">indeterminate_check_box</button></th>
                    <th className='small-column'>Id</th>
                    <th>Oficina</th>
                    <th>Status</th>
                    <th>Responsável</th>
                    <th className='date-column'>Data de Início</th>
                    <th className='date-column'>Data de Término</th>
                    <th className='small-column center'>Ações</th>
                </tr>
            </thead>
            <tbody>
                {items.length > 0 ? (
                    items.map((i) => (
                        <tr key={i.id}>
                            <td className='small-column center'> 
                                <input
                                    type="checkbox"
                                    checked={selectedItem === i.id}
                                    onChange={() => onSelect(i.id)}
                                />
                            </td>
                            <td className='small-column'>{i.id}</td>
                            <td>{i.oficina.nome}</td>
                            <td>{i.status}</td>
                            <td>{i.voluntarioId}</td>
                            <td className='date-column'>{new Date(i.dataInicio).toLocaleDateString("pt-BR")}</td>
                            <td className='date-column'>{new Date(i.dataTermino).toLocaleDateString("pt-BR")}</td>
                            <td className='small-column center'>
                                <button className="material-icons" 
                                    onClick={() => { onSelect(i.id); handleOpenManageDialog(i.id);}}>
                                    auto_stories
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="8" className='center'>
                            Nenhum registro encontrado
                        </td>
                    </tr>
                    )}
            </tbody>
        </table>
    )
}

export default ClassTable

