//这段代 主要是获取摄像头的视频流并显示在Video 签中
var canvas = null, context = null, video = null;



 $("#snap").click(function () {
     BrowserInspect();
 });

//开始拍照
function startPat() {
    setTimeout(function () {//防止调用过快
        if (context) {
            context.drawImage(video, 0, 0, 320, 320);
            CatchCode();
        }
    }, 200);
}

//抓屏获取图像流，并上传到服务器
function CatchCode() {
    if (canvas != null) {
        //以下开始编 数据
        var imgData = canvas.toDataURL();
        //将图像转换为base64数据
        var base64Data = imgData;//.substr(22); //在前端截取22位之后的字符串作为图像数据
        //开始异步上
        $.post("saveimg.php", {"img": base64Data}, function (result) {
            printHtml("解析结果：" + result.data);
            if (result.status == "success" && result.data != "") {
                printHtml("解析结果成功！");
            } else {
                startPat();//如果没有解析出来则重新抓拍解析
            }
        }, "json");
    }
}




function BrowserInspect(){
    try {
        canvas = document.getElementById("canvas");
        context = canvas.getContext("2d");
        video = document.getElementById("video");

        var constraints = {audio: false, video: {width: 1280, height: 720, facingMode: "environment"}};

        var promisifiedOldGUM = function (constraints) {

            // First get ahold of getUserMedia, if present
            var getUserMedia = (navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia);

            // Some browsers just don't implement it - return a rejected promise with an error
            // to keep a consistent interface
            if (!getUserMedia) {
                return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
            }

            // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
            return new Promise(function (resolve, reject) {
                getUserMedia.call(navigator, constraints, resolve, reject);
            });

        }

        // Older browsers might not implement mediaDevices at all, so we set an empty object first
        if (navigator.mediaDevices === undefined) {
            navigator.mediaDevices = {};
        }

        // Some browsers partially implement mediaDevices. We can't just assign an object
        // with getUserMedia as it would overwrite existing properties.
        // Here, we will just add the getUserMedia property if it's missing.
        if (navigator.mediaDevices.getUserMedia === undefined) {
            navigator.mediaDevices.getUserMedia = promisifiedOldGUM;
        }


        // Prefer camera resolution nearest to 1280x720.

        navigator.mediaDevices.getUserMedia(constraints)
            .then(function (stream) {
                var video = document.querySelector('video');
                video.src = window.URL.createObjectURL(stream);
                video.onloadedmetadata = function (e) {
                    video.play();
                };
            })
            .catch(function (err) {
                console.log(err.name + ": " + err.message);
            });

    } catch (e) {
        alert("浏览器不支持HTML5 CANVAS");
    }
}