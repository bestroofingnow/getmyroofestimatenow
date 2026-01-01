import { NextRequest, NextResponse } from 'next/server';
import { buildGHLPayload, submitToGHL } from '@/lib/ghl-webhook';
import { LeadData, RoofEstimate } from '@/types';

interface SubmitLeadRequest extends LeadData {
  roofData: RoofEstimate;
}

export async function POST(request: NextRequest) {
  try {
    const data: SubmitLeadRequest = await request.json();

    // Validate required fields
    if (!data.firstName || !data.lastName || !data.phone || !data.email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
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

    // Build and submit GHL payload
    const payload = buildGHLPayload(
      {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        email: data.email,
        address: data.address,
        city: data.city,
        state: data.state,
        postalCode: data.postalCode,
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
