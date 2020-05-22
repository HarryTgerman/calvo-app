import React, { Component } from 'react'
import AddBoxTop from './AddBoxTop'
import AddBoxBottom from './AddBoxBottom'
import { connect } from 'react-redux';
import Modal from 'react-modal';
import firebase from 'firebase'





class StreamBox extends Component {
  constructor(props){
      super(props);
      let showAddBox
      if(this.props.line){ showAddBox  = true;}
      this.state = {
          showLabel: 0,
          lineColor: '#C4C4C4',
          inputStyle: {},
          showDropAreaBottom: false,
          dropAreaBottom: false,
          modalIsOpen: false,
          value: '',
          showBoxTop: false,
          bottomBoxCreated: false,
      }
      this.showDropAreaBottom = this.showDropAreaBottom.bind(this)
      this.openModal = this.openModal.bind(this);
      this.afterOpenModal = this.afterOpenModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
      this.handelCreate = this.handelCreate.bind(this);
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

    componentWillReceiveProps(nextProps){
      if (nextProps.authState.authenticated === true ) {
        this.setState({
          authState: nextProps.authState,
        })
      }
      if(nextProps.box.value){
        const GREY = "#9E9E9E";
        let array = this.props.box.value.split('')
        if(array.length > 27 ){
          this.setState({value:  this.props.box.value,
            inputStyle: {
              
                boxShadow: `1px 3px 1px  ${GREY}`,
              }
         })
        }else{
          this.setState({value: this.props.box.value,
            inputStyle: {
                boxShadow: `1px 3px 1px  ${GREY}`,
              }
        })
        }
      }
    }

  handleChange(event) {
    const GREY = "#9E9E9E";
    let array = event.target.value.split('')
   
        this.setState({value: event.target.value,
          inputStyle: {
              boxShadow: `1px 3px 1px  ${GREY}`,
            }
      });
      }

    handelCreate(){
      this.setState({
        bottomBoxCreated: true,
      })
    }


  saveInput(){
   if(this.state.value !== undefined) {
     this.props.changeColor('#5822CC')
     const array = this.props.array
      array[this.props.index].value = this.state.value
      firebase.firestore().collection("models/").doc(this.props.uid).collection('projects').doc(this.props.projectId).collection("streams").doc(this.props.streamId)
      .update({boxesInStream:array})
    }
  }



  showDropAreaBottom(area){
    if(area === 'top'){
    return this.setState({showBoxTop: true})
    }
    if(area === 'bottom'){
      return this.setState({showDropAreaBottom: true, })
    }
}

//  dropAreaBottom: true
  render() {
    const { itemName } = this.props
    const array =   this.props.array[this.props.index]
    return  (
            <div className="inputBox" style={{width: this.props.marginStyles.width, marginRight: this.props.marginStyles.marginRight, marginLeft: this.props.marginStyles.marginLeft,  height: "175px"}}  >
              <div  style={{ height: "175px"}} >
                   <label   for={itemName+"Input"} style={{opacity: this.state.showLabel, width: "200px"}}>{this.props.labelText}</label>
                  <textarea    
                  id="target"
                  onChange={this.handleChange.bind(this)}
                  style={this.state.inputStyle} name={itemName+"Input"} value={this.state.value}
                  onBlur={this.saveInput.bind(this)} 
                  onMouseEnter={()=>{this.setState({showLabel: 1})}} onMouseOut={()=>{this.setState({showLabel: 0})}}
                   placeholder={this.props.itemName}  />
              </div>
              <div className="addBox">
                  <AddBoxTop  box={this.props.box}
                              lastBox={this.props.lastBox}
                              index={this.props.index}
                              array={this.props.array} 
                              uid={this.props.authState.uid}
                              streamId={this.props.streamId}
                              projectId={this.props.projectId}
                              editMode={this.props.editMode}
                              changeLineColor={this.changeLineColor}
                              showAddButton={this.props.line}  
                              dropNewBoxTop={this.props.dropNewBoxTop} 
                              bottomBoxCreated={this.state.bottomBoxCreated}
                              showDropAreaBottom={this.showDropAreaBottom} 
                              streamIndex={this.props.streamIndex}
                              dropAreaBottom={this.state.dropAreaBottom} />
                      <AddBoxBottom box={this.props.box} 
                                  index={this.props.index}
                                  array={this.props.array} 
                                  handelCreate={this.handelCreate}
                                  uid={this.props.authState.uid}
                                  streamId={this.props.streamId}
                                  projectId={this.props.projectId}
                                  editMode={this.props.editMode}
                                  changeLineColor={this.changeLineColor} 
                                  showAddButton={this.props.line}
                                  showBoxTop={this.state.showBoxTop} 
                                  showDropAreaBottom={this.showDropAreaBottom} 
                                  dropAreaBottom={this.state.dropAreaBottom}  
                                  streamIndex={this.props.streamIndex}
                                  dropNewBoxBottom={this.props.dropNewBoxBottom} 
                                  />
                 
                  
              </div>
              
        </div>
    )
  }
}

const mapStateToProps = state => ({
  authState: state.authState.items,
  })

export default connect(mapStateToProps, {})(StreamBox);