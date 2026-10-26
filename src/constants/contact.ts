/**
 * SHIVOM GLOBAL — Canonical Contact Information & Channels
 * Central source of truth for all buyer communication channels.
 */

export const CONTACT_INFO = {
  companyName: 'SHIVOM GLOBAL',
  proprietor: 'Sarthak Sarvaiya',
  entityType: 'Sole Proprietorship (Registered Indian Enterprise, Udyam MSME)',
  gstin: '24KWEPS2703C1ZQ',
  udyamNumber: 'UDYAM-GJ-05-0105835',
  udyamStatus: 'Registered (Govt. of India MSME)',
  phone: {
    display: '+91 97370 30437',
    raw: '+919737030437',
    telLink: 'tel:+919737030437',
    ariaLabel: 'Call SHIVOM GLOBAL Trade Desk at +91 97370 30437',
  },
  whatsapp: {
    display: '+91 97370 30437',
    number: '919737030437',
    defaultMessage: 'Hi SHIVOM GLOBAL, I would like to discuss a tea sourcing requirement.',
    getLink: (customMessage?: string) => {
      const msg = customMessage || 'Hi SHIVOM GLOBAL, I would like to discuss a tea sourcing requirement.';
      return 'https://wa.me/919737030437?text=' + encodeURIComponent(msg);
    },
    getContextualLink: (params: {
      grade?: string;
      category?: string;
      destination?: string;
      quantity?: string;
      sampleRequired?: boolean;
      intent?: 'sample' | 'quote' | 'general';
    }) => {
      const parts: string[] = ['Hi SHIVOM GLOBAL,'];

      const teaLabel = [params.category, params.grade].filter(Boolean).join(' ');
      
      if (params.intent === 'sample' || params.sampleRequired) {
        if (teaLabel) {
          parts.push(`I am interested in evaluating ${teaLabel}.`);
        } else {
          parts.push('I am interested in evaluating Indian tea samples.');
        }
      } else if (teaLabel) {
        parts.push(`I am interested in sourcing ${teaLabel}.`);
      } else {
        parts.push('I would like to discuss an Indian tea sourcing requirement.');
      }

      if (params.quantity && params.quantity.trim() && !params.quantity.includes('undefined')) {
        parts.push(`Required quantity: ${params.quantity.trim()}.`);
      }

      if (params.destination && params.destination.trim() && !params.destination.includes('undefined')) {
        parts.push(`Destination: ${params.destination.trim()}.`);
      }

      parts.push('Please share the available specification, counter-sample options and commercial details.');
      
      const fullMessage = parts.join(' ');
      return 'https://wa.me/919737030437?text=' + encodeURIComponent(fullMessage);
    },
    ariaLabel: 'Chat with SHIVOM GLOBAL Trade Desk on WhatsApp',
  },
  email: {
    address: 'shivomglobal1010@gmail.com',
    mailtoLink: 'mailto:shivomglobal1010@gmail.com?subject=' + encodeURIComponent('Tea Sourcing Inquiry — SHIVOM GLOBAL'),
    ariaLabel: 'Email SHIVOM GLOBAL at shivomglobal1010@gmail.com',
  },
  address: {
    display: 'Bhavnagar, Gujarat, India',
    city: 'Bhavnagar',
    state: 'Gujarat',
    country: 'India',
  },
  ports: {
    loading: 'Mundra, Kandla, Kolkata, Haldia, Nhava Sheva (JNPT)',
    destinationGateway: 'Port Jebel Ali, UAE / GCC Ports / Global Discharge Ports',
  },
  tradeTerms: 'FOB Indian Loading Ports / CIF Destination Ports',
  hours: 'Mon – Sat (Trade Desk Direct Intake)',
} as const;

export default CONTACT_INFO;
