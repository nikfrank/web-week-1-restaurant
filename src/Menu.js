import React from 'react';
//import menu from './menu-database';
import './Menu.css';

const currencyByLang = {
  en: 'USD',
  fr: 'EUR',
  he: 'ILS',
};

const currencySymbols = {
  USD: '$',
  EUR: '€',
  ILS: '₪',
};

class Menu extends React.Component {
  state = {
    currentLanguage: 'en',
    languages: ['en', 'fr', 'he'],
    menu: [],
  }

  setLanguage = (event)=>{
    this.setState({
      currentLanguage: event.target.value,
    })
  }

  componentDidMount(){
    window.scrollTo(0,0);

    fetch('/menuitem')
      .then(response => response.json())
      .then(menuitems => {

        const reducerPages = menuitems.reduce((pages, item)=> pages.map((page={
            title: {},
            menuitems: []
          }, i)=>(
            i !== item.pagenumber ? page : ({
              title: { ...page.title, [item.lang]: item.pagetitle },
              menuitems: (page.menuitems.length ?
                page.menuitems:
                [...Array(menuitems.filter(({ pagenumber, lang })=> (pagenumber === i) && (lang === 'en')).length)]
              ).map((pagemenuitem={ name: {}, price: {} }, pmi)=> (
                pmi !== item.pageposition ? pagemenuitem : ({
                  name: { ...pagemenuitem.name, [item.lang]: item.name },
                  price: { ...pagemenuitem.price, [item.currency]: item.price }
                })
              ))
            })
        )), [...Array( Array.from(new Set(menuitems.map(mi=> mi.pagenumber))).length )]);

        let pages = [];
        for(let i=0; i<(menuitems.length); i++){
          const currentPage = menuitems[i].pagenumber;
          const currentLang = menuitems[i].lang;

          if( !pages[currentPage] ) {
            pages[currentPage] = { title: {}, menuitems: [] };
          }

          if( !pages[currentPage].menuitems[menuitems[i].pageposition] ){
            pages[currentPage].menuitems[menuitems[i].pageposition] = {
              name: {}, price: {},
            };
          }

          pages[currentPage].title[currentLang] = menuitems[i].pagetitle;
          pages[currentPage].menuitems[menuitems[i].pageposition].name[currentLang] =
            menuitems[i].name;
          pages[currentPage].menuitems[menuitems[i].pageposition].price[menuitems[i].currency] =
            menuitems[i].price;
        }
        
        this.setState({ menu: pages });
      });
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
          {this.state.menu.map(menuPage=> (
            <div className='menu-page' key={menuPage.title[currentLanguage]}>
              <h3>{menuPage.title[currentLanguage]}</h3>

              {menuPage.menuitems.map(menuItem=> (
                <div className={currentLanguage === 'he' ? 'menu-item hebrew' : 'menu-item'}
                     key={menuItem.name[currentLanguage]}>
                  <span>{menuItem.name[currentLanguage]}</span>
                  <span className='dotted-connector'><span/></span>
                  <span>
                    {currencySymbols[currencyByLang[currentLanguage]]}
                    {menuItem.price[currencyByLang[currentLanguage]]}
                  </span>
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
