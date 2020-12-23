'use strict';

class Result extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <React.Fragment>
            <td>{this.props.person.personal_records[this.props.event]!=undefined && this.props.person.personal_records[this.props.event]["single"]!=undefined ? this.props.person.personal_records[this.props.event]["single"].best/100 : "-"}</td>
            <td>{this.props.person.personal_records[this.props.event]!=undefined && this.props.person.personal_records[this.props.event]["average"]!=undefined ? this.props.person.personal_records[this.props.event]["average"].best/100 : "-"}</td>
        </React.Fragment>
    )
}
}