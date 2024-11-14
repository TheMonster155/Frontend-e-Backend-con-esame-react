

export const isTokenExpired = (tokenEx, cb) => {
  const dateExpiraring = new Date(tokenEx * 1000); 

  const isExpired = dateToday > dateExpiraring; 
  if (isExpired) {
    cb(); 
  }

  return isExpired;
};
