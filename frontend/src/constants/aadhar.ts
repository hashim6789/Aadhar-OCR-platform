// Status constants
export const AadharMessages = {
  ERROR_INVALID_FRONT_IMAGE:
    "Invalid front image. Please upload a PNG or JPEG file.",
  ERROR_INVALID_BACK_IMAGE:
    "Invalid back image. Please upload a PNG or JPEG file.",
  ERROR_UPLOAD_FAILED: "Failed to upload images. Please try again.",
  ERROR_INVALID_AADHAR:
    "Invalid Aadhar number. Please enter a 12-digit number.",
  ERROR_INVALID_DOB: "Invalid date of birth. Please use YYYY-MM-DD format.",
  ERROR_FETCH_FAILED: "Failed to fetch Aadhar details. Please try again.",
} as const;
