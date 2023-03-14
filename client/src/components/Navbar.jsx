import React from 'react';

import logo from '../images/logo.png'


const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-light bg-light p-2 shadow border-bottom border-2  border-primary p-1 mb-3 bg-body rounded" >
                <ul className=" d-flex mb-0 justify-content-center align-items-center p-0" >
                    {/* <li style={{ listStyle: "none", marginLeft: '1rem' }}>
                        <img src={logo} alt="no found" style={{ width: '4rem', height: '4rem',pointer:"cursor" }} />
                    </li> */}

                    <li style={{ listStyle: "none", marginLeft: '1rem' }}>
                        <span className="fw-bold fst-italic fs-3 text-primary" style={{cursor: "pointer"}} >Echo</span>
                    </li>

                </ul>

            </nav>

        </div>
    )
}

export default Navbar
