"use strict";

/**
 * Get unique error field name
 */
const uniqueMessage = error => {
    let output;
    try {
        const length = error.message.split(':').length;
        let errorIs = error.message.split(':')[length -2].split('{')[1].trim();
        console.log(errorIs);
        if(errorIs === 'email'){
            output = 'Email already exists!';
        }else if(errorIs === 'trainName'){
            output = 'Train name must be unique!';
        }else{
            output = "Unique field already exists";
        }

    } catch (ex) {
        output = "Something went wrong";
    }

    return output;
};

/**
 * Get the erroror message from error object
 */
exports.errorHandler = error => {
    let message = "";

    if (error.code) {
        switch (error.code) {
            case 11000:
            case 11001:
                message = uniqueMessage(error);
                break;
            default:
                message = "Something went wrong";
        }
    } else {
        for (let errorName in error.errors) {
            if (error.errors[errorName].message)
                message = error.errors[errorName].message;
        }
    }

    return message;
};