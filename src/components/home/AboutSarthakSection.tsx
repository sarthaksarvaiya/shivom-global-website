import React from 'react';
import { User } from 'lucide-react';

export const AboutSarthakSection: React.FC = () => {
  return (
    <section 
      id="about-sarthak" 
      className="about-sarthak-section" 
      aria-labelledby="about-sarthak-title"
    >
      <div className="container">
        
        {/* Simple Trust Card: Photo | About Sarthak | Short Description */}
        <div className="about-sarthak-card">
          
          {/* Visual Column / Photo Placeholder */}
          <div className="about-sarthak-visual-col">
            <div className="founder-photo-frame">
              {/* 
                REAL PHOTOGRAPH INSERTION POINT:
                When a real professional photograph of Sarthak is provided, 
                replace this placeholder with:
                <img 
                  src="/images/sarthak.jpg" 
                  alt="Sarthak — SHIVOM GLOBAL" 
                  className="founder-real-photo"
                />
              */}
              <div className="founder-photo-placeholder" role="img" aria-label="Sarthak — Photo placeholder">
                <div className="founder-monogram-badge">
                  <User size={44} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <div className="founder-name-tag font-spec">
                  SARTHAK
                </div>
                <span className="founder-photo-note font-spec">
                  SHIVOM GLOBAL
                </span>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="about-sarthak-content-col">
            <h2 id="about-sarthak-title" className="about-sarthak-title">
              About Sarthak
            </h2>

            <p className="about-sarthak-lead">
              SHIVOM GLOBAL is operated directly by Sarthak, who works with buyers to understand their tea requirements, coordinate sourcing and manage the order process.
            </p>

            <p className="about-sarthak-body">
              From sample requests to order coordination, buyers have a direct point of contact throughout the process.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
