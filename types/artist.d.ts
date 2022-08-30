import { Document, PaginateModel } from "mongoose";

export interface IArtist extends Document { 
    name: string; 
    email: string;
    telephone: string; 
    city: string; 
    state: string; 
    country: string; 
    spotify_id: string; 
    songstats_artist_id: string; 
    isMyArtist: boolean;
    description: string; 
    avatar: string; 
    avatarKey: string;
    user_id: string; 
    created: Date; 
    modified: Date; 
}
export interface IArtistModel<T extends Document> extends PaginateModel<T> { }