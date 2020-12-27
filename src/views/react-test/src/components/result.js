'use strict';

class Result extends React.Component {
  constructor(props) {
    super(props);
    //this.state = { show: "time" }
  }
/*
  toggleDisplay(type) {
    if (this.props.person.personal_records[this.props.event]== undefined) return;

    var time = this.props.person.personal_records[this.props.event][type].best;
    var worldRank = this.props.person.personal_records[this.props.event][type].world_rank;
    var continentRank = this.props.person.personal_records[this.props.event][type].continent_rank;
    var countryRank = this.props.person.personal_records[this.props.event][type].country_rank;
    
    var newState;
    if (this.state.show=="time") {
      newState="worldRank";
      this.setState({ show: newState })
      return time;
     
    }
    else if (this.state.show=="worldRank") {
      newState="continentRank";
      this.setState({ show: newState })
      return worldRank;
    }
    else if (this.state.show=="continentRank") {
      newState="countryRank";
      this.setState({ show: newState })
      return continentRank;
    }
    else if (this.state.show=="countryRank") {
      newState="time";
      this.setState({ show: newState })
      return countryRank;
    }
    

  } */
  render() {
    return (
        <React.Fragment>
            <td id={`${this.props.person.person.wca_id}-${this.props.event}-single`} className={`${this.props.event}single`}>{this.props.person.personal_records[this.props.event]!=undefined && this.props.person.personal_records[this.props.event]["single"]!=undefined ? formatResult(this.props.event, this.props.person.personal_records[this.props.event]["single"].best): "-"}</td>
            <td id={`${this.props.person.person.wca_id}-${this.props.event}-average`} className={`${this.props.event}average`}>{this.props.person.personal_records[this.props.event]!=undefined && this.props.person.personal_records[this.props.event]["average"]!=undefined ? formatResult(this.props.event, this.props.person.personal_records[this.props.event]["average"].best) : "-"}</td>
        </React.Fragment>
    ) 
  }
}