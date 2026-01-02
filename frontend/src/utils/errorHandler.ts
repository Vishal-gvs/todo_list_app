import toast from 'react-hot-toast';

/**
 * Formats and displays error messages from API responses in a user-friendly way
 * @param error - The error object from axios/catch block
 * @param defaultMessage - Default message to show if error details are not available
 * @returns The formatted error message string
 */
export const formatErrorMessage = (error: any, defaultMessage = 'An error occurred'): string => {
  // Check if there are validation errors with field-specific messages
  if (error?.response?.data?.errors && Array.isArray(error.response.data.errors)) {
    const errors = error.response.data.errors;
    
    // If multiple errors, format them nicely
    if (errors.length > 1) {
      const errorList = errors
        .map((err: any) => {
          const field = err.field ? `${err.field.charAt(0).toUpperCase() + err.field.slice(1)}: ` : '';
          return `• ${field}${err.message}`;
        })
        .join('\n');
      
      return `Please fix the following errors:\n${errorList}`;
    }
    
    // Single error - format it nicely
    const err = errors[0];
    const field = err.field ? `${err.field.charAt(0).toUpperCase() + err.field.slice(1)}: ` : '';
    return `${field}${err.message}`;
  }
  
  // Check for a general message
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  
  // Check for network errors
  if (error?.message && error.message.includes('Network Error')) {
    return 'Network error. Please check your connection and try again.';
  }
  
  // Default fallback
  return defaultMessage;
};

/**
 * Displays an error toast with formatted message
 * @param error - The error object from axios/catch block
 * @param defaultMessage - Default message to show if error details are not available
 * @returns void
 */
export const showErrorToast = (error: any, defaultMessage = 'An error occurred'): void => {
  const message = formatErrorMessage(error, defaultMessage);
  
  // Use toast.error with options for better formatting
  toast.error(message, {
    duration: 5000,
    style: {
      maxWidth: '500px',
      whiteSpace: 'pre-line', // Allow line breaks for multi-line errors
    },
  });
};

/**
 * Displays a success toast
 * @param message - Success message to display
 */
export const showSuccessToast = (message: string): void => {
  toast.success(message, {
    duration: 3000,
  });
};

