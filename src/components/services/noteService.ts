import axios from "axios";
import type {Note, NoteTag} from "../../types/note";

export interface FetchNotesResponse{
    notes: Note[];
    totalPages: number;
}

interface FetchNotesParams {
    page: number;
    perPage: number;
    search?: string;
}

const api = axios.create({
    baseURL: 'https://notehub-public.goit.study/api', 
    headers: 
    { Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`},
})

export async function fetchNotes(params: FetchNotesParams) : Promise<FetchNotesResponse>{
    const {data} = await api.get<FetchNotesResponse>("/notes",{params})
    
    return data
}

interface CreateNoteParams{
    title: string;
    content: string; 
    tag: NoteTag;
}

export async function createNote(note: CreateNoteParams) : Promise<Note> {
    const {data} = await api.post<Note>("/notes", note);
    
    return data
}

export async function deleteNote(id: string ) : Promise<Note>{
    const {data} = await api.delete<Note>(`/notes/${id}`)
    return data
    
}
