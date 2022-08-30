import { Schema, model } from 'mongoose';
import { IArtistModel, IArtist } from '../../types/artist';
import mongoosePaginate from "mongoose-paginate-v2";

export const ArtistName = 'Artist';
const { Types } = Schema;

const ArtistSchema = new Schema<IArtistModel<IArtist>>({
    name: {
        type: Types.String,
        required: true
    },
    email: {
        type: Types.String,
        required: true
    },
    telephone: {
        type: Types.String,
        required: true
    },
    city: {
        type: Types.String
    },
    state: {
        type: Types.String
    },
    country: {
        type: Types.String
    },
    spotify_id: {
        type: Types.String,
        required: true
    },
    songstats_artist_id: {
        type: Types.String,
    },
    isMyArtist: {
        type: Types.Boolean,
		default: false
    },
    avatar: {
        type: Types.String
    },
    avatarKey: {
        type: Types.String
    },
    user_id: {
        type: Types.String
    },
    description: {
        type: Types.String
    },
    created: {
        type: Types.String,
		default: Date.now()
    },
    modified: {
        type: Types.String,
		default: Date.now()
    }
});

ArtistSchema.plugin(mongoosePaginate as any);

export const Artist = model<IArtist>(ArtistName, ArtistSchema) as IArtistModel<IArtist>;