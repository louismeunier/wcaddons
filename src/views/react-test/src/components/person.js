'use strict';

class Person extends React.Component {
  constructor(props) {
      super(props);
      this.state = { data: [], events: ["222","333","444","555","666","777","333bf","333fm","333oh","clock","minx","pyram","skewb","sq1","444bf","555bf","333mbf"]};
      this.callAPI();
  }

  callAPI() {
    chrome.storage.local.get(["wcaData"], (items) => {
        var wcaIDs = items.wcaData;
        wcaIDs.forEach(id => {
            axios.get(`https://www.worldcubeassociation.org/api/v0/persons/${id}`)
                .then((response) => {
                    var data = response.data;
                    this.setState(prevState => ({ data: [...prevState.data, data]}));
                })
                .catch((error) => {
                    console.log("Error!");
                    return error;
                })
                .then(()=>{
                    console.log("API called");
                })
        });
        
    })
  }

  render() {
    return (
        <table >
            <thead>
                <tr>
                    <td id="whitespace"></td>
                    {this.state.data.map((person,index) => <Meta key={index} data={person.person}/>)}
                </tr>
                <tr>
                    <td className="type-header">events</td>
                    {this.state.data.map((person,index)=><React.Fragment key={index}><td className="type-header">single</td><td className="type-header">average</td></React.Fragment>)}
                </tr>
            </thead>
            <tbody>
                {this.state.events.map((event,index) => <tr key={index}><td>{event}</td>{this.state.data.map((person,index)=> <Result key={index} person={person} event={event}/>)}</tr>)}
            </tbody>
        </table>
    )
    }
}

let domContainer = document.querySelector('#stats');
ReactDOM.render(<Person />, domContainer);