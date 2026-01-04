import { NextRequest, NextResponse } from 'next/server';
import { buildGHLPayload, submitToGHL } from '@/lib/ghl-webhook';
import { LeadData, RoofEstimate } from '@/types';
import { checkRateLimit, getClientIP, RATE_LIMITS } from '@/lib/rate-limit';

interface SubmitLeadRequest extends LeadData {
  roofData: RoofEstimate;
}

// Basic input sanitization
function sanitizeString(str: string, maxLength: number = 100): string {
  if (typeof str !== 'string') return '';
  return str.trim().slice(0, maxLength).replace(/[<>]/g, '');
}

// Email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

// Phone validation (US format)
function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 10 || cleaned.length === 11;
}

export async function POST(request: NextRequest) {
  // Rate limiting - strict for lead submission
  const clientIP = getClientIP(request);
  const rateLimit = checkRateLimit(`submit-lead:${clientIP}`, RATE_LIMITS.submitLead);

  if (!rateLimit.success) {
    return NextResponse.json(
      { error: 'Too many submissions. Please try again later.' },
      { status: 429 }
    );
  }

  try {
    const data: SubmitLeadRequest = await request.json();

    // Sanitize inputs
    const firstName = sanitizeString(data.firstName, 50);
    const lastName = sanitizeString(data.lastName, 50);
    const phone = sanitizeString(data.phone, 20);
    const email = sanitizeString(data.email, 254).toLowerCase();
    const address = sanitizeString(data.address, 200);

    // Validate required fields
    if (!firstName || !lastName || !phone || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate phone format
    if (!isValidPhone(phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number' },
        { status: 400 }
      );
    }

    if (!data.tcpaConsent) {
      return NextResponse.json(
        { error: 'TCPA consent is required' },
        { status: 400 }
      );
    }

    if (!data.roofData) {
      return NextResponse.json(
        { error: 'Roof data is required' },
        { status: 400 }
      );
    }

    // Sanitize optional fields
    const city = sanitizeString(data.city || '', 100);
    const state = sanitizeString(data.state || '', 50);
    const postalCode = sanitizeString(data.postalCode || '', 20);

    // Build and submit GHL payload with sanitized data
    const payload = buildGHLPayload(
      {
        firstName,
        lastName,
        phone,
        email,
        address,
        city,
        state,
        postalCode,
        tcpaConsent: data.tcpaConsent,
        consentTimestamp: data.consentTimestamp,
      },
      data.roofData
    );

    // Submit to GHL (non-blocking - don't fail the request if GHL fails)
    const webhookUrl = process.env.GHL_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await submitToGHL(payload);
      } catch (error) {
        // Log but don't fail the request
        console.error('GHL submission error:', error);
      }
    } else {
      console.warn('GHL_WEBHOOK_URL not configured - lead not submitted to CRM');
    }

    return NextResponse.json({
      success: true,
      message: 'Lead submitted successfully',
    });
  } catch (error) {
    console.error('Submit lead error:', error);
    return NextResponse.json(
      { error: 'Failed to submit lead' },
      { status: 500 }
    );
  }
}
