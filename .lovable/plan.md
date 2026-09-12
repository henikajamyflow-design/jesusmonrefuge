# Donation amount card carousel

## Goal
Add an animated, swipeable card carousel to the donation page so each suggested amount is presented as a clear, visual impact choice.

## What will change
- Create the reusable carousel in the existing `src/components/ui` library, adapted to the site's design and accessibility standards.
- Use the existing local orphanage photos instead of unrelated remote stock images.
- Add four bilingual cards for €15, €30, €60, and €120, each explaining the concrete impact of that gift.
- Place the carousel inside the first donation step, above the custom amount field.
- Make clicking or swiping a card update the existing selected amount; keep the current one-time/monthly options, custom amount, message, review, and PayPal flow unchanged.
- Clearly mark the active card and provide previous/next controls for keyboard and touch users.

## Technical details
- Use the already installed Framer Motion package (`framer-motion`) rather than adding the duplicate `motion` package.
- Reuse the existing shadcn `Badge` and `Button` components.
- Add no backend or payment changes.
- Verify desktop and mobile layouts, card interaction, donation progression, and current diagnostics.
