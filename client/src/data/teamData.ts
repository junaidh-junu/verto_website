export interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  image: string;
  social: {
    linkedin?: string;
    dribbble?: string;
    behance?: string;
    instagram?: string;
    twitter?: string;
    medium?: string;
    pinterest?: string;
  };
}

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "Creative Director",
    bio: "With over 15 years of experience, Sarah leads our creative vision and ensures we deliver exceptional design solutions.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    social: {
      linkedin: "#",
      dribbble: "#",
      behance: "#",
    },
  },
  {
    id: 2,
    name: "David Chen",
    position: "Lead Designer",
    bio: "David specializes in creating innovative visual identities and user-centered digital experiences.",
    image: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    social: {
      linkedin: "#",
      dribbble: "#",
      instagram: "#",
    },
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    position: "Brand Strategist",
    bio: "Emily helps clients define their brand voice and positioning, translating strategy into compelling visuals.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    social: {
      linkedin: "#",
      twitter: "#",
      medium: "#",
    },
  },
  {
    id: 4,
    name: "Marcus Taylor",
    position: "Print Specialist",
    bio: "Marcus brings expertise in print design and production, ensuring flawless execution of physical materials.",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    social: {
      linkedin: "#",
      behance: "#",
      pinterest: "#",
    },
  },
];
