import { AnySchema, Schema } from "joi";
import ValidationResult from "../../types/validation-result";
import joiValidationErrors from "./joi-validation-errors";

class FormValidationService {
  private getErrorMessageTemplates() {
    return joiValidationErrors.errorTemplates;
  }

  public readonly defaultValidationResult: ValidationResult = {
    isValid: false,
    errorMessage: "",
  };

  public readonly defaultPassedValidationResult: ValidationResult = {
    isValid: true,
    errorMessage: "",
  };

  ok(): ValidationResult {
    return {
      isValid: true,
      errorMessage: "",
    };
  }

  bad(errorMessage: string): ValidationResult {
    return {
      isValid: false,
      errorMessage: errorMessage.replace(/("|')/g, ""),
    };
  }

  createSchema(joiSchema: AnySchema): Schema {
    return joiSchema.messages(this.getErrorMessageTemplates());
  }
}

export default new FormValidationService();
