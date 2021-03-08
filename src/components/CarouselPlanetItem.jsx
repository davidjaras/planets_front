import React, { useState }  from 'react';
import CreateEditPlanet from './CreateEditPlanet';
import '../assets/styles/components/CarouselPlanetItem.scss';

import editIcon from '../assets/static/edit-icon.png';
import deleteIcon from '../assets/static/delete-icon.png';

const { REACT_APP_API_SERVICE } = process.env;

const CarouselPlanetItem = (props) => {

    const [showModalEdit, setShowModalEdit] = useState(false)

    // Function to handle Delete in API
    const deleteItem = (id, name) => {
        let confirmation = confirm("Are you sure to destroy " + name + " ?")
        if (confirmation) {
            fetch(REACT_APP_API_SERVICE + id, { method: 'DELETE' })
                .then(() => {
                    props.onDeletePlanet(id)
                });
        } else {
            alert("The planet was forgiven")
        }
    }

    return (
        <div className="carousel-item col-3">

            <img className="carousel-item__img" src="https://picsum.photos/1260/750/?image=1032" />
            <div className="carousel-item__description">
                <h1>{props.item.name}</h1>
                <p className="">Satellites: {props.item.satellites} <br /> Diameter: {props.item.diameter} Km</p>
            </div>
            <div className="carousel-item__details">
                <div>
                    <img
                        className="carousel-item__details--img"
                        src={editIcon}
                        onClick={() => setShowModalEdit(true)} />
                    <img
                        className="carousel-item__details--img"
                        src={deleteIcon} alt="Delete Icon"
                        onClick={() => deleteItem(props.item.id, props.item.name)} />
                </div>
            </div>

            <CreateEditPlanet
                title="Edit planet"
                edit={true}
                item={props.item}
                onSetData={(data) => props.onEditPlanet(data)}
                onClose={() => setShowModalEdit(false)}
                show={showModalEdit} />
            
        </div>
    );
    
}

export default CarouselPlanetItem;