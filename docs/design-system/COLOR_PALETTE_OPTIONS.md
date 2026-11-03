# SHIVOM GLOBAL — Colour Palette Evaluation Framework & Proposed Directions

## 1. Executive Notice & Purpose

> [!IMPORTANT]
> **Status**: Production Standard Deployed (Option B).
> **Current Decision**: **Option B — Modern Obsidian & Champagne Gold** has been approved and deployed as the active production palette on `:root`. **Option A — Highland Estate & Darjeeling Amber** is fully preserved in the token hierarchy via `[data-palette="heritage"]` (`?palette=heritage`), and the original baseline benchmark remains preserved via `[data-palette="baseline"]` (`?palette=baseline`).

The purpose of this framework is to provide a structured, objective methodology for evaluating potential colour updates for the SHIVOM GLOBAL digital platform. 

Any prospective palette must support our core commercial mission: **attracting and converting serious international B2B bulk tea buyers, blenders, supermarket procurement directors, and private-label distributors**.

---

## 2. Evaluation Criteria & Scoring Rubric

Each candidate palette is evaluated against five rigorous criteria on a scale of 1 to 10 (Maximum total score: 50 points):

### Criterion 1: WCAG 2.1 AA/AAA Accessibility & Contrast (Weight: 25%)
* Does the palette achieve a minimum **4.5:1** contrast ratio for body text and **3.0:1** for large text, interactive borders, and icons?
* Does it maintain legible hierarchy across desktop screens and mobile devices in high ambient light?

### Criterion 2: Indian Tea Terroir & Heritage Authenticity (Weight: 20%)
* Does the palette evoke the authentic soil, climate, and leaf of prime Indian growing regions (Assam Brahmaputra valley, Darjeeling misty Himalayan foothills, Nilgiri blue mountains)?
* Does it represent real tea liquor tones (golden tip orthodox, brisk CTC red, emerald green tea)?

### Criterion 3: International B2B Buyer Trust & Authority (Weight: 25%)
* How do overseas procurement teams (Germany, United Kingdom, United States, UAE, Kazakhstan, Japan) perceive the palette?
* Does it convey institutional stability, export certification compliance, and container-load supply capability rather than a small retail boutique?

### Criterion 4: High-Value Private Label & Luxury Alignment (Weight: 15%)
* Does the palette support high-margin private label inquiries by looking premium, bespoke, and refined?
* Can it accommodate gold foil, embossing, and luxury packaging imagery seamlessly?

### Criterion 5: Implementation Feasibility & Token Migration Risk (Weight: 15%)
* How cleanly can the palette map onto the existing 65-25-10 layout architecture?
* Does it require asset updates (such as SVG logos or photography grading) or can it drop into CSS variables with zero component refactoring?

---

## 3. Baseline Production Palette (Current Standard)

*The baseline identity currently serving in production.*

```
Primary Green:    #0D3829  ■ rgb(13, 56, 41)
Deep Forest:      #072218  ■ rgb(7, 34, 24)
Warm Gold:        #C59B27  ■ rgb(197, 155, 39)
Burnt Amber:      #CC5500  ■ rgb(204, 85, 0)
Warm Canvas:      #FBFBFA  ■ rgb(251, 251, 250)
Surface White:    #FFFFFF  ■ rgb(255, 255, 255)
Warm Ivory:       #F5F1E8  ■ rgb(245, 241, 232)
Charcoal Text:    #1A2E26  ■ rgb(26, 46, 38)
```

### Visual Rationale
- **65% Canvas**: Warm off-white `#FBFBFA` provides an organic, non-glare background.
- **25% Identity**: Deep estate green `#0D3829` anchors B2B authority and tea estate heritage.
- **10% Accents**: Warm gold `#C59B27` and amber `#CC5500` direct buyer attention to conversion triggers.

### Evaluation Scores
| Criterion | Score (1-10) | Notes |
|---|---|---|
| 1. Accessibility | 8.5 / 10 | Excellent text contrast on light and dark; gold requires caution on light backgrounds. |
| 2. Terroir Authenticity | 9.0 / 10 | Very strong correlation with Indian tea estates. |
| 3. B2B Buyer Trust | 8.5 / 10 | Professional, grounded, corporate. |
| 4. Luxury Alignment | 8.0 / 10 | Clean and elevated; slightly conservative. |
| 5. Implementation Feasibility | 10.0 / 10 | Current baseline (0 migration cost). |
| **Total Score** | **44.0 / 50** | **Current Benchmark** |

