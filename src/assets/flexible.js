// /**
//  * @DESCRIPTION 移动端页面适配解决方案 v1.0
//  * @AUTHOR      Night
//  * @DATE        2018年08月01日
//  */
// (function(window, document){
//     var docEle = document.documentElement,
//         dpr    = window.devicePixelRatio || 1,
//         scale  = 1 / dpr;
    
//     var fontSizeRadio = 1, //手机字体正常比例
//         isLandscape   = false;//是否横屏
    
//     ///////////////////////// viewport start //////////////////////////////////
    
//     //设置页面缩放比例并禁止用户手动缩放
//     document.getElementsByName('viewport')[0].setAttribute('content','width=device-width,initial-scale='+scale+',maximum-scale='+scale+',minimum-scale='+scale+',user-scalable=no');
    
// 	///////////////////////// viewport end //////////////////////////////////
    
//     //横屏状态检测
//     if (window.orientation === 90 || window.orientation === -90) {
//         isLandscape = true;
//     };

//     ///////////////////// system font-size check start //////////////////////
    
//     //试探字体大小，用于检测系统字体是否正常
//     var setFz = '100px';

//     //给head增加一个隐藏元素
//     var headEle = document.getElementsByTagName('head')[0],
//         spanEle = document.createElement('span');
//         spanEle.style.fontSize = setFz;
//         spanEle.style.display = 'none';
//         headEle.appendChild(spanEle);

//     //判断元素真实的字体大小是否setFz
//     //如果不相等则获取真实的字体换算比例
//     var realFz = getComputedStyle(headEle).getPropertyValue('font-size');

//     if(setFz !== 'realFz'){
//         //去掉单位px，下面要参与计算
//         setFz = parseFloat(setFz);
//         realFz = parseFloat(realFz);

//         //获取字体换算比例
//         fontSizeRadio = setFz / realFz;
//     };
    
//     ///////////////////// system font-size check end //////////////////////
    
//     var setBaseFontSize = function(){
//         var deviceWidth = docEle.clientWidth,
//             deviceHeight= docEle.clientHeight;
        
//         if(isLandscape){
//             deviceWidth = deviceHeight;
//         };
        
//         docEle.style.fontSize = deviceWidth * fontSizeRadio + 'px';
//     };
//     setBaseFontSize();
    
//     //页面发生变化时重置font-size
//     //防止多个事件重复执行，增加延迟300ms操作(防抖)
//     var tid;
//     window.addEventListener('resize', function() {
//         clearTimeout(tid);
//         tid = setTimeout(setBaseFontSize, 300);
//     }, false);
//     window.addEventListener('pageshow', function(e) {
//         if (e.persisted) {
//             clearTimeout(tid);
//             tid = setTimeout(setBaseFontSize, 300);
//         };
//     }, false);
    
// })(window, document);
(function(win, lib) {
    var doc = win.document; //当前文档对象
    var docEl = doc.documentElement; //文档对象根元素的只读属性
    var metaEl = doc.querySelector('meta[name="viewport"]');
    var flexibleEl = doc.querySelector('meta[name="flexible"]');
    var dpr = 0;
    var scale = 0;
    var tid;
    var flexible = lib.flexible || (lib.flexible = {});
 
    if (metaEl) { 
    //当meta中viewport的标签设置了scale时，将根据scale手动设置dpr
        console.warn('将根据已有的meta标签来设置缩放比例');
        var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
        if (match) {
            scale = parseFloat(match[1]);
            dpr = parseInt(1 / scale);
        }
    } else if (flexibleEl) {   
    //当meta中flexible的标签存在时，据此设置dpr
        var content = flexibleEl.getAttribute('content');
        if (content) {
            var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
            var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);
            if (initialDpr) {
                dpr = parseFloat(initialDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));    
            }
            if (maximumDpr) {
                dpr = parseFloat(maximumDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));    
            }
        }
    }

    if (!dpr && !scale) { 
    //根据js获取到的devicePixelRatio设置dpr及scale，scale是dpr的倒数
        var isAndroid = win.navigator.appVersion.match(/android/gi);
        var isIPhone = win.navigator.appVersion.match(/iphone/gi);
        var devicePixelRatio = win.devicePixelRatio;
        if (isIPhone) {
            // iOS下，对于2和3的屏，分别用2和3倍方案
            if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {                
                dpr = 3;
            } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
                dpr = 2;
            } else {
                dpr = 1;
            }
        } else {
            // 其他设备下，仍旧使用1倍的方案
            dpr = 1;
        }
        scale = 1 / dpr;
    }

    docEl.setAttribute('data-dpr', dpr);
    //文本字号不建议使用rem，flexible适配方案中，文本使用px作为单位，使用[data-dpr]属性来区分不同dpr下的文本字号
    
    if (!metaEl) {
    //添加meta标签，设置name为viewport，content根据scale设置缩放比(默认、最大、最小缩放比)
        metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
        if (docEl.firstElementChild) {
            docEl.firstElementChild.appendChild(metaEl);
        } else {
            var wrap = doc.createElement('div');
            wrap.appendChild(metaEl);
            doc.write(wrap.innerHTML);
        }
    }

    function refreshRem(){
        //更新rem值
        var width = docEl.getBoundingClientRect().width;
        if (width / dpr > 540) {
            width = 540 * dpr;
        }
        var rem = width / 10; //1rem = viewWidth / 10
        docEl.style.fontSize = rem + 'px';
        flexible.rem = win.rem = rem;
    }
    
    //resize与pageshow延时300ms触发refreshRem(),使用防抖函数，防止事件被高频触发可能引起性能问题
    win.addEventListener('resize', function() {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }, false);
    win.addEventListener('pageshow', function(e) {
        //当一条会话历史纪录被执行的时候触发事件，包括后退/前进按钮，同时会在onload页面触发后初始化页面时触发
        if (e.persisted) {//表示网页是否来自缓存
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);

    //在html文档加载和解析完成后设置body元素字体大小
    if (doc.readyState === 'complete') {
        doc.body.style.fontSize = 12 * dpr + 'px';
    } else {
        doc.addEventListener('DOMContentLoaded', function(e) {
            doc.body.style.fontSize = 12 * dpr + 'px';
        }, false);
    } 
    //浏览器有最小字体限制，css在pc上font-size是12px(移动端最小是8px), 也就是css像素是12，其DPR为1，在移动端dpr有可能为2和3，为了保证字体不变小，需要用12*dpr进行换算。
   
    refreshRem();

   //实现rem与px相互转换
    flexible.dpr = win.dpr = dpr;
    flexible.refreshRem = refreshRem;
    flexible.rem2px = function(d) {
        var val = parseFloat(d) * this.rem;
        if (typeof d === 'string' && d.match(/rem$/)) {
            val += 'px';
        }
        return val;
    }
    flexible.px2rem = function(d) {
        var val = parseFloat(d) / this.rem;
        if (typeof d === 'string' && d.match(/px$/)) {
            val += 'rem';
        }
        return val;
    }

})(window, window['lib'] || (window['lib'] = {}));