import { LeadData, RoofEstimate, GHLWebhookPayload } from '@/types';

export function buildGHLPayload(
  lead: LeadData,
  estimate: RoofEstimate
): GHLWebhookPayload {
  return {
    firstName: lead.firstName,
    lastName: lead.lastName,
    phone: lead.phone,
    email: lead.email,
    address1: lead.address,
    city: lead.city || '',
    state: lead.state || '',
    postalCode: lead.postalCode || '',
    source: 'InstantRoofEstimate.ai',
    tags: ['instant-estimate', 'website-lead', 'roof-replacement'],
    customField: {
      roof_square_feet: estimate.roofSqFt,
      estimate_low: estimate.estimate.low,
      estimate_mid: estimate.estimate.mid,
      estimate_high: estimate.estimate.high,
      roof_pitch: estimate.pitchRatio,
      tcpa_consent: lead.tcpaConsent ? 'Yes' : 'No',
      consent_timestamp: lead.consentTimestamp,
    },
  };
}

export async function submitToGHL(payload: GHLWebhookPayload): Promise<boolean> {
  const webhookUrl = process.env.GHL_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error('GHL_WEBHOOK_URL not configured');
    return false;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error('GHL webhook failed:', response.status, response.statusText);
      return false;
    }

    return true;
  } catch (error) {
    console.error('GHL webhook error:', error);
    return false;
  }
}
