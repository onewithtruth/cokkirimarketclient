export const validationCheckAPI = {
  checkPostFormValid: (data) => {
    if (!(data.category && data.title && data.price && data.contents)) {
      return false;
    }
    return true;
  },

  checkSearchFormValid: (data) => {
    if (!data.word) {
      return false;
    }
    return true;
  }
};
