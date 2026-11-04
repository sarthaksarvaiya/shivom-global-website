# SEC03-01 Accessibility Report: Tea Categories Section

**Task ID**: SEC03-01  
**Section**: `sec-03` — Tea Categories & Sourcing Portfolio (`#our-teas`)  
**Date**: 2026-11-03  
**Status**: COMPLETE / VERIFIED  

---

## 1. Initial Findings

Prior to this task, an accessibility audit of `TeaCategoriesSection.tsx` and `src/styles/index.css` revealed the following gaps:

1. **Category Navigation Tabs**:
   - The category selector container had `role="tablist"` and tabs had `role="tab"`, but all tabs had default native button `tabIndex={0}`. Pressing `Tab` walked sequentially through all tabs instead of using the WAI-ARIA roving tabindex pattern.
   - Horizontal arrow key navigation (`ArrowRight`, `ArrowLeft`), `Home`, and `End` keys were not handled.
   - Missing focus management between tabs upon keyboard activation.

2. **Grade Selection Badges**:
   - The grade pills container used generic `role="group"`.
   - Each grade badge used `aria-pressed={isSelected}`, which treats choices as independent toggle switches rather than mutually exclusive options within the selected tea category.
   - Arrow keys (`ArrowLeft`, `ArrowRight`, `ArrowUp`, `ArrowDown`), `Home`, and `End` were not supported.
   - Roving tabindex was missing; all badges remained in the default sequential Tab order.

3. **Focus Indicators**:
   - Neither `.tea-category-tab` nor `.tea-grade-badge-interactive` had explicit `:focus-visible` styling in `src/styles/index.css`, making keyboard focus difficult to perceive against varied backgrounds.

---

## 2. Files Modified

