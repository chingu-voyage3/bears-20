import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import axios from 'axios';
import './style.css';
import Header from './Header.js';
import ProjectList from './ProjectList.js';
import ProjectInfo from './ProjectInfo.js';
import UserInfo from './UserInfo.js';

require('dotenv').load();

// console.log('react-app-url', process.env);
//
// let url = window.location.origin;
//
// axios.get(url + '/api')
// .then(res => {
//   console.log('api = ', url + '/api');
//   app(url);
// })
// .catch(err => {
//   console.error('local server not running. using heroku deployment of the server instead.');
//   app(process.env.REACT_APP_APPURL);
// });


// class Main extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       render: 'ProjectList',
//       projectId: '',
//       userId: ''
//     };
//   }
//   showProjectInfo = (id) => {
//     console.log('show project info');
//     this.setState({
//       render: 'ProjectInfo',
//       projectId: id
//     });
//   }
//   showProjectList = () => {
//     console.log('show project list');
//     this.setState({
//       render: 'ProjectList',
//       projectId: ''
//     })
//   }
//   onNameClick = (id) => {
//     console.log('show user info');
//     this.setState({
//       render: 'UserInfo',
//       userId: id
//     });
//   }
//   render() {
//     console.log('main', this.props.url+'/api');
//     return (
//       <div>
//         <Header authUrl={this.props.url+'/auth'}
//           onNameClick={this.onNameClick} />
//         <Body apiUrl={this.props.url+'/api'}
//           mainState={this.state}
//           showProjectInfo={this.showProjectInfo}
//           showProjectList={this.showProjectList} />
//       </div>
//     );
//   }
// }
//
// class Body extends Component {
//   render () {
//     switch (this.props.mainState.render) {
//       case 'ProjectList':
//         return (
//           <ProjectList url={this.props.apiUrl + '/projects'}
//             onCardClick={this.props.showProjectInfo}/>
//         );
//       case 'ProjectInfo':
//         return (
//           <ProjectInfo url={this.props.apiUrl + '/projects/' + this.props.mainState.projectId}
//           backToMain={this.props.showProjectList}/>
//         );
//       case 'UserInfo':
//         return (
//           <UserInfo url={this.props.apiUrl + '/users/' + this.props.mainState.userId}
//           backToMain={this.props.showProjectList}/>
//         );
//       default:
//     }
//   }
// }

class App extends Component {
  constructor(props) {
    super(props)

    let url = window.location.origin;
    this.state = {
      projects: [],
      user: {name: 'test'}
    }
    axios.get(url + '/api/projects')
    .then(res => {
      console.log('api = ', url + '/api');
      this.setState({projects: res.data})
    })
    .catch(err => {
      console.error('local server not running. using heroku deployment of the server instead.');
      url = process.env.REACT_APP_APPURL;
    });
  }

  render() {
    return(
    <Router>
      <div>
         <Header />
          <Route exact
            path="/"
            render={(routeProps)=> {
            return <ProjectList {...routeProps} {...this.state}  />
          }
         }/>
         <Route path="/project/:id" render={(routeProps)=> {
           return <ProjectInfo {...routeProps} {...this.state} />
          }
         }/>
         <Route path="/user/:id" render={(routeProps)=> {
           return <UserInfo {...routeProps} {...{user: this.state.user}} />
          }
         }/>
      </div>
     </Router>
   )
 }

}

  ReactDOM.render(<App
  />, document.getElementById('root'));
