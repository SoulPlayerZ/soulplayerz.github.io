import React  from 'react';
import soulzin from './soulzin.png';
import './App.css';

class App extends  React.Component{
  constructor() { 
    super();
    this.state = {
      h: 0,
      m: 0,
      s: 0,
      auxTimeTime: false,
      auxStop: false,
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
      this.setState({
        [name]: value,
        auxTime: false,
      })
      if(value >= 59){
        this.setState({
          [name]: 59,
          auxTime: false,
        })
      }
      if((value <= 0) ){
        this.setState(({
          [name]:  0,
           auxTime: false,
        }))
      }  
  }



  componentDidUpdate(_prevProps, _prevState) {
    const { m, s, auxTime, auxStop } = this.state;
    if((s < 0) && (auxTime === true) && (m > 0)) {
      this.setState((prevState) => ({
        s: 59,
        m: prevState.m - 1,
      }))
    }else if((m < 0) && (auxTime === true)) {
      this.setState({
        m: 0,
      })
    }else if((m <= 0) && ( s < 0) && (auxTime === true)){
      this.setState({
        auxTime: false,
        m: 0,
        s: 0,
      })
      alert('Fim do intervalo tribo. " Vamos com tudo ! "');
    }else if((auxTime === true) && ( s >= 0) && (auxStop === false)){
      setTimeout(() =>
      this.setState((prevState) => ({
        s: prevState.s - 1,
      })), 1000)
    }if ((s < 0) && (auxStop === true)){
      this.setState({
        s: 0,
      })
    }
  }

  start = () => {
      this.setState({
        auxTime: true,
        auxStop: false,
      });
  }    


  clear = () => {
    const { auxTime } = this.state;
    if(auxTime === true){
      this.setState({
        auxTime: false,
        h: 0,
        m: 0,
        s: 0,
        auxStop: true,
      })
    }else {
      this.setState({
        auxTime: false,
        h: 0,
        m: 0,
        s: 0,
        auxStop: true,
      })
    }
  }

  pause = () => {
    this.setState((prevState) => ({
      auxTime: false,
      auxStop: true,
    }));
  }  

  render() {
    const { m, s } = this.state;
    return (
      <main>
        <fieldset>
          <div className="inputs">
           {/*  <input type="number" name="h" placeholder="h" value={ h } min="0" max="59" onChange={ this.handleChange } /><p>:</p> */}
            <input type="number" name="m" placeholder="m" value={ m } min="0" max="59" onChange={ this.handleChange } /><p>:</p> 
            <input type="number" name="s" placeholder="s" value={ s } min="0" max="59" onChange={ this.handleChange } /> 
          </div>  
        </fieldset>
      <section className="buttons">
        <button type="button" onClick={ this.start }>Start</button>
        <button type="button" onClick={ this.pause }>Pause</button>
        <button type="button" onClick={ this.clear }>Stop</button>
      </section>    
      <img src={ soulzin } className="soulzin" alt="Soul-twitch-logo" />
      <a href="https://www.twitch.tv/soulplayer_z" target="_blank" rel="noreferrer">www.twitch.tv/soulplayer_z</a>
    </main>
    );
  }
}

export default App;