import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  err.inner.forEach((error) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validationErrors[error.path as any] = error.message;
  });

  return validationErrors;
}
