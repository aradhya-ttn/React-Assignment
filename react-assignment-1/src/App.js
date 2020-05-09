import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Tabel from './Fruit/fruit';

class App extends Component {

  state = {
    fruits: [],
    inputfruit:'',
    showFruits:false
  };

  changeHandler=(event)=>{
    let FruitValue=event.target.value;
    this.setState({
      inputfruit : FruitValue
    })
    
  }
  
  inputFruitHandler =(event)=>{
    event.preventDefault();
    const data=this.state.inputfruit;
    if(data ==''){
      
      this.state.showFruits=false;
    }else{
      this.state.showFruits=true;
      let fruits=[...this.state.fruits];
    let fruitvalue=this.state.inputfruit;

    fruits.push({
      name: fruitvalue.split('-')[0],
      quantity: fruitvalue.split('-')[1]
    })
    this.setState({
      inputfruit:'',
      fruits:fruits
    });
    }
  }
  deletePersonHandler=(fruitIndex)=>{
    const fruits=this.state.fruits;
    fruits.splice(fruitIndex,1);
    this.setState({fruits:fruits})
  }
  

  render() {
    let fruits=null;
    if(this.state.showFruits){
      fruits=(
        <div>
          {this.state.fruits.map((fruit,index) =>{
            return <Tabel
            click={()=>this.deletePersonHandler(index)}
            fruitName={fruit.name}
            quantity={fruit.quantity}
            />
          })}
          </div>
          );
          }
         
    console.log(this.state);
    // <Tabel fruitName={this.state.fruits[0]} quantity={this.state.fruits[1]}/>
    return (
       <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          <form>
          <div className="submit">
          <br/><input type="text"   value= {this.state.inputfruit} onChange={this.changeHandler}></input><br/>
          <br/><button type="submit" className="button" onClick={this.inputFruitHandler}>Submit
          </button><br/>
          </div>
          </form>
          {fruits}
      </div>
    );
  }
}

export default App;
