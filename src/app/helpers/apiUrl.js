const apiUrl = (relativeUrl) => {
  const baseUrl = process.env.REACT_APP_baseUrl
  return baseUrl + relativeUrl
};

export default apiUrl;