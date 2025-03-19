export const validateAddClient = (clientData) => {
  const newError = {};
  if (!clientData.name) {
    newError.name = "Client Name required";
  }
  if (!clientData.phone_number) {
    newError.phone_number = "Phone Number required";
  }
  if (!clientData.email) {
    newError.email = "Client Email required";
  }
  if (!clientData.contact_person) {
    newError.contact_person = "Contact Person Name required";
  }
  return newError;
};
