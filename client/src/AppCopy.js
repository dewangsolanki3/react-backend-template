import React, { Component } from 'react'
import './App.css'
import axios from 'axios'

class App extends Component {

  state = {
    name:"",
    age:"",
    message:"",
    myPosts: []
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  
  
  submit = (e) => {
    e.preventDefault()  // just stops from refreshing page

    const payload = {
      name: this.state.name,
      age: this.state.age,
      message: this.state.message
    }

    axios.post('http://localhost:5000/save', payload)
    .then(() => {
      console.log("Sent")
      this.getPosts()

      this.setState({
        name:"",
        age:"",
        message:"",
      })

    })
    .catch( (error) => {
      console.log(error)
    })


  }





  getPosts = () => {

    axios.get('http://localhost:5000/')
    .then( response => {
      let posts = response.data
      console.log(posts)
      this.setState({
        myPosts: posts
      })
    })
    .catch( () => console.log("error Fetching data "))

  }



componentDidMount(){
  this.getPosts()
}



  render() {
    return (
      <div id="parent">

      <h1>Lets' Vibe! </h1>
      <span> ... the Best Party Planner App</span>

      <form onSubmit={this.submit}>
        
        <input  name="name" value={this.state.name}  onChange={this.handleChange} placeholder="Name" ></input>  <br/>
      
        <input  name="age" value={this.state.age}  onChange={this.handleChange} placeholder="Age" ></input>  <br/>
      
        <textarea  name="message" value={this.state.message}  onChange={this.handleChange} placeholder="Message..."></textarea>  <br/>

        <button type="submit">Submit</button>
      
      </form>











       {this.state.myPosts.map( n => {
          return <div key={n._id} className="box">
                  <h2>Name: {n.name}</h2>
                  <h4>Age: {n.age}</h4>
                  <h4>Message: {n.message}</h4>
                </div>   
          } 
        )}






    </div>
  );

  }
}

export default App;











// ==========================================================================
// ^^^^^^^^^ WORKSHOP Codes ^^^^^
// ==========================================================================

























import React, { Component } from 'react'
import axios from 'axios';

class App extends Component {

    constructor(props) {
        super(props)
            this.state = {
                id: "",
                username:"",
                useremail:"",
                usermsg:"",
                posts:[],
                num : "",
            }
    }    

    // increment = (e) => {

    //     axios({
    //         url:'/add',    // "proxy" to Backend-url(http://localhost:8000) ~ package.json
    //         method:'POST',
    //     })
    //     .then( () => console.log("Successfully sent data") )
    //     .catch(() => console.log("problem sending data"))
    
    // }

    submit = (e) => {
        e.preventDefault();     // prevents page from refreshing after Submit Click
        const payload = {
            username: this.state.username,
            useremail: this.state.useremail,
            usermsg: this.state.usermsg,
        }
    
        if(this.state.id == ""){

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
        
        else {
            axios({
                url: '/edit/' + this.state.id,
                method: 'PUT',
                data: payload
            })
            .then(() => {
                console.log("Successfully sent data to Update")
                // this.setState({
                //   formSubmit : true   /// plans of displaying ty message when user submits 
                // })
                this.getBlogPost();
            })
            .catch(() => console.log("problem sending data to update"))
        
            this.setState({
                id: "",
                username:"",
                useremail:"",
                usermsg:""
            }) 
        }
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
            // console.log("Data displayed on sCREEN")
            console.log("this.state.posts : [] " , data)
        })  
        .catch(() => {
            console.log("Error Displaying data on screen.")
        })
    }


    editForm = (n) => {
        this.setState({
            id: n._id,
            username: n.username,
            useremail: n.useremail,
            usermsg: n.usermsg
        })
        console.log(n.username)
    }


    deleteIt = (id) => {
        axios({
            url:'delete/'+ id,    // "proxy" to Backend-url(http://localhost:8000/delete/) ~ package.json
            method:'GET',
        })
      this.getBlogPost();
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
    <>
            <form onSubmit={this.submit} >

              <input  name="username" value={this.state.username} onChange={this.handleChange} type="text" placeholder="Your Name" />

              <input name="useremail" value={this.state.useremail} onChange={this.handleChange} type="email" placeholder="Your Email" />
              
              <textarea name="usermsg" value={this.state.usermsg} onChange={this.handleChange} type="text" placeholder="Your Message ..." rows="5" style={{display:"block", width:"350px"}}></textarea>
                      
              <button type="submit"> {this.state.id !== "" ? "Update" : "Create"} </button>


              {/* <div>
                  {this.displayBlogPost(this.state.posts)}
              </div> */}
        
            </ form>


            { 
                this.state.posts.map( (n, i) => (
                <div key={i}>
                    <h3>{n.username}</h3>
                    <p>{n._id}</p>
                    <p>{n.date}</p>
                    <p>{n.useremail}</p>
                    <p>{n.usermsg}</p>
                    <button onClick={() => this.deleteIt(n._id)}>Delete</button>
                    <button onClick={() => this.editForm(n)}>Edit</button>
                </div>
                ))
            }


            {/* <form onSubmit={this.increment}>
              <input  name="num" value={this.state.n} onChange={this.handleChange} type="number" placeholder="Your Name" />
                
              <button type="submit"> +++++++++ </button>
            </form> */}
    </>
        )
    }
}

export default App
