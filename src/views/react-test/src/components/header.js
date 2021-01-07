"use strict";

class Head extends React.Component {
    constructor(props) {
        super(props);
        this.state = {noPeople:0};
        chrome.storage.local.get(["wcaData"], (items) => {
            console.log(items.wcaData.length);
            this.setState({noPeople:items.wcaData.length});
        })
    }
    formatHead() {
        var head="";
        for (var i=0;i<this.state.noPeople;i++) {
            if (i!=this.state.noPeople-1) {
                head+="Head-to-"
            }
            else {
                head+="Head";
            }
        }
        return head;
    }
    render() {
        if (this.state.noPeople!=0) {
            return (
                <h1>{this.formatHead()}</h1>
            )
        }
        else {
            return (
                <h1>Loading</h1>
            )
        }
    }
}

let domContainer = document.querySelector('#header');
ReactDOM.render(<Head />, domContainer);