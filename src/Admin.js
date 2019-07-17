import React from 'react';
import './Admin.css';

class Admin extends React.Component {

  state = {
    username: 'admin',
    password: 'guest',
    sessionToken: null,

    pagenumber: 0,
    pageposition: 0,
    lang: 'en',
    currency: 'USD',
    price: 0,
    name: '',
    pagetitle: '',

    currentlyEditing: {},
  }

  componentDidMount(){
    setTimeout(()=> this.login(), 1000);
  }

  setUsername = (event)=>{
    this.setState({ username: event.target.value })
  }

  setPassword = (event)=> {
    this.setState({ password: event.target.value })
  }

  setPagenumber = event => this.setState({
    pagenumber: 1*event.target.value,
  })

  setPageposition = event => this.setState({
    pageposition: 1*event.target.value,
  })

  setLang = event => this.setState({
    lang: event.target.value,
  })

  setCurrency = event => this.setState({
    currency: event.target.value,
  })

  setPrice = event => this.setState({
    price: 1*event.target.value,
  })

  setName = event => this.setState({
    name: event.target.value,
  })

  setPagetitle = event => this.setState({
    pagetitle: event.target.value,
  })

  keys = [
    'pagenumber',
    'pageposition',
    'lang',
    'currency',
    'price',
    'name',
    'pagetitle'
  ]

  setValue = this.keys.reduce((setters, key)=> ({
    ...setters,
    [key]: event => this.setState({
        [key]: (typeof this.state[key] === 'number') ?
                    1*event.target.value : event.target.value,
      })
  }), {})

