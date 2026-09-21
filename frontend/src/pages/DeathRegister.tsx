import type { FormEvent, ChangeEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ---------- Types ----------
interface DeathFormData {
  // Deceased Information
  deceasedFirstName: string;
  deceasedLastName: string;
  gender: string;
  dateOfBirth: string;
  dateOfDeath: string;
  timeOfDeath: string;
  placeOfDeath: string;
  ageAtDeath: string;
  causeOfDeath: string;
  nationality: string;
  occupation: string;

  // Informant (person reporting)
  informantFullName: string;
  informantRelation: string;
  informantNationalId: string;
  informantPhone: string;

  // Address of Deceased
  province: string;
  district: string;
  municipality: string;
  ward: string;

  // Additional
  hospitalName: string;
  doctorName: string;
  remarks: string;
}

const initialForm: DeathFormData = {
  deceasedFirstName: "",
  deceasedLastName: "",
  gender: "",
  dateOfBirth: "",
  dateOfDeath: "",
  timeOfDeath: "",
  placeOfDeath: "",
  ageAtDeath: "",
  causeOfDeath: "",
  nationality: "",
  occupation: "",
  informantFullName: "",
  informantRelation: "",
  informantNationalId: "",
  informantPhone: "",
  province: "",
  district: "",
  municipality: "",
  ward: "",
  hospitalName: "",
  doctorName: "",
  remarks: "",
};

// ---------- Styles ----------
const inputClass =
  "w-full px-3 py-2 border border-gray-300 rounded text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-sm transition";

const labelClass = "block text-sm font-medium text-gray-800 mb-1";

const sectionTitleClass =
  "text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3";

// ---------- Main Component ----------
const DeathRegister = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<DeathFormData>(initialForm);
  const [errors, setErrors] = useState<
    Partial<Record<keyof DeathFormData, string>>
  >({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof DeathFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // ---------- Validation ----------
  const validateStep = (currentStep: 1 | 2 | 3 | 4) => {
    const e: Partial<Record<keyof DeathFormData, string>> = {};

    if (currentStep === 1) {
      if (!form.deceasedFirstName.trim())
        e.deceasedFirstName = "First name is required";
      if (!form.deceasedLastName.trim())
        e.deceasedLastName = "Last name is required";
      if (!form.gender) e.gender = "Please select a gender";
      if (!form.dateOfDeath) e.dateOfDeath = "Date of death is required";
      if (form.dateOfDeath && form.dateOfDeath > today)
        e.dateOfDeath = "Date cannot be in the future";
      if (!form.placeOfDeath.trim())
        e.placeOfDeath = "Place of death is required";
      if (!form.causeOfDeath.trim())
        e.causeOfDeath = "Cause of death is required";
      if (form.dateOfBirth && form.dateOfDeath && form.dateOfBirth > form.dateOfDeath)
        e.dateOfBirth = "Birth date must be before death date";
    }

    if (currentStep === 2) {
      if (!form.informantFullName.trim())
        e.informantFullName = "Informant name is required";
      if (!form.informantPhone.trim())
        e.informantPhone = "Informant phone is required";
      if (
        form.informantPhone &&
        !/^[0-9+\-\s()]{7,15}$/.test(form.informantPhone)
      )
        e.informantPhone = "Enter a valid phone number";
    }

    if (currentStep === 3) {
      // Address step — all optional
    }

    if (currentStep === 4) {
      // Additional info — all optional
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const nextStep = () => {
    if (!validateStep(step)) return;
    setStep((s) => (s < 4 ? ((s + 1) as 1 | 2 | 3 | 4) : s));
  };

  const prevStep = () =>
    setStep((s) => (s > 1 ? ((s - 1) as 1 | 2 | 3 | 4) : s));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateStep(1)) return setStep(1);
    if (!validateStep(2)) return setStep(2);
    if (!validateStep(3)) return setStep(3);
    if (!validateStep(4)) return setStep(4);

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
            Death record submitted successfully.
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
            <h1 className="text-xl font-semibold">Death Registration</h1>
            <p className="text-sm text-gray-500 mt-1">
              Fill in the details below to register a death.
            </p>
          </div>

          {/* Step Indicator */}
          <ol className="flex items-center gap-2 mb-6 text-xs">
            {[1, 2, 3, 4].map((n) => (
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
                  {n === 1
                    ? "Deceased"
                    : n === 2
                    ? "Informant"
                    : n === 3
                    ? "Address"
                    : "Additional"}
                </span>
                {n < 4 && <span className="flex-1 h-px bg-gray-200" />}
              </li>
            ))}
          </ol>

          {/* Native browser form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* ---------- STEP 1: Deceased Information ---------- */}
            {step === 1 && (
              <fieldset className="space-y-4">
                <legend className={sectionTitleClass}>
                  Deceased Information
                </legend>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="deceasedFirstName" className={labelClass}>
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="deceasedFirstName"
                      name="deceasedFirstName"
                      type="text"
                      autoComplete="given-name"
                      required
                      value={form.deceasedFirstName}
                      onChange={handleChange}
                      placeholder="Enter first name"
                      className={inputClass}
                      aria-invalid={!!errors.deceasedFirstName}
                    />
                    {errors.deceasedFirstName && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.deceasedFirstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="deceasedLastName" className={labelClass}>
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="deceasedLastName"
                      name="deceasedLastName"
                      type="text"
                      autoComplete="family-name"
                      required
                      value={form.deceasedLastName}
                      onChange={handleChange}
                      placeholder="Enter last name"
                      className={inputClass}
                      aria-invalid={!!errors.deceasedLastName}
                    />
                    {errors.deceasedLastName && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.deceasedLastName}
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
                      Date of Birth
                    </label>
                    <input
                      id="dateOfBirth"
                      type="date"
                      name="dateOfBirth"
                      max={today}
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="dateOfDeath" className={labelClass}>
                      Date of Death <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="dateOfDeath"
                      type="date"
                      name="dateOfDeath"
                      required
                      max={today}
                      value={form.dateOfDeath}
                      onChange={handleChange}
                      className={inputClass}
                      aria-invalid={!!errors.dateOfDeath}
                    />
                    {errors.dateOfDeath && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.dateOfDeath}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="timeOfDeath" className={labelClass}>
                      Time of Death
                    </label>
                    <input
                      id="timeOfDeath"
                      type="time"
                      name="timeOfDeath"
                      value={form.timeOfDeath}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="placeOfDeath" className={labelClass}>
                    Place of Death <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="placeOfDeath"
                    name="placeOfDeath"
                    type="text"
                    required
                    value={form.placeOfDeath}
                    onChange={handleChange}
                    placeholder="Hospital, home, or other"
                    className={inputClass}
                    aria-invalid={!!errors.placeOfDeath}
                  />
                  {errors.placeOfDeath && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.placeOfDeath}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="ageAtDeath" className={labelClass}>
                      Age at Death
                    </label>
                    <input
                      id="ageAtDeath"
                      name="ageAtDeath"
                      type="number"
                      inputMode="numeric"
                      min="0"
                      max="150"
                      value={form.ageAtDeath}
                      onChange={handleChange}
                      placeholder="e.g. 65"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="causeOfDeath" className={labelClass}>
                      Cause of Death <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="causeOfDeath"
                      name="causeOfDeath"
                      type="text"
                      required
                      value={form.causeOfDeath}
                      onChange={handleChange}
                      placeholder="e.g. Natural causes, illness"
                      className={inputClass}
                      aria-invalid={!!errors.causeOfDeath}
                    />
                    {errors.causeOfDeath && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.causeOfDeath}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nationality" className={labelClass}>
                      Nationality
                    </label>
                    <input
                      id="nationality"
                      name="nationality"
                      type="text"
                      autoComplete="country-name"
                      value={form.nationality}
                      onChange={handleChange}
                      placeholder="e.g. Nepali"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="occupation" className={labelClass}>
                      Occupation
                    </label>
                    <input
                      id="occupation"
                      name="occupation"
                      type="text"
                      autoComplete="organization-title"
                      value={form.occupation}
                      onChange={handleChange}
                      placeholder="e.g. Farmer"
                      className={inputClass}
                    />
                  </div>
                </div>
              </fieldset>
            )}

            {/* ---------- STEP 2: Informant ---------- */}
            {step === 2 && (
              <fieldset className="space-y-4">
                <legend className={sectionTitleClass}>
                  Informant (Person Reporting)
                </legend>

                <div>
                  <label htmlFor="informantFullName" className={labelClass}>
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="informantFullName"
                    name="informantFullName"
                    type="text"
                    autoComplete="name"
                    required
                    value={form.informantFullName}
                    onChange={handleChange}
                    placeholder="Person reporting the death"
                    className={inputClass}
                    aria-invalid={!!errors.informantFullName}
                  />
                  {errors.informantFullName && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.informantFullName}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="informantRelation" className={labelClass}>
                    Relation to Deceased
                  </label>
                  <input
                    id="informantRelation"
                    name="informantRelation"
                    type="text"
                    value={form.informantRelation}
                    onChange={handleChange}
                    placeholder="e.g. Son, Daughter, Spouse"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="informantNationalId" className={labelClass}>
                    National ID
                  </label>
                  <input
                    id="informantNationalId"
                    name="informantNationalId"
                    type="text"
                    inputMode="numeric"
                    value={form.informantNationalId}
                    onChange={handleChange}
                    placeholder="Enter national ID"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="informantPhone" className={labelClass}>
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="informantPhone"
                    name="informantPhone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    required
                    value={form.informantPhone}
                    onChange={handleChange}
                    placeholder="+977 98XXXXXXXX"
                    className={inputClass}
                    aria-invalid={!!errors.informantPhone}
                  />
                  {errors.informantPhone && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.informantPhone}
                    </p>
                  )}
                </div>
              </fieldset>
            )}

            {/* ---------- STEP 3: Address of Deceased ---------- */}
            {step === 3 && (
              <fieldset className="space-y-4">
                <legend className={sectionTitleClass}>
                  Address of Deceased
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
              </fieldset>
            )}

            {/* ---------- STEP 4: Additional Info ---------- */}
            {step === 4 && (
              <fieldset className="space-y-4">
                <legend className={sectionTitleClass}>Additional Details</legend>

                <div>
                  <label htmlFor="hospitalName" className={labelClass}>
                    Hospital / Health Facility
                  </label>
                  <input
                    id="hospitalName"
                    name="hospitalName"
                    type="text"
                    value={form.hospitalName}
                    onChange={handleChange}
                    placeholder="e.g. Teaching Hospital"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="doctorName" className={labelClass}>
                    Attending Doctor
                  </label>
                  <input
                    id="doctorName"
                    name="doctorName"
                    type="text"
                    value={form.doctorName}
                    onChange={handleChange}
                    placeholder="Doctor's name"
                    className={inputClass}
                  />
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

              {step < 4 ? (
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

export default DeathRegister;