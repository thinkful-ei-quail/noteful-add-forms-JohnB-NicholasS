import React from 'react';
import ApiContext from '../ApiContext'
import config from '../config'

export default class AddNote extends React.Component {
   state= {error:null, name:{value: ''}};
   setName = name => {
       this.setState({name: {value:name}});
   }; 
    static contextType = ApiContext

   validateName = () => {
       let name = this.state.name.value;
       if ( !name.length > 0 ) {
           return 'Name is required';
       }
   }

    handleFormSubmit = e => {
      e.preventDefault()
      const NoteName = e.target.name.value
      const content = e.target.content.value
      const folderId = e.target.folder.value  
      const modifiedDate = new Date()
    
      const options = {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(
            {name: NoteName, 
            modified: modifiedDate, 
            folderId:folderId, 
            content:content})
      }
      fetch(`${config.API_ENDPOINT}/notes`, options)
        .then(resp => {
          if(!resp.ok) {
            throw new Error('Something went wrong, please try again')
          }
          return resp.json()
        })
        
        .then(data => {
            this.context.addNote(data)
            this.props.history.push('/')
        })
        .catch(err => this.setState({error:err.message}))   
    }      
    render() {
        const dropdown=this.context.folders.map(folder => {
            return (
                <option key={folder.id} value={folder.id}>{folder.name}</option>
            )
           
        })
            console.log(dropdown)
      return (
        <div className="Note-form">
          <h2>Create a note</h2>
          <form onSubmit={(e) => this.handleFormSubmit(e)}>
            <label htmlFor="name" >Name</label>
            <input id="name" name="name"  value={this.state.name.value} onChange={(e)=> this.setName(e.target.value)} required />
            {this.validateName() && <div style={{color:"red"}} className='validationError'>*name is required</div>}
            <label htmlFor="content">Content</label>
            <textarea id="content" name="content" />
            <label htmlFor="folder">Folder</label>
            <select id="folder" name="folder">
                <option value="null">...</option>
                    {dropdown}
            </select>
            <button type="submit">Add note</button>
          </form>
          {this.state.error && <div style={{color:"red"}} className='formError'>{this.state.error}</div>}
        </div>
      )
    }
}