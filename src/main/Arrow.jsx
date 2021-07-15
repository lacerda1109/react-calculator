import React from 'react'

import ArrowSVG from './arrow_icon.svg'

export default function Arrow() {
    return (
        <img style={{width: '20px', transform: 'rotate(90deg)'}} src={ArrowSVG} alt="Arrow" />
    )
}