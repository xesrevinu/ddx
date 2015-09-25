/**
 * Created by kee on 15/9/25.
 */
import React, { Component } from 'react'

class Hello extends Component{
    componentWillMount(){
    }
    render(){
        return (
            <div onClick={this.onClick.bind(this)}>
                login
            </div>
        )
    }
    onClick(){
        alert(1)
    }
}
export default Hello
