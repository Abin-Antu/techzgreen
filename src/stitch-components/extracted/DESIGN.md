# Design System Document

## 1. Overview & Creative North Star: "The Digital Arboretum"

This design system moves away from the sterile, "boxy" nature of traditional SaaS platforms to embrace **The Digital Arboretum**. Our North Star is a fusion of high-end editorial layouts and organic tech. We reject the rigid, grid-locked structures of the past in favor of **Intentional Asymmetry** and **Tonal Depth**.

The goal is to make TechzGreen feel like a premium publication for the future of the planet. We achieve this through:
*   **Breathing Room:** Utilizing aggressive whitespace to signal luxury and focus.
*   **Editorial Scaling:** Dramatic contrast between massive display type and functional utility text.
*   **Organic Layering:** Eschewing lines and borders for soft, nested tonal shifts that mimic the layers of a forest canopy.

---

## 2. Colors & Surface Philosophy

Our palette is rooted in the Forest Green (`#2E7D32`), but its application must be sophisticated. We do not use "flat" blocks of color; we use environmental depth.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to define sections. Layout boundaries must be established solely through background color shifts. 
*   Transition from `surface` to `surface-container-low` to signal a new content block.
*   Use `surface-container-highest` only for the most critical utility elements (e.g., sticky navigations).

### Surface Hierarchy & Nesting
Treat the UI as physical layers of "Fine Paper."
*   **Base:** `surface` (#f7fbf0)
*   **Sectioning:** `surface-container-low` (#f1f5eb)
*   **Interactive Containers:** `surface-container-lowest` (#ffffff) sitting on top of `surface-container` tiers to create a "lifted" feel without heavy shadows.

### The "Glass & Gradient" Rule
To elevate the tech aspect of the brand:
*   **Glassmorphism:** Use `surface_variant` at 60% opacity with a `20px` backdrop-blur for floating headers or modal overlays.
*   **Signature Gradients:** For primary CTAs and Hero accents, use a linear gradient from `primary` (#0d631b) to `primary_container` (#2e7d32) at a 135-degree angle. This adds "soul" and prevents the green from feeling muddy or dated.

---

## 3. Typography: The Editorial Voice

We pair **Manrope** (Display/Headline) with **Inter** (Body/UI) to balance authoritative editorial style with high-performance legibility.

*   **The Power Scale:** Use `display-lg` (3.5rem) for hero statements, ensuring a tight `line-height` (approx 1.1) to create a "block" of text that feels like a physical object.
*   **Contextual Hierarchy:** 
    *   **Manrope (Display/Headline):** Used for storytelling, brand promises, and large-scale impact.
    *   **Inter (Title/Body/Label):** Used for technical data, form fields, and long-form reading. 
*   **Intentional Contrast:** Always pair a `display-sm` headline with `body-md` secondary text to create a clear visual anchor. Avoid using "middle-weight" sizes (like `headline-sm`) in close proximity to `title-lg`.

---

## 4. Elevation & Depth

We avoid the "Material 1.0" look of heavy drop shadows. Depth is achieved through **Tonal Layering**.

*   **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` background. This creates a natural, soft "paper-on-table" lift.
*   **Ambient Shadows:** If a floating element (like a dropdown) requires a shadow, use: `box-shadow: 0 12px 32px rgba(24, 29, 23, 0.06);`. Note the use of the `on-surface` color (#181d17) as the shadow tint rather than pure black.
*   **The "Ghost Border" Fallback:** If a container requires definition against a similar background, use `outline-variant` at **15% opacity**. Never use a 100% opaque border.

---

## 5. Components

### Buttons
*   **Primary:** Gradient (Primary to Primary-Container), `round-full`, white text. No shadow.
*   **Secondary:** `surface-container-high` background with `on-secondary-container` text.
*   **Tertiary:** Ghost style; `on-surface` text with an underline that appears only on hover.
*   **Sizing:** Use `spacing-5` for horizontal padding to ensure a wide, premium footprint.

### Cards & Lists
*   **Rule:** **Zero Dividers.** Separate list items using `spacing-4` vertical gaps or alternating background tints between `surface` and `surface-container-low`.
*   **Cards:** Use `rounded-xl` (1.5rem) for a friendly, modern touch. Ensure internal padding is generous (`spacing-8`).

### Input Fields
*   **Style:** Minimalist. `surface-container-low` background, `rounded-md` (0.75rem). 
*   **States:** On focus, transition the background to `surface-container-lowest` and add a 1px "Ghost Border" using `primary` at 40% opacity.

### Featured Component: "The Impact Metric"
For a sustainability startup, use a custom component featuring `display-md` numbers in `primary` color, nested inside a `surface-container-high` bubble with `rounded-xl`.

---

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical margins. For example, a hero image might have `spacing-20` on the left but bleed off the right edge of the screen.
*   **Do** use `tertiary` (#923357) sparingly for high-attention alerts or unique "Sustainability Badges" to provide a sophisticated color counterpoint to the green.
*   **Do** utilize `rounded-full` for chips and badges to lean into the "friendly" brand pillar.

### Don't
*   **Don't** use black (#000000). Use `on-surface` (#181d17) for all text to maintain the organic, high-end feel.
*   **Don't** use 1px dividers to separate sections. If the layout feels "lost," increase the spacing scale between elements instead.
*   **Don't** use standard "Success Green." Stick strictly to the `primary` Forest Green tokens to maintain brand authority.