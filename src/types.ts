export interface SocialMedia {
  id: string;
  name: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  githubUrl: string;
}

export interface PortfolioData {
  name: string;
  shortBio: string;
  about: {
    profilePicture: string;
    description: string;
    skills: string[];
    interests: string[];
  };
  projects: Project[];
  socialMedia: SocialMedia[];
}