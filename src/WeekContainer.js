import React from 'react';
import apiConfig from './apiKeys';
import DayCard from './DayCards';
import DegreeToggle from './DegreeToggle';


class WeekContainer extends React.Component {
  state = {
    fullData: [],
    dailyData: [],
    degreeType: "fahrenheit"
  }

  updateForecastDegree = event => {
    this.setState({
      degreeType: event.target.value
    }, () => console.log(this.state))
  }

  componentDidMount = (req) => {

    const weatherURL =
      `http://api.openweathermap.org/data/2.5/forecast?zip=28215&units=metric&APPID=${apiConfig.key}`

    fetch(weatherURL)
      .then(res => res.json())
      .then(data => {
        const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
        this.setState({
          fullData: data.list,
          dailyData: dailyData
        }, () => console.log(this.state))
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  formatDayCards = () => {
    return this.state.dailyData.map((reading, index) => <DayCard reading={reading} key={index} degreeType={this.state.degreeType} />)
  }

  render() {
    return (

      <div className="container">
        <h1 className="display-1">5-Day</h1>
        <h1 className="display-1">Weather Forecast</h1>
        <DegreeToggle updateForecastDegree={this.updateForecastDegree} degreeType={this.degreeType} />
        <h3 className=".display-5">Charlote,NC</h3>
        <div className="row justify-content-center">
          <div className="container2">
            {this.formatDayCards()}
          </div>
        </div>
      </div>
    )
  }
}

export default WeekContainer;