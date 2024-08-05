import React from 'react'

import '../TodosHeader.scss'

export const TodosHeaderPreloader = () => {
    return (
        <div className="todos__header">

            <div className="todos__header-sup todos__header-sup__preloader">
                loading
            </div>

            <div className="todos__header-title__wrapper">
                <span className='todos__header-title todos__header-title__preloader'>loading</span>
            </div>

            <div className="todos__header-sub todos__header-sub__preloader">
                loading
            </div>
        </div>
    )
}
