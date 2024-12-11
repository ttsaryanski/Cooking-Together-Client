export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  created_at: string;
  updatedAt: string;
  recipes: string[];
}

export interface UserForAuth {
  _id: string;
  username: string;
  email: string;
  password: string;
  profilePicture: UserPic;
}

export interface ProfileDetails {
  username: string;
  email: string;
  profilePicture: UserPic;
}

export interface UserPic {
  fileName: string;
  fileUrl: string;
}
