import { NavigatorService } from './../../home/services/navigator.service';
import { Injectable } from '@angular/core';
import { Database, child, getDatabase, off, onValue, push, ref, update } from 'firebase/database';
import { noteInstance } from '../interfaces/noteTemplate';
import { Router } from '@angular/router';
import { Notes } from '../interfaces/notes';
import { Interaction } from '../interfaces/interaction';
import { Sharing } from '../interfaces/sharing';
import { Unsubscribe } from 'firebase/app-check';

@Injectable()
export class NotesService {
    db: Database = getDatabase()
    
    notes2: noteInstance[] = 
    [   
        {
            type: "title",
            value: "This is the title",
            content: []
        },
        {
            type: "subHeading",
            value: "This is the subheading",
            content: [],
            subHeadingType: 1
        },
        {
            type: "subHeading",
            value: "This is the subheading",
            content: [],
            subHeadingType: 2
        },
        {
            type: "subHeading",
            value: "This is the subheading <span class=\"mathquill\">x^3 </span> hello",
            content: [],
            subHeadingType: 3
        },
        {
            type: "divider",
            value: "",
            content: []
        },
        {
            type: "text",
            value: "This is the subheading <span class=\"mathquill\">x^3 </span> ",
            content: []
        },
        {
            type: "page",
            value: "-Nd5uHU-H97hrfUZJw28",
            content: []
        },        
        {
            type: "numberedPoint",
            value: "This is the bullet point",
            content: [
                {
                    type: "numberedPoint",
                    value: "This is the bullet point1",
                    content: []
                }
            ]
        },        
        {
            type: "numberedPoint",
            value: "This is the bullet point",
            content: [
                {
                    type: "numberedPoint",
                    value: "This is the bullet point1",
                    content: []
                }
            ]
        },        
        {
            type: "numberedPoint",
            value: "This is the bullet point",
            content: [
                {
                    type: "numberedPoint",
                    value: "This is the bullet point1",
                    content: []
                }
            ]
        },        
        {
            type: "numberedPoint",
            value: "This is the bullet point",
            content: [
                {
                    type: "numberedPoint",
                    value: "This is the bullet point1",
                    content: []
                }
            ]
        },        
        {
            type: "numberedPoint",
            value: "This is the bullet point",
            content: [
                {
                    type: "numberedPoint",
                    value: "This is the bullet point1",
                    content: []
                }
            ]
        },
        {
            type: 'image',
            value: 'data:image/png;base64,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',
            content: [],
            width: 300
        },
        {
            type: 'iframe',
            value: 'https://www.youtube.com/embed/kGEqaX4Y4bQ',
            content: [],
            width: 300
        },
        {
            type: "numberedPoint",
            value: "This is the bullet point",
            content: []
        },
        {
            type: "toDoList",
            value: "This is the subheading",
            content: [],
            open: false
        },
        {
            type: "pageToggle",
            value: "-Nd5uHU-H97hrfUZJw28",
            open: false, 
        	content: [        
                {
                    type: "page",
                    value: "-Nd5uHU-H97hrfUZJw28",
                    content: []
                }
            ]
        },
        {
            type: "toggle",
            value: "This is the toggle",
            open: false, 
            confidenceLevel: [0, 0, 0],
        	content: [        
                {
                    type: "toggle",
                    value: "This is the toggle",
                    open: false,
                    content: [
                        {
                            type: "text",
                            value: "This is the subheading",
                            content: []
                        },
                    ]
                }
            ]
        },
        {
            type: "bulletPoint",
            value: "This is the bullet point",
            content: [
                {
                    type: "bulletPoint",
                    value: "This is the bullet point1",
                    content: [
                        {
                            type: "bulletPoint",
                            value: "This is the bullet point1",
                            content: []
                        },
                    ]
                },
                {
                    type: "bulletPoint",
                    value: "This is the bullet point2",
                    content: []
                }
            ]     
        },
        {
            type: "bulletPoint",
            value: "This is the bullet point",
            content: [
                {
                    type: "bulletPoint",
                    value: "This is the bullet point3",
                    content: []
                },
                {
                    type: "bulletPoint",
                    value: "This is the bullet point4",
                    content: []
                }
            ]     
        },
//         {
//             type: 'repl',
//             value: `import numpy as np
// a = np.array([1, 2]) * 2
// print(a)
// print('hello world')`,
//             lastOutput: `<div _ngcontent-ynv-c44="" id="out-llu18tcfkhav7ao252d"><py-script output="out-llu18tcfkhav7ao252d" id="py-a399ba2d-8283-d360-d7d0-da5ee01ce056" output-mode="append"><div class="parentBox flex flex-col mx-8"></div></py-script><div id="out-llu18tcfkhav7ao252d-2">[2 4]</div><div id="out-llu18tcfkhav7ao252d-3">
//                 </div><div id="out-llu18tcfkhav7ao252d-4">hello world</div><div id="out-llu18tcfkhav7ao252d-5">
//                 </div></div>`,
//             content: []
//         },
//         {
//             type: 'repl',
//             value: `import numpy as np
// a = np.array([1, 2]) * 2
// print(a)
// print('hello world')`,
//             content: [],
//         }
    ];

