'use strict';

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.eventFormatting ={};
  }

  render() {
    return (
        <React.Fragment>
            <td id={`${this.props.person.person.wca_id}-${this.props.event}-single`} className={`${this.props.event}single`}>{this.props.person.personal_records[this.props.event]!=undefined && this.props.person.personal_records[this.props.event]["single"]!=undefined ? formatResult(this.props.event, this.props.person.personal_records[this.props.event]["single"].best) : "-"}</td>
            <td id={`${this.props.person.person.wca_id}-${this.props.event}-average`} className={`${this.props.event}average`}>{this.props.person.personal_records[this.props.event]!=undefined && this.props.person.personal_records[this.props.event]["average"]!=undefined ? formatResult(this.props.event, this.props.person.personal_records[this.props.event]["average"].best) : "-"}</td>
        </React.Fragment>
    )
    
}
}