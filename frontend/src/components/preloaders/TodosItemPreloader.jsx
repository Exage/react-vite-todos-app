import React from 'react'

import '../TodosItem.scss'

import { getRandomIntInclusive } from '../../utils/getRandomIntInclusive'

export const TodosItemPreloader = ({ index }) => {
    return (
        <div className='todos__item'>

            <div className='todos__item-main'>
                <div className='todos__item-body__wrapper todos__item-body__wrapper__preloader' style={{ width: `${getRandomIntInclusive(40, 72)}%` }}>
                    <span className='todos__item-body todos__item-body__preloader'>
                        Loading
                    </span>
                </div>
            </div>

        </div>
    )
}