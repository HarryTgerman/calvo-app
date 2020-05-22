import React, { Component } from 'react'
import { DropTarget } from 'react-dnd';
import firebase from 'firebase'
import Add from '../../../../assets/Icons/Add.svg'

 

const boxSpec = {
    drop(props, monitor, component){
        return props.dropNewBoxTop(props.box.id, component.props.streamIndex);
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

class AddBoxTop extends Component {
    constructor(props) {
        super(props);
       
        this.state={
            showLabel: 0,
            lineColor: '#C4C4C4',
            boxSelected: false,
            showAddButton: this.props.showAddButton,
            inputValue: '',
        }
    }

    componentWillReceiveProps(nextProps, nextState){
        if (nextProps.box.boxDroppedTop && !this.state.addBox && this.state.showAddButton) {
          this.setState({
            addBox: true,
            showAddButton: false
          })
        }
        if ( nextProps.box.topBox) {
                const GREY = "#9E9E9E";
                let array = nextProps.box.topBox.value.split('')
                if(array.length > 20 ){
                  this.setState({
                    boxSelected: true,
                    inputValue: nextProps.box.topBox.value,
                    inputPlaceholder: nextProps.box.topBox.placeholder,
                    lineColor: nextProps.box.topBox.lineColor,
                    addBox: false,
                    showAddButton: false,
                    inputStyle: {
                        boxShadow: `1px 3px 1px  ${GREY}`,
                      }
                    })
                }else{
                  this.setState({
                     boxSelected: true,
                    inputValue: nextProps.box.topBox.value,
                    inputPlaceholder: nextProps.box.topBox.placeholder,
                    lineColor: nextProps.box.topBox.lineColor,
                    addBox: false,
                    showAddButton: false,
                    inputStyle: {
                        boxShadow: `1px 3px 1px  ${GREY}`,
                      }
                    })
                }
          
          }
  
          
        
      }

      componentWillUpdate(nextProps, nextState){
        if (nextState.boxSelected){
            this.props.showDropAreaBottom('top')
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

    saveInput(){
        if(this.state.inputValue !== undefined) {
        const array = this.props.array
        array[this.props.index].topBox = {value: this.state.inputValue, placeholder: this.state.inputPlaceholder,lineColor: this.state.lineColor}
        firebase.firestore().collection("models/").doc(this.props.uid).collection('projects').doc(this.props.projectId).collection("streams").doc(this.props.streamId)
        .update({boxesInStream:array})
        }
    }
    
  render() {
    const { itemName, connectDropTarget, hovered, item, didDrop, dropAreaBottom } = this.props
    const yValue = this.props.box.bottomBox ? ('48') : ('48')
    let opacity = this.props.box.line ? ('1') : ('0')
    let showUpperLine = false;
  
    let marginTop = '15px'
    return connectDropTarget(
        <div className="dropAreaTop" >
           
            {this.props.editMode ? (
                <div>
                     { this.state.boxSelected ? (
                    <div className="inputBox"  >
                        <label  style={{opacity: this.state.showLabel}}>{this.state.inputPlaceholder}</label>
                        <textarea value={this.state.inputValue}  onBlur={this.saveInput.bind(this)}  style={this.state.inputStyle}  onMouseEnter={()=>{this.setState({showLabel: 1})}} onMouseOut={()=>{this.setState({showLabel: 0})}} placeholder={this.state.inputPlaceholder} onChange={this.handleChange.bind(this)}/>
                    </div>
                                ): ('')}
                    {this.props.box.topBox && this.props.box.bottomBox ? (
                          <svg  width="97"  height="48"  >
                          {this.state.inputValue ? (<line x1="50%" y1={yValue} x2="50%" y2="0" style={{ stroke: this.state.lineColor,  opacity }} />): ('')}
                          {this.state.inputValue ? (<line x1="0" y1={yValue} x2="97" y2={yValue} style={{ stroke: this.state.lineColor, opacity}} />): 
                          (<line x1="0" y1='48' x2="93" y2='48' style={{ stroke: this.state.lineColor, opacity}} />)}
                          </svg> 
                          
                    ): (
                        <svg  width="97"  height="100"   >
                        {this.state.boxSelected ? (<line x1="50%" y1='0' x2="50%" y2="50" style={{ stroke: this.state.lineColor,  opacity }} />): ('')}
                           {this.state.boxSelected ? (<line x1="0" y1='50' x2="97" y2='50' style={{ stroke: this.state.lineColor, opacity}} />): 
                           (<line x1="0" y1='100' x2="97" y2='100' style={{ stroke: this.state.lineColor, opacity}} />)}
                       </svg>
                    )}
                   
                </div>
            ): (
                <div>
                    {this.state.showAddButton ?(<div className="addButton" onClick={()=>{this.setState({showAddButton: false, addBox: true})}}><img src={Add}/></div>): ('')}
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
                ) : ('')}
                { this.props.box.topBox ? (
                    <div>
                        <div className="inputBox" >
                            <label  style={{opacity: this.state.showLabel}}>{this.state.inputPlaceholder}</label>
                            <textarea value={this.state.inputValue} onBlur={this.saveInput.bind(this)}  style={this.state.inputStyle}  onMouseEnter={()=>{this.setState({showLabel: 1})}} onMouseOut={()=>{this.setState({showLabel: 0})}} placeholder={this.state.inputPlaceholder} onChange={this.handleChange.bind(this)}/>
                        </div>
                        {this.props.box.bottomBox || this.props.bottomBoxCreated ? (
                            <svg  width="97"  height="48"   >
                                {this.state.inputValue ? (<line x1="50%" y1={yValue} x2="50%" y2="0" style={{ stroke: this.state.lineColor,  opacity }} />): ('')}
                                {this.state.inputValue ? (<line x1="0" y1={yValue} x2="97" y2={yValue} style={{ stroke: this.state.lineColor, opacity}} />): 
                                (<line x1="0" y1='48' x2="97" y2='48' style={{ stroke: this.state.lineColor, opacity}} />)}
                            </svg> 
                        ):(
                            <svg  width="97"  height="48"   >
                                {this.state.inputValue ? (<line x1="50%" y1='48' x2="50%" y2="0" style={{ stroke: this.state.lineColor,  opacity }} />): ('')}
                                {this.state.inputValue ? (<line x1="0" y1='48' x2="97" y2='48' style={{ stroke: this.state.lineColor, opacity}} />): 
                                (<line x1="0" y1='48' x2="97" y2='48' style={{ stroke: this.state.lineColor, opacity}} />)}
                            </svg> 
                        )}
                        
                      </div>
                                ): ( 

                    <div>
                      {this.state.boxSelected ? (<div className="inputBox" >
                            <label  style={{opacity: this.state.showLabel}}>{this.state.inputPlaceholder}</label>
                            <textarea value={this.state.inputValue} onBlur={this.saveInput.bind(this)}  style={this.state.inputStyle}  onMouseEnter={()=>{this.setState({showLabel: 1})}} onMouseOut={()=>{this.setState({showLabel: 0})}} placeholder={this.state.inputPlaceholder} onChange={this.handleChange.bind(this)}/>
                        </div>): ('')}
                      
                                {
                                    this.props.bottomBoxCreated ? (
                                        <svg  width="97"  height="48"  >
                                            <line x1="50%" y1={yValue} x2="50%" y2="0" style={{ stroke: this.state.lineColor,  opacity }} />
                                            <line x1="0" y1={yValue} x2="97" y2={yValue} style={{ stroke: this.state.lineColor, opacity}} />
                                        </svg> 
                                    ):( <svg  width="97"  height="100"   >
                                         {this.state.boxSelected ? (<line x1="50%" y1='0' x2="50%" y2="50" style={{ stroke: this.state.lineColor,  opacity }} />): ('')}
                                            {this.state.boxSelected ? (<line x1="0" y1='50' x2="97" y2='50' style={{ stroke: this.state.lineColor, opacity}} />): 
                                            (<line x1="0" y1='100' x2="97" y2='100' style={{ stroke: this.state.lineColor, opacity}} />)}
                                        </svg> )
                                }
                               
                        
                    </div>
                )}
               
            </div>
            )}
           
                
        </div>
    )
  }
}

export default DropTarget('item', boxSpec, collect)(AddBoxTop);
