import { CUSTOMER_LIMITS, type Customer, type FieldErrors } from "@/lib/customer";

function set<K extends keyof Customer>(customer: Customer, key: K, value: string): Customer {
  return { ...customer, [key]: value };
}

export function CustomerFields({
  value,
  errors,
  onChange,
  idPrefix,
}: {
  value: Customer;
  errors: FieldErrors;
  onChange: (next: Customer) => void;
  idPrefix: string;
}) {
  const field = (
    key: keyof Customer,
    label: string,
    placeholder: string,
    opts?: { required?: boolean; type?: string; hint?: string; area?: boolean },
  ) => {
    const id = `${idPrefix}-${key}`;
    const error = errors[key];
    return (
      <div>
        <label className="label" htmlFor={id}>
          {label} {opts?.required ? <span className="req">*</span> : <span className="normal-case tracking-normal">(optional)</span>}
        </label>
        {opts?.area ? (
          <textarea
            id={id}
            className="field min-h-24"
            placeholder={placeholder}
            maxLength={CUSTOMER_LIMITS[key]}
            value={value[key]}
            aria-invalid={Boolean(error)}
            onChange={(event) => onChange(set(value, key, event.target.value))}
          />
        ) : (
          <input
            id={id}
            className="field"
            type={opts?.type ?? "text"}
            inputMode={key === "mobile" || key === "whatsapp" || key === "pincode" ? "numeric" : undefined}
            autoComplete={key === "email" ? "email" : key === "name" ? "name" : key === "mobile" ? "tel" : undefined}
            placeholder={placeholder}
            maxLength={CUSTOMER_LIMITS[key]}
            value={value[key]}
            aria-invalid={Boolean(error)}
            onChange={(event) => onChange(set(value, key, event.target.value))}
          />
        )}
        {opts?.hint && !error ? <p className="mt-1 text-sm text-mute">{opts.hint}</p> : null}
        {error ? (
          <p className="field-error" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    );
  };

  return (
    <div className="grid gap-5">
      {field("name", "Full name", "As you would like us to address you", { required: true })}
      {field("mobile", "Mobile number", "10-digit mobile number", { required: true, type: "tel" })}
      {field("whatsapp", "WhatsApp number", "Leave blank if same as mobile", { type: "tel" })}
      {field("email", "Email", "For your booking confirmation and updates", { required: true, type: "email" })}
      {field("address", "Full address", "House / flat no., building, street, landmark", {
        required: true,
        area: true,
      })}
      {field("area", "Area / locality", "e.g. Vijay Nagar", { required: true })}
      <div className="grid gap-5 sm:grid-cols-2">
        {field("pincode", "Pincode", "4520XX", { required: true })}
        {field("city", "City", "Indore", { required: true, hint: "We currently deliver across Indore only." })}
      </div>
    </div>
  );
}
