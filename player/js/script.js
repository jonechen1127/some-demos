(function($) {
    // Settings
    var repeat = localStorage.repeat || 0,
        shuffle = localStorage.shuffle || 'false',
        continous = true,
        autoplay = true,
        playlist = [{
            title: '婚礼的祝福',
            artist: '刘维&薛之谦',
            album: '蒙面唱将猜猜猜 第二季 第6期',
            cover: 'http://img3.kuwo.cn/star/starheads/120/16/71/4223615150.jpg',
            mp3: 'http://other.web.nf01.sycdn.kuwo.cn/resource/n1/44/29/2971944896.mp3',
            aac: 'http://other.web.nf03.sycdn.kuwo.cn/resource/a3/78/81/2294851147.aac'
        }, {
            title: '消愁',
            artist: '毛不易',
            album: '明日之子 第七期',
            cover: 'http://img3.kuwo.cn/star/starheads/120/80/56/3605461691.jpg',
            mp3: 'http://other.web.ri01.sycdn.kuwo.cn/resource/n3/29/38/2466852912.mp3',
            aac: 'http://other.web.ri03.sycdn.kuwo.cn/resource/a1/32/49/3446833267.aac'
        }, {
            title: '凉凉-(电视剧《三生三世十里桃花》片尾曲)',
            artist: '张碧晨&杨宗纬',
            album: '三生三世十里桃花 全辑OST-(电视剧原声带)',
            cover: 'http://img3.kuwo.cn/star/starheads/120/6/72/3732390216.jpg',
            mp3: 'http://other.web.ri01.sycdn.kuwo.cn/resource/n2/7/74/3534295894.mp3',
            aac: 'http://other.web.ri03.sycdn.kuwo.cn/resource/a2/93/46/2240767882.aac'
        }, {
            title: '过客',
            artist: '阿涵',
            album: '过客',
            cover: 'http://img3.kuwo.cn/star/starheads/120/25/66/3218202916.jpg',
            mp3: 'http://other.web.ri01.sycdn.kuwo.cn/resource/n1/62/12/1654337042.mp3',
            aac: 'http://other.web.ri03.sycdn.kuwo.cn/resource/a1/77/92/360662073.aac'
        }, {
            title: '偏偏喜欢你',
            artist: '陈百强',
            album: '偏偏喜欢你',
            cover: 'http://img4.kuwo.cn/star/starheads/120/18/67/2625134068.jpg',
            mp3: 'http://other.web.ra01.sycdn.kuwo.cn/resource/n1/128/2/40/3497802622.mp3',
            aac: 'http://other.web.ra03.sycdn.kuwo.cn/resource/a1/62/2/3145969434.aac'
        }, {
            title: '夜空中最亮的星',
            artist: '逃跑计划',
            album: '逃跑计划',
            cover: 'http://img3.kuwo.cn/star/starheads/120/56/57/185452204.jpg',
            mp3: 'http://other.web.re01.sycdn.kuwo.cn/resource/n1/49/32/1391843923.mp3',
            aac: 'http://other.web.re03.sycdn.kuwo.cn/resource/a3/23/54/2606464641.aac'
        }];

    // Load playlist
    for (var i = 0; i < playlist.length; i++) {
        var item = playlist[i];
        $('#playlist').append('<li>' + item.title + ' - ' + item.artist + '</li>');
    }

    var time = new Date(),
        currentTrack = shuffle === 'true' ? time.getTime() % playlist.length : 0,
        trigger = false,
        audio, timeout, isPlaying, playCounts;

    var play = function() {
        audio.play();
        $('.playback').addClass('playing');
        timeout = setInterval(updateProgress, 500);
        isPlaying = true;
    }

    var pause = function() {
        audio.pause();
        $('.playback').removeClass('playing');
        clearInterval(updateProgress);
        isPlaying = false;
    }

    // Update progress
    var setProgress = function(value) {
        var currentSec = parseInt(value % 60) < 10 ? '0' + parseInt(value % 60) : parseInt(value % 60),
            ratio = value / audio.duration * 100;

        $('.timer').html(parseInt(value / 60) + ':' + currentSec);
        $('.progress .pace').css('width', ratio + '%');
        $('.progress .slider a').css('left', ratio + '%');
    }

    var updateProgress = function() {
        setProgress(audio.currentTime);
    }

    // Progress slider
    $('.progress .slider').slider({
        step: 0.1,
        slide: function(event, ui) {
            $(this).addClass('enable');
            setProgress(audio.duration * ui.value / 100);
            clearInterval(timeout);
        },
        stop: function(event, ui) {
            audio.currentTime = audio.duration * ui.value / 100;
            $(this).removeClass('enable');
            timeout = setInterval(updateProgress, 500);
        }
    });

    // Volume slider
    var setVolume = function(value) {
        audio.volume = localStorage.volume = value;
        $('.volume .pace').css('width', value * 100 + '%');
        $('.volume .slider a').css('left', value * 100 + '%');
    }

    var volume = localStorage.volume || 0.5;
    $('.volume .slider').slider({
        max: 1,
        min: 0,
        step: 0.01,
        value: volume,
        slide: function(event, ui) {
            console.log(ui)
            setVolume(ui.value);
            $(this).addClass('enable');
            $('.mute').removeClass('enable');
        },
        stop: function() {
            $(this).removeClass('enable');
        }
    }).children('.pace').css('width', volume * 100 + '%');

    $('.mute').click(function() {
        if ($(this).hasClass('enable')) {
            setVolume($(this).data('volume'));
            $(this).removeClass('enable');
        } else {
            $(this).data('volume', audio.volume).addClass('enable');
            setVolume(0);
        }
    });

    // Switch track
    var switchTrack = function(i) {
        if (i < 0) {
            track = currentTrack = playlist.length - 1;
        } else if (i >= playlist.length) {
            track = currentTrack = 0;
        } else {
            track = i;
        }

        $('audio').remove();
        loadMusic(track);
        if (isPlaying == true) play();
    }

    // Shuffle
    var shufflePlay = function() {
        var time = new Date(),
            lastTrack = currentTrack;
        currentTrack = time.getTime() % playlist.length;
        if (lastTrack == currentTrack) ++currentTrack;
        switchTrack(currentTrack);
    }

    // Fire when track ended
    var ended = function() {
        pause();
        audio.currentTime = 0;
        playCounts++;
        if (continous == true) isPlaying = true;
        if (repeat == 1) {
            play();
        } else {
            if (shuffle === 'true') {
                shufflePlay();
            } else {
                if (repeat == 2) {
                    switchTrack(++currentTrack);
                } else {
                    if (currentTrack < playlist.length) switchTrack(++currentTrack);
                }
            }
        }
    }

    var beforeLoad = function() {
        var endVal = this.seekable && this.seekable.length ? this.seekable.end(0) : 0;
        $('.progress .loaded').css('width', (100 / (this.duration || 1) * endVal) + '%');
    }

    // Fire when track loaded completely
    var afterLoad = function() {
        if (autoplay == true) play();
    }

    // Load track
    var loadMusic = function(i) {
        var item = playlist[i],
            newaudio = $('<audio>').html('<source src="' + item.mp3 + '"><source src="' + item.aac + '">').appendTo('#player');

        $('.cover').html('<img src="' + item.cover + '" alt="' + item.album + '">');
        $('.tag').html('<strong>' + item.title + '</strong><span class="artist">' + item.artist + '</span><span class="album">' + item.album + '</span>');
        $('#playlist li').removeClass('playing').eq(i).addClass('playing');
        audio = newaudio[0];
        audio.volume = $('.mute').hasClass('enable') ? 0 : volume;
        audio.addEventListener('progress', beforeLoad, false);
        audio.addEventListener('durationchange', beforeLoad, false);
        audio.addEventListener('canplay', afterLoad, false);
        audio.addEventListener('ended', ended, false);
    }

    loadMusic(currentTrack);
    $('.playback').on('click', function() {
        if ($(this).hasClass('playing')) {
            pause();
        } else {
            play();
        }
    });
    $('.rewind').on('click', function() {
        if (shuffle === 'true') {
            shufflePlay();
        } else {
            switchTrack(--currentTrack);
        }
    });
    $('.fastforward').on('click', function() {
        if (shuffle === 'true') {
            shufflePlay();
        } else {
            switchTrack(++currentTrack);
        }
    });
    $('#playlist li').each(function(i) {
        var _i = i;
        $(this).on('click', function() {
            switchTrack(_i);
        });
    });

    if (shuffle === 'true') $('.shuffle').addClass('enable');
    if (repeat == 1) {
        $('.repeat').addClass('once');
    } else if (repeat == 2) {
        $('.repeat').addClass('all');
    }

    $('.repeat').on('click', function() {
        if ($(this).hasClass('once')) {
            repeat = localStorage.repeat = 2;
            $(this).removeClass('once').addClass('all');
        } else if ($(this).hasClass('all')) {
            repeat = localStorage.repeat = 0;
            $(this).removeClass('all');
        } else {
            repeat = localStorage.repeat = 1;
            $(this).addClass('once');
        }
    });

    $('.shuffle').on('click', function() {
        if ($(this).hasClass('enable')) {
            shuffle = localStorage.shuffle = 'false';
            $(this).removeClass('enable');
        } else {
            shuffle = localStorage.shuffle = 'true';
            $(this).addClass('enable');
        }
    });
    $(".liebiao").on("click", function() {
        var $box = $("#playBox");
        if ($box.is(":hidden")) {
            $("#player").css("borderRadius", "0 5px 0 0")
            $box.slideDown();
        } else {
            $("#player").css("borderRadius", "0 5px 5px 0")
            $box.slideUp();
        }
    })
    $(".playback ").on('click', function() {
        if ($(this).hasClass('playing')) {
            $(".cover").addClass('playImg');
            $(".cover").css("animation-play-state", "running")
        } else {
            $(".cover").css("animation-play-state", "paused")
        }
    })
    //收缩展开；
    $(".arrowBar").on('click', function() {
        var $box = $(this).parents('.obx')
        if ($box.hasClass('Off')) {
            $box.removeClass('Off');
            $(this).find("em").addClass('rotage180')
        } else {
            $box.addClass('Off');
            $(this).find("em").removeClass('rotage180')
        }
    });
    $(".rewind,.fastforward,#playlist li").on('click', function(event) {
        $(".cover").css("animation-play-state", "running")
    });
})(jQuery);