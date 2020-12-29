"use strict";

class InDepth extends React.Component {
    constructor(props) {
        super(props);
        this.state = { shown: false };
        this.toggleDisplay = this.toggleDisplay.bind(this);
    }

    toggleDisplay() {
        console.log("Pause");
        this.setState({shown:!this.state.shown})
    }
    render() {
        if (this.state.shown) {
            return (
                <React.Fragment>
                <button id="toggle-over-time" onClick={this.toggleDisplay}>View Over Time</button>
                <CompareOverTime/>
                </React.Fragment>
            )
        }
        else {
            return (
                <button id="toggle-over-time" onClick={this.toggleDisplay}>View Over Time</button>
            )
        }
    }
}


let domContainer = document.getElementById("indepth");
ReactDOM.render(<InDepth/>, domContainer);