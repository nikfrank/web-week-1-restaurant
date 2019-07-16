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



  render(){
    return (
      <div className='Admin Page'>
        <div className='add-form'>
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
              </tr>
            </thead>
            <tbody>
              {this.state.menuitems.map( (menuitem, i)=> (
                <tr key={i}>
                  <td>{menuitem.pagenumber}</td>
                  <td>{menuitem.pageposition}</td>
                  <td>{menuitem.lang}</td>
                  <td>{menuitem.currency}</td>
                  <td>{menuitem.price}</td>
                  <td>{menuitem.name}</td>
                  <td>{menuitem.pagetitle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default Admin;