    // Initialises the classes to manipulate the notes
    notes: Notes;
    interaction: Interaction;
    sharing: Sharing;
    
    notesIdPath: string[] = ['']
    notesId: string = ''

    // Unsubscribe listener
    getNotesUnsubscribe: Unsubscribe | undefined = undefined;

    constructor(private router: Router, private navigatorService: NavigatorService) {
        // if (arguments.length === 1) {
        //     this.notes = new Notes(arguments[0])
        // }else{
        //     this.notesIdPath = this.router.url.replace('/Notes/', '').split('/');
        //     this.notesId = this.notesIdPath[this.notesIdPath.length - 1]
        //     this.getNotes()
        //     this.updateNotes()
        // }
    }

    setup(notes: noteInstance[] | undefined, editingStatus?: boolean){
        // Creates new instances of the classes
        this.notes = new Notes([])
        this.interaction = new Interaction(this.notes, editingStatus)

        // If notes need to be retrieved from the database
        if (notes == undefined){
            // Gets the note id from the url
            this.notesIdPath = this.router.url.replace('/Notes/', '').split('/');
            this.notesId = this.notesIdPath[this.notesIdPath.length - 1]
            
            this.sharing = new Sharing()

            this.getNotes()
            // this.notes.setNotes(this.notes2)
            this.updateNotes() 

        // If the notes have been passed directly to the component
        }else{
            this.notes.setNotes(notes)
        }
    }

    getUserId(){
        return JSON.parse(localStorage.getItem('user')!)?.uid
    }

	getNotes(){
        this.notes.setNotes(this.notes2)

        // const userId = this.getUserId()

        // // Function to retrieve the notes
        // const retrieveNotes = (permissionLevel: string) => {

        //     // Unsubscribes from any current note getting listeners
        //     // Prevents memory leaks or unwanted behaviour
        //     if(this.getNotesUnsubscribe != undefined){
        //         this.getNotesUnsubscribe()
        //     }

        //     // Sets the permission level in the interaction class (prevents interaction if not allowed)
        //     if(permissionLevel == "Editor" || permissionLevel == "Owner") this.interaction.setEditingStatus(true)
        //     else this.interaction.setEditingStatus(false)

        //     // If the user has access, then the notes are retrieved from firebase
        //     if(permissionLevel != 'noAccess'){
        //         this.getNotesUnsubscribe = onValue(ref(this.db, `notes/${this.notesId}`), (notes) => {
        //             this.notes.setNotes(notes.val());
        //         })

        //     // If the user does not have access they see a message instead of the notes
        //     }else{
        //         this.notes.setNotes([{type: 'title', value: 'You do not have access to this file', content: []}])
        //     }
        // }

        // // Passes the function as a callback to the permission level method
        // this.sharing.getPermissionLevel(this.notesId, userId, retrieveNotes)

        // this.sharing.getPermissionLevelSnapshot(this.notesId, userId).then((permissionLevel) => {
        //     // Gets the notes
        //     onValue(ref(this.db, `notes/${this.notesId}`), (notes) => {
        //         // If the user has access then render them
        //         if(permissionLevel != 'noAccess'){
        //             this.notes.setNotes(notes.val());

        //         // Otherwise do not
        //         }else{
        //             this.notes.setNotes([{type: 'title', value: 'You do not have access to this file', content: []}])
        //         }
        //     });
        // })
	}

    updateNotes(){
    //     // Repeats every 2 seconds
    //     setInterval(() => {

    //         // Updates the notes
    //         let updates: {[key: string]: noteInstance[]} = {}
    //             if(this.notes.value.length != 0){
    //                 updates[`notes/${this.notesId}/`] = this.notes.value
    //             }
    //         update(ref(this.db), updates)
    //     }, 2000);            
    }

    async getTitleFromPageId(pageId: string){
        return new Promise<string>((resolve) => {
            //  Retrieves the notes and then extracts the title from it
            onValue(ref(this.db, `notes/${pageId}`), (notes) => {
                if (notes.exists()) {
                    resolve(notes.val()[0].value)
                }
                resolve('Page not found')
            }, {onlyOnce: true});
        })
    }

    createNewPage(){
        // Gets a new key for a note
        const noteId = push(child(ref(this.db), 'notes')).key
        const userId = this.getUserId()

        // Updates the notes, and the many to many intermediatary sections
        const updates: { [key: string]: any } = {}
        updates[`notes/${noteId}`] = [{type: 'title', value: 'Untitled'}, {type: 'text', value: ''}]
        updates[`users-notes/${userId}/${noteId}`] = "Owner"
        updates[`notes-users/${noteId}/${userId}`] = true

        // Performs the update
        update(ref(this.db), updates).then(() => {

            // Moves to the new page
            if(noteId != null) this.navigatorService.moveToChildNotes(noteId)
        })

        return noteId
    }
}
