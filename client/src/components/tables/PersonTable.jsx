
import '../../styles/table.css'
import { useState } from 'react';

function PersonTable({ items, selectedItem, onSelect, setOpenPasswordDialog }) {
    
    return (
        <table>
            <thead>
                <tr>
                    <th className='small-column center'><button onClick={selectedItem === null ? () => onSelect(null) : () => onSelect(null)} className="material-symbols-outlined">indeterminate_check_box</button></th>
                    <th className='small-column'>Id</th>
                    <th>Nome</th>
                    <th>Idade</th>
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
                            <td>{i.nome}</td>
                            <td>{i.idade}</td>
                            <td className='small-column center'>
                                <button className="material-icons" 
                                    onClick={() => { onSelect(i.id); setOpenPasswordDialog(true);}}>
                                    key
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4" className='center'>
                            Nenhum registro encontrado
                        </td>
                    </tr>
                    )}
            </tbody>
        </table>
    )
}

export default PersonTable

