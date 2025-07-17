import React from 'react'
import { useParams, useSearchParams } from 'react-router'

const ParamCompo = () => {

    const {id}=useParams();

  return (
    <div>
      param : {id}
    </div>
  )
}

export default ParamCompo
