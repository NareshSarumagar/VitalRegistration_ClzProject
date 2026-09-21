import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

// ---------- Types ----------
interface MarriageFormData {
  // Groom Information
  groomFirstName: string;
  groomLastName: string;
  groomDateOfBirth: string;
  groomNationalId: string;
  groomNationality: string;
  groomOccupation: string;
  groomPhone: string;

  // Bride Information
  brideFirstName: string;
  brideLastName: string;
  brideDateOfBirth: string;
  brideNationalId: string;
  brideNationality: string;
  brideOccupation: string;
  bridePhone: string;

  // Marriage Details
  dateOfMarriage: string;
  placeOfMarriage: string;
  marriageType: string;
  witness1Name: string;
  witness1NationalId: string;
  witness2Name: string;
  witness2NationalId: string;

  // Address
  province: string;
  district: string;
  municipality: string;
  ward: string;

  // Contact & Additional
  contactPhone: string;
  contactEmail: string;
  remarks: string;
}

const initialForm: MarriageFormData = {
  groomFirstName: "",
  groomLastName: "",
  groomDateOfBirth: "",
  groomNationalId: "",
  groomNationality: "",
  groomOccupation: "",
  groomPhone: "",
  brideFirstName: "",
  brideLastName: "",
  brideDateOfBirth: "",
  brideNationalId: "",
  brideNationality: "",
  brideOccupation: "",
  bridePhone: "",
  dateOfMarriage: "",
  placeOfMarriage: "",
  marriageType: "",
  witness1Name: "",
  witness1NationalId: "",
  witness2Name: "",
  witness2NationalId: "",
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
const MarriageRegister = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<MarriageFormData>(initialForm);
  const [errors, setErrors] = useState<
    Partial<Record<keyof MarriageFormData, string>>
  >({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof MarriageFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // ---------- Validation ----------
  const validateStep = (currentStep: 1 | 2 | 3 | 4 | 5) => {
    const e: Partial<Record<keyof MarriageFormData, string>> = {};

    if (currentStep === 1) {
      if (!form.groomFirstName.trim())
        e.groomFirstName = "First name is required";
      if (!form.groomLastName.trim())
        e.groomLastName = "Last name is required";
      if (!form.groomDateOfBirth)
        e.groomDateOfBirth = "Date of birth is required";
      if (form.groomPhone && !/^[0-9+\-\s()]{7,15}$/.test(form.groomPhone))
        e.groomPhone = "Enter a valid phone number";
    }

    if (currentStep === 2) {
      if (!form.brideFirstName.trim())
        e.brideFirstName = "First name is required";
      if (!form.brideLastName.trim())
        e.brideLastName = "Last name is required";
      if (!form.brideDateOfBirth)
        e.brideDateOfBirth = "Date of birth is required";
      if (form.bridePhone && !/^[0-9+\-\s()]{7,15}$/.test(form.bridePhone))
        e.bridePhone = "Enter a valid phone number";
    }

    if (currentStep === 3) {
      if (!form.dateOfMarriage)
        e.dateOfMarriage = "Date of marriage is required";
      if (form.dateOfMarriage && form.dateOfMarriage > today)
        e.dateOfMarriage = "Date cannot be in the future";
      if (!form.placeOfMarriage.trim())
        e.placeOfMarriage = "Place of marriage is required";
      if (!form.witness1Name.trim())
        e.witness1Name = "Witness 1 name is required";
      if (!form.witness2Name.trim())
        e.witness2Name = "Witness 2 name is required";
    }

    if (currentStep === 4) {
      // Address — all optional
    }

    if (currentStep === 5) {
      if (!form.contactPhone.trim())
        e.contactPhone = "Contact phone is required";
      if (
        form.contactPhone &&
        !/^[0-9+\-\s()]{7,15}$/.test(form.contactPhone)
      )
        e.contactPhone = "Enter a valid phone number";
      if (form.contactEmail && !/^\S+@\S+\.\S+$/.test(form.contactEmail))
        e.contactEmail = "Enter a valid email address";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const nextStep = () => {
    if (!validateStep(step)) return;
    setStep((s) => (s < 5 ? ((s + 1) as 1 | 2 | 3 | 4 | 5) : s));
  };

  const prevStep = () =>
    setStep((s) => (s > 1 ? ((s - 1) as 1 | 2 | 3 | 4 | 5) : s));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateStep(1)) return setStep(1);
    if (!validateStep(2)) return setStep(2);
    if (!validateStep(3)) return setStep(3);
    if (!validateStep(4)) return setStep(4);
    if (!validateStep(5)) return setStep(5);

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
            Marriage record submitted successfully.
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
            <h1 className="text-xl font-semibold">Marriage Registration</h1>
            <p className="text-sm text-gray-500 mt-1">
              Fill in the details below to register a marriage.
            </p>
          </div>

          {/* Step Indicator */}
          <ol className="flex items-center gap-2 mb-6 text-xs">
            {[1, 2, 3, 4, 5].map((n) => (
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
                    ? "Groom"
                    : n === 2
                    ? "Bride"
                    : n === 3
                    ? "Marriage"
                    : n === 4
                    ? "Address"
                    : "Contact"}
                </span>
                {n < 5 && <span className="flex-1 h-px bg-gray-200" />}
              </li>
            ))}
          </ol>

          {/* Native browser form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* ---------- STEP 1: Groom Information ---------- */}
            {step === 1 && (
              <fieldset className="space-y-4">
                <legend className={sectionTitleClass}>
                  Groom Information
                </legend>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="groomFirstName" className={labelClass}>
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="groomFirstName"
                      name="groomFirstName"
                      type="text"
                      autoComplete="given-name"
                      required
                      value={form.groomFirstName}
                      onChange={handleChange}
                      placeholder="Enter first name"
                      className={inputClass}
                      aria-invalid={!!errors.groomFirstName}
                    />
                    {errors.groomFirstName && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.groomFirstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="groomLastName" className={labelClass}>
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="groomLastName"
                      name="groomLastName"
                      type="text"
                      autoComplete="family-name"
                      required
                      value={form.groomLastName}
                      onChange={handleChange}
                      placeholder="Enter last name"
                      className={inputClass}
                      aria-invalid={!!errors.groomLastName}
                    />
                    {errors.groomLastName && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.groomLastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="groomDateOfBirth" className={labelClass}>
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="groomDateOfBirth"
                      type="date"
                      name="groomDateOfBirth"
                      required
                      max={today}
                      value={form.groomDateOfBirth}
                      onChange={handleChange}
                      className={inputClass}
                      aria-invalid={!!errors.groomDateOfBirth}
                    />
                    {errors.groomDateOfBirth && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.groomDateOfBirth}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="groomNationalId" className={labelClass}>
                      National ID
                    </label>
                    <input
                      id="groomNationalId"
                      name="groomNationalId"
                      type="text"
                      inputMode="numeric"
                      value={form.groomNationalId}
                      onChange={handleChange}
                      placeholder="Enter national ID"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="groomNationality" className={labelClass}>
                      Nationality
                    </label>
                    <input
                      id="groomNationality"
                      name="groomNationality"
                      type="text"
                      autoComplete="country-name"
                      value={form.groomNationality}
                      onChange={handleChange}
                      placeholder="e.g. Nepali"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="groomOccupation" className={labelClass}>
                      Occupation
                    </label>
                    <input
                      id="groomOccupation"
                      name="groomOccupation"
                      type="text"
                      autoComplete="organization-title"
                      value={form.groomOccupation}
                      onChange={handleChange}
                      placeholder="e.g. Engineer"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="groomPhone" className={labelClass}>
                    Phone
                  </label>
                  <input
                    id="groomPhone"
                    name="groomPhone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    value={form.groomPhone}
                    onChange={handleChange}
                    placeholder="+977 98XXXXXXXX"
                    className={inputClass}
                    aria-invalid={!!errors.groomPhone}
                  />
                  {errors.groomPhone && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.groomPhone}
                    </p>
                  )}
                </div>
              </fieldset>
            )}

            {/* ---------- STEP 2: Bride Information ---------- */}
            {step === 2 && (
              <fieldset className="space-y-4">
                <legend className={sectionTitleClass}>
                  Bride Information
                </legend>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="brideFirstName" className={labelClass}>
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="brideFirstName"
                      name="brideFirstName"
                      type="text"
                      autoComplete="given-name"
                      required
                      value={form.brideFirstName}
                      onChange={handleChange}
                      placeholder="Enter first name"
                      className={inputClass}
                      aria-invalid={!!errors.brideFirstName}
                    />
                    {errors.brideFirstName && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.brideFirstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="brideLastName" className={labelClass}>
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="brideLastName"
                      name="brideLastName"
                      type="text"
                      autoComplete="family-name"
                      required
                      value={form.brideLastName}
                      onChange={handleChange}
                      placeholder="Enter last name"
                      className={inputClass}
                      aria-invalid={!!errors.brideLastName}
                    />
                    {errors.brideLastName && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.brideLastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="brideDateOfBirth" className={labelClass}>
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="brideDateOfBirth"
                      type="date"
                      name="brideDateOfBirth"
                      required
                      max={today}
                      value={form.brideDateOfBirth}
                      onChange={handleChange}
                      className={inputClass}
                      aria-invalid={!!errors.brideDateOfBirth}
                    />
                    {errors.brideDateOfBirth && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.brideDateOfBirth}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="brideNationalId" className={labelClass}>
                      National ID
                    </label>
                    <input
                      id="brideNationalId"
                      name="brideNationalId"
                      type="text"
                      inputMode="numeric"
                      value={form.brideNationalId}
                      onChange={handleChange}
                      placeholder="Enter national ID"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="brideNationality" className={labelClass}>
                      Nationality
                    </label>
                    <input
                      id="brideNationality"
                      name="brideNationality"
                      type="text"
                      autoComplete="country-name"
                      value={form.brideNationality}
                      onChange={handleChange}
                      placeholder="e.g. Nepali"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="brideOccupation" className={labelClass}>
                      Occupation
                    </label>
                    <input
                      id="brideOccupation"
                      name="brideOccupation"
                      type="text"
                      autoComplete="organization-title"
                      value={form.brideOccupation}
                      onChange={handleChange}
                      placeholder="e.g. Teacher"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="bridePhone" className={labelClass}>
                    Phone
                  </label>
                  <input
                    id="bridePhone"
                    name="bridePhone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    value={form.bridePhone}
                    onChange={handleChange}
                    placeholder="+977 98XXXXXXXX"
                    className={inputClass}
                    aria-invalid={!!errors.bridePhone}
                  />
                  {errors.bridePhone && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.bridePhone}
                    </p>
                  )}
                </div>
              </fieldset>
            )}

            {/* ---------- STEP 3: Marriage Details & Witnesses ---------- */}
            {step === 3 && (
              <>
                <fieldset className="space-y-4">
                  <legend className={sectionTitleClass}>
                    Marriage Details
                  </legend>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="dateOfMarriage" className={labelClass}>
                        Date of Marriage <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="dateOfMarriage"
                        type="date"
                        name="dateOfMarriage"
                        required
                        max={today}
                        value={form.dateOfMarriage}
                        onChange={handleChange}
                        className={inputClass}
                        aria-invalid={!!errors.dateOfMarriage}
                      />
                      {errors.dateOfMarriage && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.dateOfMarriage}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="marriageType" className={labelClass}>
                        Marriage Type
                      </label>
                      <select
                        id="marriageType"
                        name="marriageType"
                        value={form.marriageType}
                        onChange={handleChange}
                        className={inputClass}
                      >
                        <option value="">Select type</option>
                        <option value="religious">Religious</option>
                        <option value="civil">Civil</option>
                        <option value="court">Court</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="placeOfMarriage" className={labelClass}>
                      Place of Marriage <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="placeOfMarriage"
                      name="placeOfMarriage"
                      type="text"
                      required
                      value={form.placeOfMarriage}
                      onChange={handleChange}
                      placeholder="e.g. Temple, Court, Home"
                      className={inputClass}
                      aria-invalid={!!errors.placeOfMarriage}
                    />
                    {errors.placeOfMarriage && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.placeOfMarriage}
                      </p>
                    )}
                  </div>
                </fieldset>

                <fieldset className="space-y-4 pt-6 border-t border-gray-200">
                  <legend className={sectionTitleClass}>Witnesses</legend>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="witness1Name" className={labelClass}>
                        Witness 1 Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="witness1Name"
                        name="witness1Name"
                        type="text"
                        autoComplete="name"
                        required
                        value={form.witness1Name}
                        onChange={handleChange}
                        placeholder="Enter witness name"
                        className={inputClass}
                        aria-invalid={!!errors.witness1Name}
                      />
                      {errors.witness1Name && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.witness1Name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="witness1NationalId" className={labelClass}>
                        Witness 1 National ID
                      </label>
                      <input
                        id="witness1NationalId"
                        name="witness1NationalId"
                        type="text"
                        inputMode="numeric"
                        value={form.witness1NationalId}
                        onChange={handleChange}
                        placeholder="Enter national ID"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="witness2Name" className={labelClass}>
                        Witness 2 Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="witness2Name"
                        name="witness2Name"
                        type="text"
                        autoComplete="name"
                        required
                        value={form.witness2Name}
                        onChange={handleChange}
                        placeholder="Enter witness name"
                        className={inputClass}
                        aria-invalid={!!errors.witness2Name}
                      />
                      {errors.witness2Name && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.witness2Name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="witness2NationalId" className={labelClass}>
                        Witness 2 National ID
                      </label>
                      <input
                        id="witness2NationalId"
                        name="witness2NationalId"
                        type="text"
                        inputMode="numeric"
                        value={form.witness2NationalId}
                        onChange={handleChange}
                        placeholder="Enter national ID"
                        className={inputClass}
                      />
                    </div>
                  </div>
                </fieldset>
              </>
            )}

            {/* ---------- STEP 4: Address ---------- */}
            {step === 4 && (
              <fieldset className="space-y-4">
                <legend className={sectionTitleClass}>Address</legend>

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

            {/* ---------- STEP 5: Contact & Remarks ---------- */}
            {step === 5 && (
              <fieldset className="space-y-4">
                <legend className={sectionTitleClass}>Contact</legend>

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

              {step < 5 ? (
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

export default MarriageRegister;