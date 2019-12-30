import React,{ Component } from 'react'
import PropTypes from 'prop-types'
console.log(React)

 class Home extends Component{
     static propTypes = {
         caps: PropTypes.string
     }
    constructor(){
        super()
        this.state={
            count :0
        }
    }
    componentDidMount () {
        // console.log(mobx)
        setTimeout(() => {
            this.setState({count:this.state.count+1})
            console.log(this.state.count)
            this.setState({count:this.state.count+1})
            console.log(this.state.count)
        }, 0);
        this.setState({count:this.state.count + 1},()=>{
            console.log(9,this.state.count)
        })
        this.setState({count:this.state.count +1},()=>{
            console.log(9,this.state.count)
        })
        console.log(this.state.count)

    }
    render(){
        return (
            <div>
                Home
            </div>
        )
    }
}

export default Home