;
(function($) {
	$.MsgBox = {
		Alert: function(msg, callback) {
			CreateHTML("alert", msg);
			AlertClickEnter(callback);
		},
		Confirm: function(msg, callbackOk, callbackCancel) {
			CreateHTML("confirm", msg);
			ConfirmClickOk(callbackOk);
			ConfirmClickCancel(callbackCancel);
		},
		Toast: function(msg) {
			var html = '';
			html += "<div class='MsgBoxMask'><span class='ToastMsg'>" + msg + "</span></div>";
			$('body').append(html);
			$('.MsgBoxMask').css({
				position: 'fixed',
				left: 0,
				top: 0,
				width: '100%',
				height: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				background: 'rgba(0,0,0,.0)',
				zIndex: 9999,
			})
			$('.ToastMsg').css({
				backgroundColor: 'rgba(0,0,0,.9)',
				borderRadius: '20px',
				padding: '8px 12px',
				color: '#fff',
				display: 'inline-block',
				fontSize: '0.8rem'
			})
			setTimeout(function() {
				$('.MsgBoxMask').fadeOut('300', function() {
					$(this).remove();
				});
			}, 2000)
		}
	};

	function CreateHTML(type, msg) {
		var html = "";
		html += "<div class='MsgBoxMask'><div class='MsgBox'>";
		html += "<h2 class='MsgContent'>" + msg + "</h2>";
		if (type == 'alert') {
			html += "<p class='MsgOperate'><a class='MsgEnter' href='javascript:void(0)'>确定</a></p>";
		} else if (type == 'confirm') {
			html += "<p class='MsgOperate'><a class='MsgCancel' href='javascript:void(0)'>取消</a><a class='MsgOk' href='javascript:void(0)'>确定</a></p>";
		} else if (type == 'toast') {

		}
		html += "</div></div>"
		$('body').append(html);
		CreateCSS();
	}
	//Css
	function CreateCSS() {
		$(".MsgBoxMask").css({
			position: 'absolute',
			left: 0,
			top: 0,
			width: '100%',
			height: '100%',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			background: 'rgba(0,0,0,.4)',
			zIndex: 9999,
		})
		$(".MsgBox").css({
			width: '80%',
			height: 'auto',
			background: 'white',
			borderRadius: '5px',
			fontSize: '0.8rem',

		})
		$(".MsgTitle").css({
			textAlign: 'center',
			fontSize: '0.875rem',
			fontWeight: 'bold',
			padding: '10px',
		})
		$(".MsgContent").css({
			textAlign: 'center',
			borderBottom: '1px solid #d9d9d9',
			padding: '15px 30px',
		})
		$(".MsgEnter").css({
			color: '#0894EC',
			padding: '13px 0',
			display: 'block',
			textAlign: 'center',
		})
		$(".MsgCancel").parent().css({
			display: 'flex',
			flexDirection: 'row',
		})
		$(".MsgCancel,.MsgOk").css({
			color: '#0894EC',
			padding: '13px 0',
			display: 'block',
			margin: '0 auto',
			textAlign: 'center',
			width: '50%',
		})
		$(".MsgOk").css({
			borderLeft: '1px solid #d9d9d9'
		})
	}

	function AlertClickEnter(callback) {
		$('.MsgEnter').click(function() {
			$('.MsgBoxMask').remove();
			if (typeof callback == 'function') {
				callback();
			}
		});
	}

	function ConfirmClickOk(callbackOk) {
		$('.MsgCancel').click(function() {
			$('.MsgBoxMask').remove();
			if (typeof callbackOk == 'function') {
				callbackOk();
			}
		});
	}

	function ConfirmClickCancel(callbackCancel) {
		$('.MsgOk').click(function() {
			$('.MsgBoxMask').remove();
			if (typeof callbackCancel == 'function') {
				callbackCancel();
			}
		});
	}
})(jQuery)