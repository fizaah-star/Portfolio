export type SkillGroup = {
  title: string;
  items: string[];
};

export type ProjectItem = {
  title: string;
  event: string;
  description: string;
  tags: string[];
  detail: string[];
  accent: 'cyan' | 'violet' | 'blue';
};

export type CertificationItem = {
  title: string;
  organization: string;
  completionDate: string;
  url?: string;
};

export const profile = {
  name: 'Fiza Ahmed',
  role: 'Aspiring AI/ML Engineer',
  heroTitle: "Hi, I'm Fiza Ahmed.",
  heroTagline: 'Exploring Intelligence. Engineering Possibilities.',
  intro:
    "I'm a BCA student specializing in Artificial Intelligence and Machine Learning, passionate about programming, emerging technologies, and building intelligent solutions that make a difference.",
  university: 'Integral University, Lucknow, India',
  degree: 'Bachelor of Computer Applications (BCA)',
  specialization: 'Artificial Intelligence and Machine Learning',
  academicStatus: 'Currently Pursuing – Second Year',
  linkedIn: 'https://www.linkedin.com/in/fiza-ahmed-4686bb383/',
  github: '',
  email: '',
  otherProfile: '',
};

export const socialLinks = {
  linkedin: profile.linkedIn,
  github: profile.github,
  email: profile.email,
  other: profile.otherProfile,
};

export const typingWords = [
  'Aspiring AI/ML Engineer',
  'Java & Python Developer',
  'Technology Enthusiast',
  'Creative Problem Solver',
  'Future Software Engineer',
];

export const skillGroups: SkillGroup[] = [
  {
    title: 'Programming Languages',
    items: ['Java', 'Python', 'JavaScript'],
  },
  {
    title: 'Web Technologies',
    items: ['HTML5', 'CSS3', 'JavaScript'],
  },
  {
    title: 'Technical Knowledge and Training',
    items: [
      'Artificial Intelligence',
      'Machine Learning Fundamentals',
      'Generative AI',
      'Agentic AI',
      'Computer Software Training',
      'Technical Training',
      'Hands-on Training',
    ],
  },
];

export const projects: ProjectItem[] = [
  {
    title: 'AI-Based Face Recognition Attendance System',
    event: 'Smart India Hackathon 2025',
    description:
      'An AI-powered attendance management project concept designed to identify individuals through facial recognition and help automate attendance tracking.',
    tags: ['Artificial Intelligence', 'Face Recognition', 'Computer Vision', 'Automated Attendance', 'Problem Solving'],
    detail: [
      'This project concept focuses on using facial recognition technology to streamline attendance tracking and reduce manual effort in educational or organizational environments.',
      'The idea combines AI-powered identification with practical workflow automation to support more efficient and secure attendance processes.',
      'The goal is to explore how computer vision and intelligent systems can simplify everyday tasks while encouraging innovation in real-world problem solving.',
    ],
    accent: 'cyan',
  },
  {
    title: 'URL-Based Phishing Detection Software',
    event: 'Smart India Hackathon 2025',
    description:
      'A cybersecurity-focused software project designed to analyze URLs and identify potentially suspicious or phishing websites to improve online security awareness.',
    tags: ['Cybersecurity', 'URL Analysis', 'Phishing Detection', 'Intelligent Threat Identification', 'Web Security'],
    detail: [
      'This concept explores intelligent analysis of URLs to flag suspicious patterns that may indicate phishing attempts or malicious websites.',
      'The project aims to create awareness around digital threats by highlighting how security-focused software can help users better evaluate web links before interacting with them.',
      'It reflects a practical interest in cybersecurity, threat detection, and building tools that support safer digital experiences.',
    ],
    accent: 'violet',
  },
];

export const certifications: CertificationItem[] = [
  {
    title: 'Generative AI and Agentic AI',
    organization: 'Softpro India Computer Technologies (P) Ltd.',
    completionDate: 'October 2026',
    url: '',
  },
];

export const learningInterests = [
  'Artificial Intelligence',
  'Machine Learning',
  'Generative AI',
  'Agentic AI',
  'Software Development',
  'Programming',
  'Cybersecurity',
  'Emerging Technologies',
];

export const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];
