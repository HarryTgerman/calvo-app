import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProjectState } from '../../../actions/projectState';
import { fetchSidebar } from '../../../actions/sideBar';
import isEmptyPic from '../../../assets/Empty_Dashboard.png';
import isEmptyArrow from '../../../assets/Empty_arrow.png'
import Modal from 'react-modal';


import Sidebar from '../Navbar/Sidebar';
import Project from './Project';
import firebase from 'firebase'


const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      overflow: "visible",
      width: "538px",
      height: "538px",
      borderRadius: "18px",
      boxShadow:" 0 2px 5px 0 rgba(0, 0, 0, 0.05)",
      backgroundColor: "#2b3646",
      color: "#ffffff",
      padding: "73px 95px",
      textAlign: "center",
    }
  };



class Dashboard extends Component {
    constructor(props){
        super(props);

        this.state = {
            editMode: false,
            projects: [],
            inputValue: "",
            companyValue: "",
            uid: '',
            redirect: false,
            name: "",
            showModelList: false,
            manageProjectsState: false,
            company: '',
            loading: false,
            isEmpty: false,
        }
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
      }
    
      openModal() {
        this.setState({modalIsOpen: true});
      }
    
      afterOpenModal() {
        // references are now sync'd and can be accessed.
      }
    
      closeModal() {
        this.setState({modalIsOpen: false});
      }
    componentWillMount(){
        this.props.fetchProjectState();
        this.props.fetchSidebar('Dashboard')
    }


    componentWillReceiveProps(nextProps){
        if(nextProps.authState.authenticated === true){
            this.setState({
                uid: nextProps.authState.uid,
                name: nextProps.authState.name,
                company: nextProps.authState.company
            })
        }

        if(nextProps.authState.authenticated === false){
            this.setState({
                redirect: true,
            })
        }

        if(nextProps.projectState.length > 0){
            this.setState({
                projects: nextProps.projectState,
                showModelList: true,
            })
        }

        if(nextProps.projectState.length === 0){
            this.setState({
                isEmpty: true,
                loading: false,
                showModelList: false,
            })
        }else{
            this.setState({
                isEmpty: false,
               
            })
        }

      }



      handleChangeCompany(event){
        this.setState({companyValue: event.target.value,});

      }

    handleChange(event) {
        this.setState({inputValue: event.target.value,});
      }

      

    async AddNewProject(){
        var loadingstart =  await this.setState({loading: true, modalIsOpen: false})
        var dbRef = await  firebase.firestore().collection("models/").doc(this.state.uid).collection('projects').add({
            name: this.state.inputValue,
            creator: this.state.name,
            timestamp: Date.now(),
            company: this.state.companyValue,
            boxes: [{id:'1',value: '', itemName: 'Company', labelText: 'What is the companies name?', line: {height: '40', color:'#C4C4C4'}}, 
                    {id:'2',value: '', itemName: 'CORE', labelText: 'What makes your company unique?', line: {height: '40', color:'#C4C4C4'}}, 
                    {id:'last',value: '', itemName: 'Main Business', labelText: 'How is the company creating value?', line: {height: '0', color:'#5822CC', lineRight: false}, }]
                    })
        
        var pushStream = await  firebase.firestore().collection("models/").doc(this.state.uid).collection('projects').doc(dbRef.id).collection('streams').add({boxesInStream:[
                        {id:'1', itemName: 'Stakeholder',value:'', labelText: 'Who benefits from the main business?', line: {height: '65', color:'#2F80ED', childLine: true}, boxDroppedTop: false, boxDroppedBottom: false, topBox: false, bottomBox: false,}, 
                        {id:'2', itemName: 'Create', value:'',labelText: 'What kind of value is created?', line: {height: '65', color:'#2F80ED'}, boxDroppedTop: false, boxDroppedBottom: false,  topBox: false, bottomBox: false,}, 
                        {id:'3', itemName: 'Deliver',value:'', labelText: 'How is the value delivered?', line: {height: '65', color:'#2F80ED'}, boxDroppedTop: false, boxDroppedBottom: false,  topBox: false, bottomBox: false,}, 
                        {id:'4', itemName: 'Capture',value:'', labelText: 'How is the value captured?', line: false, boxDroppedTop: false, boxDroppedBottom: false,  topBox: false, bottomBox: false,}, 
                        ], timestamp: Date.now(),
                        })
        var fetchProjects =  await this.props.fetchProjectState();
        var loading =  await this.setState({loading: false, modalIsOpen: false})
     }

   
     manageProjects(){
         this.setState({
             manageProjectsState: !this.state.manageProjectsState
         })
     }


    render () {
      if(this.state.redirect){return (<Redirect to="/login"/>)}
        return (
            <div>
                <div className="mainViewContainer">
                    <Sidebar />
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                        >
                        <h2 >Create a new Project </h2>
                        <p style={{height: "84px", opacity: "0.75"}}>Design your innovative business model as simply as never before and show it to your partners</p>
                    
                        <div  className="inputBox" style={{width: "100%", display: "flex", flexDirection: "column", justifyContent: "center"}}>
                        <label  style={{width: "200px", color: "#ffffff"}}>PROJECT NAME</label>
                        <input  value={this.state.inputValue} onChange={this.handleChange.bind(this)} placeholder="Innovative Business"/>
                            </div>
                        <div  className="inputBox" style={{width: "100%", display: "flex", flexDirection: "column", justifyContent: "center"}}>
                                <label  style={{width: "200px", color: "#ffffff"}}>COMPANY</label>
                                <input  value={this.state.companyValue} onChange={this.handleChangeCompany.bind(this)} placeholder="Company"/>
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "center", justifyContent: "center"}}>
                                <button onClick={this.AddNewProject.bind(this)} className="Add-Project-button">Add new Project</button>
                        </div>
                       

                    </Modal>
                    <div className="WorkArea" style={{minWidth: "1000px"}}>
                        <div className="Header">
                            <p>{this.state.company}</p>
                            <div className="headerRow">
                                <h3>My Projects</h3>
                                <div className="buttonSection">
                                    <button className="Manage-button" onClick={this.manageProjects.bind(this)}>Manage Projects</button>
                                    <button onClick={this.openModal.bind(this)} className="Add-Project-button">Add new Project</button>
                                </div>
                            </div>
                        </div>
                      {this.state.showModelList && !this.state.loading ? (<div className="ModelList">
                                {this.state.projects.map((p, i)=>{return(<Project index={i} manageState={this.state.manageProjectsState} stream={p.stream} id={p.id}/>)})}
                        </div>): ('')}
                        {this.state.loading ?(<div className="lds-ring"><div></div><div></div><div></div><div></div></div>): ('')}
                       {this.state.isEmpty && !this.state.loading ?(<div className="isEmptyContainer">
                                                <p>Create a new project and build your own business model</p>
                                                <img className="projectsimg" style={{height: "302px", width: "478px"}} src={isEmptyPic}/>
                                                <img className="emptyArrow" style={{height: "113px", width: "113px"}} src={isEmptyArrow}/>
                                            </div>):('')}
                       
                    
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    authState: state.authState.items,
    projectState: state.projectState.items
    })



  
    export default connect(mapStateToProps, {fetchProjectState, fetchSidebar} )(Dashboard);


