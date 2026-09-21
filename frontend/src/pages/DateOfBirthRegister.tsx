import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

// ---------- Types ----------
interface BirthFormData {
  childFirstName: string;
  childLastName: string;
  gender: string;
  dateOfBirth: string;
  placeOfBirth: string;
  motherFullName: string;
  motherNationalId: string;
  fatherFullName: string;
  fatherNationalId: string;
  province: string;
  district: string;
  municipality: string;
  ward: string;
  contactPhone: string;
  contactEmail: string;
  remarks: string;
}

const initialForm: BirthFormData = {
  childFirstName: "",
  childLastName: "",
  gender: "",
  dateOfBirth: "",
  placeOfBirth: "",
  motherFullName: "",
  motherNationalId: "",
  fatherFullName: "",
  fatherNationalId: "",
  province: "",
  district: "",
  municipality: "",
  ward: "",
  contactPhone: "",
  contactEmail: "",
  remarks: "",
};

// ---------- Styles ----------
const inputClass =
  "w-full px-3 py-2 border border-gray-300 rounded text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-sm transition";

const labelClass = "block text-sm font-medium text-gray-800 mb-1";

const sectionTitleClass =
  "text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3";

// ---------- Main Component ----------
const DateOfBirthRegister = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<BirthFormData>(initialForm);
  const [errors, setErrors] = useState<
    Partial<Record<keyof BirthFormData, string>>
  >({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof BirthFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // ---------- Validation ----------
  const validateStep = (currentStep: 1 | 2 | 3) => {
    const e: Partial<Record<keyof BirthFormData, string>> = {};

    if (currentStep === 1) {
      if (!form.childFirstName.trim()) e.childFirstName = "First name is required";
      if (!form.childLastName.trim()) e.childLastName = "Last name is required";
      if (!form.gender) e.gender = "Please select a gender";
      if (!form.dateOfBirth) e.dateOfBirth = "Date of birth is required";
      if (!form.placeOfBirth.trim()) e.placeOfBirth = "Place of birth is required";
    }

    if (currentStep === 2) {
      if (!form.motherFullName.trim()) e.motherFullName = "Mother's full name is required";
      if (!form.fatherFullName.trim()) e.fatherFullName = "Father's full name is required";
    }

    if (currentStep === 3) {
      if (!form.contactPhone.trim()) e.contactPhone = "Contact phone is required";
      if (form.contactPhone && !/^[0-9+\-\s()]{7,15}$/.test(form.contactPhone))
        e.contactPhone = "Enter a valid phone number";
      if (form.contactEmail && !/^\S+@\S+\.\S+$/.test(form.contactEmail))
        e.contactEmail = "Enter a valid email address";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const nextStep = () => {
    if (!validateStep(step)) return;
    setStep((s) => (s < 3 ? ((s + 1) as 1 | 2 | 3) : s));
  };

  const prevStep = () => setStep((s) => (s > 1 ? ((s - 1) as 1 | 2 | 3) : s));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
      // Jump to first invalid step
      if (!validateStep(1)) setStep(1);
      else if (!validateStep(2)) setStep(2);
      else setStep(3);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 800);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center border border-gray-300 rounded-lg p-8 max-w-sm">
          <p className="text-lg text-black mb-4">
            Registration submitted successfully.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 bg-black text-white rounded text-sm hover:bg-gray-800"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black p-4 sm:p-6">
      <div className="max-w-3xl mx-auto">
        <div className="border border-gray-300 rounded-lg p-6 md:p-8 shadow-sm">
          {/* Header */}
          <div className="mb-6 pb-4 border-b border-gray-200">
            <h1 className="text-xl font-semibold">Birth Registration</h1>
            <p className="text-sm text-gray-500 mt-1">
              Fill in the details below to register a birth.
            </p>
          </div>

          {/* Step Indicator */}
          <ol className="flex items-center gap-2 mb-6 text-xs">
            {[1, 2, 3].map((n) => (
              <li key={n} className="flex items-center gap-2 flex-1">
                <span
                  className={`flex items-center justify-center w-7 h-7 rounded-full border text-xs font-medium ${
                    step === n
                      ? "bg-black text-white border-black"
                      : step > n
                      ? "bg-gray-800 text-white border-gray-800"
                      : "bg-white text-gray-500 border-gray-300"
                  }`}
                >
                  {n}
                </span>
                <span
                  className={`hidden sm:inline ${
                    step === n ? "text-black font-medium" : "text-gray-500"
                  }`}
                >
                  {n === 1 ? "Child" : n === 2 ? "Parents" : "Address"}
                </span>
                {n < 3 && <span className="flex-1 h-px bg-gray-200" />}
              </li>
            ))}
          </ol>

          {/* Browser form (native) */}
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* ---------- STEP 1: Child details ---------- */}
            {step === 1 && (
              <fieldset className="space-y-4">
                <legend className={sectionTitleClass}>Child Information</legend>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="childFirstName" className={labelClass}>
                      Child First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="childFirstName"
                      name="childFirstName"
                      type="text"
                      autoComplete="given-name"
                      required
                      value={form.childFirstName}
                      onChange={handleChange}
                      placeholder="Enter first name"
                      className={inputClass}
                      aria-invalid={!!errors.childFirstName}
                    />
                    {errors.childFirstName && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.childFirstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="childLastName" className={labelClass}>
                      Child Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="childLastName"
                      name="childLastName"
                      type="text"
                      autoComplete="family-name"
                      required
                      value={form.childLastName}
                      onChange={handleChange}
                      placeholder="Enter last name"
                      className={inputClass}
                      aria-invalid={!!errors.childLastName}
                    />
                    {errors.childLastName && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.childLastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="gender" className={labelClass}>
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      required
                      value={form.gender}
                      onChange={handleChange}
                      className={inputClass}
                      aria-invalid={!!errors.gender}
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.gender}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="dateOfBirth" className={labelClass}>
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="dateOfBirth"
                      type="date"
                      name="dateOfBirth"
                      required
                      max={new Date().toISOString().split("T")[0]}
                      value={form.dateOfBirth}
                      onChange={handleChange}
                      className={inputClass}
                      aria-invalid={!!errors.dateOfBirth}
                    />
                    {errors.dateOfBirth && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.dateOfBirth}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="placeOfBirth" className={labelClass}>
                    Place of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="placeOfBirth"
                    name="placeOfBirth"
                    type="text"
                    required
                    value={form.placeOfBirth}
                    onChange={handleChange}
                    placeholder="Hospital or home"
                    className={inputClass}
                    aria-invalid={!!errors.placeOfBirth}
                  />
                  {errors.placeOfBirth && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.placeOfBirth}
                    </p>
                  )}
                </div>
              </fieldset>
            )}

            {/* ---------- STEP 2: Parents ---------- */}
            {step === 2 && (
              <fieldset className="space-y-4">
                <legend className={sectionTitleClass}>Parent Information</legend>

                <div>
                  <label htmlFor="motherFullName" className={labelClass}>
                    Mother's Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="motherFullName"
                    name="motherFullName"
                    type="text"
                    autoComplete="name"
                    required
                    value={form.motherFullName}
                    onChange={handleChange}
                    placeholder="Enter mother's full name"
                    className={inputClass}
                    aria-invalid={!!errors.motherFullName}
                  />
                  {errors.motherFullName && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.motherFullName}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="motherNationalId" className={labelClass}>
                    Mother's National ID
                  </label>
                  <input
                    id="motherNationalId"
                    name="motherNationalId"
                    type="text"
                    inputMode="numeric"
                    value={form.motherNationalId}
                    onChange={handleChange}
                    placeholder="Enter national ID"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="fatherFullName" className={labelClass}>
                    Father's Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="fatherFullName"
                    name="fatherFullName"
                    type="text"
                    autoComplete="name"
                    required
                    value={form.fatherFullName}
                    onChange={handleChange}
                    placeholder="Enter father's full name"
                    className={inputClass}
                    aria-invalid={!!errors.fatherFullName}
                  />
                  {errors.fatherFullName && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.fatherFullName}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="fatherNationalId" className={labelClass}>
                    Father's National ID
                  </label>
                  <input
                    id="fatherNationalId"
                    name="fatherNationalId"
                    type="text"
                    inputMode="numeric"
                    value={form.fatherNationalId}
                    onChange={handleChange}
                    placeholder="Enter national ID"
                    className={inputClass}
                  />
                </div>
              </fieldset>
            )}

            {/* ---------- STEP 3: Address & Contact ---------- */}
            {step === 3 && (
              <fieldset className="space-y-4">
                <legend className={sectionTitleClass}>
                  Address & Contact
                </legend>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="province" className={labelClass}>
                      Province
                    </label>
                    <select
                      id="province"
                      name="province"
                      value={form.province}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Select province</option>
                      <option value="koshi">Koshi</option>
                      <option value="madhesh">Madhesh</option>
                      <option value="bagmati">Bagmati</option>
                      <option value="gandaki">Gandaki</option>
                      <option value="lumbini">Lumbini</option>
                      <option value="karnali">Karnali</option>
                      <option value="sudurpaschim">Sudurpaschim</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="district" className={labelClass}>
                      District
                    </label>
                    <input
                      id="district"
                      name="district"
                      type="text"
                      value={form.district}
                      onChange={handleChange}
                      placeholder="Enter district"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="municipality" className={labelClass}>
                      Municipality
                    </label>
                    <input
                      id="municipality"
                      name="municipality"
                      type="text"
                      value={form.municipality}
                      onChange={handleChange}
                      placeholder="Enter municipality"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="ward" className={labelClass}>
                      Ward No.
                    </label>
                    <input
                      id="ward"
                      name="ward"
                      type="text"
                      inputMode="numeric"
                      value={form.ward}
                      onChange={handleChange}
                      placeholder="Enter ward number"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contactPhone" className={labelClass}>
                      Contact Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contactPhone"
                      name="contactPhone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      required
                      value={form.contactPhone}
                      onChange={handleChange}
                      placeholder="+977 98XXXXXXXX"
                      className={inputClass}
                      aria-invalid={!!errors.contactPhone}
                    />
                    {errors.contactPhone && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.contactPhone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contactEmail" className={labelClass}>
                      Contact Email
                    </label>
                    <input
                      id="contactEmail"
                      type="email"
                      name="contactEmail"
                      autoComplete="email"
                      value={form.contactEmail}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className={inputClass}
                      aria-invalid={!!errors.contactEmail}
                    />
                    {errors.contactEmail && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.contactEmail}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="remarks" className={labelClass}>
                    Remarks
                  </label>
                  <textarea
                    id="remarks"
                    name="remarks"
                    value={form.remarks}
                    onChange={handleChange}
                    placeholder="Optional notes"
                    rows={3}
                    className={`${inputClass} resize-none`}
                  />
                </div>
              </fieldset>
            )}

            {/* ---------- Actions ---------- */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-4 py-2 border border-gray-300 rounded text-sm text-black hover:bg-gray-100"
                >
                  Back
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  setForm(initialForm);
                  setErrors({});
                  setStep(1);
                }}
                className="px-4 py-2 border border-gray-300 rounded text-sm text-black hover:bg-gray-100"
              >
                Reset
              </button>

              <div className="flex-1" />

              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-4 py-2 bg-black text-white rounded text-sm hover:bg-gray-800"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-black text-white rounded text-sm hover:bg-gray-800 disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DateOfBirthRegister;