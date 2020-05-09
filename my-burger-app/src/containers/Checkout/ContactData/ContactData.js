import React,{ Component } from "react";

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component{
    state={
        orderForm:{
            
            name: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            streets:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            zipCode: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Zip Code'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:6,
                    maxLength:6
                },
                valid:false,
                touched:false
            },
            country: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Email'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            paymentMethod: {
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'cod', displayValue:'CashOnDelivery'},
                        {value:'card', displayValue:'DebitCard'},
                        {value:'netbanking', displayValue:'NetBanking'}
                    ]
                },
                value:'',
                valid:true
            }
        },
        formIsValid : false,
        loading:false
    }

    orderHandler = (event) =>{
        event.preventDefault();
        this.setState({loading:true});
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order={
            ingredients: this.props.ingredients,
            price:this.props.price,
            orderData : formData
            }
        axios.post('/orders.json',order)
             .then(response => {
                 this.setState({loading:false});
                 this.props.history.push("/");
             })
             .catch(error => {this.setState({loading:false});
            });
        console.log(this.props.ingredients);
    }

    checkValidity(value,rules){
        let isValid = true;
        if(rules!=null){
            if(rules.required && isValid){
                isValid = value.trim() !=='';
            }
            if(rules.minLength && isValid){
                isValid = value.length >= rules.minLength ;
            }
            if(rules.maxLength && isValid){
                isValid = value.length <= rules.maxLength ;
            }
        }
        return isValid;
    }

    inputChangedHandler = (event,inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        let   formIsValid = true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        } 
        
        this.setState({orderForm : updatedOrderForm, formIsValid: formIsValid});
    }

    render(){

        const formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            });
        }

        let form=(
            <form onSubmit={this.orderHandler}>
                    {formElementsArray.map(formElement => (
                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched = {formElement.config.touched}
                            changed={(event)=>this.inputChangedHandler(event,formElement.id)} />
                    ))}
                    <Button btnType="Success" disabled={!this.state.formIsValid} >ORDER</Button>
                </form>
        );
        if(this.state.loading){
            form=<Spinner/>
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Details</h4>
                {form}
            </div>
        );
    }
} 
export default ContactData;