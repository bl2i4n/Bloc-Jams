var createSongRow = function(songNumber, songName, songLength){
    
    var template =
    '<tr class="album-view-song-item">'
    +' <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber    + '</td>'
    +' <td class="song-item-title">' + songName + '</td>'
    +' <td class="song-item-duration">' + songLength + '</td>'
    +'</tr>'
    ;
    var $row = $(template);
    
    var clickHandler = function() {
        var songNumber = $(this).attr('data-song-number');
        
        if(currentlyPlayingSongNumber !== null) {
            //Revert to song number for currently playing song because user started playing new song.
            var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
            currentlyPlayingCell.html(currentlyPlayingSongNumber);
        }
        if(currentlyPlayingSongNumber !== songNumber){
            // Switch from Play -> Pause button to indicate new song playing.
            $(this).html(pauseButtonTemplate);
            currentlyPlayingSongNumber = songNumber;
            currentSongFromAlbum = currentAlbum.songs[songNumber -1];
        } else if (currentlyPlayingSongNumber === songNumber) {
            // Switch from Pause -> Play button to pause currently playing song.
            $(this).html(playButtonTemplate);
            currentlyPlayingSongNumber = null;
            currentSongFromAlbum = null;
        }
    };
    
    var onHover = function(event){
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');
        
        if(songNumber !== currentlyPlayingSongNumber){
            songNumberCell.html(playButtonTemplate);
        }
    };
    var offHover = function(event){
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');
        
        if(songNumber !== currentlyPlayingSongNumber){
            songNumberCell.html(songNumber);
        }
    };
    
    //1
    $row.find('.song-item-number').click(clickHandler);
    //2
    $row.hover(onHover, offHover);
    //3
    return $row;
    
};

//  Selects elements that we want to populate with text dynamically
var $albumTitle = $('.album-view-title');
var $albumArtist = $('.album-view-artist');
var $albumReleaseInfo = $('.album-view-release-info');
var $albumImage = $('.album-cover-art');
var $albumSongList = $('.album-view-song-list');
    

var setCurrentAlbum = function(album){
    currentAlbum = album;
    
    //  Assign values to each part of the album (text, images)
    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);
    // Clear contents of album song list container
    $albumSongList.empty();
    // Build list
    for (var i = 0; i < album.songs.length; i++){
        var $newRow = createSongRow(i+1, album.songs[i].title, album.songs[i].duration);
        $albumSongList.append($newRow);
    }
};

var updatePlayerBarSong = function(){
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);   
};

//need if statement here for checkpoint 13!
//review what this does
//mathematical expression
// Elements to which we'll be adding listeners

// Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

var currentAlbum = null;
//Store state of playing songs
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;

$(document).ready(function() {
    setCurrentAlbum(albumPicasso);   
        // Only target individual song rows during event delegation
        // Change the content from the number to the play button's HTML 
        //event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;    
        // review this implementation
        // conditional that only changes the innerHTML of the table cell when the element does not belong to the currentlyPlayingSong
        //goes back to playButtonTemplate
    
    /*var albums = [albumPicasso, albumMarconi, albumJT];
    var index = 1;
    albumImage.addEventListener("click", function(event){
        setCurrentAlbum(albums[index]);
        index++;
        if(index == albums.length){
            index =0;
        }
    });*/
});