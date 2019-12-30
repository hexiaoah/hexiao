import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {DragSource, DropTarget, DragDropContext} from 'react-dnd'
import styles from './style.css'

const ItemTypes = {
    CARD: 'card',
}

const cardSource = {
    beginDrag(props) {
        return {
            id: props.id,
            index: props.index,
        }
    },
}

const cardTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index
        const hoverIndex = props.index

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return
        }
        // Time to actually perform the action
        props.moveCard(dragIndex, hoverIndex)

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex
    },
}

@DropTarget(ItemTypes.CARD, cardTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
}))
@DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))
class Card extends Component {
    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
        index: PropTypes.number.isRequired,
        isDragging: PropTypes.bool.isRequired,
        id: PropTypes.any.isRequired,
        path: PropTypes.string.isRequired,
        moveCard: PropTypes.func.isRequired,
    }

    render() {
        const {
            path,
            isDragging,
            connectDragSource,
            connectDropTarget,
            id
        } = this.props
        const opacity = isDragging ? 0 : 1
        return connectDragSource(
            connectDropTarget(
                <li className={styles.pictureDetailListcard} style={{opacity, cursor: 'move'}}>
                    <img src={path} className={styles.picturnDetailImg}/>
                </li>),
        )
    }
}

export default Card

