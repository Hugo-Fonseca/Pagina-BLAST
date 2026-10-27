const fileNotes = document.querySelectorAll(".file-note");

fileNotes.forEach((currentNote) => {
  currentNote.addEventListener("toggle", () => {
    if (!currentNote.open) return;

    fileNotes.forEach((otherNote) => {
      if (otherNote !== currentNote) {
        otherNote.open = false;
      }
    });
  });
});