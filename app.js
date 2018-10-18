const express = require("express")
const multer = require("multer")
const fs = require("fs")

const port = 3000;
const publicPath = "public/";
const uploadPath = './public/uploads';

const app = express();
app.use(express.static(publicPath));
const upload = multer({dest: uploadPath})


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
        response.send(`<h1>Welcome to Kenziegram!</h1>

        <form method="post" action="http://localhost:3000/uploads" enctype="multipart/form-data">
            <div>
                <label for="file">Chose a file</label>
                <input type="file" id="file" name="myFile">
            </div>

            <div>
                <button type="submit">Send the file</button>

                </div>
        </form>
        ${pictureDisplayer(uploadedFiles)}
        
        `);
    });
})

app.post('/uploads', upload.single('myFile'), function (request, response, next) {
    console.log("Uploaded: " + request.file.filename);
    uploadedFiles.push(request.file.filename);
    response.end(`<a href="/">Go Back</a> <img src="uploads/${request.file.filename}"/`);
// response.end(`${<fieldset><form action="/"><input type="submit" value="Go Back"/></form></fieldset>}`);
})

app.listen(port);
