import { useEffect, useState } from "react";
import { api } from "../services/api";
import Header from "../components/common/Header";
import SideNav from "../components/common/SideNav";
import '../styles/theme.css'
import '../styles/common.css'

function TurmasPage() {
    const [open, setOpen] = useState(true);
    const toggleNav = () => {
        setOpen(prev => !prev);
    };

    return (
    <>
        <Header onToggleNav={toggleNav}></Header>
        <div className="container">
            <SideNav pageIndex={4} open={open}></SideNav>
            <main>
                <h1>Turmas Page</h1>
            </main>
        </div>
    </>
    )
}

export default TurmasPage
