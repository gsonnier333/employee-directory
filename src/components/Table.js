import React, { Component } from 'react'

export default class Table extends Component {
    
    componentDidMount() {
        fetch("https://randomuser.me/api/")
        .then(result => {
            console.log(result);
        })
    }
    
    
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
