# TODO (don't change this  I'll do it myself)
- when signed in as an admin account the 管理後台 button in the news page just redirects me to the sign in page, fix it to redirect to the correct page when signed in as an admin account
- make the 最新動態 in the home page clickable
- color theme adjustments
- 認識我們的團隊 button goes to /about which is 404 for now
- add the introduce text correctly
- details of contents 不是只回收廢油
- members profile pic + 社區媽媽
- 造貴人地球
- 製作手工皂 推廣
- famliy 社區
- fresh old
- 為什麼這很重要？ 公共衛生 ESG
- 邀約合作
- remove 捐款 志工
- 聯絡電話 
- 服務時間 -> 商號


# DO EVERY TIME (DON'T CHANGE)
- check if there are any errors 
- check if the website is ready for deployment (this is the MOST IMPORTANT one)
- check if there are any security issues    

# Future Enhancements (Not Urgent)
- also change the  此登入僅供High School Soap Lab團隊成員使用。 in the login or sign up... pages. all users should have access. I want when they signed up or in their account settings, they will get an option to choose whether they want to recieve emails of our latest news in the account settings they can edit their choice

# DO THIS

Here are targeted design and usability suggestions for the High School Soap Lab (HSSL) website, based on current content found on the deployed site and GitHub repo  ￼ ￼. Feedback is grouped per page and theme to help you focus improvements.

⸻

🎨 Design System & Foundations

From the README.md, the existing color system includes a primary green with lighter green and yellow accents, using:
	•	Tailwind CSS
	•	Framer‑Motion
	•	Inter font family
	•	Consistent components for buttons, cards, animation  ￼

Suggested enhancements:

Category	Recommendation
Color Palette	Ensure WCAG AA or AAA contrast: if primary green is #2ecc71, test text contrast on white (#fff) and dark (#012f1f) backgrounds; make accent yellow at least #f1c40f for clarity.
Typography Scale	Use a modular scale (e.g., Base‑16, ratio 1.25): body 1rem/16px, sections: 1.25, 1.56, 1.95 rem etc. Set line-height: 1.5 for paragraphs and 1.2 for headings.
Spacing System	Use a consistent base unit (e.g., 1rem = 16px), spacing steps of 1 (16px), 2 (32px), 3 (48px), etc. Ensure card paddings, container margins, and grid gutters match.
Iconography	Switch to monochrome SVG or CSS‑editable icons (e.g. with Lucide React). Alternate fill/stroke on hover.
Visual Identity	Use nature‑inspired hero image (e.g., abstract soap pour or eco materials). Add subtle textured background (organic shapes) using clip-path or light transparency.


⸻

🌍 Header & Global Navigation

Observations: Primary navigation shows both English/Chinese labels, with CTAs: “購買我們的手工皂”, “認識我們的團隊”  ￼.

Improvements:
	•	Ensure language is consistent (prefer “High School Soap Lab｜高中生手工皂實驗室” for bilingual): use language toggle or dual‑lingual headings.
	•	Consolidate primary actions: Home, Education, News, Support, Shop/donate.
	•	Move “註冊/登入” into a distinct top-right row, styled as icon buttons (Google “G+” SVG + name).
	•	Include hover underline animations and active state highlight with border-bottom 2px solid. Add skip-links for accessibility.
	•	Shrink header on scroll down (“sticky” shrinking header) to maintain call-to-action visibility on mobile.

⸻

🏠 Homepage (/)

(Based on content visible on site)  ￼

Layout suggestions:
	1.	Hero Section
	•	Use a full‑width video/hero image of students making soap or environmental action.
	•	Overlay tagline “Making Clean, Green Soap…” in bold 2.5rem Inter (sub‑heading: 1.25rem). CTA button: “Support Our Mission” with a green-to-yellow gradient hover.
	•	Include social share icons and a “#hssl2025” campaign tag (makes hero more dynamic).
	2.	Mission Statement Block
	•	Split into three cards: Environmental Impact, Social Impact, Educational Value. Use pastel‑tone icons (leaf, group, mortarboard). Provide equal-height CSS grid with justify-items: center.
	3.	Quick Call‑to‑Action Strip
	•	Below the cards, insert a full‑width horizontal band with light‑green background: “每一次購買 = 一塊慈善皂” and two CTAs side‑by‑side: “購買手工皂” (+ icon) and “捐款我們”.
	4.	News Teaser Module
	•	Show 3 latest posts with images, titles, snippets, and a hover zoom effect. Add filters by “分類”, date, and “More news →”.
	5.	Footer
	•	Add site map, contact, social icons, and accessibility statement (e.g., keyboard only navigation, color‑blind contrast).

⸻

📘 Education Center (/education)

(Based on content from turn2view0 – titled “教育中心”)
	•	This page is text-heavy: chemical ingredients, safety instructions, saponification details.

