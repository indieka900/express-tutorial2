export const createuserValidation = {
    username: {
        isLength : {
            options: {
               min: 5, 
               max: 32, 
            },
            errorMessage: "Username should be between 4-12 characters",
        },
        
        notEmpty : {
            errorMessage: "Username should not be empty",
        },
        isString : {
            errorMessage: "Username must be a string",
        },
    },
    displayName: {
        notEmpty: {
            errorMessage: "Display name must not be empty",
        }
    },
}