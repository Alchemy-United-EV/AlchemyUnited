# Social Proof Component Documentation

## Component Path
`client/src/components/SocialProof.tsx`

## Props Interface
```typescript
interface SocialProofProps {
  showLogos?: boolean; // Optional, defaults to true
}
```

## Features

### 1. Testimonial Cards
- **Count**: 4 placeholder testimonials
- **Layout**: Responsive grid (mobile: 1 col, tablet: 2 cols, desktop: 4 cols)
- **Content**: Name, location, role, 5-star rating, testimonial text
- **Styling**: White cards with hover effects, yellow accent colors

### 2. Logo Bar
- **Count**: 6 placeholder partner logos (Mercedes-Benz, Tesla, BMW, Audi, Lucid, Rivian)
- **Layout**: Horizontal flex layout with responsive spacing
- **Styling**: Gray boxes with text placeholders, hover effects
- **Optional**: Can be hidden via `showLogos={false}` prop

### 3. Accessibility Features
- Semantic HTML with `<section>`, `<header>`, `<blockquote>`, `<cite>`, `<footer>`
- Screen reader support for star ratings with `sr-only` text
- ARIA labels and proper heading hierarchy
- Alt text ready for when logos are replaced with images

### 4. Mobile Optimization
- Fully responsive grid system
- Touch-friendly card sizing
- Proper text scaling across devices
- Horizontal scroll prevention

## Integration

### Toggle Control
Located in `client/src/pages/home/Home.tsx`:
```javascript
const showSocialProof = false; // Change to true to enable
```

### Position
Renders between Features and CTA sections when enabled.

## Styling
- Matches site brand colors (black, gold/yellow-400, white, gray)
- Consistent with existing component patterns
- No layout shift when toggled on/off
- Hover animations and transitions

## Ready for Production
- All testimonials use realistic but placeholder content
- Logo placeholders ready for real brand assets
- No hardcoded data that would break with real content
- Fully styled and responsive without additional development needed

## Quick Population Guide
1. Replace testimonial objects in `testimonials` array
2. Replace logo objects in `partnerLogos` array with real image sources
3. Update partner names for proper alt text and titles
4. Set `showSocialProof = true` in Home.tsx