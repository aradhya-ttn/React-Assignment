export const updateObject =  (oldObject,updatedProperties) => {
    return{
        ...oldObject,
        ...updatedProperties
    };
};

export const checkValidity = (value,rules) => {
    let isValid = true;
    if(rules!=null){
        if(rules.required && isValid){
            isValid = value.trim() !=='';
        }
        
        if(rules.isEmail){
            const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
            isValid = pattern.test(value);
        }
        if(rules.isPassword){
            const pattern = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,25})/;
            isValid = pattern.test(value);
        }
        if(rules.isNumeric){
            const pattern = /^[1-9][0-9]{5}$/;
            isValid = pattern.test(value);
        }
    }
    return isValid;
}


