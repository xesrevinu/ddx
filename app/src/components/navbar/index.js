/**
 * Created by kee on 15/9/25.
 */
import React, { Component } from 'react'
import style from './style/navbar.css'

class Navbar extends Component{
    render(){
        return (
            <div className={style.navbar}>
                navbar
                <p className='text'> sss </p>
            </div>
        )
    }
    onClick(){
        alert(1)
    }
}
export default Navbar