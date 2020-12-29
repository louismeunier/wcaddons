'use strict';

class AddPerson extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '', submitted: false };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({value: event.target.value});
        //If I uncomment the below, it will cause constant searching, which is nice, but also makes far more api calls so maybe slower
        //this.handleSubmit(event);
      }
    
      handleSubmit(event) {
        this.setState({ submitted: true });
        axios.get("https://www.worldcubeassociation.org/api/v0/search/users?q="+this.state.value)
        .then((response) => {
            var data = response.data;
            this.setState({result:data.result});
        })
        .catch((error) => {
            console.log("Error!");
            console.log(error);
        })
        .then(()=>{
            console.log("API called");
            this.setState({ submitted: false });
        })
        event.preventDefault();
      }
    
      render() {
        if (!this.state.result) {
          return (
            <div id="search">
              <form onSubmit={this.handleSubmit}>
                  <input id="add-input" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Search by Name/WCA ID"/>
              </form>
            </div>
          );
        }
        else {
          if (this.state.submitted) {
            return (
              <div id="search">
                <form onSubmit={this.handleSubmit}>
                  <input id="add-input" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Search by Name/WCA ID"/>
              </form>
                <Loading/>
              </div>
            )
          }
          else {
          if (this.state.result.length!=0) {
            return (
              <div id="search">
                <form onSubmit={this.handleSubmit}>
                    <input id="add-input" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Search by Name/WCA ID"/>
                </form>
                <div id="results">{this.state.result.map((person,index)=> person.wca_id?<React.Fragment key={index}><SearchResult key={index} res={person}/><br></br></React.Fragment>:"")}</div>
              </div>
            )
          }
          else {
            return (
              <div id="search">
                <form onSubmit={this.handleSubmit}>
                    <input id="add-input" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Search by Name/WCA ID"/>
                </form>
                <h1>No results found!</h1>
              </div>
            )
          }
        }
        }
      }
  }
  