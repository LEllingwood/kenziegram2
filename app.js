const express = require("express")
const multer = require("multer")
const fs = require("fs")
const app = express();

const port = 3000;
const publicPath = "public/";
const uploadPath = './public/uploads';

app.use(express.static(publicPath));
const upload = multer({dest: uploadPath})
app.set("views", "./views" )
app.set("view engine", "pug")

const uploadedFiles = [
    'baconCat.jpg',
    "catHead.jpg",
    "dominatingCat.jpeg",
    "flyingCat.jpeg",
]

function pictureDisplayer(imgNames){
    let outputString = "";
    for(let i =0; i < imgNames.length; i++){
    const name = imgNames[i]; 
    console.log(name)
    outputString += `<img src="uploads/${name}" height="300" width="300"/>`
    }
    return outputString
}

app.get("/", function(request, response){
    fs.readdir(uploadPath, function(err, items) {
    	console.log(items);
        response.render("index", {title: "Hey", message: "this is a message", imagePathArray: uploadedFiles});
    });
})

app.post('/uploads', upload.single('myFile'), function (request, response, next) {
    console.log("Uploaded: " + request.file.filename);
    uploadedFiles.push(request.file.filename);
    response.end(`<a href="/">Go Back</a> <img src="uploads/${request.file.filename}"/`);
})

app.listen(port);
