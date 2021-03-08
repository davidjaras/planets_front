import React, { useEffect, useState } from 'react';
import '../assets/styles/components/CreateEditPlanet.scss'

const { REACT_APP_API_SERVICE } = process.env;

const CreateEditPlanet = (props) => {

  // Show Modal
  if (!props.show) {
    return null
  }

  // Set state whether is Add Planet or Edit
  const [newPlanet, setNewPlanet] = useState((() => {
    if (props.edit) {
      return {
        id: props.item.id,
        name: props.item.name,
        satellites: props.item.satellites,
        diameter: props.item.diameter
      }
    }
    return {
      name: '',
      satellites: '',
      diameter: ''
    }
  }))

  // Update state with data in form
  const handleInputs = (event) => {
    setNewPlanet({
      ...newPlanet,
      [event.target.name] : event.target.value
    })
  }

  // Function to send data to API
  const sendData = (event) => {
    event.preventDefault()
    console.log('Sending Data... ' + newPlanet.name + ' ' + newPlanet.satellites + ' ' + newPlanet.diameter)
    fetch(REACT_APP_API_SERVICE, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPlanet)
    })
    .then((response) => response.json())
      .then((data) => {
        props.onSetData(data)
        alert('New planet: '+data.name+' created')
        props.onClose()
      }) // How to update states
  }

  // Function to update data - API
  const updateData = (event) => {
    event.preventDefault()
    fetch(REACT_APP_API_SERVICE + newPlanet.id + '/', {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPlanet)
    })
      .then((response) => response.json())
      .then((data) => {
        props.onSetData(data)
        alert('Planet: ' + data.name + ' edited')
        props.onClose()
      }) // How to update states
  }

  return(

    <div className="modal-form" onClick={props.onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>

        <div className="modal-header">
          <h4 className="modal-title">{props.title}</h4>
        </div>

        <div className="modal-body container">
          <form className="input-group align-items-center " onSubmit={props.edit ? updateData : sendData}>
            
            <input 
              type="text" 
              className="form-control input"
              placeholder="Name"
              value={newPlanet.name}
              onChange={handleInputs}
              name="name" required />

            <input 
              type="number" 
              className="form-control input"
              placeholder="Number of satellites"
              value={newPlanet.satellites}
              onChange={handleInputs} 
              name="satellites" required />

            <input 
              type="number" 
              className="form-control input"
              placeholder="Diameter in Km"
              value={newPlanet.diameter}
              onChange={handleInputs} 
              name="diameter" required  />

            <button type="submit" className="button btn btn-success">{props.edit ? 'Edit ' : 'Create '} planet </button>
          </form>
        </div>

        <div className="modal-footer">
          <button className="btn btn-outline-secondary" onClick={props.onClose} >Close</button>
        </div>
      </div>
    </div>
  );
}

export default CreateEditPlanet;