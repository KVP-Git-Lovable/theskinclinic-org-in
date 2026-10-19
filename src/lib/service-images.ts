// Cover images for each treatment: AI-generated illustrations, plus free Unsplash photos for the face shots (see assets/services/CREDITS.md).
import botox from "@/assets/services/botox.webp";
import chemicalPeels from "@/assets/services/chemical-peels.webp";
import dermalFillers from "@/assets/services/dermal-fillers.webp";
import emface from "@/assets/services/emface.webp";
import emsculptNeo from "@/assets/services/emsculpt-neo.webp";
import exionFace from "@/assets/services/exion-face.webp";
import gfcHair from "@/assets/services/gfc-hair.webp";
import hydrafacial from "@/assets/services/hydrafacial.webp";
import iplPhotofacial from "@/assets/services/ipl-photofacial.webp";
import laserHairReduction from "@/assets/services/laser-hair-reduction.webp";
import legendPro from "@/assets/services/legend-pro.webp";
import lipToning from "@/assets/services/lip-toning.webp";
import poreRefining from "@/assets/services/pore-refining.webp";
import prpHair from "@/assets/services/prp-hair.webp";
import qr678Neo from "@/assets/services/qr678-neo.webp";
import revliteLaser from "@/assets/services/revlite-laser.webp";
import scalpBooster from "@/assets/services/scalp-booster.webp";
import scarTreatment from "@/assets/services/scar-treatment.webp";
import tattooRemoval from "@/assets/services/tattoo-removal.webp";
import botoxFace from "@/assets/services/botox-face.jpg";
import chemicalPeelsFace from "@/assets/services/chemical-peels-face.jpg";
import dermalFillersFace from "@/assets/services/dermal-fillers-face.jpg";
import emfaceFace from "@/assets/services/emface-face.jpg";
import exionFaceFace from "@/assets/services/exion-face-face.jpg";
import hydrafacialFace from "@/assets/services/hydrafacial-face.jpg";
import lipToningFace from "@/assets/services/lip-toning-face.jpg";

export const SERVICE_IMAGES: Record<string, string> = {
  "botox": botoxFace,
  "chemical-peels": chemicalPeelsFace,
  "dermal-fillers": dermalFillersFace,
  "emface": emfaceFace,
  "emsculpt-neo": emsculptNeo,
  "exion-face": exionFaceFace,
  "gfc-hair": gfcHair,
  "hydrafacial": hydrafacialFace,
  "ipl-photofacial": iplPhotofacial,
  "laser-hair-reduction": laserHairReduction,
  "legend-pro": legendPro,
  "lip-toning": lipToningFace,
  "pore-refining": poreRefining,
  "prp-hair": prpHair,
  "qr678-neo": qr678Neo,
  "revlite-laser": revliteLaser,
  "scalp-booster": scalpBooster,
  "scar-treatment": scarTreatment,
  "tattoo-removal": tattooRemoval,
};

/** Where to centre portrait photos when they are cropped to the 16:10 card. */
export const SERVICE_IMAGE_POSITION: Record<string, string> = {
  "botox": "center 38%",
  "chemical-peels": "center 71%",
  "emface": "center 51%",
  "lip-toning": "center 64%",
};
