const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());

app.use(fileUpload({
    createParentPath: true 
}));

app.post('/upload', (req, res) => {
    let EDFile = req.files.file
    EDFile.mv(`./files/${EDFile.name}`,err => {
        if(err) return res.status(500).send({ message : err })
        return res.status(200).send({ message : 'File upload' })
    })
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
