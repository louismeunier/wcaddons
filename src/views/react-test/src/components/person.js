'use strict';
class Person extends React.Component {
  constructor(props) {
      super(props);
      this.state = { data: [], noPeople: null, events: ["222","333","444","555","666","777","333bf","333fm","333oh","clock","minx","pyram","skewb","sq1","444bf","555bf","333mbf"]};
      //Would probably be best to move events to a global variable? Not sure
      this.callAPI();
  }

  callAPI() {
    chrome.storage.local.get(["wcaData"], (items) => {
        var wcaIDs = items.wcaData;
        this.setState({ noPeople: wcaIDs.length });
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

  format(type) {
    var event,eventCol,eventForm,id;
    for (var i=0;i<this.state.events.length;i++) {
        eventForm=[];
        event=this.state.events[i];
        eventCol=document.getElementsByClassName(event+type);
        if (eventCol.length!=this.state.noPeople) return;

        for (var j=0;j<eventCol.length;j++) {parseFloat(eventCol[j].innerText) ? eventForm.push(parseFloat(eventCol[j].innerText)):eventForm.push(Infinity)};
        
        if (eventForm.indexOf(Math.min(...eventForm))!=-1) {
            id = eventCol[eventForm.indexOf(Math.min(...eventForm))].getAttribute("id");
            document.getElementById(id).style.color = "orange";
        }
    }
  }

  componentDidUpdate() {
    this.format("single");
    this.format("average");
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