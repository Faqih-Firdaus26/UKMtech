export interface IEducation {
  _id?: string;
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  duration: number;
  instructor?: string;
  instructorDetails?: {
    _id: string;
    name: string;
    image: string;
    expertise?: string[];
    bio?: string;
  };
  content?: string;
  benefits?: string[];
  target_audience?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
} 