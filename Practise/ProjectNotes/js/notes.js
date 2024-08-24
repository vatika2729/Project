const addNote = document.querySelector("#addNote");
const main = document.querySelector(".main");

addNote.addEventListener('click', () => {
    displayNotes()
})

const saveNotes = () => {
    const notes = document.querySelectorAll('.notes textarea');

    const data = [];
    notes.forEach(
        (note) => {
            data.push(note.value);
        }
    )
    if (data.length === 0) {
        localStorage.removeItem('notes');
    }
    else {

        localStorage.setItem('notes', JSON.stringify(data));
    }

}

// function makeSelectedTextBold() {
//     const selection = window.getSelection();
//     const range = selection.getRangeAt(0);
//     const boldElement = document.createElement('b');

//     // Check if the selection is within the div

//     range.surroundContents(boldElement);

// }

(
    function local() {

        const localNotes = JSON.parse(localStorage.getItem("notes"));
        if (localNotes === null) {
            displayNotes();
        }
        else {

            localNotes.forEach(
                lsNote => {
                    displayNotes(lsNote);
                }
            )
        }


    }
)()



function displayNotes(text = "") {
    const newDiv = document.createElement('div');
    newDiv.classList.add('notes');
    newDiv.innerHTML = ` <div class="header">
                    <i id = 'save' class="tool fa-solid fa-floppy-disk"></i>

                    <i id='remove' class=" tool  fa-solid fa-trash"></i>
                </div>
                <textarea>${text}</textarea>
                <div class="footer">
                <i id='bold' class="tool fa-solid fa-b"></i>
                </div>
                `;

    main.appendChild(newDiv);

    //remove notes

    newDiv.querySelector('#remove').addEventListener('click', (e) => {
        newDiv.remove();

        saveNotes();
    })
    newDiv.querySelector('#save').addEventListener('click', function () {

        saveNotes();
    })
    newDiv.querySelector('textarea').addEventListener('focusout', function () {
        saveNotes();
    })
    newDiv.querySelector('#bold').addEventListener('click', function () {
        const textarea = newDiv.querySelector('textarea');
        document.execCommand('bold');

    })




    saveNotes();


}


