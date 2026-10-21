/**
 * SHIVOM GLOBAL — Canonical Contact Information & Channels
 * Central source of truth for all buyer communication channels.
 */

export const CONTACT_INFO = {
  companyName: 'SHIVOM GLOBAL',
  proprietor: 'Sarthak Sarvaiya',
  entityType: 'Sole Proprietorship (Registered Indian Enterprise, Udyam MSME)',
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
    ariaLabel: 'Chat with SHIVOM GLOBAL Trade Desk on WhatsApp',
  },
  email: {
    address: 'shivomglobal1010@gmail.com',
    mailtoLink: 'mailto:shivomglobal1010@gmail.com?subject=' + encodeURIComponent('Commercial Tea Sourcing Inquiry — SHIVOM GLOBAL'),
    ariaLabel: 'Email SHIVOM GLOBAL at shivomglobal1010@gmail.com',
  },
  address: {
    display: 'Bhavnagar, Gujarat, India',
    city: 'Bhavnagar',
    state: 'Gujarat',
    country: 'India',
  },
  ports: {
    loading: 'Kolkata, Haldia, Mundra, Nhava Sheva (JNPT)',
  },
  tradeTerms: 'FOB Indian Ports / CIF Destination Ports',
  hours: 'Mon – Sat (Trade Desk Direct Intake)',
} as const;

export default CONTACT_INFO;
