import React, { Component } from 'react';
import logo from './logo.svg';
import './main-page.css';
import Header from './header';
import FeaturedHouse from './featured-house';
import HouseFilter from './house-filter';
import SearchResults from '../search-results';
import HouseDetail from '../house';

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

  fetchHouses = async () => {
    const response = await fetch('./houses.json');
    const allHouses = await response.json();
    this.allHouses = allHouses;
    this.determineFeaturedHouses();
    this.determineUniqueCountries();
  }

  determineFeaturedHouses = () => {
    if (this.allHouses) {
      const randomIndex = Math.floor(Math.random() * this.allHouses.length);
      const featuredHouse = this.allHouses[randomIndex];
      this.setState({ featuredHouse: featuredHouse });
    }
  }

  determineUniqueCountries = () => {
    const countries = this.allHouses ? Array.from(new Set(this.allHouses.map(h => h.country))) : [];
    countries.unshift(null); // Makes the first choice blank.
    this.setState({ countries: countries });
  }

  setActiveHouse = (house) => {
    this.setState({ activeHouse: house });
  }

  filterHouses = (country) => {
    this.setState({ activeHouse: null });
    const filteredHouses = this.allHouses.filter(h => h.country === country);
    this.setState({ filteredHouses: filteredHouses });
    this.setState({ country: country });
  }

  render() {
    let activeComponent = null;
    if (this.state.country) {
      activeComponent = <SearchResults country={this.state.country} filteredHouses={this.state.filteredHouses} setActiveHouse={this.setActiveHouse} />;
    }

    if (this.state.activeHouse) {
      activeComponent = <HouseDetail house={this.state.activeHouse}/>;
    }

    if (!activeComponent) {
      activeComponent = <FeaturedHouse house={this.state.featuredHouse} />;
    }

    return (
      <div className="container">
        <Header subtitle="Providing houses all over the world"/>
        <HouseFilter countries={this.state.countries} filterHouses={this.filterHouses} />
        {activeComponent}
      </div>
    );
  }
}

export default App;
