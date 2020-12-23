'use strict';

class Meta extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.data) {
      return (
          <th colSpan="2" className="meta">
              <h1 onClick = {()=>open(this.props.data.url)} className="name">{this.props.data.name}</h1>
              <img height="25px" className="country" src={`https://www.countryflags.io/${this.props.data.country_iso2}/flat/64.png`}></img>
              <h2 className="wca_id">{this.props.data.wca_id}</h2>
              <img onClick = {()=>open(this.props.data.avatar.url)} height="75px" src={this.props.data.avatar.url}></img>
          </th>
      )
    }
    else {
      return (
        <div>
          <h2>Placeholder</h2>
        </div>
      )
    }
}
}