import React, { Component } from 'react'
import axios from 'axios';

class App extends Component {

    constructor(props) {
        super(props)
            this.state = {
                username:"",
                useremail:"",
                usermsg:"",
                posts:[]
            }
    }    

    submit = (e) => {
        e.preventDefault();     // prevents page from refreshing after Submit Click
        const payload = {
            username: this.state.username,
            useremail: this.state.useremail,
            usermsg: this.state.usermsg,
        }
    
        axios({
            url:'/save',    // "proxy" to Backend-url(http://localhost:8000) ~ package.json
            method:'POST',
            data: payload
        })
        .then(() => {
            console.log("Successfully sent data")
            // this.setState({
            //   formSubmit : true   /// plans of displaying ty message when user submits 
            // })
            this.getBlogPost();
        })
        .catch(() => console.log("problem sending data"))
    
        this.setState({
            username:"",
            useremail:"",
            usermsg:""
        })        
    }

    // Fetch Data from Backend (axios)
    getBlogPost = () => {
        axios.get('/api')             // Just a route names '/api' at backend
        .then((res) => {
            const data = res.data;
            data.reverse();
            this.setState({
                posts: data 
            })
            console.log("Data displayed on sCREEN")
            console.log("this.state.posts : [] " , data)
        })  
        .catch(() => {
            console.log("Error Displaying data on screen.")
        })
    }

     // Display above fetched Data
    displayBlogPost = (posts) => {
        if(!posts.length) return null;
    
        return posts.map( (n, i) => (
            <div key={i}>
                <h3>{n.username}</h3>
                <p>{n.date}</p>
                <p>{n.useremail}</p>
                <p>{n.usermsg}</p>
                <button onClick={() => this.deleteIt(n._id)}>Delete</button>
            </div>
        ))
    }

    deleteIt = (id) => {
          axios({
            url:'delete/'+ id,    // "proxy" to Backend-url(http://localhost:8000/delete/) ~ package.json
            method:'GET',
        })
    }


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

        
    componentDidMount = () => {
      this.getBlogPost();
    }
  

    render() {
        return (
  
            <form onSubmit={this.submit} >

              <input  name="username" value={this.state.username} onChange={this.handleChange} type="text" placeholder="Your Name" />

              <input name="useremail" value={this.state.useremail} onChange={this.handleChange} type="email" placeholder="Your Email" />
              
              <textarea name="usermsg" value={this.state.usermsg} onChange={this.handleChange} type="text" placeholder="Your Message ..." rows="5" style={{display:"block", width:"350px"}}></textarea>
                      
              <button variant="primary" type="submit"> Submit </button>


              <div>
                  {this.displayBlogPost(this.state.posts)}
              </div>
        
            </ form>

        )
    }
}

export default App
