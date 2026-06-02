
import '../styles/table.css'
import { useState } from 'react';

function PersonTable({ person, selectedPerson, onSelect }) {
    return (
        <table>
            <thead>
                <tr>
                    <th><button onClick={selectedPerson === null ? () => onSelect(null) : () => onSelect(null)} className="material-symbols-outlined">indeterminate_check_box</button></th>
                    <th>Nome</th>
                    <th>Idade</th>
                </tr>
            </thead>
            <tbody>
                {person.length > 0 ? (
                    person.map((p) => (
                        <tr key={p.id}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedPerson === p.id}
                                    onChange={() => onSelect(p.id)}
                                />
                            </td>
                            <td>{p.nome}</td>
                            <td>{p.idade}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="3" style={{ textAlign: "center" }}>
                            Nenhum registro encontrado
                        </td>
                    </tr>
                    )}
            </tbody>
        </table>
    )
}

export default PersonTable

