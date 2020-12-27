'use strict';

class SearchResult extends React.Component {
    constructor(props) {
        super(props);
    }
    addPerson() {
        var id = this.props.res.wca_id;
        chrome.storage.local.get(["wcaData"], items=> {
            var wcaData = items.wcaData;
            if (wcaData.indexOf(this.props.res.wca_id)!=-1) {alert("This person is already added!");return;}
            wcaData.push(this.props.res.wca_id);
            chrome.storage.local.set({"wcaData":wcaData}, items=> {
                //Same as remove in meta.js; don't want to have to reload here, but can't get the <Person/> to rerender...
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
                });
            })
        })
    }
    render() {
        return (
            <div className="result">
                <img className="result-avatar" src={this.props.res.avatar.url}></img>
                <h1>{this.props.res.name}</h1>
                <h2>{this.props.res.wca_id}</h2>
                <img onClick={()=>{this.addPerson()}} className="add-result" src="../../../images/add.png"></img>
            </div>
        )
    }
}