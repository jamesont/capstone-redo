import "./App.css"
import axios from 'axios'
import React from 'react'

import LoginForm from "../src/components/LoginForm"
import SearchBar from "../src/components/SearchBar"
import SignUpForm from "../src/components/SignUpForm"

import {Button} from "react-materialize"
import {Col} from "react-materialize"
import {Component} from 'react'
import {Row} from "react-materialize"

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedIn: false,
      hasAccount: false,
      artistId: "",
      showArtistTable: true,
      data: [],
      albums: []
    }

    this.getArtistInformation = this.getArtistInformation.bind(this)
    this.passSearchInput = this.passSearchInput.bind(this)
  }

  getArtistInformation(spotifyIdUrl) {
    const requestForArtistId = axios.get(spotifyIdUrl) //get request returning promise
    requestForArtistId.then((data) => {
      this.setState({
        artistId: data.data.artists.items[0].id,
        genres: data.data.artists.items[0].genres
      })
      const spotifyDataUrl = `https://api.spotify.com/v1/artists/${this.state.artistId}/top-tracks?country=us`
      return axios.get(spotifyDataUrl)
    }).then((data) => {

      let albums = {}
      const {tracks} = data.data//deconstruction syntax

      tracks.forEach((album) =>{
        if(!albums[album.album.name]){
          albums[album.album.name] = album
          album.tracks = [album]
        }else{
          albums[album.album.name].tracks.push(album)
        }
      })//filters out duplicate albums
      this.setState({ data: tracks, albums: albums})
    })
  }//end getArtistInfo


  hasAccount() {
    this.setState({
      loggedIn: true,
      hasAccount: true,
      showArtistTable: this.state.showArtistTable
    })
  }

  loginTrue() {
    this.setState({
      loggedIn: true,
      hasAccount: true,
      showArtistTable: this.state.showArtistTable
    })
  }

  passSearchInput(e) {
    let formInput = e.target.value
    this.setState({setArtist: formInput})
  }

  renderLoginForm(e){
    e.preventDefault()
    return (
        <div>
          <LoginForm/>
        </div>
      )
  }

  renderSignUpForm(e){
    e.preventDefault()
    return (
      <div>
        <SignUpForm/>
      </div>
    )
  }

  render(){
    return (
      <div className="container">
        <form action="">

          <Row>
            <Col s={2}>
              <Button
                id="loginButton"
                className="btn btn-default"
                onSubmit={this.renderLoginForm.bind(this)}
                >Log In
              </Button>
            </Col>
            <Col s={2}>
              <Button
                id="signUpButton"
                className="btn btn-default"
                onSubmit={this.renderSignUpForm.bind(this)}
                >Sign Up
              </Button>
            </Col>
          </Row>

        </form>
      </div>
    )
  }

}//end class

export default App
