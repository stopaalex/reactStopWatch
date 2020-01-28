import React from 'react';
import { Component } from 'react';

import './clock.css';

class Clock extends Component {

  constructor(props) {
    super(props);

    this.state = {
      clockRuning: false,
      clockTime: {
        min: 0,
        sec: 0,
        milsec: 0
      },
      clockPaused: true,
      clockInt: null,
      intervals: []
    }
  }

  componentDidMount() {
    // this.startTime();
    //   setInterval(this.startTime, 100).bind(this);
  }

  startTime() {

    var self = this;
    let milsectime = 1 * 100;
    var int = setInterval(function () {
      // console.log(self.state);
      let min = 0, sec = 0, mil = 0;
      if (self.state.clockTime.milsec === 9) {
        mil = 0;
        if (self.state.clockTime.sec === 59) {
          sec = 0
          min = self.state.clockTime.min += 1;
        } else {
          sec = self.state.clockTime.sec += 1;
          min = self.state.clockTime.min;
        }
      } else {
        mil = self.state.clockTime.milsec += 1;
        sec = self.state.clockTime.sec;
        min = self.state.clockTime.min;
      }
      self.setState({
        clockTime: {
          min: min,
          sec: sec,
          milsec: mil
        },
        clockRuning: true,
        clockPaused: false
      });
    }, milsectime);
    this.setState({
      clockInt: int
    })
  }

  pauseTime() {
    clearInterval(this.state.clockInt);
    this.setState({
      clockInt: null,
      clockRuning: false,
      clockPaused: true
    })
  }

  clearTime() {
    this.setState({
      clockTime: {
        min: 0,
        sec: 0,
        milsec: 0
      },
      intervals: []
    });
  }

  createLap() {
    let lap = this.state.clockTime;
    lap['key'] = Date.now();
    let laps = this.state.intervals;
    lap['idx'] = laps.length + 1;

    laps.unshift(lap);


    this.setState({
      intervals: laps
    });
    console.log(this.state.intervals);
  }

  createTime() {
    let disp = Object.keys(this.state.clockTime).map(val => {
      if (val !== 'key' && val !== 'idx') {
        let strdisp = this.state.clockTime[val].toString();
        if (strdisp.length < 2) {
          strdisp = '0' + strdisp;
        }
        return strdisp;
      }
    }).join(' : ');

    disp = disp.replace(/ :  : +$/g, '');

    return <div>
      {disp}
    </div>
  }

  createButtons() {
    if (this.state.clockPaused && !this.state.clockRuning) {
      var startActive = "active";
      var pauseActive = "deactive";
    } else {
      var startActive = "deactive"
      var pauseActive = "active";
    }
    return <div>
      <div>
        <button onClick={() => this.clearTime()} className="reset">reset</button>
        <button onClick={() => this.pauseTime()} className={`pause ${pauseActive}`}>pause</button>
        <button onClick={() => this.startTime()} className={`start ${startActive}`}>start</button>
      </div>
      <div>
        <button onClick={() => this.createLap()} className={`lap ${pauseActive}`}>Lap</button>
      </div>
    </div>
  }

  createIntervals() {
    let ints = this.state.intervals.map((int, index, array) => {
      let disp = Object.keys(int).map(k => {
        if (k !== 'key' && k !== 'idx') {
          let strdisp = int[k].toString();
          if (strdisp.length < 2) {
            strdisp = '0' + strdisp;
          }
          return strdisp;
        }
        // if 
      }).join(' : ');

      disp = disp.replace(/ :  : +$/g, '');

      let split = '';

      if (index > 0) {
        let newint = this.state.intervals[index - 1];
        let oldint = int;

        // console.log(this.state.intervals[index - 1])
        // console.log(int)

        split = Object.keys(newint).map(k => {
          let s = ''
          if (k === 'min') {
            s = (newint[k] - oldint[k]).toString();
          } else if (k === 'sec') {
            s = (newint[k] - oldint[k]).toString();
          } else if (k === 'milsec') {
            s = (newint[k] - oldint[k]).toString();
            // TODO - figure out split
          }
          return s;
        }).join(' : ');

        console.log(split)
      }

      return <div className="lap-int" key={int.key}>
        <div>
          {int.idx}
        </div>
        <div>
          {disp}
        </div>
        {/* <div>
          {split}
        </div> */}
      </div>

    });
    return <div className="laps-ints">
      {ints}
    </div>
  }

  render() {
    //   this.startTime();
    let time = this.createTime();
    let buttons = this.createButtons();
    let intervals = this.createIntervals();


    return (
      <div className="Clock-main">
        <div className="Clock-time">
          {time}
        </div>
        <div className="Clock-buttons">
          {buttons}
        </div>
        <div className="Clock-intervals">
          {intervals}
        </div>
      </div>
    )
  }
}

export default Clock;
