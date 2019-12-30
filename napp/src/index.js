import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { HashRouter, Route, Switch } from 'react-router-dom'
import {createStore, combineReducers} from 'redux'
import { Provider, connect } from 'react-redux'
import  Home  from "./components/Home";


const defaultState = {
    name:'app',
    Home:'Home'
}
const defaultStateTwo = {
    name:'xixi',
    Home:'haha'
}
const defaultGlobal = {
    a:'1',
    b:'2'
}
const globalReducer=(state=defaultGlobal,action)=>{

    return {...state}
}

const reducer = (state=defaultState,action)=>{
    if(action.type === 'type'){
        console.log(action)
        console.log(state)
    }
    return {...state}
}
const nextReducer = (state=defaultStateTwo,action)=>{
    if(action.type === 'type'){
        console.log(action)
        console.log(state)
    }
    return {...state}
}

// const rootReducer = combineReducers({
//     reducer,
//     globalReducer
// })

const cerateReducer = (reducer={})=>{
    return combineReducers({
        globalReducer,
        ...reducer
    })
}

const store = createStore(cerateReducer(),{})

store.asyncReducer = {}
const injectReducer = (name,reducer)=>{
    store.asyncReducer[name] = reducer
    console.log(store.asyncReducer)
    store.replaceReducer( cerateReducer(store.asyncReducer) )
}

const mapState = (state)=>{
    return {
        APPstate:state.reducer,
        globalReducer:state.globalReducer
    }
}

const mapDispatch = (dispatch)=>{
    return{
        dispatch
    }
}
class App extends React.Component{
    componentDidMount(){
        console.log(this)
        window.$router = this.props.history.push
    }
    render(){
        return(<div>App</div>)
    }
}


// const Home = ()=>(
//     <div>Home</div>
// )
const Index = ()=>(
    <div>Index</div>
)
const Page = ()=>(
    <div>Page</div>
)
class Page1 extends React.Component{
    componentDidMount(){
        console.log('this',this)
        console.log(store.getState())
    }
    render(){
        return(
            <div>page1</div>
        )
    }
}
const Router = ()=>{
    return(
        <HashRouter>
                <Route exact path='/index/:a' component = {Index}  ></Route>
                <Route exact path='/index/page' component = {Page}  ></Route>
                <Route exact path='/home' component = {Home}  ></Route>
                <Route exact path='/' component = {connect(mapState,mapDispatch)(App)}  ></Route>
                <Route path='/page1/:b' render={()=>{
                    injectReducer('nextReducer',nextReducer)
                    return (<div><Page1/></div>)
                }}></Route>
        </HashRouter>
    )
}
console.log('123')
store.dispatch({type:'type'})
console.log(store.getState())

// setTimeout(() => {
//     injectReducer('reducer',reducer)
//     console.log(store.getState('nextReducer',nextReducer))
//     store.dispatch({type:'type'})

// }, 3000);

let app = ReactDOM.render( <Provider store = {store} ><Router /></Provider>, document.getElementById('root'));
console.log(app)

