import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';
import ImgPreview from '../../../assets/Dashboardpreview.png'
import ImgDelete from '../../../assets/Icons/cancel.svg'

import { fetchModelState } from '../../../actions/modelState';
import { fetchModelStreamsState } from '../../../actions/modelStreamState';
import { connect } from 'react-redux';
import firebase from 'firebase';

class Project extends Component {

    constructor(props){
        super(props);

        this.state = {          
            uid: '',
            redirect: false,
            showModelList: false,
        }
        this.fetchProjectData = this.fetchProjectData.bind(this)
        
    }

    deleteProject(){
        firebase.firestore().collection("models/").doc(this.props.authState.uid).collection('projects').doc(this.props.id).delete()
    }


    async fetchProjectData(id){
       const fetchModel = await this.props.fetchModelState(id)
       const fetchStream = await this.props.fetchModelStreamsState(id)
       const setS =  await this.setState({redirect: true})
    }
  render() {
    if(this.state.redirect) return <Redirect to='/business-model-tool' />
    let rotateClass;
    if((this.props.index % 2) == 0){
         rotateClass = this.props.manageState ? ('rotateLeft'): ('');
    }else{
         rotateClass = this.props.manageState ? ('rotateRight'): ('');
    }
   
    return (
            <div className={'Model '+ rotateClass} key={this.props.id}  onClick={() => {this.fetchProjectData(this.props.id)}}>
                {this.props.manageState ? (<div className="CancelProject" onClick={this.deleteProject.bind(this)}><img src={ImgDelete} style={{cursor: "pointer"}} alt="Delete Button"/></div>):('')}
                <img src={ImgPreview} />
                <div className="Line"></div>
                <h3>{this.props.stream.name}</h3>
                <p>created by {this.props.stream.creator}</p>
            </div>
    )
  }
}

const mapStateToProps = state => ({
    authState: state.authState.items,
})



export default connect(mapStateToProps, { fetchModelState, fetchModelStreamsState} )(Project);
