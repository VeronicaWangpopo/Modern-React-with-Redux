import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyCaa8VTmpUmBWmMZoEuRtitDcM9Cg8DBbM';

// Create a new component. This component should produce some HTML
class App extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            videos: [],
            selectedVideo: null
         };

        this.videoSearch('surfboards');
    }

    videoSearch(term) {
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({ 
                videos: videos,
                selectedVideo: videos[0]
             });
        });
    }

    render() {
        //debounce -> 將延遲函數的執行(真正的執行)在函數最後一次調用時刻的wait 毫秒之後. 
        //            對於必須在一些輸入（多是一些用戶操作）停止到達之後執行的行為有幫助。
        //            防止觸發ajax請求,觸發多次造成資源浪費,在請求成功前，只會產生一次請求
        const vidoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

        return (
            <div>
                <SearchBar onSearchTermChagne={term => this.videoSearch(term)} />
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList 
                    onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
                    videos={this.state.videos} />    
            </div>
        );
    }
}

// Take this component's generated HTML and put it
// one the page (in the DOM) 
ReactDOM.render(<App/ >, document.querySelector('.container'));
