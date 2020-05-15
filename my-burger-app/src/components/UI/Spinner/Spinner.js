import React from 'react';

import classes from './Spinner.module.css';

const spinner = () => (
    <div className={classes.ldsroller}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>Loading</div> 
);
export default spinner;