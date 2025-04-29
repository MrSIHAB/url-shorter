import { Collection, connect } from "@easykv/easykv";

export interface schema {
    _id: string;
    url: string;
}

export const dbConnect = async (URI: string)=> await connect(URI)


export const  urlCollection = new Collection<schema>("url")