const joiValidationErrors = {
  errorTemplates: {
    "string.min": "This field length must be at least {#limit} characters long",
    "string.max": "This field must be {#limit} characters or less",
    "string.trim":
      "This field may not contain any spaces at the beginning or end",
    "string.empty": "This field is not allowed to be empty",
    "string.email": "Email is not valid",
    "string.valid": "This field is not valid",
    "string.pattern.base": "This field is not valid",
  },
};

export default joiValidationErrors;
