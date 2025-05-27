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
