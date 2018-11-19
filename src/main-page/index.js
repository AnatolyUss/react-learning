import React, { Component } from 'react';
import logo from './logo.svg';
import './main-page.css';
import Header from './header';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = Object.create(null);
  }

  componentDidMount() {
    // This is one of React's lifecycle methods.
    // Called after a component gets mounted (added to React's DOM tree).
    this.fetchHouses();
  }

  async fetchHouses() {
    const response = await fetch('./houses.json');
    const allHouses = await response.json();
    this.allHouses = allHouses;
    this.determineFeaturedHouses();
  }

  determineFeaturedHouses() {
    if (this.allHouses) {
      const randomIndex = Math.floor(Math.random() * this.allHouses.length);
      const featuredHouse = this.allHouses[randomIndex];
      this.setState({ featuredHouse: featuredHouse });
    }
  }

  render() {
    return (
      <div className="container">
        <Header subtitle="Providing houses worldwide."/>
      </div>
    );
  }
}

export default App;
