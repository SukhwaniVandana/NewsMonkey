import React, { Component } from 'react'

export class Spinner extends Component {
  render() {
    return (
      <div className='container text-center my-3'>
        <img src="./loading.gif" style={{width:"30px"}}/>
      </div>
    )
  }
}

export default Spinner