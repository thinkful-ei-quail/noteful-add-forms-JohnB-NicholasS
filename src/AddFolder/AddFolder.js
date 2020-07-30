import React from 'react'
import ApiContext from '../ApiContext'
import config from '../config'
import './AddFolder.css'

export default class AddForm extends React.Component {

  static contextType = ApiContext

  handleFormSubmit = e => {
    e.preventDefault()
    const folderName = e.target.name.value
    const options = {
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify({name: folderName})
    }
    fetch(`${config.API_ENDPOINT}/folders`, options)
      .then(resp => {
        if(!resp.ok) {
          throw new Error('Something went wrong, please try again')
        }
        return resp.json()
      })
      .then(data => this.context.addFolder(data))
      .then(this.props.history.push('/'))
      .catch(err => console.log(err.message))
    
  }


  render() {
    return (
      <div className="folder-form">
        <h2>Create a folder</h2>
        <form onSubmit={(e) => this.handleFormSubmit(e)}>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" required />
          <button type="submit">Add folder</button>
        </form>
      </div>
    )
  }
}