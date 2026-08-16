export const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const FacebookIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M13 22v-9h3l.5-3.5H13V7.5c0-1 .3-1.7 1.7-1.7H17V2.6C16.6 2.5 15.5 2.4 14.2 2.4c-2.7 0-4.5 1.6-4.5 4.6V9.5H7v3.5h2.7V22z" />
  </svg>
);

export const YoutubeIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <rect x="2" y="6" width="20" height="12" rx="3" fill="currentColor" />
    <path d="M10 9.5v5l4.5-2.5z" fill="#fff" />
  </svg>
);

export const TikTokIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 12a4 4 0 1 0 4 4V4c.5 2.5 2.5 4.5 5 5" />
  </svg>
);

export const SOCIALS = [
  { key: "instagram", label: "Instagram", icon: InstagramIcon },
  { key: "facebook", label: "Facebook", icon: FacebookIcon },
  { key: "youtube", label: "YouTube", icon: YoutubeIcon },
  { key: "tiktok", label: "TikTok", icon: TikTokIcon },
];