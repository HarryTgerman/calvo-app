import React, { Component } from 'react'
import { DropTarget } from 'react-dnd';
import firebase from 'firebase'
import Add from '../../../../assets/Icons/Add.svg'
import { runInThisContext } from 'vm';


const boxSpec = {
    drop(props, monitor, component){
        return props.dropNewBoxBottom(props.box.id, component.props.streamIndex), props.handelCreate();
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

class AddBoxBottom extends Component {
    constructor(props) {
        super(props);
        this.state={
            showLabel: 0,
            lineColor: '#C4C4C4',
            boxSelected: false,
            showAddButton: false,
            inputPlaceholder: '',
            inputValue: '',
            buttonClicked: false,
        }
    }

    componentWillReceiveProps(nextProps, nextState){
        if (nextProps.box.boxDroppedBottom && !this.state.addBox && this.state.showAddButton) {
          this.setState({
            showAddButton: false, addBox: true, buttonClicked: true
          })
        }
        if (nextProps.box.bottomBox) {
            const GREY = "#9E9E9E";
            let array = nextProps.box.bottomBox.value.split('')
            if(array.length > 27 ){
              this.setState({
                showAddButton: false,
                boxSelected: true,
                inputValue: nextProps.box.bottomBox.value,
                inputPlaceholder: nextProps.box.bottomBox.placeholder,
                lineColor: nextProps.box.bottomBox.lineColor,
                addBox: false,
                inputStyle: {
                    boxShadow: `1px 3px 1px  ${GREY}`,
                  }
                })
            }else{
              this.setState({
                showAddButton: false,
                boxSelected: true,
                inputValue: nextProps.box.bottomBox.value,
                inputPlaceholder: nextProps.box.bottomBox.placeholder,
                lineColor: nextProps.box.bottomBox.lineColor,
                addBox: false,
                inputStyle: {
                    boxShadow: `1px 3px 1px  ${GREY}`,
                  }
                })
            }
         
          }

          if (nextProps.showBoxTop && !this.state.buttonClicked && !nextProps.box.boxDroppedBottom || nextProps.box.topBox && !this.state.buttonClicked && !nextProps.box.boxDroppedBottom) {
                this.setState({
                    showAddButton: true,                
                })
          }

         
        
          
      }

     
    handleChange(event) {
        const GREY = "#9E9E9E";
        let array = event.target.value.split('')
        if(array.length < 27 ){
                this.setState({inputValue: event.target.value,
                inputStyle: {
                    boxShadow: `1px 3px 1px  ${GREY}`,
                    }
            });
            }

            
                    
      }
      

      componentWillUpdate(nextProps, nextState){
        if (nextState.boxSelected){
            this.props.showDropAreaBottom('bottom')
        }
      }

      saveInput(){
        if(this.state.inputValue !== undefined){
        const array = this.props.array
        array[this.props.index].bottomBox = {value: this.state.inputValue, placeholder: this.state.inputPlaceholder,lineColor: this.state.lineColor}
        firebase.firestore().collection("models/").doc(this.props.uid).collection('projects').doc(this.props.projectId).collection("streams").doc(this.props.streamId)
        .update({boxesInStream:array})
        }
    }

    
  render() {
    const { itemName, connectDropTarget, hovered, item, didDrop } = this.props
    this.showButton = false;
    if(this.props.box.topBox){ this.showButton = true}

    return connectDropTarget(
        <div className="dropAreaBottom"  >
            {this.props.editMode ? (
                 <div style={{display: "flex", flexDirection: "column"}}>
                     <svg  width="97"  height="48" >
                        {this.props.box.bottomBox  ?(<line x1="0" y1="5" x2="93" y2="5" style={{ stroke: this.state.lineColor}} />) : ('')}
                        {this.props.box.bottomBox  ?(<line x1="50%" y1="53" x2="50%" y2="5" style={{ stroke: this.state.lineColor}} />) : ('')}
                    </svg>
                    { this.props.box.bottomBox  ? (
                    <div className="inputBox">
                        <label  style={{opacity: this.state.showLabel}}>{this.state.inputPlaceholder}</label>
                        <textarea value={this.state.inputValue} style={this.state.inputStyle} onBlur={this.saveInput.bind(this)} 
                         onMouseEnter={()=>{this.setState({showLabel: 1})}} onMouseOut={()=>{this.setState({showLabel: 0})}} placeholder={this.state.inputPlaceholder} onChange={this.handleChange.bind(this)}/>
                    </div>
                                ): ( '')}
                    
                </div>
            ): (<div>
                {this.state.showAddButton && !this.props.box.bottomBox ? (<div className="addButton" onClick={()=>{this.setState({showAddButton: false, addBox: true, buttonClicked: true}); this.props.handelCreate()}}><img src={Add}/></div>): ('')}
               { this.state.addBox ? (
                                            <div className="selectBox">
                                            <button style={{border: "none",background: 'rgba(255,97,117, 0.4)', color: '#dd5b6b', padding: "5px", marginRight: "5px"}}onClick={()=> this.setState({boxSelected: true,
                                                                                                                                                    inputPlaceholder: 'Cost',
                                                                                                                                                    lineColor: '#ff6175',
                                                                                                                                                    addBox: false,})}>
                                            Cost</button>
                                            <button style={{ background: 'rgba(184,233,134,0.4)', color: '#6fa13c', padding: "5px", margin: "0 5px 0 0"}} onClick={()=> this.setState({boxSelected: true,
                                                                                                                                                        inputPlaceholder: 'Revenue',
                                                                                                                                                        lineColor: '#7cc62a',
                                                                                                                                                        addBox: false,})} >
                                            Revenue</button>
                                            <button style={{background: 'rgba(49,133,252, 0.4)', color: '#2563bc', padding: "5px"}} onClick={()=> this.setState({boxSelected: true,
                                                                                                                                    inputPlaceholder: 'Partners',
                                                                                                                                    lineColor: '#3185fc',
                                                                                                                                    addBox: false,})}>
                                            Partners</button>    
                                        </div>
                    ):('')}
                     {this.state.boxSelected ?(
                        <div style={{display: "flex", flexDirection: "column"}}>
                         <svg  width="97"  height="48">
                               <line x1="0" y1="5" x2="93" y2="5" style={{ stroke: this.state.lineColor}} />
                               <line x1="50%" y1="53" x2="50%" y2="5" style={{ stroke: this.state.lineColor}} />
                            </svg>
                         <div className="inputBox">
                            <label  style={{opacity: this.state.showLabel}}>{this.state.inputPlaceholder}</label>
                            <textarea value={this.state.inputValue} style={this.state.inputStyle} onBlur={this.saveInput.bind(this)} 
                            onMouseEnter={()=>{this.setState({showLabel: 1})}} onMouseOut={()=>{this.setState({showLabel: 0})}} placeholder={this.state.inputPlaceholder} onChange={this.handleChange.bind(this)}/>
                            </div>
                           
                        </div>
                     ):('')}
                    </div>)}
        </div>
    )
  }
}

export default DropTarget('item', boxSpec, collect)(AddBoxBottom);




 {/* <div>
                     {this.state.boxSelected ?(<div>
                        {this.props.box.bottomBox ? (<div><div className="inputBox">
                                                <label  style={{opacity: this.state.showLabel}}>{this.state.inputPlaceholder}</label>
                                                <input value={this.state.inputValue} style={this.state.inputStyle} onBlur={this.saveInput.bind(this)} 
                                                onMouseEnter={()=>{this.setState({showLabel: 1})}} onMouseOut={()=>{this.setState({showLabel: 0})}} placeholder={this.state.inputPlaceholder} onChange={this.handleChange.bind(this)}/>
                                            </div>
                                            <svg  width="98"  height="100" style={{marginTop: "20px"}}>
                                                {this.props.box.bottomBox  ?(<line x1="0" y1="0" x2="96" y2="0" style={{ stroke: this.state.lineColor}} />) : ('')}
                                                {this.props.box.bottomBox  ?(<line x1="50%" y1="48" x2="50%" y2="0" style={{ stroke: this.state.lineColor}} />) : ('')}
                                            </svg></div>): ('')}
                                            
                                        </div>): ()}
                
                 
                  
                
                    
                       
                </div> */}