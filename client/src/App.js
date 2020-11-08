import React, { Component } from 'react'
import axios from 'axios'
import './App.css'

class App extends Component {

  state = {
    name: "",
    contact: "",
    message: "",
    myPosts: []
  }

  // Handling change in input fields for React-states
  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value   
    })
  }


  submit = (e) => {
    e.preventDefault()  // just stops page from refreshing after submit button

    const payload = {
      name: this.state.name,
      contact: this.state.contact,
      message: this.state.message
    }

    axios.post('http://localhost:5000/save' , payload)
      .then( () => {                                              // 'then' means SUCCESS block
        console.log("Yaaay! Sent data successfully")

    // Resetting Input Fields as Blank States after clicking Submit button.
        this.setState({
            name: "",
            contact: "",
            message: "",
            myPosts: []
        })

    // Calling out Posts after clicking Submit button.
        this.getPosts()
      })
      .catch( () => console.log("data not sent"))                  // 'catch' means ERROR block

  }




  getPosts = () => {
    axios.get('http://localhost:5000/')

    .then( (res) => {                                              // 'then' means SUCCESS block
      this.setState({
        myPosts: res.data       // Storing fetched data from online DataBase >>> via Server >>> in our client side 'myPosts' state array.
      })
      console.log("myPosts " , this.state.myPosts )
    })

    .catch( () => console.log("data not received"))                 // 'catch' means ERROR block  
  }


// Calling out Posts as soon as page loads.
  componentDidMount(){
    this.getPosts()
  }




  

  render() {
    return (
      <div id="parent">
        <h1>Lets' Vibe </h1> <span> ...the best party planners</span>

        <form onSubmit={this.submit}>

          <input     onChange={this.handleChange}   placeholder="Name"        value={this.state.name}     name="name"></input>  <br/>
          <input     onChange={this.handleChange}   placeholder="Contact"     value={this.state.contact}  name="contact"></input>   <br/> 
          <textarea  onChange={this.handleChange}   placeholder="Message..."  value={this.state.message}  name="message"></textarea>   <br/>

          <button type="submit">Submit</button>

        </form>





{/* Using map function to display the Fetched data that we stored in our 'this.state.myPosts' array   */}
        {this.state.myPosts.map( (guest) => {
  
          return <div key={guest._id} className="box">
                <h2>Name: {guest.name}</h2>
                <h4>Number: {guest.contact}</h4>
                <h4>Message: {guest.message}</h4>
          </div>
  
        })}





      </div>
    )
  }
}


export default App