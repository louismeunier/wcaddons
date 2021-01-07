'use strict';

class AddPerson extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '',  submitted: false };
    
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
            //remove all results w/o wca id (useless, can't look up results) AND limit to first 5 results
            var formattedResult = data.result.filter(e => e.wca_id!=null).slice(0,5);
            this.setState({result:formattedResult});
        })
        .catch((error) => {
            console.log(error);
        })
        .then(()=>{
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
                  <img src="../../../images/search.png" onClick={this.handleSubmit} height="24"></img>
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
                  <img src="../../../images/search.png" onClick={this.handleSubmit} height="24"></img>
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
                    <img src="../../../images/search.png" onClick={this.handleSubmit} height="24"></img>
                </form>
                <div id="results">{this.state.result.map((person,index)=> <React.Fragment key={index}><SearchResult key={index} res={person}/><br></br></React.Fragment>)}</div>
              </div>
            )
          }
          else {
            return (
              <div id="search">
                <form onSubmit={this.handleSubmit}>
                    <input id="add-input" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Search by Name/WCA ID"/>
                    <img src="../../../images/search.png" onClick={this.handleSubmit} height="24"></img>
                </form>
                <h1 id="no-results">No results found!</h1>
              </div>
            )
          }
        }
        }
      }
  }
  