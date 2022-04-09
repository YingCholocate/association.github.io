import React from 'react'
import axios from 'axios'
export default function Newweb() {
    const html=axios.get('/xsgrkbcx!getKbRq.action').then(res=>{
        return res.data
    }
        )
  return (
    <div>html</div>
  )
}
