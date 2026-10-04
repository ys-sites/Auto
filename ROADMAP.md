# AK Flips — Website Roadmap

*Research synthesis, October 2026. Tailored to: a small Montreal car flipper,
5-car inventory, no backend (FormSubmit for leads), Instagram as a key channel,
bilingual EN/FR audience.*

Sources consulted: Top Branding Altimeter (dealership design that converts),
FyreSite (dealership UX & SEO must-haves), Space Auto (Carvana digital lessons),
Unicorn Platform (2026 dealer strategy), DealerEProcess (SRP/VDP optimization),
WardsAuto (inventory photo conversion), WebTonic (2026 automotive local-SEO stats),
SEO Discovery / Wooflo (automotive SEO guides), Splitbase + ScreenRoot (mobile CRO).

---

## MUST-HAVE (do these first — they directly move sales)

1. **Mobile-first hero that converts** — DONE (Oct 2026): rebuilt mobile-first
   with `VideoBackground` (video-ready, image fallback for now), stacked
   full-width CTAs, trust chips, EN/FR.
2. **Real photography per car (8–12+ photos minimum).** Research consensus:
   dealers should show 25+ photos per used car; the two shots buyers want
   first are the **3/4 front view and the cockpit**. Order photos by buyer
   interest, not photographer convenience. The car in the lead photo should
   point *toward* the page's CTA. Current stock photos are placeholders —
   swap for real photos of each car ASAP, including close-ups of any flaws
   (disclosing flaws builds flipper trust).
3. **VDP call-to-action cluster, repeated 3×.** Every car detail page should
   offer Call / Message-DM / Book-a-viewing near the top, again after the
   specs, and again after trust content — buyers act at different moments.
   Add a **sticky mobile CTA bar** on car pages (thumb-reachable).
4. **"What we fixed" reconditioning notes per car.** The #1 trust lever for a
   flipper: a short, specific list of inspection + recondition work done
   (brakes, tires, fluids, detail…). Buyers pay a premium for the flip story.
5. **Availability badges + keep sold cars visible.** Badges ("Available now",
   "Just flipped") speed up scanning; keep sold cars listed marked SOLD —
   social proof, urgency, and the pages keep their SEO value instead of 404ing.
6. **Google Business Profile: claim + fully optimize.** 70% of local-search
   clicks go to the map pack. Add categories, hours, real photos, services,
   and post updates. Then run a **review engine**: ask every buyer for a
   Google review and reply to all of them — review *recency* beats volume
   (74% of buyers only trust reviews from the last 90 days).
7. **On-site testimonials.** Real names + cars bought, near CTAs. Contextual
   proof next to the buy button converts better than a buried reviews page.
8. **Speed.** 92% of dealer sites fail Google's mobile speed test; a 1-second
   mobile delay cuts conversions ~20%. Serve WebP, lazy-load below-the-fold
   images, keep the JS bundle lean (already trimmed ~47 KB by dropping the
   WebGL hero).
9. **Re-enable the client's FormSubmit inbox** after test mode: uncomment the
   `Abdullahkhawaja2004@gmail.com` line in `FORM_ENDPOINTS` (src/App.tsx).
   Both inboxes must click FormSubmit's activation email or leads silently fail.
10. **"Recently sold" strip on the homepage.** Proof of turnover feeds the
    flipper narrative ("avg. 9 days listed") and keeps content fresh.

## NICE-TO-HAVE (high value, do when bandwidth allows)

11. **Video walkaround per car** (phone-shot, 60–90s, YouTube embed). The
    research is blunt: video is a conversion tool, not a luxury. Gives ~90%
    of a 360° spin's trust for ~10% of the effort, plus YouTube SEO.
12. **Monthly-payment estimator** — REMOVED 2026-10-04 per client direction: no financing, no interest, no monthly/annual payments anywhere. VDP now shows one straightforward price + a "no financing, no interest, no hidden fees" note instead.
13. **"Reserve this car" CTA** — hold the car with a refundable deposit,
    routed into the existing lead-modal flow.
14. **FAQ block + FAQ schema.** "Do you offer financing?", "Can I see the
    Carfax?", "Where do I view the car?", "Is there a warranty?" — answers
    buyer questions and wins AI-search citations.
15. **Instagram feed section on the homepage.** Instagram is the #1 channel;
    closing the loop (site → profile → DM) compounds social proof.
16. **Price-drop / new-arrival alerts** via a tiny FormSubmit form ("notify me
    when a car under $X arrives").
17. **Custom domain + hreflang polish** (EN/FR) when leaving vercel.app.

## LATER (when volume justifies it)

18. **Blog / buying guides** ("best used cars under $15k in Montreal") —
    compounding organic traffic; VDPs churn, content doesn't.
19. **Live chat** (Tawk.to free tier) for after-hours questions.
20. **CRM integration** when lead volume outgrows two inboxes.
21. **Trade-in estimator** (link out to Canadian Black Book).
22. **Side-by-side car comparison** — low value with 5 cars; revisit if
    inventory grows past ~12.

## DELIBERATELY NOT DOING

- **Financing applications / credit checks.** He's a flipper, not a lender;
  the payment estimator (12) is the right scope.
- **Full online checkout.** Overkill for 5 cars — call/DM/visit converts
  better at this size (Carvana's lesson: reduce friction, don't rebuild
  the transaction).
- **360° spins.** Expensive to produce per car; video walkarounds (11)
  deliver the trust cheaper.
- **More than 2 competing CTAs on the hero.** Research: competing CTAs
  dilute action. Primary (Browse cars) + secondary (Call now) only.

---

## VIDEO BACKGROUND — HOW TO ENABLE (one-line change)

The hero is video-ready today via `src/components/VideoBackground.tsx`:

1. Export an optimized MP4: **720p, H.264, < 8 MB**, no audio track needed
   (it always plays muted). Name it `hero-video.mp4`.
2. Drop it in `public/` → `public/hero-video.mp4`.
3. In `src/App.tsx`, find the hero's `<VideoBackground` and change:
   ```tsx
   <VideoBackground poster="/cars/nissan-rogue-2016.webp" />
   ```
   to:
   ```tsx
   <VideoBackground src="/hero-video.mp4" poster="/cars/nissan-rogue-2016.webp" />
   ```
4. Rebuild + push. The component handles autoplay/mute/loop/playsInline and
   falls back to the poster frame while loading. Keep the file small —
   mobile viewers on cellular will thank you.
