# SHIVOM GLOBAL — Browser QA Rules

## Browser
Use Chrome DevTools MCP for browser inspection.

## Before Changes
1. Inspect the current page.
2. Capture screenshots.
3. Check console errors.
4. Check failed network requests.

## After Every UI Change
1. Reopen the affected page.
2. Inspect the modified component.
3. Test all affected interactions.
4. Verify desktop, tablet and mobile.
5. Check accessibility and reduced motion.
6. Compare screenshots.

## Forms
Test:
- Quick Enquiry
- Samples
- Detailed Tea Requirement
- Grade preselection
- Required field validation
- Invalid email and phone inputs
- Error and success states

Never submit real buyer enquiries without explicit authorization.

## Reporting
Return:
- PASS
- FAIL
- NOT TESTED

Include evidence and screenshots.
Do not claim tests passed without executing them.