  createMenuitem = ()=> {
    const {
      pagenumber,
      pageposition,
      lang,
      currency,
      price,
      name,
      pagetitle,
    } = this.state;

    fetch('/menuitem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+this.state.sessionToken,
      },
      body: JSON.stringify({
        pagenumber,
        pageposition,
        lang,
        currency,
        price,
        name,
        pagetitle,
      })
    }).then(response => response.json())
      .then(createItemResponse => {
        console.log(createItemResponse);
        this.getMenu();
      })
  }

  login = ()=> {
    fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    }).then(response => response.json())
      .then(loginResponse => this.setState({
        sessionToken: loginResponse.token,
      }, this.getMenu));
  }

  getMenu = ()=> {
    fetch('/menuitem')
      .then(response => response.json())
      .then(menuitems => this.setState({ menuitems }))
  }

  destroy = id=> {
    fetch('/menuitem/'+id, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer '+this.state.sessionToken
      },
    }).then(response => {
      if(response.status >= 400){
        console.error(response.status);
      } else {
        return response.json();
      }
    }).then(responseJson=> this.getMenu());
  }

  startEditing = menuitem=> {
    this.setState({
      currentlyEditing: {
        ...this.state.currentlyEditing,
        [menuitem.id]: menuitem,
      }
    })
  }

  editMenuitem = (id, key, value)=> {
    this.setState({
      currentlyEditing: {
        ...this.state.currentlyEditing,
        [id]: {
          ...this.state.currentlyEditing[id],
          [key]: typeof this.state.currentlyEditing[id][key] === 'number' ? 1*value : value,
        },
      },
    });
  }

  cancel = id=> {
    const currentlyEditing = {...this.state.currentlyEditing};
    delete currentlyEditing[id];

    this.setState({ currentlyEditing });
  }

  save = id=> {
    fetch('/menuitem/'+id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+this.state.sessionToken
      },
      body: JSON.stringify(this.state.currentlyEditing[id]),
    }).then(response=> {
      if( response.status >= 400 ) return Promise.reject(response.status);
      else return response.json();
    }).then(responseJson => {
      this.cancel(id);
      this.getMenu();
    })
      .catch(err => console.error(err));
  }

  render(){
    return (
      <div className='Admin Page'>

        <div className='add-form'>
          {
            this.keys.map(key=> (
              <label key={key}>
                {key.slice(0,5)}
                <input value={this.state[key]}
                       onChange={this.setValue[key]}
                />
              </label>
            ))
          }
          <button onClick={this.createMenuitem}>+</button>
        </div>
        <div className='add-form' style={{ display: 'none' }}>
          <label>
            pg#
            <input value={this.state.pagenumber}
                   onChange={this.setPagenumber}
            />
          </label>
          <label>
            pg pos.
            <input value={this.state.pageposition}
                   onChange={this.setPageposition}
            />
          </label>
          <label>
            lang
            <input value={this.state.lang}
                   onChange={this.setLang}
            />
          </label>
          <label>
            currency
            <input value={this.state.currency}
                   onChange={this.setCurrency}
            />
          </label>
          <label>
            price
            <input value={this.state.price}
                   step={0.01}
                   type='number'
                   onChange={this.setPrice}
            />
          </label>
          <label>
            name
            <input value={this.state.name}
                   onChange={this.setName}
            />
          </label>
          <label>
            pagetitle
            <input value={this.state.pagetitle}
                   onChange={this.setPagetitle}
            />
          </label>

          <button onClick={this.createMenuitem}>+</button>
        </div>

        { !this.state.menuitems ? (
          <div>
            <input type='text' value={this.state.username}
                   onChange={this.setUsername}
            />
            <input type='password' value={this.state.password}
                   onChange={this.setPassword}
            />
            <button onClick={this.login}>LOGIN</button>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>pg#</th>
                <th>pos.</th>
                <th>lang</th>
                <th>currency</th>
                <th>price</th>
                <th>name</th>
                <th>pg title</th>
                <th>X</th>
              </tr>
            </thead>
            <tbody>
              {this.state.menuitems.map( (menuitem, i)=> (
                (menuitem.id in this.state.currentlyEditing) ? (
                  <tr key={'edit'+i}>
                    <td>
                      <input value={this.state.currentlyEditing[menuitem.id].pagenumber}
                             onChange={event => this.editMenuitem(menuitem.id, 'pagenumber', event.target.value)}
                      />
                    </td>
                    <td>
                      <input value={this.state.currentlyEditing[menuitem.id].pageposition}
                             onChange={event => this.editMenuitem(menuitem.id, 'pageposition', event.target.value)}
                      />
                    </td>
                    <td>
                      <input value={this.state.currentlyEditing[menuitem.id].lang}
                             onChange={event => this.editMenuitem(menuitem.id, 'lang', event.target.value)}
                      />
                    </td>
                    <td>
                      <input value={this.state.currentlyEditing[menuitem.id].currency}
                             onChange={event => this.editMenuitem(menuitem.id, 'currency', event.target.value)}
                      />
                    </td>
                    <td>
                      <input value={this.state.currentlyEditing[menuitem.id].price}
                             onChange={event => this.editMenuitem(menuitem.id, 'price', event.target.value)}
                      />
                    </td>
                    <td>
                      <input value={this.state.currentlyEditing[menuitem.id].name}
                             onChange={event => this.editMenuitem(menuitem.id, 'name', event.target.value)}
                      />
                    </td>
                    <td>
                      <input value={this.state.currentlyEditing[menuitem.id].pagetitle}
                             onChange={event => this.editMenuitem(menuitem.id, 'pagetitle', event.target.value)}
                      />
                    </td>
                    <td>
                      <button onClick={()=> this.cancel(menuitem.id)}>Cancel</button>
                      <button onClick={()=> this.save(menuitem.id)}>Save</button>
                    </td>
                  </tr>
                ) : (
                  <tr key={i}>
                    <td>{menuitem.pagenumber}</td>
                    <td>{menuitem.pageposition}</td>
                    <td>{menuitem.lang}</td>
                    <td>{menuitem.currency}</td>
                    <td>{menuitem.price}</td>
                    <td>{menuitem.name}</td>
                    <td>{menuitem.pagetitle}</td>
                    <td>
                      <button onClick={()=> this.destroy(menuitem.id)}>Delete</button>
                      <button onClick={()=> this.startEditing(menuitem)}>Edit</button>
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default Admin;
