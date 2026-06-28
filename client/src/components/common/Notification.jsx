import { useEffect, useState } from "react";
import "../../styles/common.css";

function Notification({ message }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!message) return;

        setVisible(true);
        const timer = setTimeout(() => {
            setVisible(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, [message]);

    if (!visible) return null;

    if(message) return (
        <div className="notification">
            {message}
        </div>
    );
}

export default Notification;