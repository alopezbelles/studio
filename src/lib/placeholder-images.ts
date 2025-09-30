import data from './placeholder-images.json';

export type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  links: {
    label: string;
    url: string;
  }[];
};

export const projectsData: Project[] = data.projects;
