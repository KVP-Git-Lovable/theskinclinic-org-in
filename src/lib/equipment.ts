import revlite from "@/assets/equipment/revlite.jpg";
import m22 from "@/assets/equipment/m22.jpg";
import emsculptNeo from "@/assets/equipment/emsculpt-neo.jpg";
import emface from "@/assets/equipment/emface.jpg";
import exion from "@/assets/equipment/exion.jpg";
import legendPro from "@/assets/equipment/legend-pro.jpg";
import hydrafacial from "@/assets/equipment/hydrafacial.jpg";
import picocare from "@/assets/equipment/picocare.jpg";
import viora from "@/assets/equipment/viora.jpg";
import lumenisDiode from "@/assets/equipment/lumenis-diode.jpg";
import dekaOnda from "@/assets/equipment/deka-onda.jpg";
import dekaAgain from "@/assets/equipment/deka-again.jpg";
import co2 from "@/assets/equipment/co2.jpg";
import nanoporePen from "@/assets/equipment/nanopore-pen.jpg";

export interface Equipment {
  name: string;
  image: string;
  /** What the device is used for; shown as a short line on the card. Leave out when not yet written. */
  usedFor?: string;
  /** CSS object-position, to keep the device centred when the card crops the photo. */
  position?: string;
}

// To add a device: save its photo in src/assets/equipment, import it above and add a line here.
export const EQUIPMENT: Equipment[] = [
  { name: "Revlite", image: revlite, usedFor: "Pigmentation, toning, birthmark reduction" },
  { name: "M22", image: m22, usedFor: "Skin rejuvenation, stretch marks, photofacial" },
  { name: "Emsculpt Neo", image: emsculptNeo, usedFor: "Body sculpting" },
  { name: "Emface", image: emface, usedFor: "Anti-ageing" },
  { name: "Exion", image: exion, usedFor: "Body sculpting" },
  { name: "Legend Pro", image: legendPro, usedFor: "Anti-ageing" },
  { name: "Hydrafacial", image: hydrafacial, usedFor: "Cleansing, exfoliation, hydration" },
  { name: "Picocare", image: picocare, usedFor: "Scars, pores, tattoo removal, toning" },
  { name: "Viora", image: viora, usedFor: "Anti-ageing" },
  { name: "Lumenis Diode", image: lumenisDiode, usedFor: "Hair reduction" },
  { name: "Deka Onda", image: dekaOnda, usedFor: "Body sculpting" },
  { name: "Deka Again", image: dekaAgain, usedFor: "Hair reduction, vein treatment" },
  { name: "CO2", image: co2, usedFor: "Mole removal, skin rejuvenation" },
  { name: "Nanopore Pen", image: nanoporePen },
];
