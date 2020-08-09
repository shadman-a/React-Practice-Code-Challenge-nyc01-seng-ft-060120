import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {

  state = {
    sushiData: [],
    page: 0,
    money: 100,
    eaten: []
  }

  componentDidMount() {
    fetch(API)
    .then(resp => resp.json())
    .then(data => this.setState({sushiData: data}))
  }

  four = () => {
    return this.state.sushiData.slice(this.state.page, this.state.page + 4)
  }

  moreSushi = () => {
    let newPage =  this.state.page + 4
    if (newPage >= this.state.sushiData.length) {
      newPage = 0
    }
    this.setState({
      page: newPage
    })
    
  }

  eat = (sushi) => {
    const newMoney = this.state.money - sushi.price

    if (!this.state.eaten.includes(sushi) && newMoney >=0 ) {
      this.setState({
        eaten: [...this.state.eaten, sushi],
        money: newMoney
      })
    }
  }

  render() {
    return (
      <div className="app">
        <SushiContainer sushiData={this.four()} moreSushi={this.moreSushi} eat={this.eat} eaten={this.state.eaten} />
        <Table moneyLeft={this.state.money} eaten={this.state.eaten} />
      </div>
    );
  }
}

export default App;