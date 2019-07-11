import React from 'react';
import menu from './menu-database';
import './Menu.css';

class Menu extends React.Component {
  state = {
    currentLanguage: 'en',
    languages: ['en', 'fr', 'he'],
  }

  setLanguage = (event)=>{
    this.setState({
      currentLanguage: event.target.value,
    })
  }

  render(){
    const currentLanguage = this.state.currentLanguage;

    return (
      <div className='Menu Page'>
        <select value={currentLanguage}
                onChange={this.setLanguage}>
          <option value='en'>English</option>
          <option value='fr'>French</option>
          <option value='he'>Hebrew</option>
        </select>

        <div className='menu-container'>
          {menu.map(menuPage=> (
            <div className='menu-page' key={menuPage.title[currentLanguage]}>
              <h3>{menuPage.title[currentLanguage]}</h3>

              {menuPage.menuItems.map(menuItem=> (
                <div className={currentLanguage === 'he' ? 'menu-item hebrew' : 'menu-item'}
                     key={menuItem.name[currentLanguage]}>
                  <span>{menuItem.name[currentLanguage]}</span>
                  <span className='dotted-connector'><span/></span>
                  <span>${menuItem.price}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Menu;
