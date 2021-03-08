import React from 'react';
import '../assets/styles/components/Planets.scss';

const Planets = ({ children, title }) => (
    <div className="planets">
        <h3 className="planets__title">{title}</h3>
        {children}
    </div>
);

export default Planets;