import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import {
  updateUser,
  getUser,
  registerUser,
  verifyToken,
  loginUser } from './services/user';
import {
    getPosts,
     } from './services/post';
import './App.css';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import PostForm from './components/PostForm';

import ProfilePic from './components/ProfilePic';
import Banner from './components/Banner';
import BioForm from './components/BioForm';
import UserProfile from './components/UserProfile';
import EditForm from './components/EditForm';
import RandomUser from './components/RandomUser';
import SpecificUser from './components/SpecificUser';
import HomeBlock from './components/HomeBlock';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registerFormData: {
        name: '',
        email: '',
        password: '',
      },
      currentUser: [],
      loginFormData: {
        email: '',
        password: ''
      },
      postForm: {
        body: '',
        description: '',
        posted_by: ''
      },
      posts: [],
      bioForm: {
        location: '',
        bio: '',
      },
      thisUser: [],
    }
    this.handleRegisterFormChange = this.handleRegisterFormChange.bind(this);
    this.handleLoginFormChange = this.handleLoginFormChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleBioFormChange = this.handleBioFormChange.bind(this);
    this.submitBio = this.submitBio.bind(this);
    this.fetchUser = this.fetchUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  };

  async fetchUser() {
    const thisUser = await getUser(this.state.currentUser.id)
    this.setState({
    thisUser: thisUser
    })
  }

  async componentDidMount() {
      const { user } = await verifyToken();
      if (user !== undefined) {
      this.setState({
        currentUser: user
      })
      }
    }

  async fetchPosts() {
     const posts = await getPosts();
     this.setState({
       posts
     });
   }

   async handleLogin(e) {
       e.preventDefault();
       const { user }= await loginUser(this.state.loginFormData);
       this.setState({
         currentUser: user,
         postForm: {
           posted_by: user.name
         }
       });
       localStorage.setItem('id', user.id);
       localStorage.setItem('name', user.name);
       this.fetchPosts();
       this.props.history.push('/feed');
     }


  handleLoginFormChange(e) {
    const { name, value } = e.target;
    this.setState(prevState => ({
      loginFormData: {
        ...prevState.loginFormData,
        [name]: value
      }
    }));
  }

  handleRegisterFormChange(e) {
    const { name, value } = e.target;
    this.setState(prevState => ({
      registerFormData: {
        ...prevState.registerFormData,
        [name]: value
      }
    }));
  }

  async handleRegister(e) {
   e.preventDefault();
   const { registerFormData } = this.state;
   const { user } = await registerUser(registerFormData);
   this.setState({
     currentUser: user,
     postForm: {
       posted_by: user.name
     }
   });
   localStorage.setItem('id', user.id);
   localStorage.setItem('name', user.name);
   this.fetchPosts();
   this.props.history.push('/updateprofile');
 }


  handleBioFormChange(e) {
   const { name, value } = e.target;
   this.setState(prevState => ({
     bioForm: {
       ...prevState.bioForm,
       [name]: value
     }
   }))
 }

 handleLogout() {
  localStorage.clear();
  this.props.history.push('/');
}

  async submitBio(e){
    e.preventDefault();
    const id = await localStorage.getItem('id');
    await updateUser(id, this.state.bioForm);

    this.props.history.push(`/feed`);
   }

  render() {
    return (

      <div className="App">

      <Route exact path="/register" render={(props) => {
          const {
            name,
            email,
            password
          } = this.state.registerFormData;
          return (
          <>
          <RegisterForm
          name={name}
          email={email}
          password={password}
          handleChange={this.handleRegisterFormChange}
          handleSubmit={this.handleRegister} />
          </>
          )
        }} />

      <Route exact path="/" render={(props) => {
        const {
        email,
        password
        } = this.state.loginFormData;
        return (
        <div className="home-page">
        <HomeBlock />
        <LoginForm
        email={email}
        password={password}
        handleChange={this.handleLoginFormChange}
        handleSubmit={this.handleLogin} />
        </div>
        )
        }} />


      <Route exact path="/feed" render={(props) => {
      return (
      <>
      <nav>
      <div className="logo" style={{ backgroundImage: 'url(/media/header.gif)' }}></div>
      <div className='nav-links'>
      <Link className="nav-buttons" to='/userprofile'>View Profile</Link>
      <div onClick={this.handleLogout} className="nav-buttons">Logout</div>
      </div>
      </nav>

      <div className="body">
      <RandomUser />
      <PostForm {...props}
      currentUser={this.state.currentUser.id}
      />
      </div>

      </>
      );
      }} />

      <Route exact path='/updateprofile' render={(props) => {
      return (
        <>
        <nav>
        <div className="logo" style={{ backgroundImage: 'url(/media/header.gif)' }}></div>

        <div className='nav-links'>
        <Link className="nav-buttons" to='/feed'>Home</Link>
        <Link className="nav-buttons" to='/userprofile'>View Profile</Link>
        <div className="nav-buttons" onClick={this.handleLogout}>Logout</div>
        </div>
        </nav>

        <div className="useredit">
        <Banner {...props}
        banner={this.state.currentUser.banner}
        />

        <div className="userblurbs">
        <ProfilePic {...props}
        profile_pic={this.state.currentUser.profile_pic}
        />
        <BioForm {...props}
        fetchUser={this.fetchUser}
        />
        </div>
        </div>

        </>
      )
      }}/>

      <Route exact path='/userprofile' render={(props) => (
      <>
      <nav>
      <div className="logo" style={{ backgroundImage: 'url(/media/header.gif)' }}></div>

      <div className='nav-links'>
      <Link className="nav-buttons" to='/feed'>Home</Link>
      <Link className="nav-buttons" to='/updateprofile'>Edit Profile</Link>
      <div className="nav-buttons" onClick={this.handleLogout}>Logout</div>
      </div>
      </nav>

      <UserProfile />
      </>
      )} />

      <Route exact path='/post/:id/edit' render={(props) =>(
      <>
      <nav>
      <div className="logo" style={{ backgroundImage: 'url(/media/header.gif)' }}></div>

      <div className='nav-links'>
      <Link className="nav-buttons" to='/feed'>Home</Link>
      <Link className="nav-buttons" to='/userprofile'>View Profile</Link>
      <div className="nav-buttons" onClick={this.handleLogout}>Logout</div>
      </div>
      </nav>

      <EditForm {...props}
      />
      </>
      )} />

      <Route exact path='/user/:id' render={(props) => (
      <>
      <nav>
      <div className="logo" style={{ backgroundImage: 'url(/media/header.gif)' }}></div>

      <div className='nav-links'>
      <Link className="nav-buttons" to='/feed'>Home</Link>
      <Link className="nav-buttons" to='/userprofile'>View Profile</Link>
      <div className="nav-buttons" onClick={this.handleLogout}>Logout</div>
      </div>
      </nav>

      <SpecificUser {...props}/>
      </>
      )} />

      </div>
    );
  }
}

export default withRouter(App);
