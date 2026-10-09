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

/** Mobile numbers as people type them ("98765 43210", "+91-98765-43210", "098765…") reduced to the 10 digits. */
export function cleanPhone(value: string) {
  const digits = value.replace(/[\s().-]/g, "");
  return digits.replace(/^(\+?91|0)(?=[6-9]\d{9}$)/, "");
}

export const CUSTOMER_LIMITS: Partial<Record<keyof Customer, number>> = { name: 80, email: 254, address: 300, area: 80, time: 120, notes: 1000 };

export function validateCustomer(customer: Customer): FieldErrors {
  const errors: FieldErrors = {};
  if (customer.name.trim().length < 2) errors.name = "Please tell us your name.";
  if (!/^[6-9]\d{9}$/.test(cleanPhone(customer.mobile))) {
    errors.mobile = "Enter a 10-digit mobile number.";
  }
  if (customer.whatsapp.trim() && !/^[6-9]\d{9}$/.test(cleanPhone(customer.whatsapp))) {
    errors.whatsapp = "Enter a 10-digit WhatsApp number, or leave this blank.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email.trim())) {
    errors.email = "We need an email for your confirmation.";
  }
  if (customer.address.trim().length < 8) {
    errors.address = "Add house or flat, street and a landmark.";
  }
  if (customer.area.trim().length < 2) errors.area = "Add your area or locality.";
  for (const [key, max] of Object.entries(CUSTOMER_LIMITS) as [keyof Customer, number][]) {
    if (!errors[key] && customer[key].trim().length > max) errors[key] = `Please keep this under ${max} characters.`;
  }
  if (!/^452\d{3}$/.test(customer.pincode.trim())) {
    errors.pincode = "We deliver across Indore only — use a 452xxx pincode.";
  }
  if (customer.city.trim().toLowerCase() !== "indore") {
    errors.city = "We currently deliver across Indore only.";
  }
  return errors;
}
