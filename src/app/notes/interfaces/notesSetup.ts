import { noteInstance } from "./noteTemplate";

export interface notesSetup {
    notes?: noteInstance[];
    breadcrumb?: true;
    editing?: true;
    sharing?: true;
    flashcards?: true;
    margin?: true;
}