export interface Recipe {
  _id: string;
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  imageUrl: string;
  dateCreated: string;
  dateUpdate: string;
  _ownerId: string;
  likes: string[];
}
