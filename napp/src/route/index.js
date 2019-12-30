import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'

const Home = ()=>(
    <div>Home</div>
)
const Index = ()=>(
    <div>Index</div>
)
const router = ()=>{
    return(
        <HashRouter>
            <div>
                <Route path='/index' component = {Index}  ></Route>
                <Route path='/home' component = {Home}  ></Route>
            </div>
        </HashRouter>
    )
}


export default router