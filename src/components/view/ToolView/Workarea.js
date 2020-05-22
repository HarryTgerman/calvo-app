import React, { Component } from 'react'
import { DropTarget } from 'react-dnd';
import ModelTool from './ModelTool';
import moment from 'moment';
import firebase from 'firebase'
import { connect } from 'react-redux';
import html2canvas from 'html2canvas';
import {Redirect} from 'react-router-dom';
import { fetchModelState } from '../../../actions/modelState';
import { fetchModelStreamsState } from '../../../actions/modelStreamState';
import { fetchSidebar } from '../../../actions/sideBar';
import ImgDelete from '../../../assets/Icons/cancel.svg'



let x = ''
let y = ''
const textBoxSpec = {
    drop(props, monitor, component){
       x =  monitor.getClientOffset().x
       y =  monitor.getClientOffset().y

    }
}

function collect(connect, monitor) {
    return {
      connectDropTarget: connect.dropTarget(),
      hovered: monitor.isOver(),
      item: monitor.getItem(),
      didDrop: monitor.didDrop(),
    }
  }

  


class Workarea extends Component {
constructor(props){
    super(props)
    this.state={
        textFeldArray: [],
        inputValue: "Innovative Business",
        imgUrl: "",
    }

}
 
    componentWillMount(){
        this.props.fetchSidebar('Model')
    }


    componentWillReceiveProps(nextProps){
        if (nextProps.didDrop && x && y ) {
           
            let array = this.state.textFeldArray
            array.push({
                x: x,
                y: y,
                value: '',
                timestamp: Date.now() 

            })
            this.setState({textFeldArray: array}, () =>{x = false; y = false})
            
        }
        if(nextProps.modelState.name){
            this.setState({
                inputValue: nextProps.modelState.name,
            })
        }

        if(nextProps.modelState.textFeldArray){
            this.setState({
                textFeldArray: nextProps.modelState.textFeldArray,
            })
        }
        
      }


    saveTextFeldArray(){
        let textFeldArray = this.state.textFeldArray;
        firebase.firestore().collection("models/").doc(this.props.authState.uid).collection('projects').doc(this.props.modelState.projectId).update({textFeldArray:textFeldArray})
     }

    handleChangeTextFeld (param, event) {
        let value = event.target.value
        this.setState(prevState =>{
           return  prevState.textFeldArray.find(e => e.timestamp == param).value = value
            // prevState.textFeldArray.find(e => e.timestamp == param).value = event.target.value
        //     return prevState.textFeldArray
        })
    }

    dropNewBoxTop =  (id, arrayIndex) => {
        this.props.streamState[arrayIndex].stream.boxesInStream.find(boxes => boxes.id == id ).boxDroppedTop =  true
      }

      dropNewBoxBottom = (id, arrayIndex)=> {
        this.props.streamState[arrayIndex].stream.boxesInStream.find(boxes => boxes.id == id ).boxDroppedBottom =  true
      }

    
      componentWillUnmount(){
        this.props.fetchModelState(false)
        this.props.fetchModelStreamsState(false)
      }

      saveInput(){
        firebase.firestore().collection("models/").doc(this.props.authState.uid).collection('projects').doc(this.props.modelState.projectId)
        .update({name:this.state.inputValue})
      }

      deleteTextArea(param){
        let timestamp = param
        let array = this.state.textFeldArray.filter(e => e.timestamp != timestamp)
        firebase.firestore().collection("models/").doc(this.props.authState.uid).collection('projects').doc(this.props.modelState.projectId).update({textFeldArray:array})
        this.props.fetchModelState(this.props.modelState.projectId)
        this.props.fetchModelStreamsState(this.props.modelState.projectId)

        
      }



      handleChange(event) {
        this.setState({inputValue: event.target.value,});
      }

  render() {
    moment('de')
    if(!this.props.modelState) {return (<Redirect to='/dashboard' />) }
    const { itemName, connectDropTarget, hovered, item, didDrop, dropAreaBottom } = this.props
    let date =  moment().format('LL')
    return connectDropTarget(
            <div  className="WorkArea">
            
                <div className="Header">
                    <p>Calvo</p>
                    <input onBlur={this.saveInput.bind(this)} value={this.state.inputValue} onChange={this.handleChange.bind(this)}/>
                    <p style={{fontSize: "14px"}}>{date}</p>
                </div>
                {this.state.textFeldArray.map(textfeld => {
                return(
                                <div className="inputBox" style={{position: "absolute", top: textfeld.y, left: textfeld.x}}>
                                    <img onClick={this.deleteTextArea.bind(this, textfeld.timestamp)} height="20px"  width="20px" src={ImgDelete} style={{position: "absolute", marginLeft: "100px", marginTop: "-5px", cursor: "pointer"}}/>
                                    <textarea onBlur={this.saveTextFeldArray.bind(this)} onChange={this.handleChangeTextFeld.bind(this, textfeld.timestamp)} value={textfeld.value}/>
                                </div>
                            )
                        })
                    }
                    {this.props.streamState ? (
                          <ModelTool dropNewBoxBottom={this.dropNewBoxBottom}  dropNewBoxTop={this.dropNewBoxTop} projectId={this.props.modelState.projectId} id="ModelTool" ref={(jonge) => { this.jonge  = jonge}}  boxes={this.props.modelState.boxes} streams={this.props.streamState} textFeldArray={this.state.textFeldArray} editMode={this.props.editMode}/>
                    ): (
                        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                    )}
            </div>
    )
  }
}

const mapStateToProps = state => ({
    authState: state.authState.items,
    modelState: state.modelState.items,
    streamState: state.streamState.items
    })


export default  DropTarget('FullView', textBoxSpec, collect)(connect(mapStateToProps, {fetchModelStreamsState,fetchSidebar, fetchModelState})(Workarea));