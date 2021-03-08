import React, { useState } from 'react';
import CreateEditPlanet from './CreateEditPlanet';
import '../assets/styles/components/Header.scss'

import logo from '../assets/static/logo-planets-api.png';
import addIcon from '../assets/static/plus-icon.png'

const Header = (props) => {

    const [showModalCreate, setShowModalCreate] = useState(false)

    return(
        <div>
            <header className="header">
                <img className="header__img" src={logo} alt="Planets API" />
                <button className="add-planet" onClick={() => setShowModalCreate(true)}>
                    <img src={addIcon} /> <strong> Add Planet </strong>
                </button>
            </header>

            <CreateEditPlanet 
                title="Register a new planet"
                edit={false}
                onClose={() => setShowModalCreate(false)}
                onSetData={(data) => props.onAddNewData(data)}
                show={showModalCreate} />
        </div>
        
    );
};

export default Header;