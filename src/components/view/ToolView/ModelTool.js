import React, { Component } from 'react'
import { connect } from 'react-redux';
import firebase from 'firebase';
import MainInput from './InputFields/MainInput';
import StreamBox from './InputFields/StreamBox';
import Add from '../../../assets/Icons/Add.svg';
import Delete from '../../../assets/Icons/minus.svg';

import html2canvas from 'html2canvas';

import { fetchModelState } from '../../../actions/modelState';
import { fetchModelStreamsState } from '../../../actions/modelStreamState';

class ModelTool extends Component {

    
    constructor(props){
        super(props);
        this.state ={
            editMode: false,
            loading: false,
            uid: '',
            redirect: false,
            imgUrl: "",
            lineColor: this.props.modelState.lineColor
        }
        this.changeColor = this.changeColor.bind(this)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.authState.authenticated === true){
            this.setState({
                uid: nextProps.authState.uid
            })
        }

       
      }

    



    addNewStream(){
        const streams = this.state.streams;
        firebase.firestore().collection("models/").doc(this.props.authState.uid).collection('projects').doc(this.props.projectId).collection("streams")
        .add({boxesInStream:[
            {id:'1', itemName: 'Stakeholder', labelText: 'Who benefits from the main business?', line: {height: '65', color:'#2F80ED', childLine: true}, boxDroppedTop: false, boxDroppedBottom: false, topBox: false, bottomBox: false,}, 
            {id:'2', itemName: 'Create', labelText: 'What kind of value is created?', line: {height: '65', color:'#2F80ED'}, boxDroppedTop: false, boxDroppedBottom: false,  topBox: false, bottomBox: false,}, 
            {id:'3', itemName: 'Deliver', labelText: 'How is the value delivered?', line: {height: '65', color:'#2F80ED'}, boxDroppedTop: false, boxDroppedBottom: false,  topBox: false, bottomBox: false,}, 
            {id:'4', itemName: 'Capture', labelText: 'How is the value captured?', line: false, boxDroppedTop: false, boxDroppedBottom: false,  topBox: false , bottomBox: false,}, 
            ],timestamp: Date.now(),
        }).then(()=>{
           this.props.fetchModelState(this.props.projectId)
           this.props.fetchModelStreamsState(this.props.projectId)

        })
      
    }

   async deleteStream(streamId){
         await this.setState({loading: true})
         await firebase.firestore().collection("models/").doc(this.props.authState.uid).collection('projects').doc(this.props.projectId).collection("streams").doc(streamId).delete()

         await this.props.fetchModelState(this.props.projectId)
         await this.props.fetchModelStreamsState(this.props.projectId)
         await this.setState({loading: false})

    }

    changeColor(color){
        firebase.firestore().collection("models/").doc(this.props.authState.uid).collection('projects').doc(this.props.projectId)
        .update({lineColor: color})
        this.setState({lineColor: color})
    }

  render() {
    return (
        <div ref="canvas"  className="mainView" >
            <div className="leftSide">                    
                {
                    this.props.boxes.map((box, i) => {
                        return( <MainInput projectId={this.props.projectId} index={i} array={this.props.boxes} uid={this.state.uid} itemName={box.itemName} labelText={box.labelText} line={box.line} box={box}/>)
                    })
                }
                
            </div>
            {this.state.loading ? (
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            ):(
                    <div>
                    {
                    this.props.streams.map((stream, index) => {
                        let lastIndex = stream.stream.boxesInStream.length -1
                        let lineHeight = 75;
                        let showButton
                        let streamId = stream.id
                        let lineStyles = {}
                        let rightSideStyle= {}
                        let showDeleteStream = false;
                        if(index !== this.props.streams.length -1 && this.props.streams.length > 1 && this.props.editMode === false){showDeleteStream = true} else { showDeleteStream = false;  } 
                         if(index !== 0){lineHeight = 220; lineStyles = {position: "absolute", marginTop: "-150px"}; rightSideStyle= {marginTop: "45px"} }
                        if (this.props.streams.length === index + 1 && this.props.editMode === false) {showButton = true; } else { showButton = false;  } 
        
                        return (
                    <div className="rightSide" style={rightSideStyle}>
                        <svg height={lineHeight} width="200"  style={lineStyles}>
                            <line  x1="50%" y1="0" x2="50%" y2={lineHeight}  style={{stroke: this.state.lineColor}} />
                            <line x1="50%" y1={lineHeight} x2="100%" y2={lineHeight} style={{strokeWidth: "4px", stroke: this.state.lineColor}} />
                        </svg>
                        {showDeleteStream ? (<div className="deleteButton showAddSteamButton"  onClick={this.deleteStream.bind(this, streamId)} ><img src={Delete}/></div>):('')}
                        {showButton ? (<div className="addButton showAddSteamButton"  onClick={this.addNewStream.bind(this)} ><img src={Add}/></div>):('')}
                        {stream.stream.boxesInStream.map((box, boxIndex) => {

                                let marginStyles ={marginBottom: "-30px"}
                                if(boxIndex < 1 && index !== 0){marginStyles = {marginBottom: "-30px", marginLeft: "200px"}}
                                let lastBox = false
                                if(lastIndex === boxIndex){marginStyles ={marginBottom: '-33px', width: "126px", marginRight: "0"}; lastBox = true }
                                
        
                                return( <StreamBox 
                                        projectId={this.props.projectId}
                                        index={boxIndex}
                                        streamIndex={index}
                                        uid={this.state.uid}
                                        array={stream.stream.boxesInStream}
                                        streamId={streamId}
                                        editMode={this.props.editMode}
                                        box={box} 
                                        lastBox={lastBox}
                                        changeColor={(color)=> this.changeColor(color)}
                                        marginStyles={marginStyles}
                                        itemName={box.itemName} 
                                        labelText={box.labelText} 
                                        line={box.line} 
                                        dropNewBoxBottom={(id, arrayIndex) => this.props.dropNewBoxBottom(id, arrayIndex)}
                                        dropNewBoxTop={(id, arrayIndex) => this.props.dropNewBoxTop(id, arrayIndex)}
                                        />)
                            })
                        }
                        </div>)   
                            
                    })
                    }
                    </div>
            )}
            
            

          </div>
    )
  }
}

const mapStateToProps = state => ({
    authState: state.authState.items,
    modelState: state.modelState.items
    })

export default connect(mapStateToProps, { fetchModelState, fetchModelStreamsState })(ModelTool)