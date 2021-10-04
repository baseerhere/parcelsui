import React from 'react'

export default function Header(props) {
    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <a className="navbar-brand" href="#">Restaurant Management System</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Orders</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/kitchen">Kitchen</a>
                        </li>
                        <li className="nav-item justify-content-end">
                            <a className="nav-link" style={{ "cursor": "pointer" }} onClick={e => props.setToken('')}>Log Out</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}
