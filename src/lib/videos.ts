export interface SkinVideo {
  id: string;
  title: string;
  tag: string;
}

// Videos carried over from the clinic's existing website (YouTube channel "Skin Talks").
export const VIDEOS: SkinVideo[] = [
  { id: "3uRFY00obxg", title: "Skin Talks, Episode 1: Melasma explained", tag: "Skin Talks" },
  { id: "UkSKe3p2KE4", title: "Skin Talks with Dr. Vindhya Pai", tag: "Skin Talks" },
  { id: "PP2r5LTJm9M", title: "Skin Talks with Dr. Vindhya Pai", tag: "Skin Talks" },
  { id: "oETsUP9D7Ig", title: "Skin Talk with Dr. Vindhya Pai", tag: "Skin Talks" },
  { id: "0Nk93IayGzs", title: "Dr. Vindhya Pai — Doctors Special, Stars of GSB", tag: "In the media" },
];

export const YOUTUBE_CHANNEL = "https://www.youtube.com/@skintalks-drvindhyapai9526";
