import {useState } from "react";
import type { FormEvent } from "react";
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
  "w-full px-3 py-2 border border-gray-300 rounded text-black placeholder-gray-400 focus:outline-none focus:border-black text-sm";

const labelClass = "block text-sm text-black mb-1";

// ---------- Main Component ----------
const DateOfBirthRegister = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<BirthFormData>(initialForm);
  const [errors, setErrors] = useState<
    Partial<Record<keyof BirthFormData, string>>
  >({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name as keyof BirthFormData]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const validate = () => {
    const e: Partial<Record<keyof BirthFormData, string>> = {};
    if (!form.childFirstName.trim()) e.childFirstName = "Required";
    if (!form.childLastName.trim()) e.childLastName = "Required";
    if (!form.gender) e.gender = "Required";
    if (!form.dateOfBirth) e.dateOfBirth = "Required";
    if (!form.placeOfBirth.trim()) e.placeOfBirth = "Required";
    if (!form.motherFullName.trim()) e.motherFullName = "Required";
    if (!form.fatherFullName.trim()) e.fatherFullName = "Required";
    if (!form.contactPhone.trim()) e.contactPhone = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

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
    <div className="min-h-screen bg-white text-black p-6">
      <div className="max-w-xl mx-auto">
        {/* ---------- Boxed Form ---------- */}
        <div className="border border-gray-300 rounded-lg p-6 md:p-8">
          <div className="mb-6 pb-4 border-b border-gray-200">
            <h1 className="text-xl font-semibold">Birth Registration</h1>
            <p className="text-sm text-gray-500 mt-1">
              Fill in the details below to register a birth.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Child First Name */}
            <div>
              <label className={labelClass}>
                Child First Name <span className="text-red-500">*</span>
              </label>
              <input
                name="childFirstName"
                value={form.childFirstName}
                onChange={handleChange}
                placeholder="Enter first name"
                className={inputClass}
              />
              {errors.childFirstName && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.childFirstName}
                </p>
              )}
            </div>

            {/* Child Last Name */}
            <div>
              <label className={labelClass}>
                Child Last Name <span className="text-red-500">*</span>
              </label>
              <input
                name="childLastName"
                value={form.childLastName}
                onChange={handleChange}
                placeholder="Enter last name"
                className={inputClass}
              />
              {errors.childLastName && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.childLastName}
                </p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className={labelClass}>
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <p className="text-xs text-red-500 mt-1">{errors.gender}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label className={labelClass}>
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={form.dateOfBirth}
                onChange={handleChange}
                className={inputClass}
              />
              {errors.dateOfBirth && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.dateOfBirth}
                </p>
              )}
            </div>

            {/* Place of Birth */}
            <div>
              <label className={labelClass}>
                Place of Birth <span className="text-red-500">*</span>
              </label>
              <input
                name="placeOfBirth"
                value={form.placeOfBirth}
                onChange={handleChange}
                placeholder="Hospital or home"
                className={inputClass}
              />
              {errors.placeOfBirth && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.placeOfBirth}
                </p>
              )}
            </div>

            {/* Mother's Full Name */}
            <div>
              <label className={labelClass}>
                Mother's Full Name <span className="text-red-500">*</span>
              </label>
              <input
                name="motherFullName"
                value={form.motherFullName}
                onChange={handleChange}
                placeholder="Enter mother's full name"
                className={inputClass}
              />
              {errors.motherFullName && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.motherFullName}
                </p>
              )}
            </div>

            {/* Mother's National ID */}
            <div>
              <label className={labelClass}>Mother's National ID</label>
              <input
                name="motherNationalId"
                value={form.motherNationalId}
                onChange={handleChange}
                placeholder="Enter national ID"
                className={inputClass}
              />
            </div>

            {/* Father's Full Name */}
            <div>
              <label className={labelClass}>
                Father's Full Name <span className="text-red-500">*</span>
              </label>
              <input
                name="fatherFullName"
                value={form.fatherFullName}
                onChange={handleChange}
                placeholder="Enter father's full name"
                className={inputClass}
              />
              {errors.fatherFullName && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.fatherFullName}
                </p>
              )}
            </div>

            {/* Father's National ID */}
            <div>
              <label className={labelClass}>Father's National ID</label>
              <input
                name="fatherNationalId"
                value={form.fatherNationalId}
                onChange={handleChange}
                placeholder="Enter national ID"
                className={inputClass}
              />
            </div>

            {/* Province */}
            <div>
              <label className={labelClass}>Province</label>
              <select
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

            {/* District */}
            <div>
              <label className={labelClass}>District</label>
              <input
                name="district"
                value={form.district}
                onChange={handleChange}
                placeholder="Enter district"
                className={inputClass}
              />
            </div>

            {/* Municipality */}
            <div>
              <label className={labelClass}>Municipality</label>
              <input
                name="municipality"
                value={form.municipality}
                onChange={handleChange}
                placeholder="Enter municipality"
                className={inputClass}
              />
            </div>

            {/* Ward */}
            <div>
              <label className={labelClass}>Ward No.</label>
              <input
                name="ward"
                value={form.ward}
                onChange={handleChange}
                placeholder="Enter ward number"
                className={inputClass}
              />
            </div>

            {/* Contact Phone */}
            <div>
              <label className={labelClass}>
                Contact Phone <span className="text-red-500">*</span>
              </label>
              <input
                name="contactPhone"
                value={form.contactPhone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className={inputClass}
              />
              {errors.contactPhone && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.contactPhone}
                </p>
              )}
            </div>

            {/* Contact Email */}
            <div>
              <label className={labelClass}>Contact Email</label>
              <input
                type="email"
                name="contactEmail"
                value={form.contactEmail}
                onChange={handleChange}
                placeholder="Enter email"
                className={inputClass}
              />
            </div>

            {/* Remarks */}
            <div>
              <label className={labelClass}>Remarks</label>
              <textarea
                name="remarks"
                value={form.remarks}
                onChange={handleChange}
                placeholder="Optional notes"
                rows={3}
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  setForm(initialForm);
                  setErrors({});
                }}
                className="px-4 py-2 border border-gray-300 rounded text-sm text-black hover:bg-gray-100"
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-black text-white rounded text-sm hover:bg-gray-800 disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DateOfBirthRegister;