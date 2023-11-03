export const setStorage = (key: string, value: string) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

export const getStorage = (key: string) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

export const removeStorage = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};
