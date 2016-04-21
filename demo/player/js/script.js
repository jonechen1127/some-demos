(function($){
	// Settings
	var repeat = localStorage.repeat || 0,
		shuffle = localStorage.shuffle || 'false',
		continous = true,
		autoplay = true,
		playlist = 
	[
		{
			title: 'No.9',
			artist: 'T-ara',
			album: 'No.9',
			cover: 'http://i.gtimg.cn/music/photo/mid_album_300/o/u/004HDA5e2EKYou.jpg',
			mp3: 'http://tsmusic24.tc.qq.com/5026123.mp3',
			ogg: 'http://dxsn.gongzuo.in/bowen/HTML5player/music/jianshangdie.ogg'
		}, {
			title: 'Sexy Love',
			artist: 'T-ara',
			album: 'Sexy Love',
			cover: 'http://i.gtimg.cn/music/photo/mid_album_300/c/C/002JgJ513Wo4cC.jpg',
			mp3: 'http://tsmusic24.tc.qq.com/1842255.mp3',
			ogg: 'http://dxsn.gongzuo.in/bowen/HTML5player/music/yiwangeshebude.ogg'
		}, {
			title: 'monica',
			artist: '张国荣',
			album: 'monica',
			cover: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3086884463,431180580&fm=58',
			mp3: 'http://ra01.sycdn.kuwo.cn/resource/n1/128/44/49/405952040.mp3',
			ogg: 'http://dxsn.gongzuo.in/bowen/HTML5player/music/wokeyibaonima.ogg'
		}, {
			title: '左右手',
			artist: '张国荣',
			album: '左右手',
			cover: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3086884463,431180580&fm=58',
			mp3: 'http://ra01.sycdn.kuwo.cn/resource/n3/128/87/27/3804062217.mp3',
			ogg: 'http://dxsn.gongzuo.in/bowen/HTML5player/music/wokeyibaonima.ogg'
		}, {
			title: '相爱很难',
			artist: '梅艳芳&张学友',
			album: '相爱很难',
			cover: 'http://img2.kuwo.cn/star/starheads/240/35/16/3264993422.jpg',
			mp3: 'http://ra01.sycdn.kuwo.cn/resource/n1/128/53/8/162500835.mp3',
			ogg: 'http://dxsn.gongzuo.in/bowen/HTML5player/music/yiwangeshebude.ogg'
		}, {
			title: '饿狼传说',
			artist: '张学友',
			album: '饿狼传说',
			cover: 'http://img1.kuwo.cn/star/starheads/240/61/54/2102134023.jpg',
			mp3: 'http://tsmusic24.tc.qq.com/1829645.mp3',
			ogg: 'http://dxsn.gongzuo.in/bowen/HTML5player/music/yiwangeshebude.ogg'
		}, {
			title: '回忆里的那个人',
			artist: '李行亮',
			album: '回忆里的那个人',
			cover: 'http://i.gtimg.cn/music/photo/mid_album_300/t/v/000UANCr0aSutv.jpg',
			mp3: 'http://tsmusic24.tc.qq.com/9060715.mp3',
			ogg: 'http://dxsn.gongzuo.in/bowen/HTML5player/music/yiwangeshebude.ogg'
		}, {
			title: '漂洋过海来看你',
			artist: '刘明湘',
			album: '飘洋过海来看你',
			cover: 'http://img.zybus.com/uploads/141114/1-14111416232c63.jpg',
			mp3: 'http://link.hhtjim.com/xiami/1773431302.mp3',
			ogg: 'http://dxsn.gongzuo.in/bowen/HTML5player/music/yiwangeshebude.ogg'
		}, {
			title: '乱世巨星',
			artist: '陈小春',
			album: '乱世巨星',
			cover: 'http://img1.kuwo.cn/star/starheads/240/79/17/1110175.jpg',
			mp3: 'http://tsmusic24.tc.qq.com/3574664.mp3',
			ogg: 'http://dxsn.gongzuo.in/bowen/HTML5player/music/yiwangeshebude.ogg'
		}, {
			title: '相依为命',
			artist: '陈小春',
			album: '相依为命',
			cover: 'http://img1.kuwo.cn/star/starheads/240/79/17/1110175.jpg',
			mp3: 'http://tsmusic24.tc.qq.com/235533.mp3',
			ogg: 'http://dxsn.gongzuo.in/bowen/HTML5player/music/yiwangeshebude.ogg'
		}, {
			title: '偏偏喜欢你',
			artist: '陈百强',
			album: '偏偏喜欢你',
			cover: 'http://img1.kuwo.cn/star/starheads/240/18/67/2625134068.jpg',
			mp3: 'http://ra01.sycdn.kuwo.cn/resource/n1/128/2/40/3497802622.mp3',
			ogg: 'http://dxsn.gongzuo.in/bowen/HTML5player/music/yiwangeshebude.ogg'
		}, {
			title: '走在冷风中',
			artist: '刘思涵',
			album: '走在冷风中',
			cover: 'http://i.gtimg.cn/music/photo/mid_album_300/D/6/0012n4e81OIID6.jpg',
			mp3: 'http://tsmusic24.tc.qq.com/9148669.mp3',
			ogg: 'http://dxsn.gongzuo.in/bowen/HTML5player/music/yiwangeshebude.ogg'
		}, {
			title: '月光',
			artist: '胡彦斌',
			album: '月光',
			cover: 'http://i.gtimg.cn/music/photo/mid_album_300/y/J/002omcrg3nthyJ.jpg',
			mp3: 'http://tsmusic24.tc.qq.com/440404.mp3',
			ogg: 'http://dxsn.gongzuo.in/bowen/HTML5player/music/yiwangeshebude.ogg'
		}, {
			title: '梦缠绵',
			artist: '庄心妍',
			album: '梦缠绵',
			cover: 'http://i.gtimg.cn/music/photo/mid_album_300/n/o/003ytI7z4a0Tno.jpg',
			mp3: 'http://tsmusic24.tc.qq.com/5794664.mp3',
			ogg: 'http://dxsn.gongzuo.in/bowen/HTML5player/music/yiwangeshebude.ogg'
		},
	];

	// Load playlist
	for (var i=0; i<playlist.length; i++){
		var item = playlist[i];
		$('#playlist').append('<li>'+item.title+' - '+item.artist+'</li>');
	}

	var time = new Date(),
		currentTrack = shuffle === 'true' ? time.getTime() % playlist.length : 0,
		trigger = false,
		audio, timeout, isPlaying, playCounts;

	var play = function(){
		audio.play();
		$('.playback').addClass('playing');
		timeout = setInterval(updateProgress, 500);
		isPlaying = true;
	}

	var pause = function(){
		audio.pause();
		$('.playback').removeClass('playing');
		clearInterval(updateProgress);
		isPlaying = false;
	}

	// Update progress
	var setProgress = function(value){
		var currentSec = parseInt(value%60) < 10 ? '0' + parseInt(value%60) : parseInt(value%60),
			ratio = value / audio.duration * 100;

		$('.timer').html(parseInt(value/60)+':'+currentSec);
		$('.progress .pace').css('width', ratio + '%');
		$('.progress .slider a').css('left', ratio + '%');
	}

	var updateProgress = function(){
		setProgress(audio.currentTime);
	}

	// Progress slider
	$('.progress .slider').slider({step: 0.1, slide: function(event, ui){
		$(this).addClass('enable');
		setProgress(audio.duration * ui.value / 100);
		clearInterval(timeout);
	}, stop: function(event, ui){
		audio.currentTime = audio.duration * ui.value / 100;
		$(this).removeClass('enable');
		timeout = setInterval(updateProgress, 500);
	}});

	// Volume slider
	var setVolume = function(value){
		audio.volume = localStorage.volume = value;
		$('.volume .pace').css('width', value * 100 + '%');
		$('.volume .slider a').css('left', value * 100 + '%');
	}

	var volume = localStorage.volume || 0.5;
	$('.volume .slider').slider({max: 1, min: 0, step: 0.01, value: volume, slide: function(event, ui){
		setVolume(ui.value);
		$(this).addClass('enable');
		$('.mute').removeClass('enable');
	}, stop: function(){
		$(this).removeClass('enable');
	}}).children('.pace').css('width', volume * 100 + '%');

	$('.mute').click(function(){
		if ($(this).hasClass('enable')){
			setVolume($(this).data('volume'));
			$(this).removeClass('enable');
		} else {
			$(this).data('volume', audio.volume).addClass('enable');
			setVolume(0);
		}
	});

	// Switch track
	var switchTrack = function(i){
		if (i < 0){
			track = currentTrack = playlist.length - 1;
		} else if (i >= playlist.length){
			track = currentTrack = 0;
		} else {
			track = i;
		}

		$('audio').remove();
		loadMusic(track);
		if (isPlaying == true) play();
	}

	// Shuffle
	var shufflePlay = function(){
		var time = new Date(),
			lastTrack = currentTrack;
		currentTrack = time.getTime() % playlist.length;
		if (lastTrack == currentTrack) ++currentTrack;
		switchTrack(currentTrack);
	}

	// Fire when track ended
	var ended = function(){
		pause();
		audio.currentTime = 0;
		playCounts++;
		if (continous == true) isPlaying = true;
		if (repeat == 1){
			play();
		} else {
			if (shuffle === 'true'){
				shufflePlay();
			} else {
				if (repeat == 2){
					switchTrack(++currentTrack);
				} else {
					if (currentTrack < playlist.length) switchTrack(++currentTrack);
				}
			}
		}
	}

	var beforeLoad = function(){
		var endVal = this.seekable && this.seekable.length ? this.seekable.end(0) : 0;
		$('.progress .loaded').css('width', (100 / (this.duration || 1) * endVal) +'%');
	}

	// Fire when track loaded completely
	var afterLoad = function(){
		if (autoplay == true) play();
	}

	// Load track
	var loadMusic = function(i){
		var item = playlist[i],
			newaudio = $('<audio>').html('<source src="'+item.mp3+'"><source src="'+item.ogg+'">').appendTo('#player');
		
		$('.cover').html('<img src="'+item.cover+'" alt="'+item.album+'">');
		$('.tag').html('<strong>'+item.title+'</strong><span class="artist">'+item.artist+'</span><span class="album">'+item.album+'</span>');
		$('#playlist li').removeClass('playing').eq(i).addClass('playing');
		audio = newaudio[0];
		audio.volume = $('.mute').hasClass('enable') ? 0 : volume;
		audio.addEventListener('progress', beforeLoad, false);
		audio.addEventListener('durationchange', beforeLoad, false);
		audio.addEventListener('canplay', afterLoad, false);
		audio.addEventListener('ended', ended, false);
	}

	loadMusic(currentTrack);
	$('.playback').on('click', function(){
		if ($(this).hasClass('playing')){
			pause();
		} else {
			play();
		}
	});
	$('.rewind').on('click', function(){
		if (shuffle === 'true'){
			shufflePlay();
		} else {
			switchTrack(--currentTrack);
		}
	});
	$('.fastforward').on('click', function(){
		if (shuffle === 'true'){
			shufflePlay();
		} else {
			switchTrack(++currentTrack);
		}
	});
	$('#playlist li').each(function(i){
		var _i = i;
		$(this).on('click', function(){
			switchTrack(_i);
		});
	});

	if (shuffle === 'true') $('.shuffle').addClass('enable');
	if (repeat == 1){
		$('.repeat').addClass('once');
	} else if (repeat == 2){
		$('.repeat').addClass('all');
	}

	$('.repeat').on('click', function(){
		if ($(this).hasClass('once')){
			repeat = localStorage.repeat = 2;
			$(this).removeClass('once').addClass('all');
		} else if ($(this).hasClass('all')){
			repeat = localStorage.repeat = 0;
			$(this).removeClass('all');
		} else {
			repeat = localStorage.repeat = 1;
			$(this).addClass('once');
		}
	});

	$('.shuffle').on('click', function(){
		if ($(this).hasClass('enable')){
			shuffle = localStorage.shuffle = 'false';
			$(this).removeClass('enable');
		} else {
			shuffle = localStorage.shuffle = 'true';
			$(this).addClass('enable');
		}
	});
	$(".liebiao").on("click",function(){
		var $box=$("#playBox");
		if($box.is(":hidden")){
			$("#player").css("borderRadius","0 5px 0 0")
			$box.slideDown();
		}else{
			$("#player").css("borderRadius","0 5px 5px 0")
			$box.slideUp();
		}
	})
	$(".playback ").on('click',function(){
		if ($(this).hasClass('playing')){
			$(".cover").addClass('playImg');
			$(".cover").css("animation-play-state","running")
		}else{
			$(".cover").css("animation-play-state","paused")
		}
	})
	//收缩展开；
	$(".arrowBar").on('click', function() {
		var $box=$(this).parents('.obx')
		if ($box.hasClass('Off')){
			$box.removeClass('Off');
			$(this).find("em").addClass('rotage180')
		}else{
			$box.addClass('Off');
			$(this).find("em").removeClass('rotage180')	
		}
	});
	$(".rewind,.fastforward,#playlist li").on('click', function(event) {
		$(".cover").css("animation-play-state","running")
	});
})(jQuery);