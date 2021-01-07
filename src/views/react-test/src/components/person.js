'use strict';

class Person extends React.Component {
  constructor(props) {
      super(props);
      this.state = {  data: [], noPeople: 0, events: ["222","333","444","555","666","777","333bf","333fm","333oh","clock","minx","pyram","skewb","sq1","444bf","555bf","333mbf"]};
      this.callAPI();
      //would like to add event listener here for chrome storage change to reload the stats page, but my fisrt attempt broke everything
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
                    console.error(error);
                    return error;
                })
                .then(()=>{
                    console.log("API called");
                })
        });
        
    })
  }

  format(type) {
      //who's faster logic
    var event,eventCol,eventForm,id;
    for (var i=0;i<this.state.events.length;i++) {
        eventForm=[];
        event=this.state.events[i];
        eventCol=document.getElementsByClassName(event+type);
        if (eventCol.length!=this.state.noPeople) return;
        for (var j=0;j<eventCol.length;j++) {
           eventForm.push(eventCol[j].innerText.fromMMSSMM());
        }
        if (eventForm.indexOf(Math.min(...eventForm))!=-1 && Math.min(...eventForm)!=Infinity) {
            id = eventCol[eventForm.indexOf(Math.min(...eventForm))].getAttribute("id");
            document.getElementById(id).style.color = "orange";
        }
    } 
  }

  componentDidUpdate() {
    this.format("single");
    this.format("average");
    setInitialTheme();
  }
  
  render() {
    if (this.state.noPeople===0) {
        return (
            <React.Fragment>
                <h1>No one added to compare!</h1>
                <AddPerson/>
            </React.Fragment>
        )
    }
    else {
        if (this.state.noPeople == this.state.data.length) {
            return (
                <React.Fragment>
                <table id="comparison">
                    <thead>
                        <tr>
                            <td id="whitespace"></td>
                            {this.state.data.map((person,index) => <Meta no={this.state.noPeople} key={index} data={person.person}/>)}
                        </tr>
                        <tr>
                            <td className="type-header">events</td>
                            {this.state.data.map((person,index)=><React.Fragment key={index}><td className="type-header">single</td><td className="type-header">average</td></React.Fragment>)}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.events.map((event,index) => <tr key={index}><td className="event">{event}</td>{this.state.data.map((person,index)=> <Result key={index} person={person} event={event}/>)}</tr>)}
                    </tbody>
                </table>
                <AddPerson/>
                </React.Fragment>
            )
        }
        else {
            return (
                <Loading/>
            )
        }
    }
    }
}

let domContainer = document.querySelector('#stats');
ReactDOM.render(<Person />, domContainer);