---

## 4. Prospective Direction 1: "Premium Tea Heritage"

*Deep Darjeeling Bronze, Highland Moss, Vintage Amber, Antique Ivory.*

This direction leans deeper into historic tea auction houses, Himalayan mist, brass tea-tasting bowls, and vintage colonial planter heritage.

```
Primary Heritage: #1D3A2F  ■ Highland Moss (rgb(29, 58, 47))
Deep Shadow:      #13241D  ■ Shadow Pine (rgb(19, 36, 29))
Accent Terroir:   #3B2219  ■ Darjeeling Bronze (rgb(59, 34, 25))
Accent Liquor:    #C88A35  ■ Vintage Amber Gold (rgb(200, 138, 53))
Canvas:           #FAF7F2  ■ Antique Ivory (rgb(250, 247, 242))
Surface:          #FFFFFF  ■ Pure White (rgb(255, 255, 255))
Card Substrate:   #F3EEE5  ■ Milled Parchment (rgb(243, 238, 229))
Text:             #1F2421  ■ Deep Ironwood (rgb(31, 36, 33))
```

### Visual Rationale
- Softens the stark deep green by introducing an earthy **Darjeeling Bronze** (`#3B2219`) as an editorial accent.
- Warms the canvas to **Antique Ivory** (`#FAF7F2`), imparting the texture of high-grade artisanal tea packaging paper.
- Accents use **Vintage Amber Gold** (`#C88A35`), mirroring single-estate second-flush Muscatel liquor.

### Evaluation Scores
| Criterion | Score (1-10) | Evaluation Notes |
|---|---|---|
| 1. Accessibility | 9.0 / 10 | High contrast ratios across all body texts and subtle borders. |
| 2. Terroir Authenticity | 10.0 / 10 | Unrivalled authentic feel; deeply resonates with heritage tea connoisseurs. |
| 3. B2B Buyer Trust | 8.0 / 10 | High perceived quality, though slightly more artisanal than industrial bulk. |
| 4. Luxury Alignment | 9.5 / 10 | Exceptional luxury feel for private label and bespoke specialty buyers. |
| 5. Implementation Feasibility | 8.5 / 10 | Direct drop-in to CSS variables; coordinates well with existing tea photos. |
| **Total Score** | **45.0 / 50** | **Strong contender for Specialty & Private Label focus** |

---

## 5. Prospective Direction 2: "Modern Luxury"

*Obsidian Pine, Champagne Gold, Minimalist Pure Ivory, Midnight Slate.*

A sleek, ultra-high-end contemporary luxury aesthetic inspired by five-star hospitality tea lounges and modern bespoke packaging.

```
Primary Slate:    #061811  ■ Obsidian Pine (rgb(6, 24, 17))
Secondary Slate:  #121C18  ■ Midnight Slate (rgb(18, 28, 24))
Accent Gold:      #D4AF37  ■ Metallic Champagne Gold (rgb(212, 175, 55))
Accent Warm:      #E5C158  ■ Pale Gold Foil (rgb(229, 193, 88))
Canvas:           #FDFCFA  ■ Minimalist Pure Ivory (rgb(253, 252, 250))
Surface:          #FFFFFF  ■ High Gloss White (rgb(255, 255, 255))
Card Substrate:   #F7F8F6  ■ Cool Mist (rgb(247, 248, 246))
Text:             #0F1412  ■ Obsidian Black (rgb(15, 20, 18))
```

### Visual Rationale
- Pushes deep green nearly to **Obsidian Black** (`#061811`), creating theatrical contrast.
- Pairs with **Champagne Gold** (`#D4AF37`) for metallic elegance on dark surfaces and sleek hairline borders.
- Crisp, modern typography rendering on ultra-clean ivory canvas.

### Evaluation Scores
| Criterion | Score (1-10) | Evaluation Notes |
|---|---|---|
| 1. Accessibility | 9.0 / 10 | Obsidian on ivory achieves 18.2:1 contrast; champagne gold must be restricted to dark surfaces. |
| 2. Terroir Authenticity | 7.0 / 10 | Leans more luxury-cosmetic than agricultural tea estate. |
| 3. B2B Buyer Trust | 9.0 / 10 | Commands immense executive authority and perceived capital strength. |
| 4. Luxury Alignment | 10.0 / 10 | Maximum luxury perception; excellent for premium private label clients. |
| 5. Implementation Feasibility | 8.0 / 10 | Requires careful tuning of photo brightness to balance dark cards. |
| **Total Score** | **43.0 / 50** | **High-end executive appeal** |

