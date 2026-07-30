import { Link } from "react-router-dom";

export function Logo() {
    return (
        <Link to="/">
            <img
                src="/logo.png"
                alt="Logo"
                width={50}
                height={50}
            />
        </Link>
    );
}