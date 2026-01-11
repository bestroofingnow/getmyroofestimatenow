'use client';

import { useState, FormEvent } from 'react';
import { User, Phone, Mail, MapPin, Loader2, ArrowRight } from 'lucide-react';

export interface LeadFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  tcpaConsent: boolean;
  consentTimestamp: string;
}

interface LeadCaptureFormProps {
  address: string;
  onSubmit: (data: LeadFormData) => void;
  isLoading?: boolean;
  buttonText?: string;
  disabled?: boolean;
}

export function LeadCaptureForm({
  address,
  onSubmit,
  isLoading = false,
  buttonText = "Get My Estimate",
  disabled = false,
}: LeadCaptureFormProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [tcpaConsent, setTcpaConsent] = useState(false);

  const isFormValid = firstName && lastName && phone && email && tcpaConsent;

  const formatPhone = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');

    // Format as (XXX) XXX-XXXX
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!isFormValid || disabled) return;

    onSubmit({
      firstName,
      lastName,
      phone,
      email,
      tcpaConsent,
      consentTimestamp: new Date().toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name fields in a row */}
      <div className="grid grid-cols-2 gap-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            required
            className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg
                       focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100
                       transition-all duration-200 outline-none"
          />
        </div>
        <div>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            required
            className="w-full px-4 py-3 border border-slate-200 rounded-lg
                       focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100
                       transition-all duration-200 outline-none"
          />
        </div>
      </div>

      {/* Phone */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Phone className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="tel"
          value={phone}
          onChange={handlePhoneChange}
          placeholder="Phone Number"
          required
          className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg
                     focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100
                     transition-all duration-200 outline-none"
        />
      </div>

      {/* Email */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Mail className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          required
          className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg
                     focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100
                     transition-all duration-200 outline-none"
        />
      </div>

      {/* Address (pre-filled, disabled) */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MapPin className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="text"
          value={address}
          disabled
          className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg
                     bg-slate-50 text-slate-600 cursor-not-allowed"
        />
      </div>

      {/* TCPA Consent */}
      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          checked={tcpaConsent}
          onChange={(e) => setTcpaConsent(e.target.checked)}
          required
          className="mt-1 w-5 h-5 rounded border-slate-300 text-emerald-600
                     focus:ring-emerald-500 focus:ring-2 cursor-pointer"
        />
        <span className="text-sm text-slate-600 leading-relaxed">
          I consent to receive calls, SMS/text messages, and emails regarding my roofing estimate,
          including communications made using AI, automated dialing systems, and prerecorded messages.
          Message frequency varies. Message and data rates may apply. Reply STOP to opt out.
          Consent is not required to make a purchase. By submitting, I agree to the{' '}
          <a href="/terms" className="text-emerald-600 hover:underline">Terms of Service</a>
          {' '}and{' '}
          <a href="/privacy-policy" className="text-emerald-600 hover:underline">Privacy Policy</a>.
        </span>
      </label>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!isFormValid || isLoading || disabled}
        className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold
                   rounded-lg hover:from-emerald-500 hover:to-teal-500
                   disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed
                   transition-all duration-200 flex items-center justify-center gap-2
                   shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>{buttonText}</span>
          </>
        ) : (
          <>
            <span>{buttonText}</span>
            <ArrowRight className="h-5 w-5" />
          </>
        )}
      </button>
    </form>
  );
}
