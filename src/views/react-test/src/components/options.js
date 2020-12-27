'use strict';

class Options extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: 'time'};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({value: event.target.value});
        
      }
    
      handleSubmit(event) {
        event.preventDefault();
        this.props.mode(this.state.value);
      }
    
      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              <select value={this.state.value} onChange={this.handleChange}>
                <option value="time">time</option>
                <option value="worldRank">wr</option>
                <option value="continentRank">cr</option>
                <option value="countryRank">nr</option>
              </select>
            </label>
            <input type="submit" value="Submit" />
          </form>
        );
      }
    }