---

## 6. Prospective Direction 3: "Natural Organic"

*Terracotta Clay, Botanical Olive, Unbleached Flax, Chai Amber.*

Emphasizes 100% natural purity, pesticide-free cultivation, sustainable sourcing, biodegradable packaging, and farm-to-cup traceability.

```
Primary Olive:    #2D4A3E  ■ Botanical Olive (rgb(45, 74, 62))
Deep Forest:      #1A3127  ■ Deep Canopy (rgb(26, 49, 39))
Earth Accent:     #A0522D  ■ Terracotta Clay (rgb(160, 82, 45))
Liquor Accent:    #B3541E  ■ Chai Amber (rgb(179, 84, 30))
Canvas:           #F4EFE6  ■ Unbleached Flax (rgb(244, 239, 230))
Surface:          #FAF7F0  ■ Calico White (rgb(250, 247, 240))
Card Substrate:   #ECE5D8  ■ Jute Neutral (rgb(236, 229, 216))
Text:             #212824  ■ Raw Umber Charcoal (rgb(33, 40, 36))
```

### Visual Rationale
- Integrates warm **Terracotta Clay** (`#A0522D`), reflecting the red alluvial soils of Assam tea gardens.
- Replaces high-gloss gold with warm earthy **Chai Amber** (`#B3541E`).
- Uses **Unbleached Flax** (`#F4EFE6`) for a tactile, sustainable feel.

### Evaluation Scores
| Criterion | Score (1-10) | Evaluation Notes |
|---|---|---|
| 1. Accessibility | 8.5 / 10 | Terracotta and chai amber have strong contrast on light canvas. |
| 2. Terroir Authenticity | 9.5 / 10 | Highly authentic natural connection to soil, weather, and harvest. |
| 3. B2B Buyer Trust | 8.0 / 10 | Resonates with European organic buyers; slightly less formal for institutional bulk. |
| 4. Luxury Alignment | 7.5 / 10 | Emphasizes organic purity over aristocratic opulence. |
| 5. Implementation Feasibility | 8.0 / 10 | May require slight adjustment to existing SVG logo gradients. |
| **Total Score** | **41.5 / 50** | **Best for organic/sustainable marketing positioning** |

---

## 7. Prospective Direction 4: "Contemporary B2B Export"

*Maritime Deep Navy, Estate Pine, Precision Brass, Technical Platinum.*

Designed specifically for container logistics, global maritime trade, import documentation reliability, and large-scale commodity supply chains.

```
Primary Navy:     #0B2545  ■ Maritime Deep Navy (rgb(11, 37, 69))
Secondary Green:  #134035  ■ Estate Pine (rgb(19, 64, 53))
Accent Brass:     #B58E38  ■ Precision Brass (rgb(181, 142, 56))
Accent Alert:     #D95D24  ■ Export Amber (rgb(217, 93, 36))
Canvas:           #F5F7F8  ■ Technical Platinum (rgb(245, 247, 248))
Surface:          #FFFFFF  ■ Crisp White (rgb(255, 255, 255))
Card Substrate:   #EBEFF2  ■ Industrial Mist (rgb(235, 239, 242))
Text:             #121E2A  ■ Deep Marine Slate (rgb(18, 30, 42))
```

### Visual Rationale
- Bridges the agricultural origin (Estate Pine) with the international logistics reality (Maritime Deep Navy).
- Communicates CIF/FOB export capability, customs efficiency, and bankable trust.
- Precision Brass accent signals exact quality grading and certified specifications.

### Evaluation Scores
| Criterion | Score (1-10) | Evaluation Notes |
|---|---|---|
| 1. Accessibility | 9.5 / 10 | Navy and slate deliver industry-leading contrast across all viewports. |
| 2. Terroir Authenticity | 7.5 / 10 | Slightly less focused on garden soil; emphasizes maritime transport. |
| 3. B2B Buyer Trust | 10.0 / 10 | Maximum corporate authority for institutional procurement officers. |
| 4. Luxury Alignment | 8.0 / 10 | High-trust corporate feel; less artisanal romance. |
| 5. Implementation Feasibility | 7.5 / 10 | Major shift in header and footer color identity. |
| **Total Score** | **42.5 / 50** | **Best for global shipping & high-volume container trade** |