Layout & readability improvements:
	•	Break long paragraphs into toggle tabs (accordion) per section: 成分解說 / 製皂指南 / 安全須知.
	•	Use inline cards for each chemical component: e.g. colored border: yellow = caution, red = high‑risk. Showing “觸控反應” (allergy risk).
	•	Include a “learn more” dataset that animates the soap’s reaction in 3D or CSS animation (simple fade).

Color & visuals:
	•	Use alternating light grey (#f9f9f9) and white backgrounds for card strips to ease scrolling perception.
	•	For table elements, use sticky table header on scroll; add zebra stripes.
	•	Ensure code snippets or chemical ratios use monospaced font and are selectable/copy-able.

Actions & engagement:
	•	At the bottom, prompt with a CTA: “Join our next Soap Workshop →” and newsletter “Get notified when next course opens”.
	•	Add testimonials or event photos, with a “View Gallery” modal (lazy loaded).

⸻

💝 Support Page (/support)

(Based on turn3view0 – “支持我們的 環保使命”)
	•	Page lists donation, soap purchases, volunteering.

Layout suggestions:
	•	Redesign as a three-column grid (on desktop):
	•	Column 1: Donate (charity),
	•	Column 2: Buy Soap (product),
	•	Column 3: Volunteer (visits/demos).
Each colored light-green, white, light-yellow backgrounds respectively.
	•	Display progress bars (animated by Framer Motion) for donation & soap sales targets:
	•	例如: “已售出 800  / 2000 皂”. Percentage + CTA.
	•	Simplify search: fewer financial details inline; use numbers visually (big fonts: 2–3rem).
	•	Add a lightbox with event photos or “How to volunteer step by step.”

⸻

📰 News & Announcements Page (/news)

(Based on turn4view0 – “最新消息動態”)

Enhancements:
	•	Show posts in masonry or card layout with featured image. Each card: title (1.25rem), date, snippet, “Read more”.
	•	Add filters: category tags (活動, 科普, 政見), timeline UI (vertical month scroller).
	•	For SEO: embed structured data (JSON‑LD) for articles, set <meta property="og:image">, page description <meta name="description">.
	•	On individual article pages (when clicked), provide next/previous navigation.

⸻

🛒 Shop & Donation Integration
	•	Current purchase link goes to external FamiPort system. Use a mini‑iframe modal or smart “Launch” button rather than redirect page.
	•	Provide a bullet list of soap features on product cards (eco‑certified, unscented, hand‑milled etc.).
	•	Add small icons for shipping/donation (cart/heart/plant), each with hover tooltips.
	•	Show trust markers (100 % profit to charity, eco‑friendly, made by teens, …)

⸻

🔐 Login / Dashboard / Admin

(Pages available to logged‑in users via Google OAuth)

Authentication flow:
	•	Use full-screen Google Sign‑in modal on /login (with background hero image). Brand the button “Sign in with Google – HSSL Member”.
	•	After login redirect to dashboard onboarding screen.

Dashboard / Admin:
	•	Use a three‑part layout: sidebar (Dashboard / Posts / Events / Products), main content area, header with quick‑add widget.
	•	Use Tailwind forms or Radix UI to ensure consistent styling/styles.
	•	Show onboarding tips (“Manage posts, edit product listings, view volunteers”) in a welcome card.
	•	Protect admin routes: disable/hide left sidebar when not admin (role-based menu).

⸻

🧾 Accessibility & Performance
	•	Audit entire site using Lighthouse & color contrast tools:
	•	Minimum contrast for text: 4.5:1.
	•	Provide skip‑nav link, aria‑label ARIA attributes for buttons.
	•	Use <img> alt text for all visuals; optimize PNGs → WebP.
	•	Lazy‑load images, use next/image with blur‑placeholder & size attributes.
	•	Minimize bundle size: only load Framer Motion elements in homepage hero.
	•	Use Tailwind’s purgeCSS tree‑shaking. Consider inlining critical CSS for first paint.

⸻

📱 Mobile & Responsive
	•	Ensure hamburger menu with sliding side‑nav on mobile, font size min 1.125rem, tap target min 48 px.
	•	Hero height: make sure above‑the‑fold content still fits < 700px height ratio.
	•	Use CSS clamp() for typography: e.g. font-size: clamp(1rem, 2.5vw, 1.25rem) for body.
	•	At smaller widths, reorder content: CTA buttons stack, mission cards become full‑width.

⸻

🛠 Summary
	•	Strengths to build on: Youth‑driven mission, clear bilingual copy, structured pages.
	•	Areas to refine:
	•	Visual hierarchy & breathing space
	•	Improved contrast and accessibility
	•	Better engagement via animations in support/donation and news filters
	•	Consistent spacing & type scale
	•	Seamless bilingual header and CTA prioritization
	•	Performance optimization and structured metadata for SEO
