'use strict';

class Meta extends React.Component {
  constructor(props) {
    super(props);
  }

  removePerson(id) {
    chrome.storage.local.get(["wcaData"], (items) => {
      var currentIDS = items.wcaData;
      if (currentIDS.indexOf(id)!=-1) {
          var index = currentIDS.indexOf(id);
          currentIDS.splice(index,1);
      }
      chrome.storage.local.set({"wcaData":currentIDS}, (items) => {
        //I don't want to have to reload here, but I can't get <Person/> to rerender on storage change...
          chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
              chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
          });
      })
  })

  }
  render() {
    if (this.props.data) {
      
        return (
            <th colSpan="2" className="meta">
                <h1 onClick = {()=>this.removePerson(this.props.data.wca_id)} className="name top">{this.props.data.name}</h1>
                <img height="25px" className="country" src={`https://www.countryflags.io/${this.props.data.country_iso2}/flat/64.png`}></img>
                <h2 className="wca_id">{this.props.data.wca_id}</h2>
                <img className = "avatar" onClick = {()=>open(this.props.data.avatar.url)} height="75px" src={this.props.data.avatar.url}></img>
            </th>
        )
    }
    else {
      return (
        <Loading/>
      )
    }
}
}