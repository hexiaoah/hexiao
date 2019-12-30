/**
 * Created by air on 2017/7/31.
 */
import React, {Component} from 'react'
import styles from './style.css'
import GoodsList from './goodsList'
class Main extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        const t = this
        const {dispatch, data} = t.props
        return (
            <div className={styles.main_wrapper}>
                <GoodsList data={data} dispatch={dispatch}/>
            </div>
        )
    }
}

export default Main





