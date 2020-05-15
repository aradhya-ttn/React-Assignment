export const updateObject = (oldObject, updatedProperties) => {
    return{
        ...oldObject,
        ...updatedProperties
    };
};

export const checkValidity = (value,rules) =>{
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
        if(rules.isEmail){
            const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
            isValid = pattern.test(value) && isValid;
        }
        if(rules.isNumeric){
            const pattern=/^\d+$/;
            isValid=pattern.test(value) && isValid
        }

    }
    return isValid;
}