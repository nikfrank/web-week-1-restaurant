import React from 'react';
import './Home.css';
import LazyHero from 'react-lazy-hero';

const imgUrl = 'https://images.unsplash.com/photo-1550880789-92ffdcb90df1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80';

const Home = ()=> (
  <div className='Home Page'>
    <LazyHero imageSrc={imgUrl} opacity={0.2} parallaxOffset={200}>
        <h1>You want to eat our tacos</h1>
    </LazyHero>
  </div>
);


export default Home;