| File | Nature of Changes |
|---|---|
| [`src/features/tea-catalog/components/TeaCategoriesSection.tsx`](file:///Users/sarthak/SHIVOM%20GLOBAL%20WEBSITE/src/features/tea-catalog/components/TeaCategoriesSection.tsx) | Implemented WAI-ARIA APG Tabs pattern (roving tabindex, arrow navigation, Home/End, focus synchronization) and Radio Group pattern for mutually exclusive grade selection. |
| [`src/styles/index.css`](file:///Users/sarthak/SHIVOM%20GLOBAL%20WEBSITE/src/styles/index.css) | Added `.tea-category-tab:focus-visible` and `.tea-grade-badge-interactive:focus-visible` indicators using token `--color-accent-gold` with 2px offset. |
| [`docs/website-sections/03_TEA_CATEGORIES.md`](file:///Users/sarthak/SHIVOM%20GLOBAL%20WEBSITE/docs/website-sections/03_TEA_CATEGORIES.md) | Documented semantic roles, keyboard interaction matrix, resolved backlog item `SEC03-01`, and logged change history. |

---

## 3. Implementation Details

### A. Category Navigation Tabs (`role="tablist"`)
- Roving tabindex: The active category tab receives `tabIndex={0}`, while all inactive tabs receive `tabIndex={-1}`.
- Ref management: `categoryTabRefs` tracks tab button DOM elements.
- Automatic activation: Arrow navigation instantly synchronizes `activeCategoryIndex`, updates `selectedGradeCode` to the new category's default grade, and shifts focus directly to the activated tab.
- Wraparound: Navigating past the last tab (`ArrowRight`) wraps to index 0, and navigating before the first tab (`ArrowLeft`) wraps to the last tab.

### B. Grade Selection Radios (`role="radiogroup"`)
- Correct semantics: Since a buyer can select only one grade at a time per category, the container was assigned `role="radiogroup"` with `aria-labelledby="tea-grades-heading"`.
- Each option was changed from a toggle button to `role="radio"` with `aria-checked={isSelected}`.
- Roving tabindex: Only the checked grade radio has `tabIndex={0}`; unselected options have `tabIndex={-1}`.
- Multidirectional arrows: Supports `ArrowRight` and `ArrowDown` to advance to the next grade, and `ArrowLeft` and `ArrowUp` to return to the previous grade, wrapping around bounds.
- Ref management: `gradeBadgeRefs` tracks grade button DOM elements to synchronize keyboard focus on arrow navigation.

### C. Visual Focus Indicators
- Defined `:focus-visible` states using existing design tokens:
  ```css
  .tea-category-tab:focus-visible {
    outline: 2px solid var(--color-accent-gold);
    outline-offset: 2px;
  }

  .tea-grade-badge-interactive:focus-visible {
    outline: 2px solid var(--color-accent-gold);
    outline-offset: 2px;
  }
  ```
- Complies with WCAG 2.4.7 (Focus Visible) and 2.4.11 (Focus Appearance).
- Preserved under `@media (prefers-reduced-motion: reduce)`.

---

## 4. Keyboard Interaction Matrix

| Target Element | Key | Action | Focus / State Effect |
|---|---|---|---|
| **Category Tab** | `Tab` | Enter / Exit `tablist` | Enters on active tab (`tabIndex={0}`); leaves tablist on next Tab |
| **Category Tab** | `ArrowRight` | Next category | Focuses & activates next category tab (wraps to first) |
| **Category Tab** | `ArrowLeft` | Previous category | Focuses & activates previous category tab (wraps to last) |
| **Category Tab** | `Home` | First category | Focuses & activates first category tab (Assam CTC) |
| **Category Tab** | `End` | Last category | Focuses & activates last category tab (Green & Specialty) |
| **Grade Radio** | `Tab` | Enter / Exit `radiogroup` | Enters on currently checked grade radio (`tabIndex={0}`) |
| **Grade Radio** | `ArrowRight` / `ArrowDown` | Next grade | Focuses & checks next grade option (wraps to first) |
| **Grade Radio** | `ArrowLeft` / `ArrowUp` | Previous grade | Focuses & checks previous grade option (wraps to last) |
| **Grade Radio** | `Home` | First grade | Focuses & checks first grade option |
| **Grade Radio** | `End` | Last grade | Focuses & checks last grade option |
| **Grade Radio** | `Space` / `Enter` | Select grade | Selects the focused grade radio |

---

## 5. Accessibility Decisions

1. **Automatic vs Manual Tab Activation**:
   Automatic tab activation on arrow key navigation was selected because category data is held in-memory, changes render instantly with zero asynchronous delays or destructive state loss, and this matches standard WAI-ARIA APG guidance for content preview tabs.

2. **Radio Group vs Tablist for Grade Selection**:
   The interactive grade pills were previously using `aria-pressed` inside a generic group. Because tea grades are mutually exclusive options within the active tea variety (and do not correspond to separate full-page tab panels), standard WAI-ARIA APG `role="radiogroup"` and `role="radio"` with `aria-checked` was chosen. This accurately conveys to screen readers that selecting a grade is choosing a value within a single setting, rather than switching overall views.

3. **Roving Tabindex**:
   Both the category tabs and grade radio options implement the roving tabindex pattern. This prevents keyboard fatigue by reducing Tab stops from up to 10 stops down to exactly 2 stops (one for category tablist, one for grade radiogroup), while allowing full arrow key exploration.

---

## 6. Tests Executed & Actual Results

### Automated Test Suite Execution (`verify_sec03_accessibility.tsx`)
A 36-point verification suite was executed against the compiled component and styles.

```
--- STARTING SEC03-01 ACCESSIBILITY VERIFICATION SUITE ---
[PASS] Category container has role="tablist"
[PASS] Category tablist has accessible aria-label
[PASS] Exactly 4 tabs have role="tab"
[PASS] Active tab (Assam CTC) has aria-selected="true"
[PASS] Active tab has tabIndex=0 (in tab sequence)
[PASS] Active tab links to tea-panel-assam-ctc via aria-controls
[PASS] Inactive tabs have tabIndex=-1 (roving tabindex)
[PASS] Console screen has role="tabpanel"
[PASS] Tabpanel has matching id
[PASS] Tabpanel has aria-labelledby pointing to active tab
[PASS] Grade selection container has role="radiogroup"
[PASS] Grade radiogroup has aria-labelledby="tea-grades-heading"
[PASS] Header label has id="tea-grades-heading"
[PASS] Default category (Assam CTC) has 6 grade radios (found: 6)
[PASS] Selected grade (BOP) has aria-checked="true"
[PASS] Unselected grades have aria-checked="false"
[PASS] aria-pressed correctly removed in favor of aria-checked for radios
[PASS] ArrowRight from index 0 moves to index 1 (Assam Orthodox)
[PASS] ArrowRight from index 1 moves to index 2 (Darjeeling)
[PASS] ArrowRight wraps from index 3 back to index 0
[PASS] ArrowLeft wraps from index 0 back to index 3
[PASS] Home key returns to index 0
[PASS] End key moves to last category (index 3)
[PASS] Grade ArrowRight moves from BOP (0) to BOPSM (1)
[PASS] Grade ArrowDown moves from BOP (0) to BOPSM (1)
[PASS] Grade ArrowRight wraps from Dust / D1 (5) to BOP (0)
[PASS] Grade ArrowLeft wraps from BOP (0) to Dust / D1 (5)
[PASS] Grade ArrowUp wraps from BOP (0) to Dust / D1 (5)
[PASS] Grade Home key moves to first grade
[PASS] Grade End key moves to last grade
[PASS] CSS contains .tea-category-tab:focus-visible
[PASS] CSS contains .tea-grade-badge-interactive:focus-visible
[PASS] Focus indicators use high-contrast gold outline token
[PASS] Focus indicators use 2px outline-offset for unclipped visibility
[PASS] prefers-reduced-motion block exists
[PASS] Both interactive controls are handled under reduced motion
--- TEST RESULTS: 36 PASSED, 0 FAILED ---
```

### Static Type-Checking & Production Build
- Command: `npm run build` (`tsc && vite build`)
- Result: **PASS** (Zero TypeScript diagnostics, Vite bundled production build in 1.49s).

### Functional & Interaction Checks
- **Sample Request CTA (`onSelectCategory`)**: **PASS** — Correct category name and selected grade code forwarded to `#requirement-form`.
- **WhatsApp Inquiry Link**: **PASS** — Custom message string dynamically includes active category and selected grade.
- **Scroll cues**: **PASS** — Smooth scroll to `#tea-catalog-console` and `#tea-by-grade` preserved.
- **Mouse Clicks**: **PASS** — Tab clicking and grade badge clicking remain fully responsive.

---

## 7. Remaining Issues

None for `SEC03-01`.

The section is fully keyboard navigable, APG compliant, and verified against regressions. Future non-blocking backlog tasks (`SEC03-02`: WebP image conversion, `SEC03-03`: Callout min-height layout stability) remain open in `docs/website-sections/03_TEA_CATEGORIES.md` as scheduled.

