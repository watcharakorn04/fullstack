class Media {
    constructor(info) {
        this.publishDate = info.publishDate;
        this.name = info.name;
    }
}

class Song extends Media {
    constructor(songData) {
        super(songData);
        this.artist = songData.artist;
        this.copies = songData.copies;
    }
}

const mySong = new Song({
    name: "Don't look back in anger",
    artist: "Oasis",
    publishDate: "1996-02-19",
    copies: 1000000
});

console.log(mySong.name);
console.log(mySong);