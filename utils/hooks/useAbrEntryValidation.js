export const useAbrEntryValidation = (abr) => {
    const newError = {};

    if (!abr?.advance_invoice_percentage) {
      newError.advance_invoice_percentage =
        "Advance Invoice Percentage is required.";
    }
    if (!abr?.advance_invoice_amount) {
      newError.advance_invoice_amount = "Advance Invoice Amount is required.";
    }
    if (!abr?.contact_person_name) {
      newError.contact_person_name = "Name Required.";
    }
    if (!abr?.contact_person_email) {
      newError.contact_person_email = "Email Required.";
    }
    if (!abr?.total_project_cost) {
      newError.total_project_cost = "Total Cost of Project (Amount) Required.";
    }

    return newError;
  };