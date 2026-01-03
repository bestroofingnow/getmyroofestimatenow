import { LeadData, RoofEstimate, GHLWebhookPayload } from '@/types';

export function buildGHLPayload(
  lead: LeadData,
  estimate: RoofEstimate
): GHLWebhookPayload {
  // Get material estimates by name
  const shingles = estimate.materialEstimates.find(m => m.name === 'Architectural Shingles')?.estimate || estimate.estimate;
  const metal = estimate.materialEstimates.find(m => m.name === 'Metal Roofing')?.estimate || { low: 0, mid: 0, high: 0 };
  const synthetic = estimate.materialEstimates.find(m => m.name === 'Synthetic Roofing')?.estimate || { low: 0, mid: 0, high: 0 };
  const coatings = estimate.materialEstimates.find(m => m.name === 'Roof Coatings')?.estimate || { low: 0, mid: 0, high: 0 };

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
      roof_squares: estimate.squares,
      roof_pitch: estimate.pitchRatio,
      // Architectural Shingles
      shingles_low: shingles.low,
      shingles_mid: shingles.mid,
      shingles_high: shingles.high,
      // Metal Roofing
      metal_low: metal.low,
      metal_mid: metal.mid,
      metal_high: metal.high,
      // Synthetic Roofing
      synthetic_low: synthetic.low,
      synthetic_mid: synthetic.mid,
      synthetic_high: synthetic.high,
      // Roof Coatings
      coatings_low: coatings.low,
      coatings_mid: coatings.mid,
      coatings_high: coatings.high,
      // TCPA
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
