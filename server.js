const express = require('express');

const app = express();


const albumsData = [
    {
        albumId: "10",
        artistName: "Beyoncé",
        collectionName: "Lemonade",
        artworkUrl100:
            "http://is1.mzstatic.com/image/thumb/Music20/v4/23/c1/9e/23c19e53-783f-ae47-7212-03cc9998bd84/source/100x100bb.jpg",
        releaseDate: "2016-04-25T07:00:00Z",
        primaryGenreName: "Pop",
        url: "https://www.youtube.com/embed/PeonBmeFR8o?rel=0&amp;controls=0&amp;showinfo=0",
    },
    {
        albumId: "11",
        artistName: "Beyoncé",
        collectionName: "Dangerously In Love",
        artworkUrl100:
            "http://is1.mzstatic.com/image/thumb/Music/v4/18/93/6d/18936d85-8f6b-7597-87ef-62c4c5211298/source/100x100bb.jpg",
        releaseDate: "2003-06-24T07:00:00Z",
        primaryGenreName: "Pop",
        url: "https://www.youtube.com/embed/ViwtNLUqkMY?rel=0&amp;controls=0&amp;showinfo=0",
    },
];

app.use(express.json()); // before our routes definition

app.get('/', function (request, response) {
    response.send("hello Express world!")
});

app.get("/albums", function (req, res) {
    res.send(albumsData);
});
app.get("/albums/:albumId", function (req, res) {
    res.send(req.params.albumId);
});
app.post("/albums", function (req, res) {
    const newAlbum = {
        ...req.body,
        "albumId": "13",
        "artistName": "Beyoncé",
        "collectionName": "B'Day (Deluxe Edition)",
        "artworkUrl100": "http://is5.mzstatic.com/image/thumb/Music/v4/6c/fc/6a/6cfc6a13-0633-f96b-9d72-cf56774beb4b/source/100x100bb.jpg",
        "releaseDate": "2007-05-29T07:00:00Z",
        "primaryGenreName": "Pop",
        "url": "https://www.youtube.com/embed/RQ9BWndKEgs?rel=0&amp;controls=0&amp;showinfo=0"
    }
    albumsData.push(newAlbum);
    res.json(albumsData);
});
// app.post("/albums", function (req, res) {
//     res.send("POST /albums route");
// });
// notice .delete
app.delete("/albums/:albumId", function (req, res) {
    const idFilter = req => albumsData => albumsData.albumId === req.params.albumId;
    const idToDelete = albumsData.some(idFilter(req));
    if (idToDelete) {
        res.status(200).json({
            success: true,
            albumsData: albumsData.filter(a => !idFilter(req)(a))

        });
    } else {
        res.status(400).json({ msg: `No album with the id of ${req.params.albumId}` });
    }
});


//Start our server so that it listens for HTTP requests!
app.listen(process.env.PORT || 5000);
