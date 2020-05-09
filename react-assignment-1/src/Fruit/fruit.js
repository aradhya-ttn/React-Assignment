import React from 'react';
import './fruit.css';

const tabel =(props)=>{
    
    return (
    <div>
         <table >
             <thead></thead>
             <tbody>
            <tr>
                <td>{props.fruitName}</td>
                <td>{props.quantity}</td>
                <td><button onClick={props.click}>delete</button></td>
            </tr>
            </tbody>
            <tfoot></tfoot>
            </table>

    </div>
    )};
    
    export default tabel;