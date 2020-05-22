import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import Sidebar from '../Navbar/Sidebar';
import Workarea from './Workarea';






class MainView extends Component {
    constructor(props){
        super(props);
        this.state = {
            editMode: false,
            redirect: false,
            redirectDashboard: false,
            projectId: "",
            uid: '',
            redirect: false,
            boxes: [
                {id:'1',value: '', itemName: 'Company', labelText: 'What is the companies name?', line: {height: '40', color:'#C4C4C4'}}, 
                    {id:'2',value: '', itemName: 'CORE', labelText: 'What makes your company unique?', line: {height: '40', color:'#C4C4C4'}}, 
                    {id:'last',value: '', itemName: 'Main Business', labelText: 'How is the company creating value?', line: {height: '0', color:'#5822CC', lineRight: false}, }, 

                ],
            streams: [
            {stream: {boxesInStream: [
                {id:'1', itemName: 'Stakeholder',value:'', labelText: 'Who benefits from the main business?', line: {height: '65', color:'#2F80ED', childLine: true}, boxDroppedTop: false, boxDroppedBottom: false, boxTop: false, topBox: false, bottomBox: false,}, 
                                  {id:'2', itemName: 'Create', value:'',labelText: 'What kind of value is created?', line: {height: '65', color:'#2F80ED'}, boxDroppedTop: false, boxDroppedBottom: false,  boxTop: false, topBox: false, bottomBox: false,}, 
                                  {id:'3', itemName: 'Deliver',value:'', labelText: 'How is the value delivered?', line: {height: '65', color:'#2F80ED'}, boxDroppedTop: false, boxDroppedBottom: false,  boxTop: false, topBox: false, bottomBox: false,}, 
                                  {id:'4', itemName: 'Capture',value:'', labelText: 'How is the value captured?', line: false, boxDroppedTop: false, boxDroppedBottom: false,  boxTop: false, topBox: false, bottomBox: false,}, 
                 ]}
                }
            ], 
        }
    }

  
    componentWillReceiveProps(nextProps){
        if(nextProps.authState.authenticated === true){
            this.setState({
                uid: nextProps.authState.uid
            })
        }

        if(nextProps.authState.authenticated === false){
            this.setState({
                redirect: true
            })
        }
     
        if( nextProps.modelState.boxes){
            console.log('TEST')
            this.setState({
                boxes: nextProps.modelState.boxes,
                projectId: nextProps.modelState.projectId
            })
        }      
        

      }




      
    
    


    render () {
        if(this.state.redirect) { return (<Redirect to='/login' />)}

        return (
            <div>
                 <div className="mainViewContainer">
                        <Sidebar editMode={()=>{this.setState({editMode: false})}} presentMode={()=>{this.setState({editMode: true})}}/>
                        <Workarea editMode={this.state.editMode}/>
                    </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    authState: state.authState.items,
    modelState: state.modelState.items,
    streamState: state.streamState.items
    })



  
export default DragDropContext(HTML5Backend)(connect(mapStateToProps, { } )(MainView));


