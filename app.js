const fs = require('fs')
const validator = require('validator');
// const getNotes = require('./notes.js')
const notes_utility = require('./notes.js')
const chalk = require('chalk');
const yargs = require('yargs');
const { argv, title } = require('process');
const { saveNotes } = require('./notes.js');
const { boolean } = require('yargs');
// const notes = getNotes()
// console.log(yargs.argv)

//add operation
yargs.command({
    command:'add',
    describe:'this is to add',
    builder:{
        title:{
            describe:'This is add title',
            demandOption:true,
            type:'string'

        },
        body:{
            describe:'This is the body of add',
            demandOption:true,
            type:'string'
        }
    },
    handler: function(argv) {
         
        notes_utility.addNotes(argv.title,argv.body);
        
    }
}).parse();



yargs.command({
    command:'read',
    describe:'This command is used read the notes',
    handler:function(){
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        // const data = dataJSON.parse
        console.log(dataJSON);
    }
}).parse()


//sample command to run this application :
// nodemon app.js delete --title="some title present in notes"
//In the above code we can use node instead of nodemon
//In the above code delete is the command and title(which is option) is the one which we included in the builder(which is options)
// argv in handler consists of the input given through terminal in this case title which is mentoined in the
// builder
yargs.command({
    command:'delete',
    builder:{
        title:{
            describe:'this title is deleted',
            demandOption:true,
            type:'String'
        }
     },
    describe:'this command is used to delete the notes',
    handler:function(argv){
        const dataBuffer = fs.readFileSync('notes.json');
        const dataString = JSON.parse(dataBuffer);
        // console.log(dataString[6]);
        // console.log(dataString.length);
        var flag = false;
        for(var i =0 ; i<dataString.length;i++){
                 if(dataString[i].title==argv.title){
                    dataString.splice(i,i);
                    saveNotes(dataString);  
                    flag=true;
                 }       
        }
        if(flag==true){
            console.log(chalk.green("Notes removed"));  
        }
        else{
            console.log(chalk.red("Notes not avaliable"));   
        }
    }
}).parse()

//update pending
yargs.command({
    command:'update',
    builder:{
        title:{

        }
    }
})

