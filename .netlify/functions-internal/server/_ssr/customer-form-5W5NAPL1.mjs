import { t as CUSTOMER_LIMITS } from "./booking-service.server-IuXe47pv.mjs";
import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/customer-form-5W5NAPL1.js
var import_jsx_runtime = require_jsx_runtime();
function set(customer, key, value) {
	return {
		...customer,
		[key]: value
	};
}
function CustomerFields({ value, errors, onChange, idPrefix }) {
	const field = (key, label, placeholder, opts) => {
		const id = `${idPrefix}-${key}`;
		const error = errors[key];
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "label",
				htmlFor: id,
				children: [
					label,
					" ",
					opts?.required ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "req",
						children: "*"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "normal-case tracking-normal",
						children: "(optional)"
					})
				]
			}),
			opts?.area ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				id,
				className: "field min-h-24",
				placeholder,
				maxLength: CUSTOMER_LIMITS[key],
				value: value[key],
				"aria-invalid": Boolean(error),
				onChange: (event) => onChange(set(value, key, event.target.value))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id,
				className: "field",
				type: opts?.type ?? "text",
				inputMode: key === "mobile" || key === "whatsapp" || key === "pincode" ? "numeric" : void 0,
				autoComplete: key === "email" ? "email" : key === "name" ? "name" : key === "mobile" ? "tel" : void 0,
				placeholder,
				maxLength: CUSTOMER_LIMITS[key],
				value: value[key],
				"aria-invalid": Boolean(error),
				onChange: (event) => onChange(set(value, key, event.target.value))
			}),
			opts?.hint && !error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-mute",
				children: opts.hint
			}) : null,
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "field-error",
				role: "alert",
				children: error
			}) : null
		] });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-5",
		children: [
			field("name", "Full name", "As you would like us to address you", { required: true }),
			field("mobile", "Mobile number", "10-digit mobile number", {
				required: true,
				type: "tel"
			}),
			field("whatsapp", "WhatsApp number", "Leave blank if same as mobile", { type: "tel" }),
			field("email", "Email", "For your booking confirmation and updates", {
				required: true,
				type: "email"
			}),
			field("address", "Full address", "House / flat no., building, street, landmark", {
				required: true,
				area: true
			}),
			field("area", "Area / locality", "e.g. Vijay Nagar", { required: true }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 sm:grid-cols-2",
				children: [field("pincode", "Pincode", "4520XX", { required: true }), field("city", "City", "Indore", {
					required: true,
					hint: "We currently deliver across Indore only."
				})]
			})
		]
	});
}
//#endregion
export { CustomerFields as t };
