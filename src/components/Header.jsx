import { Link } from "react-router-dom"


export default function Header({ title }) {


    return (
        <header>
            <Link
                to="/"
                className={'back-btn'}
            >
                Back
            </Link>
            <h1>{title}</h1>
        </header>
    )
}