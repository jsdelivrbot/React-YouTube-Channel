import _ from 'lodash'; // for debounce function (300 ms delay)
import React, { Component } from 'react'; //when creating classes, Component is needed
import ReactDOM from 'react-dom'; //needed for redering the App into the container

import YTSearch from 'youtube-api-search'; //youtube api lib
import SearchBar from './components/search_bar'; //our Component
import VideoList from './components/video_list'; //our Component
import VideoDetail from './components/video_detail'; //our Component

const API_KEY = 'AIzaSyBPl9qkWoPOOII_W0vpHzoWCNQX5ru2nO4'; //youtube api_key

class App extends Component {
  //every class needs a constructor with super(props)
  // in order to pass props to all of its methods (this), unlike a functions.
  constructor(props) {
    super(props);

    //holds all dynamic data to be change and used throughout the app.
    this.state = {
      videos: [], //an array of video objects from youtube
      selectedVideo: null //our selected video to be shown (init with null)
    };

    //the actual youtube api request (via our method videoSearch)
    this.videoSearch('lior davidi'); //init search term
  }

  //fetches the videos by API_KEY & term, setting App states to their values
  videoSearch(term){
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0] //showing the first video in the array
      });
    });
  }

  // every class renders its stuff on events
  render() {
    // make sure VideoSearch function is called with a delay of 300 ms
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

    // return holds HTML tags structure to be injected with data
    // creating custom props (attribute) inside aa tag to trigger a method
    return (
      <div>
        <SearchBar onSearchTermChange={term => this.videoSearch(term)} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
          videos={this.state.videos} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
