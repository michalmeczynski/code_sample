import { AnySchema, Schema } from "joi";
import FormValidationResult from "../../types/form-validation-result";

const errorMessageTemplates = {
  "any.required": "This field is required",
  "string.min": "This field length must be at least {#limit} characters long",
  "string.max": "This field must be {#limit} characters or less",
  "string.empty": "This field is required",
  "string.email": "Email is not valid",
  "string.valid": "This field is not valid",
  "string.pattern.base": "This field is not valid",
};

const defaultValidationResult: FormValidationResult = {
  isValid: false,
  errorMessage: "",
};

const defaultPassedValidationResult: FormValidationResult = {
  isValid: true,
  errorMessage: "",
};

const ok = (): FormValidationResult => {
  return {
    isValid: true,
    errorMessage: "",
  };
};

const bad = (errorMessage: string): FormValidationResult => {
  return {
    isValid: false,
    errorMessage: errorMessage.replace(/("|')/g, ""),
  };
};

const createSchema = (joiSchema: AnySchema): Schema => {
  return joiSchema.messages(errorMessageTemplates);
};

const validate = (
  schema: Schema,
  value: any,
  errorMessage?: string
): FormValidationResult => {
  const validationError = createSchema(schema).validate(value).error?.message;

  if (validationError) {
    return bad(errorMessage ?? validationError);
  }
  return ok();
};

const formValidationService = {
  defaultValidationResult,
  defaultPassedValidationResult,
  ok,
  bad,
  createSchema,
  validate,
};

export default formValidationService;
