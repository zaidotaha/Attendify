document.addEventListener('DOMContentLoaded', function () {
    fetch('./news.json')
        .then(response => response.json())
        .then(data => {
            let cardWrapper = document.querySelector(".slide-container");
            data.news.forEach(item => {
                let cardSlide = document.createElement('div');
                cardSlide.classList.add('item'); 
                cardSlide.innerHTML = `
                    <div class="card">
                        <div class="image-content">
                            <span class="overlay"></span>
                            <div class="card-image">
                                <img src="images/${item.image}" alt="" class="card-img">
                            </div>
                        </div>
                        <div class="card-content">
                            <h2 class="name">${item.title}</h2>
                            <p class="description">${item.description}</p>
                        </div>
                    </div>
                `;
                cardWrapper.appendChild(cardSlide);
            });

            // Initialize Owl Carousel after adding slides
            let owl = $('.slide-container');
            owl.owlCarousel({
                loop: true,
                margin: 30,
                responsive: true,
                responsiveClass: true,
                autoplay: true,
                autoplayTimeout: 4000,
                stopOnHover: false,
                navigation: false,
                responsive: {
                    0: {
                        items: 1,
                        nav: false
                    },
                    600: {
                        items: 2,
                        nav: false
                    },
                    1000: {
                        items: 4,
                        nav: true,
                    }
                }
            });

            // Pause the carousel on hover
            $('.card').hover(
                function () {
                    owl.trigger('stop.owl.autoplay');
                },
                function () {
                    owl.trigger('play.owl.autoplay');
                }
            );
        })
        .catch(error => console.error('Error fetching JSON:', error));

});

// Notes Section Javascript

let textareaNote = document.querySelector("#enter-note");
    let addNote = document.querySelector("#add-note");
    let notesDisplay = document.querySelector(".input-display");
    let deleteNote=document.getElementById("delete-note");
    

    

    addNote.addEventListener('click', storeNotesInLocalStorage);

    loadNotesFromLocalStorage();

    function loadNotesFromLocalStorage() {
        let storedNotes = localStorage.getItem("notes");
        if (storedNotes) {
            let notesData = JSON.parse(storedNotes);
            addNoteFunction(notesData);
        }
    }

    function storeNotesInLocalStorage() {
        let textNote = textareaNote.value.trim();
    
        if (textNote !== "") {
            let storedNotes = localStorage.getItem("notes");
            let notesData = storedNotes ? JSON.parse(storedNotes) : [];
            let timestamp = new Date().getTime().toString(); 
            notesData.push({ text: textNote, identifier: timestamp });
            localStorage.setItem("notes", JSON.stringify(notesData));
            addNoteFunction(notesData);
        } else {
            alert("Note is Empty");
        }
    }
    
    




    function addNoteFunction(notesData) {
        notesDisplay.innerHTML = "";
        notesData.forEach((note, index) => {
            let newNote = document.createElement("div");
            newNote.classList.add("note");
            newNote.innerHTML = `
                <input type="checkbox" name="delete" class="check-note" data-identifier="${note.identifier}">
                <p>${note.text}</p>
            `;
            notesDisplay.appendChild(newNote);
        });
        textareaNote.value = "";
    }

    deleteNote.addEventListener('click',displayCheckboxAndConfirmBtn);

    let confirmCheckBox = document.getElementById("confirm-delete-code");

    function displayCheckboxAndConfirmBtn(){
        let checkboxes = document.querySelectorAll(".check-note");
    
        checkboxes.forEach(function (checkbox) {
            checkbox.style.display = checkbox.style.display === "block" ? "none" : "block";
        });
    
        confirmCheckBox.style.display = confirmCheckBox.style.display === "block" ? "none" : "block";
    }




    

    
    confirmCheckBox.addEventListener('click', () => {
        let checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
        
    
        // Get the unique identifiers of checked checkboxes
        let checkedIdentifiers = Array.from(checkboxes)
            .map(checkbox => checkbox.getAttribute("data-identifier"));
    
        if (checkedIdentifiers.length > 0) {
            let storedNotes = localStorage.getItem("notes");
    
            if (storedNotes) {
                let notesData = JSON.parse(storedNotes);
    
                // Filter out the checked notes
                notesData = notesData.filter(note => !checkedIdentifiers.includes(note.identifier.toString()));
    
                // Update local storage with the modified notesData
                localStorage.setItem("notes", JSON.stringify(notesData));
    
                // Refresh the displayed notes
                loadNotesFromLocalStorage();
    
                // Hide the confirmation checkbox and checkboxes
                confirmCheckBox.style.display = "none";
                checkboxes.forEach(function (checkbox) {
                    checkbox.style.display = "none";
                });
            }
        } else {
            alert("Please select notes to delete.");
        }
    });    