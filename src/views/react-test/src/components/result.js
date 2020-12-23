'use strict';

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.eventFormatting ={};
  }

  render() {
    return (
        <React.Fragment>
            <td id={`${this.props.person.person.wca_id}-${this.props.event}-single`} className={`${this.props.event}single`}>{this.props.person.personal_records[this.props.event]!=undefined && this.props.person.personal_records[this.props.event]["single"]!=undefined ? this.props.person.personal_records[this.props.event]["single"].best/100 : "-"}</td>
            <td id={`${this.props.person.person.wca_id}-${this.props.event}-average`} className={`${this.props.event}average`}>{this.props.person.personal_records[this.props.event]!=undefined && this.props.person.personal_records[this.props.event]["average"]!=undefined ? this.props.person.personal_records[this.props.event]["average"].best/100 : "-"}</td>
        </React.Fragment>
    )
    
}
}