import type { TreatmentInfo } from "@/components/treatment-detail";

// Original educational summaries informed by Chicago Skin Clinic's medical and
// cosmetic treatment guides. Options are not claims of local device availability.
export const medicalTreatments: TreatmentInfo[] = [
  {
    id: "acne", name: "Acne & breakouts", summary: "Blackheads, recurring pimples and deeper, painful breakouts.",
    overview: "Acne develops when pores become blocked by oil and dead skin cells. It can affect the face, chest and back at any age. Hormones, some medicines and skin products can contribute; acne is not a sign of poor hygiene.",
    care: "A dermatologist assesses the type of acne, any scarring and your current routine. Options may include prescription creams, short courses of oral medicines or carefully selected procedures. More severe acne may need monitored treatment rather than stronger over-the-counter products.",
    expectations: "Improvement usually takes several weeks, and a maintenance routine helps prevent new breakouts. Avoid picking or squeezing spots. Tell your doctor if you are pregnant or planning pregnancy, as some acne medicines are unsuitable.",
  },
  {
    id: "eczema", name: "Eczema & sensitive skin", summary: "Itching, dryness and recurring inflamed patches.",
    overview: "Eczema is an inflammatory skin condition in which the skin barrier has difficulty keeping moisture in and irritants out. It can occur in children and adults. Flare-ups may be linked to soaps, heat, sweat or other individual triggers; eczema is not contagious.",
    care: "Care often combines gentle cleansing, regular moisturising and prescription anti-inflammatory creams. Your doctor may consider other medicines for persistent or widespread disease, and tests when contact allergy or infection is suspected.",
    expectations: "The aim is comfortable skin and fewer flare-ups, not a promised permanent cure. A consistent routine matters even when skin looks clear. Increasing pain, oozing or fever needs prompt medical review.",
  },
  {
    id: "psoriasis", name: "Psoriasis", summary: "Thick, scaly patches on the skin, scalp or nails.",
    overview: "Psoriasis is related to immune-system activity that speeds up skin-cell turnover. It may produce raised, scaly patches, itching and nail changes. It is not an infection and cannot be passed to another person.",
    care: "Treatment depends on how much skin is affected and how the condition impacts daily life. Options include medicated creams, supervised light treatment or medicines that work throughout the body. Your dermatologist can explain whether specialist treatment or referral is appropriate.",
    expectations: "Psoriasis often needs ongoing care. Mention joint pain, swelling or morning stiffness, as some people also develop psoriatic arthritis. Treatment and monitoring are tailored to your health history.",
  },
  {
    id: "rosacea", name: "Rosacea & facial redness", summary: "Flushing, sensitive skin and acne-like bumps on the face.",
    overview: "Rosacea can cause recurring facial redness, visible small blood vessels and tender bumps. On deeper skin tones, burning or warmth may be more noticeable than redness. Heat, sun and certain foods or products can trigger symptoms, but triggers differ between people.",
    care: "Gentle skin care, sun protection and prescription anti-inflammatory treatments are common starting points. Selected laser or light procedures may help visible vessels when suitable. Eye symptoms should also be assessed.",
    expectations: "Rosacea is usually managed over time rather than cured in one visit. Avoid harsh scrubs and self-prescribed steroid creams on the face. Eye pain, light sensitivity or blurred vision needs prompt assessment.",
  },
  {
    id: "hair-loss", name: "Hair loss & thinning", summary: "Extra shedding, a widening part or patchy hair loss.",
    overview: "Hair loss has many causes, including inherited thinning, illness-related shedding, nutritional problems and autoimmune conditions. A sudden increase in shedding is different from slowly progressing thinning, so finding the cause comes first.",
    care: "Assessment may include scalp examination, a review of medicines and selective blood tests. Depending on the diagnosis, options can include topical or oral medicines, treatment of scalp inflammation or platelet-rich plasma (PRP). Not every type of hair loss responds to the same approach.",
    expectations: "Hair grows slowly; changes are usually assessed over months. Some conditions need long-term maintenance. Earlier evaluation is especially important for painful, inflamed or scarred areas of the scalp.",
  },
  {
    id: "melasma", name: "Melasma & pigmentation", summary: "Brown patches, uneven tone and marks left after inflammation.",
    overview: "Melasma commonly appears as brown or grey-brown patches on the cheeks, forehead or upper lip. Sun exposure and hormonal changes may play a role. Dark marks after acne or irritation are a different form of pigmentation and may need a different plan.",
    care: "Daily sun protection forms the foundation of care. A dermatologist may recommend prescription pigment treatments and, in selected cases, peels or laser procedures. Treatment strength must be chosen carefully because irritation can worsen pigmentation.",
    expectations: "Fading is gradual and melasma can return. Maintenance and sun protection are often needed. Avoid unlabelled fairness creams or unsupervised steroid combinations; tell your doctor about pregnancy and breastfeeding.",
  },
  {
    id: "dandruff", name: "Dandruff & scalp irritation", summary: "Flaking, itching and a scalp that feels uncomfortable.",
    overview: "Dandruff is often part of seborrhoeic dermatitis, a condition involving scalp oil, skin sensitivity and naturally occurring yeast. Similar flaky patches can appear around the eyebrows, nose or ears. It is not simply caused by an unclean scalp.",
    care: "Medicated shampoos and short courses of suitable scalp treatments can help. Examination is important when flakes are thick, hair is falling out in patches, or symptoms could be due to psoriasis, allergy or infection instead.",
    expectations: "Symptoms often come and go, so maintenance may be useful. Follow instructions on how long to leave a medicated shampoo on the scalp, and seek review if itching or redness persists.",
  },
  {
    id: "vitiligo", name: "Vitiligo", summary: "Patches of skin that gradually lose their natural colour.",
    overview: "Vitiligo occurs when pigment-producing cells are lost, leaving lighter or white patches. It is not contagious and is not caused by poor hygiene. The pattern and rate of change vary widely, and the emotional impact deserves attention too.",
    care: "A dermatologist can confirm the diagnosis and discuss topical medicines, supervised light therapy or referral for specialist options. Sun protection and cosmetic camouflage can also support comfort and confidence.",
    expectations: "Response depends on the location and activity of the condition. Restoring colour can take months and is not guaranteed. The first goal may be to limit progression rather than restore all pigment immediately.",
  },
  {
    id: "skin-nail-infections", name: "Skin & nail infections", summary: "Persistent rashes, fungal infections and changing nails.",
    overview: "Fungal, bacterial and viral infections can affect skin and nails. Ring-shaped rashes, itching between toes or thickened discoloured nails may suggest infection, but other conditions can look similar.",
    care: "Examination and, when needed, a skin scraping or nail sample help identify the cause. Treatment may involve topical or oral medicines. Preventing reinfection can include keeping affected areas dry and not sharing towels or nail tools.",
    expectations: "Nails grow slowly, so visible recovery can take months even after treatment works. Avoid steroid-mixed creams for suspected fungal rashes. Rapidly spreading redness, severe pain or fever needs urgent review.",
  },
  {
    id: "skin-check", name: "Moles & skin cancer checks", summary: "New, changing, bleeding or non-healing spots.",
    overview: "Most moles and skin growths are harmless, but a changing spot deserves examination. Warning signs include asymmetry, an irregular edge, several colours, growth or other changes. Skin cancer can occur in every skin tone.",
    care: "A dermatologist examines concerning areas and may recommend a magnified skin examination or a biopsy, where a small sample is tested. The need for repeat skin checks depends on personal and family history and other risk factors.",
    expectations: "A photograph or online description cannot rule out skin cancer. Arrange prompt assessment for a spot that changes, bleeds repeatedly or does not heal. Not every suspicious spot is cancer, but checking is the safest next step.",
  },
  {
    id: "phototherapy", name: "Phototherapy", summary: "Understanding medically supervised light treatment.",
    overview: "Phototherapy uses carefully measured ultraviolet light to treat selected inflammatory or pigment conditions, such as psoriasis, eczema and vitiligo. It is different from tanning and is not the same as cosmetic red-light treatment.",
    care: "A dermatologist assesses whether light treatment is suitable, reviews medicines that increase light sensitivity and plans protective measures. If recommended, the clinic can discuss access to an appropriate service or referral; local equipment availability must be confirmed.",
    expectations: "A course usually involves repeated visits and monitoring. Redness and burns are possible, and cumulative exposure matters. Home sunlight exposure is not a substitute for a prescribed treatment plan.",
  },
  {
    id: "skin-cancer-surgery", name: "Skin cancer surgery & specialist referral", summary: "Understanding excision and when Mohs surgery is considered.",
    overview: "When a biopsy confirms skin cancer, surgery may be recommended to remove it. Standard excision removes the growth with a margin of surrounding skin. Mohs surgery examines tissue in stages and is used for selected cancers where preserving healthy tissue is especially important.",
    care: "The right approach depends on the cancer type, size and location, as well as your health. A dermatologist can explain the diagnosis and coordinate specialist care. These are educational options, not a claim that Mohs or every surgical procedure is performed at Tha Skin Clinic.",
    expectations: "Surgery can leave a scar and may require stitches, dressings and follow-up. Recovery and recurrence risk vary. Confirm the treating specialist, procedure location and aftercare plan before scheduling.",
  },
];

