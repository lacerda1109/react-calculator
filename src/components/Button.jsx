import React from 'react';

import './Button.css'

export default function Button(props) {

    let classes = 'Button '
    classes += props.operation ? 'operation' : ''
    classes += props.double ? 'double' : ''
    classes += props.triple ? 'triple' : ''

    return(
        <button className={classes} onClick={() => props.click && props.click(props.label)}>
            {props.content || props.label}
        </button>
    )
}