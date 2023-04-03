import React from 'react'

const Spinner = () => {
  return (
    <div className='container text-center my-3'>
      <img src={process.env.PUBLIC_URL + "/loading.gif"} style={{ width: "30px" }} alt="" />
    </div>
  )

}

export default Spinner