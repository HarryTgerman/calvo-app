import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import image from '../../../assets/Icons/Dragbox.svg'

const itemSource = {
    beginDrag(props) {
      console.log('dragging');
      return props.item;
    },
    endDrag(props, monitor, component) {
      if (!monitor.didDrop()) {
        return;
      }
    }
  }
  
function collect(connect, monitor) {
return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
    }  
 }
  


class DragebleBox extends Component {

  render() {
    const { isDragging, connectDragSource, item } = this.props;
    return connectDragSource(
        <img style={this.props.animate} height={this.props.iconHeight} src={image} />
    )
  }
}

export default DragSource('item', itemSource, collect)(DragebleBox);