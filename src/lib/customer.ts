export type Customer = {
  name: string;
  mobile: string;
  whatsapp: string;
  email: string;
  address: string;
  area: string;
  pincode: string;
  city: string;
  time: string;
  notes: string;
};

export const emptyCustomer = (): Customer => ({
  name: "",
  mobile: "",
  whatsapp: "",
  email: "",
  address: "",
  area: "",
  pincode: "",
  city: "Indore",
  time: "",
  notes: "",
});

export type FieldErrors = Partial<Record<keyof Customer, string>>;

export function validateCustomer(customer: Customer): FieldErrors {
  const errors: FieldErrors = {};
  if (customer.name.trim().length < 2) errors.name = "Please tell us your name.";
  if (!/^[6-9]\d{9}$/.test(customer.mobile.trim())) {
    errors.mobile = "Enter a 10-digit mobile number.";
  }
  if (customer.whatsapp.trim() && !/^[6-9]\d{9}$/.test(customer.whatsapp.trim())) {
    errors.whatsapp = "Enter a 10-digit WhatsApp number, or leave this blank.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email.trim())) {
    errors.email = "We need an email for your confirmation.";
  }
  if (customer.address.trim().length < 8) {
    errors.address = "Add house or flat, street and a landmark.";
  }
  if (customer.area.trim().length < 2) errors.area = "Add your area or locality.";
  if (!/^452\d{3}$/.test(customer.pincode.trim())) {
    errors.pincode = "We deliver across Indore only — use a 452xxx pincode.";
  }
  if (customer.city.trim().toLowerCase() !== "indore") {
    errors.city = "We currently deliver across Indore only.";
  }
  return errors;
}
