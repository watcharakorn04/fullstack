class Song {

    constructor(title, artist) {
        this.title = title;
        this.artist = artist;
    }
}

const mySong = new Song("Bohemian Rhapsody", "Queen");
console.log(mySong)
console.log(typeof mySong);
console.log(mySong.title);
console.log(mySong.artist);