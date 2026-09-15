/* ============================================
   Xliner — SVG Icon Components
   ============================================ */

import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

const defaultProps: IconProps = { size: 16, color: 'currentColor' };

export const IconPlay: React.FC<IconProps> = ({ size = defaultProps.size, color = defaultProps.color, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <path d="M4 2.5v11l9-5.5L4 2.5z" fill={color}/>
  </svg>
);

export const IconStop: React.FC<IconProps> = ({ size = defaultProps.size, color = defaultProps.color, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <rect x="3" y="3" width="10" height="10" rx="1" fill={color}/>
  </svg>
);

export const IconFolder: React.FC<IconProps> = ({ size = defaultProps.size, color = defaultProps.color, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <path d="M1.5 2.5h4.5l1.5 1.5h7v9h-13v-10.5z" stroke={color} strokeWidth="1.2" fill="none"/>
  </svg>
);

export const IconFolderOpen: React.FC<IconProps> = ({ size = defaultProps.size, color = defaultProps.color, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <path d="M1.5 2.5h4.5l1.5 1.5h7v2H3l-1.5 7v-10.5z" stroke={color} strokeWidth="1.2" fill="none"/>
    <path d="M3 6h11.5l-2 7h-11l1.5-7z" stroke={color} strokeWidth="1.2" fill="none"/>
  </svg>
);

export const IconFile: React.FC<IconProps> = ({ size = defaultProps.size, color = defaultProps.color, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <path d="M3 1.5h6.5l3 3v10h-9.5v-13z" stroke={color} strokeWidth="1.2"/>
    <path d="M9.5 1.5v3h3" stroke={color} strokeWidth="1.2"/>
  </svg>
);

export const IconSwift: React.FC<IconProps> = ({ size = defaultProps.size, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className={className}>
    <rect width="16" height="16" rx="3" fill="#F05138"/>
    <path d="M11.5 11.5c-1.2 1-3 1.5-5 .8 2.5-.5 4.5-2.5 5.5-4.3-1.5 1.5-3.5 2.5-5 3-1-.5-3-2.5-4-4.5 1 1.5 2.5 2.5 3.5 3C5 8 3.5 6 3 4.5c2.5 3 5.5 5 8 5.5.5-1 .5-2 0-3 1 1.5 1 3.5.5 4.5z" fill="white"/>
  </svg>
);

export const IconJS: React.FC<IconProps> = ({ size = defaultProps.size, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className={className}>
    <rect width="16" height="16" rx="2" fill="#F7DF1E"/>
    <text x="4" y="13" fontSize="10" fontWeight="bold" fill="#323330">JS</text>
  </svg>
);

export const IconTS: React.FC<IconProps> = ({ size = defaultProps.size, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className={className}>
    <rect width="16" height="16" rx="2" fill="#3178C6"/>
    <text x="3" y="13" fontSize="10" fontWeight="bold" fill="white">TS</text>
  </svg>
);

export const IconHTML: React.FC<IconProps> = ({ size = defaultProps.size, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className={className}>
    <rect width="16" height="16" rx="2" fill="#E44D26"/>
    <text x="1" y="12.5" fontSize="8" fontWeight="bold" fill="white">&lt;/&gt;</text>
  </svg>
);

export const IconCSS: React.FC<IconProps> = ({ size = defaultProps.size, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className={className}>
    <rect width="16" height="16" rx="2" fill="#1572B6"/>
    <text x="1.5" y="12" fontSize="8.5" fontWeight="bold" fill="white">CSS</text>
  </svg>
);

export const IconJSON: React.FC<IconProps> = ({ size = defaultProps.size, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className={className}>
    <rect width="16" height="16" rx="2" fill="#5B5B5B"/>
    <text x="2" y="12" fontSize="7" fontWeight="bold" fill="#F7DF1E">{'{}'}</text>
  </svg>
);

export const IconMarkdown: React.FC<IconProps> = ({ size = defaultProps.size, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className={className}>
    <rect width="16" height="16" rx="2" fill="#445566"/>
    <text x="1.5" y="12.5" fontSize="9" fontWeight="bold" fill="white">M↓</text>
  </svg>
);

export const IconChevronRight: React.FC<IconProps> = ({ size = defaultProps.size, color = defaultProps.color, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <path d="M6 3l5 5-5 5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const IconChevronDown: React.FC<IconProps> = ({ size = defaultProps.size, color = defaultProps.color, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <path d="M3 6l5 5 5-5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const IconPlus: React.FC<IconProps> = ({ size = defaultProps.size, color = defaultProps.color, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <path d="M8 3v10M3 8h10" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const IconTrash: React.FC<IconProps> = ({ size = defaultProps.size, color = defaultProps.color, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <path d="M3 4h10M5 4V3a1 1 0 011-1h4a1 1 0 011 1v1M6 7v5M8 7v5M10 7v5M4 4l.8 9a1 1 0 001 .9h4.4a1 1 0 001-.9L12 4" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

export const IconSearch: React.FC<IconProps> = ({ size = defaultProps.size, color = defaultProps.color, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <circle cx="7" cy="7" r="4" stroke={color} strokeWidth="1.5"/>
    <path d="M10.5 10.5L14 14" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const IconX: React.FC<IconProps> = ({ size = defaultProps.size, color = defaultProps.color, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <path d="M4 4l8 8M12 4l-8 8" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const IconTerminal: React.FC<IconProps> = ({ size = defaultProps.size, color = defaultProps.color, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <rect x="1" y="2" width="14" height="12" rx="2" stroke={color} strokeWidth="1.2"/>
    <path d="M4 7l2.5 2L4 11" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8.5 11H12" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

export const IconGit: React.FC<IconProps> = ({ size = defaultProps.size, color = defaultProps.color, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <circle cx="5" cy="4" r="2" stroke={color} strokeWidth="1.2"/>
    <circle cx="11" cy="4" r="2" stroke={color} strokeWidth="1.2"/>
    <circle cx="5" cy="12" r="2" stroke={color} strokeWidth="1.2"/>
    <path d="M5 6v4M9 4H7" stroke={color} strokeWidth="1.2"/>
  </svg>
);

export const IconSettings: React.FC<IconProps> = ({ size = defaultProps.size, color = defaultProps.color, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <circle cx="8" cy="8" r="2.5" stroke={color} strokeWidth="1.2"/>
    <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3 3l1.5 1.5M11.5 11.5L13 13M13 3l-1.5 1.5M4.5 11.5L3 13" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

export const IconAI: React.FC<IconProps> = ({ size = defaultProps.size, color = defaultProps.color, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <path d="M8 1l2 4.5h4.5l-3.5 3 1.5 4.5L8 10l-4.5 3 1.5-4.5L1.5 5.5H6L8 1z" stroke={color} strokeWidth="1.2" strokeLinejoin="round"/>
  </svg>
);

export const IconBug: React.FC<IconProps> = ({ size = defaultProps.size, color = defaultProps.color, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <ellipse cx="8" cy="9.5" rx="3.5" ry="4" stroke={color} strokeWidth="1.2"/>
    <path d="M6 5.5c0-1.1.9-2 2-2s2 .9 2 2M3 8H1M15 8h-2M3.5 12l-2 1.5M12.5 12l2 1.5M4 6l-2-1.5M12 6l2-1.5" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

export const IconWarning: React.FC<IconProps> = ({ size = defaultProps.size, color = '#ffd60a', className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <path d="M8 1L1 14h14L8 1z" stroke={color} strokeWidth="1.2" strokeLinejoin="round"/>
    <path d="M8 6v4M8 11.5v.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const IconError: React.FC<IconProps> = ({ size = defaultProps.size, color = '#ff453a', className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <circle cx="8" cy="8" r="6" stroke={color} strokeWidth="1.2"/>
    <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

export const IconSuccess: React.FC<IconProps> = ({ size = defaultProps.size, color = '#32d74b', className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <circle cx="8" cy="8" r="6" stroke={color} strokeWidth="1.2"/>
    <path d="M5 8l2 2 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const IconPhone: React.FC<IconProps> = ({ size = defaultProps.size, color = defaultProps.color, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <rect x="3.5" y="1" width="9" height="14" rx="2" stroke={color} strokeWidth="1.2"/>
    <path d="M6.5 12.5h3" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

export const IconTablet: React.FC<IconProps> = ({ size = defaultProps.size, color = defaultProps.color, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <rect x="2" y="1" width="12" height="14" rx="2" stroke={color} strokeWidth="1.2"/>
    <path d="M6.5 12.5h3" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

export const IconLaptop: React.FC<IconProps> = ({ size = defaultProps.size, color = defaultProps.color, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <rect x="2" y="2" width="12" height="9" rx="1" stroke={color} strokeWidth="1.2"/>
    <path d="M1 13h14" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const IconWatch: React.FC<IconProps> = ({ size = defaultProps.size, color = defaultProps.color, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <rect x="4" y="3" width="8" height="10" rx="3" stroke={color} strokeWidth="1.2"/>
    <path d="M6 3V1.5h4V3M6 13v1.5h4V13" stroke={color} strokeWidth="1.2"/>
  </svg>
);

export const IconTV: React.FC<IconProps> = ({ size = defaultProps.size, color = defaultProps.color, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <rect x="1" y="2" width="14" height="10" rx="1.5" stroke={color} strokeWidth="1.2"/>
    <path d="M6 14h4M8 12v2" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

export const IconVision: React.FC<IconProps> = ({ size = defaultProps.size, color = defaultProps.color, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <path d="M1 8c1.5-3 4-5 7-5s5.5 2 7 5c-1.5 3-4 5-7 5s-5.5-2-7-5z" stroke={color} strokeWidth="1.2"/>
    <circle cx="8" cy="8" r="2.5" stroke={color} strokeWidth="1.2"/>
  </svg>
);

export const IconRefresh: React.FC<IconProps> = ({ size = defaultProps.size, color = defaultProps.color, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <path d="M2 8a6 6 0 0111-3.2M14 8a6 6 0 01-11 3.2" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M13 2v3h-3M3 14v-3h3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const IconSend: React.FC<IconProps> = ({ size = defaultProps.size, color = defaultProps.color, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <path d="M2 2l12 6-12 6V9l8-1-8-1V2z" fill={color}/>
  </svg>
);

export const IconRotate: React.FC<IconProps> = ({ size = defaultProps.size, color = defaultProps.color, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <path d="M13.5 8A5.5 5.5 0 118 2.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8 0v5l3-2.5L8 0z" fill={color}/>
  </svg>
);

export const IconMaximize: React.FC<IconProps> = ({ size = defaultProps.size, color = defaultProps.color, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <path d="M2 6V2h4M14 6V2h-4M2 10v4h4M14 10v4h-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const IconMinimize: React.FC<IconProps> = ({ size = defaultProps.size, color = defaultProps.color, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <path d="M6 2v4H2M10 2v4h4M6 14v-4H2M10 14v-4h4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const IconSidebar: React.FC<IconProps> = ({ size = defaultProps.size, color = defaultProps.color, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <rect x="1" y="2" width="14" height="12" rx="1.5" stroke={color} strokeWidth="1.2"/>
    <path d="M5.5 2v12" stroke={color} strokeWidth="1.2"/>
  </svg>
);

export const IconCommand: React.FC<IconProps> = ({ size = defaultProps.size, color = defaultProps.color, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <path d="M3.5 6V3.5a2 2 0 114 0V6M8.5 6V3.5a2 2 0 114 0V6M3.5 10v2.5a2 2 0 104 0V10M8.5 10v2.5a2 2 0 104 0V10M3.5 6h9v4h-9z" stroke={color} strokeWidth="1.2"/>
  </svg>
);

export function getFileIcon(fileName: string, size = 14): React.ReactNode {
  if (fileName.endsWith('.swift')) return <IconSwift size={size} />;
  if (fileName.endsWith('.ts') || fileName.endsWith('.tsx')) return <IconTS size={size} />;
  if (fileName.endsWith('.js') || fileName.endsWith('.jsx')) return <IconJS size={size} />;
  if (fileName.endsWith('.html')) return <IconHTML size={size} />;
  if (fileName.endsWith('.css')) return <IconCSS size={size} />;
  if (fileName.endsWith('.json') || fileName.endsWith('.xliner')) return <IconJSON size={size} />;
  if (fileName.endsWith('.md')) return <IconMarkdown size={size} />;
  return <IconFile size={size} color="#808080" />;
}
