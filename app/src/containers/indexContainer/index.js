/**
 * Created by kee on 15/9/25.
 */
import React, { Component } from 'react'
import Navbar from 'components/navbar'

class Hello extends Component{
    componentWillMount(){
    }
    render(){
        return (
            <div>
                <Navbar />
                <div onClick={this.onClick.bind(this)}>
                    Hello1
                </div>
            </div>
        )
    }
    onClick(){
        alert(1)
    }
}
export default Hello