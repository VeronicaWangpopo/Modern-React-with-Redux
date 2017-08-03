import React, { Component } from 'react';


class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = { term: ''};
    }

    render() {
        return (
            <div className="search-bar">
                <input
                    value={this.state.term} 
                    onChange={event => this.onInputChagne(event.target.value)} />
            </div>
        );
    }

    onInputChagne(term) {
        this.setState({term});
        this.props.onSearchTermChagne(term);
    }

    
    //使用class，呼叫自己的function要加this
    //若沒加this的話，則會呼叫外層的function，若找不到外層的function，程式會死掉

    /*
    return <input onChange={this.onInputChange} />;
    onInputChange(event) {
        console.log(event.target.value);
    }
    */

    //不過上述解法有可能踩到雷(this會變成windows)
    //所以有兩種解法
    //1.arrow function
    //2.constructor
}

export default SearchBar;