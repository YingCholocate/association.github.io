import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../pages/login'
import Home from '../pages/sandbox/Home'
import Schedule from '../pages/schedule'
import NewSandBox from '../pages/sandbox/NewSandBox'
import Jishu from '../pages/sandbox/publicresource/jishu'
import Mishu from '../pages/sandbox/publicresource/mishu'
import Yance from '../pages/sandbox/publicresource/yance'
import Shuzi from '../pages/sandbox/publicresource/shuzi'
import Upload from '../components/Upload'
import Register from '../pages/register/register'
import Mishuupload from '../pages/sandbox/publicresource/mishuupload'
export default function IndexRouter() {
    return (
      
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<NewSandBox />} >
                    <Route path="/" element={<Home />}>
                    </Route>
                    <Route path="/schedule" element={<Schedule />}></Route>

                    <Route path="/resource/Jishu" element={<Jishu />}></Route>
                    <Route path="/resource/Mishu">
                        <Route path="arrange" element={<Mishu />}></Route>
                        <Route path='upload' element={<Mishuupload/>}></Route>
                    </Route>
                    <Route path="/resource/Yance" element={<Yance />}></Route>
                    <Route path="/resource/Shuzi" element={<Shuzi />}></Route>
                    {/* <Route path="/myself" element={<Myself/>}></Route> */}
                </Route>
               
            </Routes>
       

    )
}