export const cosmeticTreatments: TreatmentInfo[] = [
  {
    id: "botox", name: "Botox & expression lines", summary: "Softening movement-related lines while retaining expression.",
    overview: "Botulinum toxin injections temporarily reduce activity in selected muscles. They are commonly considered for forehead lines, frown lines and crow’s feet. They do not replace treatments for skin texture or volume loss.",
    care: "Your facial movement, goals and medical history are assessed before selecting injection points and dose. The aim can be a subtle change rather than a frozen appearance. Product choice and suitability are discussed at consultation.",
    expectations: "Changes develop over several days, with the full effect often assessed around two weeks. Results are temporary. Bruising, asymmetry or eyelid drooping can occur; your doctor will explain precautions and follow-up.",
  },
  {
    id: "fillers", name: "Dermal fillers", summary: "Restoring selected areas of volume and facial definition.",
    overview: "Fillers are injected beneath the skin to address selected concerns such as volume loss, lip shape or facial contours. Hyaluronic acid is one commonly used material. A filler is not suitable for every wrinkle or every area of the face.",
    care: "An anatomy-led consultation considers facial balance, skin quality and your goals. Your doctor explains the product, the amount proposed, alternatives and whether treatment is appropriate. A conservative, staged approach may be preferable.",
    expectations: "Early swelling can temporarily affect the appearance. Bruising and lumps are possible; rare but serious complications include blocked blood vessels and vision problems. Sudden pain, skin colour changes or visual symptoms after injection require immediate medical attention.",
  },
  {
    id: "biostimulators", name: "Collagen-stimulating injectables", summary: "A gradual approach to selected volume and skin-quality concerns.",
    overview: "Biostimulators, including products such as Sculptra, are designed to encourage collagen production over time. They work differently from fillers that provide immediate volume and are not suitable for every patient or treatment area.",
    care: "A dermatologist can discuss whether a biostimulator, a hyaluronic acid filler or another approach better fits your goals. Confirm which products and specialist services are available locally before planning treatment.",
    expectations: "Changes are gradual and a series may be advised. Bruising, swelling and delayed nodules can occur. This is not a quick fix, and product-specific aftercare and follow-up are important.",
  },
  {
    id: "laser-hair", name: "Laser hair reduction", summary: "Reducing unwanted facial or body hair over a planned course.",
    overview: "Laser energy targets pigment in hair follicles to reduce future growth. Because hairs are at different stages of growth, multiple sessions are needed. The more accurate goal is long-term hair reduction, not guaranteed permanent removal.",
    care: "Skin tone, hair colour, recent tanning, medicines and hormonal factors help guide the choice of device and settings. A test area may be advised. Coarse dark hair usually responds better than very light, grey or fine hair.",
    expectations: "Sessions are spaced according to the area and growth cycle; maintenance may be needed. Temporary redness can occur, and burns or pigment changes are possible. Follow shaving and sun-protection advice and avoid waxing during the course.",
  },
  {
    id: "chemical-peels", name: "Chemical peels", summary: "Controlled exfoliation for uneven tone, acne and texture.",
    overview: "A chemical peel uses a selected solution to remove superficial skin layers in a controlled way. Different peel strengths address different concerns; stronger does not automatically mean better, particularly for pigmentation-prone skin.",
    care: "Your doctor selects a peel based on skin sensitivity, pigmentation risk, acne activity and your routine. Preparation may include adjusting certain products. Peels can be combined with a longer-term treatment plan rather than used alone.",
    expectations: "Flaking, dryness or redness varies with the peel. Avoid picking peeling skin and protect it from the sun. Irritation, infection and darkening are possible; deeper peels involve more recovery and are not suitable for everyone.",
  },
  {
    id: "microneedling", name: "Microneedling & acne scars", summary: "Supporting collagen renewal for selected scars and texture.",
    overview: "Microneedling creates tiny, controlled channels in the skin to stimulate repair and collagen formation. It may improve some acne scars, fine lines and uneven texture. Deep or tethered scars may need additional treatments.",
    care: "Scar type, active acne, infection risk and any tendency to raised scars are assessed first. Depending on the concern, options may include conventional microneedling, radiofrequency-assisted treatment or a combination with other scar procedures.",
    expectations: "Results develop gradually and multiple sessions may be needed. Redness and tenderness are common during early recovery. Pigment changes and infection are possible. Avoid home needling devices and follow your prescribed aftercare.",
  },
  {
    id: "microdermabrasion", name: "Microdermabrasion", summary: "Gentle surface exfoliation for selected texture concerns.",
    overview: "Microdermabrasion mechanically exfoliates the outermost skin layer. It can help skin feel smoother and improve some superficial dullness, but it does not remove deep scars or replace medical treatment for acne or pigmentation.",
    care: "Suitability depends on sensitivity, active breakouts and conditions such as rosacea. A consultation can compare this option with a peel or a simple skin-care adjustment. Confirm local service availability before booking.",
    expectations: "Skin may feel temporarily tight or look pink. Results are generally modest and may require maintenance. Avoid harsh exfoliation afterwards and use sun protection as advised.",
  },
  {
    id: "acne-light", name: "Light & laser options for acne", summary: "Additional options when selected breakouts need more support.",
    overview: "Some light-based treatments target acne-associated bacteria, while selected lasers act on other acne-related skin structures. They are usually considered alongside a medical acne plan rather than as a universal replacement for prescriptions.",
    care: "Your dermatologist reviews acne severity, skin tone and previous treatment response. Chicago Skin Clinic describes named systems such as CLEARLight and Smoothbeam; those names do not establish their availability at Tha Skin Clinic. Ask which device, if any, is appropriate and available.",
    expectations: "A course may require repeated sessions, and response varies. Light sensitivity, irritation, burns or pigment changes depend on the treatment. Active acne should be controlled before planning many scar procedures.",
  },
  {
    id: "laser-resurfacing", name: "Laser resurfacing & pigment treatments", summary: "Targeted approaches for scars, sun damage and uneven tone.",
    overview: "Different lasers address different targets. Pigment-focused treatments are distinct from resurfacing lasers, which create controlled injury to encourage skin renewal. No single laser is right for every mark, scar or skin tone.",
    care: "The diagnosis, depth of the concern and your risk of post-treatment darkening guide device selection. Options may include pigment-targeting lasers or fractional resurfacing. Ask about test spots, preparation and whether a non-laser option is safer for you.",
    expectations: "Recovery ranges from mild redness to several days or longer of visible healing, depending on intensity. Burns, pigment changes and scarring are possible. Sun protection and a clear aftercare plan are essential.",
  },
  {
    id: "hair-rejuvenation", name: "Hair rejuvenation with PRP", summary: "An additional option for selected types of thinning hair.",
    overview: "Platelet-rich plasma uses a concentrated portion of your own blood, injected into the scalp. It may support hair density in selected patients, but it cannot create new follicles in areas where they have been permanently lost.",
    care: "A hair-loss diagnosis comes first. Your doctor checks whether PRP is appropriate alongside medicines or other care and reviews bleeding conditions and relevant medication. A series and follow-up assessment may be proposed.",
    expectations: "Changes are assessed over months, not days, and response is variable. Tenderness, swelling and bruising can occur. Using your own blood does not make the procedure risk-free, and ongoing maintenance may be needed.",
  },
  {
    id: "hand-rejuvenation", name: "Hand rejuvenation", summary: "Addressing selected age spots, texture and volume changes.",
    overview: "Hands can develop sun-related spots, roughness and loss of volume over time. These are different concerns, so treatment starts by distinguishing harmless pigmentation from spots needing medical examination.",
    care: "Sun protection and skin care may be enough for some concerns. Selected peels, pigment procedures or volume treatments can be discussed where appropriate. Confirm the recommended service and practitioner before scheduling.",
    expectations: "Results and recovery depend on the method used. Bruising, irritation or pigment changes can occur, and hands may need protection while healing. No treatment stops future sun damage or ageing.",
  },
  {
    id: "stretch-marks", name: "Stretch marks & post-pregnancy skin", summary: "Considering texture changes after pregnancy or weight changes.",
    overview: "Stretch marks form when the skin stretches and its deeper supporting fibres change. They often fade naturally but may leave a different texture. Skin laxity and stretch marks are separate concerns and do not always respond to the same treatment.",
    care: "Selected microneedling or resurfacing procedures may soften the appearance of some marks. Discuss pregnancy, breastfeeding and healing before treatment. A consultation can clarify realistic goals and whether treatment should be deferred.",
    expectations: "Improvement is usually partial, not complete removal, and a series may be needed. Temporary redness and pigment changes are possible. Cosmetic procedures should not be presented as a requirement after pregnancy.",
  },
  {
    id: "red-light", name: "Red-light therapy", summary: "Understanding low-level light as a supportive treatment.",
    overview: "Red-light treatment uses specific wavelengths without the ultraviolet exposure used in medical phototherapy. It is sometimes offered as an adjunct for selected skin-quality or healing concerns, but benefits depend on the device and the condition being treated.",
    care: "Ask your dermatologist whether there is useful evidence for your concern, how the device is used and whether the service is available. It should not delay diagnosis of a rash, changing mole or persistent acne.",
    expectations: "Results can be subtle and usually need repeated use. Eye protection and device-specific precautions matter. Red light is not a replacement for sunscreen or a guaranteed anti-ageing treatment.",
  },
  {
    id: "skin-boosters", name: "Skin boosters & skin tightening", summary: "Options for selected hydration, texture and laxity concerns.",
    overview: "Skin boosters are injectable treatments aimed at skin quality rather than major volume changes. Energy-based tightening and thread procedures work differently and may be considered for selected mild laxity. None is equivalent to a surgical lift.",
    care: "A dermatologist assesses the concern and compares skin care, injectables, device-based care or referral. Product and device availability, expected benefit and alternatives should be confirmed before choosing a procedure.",
    expectations: "Effects vary and may be modest or temporary. Injectable treatments can cause bruising and swelling; tightening procedures have their own risks, including burns or contour changes. The recovery plan depends on the exact procedure.",
  },
];