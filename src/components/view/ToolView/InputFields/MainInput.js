import React, { Component } from 'react'
import firebase from 'firebase'

export default class MainInput extends Component {
    constructor(props){
        super(props);
        this.state = {
            showLabel: 0,
            lineColor: '#C4C4C4',
            inputStyle: {},
            value: '',

        }
    }

  
    handleChange(event) {
        const GREY = "#9E9E9E";
        this.setState({value: event.target.value,
                        lineColor: this.props.line.color,
                        inputStyle: {
                            boxShadow: `1px 3px 1px  ${GREY}`,
                          }
                    
                    });
      }

      saveInput(){
        if(this.state.value !== undefined) {
            const array = this.props.array
            array[this.props.index].value = this.state.value
            firebase.firestore().collection("models/").doc(this.props.uid).collection('projects').doc(this.props.projectId)
            .update({boxes:array})
            }
        }

        componentWillReceiveProps(nextProps){
            if (nextProps.uid) {
              this.setState({
                value: this.props.box.value
              })
            }

            if (nextProps.box.value) {
                this.setState({
                  value: nextProps.box.value
                })
              }
          }


  render() {
      const { itemName } = this.props
      const { id } = this.props.box
      let hideLine = false;
      if(id === 'last'){
        hideLine = true
      }

      
    return (
        <div className="inputBox">
            <label for={itemName+"Input"} style={{opacity: this.state.showLabel}}>{this.props.labelText}</label>
            <input onBlur={this.saveInput.bind(this)} style={this.state.inputStyle} name={itemName+"Input"}  value={this.state.value}
             onMouseEnter={()=>{this.setState({showLabel: 1})}} onMouseOut={()=>{this.setState({showLabel: 0})}} placeholder={this.props.itemName} onChange={this.handleChange.bind(this)}/>
            {hideLine ? ('') : 
                (<svg height={this.props.line.height} width="250" >
                <line style={{stroke: this.state.lineColor}} x1="125" y1="0" x2="125" y2={this.props.line.height}  />
                {this.props.line.lineRight ?(<line x1="125" y1="65" x2="250" y2="65" style={{strokeWidth: "4px", stroke: this.state.lineColor}} />): ('')}
            </svg>)}
        </div>
    )
  }
}
