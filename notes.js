const fs = require('fs');

const getNotes = function(){
    return "your notes.."
}

loadNotes()
{
    try{
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    // console.log(JSON.parse(dataJSON));
    return JSON.parse(dataJSON)
    }

    catch(e){
        return []
    }   
};

addNotes(title,body)
{
    const notes = loadNotes();
    notes.push({
        title:title,
        body: body
    });
    saveNotes(notes);
};


saveNotes(notes)
{
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync("notes.json",dataJSON);
};

module.exports={
    'getNotes':getNotes,
    'addNotes':addNotes,
    'saveNotes':saveNotes
}