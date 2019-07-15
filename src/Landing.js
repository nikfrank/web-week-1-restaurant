import React from 'react';
import './Landing.css';
import './Carousel.css';

import { Carousel } from 'react-responsive-carousel';

class Landing extends React.Component {

  onChange = (...a)=> {
    console.log('onChange', a);
  }
  onClickItem = (...a)=> {
    console.log('onClickItem', a);
  }
  onClickThumb = (...a)=> {
    console.log('onClickThumb', a);
  }

  render(){
    return (
      <div className='Landing Page'>
        <a style={{ position: 'absolute', top: 200, left: 200, zIndex: 100 }}
           onClick={()=> window.scrollTo({ top: window.innerHeight-80, behavior: 'smooth'})}>BLAH</a>
        <Carousel showArrows={true}
                  onChange={this.onChange}
                  onClickItem={this.onClickItem}
                  onClickThumb={this.onClickThumb}>
          <div>
              <img src="https://www.jessicagavin.com/wp-content/uploads/2016/09/two-mahi-mahi-fish-taco-plate-with-avocado-lime-sauce-1200.jpg" />
              <p className="legend">MMMM fish tacos</p>
          </div>
          <div>
              <img src="https://cdn.vox-cdn.com/thumbor/MkXAqjcqHwMHJ4pIQH9DZckm3PI=/0x0:1024x1024/1200x900/filters:focal(397x503:559x665)/cdn.vox-cdn.com/uploads/chorus_image/image/58429201/54730937_2174956805957995_8300011388848308224_o.38.jpg" />
              <p className="legend">MUSHROOM tacos!!!</p>
          </div>
          <div>
              <img src="https://i0.wp.com/ohmyveggies.com/wp-content/uploads/2013/02/tempeh_tacos_recipe.jpg?fit=600%2C425&ssl=1" />
              <p className="legend">Olives in tacos????</p>
          </div>
          <div>
              <img src="https://cdn.vox-cdn.com/thumbor/dhIGCe8OGUK2YslVIcxYaW-QILQ=/0x0:1280x853/1200x900/filters:focal(538x325:742x529)/cdn.vox-cdn.com/uploads/chorus_image/image/63729432/taqueria_el_mezquite.0.jpg" />
              <p className="legend">everything in tacos</p>
          </div>
          <div>
              <img src="https://www.klondikebar.com/wp-content/uploads/sites/49/2018/03/choco-taco-ice-cream.png" />
              <p className="legend">ICE CREAM TACO!!</p>
          </div>
        </Carousel>
      </div>
    );
  }
}

export default Landing;
