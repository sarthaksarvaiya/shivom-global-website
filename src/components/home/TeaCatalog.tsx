import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';

export interface TeaCatalogProps {
  onSelectCategory?: (categoryName: string) => void;
}

export const TeaCatalog: React.FC<TeaCatalogProps> = ({ onSelectCategory }) => {
  const teaCategories = [
    {
      id: 'assam-ctc',
      name: 'Assam CTC Black Tea',
      origin: 'Brahmaputra Valley, Assam',
      classification: 'Crush, Tear, Curl (CTC)',
      cupColor: '#963E14',
      badgeText: 'Primary Export Focus',
      description: 'Manufactured through mechanical shearing and curling to produce dense, granular particles that extract rapidly. Renowned worldwide for bold liquor, malty richness, and brisk strength that holds up perfectly to milk and spices.',
      parameters: [
        { label: 'Liquor Color', value: 'Deep Amber to Bright Red' },
        { label: 'Cup Profile', value: 'Full-bodied, malty, sharp briskness' },
        { label: 'Milk Reactivity', value: 'Exceptional (Ideal for Karak & Samovar)' },
        { label: 'Primary Cuts', value: 'BOP, BOPSM, BP, PF, PD, Dust' },
      ],
      applications: 'Commercial blenders, supermarket packaging, milk tea brands, quick-brew tea bags',
    },
    {
      id: 'orthodox-tea',
      name: 'Orthodox Black Tea',
      origin: 'Assam & North Indian Estates',
      classification: 'Whole Leaf & Broken Orthodox',
      cupColor: '#D97706',
      badgeText: 'Traditional Craft',
      description: 'Produced using traditional roller tables that preserve whole leaf geometry, unbroken leaf tips, and delicate essential oils. Delivers a bright, nuanced cup with distinct floral notes and a clean, refreshing astringency.',
      parameters: [
        { label: 'Liquor Color', value: 'Golden-Amber with Bright Ring' },
        { label: 'Cup Profile', value: 'Aromatic, crisp floral & sweet-wood notes' },
        { label: 'Milk Reactivity', value: 'Best enjoyed black or with light milk' },
        { label: 'Primary Cuts', value: 'TGFOP, FBOP, BOP, BOPF' },
      ],
      applications: 'Premium specialty retail, luxury loose-leaf tins, traditional English/Irish blends',
    },
    {
      id: 'darjeeling-tea',
      name: 'Darjeeling Tea (GI Certified)',
      origin: 'Himalayan Foothills, West Bengal',
      classification: 'Geographical Indication (GI)',
      cupColor: '#CA8A04',
      badgeText: 'Specialty Reserve',
      description: 'Grown at high altitudes between 600m and 2,000m. World-famous for its rare muscatel flavor profile, delicate floral aroma, and light golden liquor resulting from cool mountain air and intense diurnal temperature shifts.',
      parameters: [
        { label: 'Liquor Color', value: 'Delicate Pale Amber to Golden Yellow' },
        { label: 'Cup Profile', value: 'Muscatel grape, floral bouquet, light briskness' },
        { label: 'Milk Reactivity', value: 'Consumed strictly without milk' },
        { label: 'Primary Cuts', value: 'FTGFOP1, SFTGFOP1, GFBOP' },
      ],
      applications: 'High-end specialty tea boutiques, luxury gourmet gift boxes, single-estate collections',
    },
    {
      id: 'green-tea',
      name: 'Indian Green Tea',
      origin: 'High-Elevation Mountain Terroirs',
      classification: 'Non-Fermented / Steamed & Panned',
      cupColor: '#16A34A',
      badgeText: 'Wellness & Blending',
      description: 'Carefully steamed or pan-fired immediately after plucking to halt oxidation, preserving natural polyphenols, chlorophyll, and catechins. Produces a refreshing, vegetal cup with a clean, grassy finish and gentle sweetness.',
      parameters: [
        { label: 'Liquor Color', value: 'Clear Pale Green to Light Jade' },
        { label: 'Cup Profile', value: 'Fresh, vegetal, grassy sweetness' },
        { label: 'Milk Reactivity', value: 'Zero milk affinity' },
        { label: 'Primary Cuts', value: 'Whole Leaf Green, Broken Green, Fannings' },
      ],
      applications: 'Functional wellness tea lines, flavored herbal blends, transparent pyramid tea bags',
    },
  ];

  const handleCategoryAction = (catName: string) => {
    if (onSelectCategory) {
      onSelectCategory(catName);
    }

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
  };

  return (
    <section id="our-teas" className="section" style={{ backgroundColor: 'var(--bg-page)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto var(--space-12)' }}>
          <span className="spec-badge spec-badge-gold" style={{ marginBottom: 'var(--space-3)' }}>
            AUTHENTIC INDIAN TERROIRS
          </span>
          <h2 style={{ marginBottom: 'var(--space-4)' }}>
            Our Tea Categories & Origins
          </h2>
          <p className="lead">
            Sourced directly from verified garden ecosystems across Assam and North India. 
            Every lot is evaluated for organoleptic liquor character and destination laboratory compliance.
          </p>
        </div>

        {/* 2x2 Category Grid */}
        <div className="grid grid-cols-2" style={{ gap: 'var(--space-8)' }}>
          {teaCategories.map((tea) => (
            <div 
              key={tea.id} 
              className="card tea-catalog-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                {/* Header Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-3)' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.8125rem', marginBottom: '4px' }}>
                      <MapPin size={14} color="var(--color-primary-green)" style={{ flexShrink: 0 }} />
                      <span>{tea.origin}</span>
                    </div>
                    <h3 style={{ fontSize: '1.375rem', color: 'var(--text-main)', margin: 0 }}>
                      {tea.name}
                    </h3>
                  </div>
                  <span className="spec-badge" style={{ backgroundColor: 'rgba(13, 56, 41, 0.06)' }}>
                    {tea.badgeText}
                  </span>
                </div>

                {/* Narrative Description */}
                <p style={{ fontSize: '0.9375rem', lineHeight: 'var(--leading-relaxed)', margin: 'var(--space-4) 0' }}>
                  {tea.description}
                </p>

                {/* Technical Parameters Table */}
                <div style={{ 
                  backgroundColor: 'var(--bg-surface-subtle)', 
                  borderRadius: 'var(--radius-sm)', 
                  padding: 'var(--space-4)',
                  margin: 'var(--space-4) 0',
                  border: '1px solid var(--border-subtle)'
                }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-2)' }}>
                    Sensory & Liquor Dynamics
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                    {tea.parameters.map((param) => (
                      <div key={param.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '4px', fontSize: '0.8125rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>{param.label}:</span>
                        <span style={{ fontWeight: 600, color: 'var(--color-primary-green)' }} className="font-spec">
                          {param.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Commercial Applications */}
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: 'var(--space-6)' }}>
                  <strong>Commercial Applications:</strong> {tea.applications}
                </div>
              </div>

              {/* Action Button */}
              <div style={{ paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border-subtle)' }}>
                <button 
                  onClick={() => handleCategoryAction(tea.name)}
                  className="btn btn-secondary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span>Request Specifications & Samples</span>
                    <ArrowRight size={16} style={{ flexShrink: 0 }} />
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