---

## 8. Prospective Direction 5: "Minimal Corporate"

*Architectural Charcoal, Crisp Forest Emerald, Warm Off-White, Burnished Copper.*

An architectural, editorial approach that allows full-bleed tea photography and grade data to lead, using minimal, disciplined typography.

```
Primary Charcoal: #1A1D20  ■ Architectural Charcoal (rgb(26, 29, 32))
Secondary Green:  #0D4A38  ■ Forest Emerald (rgb(13, 74, 56))
Accent Copper:    #B86B35  ■ Burnished Copper (rgb(184, 107, 53))
Canvas:           #F8F8F6  ■ Pure Linen (rgb(248, 248, 246))
Surface:          #FFFFFF  ■ Architectural White (rgb(255, 255, 255))
Card Substrate:   #F0F1EE  ■ Soft Ash (rgb(240, 241, 238))
Text:             #15181A  ■ Onyx Text (rgb(21, 24, 26))
```

### Visual Rationale
- Utilizes cool architectural neutrals to create an editorial gallery feel.
- Forest Emerald is deployed sparingly as a strategic accent rather than a heavy background block.
- Burnished Copper provides an unexpected, modern industrial liquor tone.

### Evaluation Scores
| Criterion | Score (1-10) | Evaluation Notes |
|---|---|---|
| 1. Accessibility | 9.5 / 10 | Clean, uncluttered, highly legible. |
| 2. Terroir Authenticity | 7.5 / 10 | Editorial and clean, slightly removed from raw agricultural warmth. |
| 3. B2B Buyer Trust | 9.0 / 10 | Sleek and credible. |
| 4. Luxury Alignment | 8.5 / 10 | Modern gallery aesthetic. |
| 5. Implementation Feasibility | 8.5 / 10 | Straightforward token replacement. |
| **Total Score** | **43.0 / 50** | **Sleek modern editorial approach** |

---

## 9. Comparative Summary & Next Steps

| Palette Direction | Primary Tone | Accent Tone | Canvas | Total / 50 | Best Suited For |
|---|---|---|---|---|---|
| **Baseline (Current)** | Deep Estate Green (`#0D3829`) | Warm Gold (`#C59B27`) | Warm Off-White (`#FBFBFA`) | **44.0** | Established B2B export baseline |
| **1. Premium Tea Heritage** | Highland Moss (`#1D3A2F`) | Vintage Amber (`#C88A35`) | Antique Ivory (`#FAF7F2`) | **45.0** | Artisanal estates, Darjeeling, private label |
| **2. Modern Luxury** | Obsidian Pine (`#061811`) | Champagne Gold (`#D4AF37`) | Pure Ivory (`#FDFCFA`) | **43.0** | High-end hospitality, luxury packaging |
| **3. Natural Organic** | Botanical Olive (`#2D4A3E`) | Terracotta (`#A0522D`) | Unbleached Flax (`#F4EFE6`) | **41.5** | Sustainable, certified organic positioning |
| **4. B2B Export Logistics** | Maritime Navy (`#0B2545`) | Precision Brass (`#B58E38`) | Technical Platinum (`#F5F7F8`) | **42.5** | High-volume container logistics |
| **5. Minimal Corporate** | Arch Charcoal (`#1A1D20`) | Burnished Copper (`#B86B35`)| Pure Linen (`#F8F8F6`) | **43.0** | Modern corporate trading house |

### Recommended Staging Plan for Stakeholder Testing

1. **Keep Baseline in Production**: Retain the baseline palette across all active client-facing routes.
2. **Pre-requisite Refactoring**: Complete the token centralisation refactor (eliminating the 84 hardcoded hex colors and 110 raw rgba instances) so the site can switch palettes instantaneously via CSS variables.
3. **Staging Preview Sandbox**: Configure a hidden `/preview/theme?palette=heritage` query parameter or CSS theme switch class on `<body>` (e.g. `<body data-palette="heritage">`) allowing stakeholders to view live side-by-side previews of **Option 1 (Heritage)** and **Option 2 (Modern Luxury)** before any final decision is made.

