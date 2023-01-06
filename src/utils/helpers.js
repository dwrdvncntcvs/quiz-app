const mergeName = (firstName, lastName) => {
  return `${firstName} ${lastName}`;
};

const extractInitials = (firstName = "", lastName = "") => {
  return `${firstName.charAt(0).toUpperCase()} ${lastName.charAt(0).toUpperCase()}`;
};

export { mergeName, extractInitials };
