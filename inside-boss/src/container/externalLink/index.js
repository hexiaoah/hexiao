import React from "react";
import  { currentExLink as baseUrl }  from '../../utils/env'
import styles from "./style.css";
import options from './init'

const externalLink = (props) => {
    const pageType = props.params.pageType
    const suffixUrl = options(pageType)
    const currentFHYUrl = suffixUrl ? `${baseUrl}${suffixUrl}?${Date.now()}` : ''
    return (
        <div className={styles.wrapper}>
            <iframe frameBorder="0" width="100%" height="100%" src={currentFHYUrl} ></iframe>
        </div>
    );
};

export default externalLink;
