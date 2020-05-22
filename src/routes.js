import React, { Component } from 'react';
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom';
import Logout from "./components/view/Authentification/Logout";
import Login from "./components/view/Authentification/Login";

import MainView from './components/view/ToolView/MainView';
import { fetchModelStreamsState } from './actions/modelStreamState'
import { fetchModelState } from './actions/modelState' 
import { fetchAuthState } from './actions/authAction'
import { connect } from 'react-redux';
import { runInThisContext } from 'vm';
import Dashboard from './components/view/Dashboard/Dashboard';




class Routes extends Component{

    constructor(props){
        super(props)
          this.state={
            authenticated: false,
            authState: false,
            redirect: false,
          }
        }



    componentWillMount(){
        this.props.fetchAuthState()
        }
        
  
    componentWillReceiveProps(nextProps){
        if (nextProps.authState.authenticated === true) {
            this.setState({
                authenticated: true,
                authState: nextProps.authState,
            })
        }
        if (nextProps.authState.authenticated === false) {
            this.setState({
                redirect: false
            })
        }
    }

  

    loadModelState(){
    }
  
        render(){
            if(this.state.redirect) return  <Redirect to='/login' />
          return(
                <HashRouter >
                    <Switch>
                        <Route name='MainView' exact path='/logout' component={Logout}/>
                        <Route name='MainView' path='/business-model-tool' component={MainView}/>
                        <Route name='MainView' path='/dashboard' component={Dashboard}/>
                        <Route name='MainView' path='/' component={Login}/>
                    </Switch>
                </HashRouter>
            )
        }
    }

const mapStateToProps = state => ({
    authState: state.authState.items,
  
    })

export default connect(mapStateToProps, { fetchAuthState, fetchModelStreamsState, fetchModelState })(Routes);