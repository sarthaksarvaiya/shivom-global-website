import React from 'react';
import { User, MessageCircle, Phone, Mail, MapPin, ShieldCheck, ArrowRight } from 'lucide-react';
import { CONTACT_INFO } from '@/constants/contact';

export interface AboutSarthakSectionProps {
  onContactSarthak?: () => void;
}

export const AboutSarthakSection: React.FC<AboutSarthakSectionProps> = ({
  onContactSarthak,
}) => {
  const handleDirectInquiry = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onContactSarthak) {
      onContactSarthak();
    } else {
      const formElement = document.getElementById('requirement-form');
      if (formElement) {
        const headerOffset = 80;
        const elementPosition = formElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <section 
      id="about-sarthak" 
      className="about-sarthak-section" 
      aria-labelledby="about-sarthak-title"
    >
      <div className="container">
        
        {/* Section Card */}
        <div className="about-sarthak-card">
          
          {/* Visual Column / Photo Placeholder */}
          <div className="about-sarthak-visual-col">
            <div className="founder-photo-frame">
              {/* 
                REAL PHOTOGRAPH INSERTION POINT:
                When a real professional photograph of Sarthak is provided, 
                replace this placeholder structure with:
                <img 
                  src="/images/sarthak.jpg" 
                  alt="Sarthak Sarvaiya — Founder & Sourcing Desk, SHIVOM GLOBAL" 
                  className="founder-real-photo"
                />
              */}
              <div className="founder-photo-placeholder" role="img" aria-label="Sarthak Sarvaiya — Photo placeholder">
                <div className="founder-monogram-badge">
                  <User size={48} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <div className="founder-name-tag font-spec">
                  SARTHAK SARVAIYA
                </div>
                <span className="founder-role-tag">
                  Proprietor &bull; Sourcing Desk
                </span>
                <span className="founder-photo-note font-spec">
                  Direct Buyer Contact
                </span>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="about-sarthak-content-col">
            <div className="spec-badge spec-badge-gold" style={{ marginBottom: 'var(--space-2)' }}>
              FOUNDER &amp; DIRECT SOURCING DESK
            </div>

            <h2 id="about-sarthak-title" className="about-sarthak-title">
              About Sarthak
            </h2>

            <p className="about-sarthak-lead">
              SHIVOM GLOBAL is operated by Sarthak, who works directly with buyers to understand their tea requirements, coordinate sourcing and manage the enquiry through the order process.
            </p>

            <p className="about-sarthak-body">
              When you submit a requirement or request samples, you deal directly with Sarthak &mdash; without account executives or communication layers. Sarthak personally coordinates lot identification, sample preparation, pricing review, and export logistics to ensure every shipment matches agreed specifications.
            </p>

            {/* Direct Channel Details Strip */}
            <div className="about-sarthak-details-grid">
              <div className="about-detail-item">
                <ShieldCheck size={16} className="about-detail-icon" aria-hidden="true" />
                <div>
                  <span className="about-detail-label font-spec">ENTITY STATUS</span>
                  <span className="about-detail-val">Registered Indian Enterprise (Udyam MSME)</span>
                </div>
              </div>

              <div className="about-detail-item">
                <MapPin size={16} className="about-detail-icon" aria-hidden="true" />
                <div>
                  <span className="about-detail-label font-spec">OPERATIONAL BASE</span>
                  <span className="about-detail-val">{CONTACT_INFO.address.display}</span>
                </div>
              </div>

              <div className="about-detail-item">
                <Phone size={16} className="about-detail-icon" aria-hidden="true" />
                <div>
                  <span className="about-detail-label font-spec">DIRECT PHONE / WHATSAPP</span>
                  <a href={CONTACT_INFO.whatsapp.getLink()} target="_blank" rel="noopener noreferrer" className="about-detail-link">
                    {CONTACT_INFO.phone.display}
                  </a>
                </div>
              </div>

              <div className="about-detail-item">
                <Mail size={16} className="about-detail-icon" aria-hidden="true" />
                <div>
                  <span className="about-detail-label font-spec">DIRECT EMAIL</span>
                  <a href={CONTACT_INFO.email.mailtoLink} className="about-detail-link">
                    {CONTACT_INFO.email.address}
                  </a>
                </div>
              </div>
            </div>

            {/* Direct Action */}
            <div className="about-sarthak-actions">
              <a 
                href={CONTACT_INFO.whatsapp.getLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
                aria-label="Chat directly with Sarthak on WhatsApp"
              >
                <MessageCircle size={15} style={{ color: '#25D366' }} aria-hidden="true" />
                <span>Chat on WhatsApp</span>
              </a>

              <a 
                href="#requirement-form"
                onClick={handleDirectInquiry}
                className="btn btn-primary btn-sm"
                aria-label="Send your tea requirement to Sarthak"
              >
                <span>Send Tea Requirement</span>
                <ArrowRight size={14} aria-hidden="true" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
