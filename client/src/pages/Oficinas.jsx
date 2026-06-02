import { useEffect, useState } from "react";
import { api } from "../services/api";
import Header from "../components/Header";
import SideNav from "../components/SideNav";
import '../styles/theme.css'
import '../styles/common.css'

function OficinasPage() {
    const [open, setOpen] = useState(true);
    const toggleNav = () => {
        setOpen(prev => !prev);
    };

    return (
    <>
        <Header onToggleNav={toggleNav}></Header>
        <div className="container">
            <SideNav pageIndex={3} open={open}></SideNav>
            <main>
                <h1>Oficinas Page</h1>
            </main>
        </div>
    </>
    )
}

export default OficinasPage
