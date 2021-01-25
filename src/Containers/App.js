import React, {Component} from 'react';
import CardList from '../Components/CardList.js';
import SearchBox from '../Components/SearchBox';
import './App.css';
import Scroll from '../Components/Scroll';
import ErrorBoundary from '../Components/ErrorBoudary';
import {connect } from 'react-redux';
import { setSearchField, requestRobots} from '../actions';

const mapStateToProps = state => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: ()=> dispatch(requestRobots())
  }
}

class App extends Component {

  componentDidMount() {
    this.props.onRequestRobots();
  }

  render(){
    const filteredRobots= this.props.robots.filter(robot =>{
      return robot.name.toLowerCase().includes(this.props.searchField.toLowerCase())
    })

    return (
      <div className='tc'>
        <h1 className='f1'>RoboFriends</h1>
        <SearchBox searchChange={this.props.onSearchChange} />
        <Scroll>
          <ErrorBoundary>
            <CardList robots={filteredRobots} />
          </ErrorBoundary>
        </Scroll>
      </div>
    );
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
