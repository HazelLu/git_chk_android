/*$(document).on("mobileinit", function (e) {
    $.support.cors = true;
    $.mobile.allowCrossDomainPages = true;
    $.mobile.buttonMarkup.hoverDelay = false;
    $.mobile.loadingMessage = "載入中";
    $.mobile.pageLoadErrorMessage = "載入失敗";
    $.mobile.defaultPageTransition = "none";
    $.mobile.toolbar.prototype.options.backBtnText = "回上一頁";
    $.mobile.touchOverflowEnabled = true;
    $.mobile.defaultHomeScroll = 0;
});*/
var brightness;
var inApp;
var _checkService;
var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener("offline", app._onOffline, false);
        document.addEventListener("online", app._onOnline, false);
        
        document.addEventListener("resume", function(){
           inApp='yes';
             setTimeout(function(){ inApp='no';},3500);
            PushNotification.hasPermission(function(data) {
            if (data.isEnabled) {
                document.getElementById('profile').querySelectorAll('.listview')[2].querySelector('p span').innerText='訊息通知開啟中';
                document.getElementById('profile').querySelectorAll('.listview')[2].querySelector('p span').removeAttribute('class');
            }else{
                 document.getElementById('profile').querySelectorAll('.listview')[2].querySelector('p span').innerText='訊息通知關閉中';
                 document.getElementById('profile').querySelectorAll('.listview')[2].querySelector('p span').className='alert';
            }
         });
        }, false);
       
        document.addEventListener('deviceready', this.onDeviceReady, false);
        window.addEventListener('load', function() {
            new FastClick(document.body);
        }, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {  
        //亮度控制
        //brightness = cordova.plugins.brightness;
        window.addEventListener('native.keyboardshow', function(){$('#footer').hide();});
        window.addEventListener('native.keyboardhide', function(){$('#footer').fadeIn(300);});
        if(window.MobileAccessibility){
            window.MobileAccessibility.usePreferredTextZoom(false);
        }
        inApp='yes';
        //網路狀態
        window.ga.startTrackerWithId('UA-83381211-1');
        window.ga.trackView('Android App Start');
        var networkState = navigator.connection.type;
        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.CELL]     = 'Cell generic connection';
        states[Connection.NONE]     = 'No network connection';
        /*
        cordova.plugins.backgroundMode.setDefaults({ 
            text:'行動管家執行中…',
            title:'今網行動管家',
            ticker:'社區資訊執行中'
        });
        cordova.plugins.backgroundMode.onactivate = function () {

        }
        cordova.plugins.backgroundMode.enable();
        */
        var push = PushNotification.init({ "android": {"senderID": "865338099412","icon":"iconss" }} );  
        socket =io.connect('http://www.kingnetcare.com.tw:8080',{reconnect:true});
        socket.on('connect',function(){  });
            socket.emit('app_Ver',{
                'platform':device.platform,
                'uuid':device.uuid
            });
            //意見回饋

            socket.emit('close_service',{
                'com_id':app._getLocalStorage('comInfo'),
                'service':'1',
                'uuid':device.uuid
            });
            socket.on('close_'+device.uuid,function(msg){
                if(msg=='on'){
                    _checkService='run';
                    document.getElementById('index').querySelector('#feedback_btn img').src='img/index/btn/btn_11.jpg';
                }
            });
            socket.on('and_Ver_'+device.uuid,function(msg){
                if(msg.ver !=_ver){
                    if(msg.uuid==device.uuid){
                        navigator.notification.confirm(
                            msg.note,
                            function (idx) {
                                if(idx==1){
                                    var ref = window.open('https://play.google.com/store/apps/details?id=chk.kingnet.app&hl=zh_TW', '_system', 'location=yes'); 
                                }
                             },
                             '目前已有新版：'+ msg.ver,
                             ['立即更新','下次']
                        );
                    }
                }          
            });
            socket.on('gcmCheck_'+device.uuid,function(msg){
                if(msg=='try'){
                    app._setLocalStorageJson('valid', 'error');
                    setTimeout(function(){
                        if(app._getLocalStorageJson('token') !='emulate' &&  app._getLocalStorageJson('token') !=''){
                         app._registerDevice(app._getLocalStorageJson('token'));
                        }
                    }, 2000) 
                 
                }
            });
            socket.emit('sub_Ad',{
                'uuid':device.uuid
            });
            socket.on('subAd_'+device.uuid,function(msg){
                if(msg.img !=''){
                    var index=document.getElementById('index');
                    index.querySelector('.subAD').className='subAD show';
                    index.querySelector('.subAD img').src=msg.img;
                    index.querySelector('.subAD input').value=msg.id;
                }
            });
       
            socket.on('marquee_'+device.uuid,function(msg){
                var domStr='';
                $.each(JSON.parse(msg), function (i, v) {
                    domStr+='<li class="text">';
                    domStr+='<input type="hidden" value="'+ v.m_linkType +'" />';
                    domStr+='<input type="hidden" value="';
                    domStr+= v.m_linkType=='0' ? v.bd_id:v.url_link;
                    domStr+='"/>';
                    domStr+= v.m_text;
                    domStr+='</li>';
                });
                var _index=_dm.find('#index');
                var textSlider = _index.find('.textSlider');
                textSlider.html(domStr);
                var text = textSlider.append(domStr).children();

                var textHeight = _index.find('.adMarquee').height() * -1;
                var scrollSpeed = 600;
                var speed = 3000 + scrollSpeed;
                 function showad(){
                     var now = Math.round(textSlider.position().top / textHeight);
                     now = (now + 1) % text.length;
                     // textSlider 移動
                     textSlider.animate({
                             top: now * textHeight
                         }, scrollSpeed, function(){
                             if(now == text.length / 2){
                                 textSlider.css('top', 0);
                             }
                     });

                    setTimeout(showad, speed);
                 }
                   _index.find('.marqueeBar').slideDown(400);
                setTimeout(function(){
                    if(JSON.parse(msg).length >1){
                         showad(); 
                    }       
                    
                },1300)
            });

            
            if (app._getLocalStorageJson('com_count') >= 1) {
                socket.emit('get_active',{
                    'uuid':device.uuid,
                    'type':'count'
                });
                socket.on('sendActive_'+device.uuid,function(data) {
                    if(app._getLocalStorage('activeMsg') != data.type && document.querySelector('#index #mymsg_btn span').innerText ==""){
                        document.querySelector('#index #mymsg_btn span').innerText='1';
                        document.querySelector('#index #mymsg_btn span').style.display='block';
                    }
                });
            }
      

        push.on('registration', function(data) {
            app._setLocalStorageJson('token', data.registrationId);   
            app._registerDevice(data.registrationId);

        });
        push.on('notification', function(data) {
            switch(data.message){
                case 'register_device':
                    app._loadingShow();
                    app._getTabletList(function(datas){
                        var tabletVal=JSON.parse(datas)[0];
                        //app._dialog('您的手機已成功開通：'+ tabletVal.tablet_note+'，如有問題請洽管理室。');
                        navigator.notification.alert(
                             '您的手機已成功開通：'+tabletVal.tablet_note+'，如有問題請洽管理室。',
                             function () {
                                socket.emit('get_active_open',{
                                    'uuid':device.uuid,
                                    'type':'dialog'
                                });
                                socket.on('sendActive_open_'+device.uuid,function(data) {
                                    if(app._getLocalStorage('activeMsg') != data.type){
                                        navigator.notification.confirm(
                                            decodeURI(data.dialog),
                                            function (idx) {
                                                if(idx==1){
                                                     app._setLocalStorage('activeMsg',data.type);
                                                      var ref= window.open(data.link, "_blank");
                                                }else{
                                                  if(document.querySelector('#index #mymsg_btn span').innerText ==""){
                                                      document.querySelector('#index #mymsg_btn span').innerText='1';
                                                      document.querySelector('#index #mymsg_btn span').style.display='block';
                                                  }
                                                }
                                             },
                                             '今網行動管家訊息',
                                             ['前往領取','確認']
                                        ); 
                                    }
                                });                      
                             },
                             '今網行動管家訊息',
                             '確認'
                        );
                        setTimeout(function(){app._getUserCommunityList('main');},1000);
                    });                 
                    break;
                default:

                    if(data.message.indexOf('@:') != -1){
                       var txt = data.message.substring(data.message.length-8,data.message.length);
                        _mobile.changePage('adDetail.html', { changeHash: true, data:{'paremeter':txt,'next':'index.html'} });
                    }else{
                        var msgs=data.message.split(']')[0]
                        var arr=msgs.split('-');
                        var msg_sn='';
                        if(arr.length>1){
                            msgs=arr[0] +']';
                            msg_sn=arr[1];
                        }else{
                            msgs=msgs +']';
                        }                 
                        switch(msgs){
                            case '[郵務通知]':
                            case '[退貨通知]':
                            setTimeout(function(){
                                 if(inApp=='no'){
                                    /*
                                    navigator.notification.confirm(
                                    '是否立即前往查閱?',
                                    function(idx){
                                        if(idx==1){
                                            if (app._getLocalStorageJson('com_count') > 1) {
                                                _mobile.changePage('communityList.html', { changeHash: true, data:{'paremeter':'postal.html'} });
                                            } else {  
                                                var url=$.mobile.activePage[0].baseURI.split('/');
                                                if(url[url.length-1].split('?')[0]!='postal.html'){
                                                    _mobile.changePage('postal.html', { changeHash: true, data: { 'paremeter': JSON.parse(app._getLocalStorage('comInfo')).info[0].id } });
                                                }else{  
                                                app._getPostalInfo(JSON.parse(app._getLocalStorage('comInfo')).info[0].id,msgs);                     
                                                    app._getReturnPostalInfo(JSON.parse(app._getLocalStorage('comInfo')).info[0].id);
                                                     
                                                }
                                                app._editPostalNotificationIsRead(JSON.parse(app._getLocalStorage('comInfo')).info[0].id);
                                            } 
                                        }
                                    },
                                    msgs,
                                    ['確定','取消']
                                    );
                                    */
                                  app._commnityAnnouncement('push','postal.html');
                                    var url=$.mobile.activePage[0].baseURI.split('/');
                                     if(url[url.length-1].split('?')[0]=='postal.html'){
                                     app._getPostalInfo($.mobile.activePage[0].baseURI.split('=')[1],msgs);                     
                                     app._getReturnPostalInfo($.mobile.activePage[0].baseURI.split('=')[1]);
                                    }
                                  app._editPostalNotificationIsRead(JSON.parse(app._getLocalStorage('comInfo')).info[0].id);
                                }else{
                                    if (app._getLocalStorageJson('com_count') > 1) {
                                        _mobile.changePage('communityList.html', { changeHash: true, data:{'paremeter':'postal.html'} });
                                    } else {  
                                        var url=$.mobile.activePage[0].baseURI.split('/');
                                        if(url[url.length-1].split('?')[0]!='postal.html'){
                                            _mobile.changePage('postal.html', { changeHash: true, data: { 'paremeter': JSON.parse(app._getLocalStorage('comInfo')).info[0].id } });
                                        }else{
                                            app._getPostalInfo(JSON.parse(app._getLocalStorage('comInfo')).info[0].id,msgs);
                                        }
                                        app._editPostalNotificationIsRead(JSON.parse(app._getLocalStorage('comInfo')).info[0].id);
                                    } 
                                }
                            },300);
                               
                                break;
                            case '[社區公告]':
                                app._setLocalStorage('annNews',''); //清除暫存資料
                                setTimeout(function(){ 
                                    if(inApp=='no'){
                                        app._getBrickTag('#index');
                                    }else{
                                        if (app._getLocalStorageJson('com_count') > 1) {
                                            _mobile.changePage('communityList.html', { changeHash: true, data:{'paremeter':'announcement.html'} });
                                        } else {           
                                            _mobile.changePage('announcement.html', { changeHash: true, data: { 'paremeter': JSON.parse(app._getLocalStorage('comInfo')).info[0].id } });
                                        }
                                    }
                                },300);                
                                break;
                            case '[意見回覆]':
                                setTimeout(function(){ 
                                if(inApp=='no'){
                                     app._commnityAnnouncement('push','feedback.html');
                                }else{
                                    if (app._getLocalStorageJson('com_count') > 1) {
                                        _mobile.changePage('communityList.html', { changeHash: true, data:{'paremeter':'feedback.html'} });
                                    } else {            
                                        _mobile.changePage('feedback.html', { changeHash: true, data: { 'paremeter': JSON.parse(app._getLocalStorage('comInfo')).info[0].id } });
                                    } 
                                }
                                },300);
                                break;
                                                  
                            case '[住戶訊息]':
                            case '[系統訊息]':
                                var tag=msgs=='[住戶訊息]'? '':'system';
                                window.localStorage.removeItem('msgList');
                                setTimeout(function(){
                                    if(inApp=='no'){
                                        var url=$.mobile.activePage[0].baseURI.split('/');
                                        if(url[url.length-1].split('?')[0]=='myMsg.html'){
                                            app._loadingShow();
                                              app._getNotificationRecord($('#myMsg'),tag);
                                        }else{
                                            app._getBrickTag($('#index'));
                                        }    
                                    }else{
                                        _mobile.changePage('myMsg.html', { changeHash: true, data:{'paremeter':tag} });
                                    }

                                },300);
                                                       
                                break;
                            case '[寄放物品]':
                                setTimeout(function(){
                                     if(inApp=='no'){
                                        app._getCollectionCount(function(count){
                                            document.getElementById('index').querySelector('#collection_btn span').innerText=count;
                                            document.getElementById('index').querySelector('#collection_btn span').style.display='block';
                                        });
                                     }else{
                                        var check='';
                                        if(data.message.indexOf('領取') != -1){
                                            check='B';
                                        }
                                        _mobile.changePage('collectionPayment.html', { changeHash: true ,data:{'paremeter':check}});                                        
                                     }
                                },300);
                                break;
                            case '[訊息通知]':
                                if(msg_sn!=''){
                                     _mobile.changePage('adDetail.html', { changeHash: true, data:{'paremeter':msg_sn,'next':'index.html'} });
                                }                        
                                break;
                            case '[挷定取消]':
                            case '[綁定取消]':
                                app._loadingShow();
                                app._dialog(data.message);
                                setTimeout(function(){app._getUserCommunityList('main');},1000);
                                break;
                            case '[管理費通知]':
                                setTimeout(function(){
                                    app._dialog(datas.message);
                                    if(inApp=='no'){
                                       document.getElementById('index').querySelector('#cashflow_btn span').innerText='!';
                                       document.getElementById('index').querySelector('#cashflow_btn span').style.display='block';
                                    }else{
                                        if (app._getLocalStorageJson('com_count') > 1) {
                                            _mobile.changePage('communityList.html', { changeHash: true, data:{'paremeter':'payment.html'} });
                                        }else{
                                            _mobile.changePage('payment.html', { changeHash: true, data: { 'paremeter': JSON.parse(app._getLocalStorage('comInfo')).info[0].id } });
                                        }
                                    }
                                },300);
                                break;
                            case '[好康通知]':
                                _mobile.changePage('myMsg.html', { changeHash: true, data:{'paremeter':'bonus'} });
                                break; 

                            case '[用戶登記]':
                                _mobile.changePage('profile.html', { changeHash: true});
                                break;
                            case '[預約通知]':

                                break;
                            default:
                               // alert(data.message);
                            break;
                        }
                    }
                break;
            }
            // data.message, 
            // data.title, 
            // data.count, 
            // data.sound, 
            // data.image, 
            // data.additionalData 
        });

        push.on('error', function(e) {
            app._setLocalStorageJson('valid', 'error'); 
            app._setLocalStorageJson('token', 'emulate');               
            app._registerDevice('emulate');
        });

        app.receivedEvent('deviceready');
   
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        if(device.model=='iPhone4,1'){
            $.mobile.defaultPageTransition = "none";
        }
        brightness = cordova.plugins.brightness;
        app._getBrightness();
        if(app._getLocalStorageJson('register') == 'yes')
        {
            app._versionUpdate();
        }
        setTimeout(function(){ inApp='no'; },3500);
       // setTimeout(function(){ navigator.splashscreen.hide(); },300);
    },
     _openFile:function(url){

        this._loadingShow();
        cordova.plugins.disusered.open(url, function(){
             app._loadingHide(500);
        }, function(){  
            var file=url.split('/');
            var txt=file[file.length-1].split('.')[1].toLowerCase();
            if(txt=='jpg' || txt=='jpeg' || txt=='png' || txt=='gif'){
                var ref = window.open(url, '_blank', 'location=no');
            }else{
                var ref = window.open('https://docs.google.com/viewer?url='+ encodeURI(url), '_blank', 'location=no');  
            }        
           app._loadingHide(500);
        });      
    }, 
    _ga_trackView:function(id,detail){
        if(detail !=''){
            window.ga.trackView(id,detail);
        }else{
            window.ga.trackView(id); 
        }      
    },
    _ga_trackEvent:function(master,action,lab,val){
        window.ga.trackEvent(master, action, lab, val);
    },
    _setPositionFixed:function(){
        $('#header, #footer').css('position', 'fixed');
    },
    _setPositionAbs:function(){
        $('#header, #footer').css('position', 'absolute');
    }, 
    _setBrightness:function(value){
        brightness.setBrightness(value, function(){}, function(){});
    },
    _getBrightness:function(){
        brightness.getBrightness(app._setBg, function(){});
    },
    _setBg:function(val){
        _getBrightnessVal=val;
    },
    _qrCodeHeader: function(){
        return 'DFixojeXNewds';
    },
    _qrCodeFooter: function(){
        return 'DUdcnGod38HHX';
    },
    //服務連線路徑
    _getWebServiceMethod: function (m) {
        return 'http://www.kingnetcare.com.tw/ajax/app_ws.asmx/' + m;
    },
    _getWebApi: function (controller,action) {
        //return 'http://172.16.4.92/housekeeper/ajax/app_ws.asmx/' + m;
        return 'http://www.kingnetcare.com.tw:8088/api/'+ controller +'/' + action;
    },
    _getActivityOpenData:function(id){
        return "http://cloud.culture.tw/frontsite/opendata/activityOpenDataJsonAction.do?method=doFindActivitiesByCategory&category="+id+"&uk=7Gbd75gM";
    },
    _getActivityOpenDataByLat:function(lat,lon){
        return "http://cloud.culture.tw/frontsite/opendata/activityOpenDataJsonAction.do?method=doFindActivitiesNearBy&lat="+lat+"&lon="+lon+"&range=3&uk=7Gbd75gM"
    },
    _getActivityOpenDataMeta:function(){
        return "http://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindAllTypeJ";
    },
    _getSTNQueryStation:function(){
      
    },
    _getFacilitiesType:function(id){
         var arr=['other','sport','leisure','public','movie','learn','foods'];
         return arr[id];
    },
    _getFacilitiesOpenStr:function(wsun,wmon,wtue,wwed,wthu,wfri,wsat){      
        var arr=[wmon,wtue,wwed,wthu,wfri,wsat,wsun];
        var week=['一','二','三','四','五','六','日'];
        var str='';
        var open=0;
        for(var i=0;i<arr.length;i++){
            if(arr[i] !='none'){
                str += week[i]+'、';
                open++;
            }     
        }
     
        if(open==7){
            str='星期一至星期日';
        }else if(open==5 && wsat=='none' && wsun=='none'){
            str='星期一至星期五';
        }else if(open==2 && wsat!='none' && wsun!='none'){
            str='假日';        
        }else if(open==0){
            str='未開放預約';
        }else{
            str='每星期'+ str.substring(0,str.length-1);
        }         
        return str != '未開放預約' ? str +' 開放':str;
    },
    _getPointRuleStr:function(id){
        var arr=['','戶(不限時間)','戶','人(不限時間)','人'];
        //X點/人、 X點/戶、 X點/人(不限時間) 、X點/戶(不限時間)
       // 0：不扣點、1：戶數*點數、2：戶數*時數*點數、3：人數*點數、4：人數*時數*點數
       return arr[id];
    },
    //油價機制
    _getCPCMainProdListPrice:function(dom){
        $.ajax({
                dataType: 'json',
                url: app._getWebServiceMethod('getCPCMainProdListPrice'),
                type: 'post',
                async: true,
                complete: function(){app._loadingHide();},
                success: function (datas) {
                    $.each(datas,function (i, v) {
                        var sn=v.產品編號.replace(' ','');
                        switch(sn){
                            case '113F1209800'://98
                                dom.find('').text(v.參考牌價);
                                dom.find('').text(v.牌價生效時間);
                            break;
                            case '113F1209500'://95
                                dom.find('').text(v.參考牌價);
                            break;
                            case '113F1209200'://92
                                dom.find('').text(v.參考牌價);
                            break;
                            case '113F1229500'://酒精
                                dom.find('').text(v.參考牌價);
                            break;
                            case '113F5100700'://柴油
                                dom.find('').text(v.參考牌價);                                
                            break;
                        }
                    });
                },error:function(){
                    app._connectionDialog();
                }
        });
    },
    //讀取LocalStorage
    _getLocalStorage: function (v) {
        var str = window.localStorage.getItem(v);
        return str;
    },
    //設定LocalStorage
    _setLocalStorage: function (t, v) {
        window.localStorage.setItem(t, v);
    },
    _getLocalStorageJson: function (t) {
        var jsonStr = JSON.parse(this._getLocalStorage('control'));
        return jsonStr['' + t + ''];
    },
    _setLocalStorageJson: function (t, v) {
        var str = '';
        var ary = ['register','code', 'uuid', 'com_count', 'nav', 'time','token','device','Ver','user','valid'];
        if (this._getLocalStorage('control') == '' || this._getLocalStorage('control') == null) {

            for (var key in ary) {
                str += '"' + ary[key] + '":"",';
            }
        } else {
            var jsonStr = JSON.parse(this._getLocalStorage('control'));
            for (var key in ary) {
                str += t == ary[key] ? '\"' + ary[key] + '\":"' + v + '",' : '\"' + ary[key] + '\":"' + jsonStr['' + ary[key] + ''] + '",';
            }
        }

        str = str.substring(0, str.length - 1);
        str = '{' + str + '}';
        this._setLocalStorage('control', str);
    },
    //告警
    _dialog: function (text,func,val) {
        
        navigator.notification.alert(
             text,
             function () {
                 if(func=='message'){
                    _mobile.changePage('feedback.html', { changeHash: true, reverse:true ,transition: 'slide', data: { 'paremeter': val} });
                 }                          
             },
             '今網行動管家訊息',
             '確認'
        );
        
    },
    _inputNameDialog: function(){
            navigator.notification.confirm(
            '為保障您的權益，請務必填寫真實姓名，以利日後確實收到個人包裹等相關資訊。', // message
                function (idx) {                
                    navigator.notification.prompt(
                        '小提醒：一支手機僅能設定一個姓名',
                        function(result){
                            if(result.buttonIndex==1){
                                if(result.input1 !='' && result.input1 !='請輸入您的真實姓名') //改為 請輸入您的真實姓名
                                {
                                    app._loadingShow();
                                    app._editDeviceName(result.input1);
                                }else{
                                    app._inputNameDialog();   
                                }                             
                            }
                         }, 
                        '設定收件人姓名',
                        ['送出','取消'],  //送出 取消
                        app._getLocalStorage('deviceName') !=null ? app._getLocalStorage('deviceName'):'請輸入您的真實姓名' //改為 請輸入您的真實姓名
                    );             
                },        
                '今網行動管家訊息',
                ['確認'] 
            ); 
    },
    _editDeviceName:function(n){
        var pro= $('#profile');
        $.ajax({
                dataType: 'json',
                url: app._getWebServiceMethod('editUserName'),
                type: 'post',
                data: { device:app._getLocalStorageJson('code'),name:n},
                async: true,
                complete: function(){app._loadingHide();},
                success: function (datas) {
                    if(datas.status==true){
                        //window.localStorage.removeItem('profileInfo');
                       //app._setLocalStorageJson('user','yes'); 
                       app._setLocalStorage('deviceName',n);
                       document.getElementById('index').querySelector('#profile_btn i').style.display='none';
                      // $('#index').find('#profile_btn i').hide(); 
                       app._dialog('登記成功');
                        pro.find('.mark_txt').text(n).addClass('done');
                       //pro.find('#p_name').text(n).append('<i class="icon-questions-circular"></i>');
                       //pro.find('#profile_info').removeClass('focus');
                       //pro.find('#info_p').siblings().removeClass('open').addClass('close');
                       //pro.find('.privacy').siblings().removeClass('close').addClass('open');
                       $('.icon-men-admin-s').parent().find('span').remove();
                       //pro.find('#info_p').append('<i class="icon-edit edit"></i>').find('#subtitle_btn').remove();
                    }                
                },error:function(){
                    app._connectionDialog();
                }
        });
    },
    _cancelPostalPrivacy:function(com,dom){
        navigator.notification.confirm(
        '如果解除此包裏隱私設定，包裏將開放家人領取哦。\n\n注意：這不影響您的隱私設定，僅開放此包裏!',
        function(idx){
            if(idx==1){
                app._editPostalPrivacy(com,dom.find('a input').val().split(':'),function(status){
                    if(status=='success'){
                        dom.find('.privacy-tag').remove();
                    }else{  
                        app._dialog('解除失敗，請稍後再試一次');
                    }
                });                     
            }
        },
        '解除此包裏隱私設定?',
        ['確定','取消']
        );
    },
    _editPostalPrivacy:function(com,val,callback){
         app._loadingShow();
         setTimeout(function(){
         $.ajax({
                dataType: 'json',
                url: app._getWebServiceMethod('cancelPrivacyPostalTag'),
                type: 'post',
                data: { code:app._getLocalStorageJson('code'),com_id:com,postal_id:val[0],user_id:val[1]},
                async: true,
                complete: function(){app._loadingHide();},
                success: function (datas) {
                    callback(datas.status);
                },error:function(){
                    callback('fail');
                }
        });
        },700);
    },
    _socialsharing:function(page){
        var options = { 
            'title': '請選擇分享方式',
            'buttonLabels': ['Facebook', 'Line','複製連結'],
            'addCancelButtonWithLabel': '取消' 
        };  
        window.plugins.actionsheet.show(options, function(buttonIndex){
            if(buttonIndex==1)
            {
              window.plugins.socialsharing.shareViaFacebook('【家用網路推薦】不只提供每月不到500元家用網路優惠，同時享有免費電腦維修、網路相關等問題諮詢。點我瞭解更多→', null,'http://bit.ly/2fYl7SZ', function() {}, function(errormsg){})
            }else if(buttonIndex==2){
              window.plugins.socialsharing.shareVia('jp.naver.line.android', '【家用網路推薦】不只提供每月不到500元家用網路優惠，同時享有免費電腦維修、網路相關等問題諮詢。點我瞭解更多→', null,null, 'http://bit.ly/2fYl7SZ', function(){}, function(msg) {})
            } else if(buttonIndex==3){
              cordova.plugins.clipboard.copy('【家用網路推薦】不只提供每月不到500元家用網路優惠，同時享有免費電腦維修、網路相關等問題諮詢。點我瞭解更多→http://bit.ly/2fYl7SZ');
              page.find('.copySuccess').show();
              setTimeout(function(){page.find('.copySuccess').fadeOut(100);},1000);
            }
       });
    },
    _editUserIsPrivacy:function(status,callback){
         app._loadingShow();
         setTimeout(function(){
         $.ajax({
                dataType: 'json',
                url: app._getWebServiceMethod('editUserIsPrivacy'),
                type: 'post',
                data: { device:app._getLocalStorageJson('code'),status:status},
                async: false,
                complete: function(){app._loadingHide();},
                success: function (datas) {
                    callback(datas);
                },error:function(){
                    callback('fail');
                }
        });
        },700);
    },
    _inputPhoneDialog:function(){
        navigator.notification.prompt(
            ' ',
            function(result){
                if(result.buttonIndex==1){
                    if(result.input1 !='' && result.input1 !='請輸入您的手機號碼')
                    {
                        alert(result.input1);
                    }else{
                        alert('no');                               
                    }
                }
             }, 
            '登記/變更聯絡電話',
            ['送出','取消'],
            '0988888888'
        );  
    },
    _inputMailDialog:function(){
        navigator.notification.confirm(
            '為保障您的權益，請務必填寫正確的電子郵件信箱，以利日後確實收到電子發票等相關資訊。', // message
            function (idx) {                
                navigator.notification.prompt(
                    msg,
                    function(result){
                        if(result.buttonIndex==1){
                            if(result.input1 !='' && result.input1 !='請輸入新的電子郵件信箱')
                            {
                                if(validateEmail(result.input1)==true){
                                    sendMailValid(result.input1,cust,oldmail);
                                }else{
                                    dialog('email格式錯誤');
                                }
                            }else{
                                againCheckMail(this.id,msg,oldmail);                                 
                            }
                        }
                     }, 
                    '變更電子郵件信箱',
                    ['送出','取消'],
                    '請輸入新的電子郵件信箱'
                );             
            },        
            '今網行動管家訊息',
            ['確認'] 
        );    
    },
    _inputPhoneDialogISP:function(city){
        navigator.notification.prompt(
            '請留下您的聯絡資訊，專員將於1小時內與您聯繫說明',
            function(result){
                if(result.buttonIndex==1){
                    if(result.input1 !='' && result.input1 !='手機或市話'){
                        if(result.input1.substring(0,2)=='09' && result.input1.length !=10){
                            navigator.notification.alert(
                                '請確認手機號碼長度為10碼',
                                function () {
                                    app._inputPhoneDialogISP(city);
                                },
                                '今網行動管家訊息',
                                '確認'
                            );
                            return false;
                        }else{
                            if(result.input1.length < 7){
                                navigator.notification.alert(
                                    '請輸入有效之聯絡電話',
                                    function () {
                                        app._inputPhoneDialogISP(city);
                                    },
                                    '今網行動管家訊息',
                                    '確認'
                                );
                                return false;
                            }
                        }
                        city=city==1?'taichung':'taipei';
                        var input1=result.input1
                        var com_name;
                        if(app._getLocalStorageJson('com_count') != 0){
                            com_name=JSON.parse(app._getLocalStorage('comInfo')).info[0].community;
                        }else{
                            com_name='行動管家用戶'
                        }
                        app._loadingShow();
                        setTimeout(function () {
                            var ajax_dir = "https://www.kingnet-select.com.tw/App_service/app_service.asmx";
                            $.ajax({
                                dataType: 'json',
                                url: ajax_dir + '/contactMsg',
                                type: 'post',
                                data: { c: city, n: com_name, s: '1', t: input1 },
                                async: true,
                                complete: function () { app._loadingHide(); },
                                success: function (datas) {
                                if (datas.status == 'ok') {
                                    app._dialog('訊息已送達客服中心，我們會儘快與您聯絡，謝謝');
                                }
                                }
                            });
                        }, 1000);
                    }else{
                         app._inputPhoneDialogISP(city);
                    }
                }
            },
            '網路服務諮詢',
            ['送出','取消'],
            '手機或市話',
            2
        );
    },
    _connectionDialog: function(){
        this._dialog('網路狀態異常。');
    },
    //Qr code初始化
    _setQrCode: function (d, v) {
        d.html('');
        d.qrcode({
            size: 150,
            color: "#3a3",
            text: v,
            mode: 0,
            mSize: 0.13,
            mposx: 0.5,
            mposy: 0.5,
            radius: 0.4,
            quiet: 2
            //"label": 'K',
            //"fontname": 'Ubuntu',
            //"fontcolor": '#125687',
            //"image":$('.img-buffer')[0]
        });

    },
    //Barcode初始化
    _setBarcode: function (d, v) {
        d.html();
        d.html(v).barcode({ code: 'code39' });
    },
    _loadingShow: function (d) {       
       document.querySelector('.loadingBG').style.display='block';
       document.querySelector('.loading').style.display='block';
    },
    _loadingHide: function (s) {
        s = s!='' && s > 0 ? s : 0 ;
        setTimeout(function(){ 
            document.querySelector('.loadingBG').style.display='none';
            document.querySelector('.loading').style.display='none';
        },s);
    },
    //註冊label使用於input
    _registerLabelInput: function (b) {
        $(b).find("input[type=text],textarea").each(function () {
            this.value ? $(this).prev().hide() : $(this).prev().show()
        }).keydown(function () {
            $(this).prev().hide()
        }).keyup(function () {
            this.value || $(this).prev().show()
        }).blur(function () {
            this.value || $(this).prev().show()
        })
    },_removeDupes: function (arr) {
        var nonDupes = [];
        arr.forEach(function (value) {
            if (nonDupes.indexOf(value) == -1) {
                nonDupes.push(value);
            }
        });
        return nonDupes;
    },
    _comList: function(t,v){
        var domStr='';
        domStr += '<li>';
        domStr += '<a>';
        domStr += '<p >';
        domStr += '<input type="hidden" value="' + v.id + '" />';
        domStr += '<span>'+ v.city +' - </span>'+ v.community;
        domStr += '<span class="badge" id="mark_'+v.id+'"></span>';
        domStr += '</p><i class="icon-chevron-right"></i>'; 
        domStr += '</a>';
        domStr += '</li>';
        return domStr;

    },
     _getStroesDomList:function(tempStore,callback){
       var dom='';
       var val=JSON.parse(tempStore);
        var com=JSON.parse(app._getLocalStorage('comInfo')).info;
        for(var i=0;i<val.length;i++){
            $.each(com, function (idx, v) {
                if(v.id==val[i]){
                    dom+='<li class="store">';
                    dom+='<input type="hidden" value="'+ val[i] +'">';
                    dom+='<a>';
                    dom+='<div class="name">';
                    dom+='<img src="img/easylife/go2gether.jpg" alt="大車隊共乘" />';
                    dom+='<div class="info">';
                    dom+='<h4>社區</h4>';
                    dom+='<p>商家</p>';
                    dom+='</div>';
                    dom+='</div>';
                    dom+='</a>';
                    dom+='</li>';
                }
            });
        }
        callback(dom);
    },
    _annListDom: function (v) {
        var domStr = '';
        var _badge='0';
        domStr += '<li>';
        domStr += '<a>';
        domStr += '<input type="hidden" value="' + v.a + '" />';      
        domStr += '<div class="info">';
        //domStr += '<h4><span class="title">' + v.b + '</span>';
        domStr += '<h4><span class="title">' + v.b;
        if(_annBadge.length>0){
            for(var key in _annBadge){ 
                if(v.a==_annBadge[key])
                _badge='1';
            }
        }
        if(_badge=='0'){
            domStr += v.f =='' ? '<span class="new">N</span>':'';
        }
        domStr += '</span></h4>';
        if (v.f == '') {
            domStr += '<p>' + v.c + ' <span>' + v.e + '</span></p>';
        } else {
            domStr += '<p>' + v.d + ' <span>' + v.e + '</span></p>';
        }
        domStr += '</div>';
        domStr += '<i class="icon-chevron-right"></i>';
        domStr += '</a>';
        domStr += '</li>';
        return domStr;
    },
    _postalList: function(v){
        var domStr='';
            domStr+='<li><a>';
            if(v.p=='privacy'){
                domStr+='<input type="hidden" value="'+ v.a +':'+ v.q +'" />';
                domStr+='<div class="privacy-tag';
                if(v.f!='0' && v.f!='1'){
                    domStr+=' already';
                }
                domStr+='"><span>私人包裹</span></div>';               
            }
            domStr+='<div class="svg-area">';
            if(v.f=='0' || v.f=='1'){
                domStr+='<i class="icon-package"></i>';
            }else{
                domStr+='<i class="icon-package" style="color:#bbb;"></i>';
            }
            domStr+= v.n != '0' && v.n!=undefined ? '<img class="source" src="img/source/'+ v.n +'.png" alt="" />':'';          
            domStr+='</div>';
            domStr+='<div class="info">';
            if(v.f=='0' || v.f=='1'){
                domStr+='<h4><span>'+v.b+'</span>';
            }else{
                 domStr+='<h4 class="already"><span>'+v.i+'已取件</span>';
            }
            domStr+=v.o != '0' && v.o!=undefined ?'<img class="trace" src="img/trace/'+ v.o +'.png" alt="" />':'';
            domStr+='</h4>';
            domStr+='<p>姓名: <span>'+v.e+'</span><span>('+ v.l +')</span></p>';
            domStr+='<p>類型: <span>'+v.c+'</span>';
            if(v.d != '0'){
                domStr+= v.d=='1' ? '<span class="tag refriger">冷藏</span>':'<span class="tag freezing">冷凍</span>';
            }
            domStr+='</p>';
            domStr+= v.m !='' ? '<div class="memo">'+ v.m +'</div>':'';
            domStr+='</div>';
            domStr+='</a></li>';

        return domStr;
    },
    _messageList:function(v){
        var domStr='';
        domStr +='<li>';
        domStr +='<a>';
        domStr += '<input type="hidden" value="' + v.id + '" />';
        domStr +='<div class="info">';
        domStr +='<h4><span class="title">'+ v.msg;
        domStr += v.fb_date!='' && v.is_read=='0' ? ' <span class="new" id="count_'+v.id+'">N</span>':'';
        domStr +='</span></h4>';
        domStr += v.fb_date =='' ? '<p>提交於 '+ v.create_date +' <span>'+v.msg_type+'</span></p>':'<p>最新回覆時間 '+v.fb_date+' <span>'+v.msg_type+'</span></p>';
        domStr +='</div><i class="icon-chevron-right"></i>';
        domStr +='</a>';
        domStr +='</li>';
        return domStr;
    },
    _getReturnPostalInfo:function(com){
        var postal=$('#postal');
        postal.find('#returnPostalList').html('');
        var domStr='';
        $.ajax({
            dataType: 'json',
            url: app._getWebServiceMethod('getReturnPostalList'),
            type: 'post',
            data: { code: app._getLocalStorageJson('code'),com_id:com},
            async: true,
            success: function (datas) {
                $.each(datas, function (i, v) {
                domStr +='<li><a>';
                if(v.g=='privacy'){
                    domStr +='<div class="privacy-tag already"><span>私人包裹</span></div>';
                }
                domStr +='<div class="info">';
                domStr +='<p>收貨戶別: <span>'+v.a+'</span></p>';
                domStr +='<p>郵件類型: <span>'+ v.c +'</span>';
                domStr+= v.f=='1' ? '<span class="tag refriger">冷藏</span>':'';
                domStr +='</p>';
                domStr +='<div class="return-status-wrap">';
                if(v.d=='0'){
                    domStr +='<span class="tag tag-waiting">等待中</span>';
                }else if(v.d=='1'){
                    domStr +='<span class="tag tag-already">已退貨</span>';
                }else{
                    domStr +='<span class="tag tag">取消</span>';
                }
                if(v.d=='0'){
                    domStr +='<span class="hr">'+ v.b +'</span>';
                }else{
                    domStr +='<span class="hr">'+ v.e +'</span>';
                }
                domStr +='</div>';
                domStr +='</div>';
                domStr +='</a></li>';
                });
                if(domStr !=''){
                    postal.find('#returnPostalList').append(domStr).trigger('refresh');

                    $('.navbar').find('ul li:eq(2) a span').html('退貨狀態<span class="badge"></span>');
                }  
            }
        });
    },
    _getPostalInfo:function(community,note){
    var postal=$('#postal');
    var domStr='';
    var getDomStr='';
    var total=0;
    var Today=new Date();
        setTimeout(function(){
        $.ajax({
            dataType: 'json',
            url: app._getWebServiceMethod('getUserPostalList'),
            type: 'post',
            data: { code: app._getLocalStorageJson('code'),com_id:community},
            async: true,
            complete:function(){app._loadingHide(500);},
            success: function (datas) {
                $.each(datas, function (i, v) {
                    if(i==0){
                        $('#postal_com').text(v.j);
                    }
                    if(v.f=='2'){
                       getDomStr += app._postalList(v);
                    }else{
                       domStr += app._postalList(v); 
                       total++;
                    }                                      
                });    
                if(domStr !=''){
                    postal.find('div.navbar ul li a').removeClass('active');
                    postal.find('#segmented-div-a,span.tips-div-a').show().siblings().hide();
                    postal.find('.navbar').find('ul li:eq(0) a').addClass('active').find('span').html('未領取<span class="badge"></span>');
                    postal.find('#postalList').html(domStr).trigger('create').show();
                    postal.find('div.empty').hide(); 
                    if(app._getLocalStorage('postalIntro')==null){
                        document.getElementById('postal').querySelector('.guide-postal-content').style.display='block';
                        document.getElementById('postal').querySelectorAll('.guide-postal-content div')[0].style.top=document.getElementById('postal').querySelector('#header').offsetHeight+'px';   
                        app._setLocalStorage('postalIntro','run');
                    }              
                }else{
                    postal.find('.navbar').find('ul li:eq(0) a span').html('未領取');
                    postal.find('#postalList').hide().siblings().hide();
                    postal.find('div.empty').show();   
                }
                if(getDomStr !=''){
                    postal.find('#getPostal').html(getDomStr).trigger('create');
                    postal.find('.navbar ul li:eq(1) a span').html('已領取<span class="badge"></span>');

                }else{
                    postal.find('#getPostal_div').hide();
                }
                if(note=='[退貨通知]'){
                    postal.find('#segmented-div-c').show().siblings().hide();
                     postal.find('div.navbar ul li a').removeClass('active');
                     postal.find('div.navbar ul li:eq(2) a').addClass('active');
                }
                postal.find('#postalLoad').text(' '+Today.getFullYear() +"/"+ (Today.getMonth()+1) +"/"+ Today.getDate() +' '+ Today.getHours() +':'+ Today.getMinutes()+':'+ Today.getSeconds());
                postal.find('#postalCount').text(total);                
            }, error: function (e) {
                //無網路環境或是WEB API異常
                app._connectionDialog();
                return false;
            }
        });
        },100);
    },
    _getUrlParameters: function (url, t) {
        var parameters = url.split("?")[1];
        if(parameters != undefined){
        var reg = new RegExp('=', "g");
        var arr = [];
        var c = parameters.match(reg);

        if (c.length == 1) {
            return parameters.split("&")[0].split('=')[1];
        } else {

            for (var i = 0; i < c.length; i++) {
                if (t != '') {
           
                    if (t == parameters.split("&")[i].split('=')[0]) {
                        return parameters.split("&")[i].split('=')[1];
                    }
                } else {
                    arr.push(parameters.split("&")[i].split('=')[1]);
                }
            }
            return arr;
        }
        }else{
            return '';
        }
    },
    _feedbackDesc:function(idx){
        var msg;
        switch(idx){
            case 0:
                msg='社區維護不分你我，大家一起共同維護，對社區有任何建議，請協助說明實際發生人事時地物，我們將盡快提供給管理室了解為您處理。';
            break;
            case 3:
                msg='居家空間中如有裝潢或公共設備異常需要管理室協助報修，請協助說明異常狀況及位置。如： 家中對講機壞了一週，話筒沒有聲音，請協助查看。';
            break;
            case 1:
                msg='請說明社區公共設備異常的位置及異常狀況，我們將盡快提供給管理室了解為您處理。如： 三樓韻律教室內的燈有一盞不亮許久，請協助處理';
            break;
            case 2:
                msg='社區生活有您我共同維護，若您在社區生活中有影響居住品質的情形，請協助說明實際發生人事時地物，我們將盡快提供給管理室了解為您處理。如： 社區門口違規停車';
            break;
            case 4:
                msg='社區生活因為你我變得更好，若您對於提升居住品質有任何提案及建議，歡迎提供您寶貴的建言，我們將提供給管理室了解，謝謝。如： 希望社區可以增設停車位';
            break;
            case 5:
                msg='今網行動管家以社區E化提供給您更便利的智慧生活，針對App使用上有任何異常錯誤回報或其他服務需求，請協助說明，我們將請專人為您服務。如： App可以提供洗衣收送服務，讓住戶透過管理室代收代送，請洗衣店來收取。';
            break;

        }
        return msg;
    },
    _feedbackFormat:function(idx){
        var arr=['其他建議','居家報修','公設異常','檢舉申訴','社區管理建議','App問題與建議'];
        return arr[idx];
    },
    //登錄app時間戳記
    _setTimeZone:function(){
        var Today=new Date();
        this._setLocalStorageJson('time',Today.getFullYear() +"-"+ (Today.getMonth()+1) +"-"+ Today.getDate());
    },
    _getTimeZone:function(){
        var Today=new Date();
        return Today.getFullYear() +"-"+ (Today.getMonth()+1) +"-"+ Today.getDate();         
    },
    _getTimeZoneCH:function(date){
        var Today=new Date(date);
        return Today.getFullYear() +"年"+ (Today.getMonth()+1) +"月"+ Today.getDate()+"日";         
    },
    _getWeekDay:function(day){
        
        day=this._getFormatDate(day);
  
        var day_list = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        var date = new Date(day).getDay();
        return day_list[date];
    },
      _getWeekDayStr:function(day){

    var day_list = ['日', '一', '二', '三', '四', '五', '六'];
    var date = new Date(day).getDay();
    return day_list[date];
    },
    _getReservationRule:function(d,r){
        var rule=app._getFormatDate(d);
        var date = new Date(rule);
        var status='no';
        for(var i=0;i<7;i++){
            if(Math.pow(2,i)==(Math.pow(2,i) & r)){
                if(i==date.getDay()){
                    status='open';
                    break;
                }
            }
        }
        return status;
    },
    _getFormatDate:function(day){

        var arr=day.split('-');
        var y=arr[0];
        var m='0'+arr[1];
        m=m.Right(2);
        var d='0'+arr[2];
        d=d.Right(2);
        return y+'-'+m+'-'+d;
    },
     _getFormatDate_md:function(day){

        var arr=day.split('-');
        var y=arr[0];
        var m='0'+arr[1];
        m=m.Right(2);
        var d='0'+arr[2];
        d=d.Right(2);
        return m+'/'+d;
    },
    _floatAdd:function(arg1,arg2){
        var r1, r2, m;
        try { r1 = arg1.toString().split(".")[1].length; } catch (e) { r1 = 0; }
        try { r2 = arg2.toString().split(".")[1].length; } catch (e) { r2 = 0; }
        m = Math.pow(10, Math.max(r1, r2));
        return (app._FloatMul(arg1, m) + app._FloatMul(arg2, m)) / m;
    },
    _FloatMul:function(arg1,arg2){
        var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
        try { m += s1.split(".")[1].length; } catch (e) { }
        try { m += s2.split(".")[1].length; } catch (e) { }
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    },
    _checkMaxInput:function(f,l,ml) {
        l.attr({'class':'_zero'});
        if (f.val().length > ml) {
            l.attr({'class':'zero'});
            f.val(f.val().substring(0, ml));
        }
        else {
            if((ml - f.val().length)==0){
                l.attr({'class':'zero'});
            }
            l.text((ml - f.val().length));
        }  
    },
    _onCamSuccess:function(imageData){    
        var page=document.getElementById('feedbackEdit_v2');         
        var image = page.querySelector('#attach_img');
        var attaImg=  page.querySelector('#attachmentShow');
        var attaBtn= page.querySelector('#attachmentAdd');
        attaImg.className = "info attatchPhotoView show";
        attaBtn.style.display = "none";
        //image.src = "data:image/jpeg;base64," + imageData;     
        image.querySelector('input').value=imageData;
        image.setAttribute('style','background:url(data:image/jpeg;base64,'+ imageData +') no-repeat center center; background-size: cover;');
         // app._loadingHide(300); 
        setTimeout(function(){
            
            page.querySelector('.s-loading').style.display='none';
            page.querySelector('.icon-camera').style.display='block';  
        },300);
      
    },
    _onCamFail:function(message){
       var page=document.getElementById('feedbackEdit_v2'); 
        setTimeout(function(){  
            page.querySelector('.s-loading').style.display='none';
            page.querySelector('.icon-camera').style.display='block';  
         app._dailog('相片載入失敗');},200);
    },
    _inAppBrowsOpen:function(url){
        url='window.open("https://docs.google.com/viewer?url='+ encodeURI(url) +'", "_blank", "location=no")';
        return url;
    },
    _swiperMoreList:function(){
        var swiper = new Swiper('#moreList .swiper-container', {
            pagination: '#moreList .swiper-pagination',
            paginationClickable: true,
            autoplay: 3500,
            autoplayDisableOnInteraction: false,
            loop: true
        });
    },
    _swiperInit:function(){
        var swiper = new Swiper('.guide .swiper-container', {
            pagination: '.guide .swiper-pagination',
            paginationClickable: true
        });
    },
    _swiperMain:function(){
        var swiper2= new Swiper('.guide-b .swiper-container', {
            pagination: '.guide-b .swiper-pagination',
             slidesPerView: 1,
            spaceBetween: 30
        });
    },
    //註冊手機裝置
    _registerDevice: function(r){ 
        app._setLocalStorageJson('uuid', device.uuid);     
        if(app._getLocalStorageJson('register') != 'yes')
        {
            app._setLocalStorageJson('device', device.platform); 
            app._versionUpdate(); 
            $.ajax({
                dataType: 'json',
                url: app._getWebServiceMethod('validDevice'),
                type: 'post',
                data: { uuid:device.uuid,device_sn: r,device:device.platform,model:device.model,version:device.version },
                async: false,
                success: function (datas) {
                    if(datas.result!='insert_error'){
                        if(r!=''){
                            app._setLocalStorageJson('register','yes');
                        }
                        app._setLocalStorageJson('code', datas.validCode);    
                        //Barcode 初始化
                        app._setBarcode($('#code3'), app._getLocalStorageJson('code'));
                        //QR Code 初始化
                        app._setQrCode($('#qr'), app._qrCodeHeader() + app._getLocalStorageJson('code') + app._qrCodeFooter());               
                        app._getUserCommunityList('');                  
                    }
                
                },error:function(){
                    app._loadingHide();
                    $('#loadnumber').text('...無網路服務，更新失敗');
                    app._swiperMain();
                    setTimeout(function(){ $('.updateLoading').hide();},2000);                
                }
            });
        }else{
            //gcm註冊失敗，重新註冊後進行資料更新
            if(app._getLocalStorageJson('valid') == 'error' && r != 'emulate'){
                $.ajax({
                    dataType: 'json',
                    url: app._getWebServiceMethod('validDevice'),
                    type: 'post',
                    data: { uuid:device.uuid,device_sn: r,device:device.platform,model:device.model,version:device.version },
                    async: true,
                    success: function (datas) {
                        if(r!='emulate'){
                            app._setLocalStorageJson('valid', ''); 
                        }
                    }
                });
            }
        }       
    },
    _getUserCommunityList: function (s) {       
        $.ajax({
            url: this._getWebServiceMethod('getUserCommunityList'),
            type: 'post',
            data: { code: this._getLocalStorageJson('code') },
            async: false,
            complete:function(){app._loadingHide();},
            success: $.proxy(function (datas) {
              
                var infoJson = '{"info":' + datas + '}';
                this._setLocalStorage('comInfo', infoJson);
                this._setLocalStorage('fee','');
                this._setLocalStorageJson('com_count', JSON.parse(app._getLocalStorage('comInfo')).info.length);
                if(JSON.parse(this._getLocalStorage('comInfo')).info.length!=0){
                    if(s=='main'){
                        var url=$.mobile.activePage[0].baseURI.split('/');
                        if(url[url.length-1].split('?')[0]!='index.html'){
                            _mobile.changePage('index.html', { changeHash: true,reverse:true});
                        }                     
                    }
                }
            }, this),
            error:function(){
               app._loadingHide();
            }
        });
    },
    //v2版
    _getAnnouncementList:function(comId,callback){
        $.ajax({
            dataType: 'json',
            url: app._getWebApi('Announcement','getAnnouncementList'),
            type: 'GET',
            data: 'code='+ this._getLocalStorageJson('code') +'&comId='+comId,
            async: true,
            success: function (datas) {
                callback(datas);
            },
            error:function(){
                callback('error');
            }
        });
    },
    _formatAnnouncementDom:function(ann,callback){
        var domStr='';
        var filter='';
        var _badge;
        var arr=['other','normal','meeting','financial','fix','active']
        var typeArr=[];
        $.each(JSON.parse(ann).info, function (i, v) {
            _badge=0;
            if(typeArr.indexOf(arr[v.type]) ==-1){
              typeArr.push(arr[v.type]);
              var type=arr[v.type];
               filter+=g_typeArr.indexOf(type) ==-1 ? '<div class="filterItem">':'<div class="filterItem selected">';
               filter+='<input type="hidden" value="'+ type +'" />'
               filter+='<input type="hidden" value="'+ v.typeName +'" />'
               filter+='<div class="filterIcon">';
               filter+='<div class="icon-circle-check">';
               filter+='<i class="icon-check-mark"></i>';
               filter+='</div>';
               filter+='<i class="icon-ann_'+ type +'"></i>';
               filter+='</div>';
               filter+='<p>'+ v.typeName +'</p>';
               filter+='</div>';
            }
            domStr+='<li class="'+ arr[v.type] +'">';
            domStr+='<a>';
            domStr+='<input type="hidden" value="'+ v.id +'" />'
            domStr+='<div class="info">';
            if(v.is_top==1){
                domStr+='<i class="icon-bookmark-start"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span></i>';
            }else{
                if(v.is_top==2){
                    domStr+='<i class="icon-bookmark"><span class=" path1"></span><span class="path2"></span></i>';
                }
            }
            domStr+='<h4><span class="title">'+v.title;
            if(_annBadge.length>0){
                for(var key in _annBadge){ 
                    if(v.id==_annBadge[key])
                    _badge=1;
                }
            }
            if(_badge == 0){
                domStr+= v.ann_id =='' && v.insdate !='' ?'<span class="new">N</span></span>':'';
            }            
            domStr+='</h4>';
            domStr+='<p>';
            domStr+= v.start;   
            domStr+=' <span>'+v.typeName+'</span> </p>';
            domStr+='</div>';
            domStr+='<i class="icon-chevron-right"></i>';
            domStr+='</a>';
            domStr+='</li>';
        });
        return callback(domStr,filter,typeArr.length);
    },
    _getReservationInfo:function(pf_id,date,callback){
        $.ajax({
            dataType: 'json',
            url: app._getWebApi('Facilities','getReservationInfo'),
            type: 'GET',
            data: 'pf_id='+ pf_id +'&thisDate='+date,
            async: true,
            success: function (datas) {
                callback(datas);
            }
        });
    },
    _getTabletAndPointList:function(com_id,callback){
        $.ajax({
            dataType: 'json',
            url: app._getWebApi('Tablet','getTabletAndPointList'),
            type: 'GET',
            data: 'com_id='+ com_id +'&code='+this._getLocalStorageJson('code'),
            async: true,
            success: function (datas) {
                callback(datas);
            }
        });
    },
    _getCommunityReservation:function(c){
        if(this._getLocalStorage('facilities') == '' || JSON.parse(this._getLocalStorage('facilities')).com != c){ 
            $.ajax({
                url: this._getWebServiceMethod('getCommunityFacilities'),
                type: 'post',
                data: { com_id: c },
                async: true,
                success: function (datas) { 
                    if(datas==''){
                        $('.closedWrap').show();
                        $('#res_online').show();
                        $('.listWrap').hide();
                        app._loadingHide();

                    }else{
                        $('#res_history').show();
                        app._setLocalStorage('facilities','{"com":"'+ c +'","info":' + datas + '}');
                        app._facilities(); 
                    }                                   
                },
                error:function(){
                   app._connectionDialog();             
                }
            });
        }else{
            app._facilities(); 
        }        
    },
    _facilities:function(){
        var domStr='';
        var fac=JSON.parse(app._getLocalStorage('facilities'));
        var arr=['common','meeting','read','kid','KTV','gym','movie','computer','swim'];
        $.each(fac.info, function (i, v) {
            domStr+='<li>';
            domStr+='<div class="name">';
            domStr +='<table ><tr><td>';
            domStr+='<a class="query" id="query_'+ i +'">'; 
            domStr+='<input type="hidden" value="'+ v.pf_id +'" />';
            if(v.is_reservation!='1'){
                domStr+='<input type="hidden" value="no" />';
            }else{
                domStr+='<input type="hidden" value="'+ v.start.substring(0,5) +'_'+ v.due.substring(0,5) +'" />';
            }
            domStr+='<input type="hidden" value="'+ v.maximum_people +'" />';     
            domStr+='<input type="hidden" value="'+ v.day_rule +'" />'; 
            domStr+='<i class="icon-r-'+ arr[v.pf_type] +' sty1"></i>';
            domStr+='<div class="info">';
            domStr+='<h4>'+v.pf_name+'</h4>';   
            domStr+= v.is_reservation=='1' ? '<span>需預約</span>':'';                
            if(v.start !=''){
                domStr+='<p>'+ v.open_day +' <br/>'+ v.start.substring(0,5) +'-'+ v.due.substring(0,5)+'</p>';
               
            }else{
                domStr+='<p>'+ v.open_day +' 全天候開放</p>';                   
            }        
            domStr+='</div>';
            domStr+='</a>';
            domStr+='</td><td>';
            domStr+='<a class="more" id="detail_'+ i +'">';
            domStr+='<input type="hidden" value="'+ v.pf_id +'" />';
            domStr+='<i class="icon-more-detail sty2"></i>';
            domStr+='&nbsp;&nbsp</a>';
            domStr+='</td></tr></table>';
            domStr+='</div>';
            domStr+='</li>';
              if(i==0){
                   $('#res_history').show();
               }
        });                
        $('#reservation_list').append(domStr).trigger('refresh'); 
        app._loadingHide(300);
    },
    _onOffline:function(){
        $('#no_login_info').hide();
      var url=$.mobile.activePage[0].baseURI.split('/')
      switch(url[url.length-1].split('?')[0]){
        case 'login.html':
            if(app._getLocalStorageJson('code')==''){
                 $('#scanDiv').hide();
                 $('#no_online').show();
                 $('#no_online .msg-box').attr("style", "margin-top:" + ($('#scanarea').height() /4) + "px;");
            }else{
                $('#alert_box,#no_online_info').show();  
                $('#alert_box .container').attr("style", "margin-top:-" + ($('#no_online_info').height() / 2) + "px;");         
            }
            break;
        case 'index.html':
                $('#alert_box,#no_online_info').show();  
                $('#alert_box .container').attr("style", "margin-top:-" + ($('#no_online_info').height() / 2) + "px;");   
            break;

      }      
    },
    _onOnline:function(){
   
      var url=$.mobile.activePage[0].baseURI.split('/')
      switch(url[url.length-1].split('?')[0]){
        case 'index.html':
        $('#alert_box,#no_online_info').hide();
            break;
        case 'login.html':
            $('#alert_box,#no_online_info').hide();
            if(app._getLocalStorageJson('code') == ''){
                $('.refreshBtn').html('嘗試連線中…');
                setTimeout(function(){
                    if(app._getLocalStorageJson('code').length !=16){
                        app._registerDevice(app._getLocalStorageJson('token'));
                    }
                    $('#no_online').hide();
                    $('#scanDiv').show();
                },300);
              
            }else{
                if(JSON.parse(app._getLocalStorage('comInfo')).info.length==0){
                    app._loadingShow();
                    app._getUserCommunityList('');
                }
            }
              break;
        case 'snLogin.html':
              //恢後網路環境，如果社區仍
              if(JSON.parse(app._getLocalStorage('comInfo')).info.length==0){
                  app._loadingShow();
                  app._getUserCommunityList('main');
              }
              break;
      }
      //app._getBrickTag($('#index'));
    },
    _noLoginInfo:function(){
        $('#no_online_info').hide();
        $('#alert_box,#no_login_info').show();
        $('#alert_box .container').attr("style", "margin-top:-" + ($('#no_login_info').height() / 2) + "px;");
    },
    _downloadLoop:function(i,d,c){
       var jsonp= JSON.parse(app._getLocalStorage('mainInfo'));
       var t = jsonp.main[0].remote_img.split('_')[0];
       var j = parseInt(i)-1;
       var local= jsonp.main[j].local_img;
       var remote= jsonp.main[j].remote_img;
       var p = jsonp.main[0].ip;
    $('.updateLoading').show();   
        var fileTransfer = new FileTransfer();
        var uri = encodeURI("http://"+ p +"/CHK/main/"+t+"/ad_"+ local +".jpg");           
        fileTransfer.download(
            uri,
            "cdvfile://localhost/persistent/path/to/"+ remote +"",
            function(entry) {
                if(i+1 <= _download){
                    _downloadCheck=i+1;
                    $('#loadnumber').text((i*d) +'%');
                    setTimeout(function(){ app._downloadLoop(_downloadCheck,d,c);},200);
                }else{
                      $('#loadnumber').text('100%');
                     app._setLocalStorageJson('Ver',jsonp.main[0].version);
                     app._indexBrick(); 
                    setTimeout(function(){$('.updateLoading').hide()},2000);          
                }            
            },
            function(error) {
                app._setLocalStorageJson('Ver','');
                _downloadCheck=i+1;
                $('#loadnumber').text('...'+ (i*d) +'%');
                setTimeout(function(){ app._downloadLoop(_downloadCheck,d,c);},200);
            
            },
            false
        );

    },
    _indexBrick:function(){
        var domStr;
        var rowClose='no';
        var count= 0;
        var s3= 0;
        $.each(JSON.parse(app._getLocalStorage('mainInfo')).main, function (i, v) {
            if(v.brick_div=='3' && s3==0){
                var _div=$('<div />',{'class':'swiper-slide','id':'swiper_3'});
                $('#index').find('#brick_main').append(_div).trigger('refresh');
                s3=1;
            }
            if(v.class_type=='block4' || v.class_type=='block2'){
                domStr='<div class="row '+ v.class_type +'">';
                    domStr+='<div>';
                        domStr+='<a>';
                        domStr+='<input type="hidden" value="'+ v.brick_detail +'">';
                            domStr+='<div class="nDIV">';
                                domStr+='<img src="cdvfile://localhost/persistent/path/to/'+ v.remote_img +'" alt="" />';
                            domStr+='</div>';
                        domStr+='</a>';
                    domStr+='</div>';
                domStr+='</div>'; 
                if(v.brick_div !=2){
                    $('#index').find('#swiper_'+ v.brick_div).append(domStr).trigger('refresh');
                }

            }else{
                count++;
                if(rowClose=='no'){
                    domStr='';
                    domStr+='<div class="row">';
                    rowClose = 'yes';
                }                
                domStr+='<div>';
                domStr+='<a>';
                domStr+='<input type="hidden" value="'+ v.brick_detail +'">';
                domStr+='<div class="nDIV">';
                //domStr+='<img src="img/index/btn/btn_01.png" alt="" />';
                domStr+='<img src="cdvfile://localhost/persistent/path/to/'+ v.remote_img +'" alt="" />';
                domStr+='</div>';
                domStr+='</a>';
                domStr+='</div>';
                if(count==2 && rowClose=='yes'){
                    domStr+='</div>';
                    if(v.brick_div !=2){             
                        $('#index').find('#swiper_'+ v.brick_div).append(domStr).trigger('refresh');
                    }
                    count = 0;
                    rowClose='no';
                }
            }
        
        });
        app._swiperMain();
    },
    _versionUpdate:function(){   
   // if(this._getLocalStorageJson('time') != this._getTimeZone()){
        app._setTimeZone();
    //this._setLocalStorageJson('Ver','');
      var Ver=this._getLocalStorageJson('Ver') =='' || this._getLocalStorageJson('Ver') ==undefined ? '0.0.0': this._getLocalStorageJson('Ver');
     $('.updateLoading').show();
     navigator.splashscreen.hide(); 
     $.ajax({
        url: this._getWebServiceMethod('getAPPServiceUpdateInfo'),
        type: 'post',
        data: { device: this._getLocalStorageJson('device'),ver:Ver },
        async: false,
        complete:function(){app._loadingHide(); $('#guide_close').show();},
        success: $.proxy(function (datas) {    
              if(datas !='' && datas !='[]'){                        
                var mainJson = '{"main":' + datas + '}';
                this._setLocalStorage('mainInfo', mainJson); 
                _download=JSON.parse(this._getLocalStorage('mainInfo')).main.length;
                var load_number= Math.floor(100/_download);
                var extend_number= 100%_download;
                this._downloadLoop(1,load_number,extend_number);
             }else{
                 $('.updateLoading').hide();
                this._indexBrick();
            }
        },this),
        error:$.proxy(function(){
            $('.updateLoading').hide();
            if(this._getLocalStorage('mainInfo') !=''){
                if(JSON.parse(this._getLocalStorage('mainInfo')).main.length > 0){
                    this._indexBrick();
                }else{
                    app._swiperMain();
                }
            }else{
               app._swiperMain();
            }
        },this)
      });
   // } 

    },
    _getCollectionPaymentList:function(callback){
        setTimeout(function(){

            $.ajax({
            dataType: 'json',
            url: app._getWebServiceMethod('getCollectionPayment'),
            type: 'post',
            //data: { code:'7RH61Z56NZRVF274'},
            data: { code:app._getLocalStorageJson('code')},
            async: true,
            success: function (datas) {
                callback(datas);
            },error:function(e){
                callback('error');
            }
        });
        },300);
        
    },
    _getCollectionCount:function(callback){
        $.ajax({
            dataType: 'json',
            url: app._getWebServiceMethod('getCollectionCount'),
            type: 'post',
            data: { code:app._getLocalStorageJson('code')},
            async: true,
            success: function (datas) {
                callback(datas.count);
            },error:function(e){
                callback('error');
            }
        });
    },
    _onPickerGetToday:function(date){
       var d;
       if(date == undefined){
            d=encodeURI(app._getTimeZone());
       }else{
            d=encodeURI(date.getFullYear() +'-'+ (date.getMonth()+1) +'-'+ date.getDate());
       }
       var thisDate = app._getTimeZone();
       if(Date.parse(d).valueOf() < Date.parse(thisDate.replace(/-/g, "/")).valueOf()){
            app._dialog('請選擇正確日期');
       }else{
            if(Date.parse(d).valueOf()-Date.parse(thisDate.replace(/-/g, "/")).valueOf() > 2592000000){
                app._dialog('預約時間不可超過30天。');
            }else{
                if(_facTime.split('_')[0].length>=5){      
                    if(app._getReservationRule(d,_dayrule)=='open'){
                        var start=_facTime.split('_')[0].substring(0,5).replace(':','');
                        var due=_facTime.split('_')[1].substring(0,5).replace(':','');
                        _mobile.changePage("reservationDate.html", { changeHash: true, data:{'paremeter':_facCom,'pf':_facPf,'d':d,'start':start,'due':due,'max':_maxmum,'rule':_dayrule}}); 
                    }else{
                        app._dialog(d+' '+app._getWeekDay(d)+'公設未開放');
                    }
                }else{
                    if(app._getReservationRule(d,_dayrule)=='open'){
                        if($('#pf_week').text().split(' ')[0]!=d){
                            var start=_facTime.split('_')[0].substring(0,4);
                            var due=_facTime.split('_')[1].substring(0,4);
                            app._loadingShow();
                            setTimeout(function(){
                                $('#pm ul,#am ul').find('li').remove();
                                $('#pf_week').text(d +' '+app._getWeekDay(d));
                                var val;
                                if(start.substring(0,1)=='0'){
                                    val=parseInt(start.substring(1,start.length));
                                }else{
                                    val=parseInt(start);
                                }
                                var max=_maxmum;
                                var people;
                                var pros=new Object();
                                pros.pf_id=_facPf;
                                pros.date=d;
                                $.ajax({
                                    dataType:'json',
                                    url: app._getWebServiceMethod('getReservationInfo'),
                                    type: 'post',
                                    data: { jsonVal:JSON.stringify(pros) },
                                    async: false,
                                    complete:function(){app._loadingHide();},
                                    success: function (datas) {
                                        people=datas;
                                    }
                                });
                                while(val < parseInt(due)){
                                    if(val < 1000){
                                        if(val <100){
                                            if(val==0){
                                                start='0000';
                                            }else{
                                                start='0030';
                                            }
                                        }else{
                                            start = '0'+ val;
                                        }  
                                    }else{
                                        start = val;
                                    }
                                    max=_maxmum;
                                    $.each(people,function(i,v){
                                        if(start==v.time){
                                            max= max-v.count;     
                                        }
                                    });
                                    start= String(start).substring(0,2);
                                    var s= val % 100 == 0 ? 30:70;
                                    app._reservationList(start,val,max,s,d);
                                    val+=s;
                                 }
                            },500);
                        }
                    }else{
                         app._dialog(d+' '+app._getWeekDay(d)+'公設未開放');
                    }
                }    
            }
       }      
    },
    _onActionSheetFee:function(buttonIndex){
        switch(buttonIndex){
            case 1:
                localStorage.removeItem('bc');
                document.getElementById('index').querySelector('#cashflow_btn span').style.display='none';
                //$('#index').find('#cashflow_btn span').hide();
                app._dialog('已清除暫存條碼');
                break;
            default:
                if(buttonIndex-2 ==JSON.parse(app._getLocalStorage('bc')).items.length)
                {
                    if (app._getLocalStorageJson('com_count') > 1) {
                        _mobile.changePage('communityList.html', { changeHash: true, data:{'paremeter':'payment.html'} });
                    }else{
                        _mobile.changePage('payment.html', { changeHash: true, data: { 'paremeter': JSON.parse(app._getLocalStorage('comInfo')).info[0].id } });
                    }
                }else if(buttonIndex-3 ==JSON.parse(app._getLocalStorage('bc')).items.length){

                }else{
                    $.each(JSON.parse(app._getLocalStorage('bc')).items,function(i,v){
                           if(i+2==buttonIndex){
                           _mobile.changePage("paymentCvs.html", { changeHash: true, data:{com:v.com_id,bank:v.bank_id,user:v.user_id,save:'yes'} });
                           }
                    });
                }
               
                break;
        }
    },
    _onActionSheet:function(buttonIndex){  
      
        var page=document.getElementById('feedbackEdit_v2');
        
        page.querySelector('.s-loading').style.display='block';
        page.querySelector('.icon-camera').style.display='none';  
        
        setTimeout(function() {
          if(buttonIndex==1){     
             navigator.camera.getPicture(app._onCamSuccess, app._onCamFail, 
             {
                 quality : 50,
                 destinationType : Camera.DestinationType.DATA_URL,
                 sourceType : Camera.PictureSourceType.CAMERA,
                 allowEdit : false,
                 saveToPhotoAlbum: false
             });
          }else if(buttonIndex==2){
            navigator.camera.getPicture(app._onCamSuccess, app._onCamFail, 
             {
                 quality : 50,
                 destinationType : Camera.DestinationType.DATA_URL,
                 sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
                 allowEdit : false
             });
          }else{
            page.querySelector('.s-loading').style.display='none';
            page.querySelector('.icon-camera').style.display='block';  
          }
        });
    },
    _validateEmail:function(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
    },
    _getProfileAjax:function(callback){
        //if(app._getLocalStorage('profileInfo')==null || JSON.parse(app._getLocalStorage('profileInfo')).community=='[]'){
            $.ajax({
                url: app._getWebServiceMethod('getProfilePageInfo'),
                type: 'post',
                data: { code: app._getLocalStorageJson('code')},
                async: true,
                success: function (datas) {
                    //app._setLocalStorage('profileInfo',JSON.stringify(datas));
                    callback(datas);
                },error:function(){
                    callback('fail');
                }
            });
        //}else{
            //callback(JSON.parse(app._getLocalStorage('profileInfo')));
        //}
        
    },
    _getProfileInfo:function(_pro){
          var domStr='';
        app._getProfileAjax(function(datas){
            if(datas=='fail'){
                app._dialog('資訊取得失敗，請稍候再試');
                _mobile.changePage('index.html', { changeHash: true, reverse: true });
            }else{
             var name =JSON.parse(datas.user)[0].name;
                 var is_privacy=JSON.parse(datas.user)[0].is_privacy;
               if(is_privacy == '1'){
                    _pro.find('#privacy_btn').removeClass('off').addClass('on').find('span').text('已啟用');
                    //_pro.find('#privacy_label').find('span').text('已啟用');
               }
                if(name !=''){
                    _pro.find('.mark_txt').text(name).addClass('done');
                    //_pro.find('#info_p').append('<i class="icon-edit edit"></i>').find('#subtitle_btn').remove();
                    //app._setLocalStorageJson('user','yes'); 
                    app._setLocalStorage('deviceName',name);
                    document.getElementById('index').querySelector('#profile_btn i').style.display='none';
                    //$('#index').find('#profile_btn i').hide(); 

                    //$('#profile').find('#profile_info').removeClass('focus');
                    $('.icon-men-admin-s').parent().find('span').remove(); 
                }else{
                      document.getElementById('index').querySelector('#profile_btn i').style.display='block';
                }
                if(datas.community !='[]'){
                    domStr='<ul>';
                    $.each(JSON.parse(datas.community),function (i, v) {
                        domStr+='<li>';
                        domStr+='<a id="p_'+ i +'">';
                        domStr+='<p style="line-height:initial;">';
                        domStr+='<input type="hidden" value="'+ v.com_id +'" />';
                        domStr+='<input type="hidden" value="'+ v.tablet_id +'" />';
                        domStr+='<span class="communityN">';
                        domStr+='<span class="tablet">'+v.community +' '+ v.tablet_note +'</span>';
                        domStr+='<span class="point">點數 <span>'+ v.point +'</span></span>';
                        domStr+='</span>'
                        domStr+='<span class="openStatus">已開通 手機：<span>';
                        domStr+=v.mobile_count ==undefined ? '--' : v.mobile_count;
                        domStr+='</span> / 載具：<span>';
                        domStr+=v.carrier_count == undefined ? '--': v.carrier_count;
                        domStr+='</span></span>';
                        domStr+='</p>';
                        domStr+='</a>';
                        domStr+='</li>';
                    });
                }else{
                    domStr +='<ul>';
                    domStr+='<li>';
                    domStr+='<a id="no_login">';
                    domStr+='<p style="line-height:initial;">';
                    domStr+='<span class="communityN noneOpen">';
                    domStr+='<span class="tablet">尚未開通</span>';
                    domStr+='<i class="icon-chevron-right"></i>';
                    domStr+='</span>';
                    domStr+='<span class="openStatus">請持我的條碼至管理室辦理開通</span>';                  
                    domStr+='</p>';
                    domStr+='</a>';
                    domStr+='</li>';
                }
                if(domStr !=''){
                    domStr+='</ul>';
                    _pro.find('#p_community').append(domStr).trigger('refresh');
                }

            }
                app._loadingHide(300);
        });
        return '';
    },
    _sendMesaage:function(jsonStr,callback){
        var settings = {
          "async": true,
          "crossDomain": true,
          "url": app._getWebApi('Message','sendMessage'),
          "method": "POST",
          "headers": {
            "content-type": "application/json",
            "cache-control": "no-cache"
          },
          "processData": false,
          "data": jsonStr,
          "error":function(ex){
            app._connectionDialog();
            return false;
          }
        }
        $.ajax(settings).done(function (response) {
           callback(response);
        });
    },
    _sendReservation:function(jsonStr,callback){
        var settings = {
          "async": true,
          "crossDomain": true,
          "url": app._getWebApi('Facilities','sendReservation'),
          "method": "POST",
          "headers": {
            "content-type": "application/json",
            "cache-control": "no-cache"
          },
          "processData": false,
          "data": jsonStr
        }
        $.ajax(settings).done(function (response) {
           callback(response);
        });
    },
    _setCancelReservation:function(res_id,callback){
        var settings = {
          "async": true,
          "crossDomain": true,
          "url": app._getWebApi('Facilities','setCancelReservation')+'?code='+ app._getLocalStorageJson('code') +'&res_id='+res_id,
          "method": "PUT",
          "headers": {
            "content-type": "application/json",
            "cache-control": "no-cache"
          }
        }
        $.ajax(settings).done(function (response) {
           callback(response);
        });
    },
    _getResHistory:function(com_id,callback){
        $.ajax({
            dataType: 'json',
            url: app._getWebApi('Facilities','getResHistory'),
            type: 'GET',
            data: 'code='+ app._getLocalStorageJson('code') +'&com_id='+com_id,
            async: true,
            success: function (datas) {
                callback(datas);
            },error: function (){
                app._connectionDialog();
            }
        });
    },
    _getReservationList:function(com_id,callback){
        if(this._getLocalStorage('facilities') =='' || JSON.parse(this._getLocalStorage('facilities')).com_id != com_id){
            $.ajax({
                dataType: 'json',
                url: app._getWebApi('Facilities','getFacilitiesList'),
                type: 'GET',
                data: 'code='+ app._getLocalStorageJson('code') +'&com_id='+com_id,
                async: true,
                success: function (datas) {
                    app._setLocalStorage('facilities',JSON.stringify(datas));
                    //app._getLocalStorage('facilities')
                    callback(datas);
                }
            });
        }else{
            callback(JSON.parse(this._getLocalStorage('facilities')));
        }       
    },
    _insertReservation:function(datas,com_id){
        $.ajax({
            dataType: 'json',
            url: app._getWebServiceMethod('sendReservationInfo'),
            type: 'post',
            data: {jsonVal:datas},
            async: false,
            complete: function () { app._loadingHide(); },
            success: function (datas) {
                if(datas.status=='success'){
                    app._dialog('預約成功');
                    _mobile.changePage("reservationHistory.html", { changeHash: true,reverse:true,data:{'paremeter':com_id}});
                }else{
                    if(datas.status!='fail'){   
                        var infoJson = '{"info":' + datas.status + '}';
                        var str='';
                        var d;
                        $.each(JSON.parse(infoJson).info,function(i,v){
                            str+='時段：'+v.date +' \n';
                            d=parseInt(v.date.replace(':',''));
                            $('#chk_'+ d).find('span').attr('class','full').text('已滿');
                            $('#chk_h_'+ d).prop('checked', false).attr({'disabled':'disabled'});
                            $('#li_'+ d).find('.p-count').remove();
                        })
                        app._dialog('很抱歉，以下時段預約已額滿：\n\n'+ str);
                    }else{
                        app._dailog('很抱歉，系統忙錄請稍後在嘗試。');
                    }
                }
            },error:function(){
                app._connectionDialog();
            }
        });
    },
    _reservationList:function(start,val,max,s,day){
        var domStr;
         var Today=new Date();
        var today=Today.getFullYear() +"-"+ (Today.getMonth()+1) +"-"+ Today.getDate();
        if(today == day &&  Today.getHours()+1 > parseInt(start)){
             domStr ='<li id="li_'+ val +'" class="non-reservation">';
        }else{
             domStr ='<li id="li_'+ val +'" >';
        }
        if(val >=1000){
            domStr += start +':'+ String(val).Right(2) +'-'+ String(parseInt(val + s)).substring(0,2)+':'+String(parseInt(val + s)).Right(2);
         }else{
            if(val+s==1000){
                domStr += start +':'+ String(val).Right(2) +'-'+ String(parseInt(val + s)).substring(0,2)+':'+String(parseInt(val + s)).Right(2);
            }else{
                if(val >=100){
                   domStr += start +':'+ String(val).Right(2) +'-'+ String('0'+parseInt(val + s)).substring(0,2)+':'+String(parseInt(val + s)).Right(2); 
               }else{
                   if(val==0){
                    domStr+='00:00-00:30';
                   }else{
                    domStr+='00:30-01:00';
                   }
               }
            }
         }
          if(today == day && Today.getHours()+1 > parseInt(start)){
             domStr +='<span class="p-count">餘 <span id="ex_'+val+'">'+max+'</span></span>'; 
         }else{
             domStr +='<label for="chk_h_'+ val +'" class="touchArea"></label>';
             if(max != 0){
                domStr +='<span class="p-count">餘 <span id="ex_'+val+'">'+max+'</span></span>';
             }           
             domStr +='<input type="hidden" id="exh_'+ val +'" value="'+max+'" />';
             domStr +='<div class="checkItem">';
             domStr +='<p>';
             domStr +='<input id="chk_h_'+ val +'" value="'+val+'" ';
             if(max == 0){
                domStr+='disabled="disabled"';
             }

             domStr +=' type="checkbox" name="chk_h" data-role="none" />';
             domStr +='<label id="chk_'+ val +'"  for="chk_h_'+ val +'" class="label_chk">';
             domStr += max != 0 ? '<span>可約' :'<span class="full">已滿';
             domStr +='</span></label>';
             domStr +='<input id="count_h_'+val+'" type="hidden" value="0" />'
             domStr +='</p>';
             domStr +='</div>';
         }
         domStr +='</li>';
        if(val >=1200){
            $('#pm .h').append(domStr).trigger('refresh');
        }else{
            $('#am .h').append(domStr).trigger('refresh');
        }
          
    },
    _commnityAnnouncement:function(userli,type){
        var method;
        switch(type){
            case 'announcement_v2.html':
                method='getAnnouncementCount';
            break;
            case 'feedback.html':
                method='getMessageCount';
                _msgBadgeCount=0;
            break;
            case 'postal.html':
                method ='getPostalCount';
                _postalBadgeCount=0;
            break;
        }
         $.ajax({
            dataType: 'json',
            url: app._getWebServiceMethod(method),
            type: 'post',
            data: { code: app._getLocalStorageJson('code')},
            async: true,
            success: function (datas) {
                 $.each(datas, function (i, v) {
                    if(userli !='push'){
                        userli.find('#mark_'+ v.com_id).text(v.total).show();
                    }
                    if(method=='getPostalCount'){
                        _postalBadgeCount+=v.total;
                    }else if(method=='getMessageCount'){
                        _msgBadgeCount+=v.total;
                    }
                 });
                 var index=document.getElementById('index');
                if(method=='getPostalCount' && _postalBadgeCount >0){
                    index.querySelector('#postal_btn span').innerText=_postalBadgeCount;
                    index.querySelector('#postal_btn span').style.display='block';
                    $('.icon-package').parent().append('<span class="badgeBig" >'+ _postalBadgeCount +'</span>');   
                }else if(method=='getMessageCount' && _msgBadgeCount >0){
                    index.querySelector('#feedback_btn span').innerText=_msgBadgeCount;
                    index.querySelector('#feedback_btn span').style.display='block';
                    if(userli =='push'){
                        $('.icon-home').parent().append('<span class="badgeBig">N</span>'); 
                    }                
                } 

            }
        });
    },
    _getBrickDetailAdInfo:function(d,v){
        var contentsTxt;
        var url;
        $.ajax({
            dataType: 'json',
            url: app._getWebServiceMethod('getBrickDetailAd'),
            type: 'post',
            data: { code: app._getLocalStorageJson('code'),bd_id:v},
            async: true,
            success: function (datas) {
                 url='<img style="width:100%;" alt="" src="http://202.39.212.221/CHK/ad/';
                 d.find('.detail-h').show();
                 $.each(datas, function (i, v) {  
                    if(i==0){
                        url=url+''+v.bd_id+'/';
                    }
                    d.find('.detail-h h3').text(v.title);                
                    d.find('.detail-h span:eq(0)').text(v.create_date);  
                    d.find('.detail-h span:eq(1)').append(v.total); 
                    d.find('.ad-banner img').attr({'src':v.title_img}); 
                    contentsTxt=v.contents;
                    if(v.title_img !='') {
                        d.find('.ad-banner img').show();
                    }
                    
                    if(v.img_json !='' && JSON.parse(v.img_json).length > 0){
                       // alert(v.img_json);
                        $.each(JSON.parse(v.img_json), function (idx, val) {  
                            contentsTxt=contentsTxt.replace(val.K,url +''+ val.L + '.png" />');
                        });
                    }
                    
                    d.find('.ad-txt').html(contentsTxt);
                    if(v.link_json !='' && JSON.parse(v.link_json).length > 0){
                        d.find('#qk_link').addClass("qk-link-wrap-col"+ JSON.parse(v.link_json).length);
                        $.each(JSON.parse(v.link_json), function (idx, val) {  
                            var _div;
                            var _a;
                            var _input;
                            if(val.n=='立即申裝'){
                                _div=$('<div />',{text:'我要諮詢'});
                            }else{
                                _div=$('<div />',{text:val.n});
                            }                    
                            _input=$('<input />',{type:'hidden',value:val.type});
                            _div.append(_input);
                            if(val.n=='立即申裝'){
                                _input=$('<input />',{type:'hidden',value:'isp'});
                            }else if(val.n=='看更多'){
                                _input=$('<input />',{type:'hidden',value:'more-k'});                               
                            }else{
                                _input=$('<input />',{type:'hidden',value:val.link});
                            }
                            _div.append(_input);
                            d.find('#qk_link').append(_div).trigger('refresh');
                        });
                    } 

                 });   
                app._loadingHide(300);          
            }
        });
    },
    _tagProfileIsSet:function(){
        if(app._getLocalStorage('deviceName')==null){
            $('.icon-men-admin-s').parent().append('<span class="badge"></span>');
        }
    },
    _getProfileIsSet:function(){      
        $.ajax({
            dataType: 'json',
            url: app._getWebServiceMethod('getUserNameIsSet'),
            type: 'post',
            data: { device: app._getLocalStorageJson('code')},
            async: true,
            success: function (datas) {
                if(datas.status!='is_set'){
                    window.localStorage.removeItem('deviceName');
                    document.getElementById('index').querySelector('#profile_btn i').style.display='block';
                    //$('#index').find('#profile_btn i').show();
                }
            }
        });
    },
    _getBrickTag:function(d){
        var dom=$(d);
        document.getElementById('index').querySelector('span.badge2').style.display='none';
        $('.badge').hide();
       var count=0;
       var repeatCount=1;
       var arr=[];
       $.ajax({
            dataType: 'json',
            url: app._getWebServiceMethod('getProfilePageInfo'),
            type: 'post',
            data: { code: app._getLocalStorageJson('code')},
            async: true,
            success: function (val) {
                $.each(JSON.parse(val.community),function (i, v) {
                    if(arr.indexOf(v.com_id) ==-1){
                        arr.push(v.com_id);
                        count++
                    }else{
                        repeatCount++;
                    }                   
                });
                $.ajax({
                    dataType: 'json',
                    url: app._getWebServiceMethod('getBrickTag'),
                    type: 'post',
                    data: { code: app._getLocalStorageJson('code')},
                    async: true,
                    success: function (datas) {
                         $.each(datas, function (i, v) {                   
                            if(v.postal > 0){
                                _postalBadgeCount=v.postal;
                                dom.find('#postal_btn span').text(v.postal).show(); 
                            }

                            if(v.ann > 0){
                                if(repeatCount==1){
                                    dom.find('#announcement_btn span').text(v.ann).show();
                                    _annBadgeCount=v.ann;
                                }else{
                                    if(count==1){
                                        dom.find('#announcement_btn span').text(v.ann/repeatCount).show();
                                        _annBadgeCount=v.ann/repeatCount
                                    }else{
                                        dom.find('#announcement_btn span').text('N').show();
                                        _annBadgeCount=-1;
                                    }                               
                                }                        
                            }
                            if(v.msg > 0){
                                dom.find('#feedback_btn span').text(v.msg).show();
                                _msgBadgeCount=v.msg;
                            }
                            if(v.push > 0){
                                dom.find('#mymsg_btn span').text(v.push).show();
                            }
                            if(v.collection > 0){
                                dom.find('#collection_btn span').text(v.collection).show();
                            }
                         });             
                    }
                });
            }
        });
    },
    _editReservationInfo:function(r_id,count,callback){
        $.ajax({
            dataType: 'json',
            url: app._getWebServiceMethod('editReservationInfo'),
            type: 'post',
            data: { code: app._getLocalStorageJson('code'),r_id:r_id,count:0},
            async: true,
            success: function (datas) {
                callback(datas.status);
            },error:function(){
                callback('fail');
            }
        });
    },
    _getISPAd:function(ajax_dir){
         $.ajax({
            dataType: 'json',
            url: ajax_dir + '/getADImg',
            type: 'post',
            async: true,
            success: function (datas) {               
                $('#rates_ad').attr({src:datas.banner});
            },error:function(){
                $('#rates_ad').attr({src:'img/more/k/ad_01_none.png'});
            }
        });
    },
    _editPostalNotificationIsRead:function(com){
        $.ajax({
            dataType: 'json',
            url: app._getWebServiceMethod('editPostalNotificationIsRead'),
            type: 'post',
            data: { code: app._getLocalStorageJson('code'),com_id:com},
            async: true,
            success: function (datas) {
            }
        });
    },
    _editNotificationIsRead:function(s){
        $.ajax({
            dataType: 'json',
            url: app._getWebServiceMethod('editNotificationRecordTotal'),
            type: 'post',
            data: { code: app._getLocalStorageJson('code'),type:s},
            async: true,
            success: function (datas) {
            }
        });
    },
    _getNotificationRecord:function(dom,s){

         dom.find('#segmented-div-a ul,#segmented-div-b ul').html('').parent().hide();
        dom.find('div.empty').hide();
        var n_type;
        switch(s){
            case 'system':
                n_type='D';
            break;
            case 'bonus':
                n_type='E'
            break;
            default:
                n_type ='C'
            break;
        }
        dom.find('a').removeClass('active');
        document.getElementById('index').querySelector('#mymsg_btn span').style.display='none';
        var jsonStr;
        if(app._getLocalStorage('msgList')==null){
            $.ajax({
                dataType: 'json',
                url: app._getWebApi('Message','getNotificationList'),
                type: 'get',
                data: 'code='+app._getLocalStorageJson('code'),
                async: true,
                success: function (datas) {

                    app._setLocalStorage('msgList',JSON.stringify(datas));
                    $.each(datas, function (i, v) {

                        jsonStr= v.attached_file.length==0 ? '<li>':'<li class="file">';
                        if(v.n_type=='ad'){
                            jsonStr+='<input type="hidden" value="'+ v.n_type +'" />';
                            jsonStr+='<input type="hidden" value="'+ v.a_linkType +'" />';
                            if(v.a_call =="" || v.a_call==null){
                                if(v.a_linkType=='3'){
                                    jsonStr+='<input type="hidden" value="'+ v.a_bd_id +'" />';
                                }else{
                                    jsonStr+='<input type="hidden" value="'+ v.a_urlLink +'" />';
                                }
                            }else{
                                jsonStr+='<input type="hidden" value="'+ v.a_call.replace('-','') +'" />';
                            }                      
                        }else{
                            jsonStr+='<input type="hidden" value="'+ v.com_id +'" />';
                        }
                        jsonStr+='<div class="li-wrap">';
                        jsonStr+='<div class="info">';
                        if(v.n_content.indexOf('點數') != -1){
                            jsonStr+='<span class="cgy color-b">點數異動</span>';
                        }else if(v.n_content.indexOf('預約公設') !=-1 ){
                            jsonStr+='<span class="cgy color-o">公設預約</span>';
                        }else{
                            if(v.n_type !='ad'){
                                jsonStr+= v.n_type=='系統訊息' ? '<span class="cgy color-r">系統通知</span>':'<span class="cgy color-r">管理室通知</span>';
                            }else{
                                jsonStr+= '<span class="cgy color-b2">'+v.a_title+'</span>'
                            }
                       }
                        
                        //jsonStr+='<span class="cgy color-b"><i class="icon-r-point"></i>點數異動</span>';
                        //jsonStr+='<span class="cgy color-p"><i class="icon-collectionP-s"></i>寄放物品</span>';
                        //jsonStr+='<span class="cgy color-o"><i class="icon-r-time"></i>公設預約</span>';
                        //jsonStr+='<span class="cgy color-g"><i class="icon-update"></i>系統更新</span>'; 
                        jsonStr+='<h4>'+v.n_content.replace('[住戶訊息]','').replace('[系統訊息]','').replace('[好康通知]','')+'</h4>';
                        jsonStr+=v.attached_file.length>0 ? '<p class="file-tag"><span class="f_num"><i class="icon-clip"></i>含附檔 '+ v.attached_file.length+'</span></p>':'';
                        if(v.n_type!='ad'){
                            jsonStr+='<p><span>'+ v.n_date +'</span>  <span>'+ v.community+'</span></p>';
                        }else{
                            jsonStr+='<p><span>'+ v.n_date +'</span>  <span>'+ v.a_sourceName+'</span></p>';
                        }
                        
                        jsonStr+=v.attached_file.length>0 ? '<i class="icon-chevron-right arrow"></i>':'';
                        jsonStr+='</div>';

                        if(v.attached_file.length>0){
                            jsonStr+='<div class="file-attached" >';
                            jsonStr+='<div class="info">';
                            jsonStr+='<div class="fileWrap">';
                            jsonStr+='<p class="subtitle">檢視附加檔案</p>';
                            jsonStr+='<ul>';
                            for(var j=0;j<v.attached_file.length;j++){
                                jsonStr+='<li><a><input type="hidden" value="'+ v.attached_file[j].file +'@'+ v.com_id +'" /><i class="icon icon-clip"></i>'+ v.attached_file[j].file.split('.')[1] +' '+ (j+1) +'</a></li>';
                            }                                           
                            jsonStr+='</ul>';
                            jsonStr+='</div>';
                            jsonStr+='</div>';
                            jsonStr+='<i class="icon-close arrow"></i>';
                            jsonStr+='</div>';
                        }
                        jsonStr+='</div>';
                        jsonStr+='</li>';
                        if(v.n_type=='社區通知' || v.n_type=='ad'){
                            dom.find('#segmented-div-a ul:eq(0)').append(jsonStr).trigger('refresh');
                        }else if(v.n_type=='系統訊息'){
                            dom.find('#segmented-div-b ul:eq(0)').append(jsonStr).trigger('refresh');
                        }                
                    });
                    
                    if(s=='system'){
                        if(dom.find('#segmented-div-b ul li').length == 0 ){
                            dom.find('#segmented-div-b').hide();
                            dom.find('div.empty').show();
                        }else{
                            dom.find('#segmented-div-b').show();
                            
                        }
                        dom.find('div.navbar ul li:eq(1) a').addClass('active');
                    }else{

                        
                        if(dom.find('#segmented-div-a ul li').length == 0 && dom.find('input').val() ==''){
                            dom.find('#segmented-div-a').hide();
                            dom.find('div.empty').show();
                                                   
                        }else{
                            dom.find('#segmented-div-a').show();
                            
                        }
                        dom.find('div.navbar ul li:eq(0) a').addClass('active');
                    }
                    app._loadingHide(300);
                },error:function(){
                     app._dialog('資訊取得失敗，請稍候再試');
                    _mobile.changePage('index.html', { changeHash: true, reverse: true });
                }
            });
        }else{
            $.each(JSON.parse(app._getLocalStorage('msgList')), function (i, v) {
                jsonStr= v.attached_file.length==0 ? '<li>':'<li class="file">';
                if(v.n_type=='ad'){
                    jsonStr+='<input type="hidden" value="'+ v.n_type +'" />';
                    jsonStr+='<input type="hidden" value="'+ v.a_linkType +'" />';
                    if(v.a_call =="" || v.a_call==null){
                        
                        if(v.a_linkType=='3'){
                            jsonStr+='<input type="hidden" value="'+ v.a_bd_id +'" />';
                        }else{
                            jsonStr+='<input type="hidden" value="'+ v.a_urlLink +'" />';
                        }
                    }else{
                        jsonStr+='<input type="hidden" value="'+ v.a_call.replace('-','') +'" />';
                    }                      
                }else{
                    jsonStr+='<input type="hidden" value="'+ v.com_id +'" />';
                }
                jsonStr+='<div class="li-wrap">';
                jsonStr+='<div class="info">';
                if(v.n_content.indexOf('點數') != -1){
                    jsonStr+='<span class="cgy color-b">點數異動</span>';
                }else if(v.n_content.indexOf('預約公設') !=-1 ){
                    jsonStr+='<span class="cgy color-o">公設預約</span>';
                }else{
                    if(v.n_type !='ad'){
                        jsonStr+= v.n_type=='系統訊息' ? '<span class="cgy color-r">系統通知</span>':'<span class="cgy color-r">管理室通知</span>';
                    }else{
                        jsonStr+= '<span class="cgy color-b2">'+v.a_title+'</span>'
                    }
                }
                
                //jsonStr+='<span class="cgy color-b"><i class="icon-r-point"></i>點數異動</span>';
                //jsonStr+='<span class="cgy color-p"><i class="icon-collectionP-s"></i>寄放物品</span>';
                //jsonStr+='<span class="cgy color-o"><i class="icon-r-time"></i>公設預約</span>';
                //jsonStr+='<span class="cgy color-g"><i class="icon-update"></i>系統更新</span>'; 
                jsonStr+='<h4>'+v.n_content.replace('[住戶訊息]','').replace('[系統訊息]','').replace('[好康通知]','')+'</h4>';
                jsonStr+=v.attached_file.length>0 ? '<p class="file-tag"><span class="f_num"><i class="icon icon-clip"></i>含附加檔案 '+ v.attached_file.length+'</span></p>':'';
                if(v.n_type!='ad'){
                    jsonStr+='<p><span>'+ v.n_date +'</span>  <span>'+ v.community+'</span></p>';
                }else{
                    jsonStr+='<p><span>'+ v.n_date +'</span>  <span>'+ v.a_sourceName+'</span></p>';
                }
                jsonStr+=v.attached_file.length>0 ? '<i class="icon-chevron-right arrow"></i>':'';
                jsonStr+='</div>';
                if(v.attached_file.length>0){
                    jsonStr+='<div class="file-attached" >';
                    jsonStr+='<div class="info">';
                    jsonStr+='<div class="fileWrap">';
                    jsonStr+='<p class="subtitle">檢視附加檔案</p>';
                    jsonStr+='<ul>';
                    for(var j=0;j<v.attached_file.length;j++){
                        jsonStr+='<li><a><input type="hidden" value="'+ v.attached_file[j].file +'@'+ v.com_id +'" /><i class="icon icon-clip"></i>'+ v.attached_file[j].file.split('.')[1] +' '+ (j+1) +'</a></li>';
                    }                                           
                    jsonStr+='</ul>';
                    jsonStr+='</div>';
                    jsonStr+='</div>';
                    jsonStr+='<i class="icon-close arrow"></i>';
                    jsonStr+='</div>';
                }
                jsonStr+='</div>';
                jsonStr+='</li>';
                if(v.n_type=='社區通知' || v.n_type=='ad'){
                    dom.find('#segmented-div-a ul:eq(0)').append(jsonStr).trigger('refresh');
                }else if(v.n_type=='系統訊息'){
                    dom.find('#segmented-div-b ul:eq(0)').append(jsonStr).trigger('refresh');
                }              
            });
            if(s=='system'){
                if(dom.find('#segmented-div-b ul li').length == 0 ){
                    dom.find('#segmented-div-b').hide();
                    dom.find('div.empty').show();
                }else{
                    dom.find('#segmented-div-b').show();                   
                }
                 dom.find('div.navbar ul li:eq(1) a').addClass('active');
                   app._loadingHide(300);
            }else{
                 setTimeout(function(){
                if(dom.find('#segmented-div-a ul li').length == 0 && dom.find('input').val() ==''){

                    dom.find('#segmented-div-a').hide();
                    dom.find('div.empty').show();
                }else{
                    dom.find('#segmented-div-a').show();
                 
                }
                  app._loadingHide(300);
                },500);
                dom.find('div.navbar ul li:eq(0) a').addClass('active');
            }
          

        }
        
    },
    _getAdInfo:function(){
        var domStr='';
        socket.emit('get_AD',{
            'uuid': device.uuid
        });
        socket.on('sendAd_'+device.uuid,function(data) {
            document.querySelector('#ad_slide').innerHTML='';
            //$('#ad_slide').html('');
                if(document.querySelector('#ad_slide').innerHTML==''){
                $.each( JSON.parse(data), function (i, v) { 
                    var _div=$('<div />', {'class':'swiper-slide'});
                    var _a = $('<a />');
                    var _input = $('<input />',{'type':'hidden','value':''+ v.link +''});
                    _a.append(_input);
                    _input = $('<input />',{'type':'hidden','value':''+ v.brick_detail +''});
                    _a.append(_input); 
                    _input = $('<input />',{'type':'hidden','value':''+ v.link_type +''});
                    _a.append(_input);
                    var _img=$("<img />",{"src":""+ v.img_link +"","alt":""});
                    _a.append(_img);
                    var _span=$('<span />',{'text':'AD'});
                    _div.append(_a);
                    _div.append(_span);
                    $('#ad_slide').append(_div).trigger('refresh');

             });
            }
                if(JSON.parse(data).length>1){
                    app._swiperMoreList(); 
                }                
        });
        /*
        var domStr='';
        $.ajax({
            dataType: 'json',
            url: app._getWebServiceMethod('getAppAdInfo'),
            type: 'post',
            async: true,
            success: function (datas) {
                $('#ad_slide').html('');
                $.each( datas , function (i, v) { 
                    var _div=$('<div />', {'class':'swiper-slide'});
                    var _a = $('<a />');
                    var _input = $('<input />',{'type':'hidden','value':''+ v.link +''});
                    _a.append(_input);
                    _input = $('<input />',{'type':'hidden','value':''+ v.brick_detail +''});
                    _a.append(_input); 
                    _input = $('<input />',{'type':'hidden','value':''+ v.link_type +''});
                    _a.append(_input);
                    var _img=$("<img />",{"src":""+ v.img_link +"","alt":""});
                    _a.append(_img);
                    var _span=$('<span />',{'text':'AD'});
                    _div.append(_a);
                    _div.append(_span);
              
                    $('#ad_slide').append(_div).trigger('refresh');
                });
                    app._swiperMoreList();
            }
        }); 
        */
    },
    _getNotificationRecordTotal:function(d){
        $.ajax({
            url: app._getWebServiceMethod('getNotificationRecordTotal'),
            type: 'post',
            data: { code: app._getLocalStorageJson('code') },
            async: true,
            success: function (datas) { 
                if(datas.total !='0'){
                    d.find('span').text(datas.total).show();
                }
            }
        });
    },
     _mapRenew:function(m,s,h){
       $('#gasStationPin').find('#map_canvas').attr('style','height:'+h+'px;');
       _map = plugin.google.maps.Map.getMap(m, {
            'camera': {
              'latLng': s,
              'zoom': 13
            }
        });
    },
      _getCPCMainPrice:function(cpc){
        $.ajax({
            dataType: 'json',
            url: app._getWebServiceMethod('getCPCMainProdListPrice'),
            type: 'post',
            async: true,
            complete:function(){
                app._loadingHide(400);
            },
            success: function (datas) {
                $.each(datas, function (i, v) { 
                    if(i==0){
                        cpc.find('#gas_date').text(app._getFormatDate_md(v.牌價生效時間.split('T')[0]));
                    }
                    switch(v.產品編號)
                    {
                        case '113F 1209800':
                            cpc.find('#o_98').html(v.參考牌價);
                        break;
                        case '113F 1209500':
                            cpc.find('#o_95').html(v.參考牌價);
                        break;
                        case '113F 1209200':
                            cpc.find('#o_92').html(v.參考牌價);
                        break;
                        case '113F 5100100':
                            cpc.find('#o_diesel').html(v.參考牌價);
                        break;
                        case '113F 1229500':
                            cpc.find('#o_gas').html(v.參考牌價);
                            break;
                        break;
                    } 

                });
            }
        });   
    },
    _checkGasTime:function(s,d){
        var isopen=false;
        if(s=='00:00:00' && d=='1.00:00:00'){
             isopen=true;
        }else{
            var Today=new Date();
            var ScheduleDate = "2016/1/1 "+ s;
            var CurrentDate ="2016/1/1 "+ Today.getHours()+':'+ Today.getMinutes()+':00';
            if ( (Date.parse(ScheduleDate)).valueOf() < (Date.parse(CurrentDate)).valueOf())
            {
                if(d=='1.00:00:00'){
                    ScheduleDate = "2016/1/2 00:00:00";
                }else{
                    ScheduleDate = "2016/1/1 "+ d;
                }
                CurrentDate ="2016/1/1 "+ Today.getHours()+':'+ Today.getMinutes()+':00';
                if ( (Date.parse(ScheduleDate)).valueOf() > (Date.parse(CurrentDate)).valueOf())
                {
                    isopen=true;
                }
            } 
        }
        return isopen;
    },
    _isOil:function(v){
        var oil='';
           oil+=v.oil_92 =='1'? ' 92 /':'';
            oil+=v.oil_95 =='1'? ' 95 /':'';
            oil+=v.oil_98 =='1'? ' 98 /':'';
            oil+=v.diesel =='1'? ' 超級柴油 /':'';
            oil+=v.gasohol =='1'? ' 酒精汽油 /':'';
            oil+=v.kerosene =='1'? ' 煤油 /':'';
            oil=oil.substring(0,oil.length-1);
            return oil;
    },
    _gasStationPinInfo:function(marker,sn,_this){
        var info;
        $.ajax({
            dataType: 'json',
            url: app._getWebServiceMethod('getSTNStationALLInfo'),
            type: 'post',
            data:{sn:sn,lat:_geoLat,lon:_geoLon},
            async: true,
            complete:function(){
                app._loadingHide(400);
            },
            success: function (datas) {
                $.each(datas, function (i, v) {
                    var type =v.type.replace('站','')=='自營'?'直營':'加盟';
                    var due=v.open_due =='1.00:00:00' ? '24:00':v.open_due.substring(0,5);
                    var km=v.km==''? '':v.km+'公里 ';
                    var service='';
                    var latlon= v.latitude+','+v.longitude;
                    marker.setTitle(type+' 中國石油-'+v.station_name.replace("站","")+'站');    
                    marker.setSnippet(km + '營業時間：'+v.open_start.substring(0,5)+'~'+ due);
                    _this.find('div.map-info h4').text(v.station_name.replace("站","")+'站');
                    _this.find('#stn_address').text(v.address);
                    _this.find('#stn_tel').text(v.tel);
                    _this.find('#stn_add input').val(latlon);
                    _this.find('#stn_t').attr('href','tel:'+v.tel);
                    if(app._checkGasTime(v.open_start,v.open_due)==true){
                        _this.find('#stn_isopen').show();
                    }              
                    _this.find('#stn_open').text(v.open_start.substring(0,5) +'~'+due);
                 
                    _this.find('#stn_gastype').text(app._isOil(v));
                    service+= v.wash_car !='' ? 'ⓞ'+v.wash_car:'';
                    service+= v.etag !='' ? 'ⓞeTag儲值':'';
                    service+= v.service_car !='' ? 'ⓞ保養廠':'';
                    _this.find('#stn_service').html(service);
                 });            

                marker.showInfoWindow();
               // JSON.parse(v.attached_file)[0].f
            }
        });

    },
    _getCPCMainStationList:function(lat,lon,h,type){
        var pros =new Object();
        var domStr='';
        pros.city='';
        pros.area='';
        pros.lat=lat;
        pros.lon=lon;
        pros.km=_km;
        var gsl=$('#gasStationList');
         $.ajax({
            url: app._getWebServiceMethod('getSTNStation'),
            type: 'post',
            data:{val:'['+JSON.stringify(pros)+']'},
            async: true,
            complete:function(){
                gsl.find('.load-more span').text('點擊載入更多…');
                gsl.find('.s-loading').hide();
            },
            success: function (datas) {
                var gasJson = '{"info":' + datas + '}';
                gsl.find('#temp_json').val(gasJson);
                   gas = JSON.parse(gasJson);
                if(type=='list'){
                
                   $.each(gas.info, function (i, v) { 
                    if(v.km <=_km){
                    domStr+='<li>'
                        domStr+='<a>';
                        domStr+='<input type="hidden" value="'+ v.sn +':'+ v.latitude +':'+v.longitude +'" />';
                            domStr+='<div class="info">';
                                domStr+='<h4><span class="title">'+v.station_name.replace('站','') +'站</span>';
                                domStr+=v.type=='自營站'? '<span class="tag2 tag-private">' :'<span class="tag2 tag-direct">';                             
                                domStr+=v.type.replace('站','').replace('自營','直營')+'</span></h4>';
                                domStr+='<p>'+ v.city + v.area + v.address +'</p>';
                                domStr+='<p class="mt05">';
                                if(v.credit_diy=='1' || v.wash_car=='yes' || v.service_car=='yes' || v.etag=='yes')
                                {
                                    domStr+='<span class="tag">';
                                    domStr+=v.credit_diy=='1'? '自助加油/':'';
                                    domStr+=v.wash_car=='yes'? '洗車/':'';
                                    domStr+=v.service_car=='yes'? '保養/':'';
                                    domStr+=v.etag=='yes'? 'eTag儲值/':'';
                                    domStr=domStr.substring(0,domStr.length-1);
                                    domStr+='</span>';
                                    domStr+='</p>';
                                }
                            domStr+='</div>';
                            domStr+='<p class="km_txt"><span>距離 </span>'+ v.km +'km</p>';
                        domStr+='</a>';
                    domStr+='</li>';
                    }
                   });   
                   gsl.find('#station_list').html(domStr); 
                   gsl.find('.sorce').show();
                   $('html, body').animate({scrollTop:h},400); 
                     _km=5;
                }else{
                     $.each(gas.info, function (i, v) { 
                    var ma = new plugin.google.maps.LatLng(v.latitude,v.longitude);
                    var type =v.type.replace('站','')=='自營'?'直營':'加盟';
                    var due=v.open_due =='1.00:00:00' ? '24:00':v.open_due.substring(0,5);
                    var km=v.km==''? '':v.km+'公里 ';
                    var isopen=app._checkGasTime(v.open_start,v.open_due);
                    var color;
                    if(isopen==true){
                        color=type=='直營'? 'blue':'green'; 
                    }else{
                        color='#555555'; 
                    }
                    _map.addMarker({
                      'position': ma,
                      'icon':color,
                      'title': type+' 中國石油-'+v.station_name.replace("站","")+'站',
                      'snippet':km + '營業時間：'+v.open_start.substring(0,5)+'~'+ due+'\n'+app._isOil(v),
                      'infoClick': function(marker) {
                          navigator.notification.confirm(
                            '', // message
                                function (idx) {                
                                    if(idx==1){
                                         plugin.google.maps.external.launchNavigation({
                                          "from": lm,
                                          "to": ma
                                        });
                                    }          
                                },        
                                '是否啟用導行模式',
                                ['導航','關閉'] 
                            ); 
                      }
                    },function(marker){
                    });
                });
                 app._loadingHide(500);
                }       
            },error:function(){
                gsl.find('.load-more').hide();
                gsl.find('div.locator').show();
            }
        });
     
    },
     _getEnMonth:function(id){
         var en = ['', 'January', 'February', 'March', 'April', 'May', 'June','July','August','September','October','November','December'];       
        return en[id];
    },
     _getWeekDayIdx:function(day){
    var day_list = ['日', '一', '二', '三', '四', '五', '六'];
    return day_list[day];
    },
    _getCalendarType:function(id){
        var color=['blue','green','gray','yellow','red'];
        return color[id];
    },
     _getEnDay:function(id){
        //var en = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        var en = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];          
        return en[id];
    },
    _getCalendarType:function(id){
        var color=['blue','green','gray','yellow','red'];
        return color[id];
    },
    _getCalendarSwiperDom:function(swdom,yy){
        var thisYear=yy;
        var monthCount=1;
        var nowDate=new Date();
        var _div;
        var _table;
        var _tbody;
        var _tr;
        var _td;
        var _tdDiv;
        var _txt;
        var _att;
        var _input;
        var _span;
        var week=1;
        var _day=1;
        var curMonthDays;
        swdom.querySelector('.swiper-wrapper').innerHTML=''; 
         while(monthCount <= 12){       
            var thisDate=new Date(thisYear+'/'+ monthCount +'/1');
             week=1;
             _day=1;
             _div = document.createElement("div");
             _input = document.createElement("input");
             _input.type = "hidden";
             _input.value= monthCount;
             _div.appendChild(_input);
             _table=document.createElement('table');
             _tbody=document.createElement('tbody'); 
             _div.className='swiper-slide';          
             _table.className='clndr-table';
             _table.style.border='0px';
             _table.style.borderSpacing='0px';
             _table.style.padding ='0px';
             _tr=document.createElement('tr');
               while(week < 8){
                   _td=document.createElement('td');
                   if(week > thisDate.getDay()){
                      _td.className='day past';
                      _tdDiv=document.createElement('div');
                      _tdDiv.className='day-contents';
                      _txt=document.createTextNode(_day);
                      var thisD=new Date(thisYear+'/'+monthCount+'/'+_day);
                      var solar=LunarDate.SolarTerm(thisD);
                        if(nowDate.getFullYear()== thisYear && (nowDate.getMonth() + 1)==monthCount && nowDate.getDate()==_day ){
                          _td.className='day today focus-today';
                           var dateview=swdom.querySelectorAll('.full-day-show span');
                           dateview[0].innerText=monthCount <10 ? '0'+monthCount:monthCount;
                           dateview[0].innerText+='月';
                           dateview[0].innerText+=_day <10 ? '0'+_day:_day;
                           dateview[0].innerText+='日';
                           //dateview[1].innerText='週'+ app._getWeekDayIdx(week-1);
                          // alert(LunarDate.GetLunarDay(thisYear, monthCount , _day));
                          //alert(dateview[].innerText);
                          // dateview[5].innerHTML= LunarDate.GetLunarDay(thisYear, monthCount , _day)+'&nbsp;'+ solar;                                           
                           //swdom.querySelector('#chinaCalendar').innerHTML='<span>農曆</span><p>'+LunarDate.GetLunarDay(thisYear, monthCount , _day)+'</p>';
                           //swdom.querySelector('#chinaCalendar').innerHTML+='<p>'+solar+'</p>';
                            dateview[1].innerText='週'+ app._getWeekDayIdx(week-1);
                            dateview[4].innerHTML= LunarDate.GetLunarDay(thisYear, monthCount , _day)+'&nbsp;'+ solar; 
                        }
                      _tdDiv.appendChild(_txt);
                      _span = document.createElement("span");
                      _span.className='lunar';
                      if(solar=='&nbsp;'){
                        _txt=document.createTextNode(LunarDate.GetLunarDay(thisYear, monthCount, _day).split('月')[1]);
                      }else{
                        _txt=document.createTextNode(solar);
                      }
                      
                      _span.appendChild(_txt);
                      _tdDiv.appendChild(_span);
                    if(swdom.querySelector('#calendarVal').value !=""){
                    var calendarJson=JSON.parse(swdom.querySelector('#calendarVal').value);
                    if(calendarJson.length>0){                  
                        for(var i=0;i<calendarJson.length;i++){
                            if(monthCount==parseInt(calendarJson[i].month) && _day== parseInt(calendarJson[i].date)){
                                _span= document.createElement("span");
                                _span.className='tip-dot';
                                _txt=document.createElement('i');
                                _txt.className='icon-dot';
                                _span.appendChild(_txt);
                                 _tdDiv.appendChild(_span);
                                break;
                            }
                        }
                    }
                }
                     // <span class="tip-dot"><i class="icon-dot"></i></span>
                      _day++;
                   }else{
                      _td.className='day past adjacent-month last-month';
                      _tdDiv=document.createElement('div');
                      _tdDiv.className='day-contents';
                      _txt=document.createTextNode(' ');
                      _tdDiv.appendChild(_txt);
                   }
                    _td.appendChild(_tdDiv);
                    _tr.appendChild(_td);
                    week++;
                }
                _tbody.appendChild(_tr);
                week=1;
                curMonthDays = new Date(thisYear,monthCount,0).getDate();
        while(_day <=curMonthDays ){
            if(week==1){
               _tr=document.createElement('tr');
            }
            _td=document.createElement('td');
            _td.className='day past';
             var thisD=new Date(thisYear+'/'+monthCount+'/'+_day);
                      var solar=LunarDate.SolarTerm(thisD);
        if(nowDate.getFullYear()== thisYear && (nowDate.getMonth() + 1)==monthCount && nowDate.getDate()==_day ){

          _td.className='day today focus-today';
           var dateview=swdom.querySelectorAll('.full-day-show span');
           dateview[0].innerText=monthCount <10 ? '0'+monthCount:monthCount;
           dateview[0].innerText+='月';
           dateview[0].innerText+=_day <10 ? '0'+_day:_day;
           dateview[0].innerText+='日';
            dateview[1].innerText='週'+ app._getWeekDayIdx(week-1);
            dateview[4].innerHTML= LunarDate.GetLunarDay(thisYear, monthCount , _day)+'&nbsp;'+ solar; 
           
        }
            _tdDiv=document.createElement('div');
            _tdDiv.className='day-contents';
            _txt=document.createTextNode(_day);
            _tdDiv.appendChild(_txt);
              _span = document.createElement("span");
              _span.className='lunar';
              if(solar =='&nbsp;'){
                 _txt=document.createTextNode(LunarDate.GetLunarDay(thisYear, monthCount, _day).split('月')[1]);
              }else{
                  _txt=document.createTextNode(solar);
              }
              _span.appendChild(_txt);
              _tdDiv.appendChild(_span);
                if(swdom.querySelector('#calendarVal').value !=""){
                    var calendarJson=JSON.parse(swdom.querySelector('#calendarVal').value);
                    if(calendarJson.length>0){ 
                        
                        for(var i=0;i<calendarJson.length;i++){

                            if(monthCount==parseInt(calendarJson[i].month) && _day== parseInt(calendarJson[i].date)){
                                 _span= document.createElement("span");
                                _span.className='tip-dot';
                                _txt=document.createElement('i');
                                _txt.className='icon-dot';
                                _span.appendChild(_txt);
                                 _tdDiv.appendChild(_span);
                                 break;
                            }
                        }
                    }
                }
            _td.appendChild(_tdDiv);
            _tr.appendChild(_td);
            week++;
            if(week==8 || _day==curMonthDays){ 
              if(_day==curMonthDays){
               while(week<8){
               _td=document.createElement('td');
               _td.className='day adjacent-month next-month';
               _tdDiv=document.createElement('div');
               _tdDiv.className='day-contents';
               _txt=document.createTextNode(' ');
               _tdDiv.appendChild(_txt);
               _tdDiv.appendChild(_txt);
               _td.appendChild(_tdDiv);
               _tr.appendChild(_td);
               week++;
               }
              }
              _tbody.appendChild(_tr);
              week=1;
            }
            _day++;
        }
        _table.appendChild(_tbody);
        _div.appendChild(_table);
        swdom.querySelector('.swiper-wrapper').appendChild(_div); 
        monthCount++;
        }
      
                  if(nowDate.getFullYear()==thisYear){
                      _swiperCalendar.slideTo(nowDate.getMonth());
                  }else{
                    _swiperCalendar.slideTo(0);
                  }

    },
     _getCalendarFind:function(ca,calendarJson,th){
        var arr;
        var _li,_a,_div,_i,_h4,_span,_p,_input;
        var sd,ed;
        ca.querySelector('#calendarViewList').innerHTML='';
        for(var i=0;i<calendarJson.length;i++){
            arr=calendarJson[i].start_date.split('/');
            //alert(parseInt(arr[1])+'__'+parseInt(ca.querySelector('span.month span').innerText)+'__'+parseInt(arr[2])+'__'+parseInt(this.innerText.split('\n')[0]));
            if(parseInt(arr[1])==parseInt(ca.querySelector('span.month span').innerText) &&
                parseInt(arr[2])== parseInt(th.innerText.split('\n')[0])){
                //alert(calendarJson[i].start_date);
               // ca.querySelector('.view-list')

                if(parseInt(calendarJson[i].start_time.split(':')[0]) < 12){
                    sd='上午';
                }else{
                    sd='下午'
                }
                 if(parseInt(calendarJson[i].end_time.split(':')[0]) < 12){
                    ed='上午';
                }else{
                    ed='下午'
                }
               _li=document.createElement('li');
               _a=document.createElement('a');
               _input=document.createElement('input');
               _input.type='hidden';
               _input.value=calendarJson[i].id+'_'+ calendarJson[i].start_date;
               _a.appendChild(_input);
               _div=document.createElement('div');
               _div.className='info';
               _i=document.createElement('i');
               _i.className='icon-dot '+ app._getCalendarType(calendarJson[i].type);
               _h4=document.createElement('h4');
               _span=document.createElement('span');
               _span.className='title';
               _span.innerText=calendarJson[i].title;
               _h4.appendChild(_span);
               _p=document.createElement('p');
               _p.className='time';
               _p.innerText=sd +' '+ calendarJson[i].start_time +' - '+ ed +' '+calendarJson[i].end_time;
               _div.appendChild(_i);
               _div.appendChild(_h4);
               _div.appendChild(_p);
               if(app._getLocalStorageJson('com_count')>1){
                   _p=document.createElement('p');
                   _p.className='txt';
                   _p.innerText=calendarJson[i].community;
                   _div.appendChild(_p);
               }
               _a.appendChild(_div);
               _li.appendChild(_a);

               ca.querySelector('#calendarViewList').appendChild(_li);
              
            }
        }
         _li=document.createElement('li');
          ca.querySelector('#calendarViewList').appendChild(_li);
    },
    _getCalendarDom:function (calendar) {
         var domStr='';
         var Today=new Date();
         var obj=new Object();
         var h=0;
         var tempMonth;

         obj.device_sn=app._getLocalStorageJson('code');
         obj.name='year';
         obj.val=calendar.querySelector('.year').innerText.replace('年', '');
         var m=new Object();
         m.items=new Array();

         app._getCalendarInfo(obj,function(status){
            if(status!='error' && status !='error_source'){
                //app._setLocalStorage('calendarTemp',status.jsonStr);
                calendar.querySelector('#calendarVal').value=status.jsonStr;
                if(JSON.parse(status.jsonStr).length==0){
                    app._dialog('社區目前尚未登記'+calendar.querySelector('.year').innerText+'行事曆資訊');
                    _mobile.changePage('index.html', { changeHash: true, reverse: true });
                }else{
                $.each(JSON.parse(status.jsonStr), function (i, v) { 
                    if(i==0 || tempMonth !=v.month){                
                         domStr += i !=0 ?'</ul>':'';
                         domStr+='<ul class="timeline2">';
                         domStr+='<li class="timeline-group">';
                         domStr+='<span>'+ v.month +'月 '+ app._getEnMonth(v.month) +'</span>';
                         domStr+='</li>';
                         domStr+='</ul>';
                         domStr+='<ul class="timeline">';
                          if((Today.getMonth()+1) > v.month){
                            h+=35;
                         }
                         
                        var mm=new Object();
                         mm.title=v.month;
                         mm.h=h;
                         m.items.push(mm);
                         
                    }
                    domStr+='<li>';
                    domStr+='<input type="hidden" value="'+ v.id +'_'+ v.start_date +'" />';
                    domStr+='<div class="timeline-badge '+ app._getCalendarType(v.type)+'">';
                    domStr+='</div>';
                    domStr+='<div class="timeline-panel">';
                    domStr+='<div class="date">';
                    domStr+='<span class="day">'+v.date+'</span>';
                    domStr+='<span class="week">'+ app._getEnDay(v.week) +'</span>';
                    domStr+='</div>';
                    domStr+='<div class="info">';
                    domStr+='<div class="timeline-heading">';                
                    domStr+='<div>';               
                    domStr+='<h4 class="'+ app._getCalendarType(v.type)+'">'+ v.title+'</h4>';
                    domStr+='<p class="time"><i class="icon-clock"></i> ';
                    domStr+=v.start_time.split(':')[0] <=12 && v.start_time !='12:30' ? '上午':'下午';
                    domStr+=v.start_time +' - ';
                    domStr+=v.end_time.split(':')[0] <=12 && v.end_time !='12:30' ? '上午':'下午';
                    domStr+=v.end_time +'</p>';
                    if(app._getLocalStorageJson('com_count')>1){
                         domStr+='<p class="buildname">'+v.community+'</p>'; 
                    }
                    if(v.desc!=''){
                        domStr+='<p class="txt">'+ v.desc +'</p>';
                    }
                    domStr+='</div>';
                    domStr+='</div>';
                    domStr+='</div>'; 
                    domStr+='</div>';             
                    domStr+='</li>';              
                    tempMonth=v.month;  
                    if((Today.getMonth()+1)  > v.month){
                        h+=108;                 
                    }   
                     if(v.month==(Today.getMonth()+1)&& Today.getDate()==v.date){
                           _li=document.createElement('li');
                           _a=document.createElement('a');
                           _input=document.createElement('input');
                           _input.type='hidden';
                           _input.value=v.id+'_'+ v.start_date;
                           _a.appendChild(_input);
                           _div=document.createElement('div');
                           _div.className='info';
                           _i=document.createElement('i');
                           _i.className='icon-dot '+ app._getCalendarType(v.type);
                           _h4=document.createElement('h4');
                           _span=document.createElement('span');
                           _span.className='title';
                           _span.innerText=v.title;
                           _h4.appendChild(_span);
                           _div2=document.createElement('div');
                           _i2=document.createElement('i');
                           _i2.className='icon-calendar addtoCal-tag';
                           _p=document.createElement('p');
                            _p.innerText+=v.start_time.split(':')[0] <=12 && v.start_time !='12:30' ? '上午':'下午';
                            _p.innerText+=v.start_time +' - ';
                            _p.innerText+=v.end_time.split(':')[0] <=12 && v.end_time !='12:30' ? '上午':'下午';
                            _p.innerText+=v.end_time +'';
                            _div2.appendChild(_p);
                            if(app._getLocalStorageJson('com_count')>1){
                               _p=document.createElement('p');
                               _p.className='txt';
                               _p.innerText=v.community;
                               _div2.appendChild(_p);
                           }
                            _div2.appendChild(_i2);
                           _div.appendChild(_i);
                           _div.appendChild(_h4);
                           _div.appendChild(_div2);
                           _a.appendChild(_div);
                           _li.appendChild(_a);
                           document.querySelector('#calendarViewList').appendChild(_li);
                    }
         
                });
                }
                _li=document.createElement('li');
                document.querySelector('#calendarViewList').appendChild(_li);
                calendar.querySelector('#calendarJson').value=JSON.stringify(m);
                calendar.querySelector('#timelineDom').innerHTML = domStr+'<li class="extend"></li><li class="extend"></li><li class="extend"></li></ul>';
                if(calendar.querySelector('.year').innerText.replace('年', '')==Today.getFullYear()){
                    window.scrollTo(0, h);
                    app._loadingHide(500);
                }else{
                     app._loadingHide(300);
                }
              
            }else{

                  app._loadingHide(300);
                   app._dialog('資訊取得失敗，請稍候再試');
                _mobile.changePage('index.html', { changeHash: true, reverse: true });

            }
                app._getCalendarSwiperDom(calendar,calendar.querySelector('.year').innerText.replace('年', ''));
        });
                    
        
    
    },
    _getCalendarInfo:function(calendar,callback){
         $.ajax({
                //dataType: 'json',
                url: app._getWebServiceMethod('getCalendar'),
                data:{jsonStr:'['+ JSON.stringify(calendar) +']'},
                type: 'post',
                async: true,
                complete:function(){
                    //app._loadingHide(500);
                },
                success: function (datas) {
                    callback(datas);           
                },error:function(){
                    app._loadingHide(300);
                    callback('error');
                }
            });
    },
    _getActivityType:function(){
        var val='';
        var arr=['全部','藝文','休閒','學習','親子','音樂','活動']
        var i=0;
        while(i<arr.length){
            val+='<div class="swiper-slide">'+ arr[i] +'</div>';
            i++;
        }
        return val;
    },
    _getOpenDataUrl:function(id){
        var arr=[
            'http://opendata2.epa.gov.tw/AQX.json', //空氣品質監測
            'http://opendata.epa.gov.tw/ws/Data/UV/?format=json', //紫外線監測
        ];
        return arr[id];
    },
    _getRad:function(d){
        var PI = Math.PI;
        return d * PI /180.0;
    },
    _getFlatternDistance:function(lat1,lng1,lat2,lng2){
        var EARTH_RADIUS = 6378137.0;    //单位M
        var f = app._getRad((lat1 + lat2)/2);
        var g = app._getRad((lat1 - lat2)/2);
        var l = app._getRad((lng1 - lng2)/2);       
        var sg = Math.sin(g);
        var sl = Math.sin(l);
        var sf = Math.sin(f);        
        var s,c,w,r,d,h1,h2;
        var a = EARTH_RADIUS;
        var fl = 1/298.257;       
        sg = sg*sg;
        sl = sl*sl;
        sf = sf*sf;       
        s = sg*(1-sl) + (1-sf)*sl;
        c = (1-sg)*(1-sl) + sf*sl;        
        w = Math.atan(Math.sqrt(s/c));
        r = Math.sqrt(s*c)/w;
        d = 2*w*a;
        h1 = (3*r -1)/2/c;
        h2 = (3*r +1)/2/s;    
        return d*(1 + fl*(h1*sf*(1-sg) - h2*(1-sf)*sg));
    },
    _getAQXInfo:function(city,page){       
       $.ajax({
            url: app._getOpenDataUrl(0),
            async: true,
            success: function (datas) {
                var jsonStr=JSON.stringify(datas);
                $.each(JSON.parse(jsonStr),function(i,v){
                    if(i==0){
                        alert(v.Status);
                    }
                    //alert(v.County+':'+v['PM2.5']);
                });

            }
        }); 
        /*
        測站名稱(SiteName)、
        縣市(County)、
        空氣污染指標(PSI)、
        指標污染物(MajorPollutant)、
        狀態(Status)、
        二氧化硫濃度(SO2)、
        一氧化碳濃度(CO)、
        臭氧濃度(O3)、
        懸浮微粒濃度(PM10)、
        細懸浮微粒濃度(PM2.5)、
        二氧化氮濃度(NO2)、
        風速(WindSpeed)、
        風向(WindDirec)、
        發布時間(PublishTime)
        */
    },
    _getUVInfo:function(lat,lon,page){
        /*
        測站名稱(SiteName)、紫外線指數(UVI)、發布機關(PublishAgency)、縣市(County)、經度(WGS84)(TWD97Lon)、緯度(WGS84)(TWD97Lat)、發布時間(PublishTime)
        */
        var here=0;
        var m=0;
        var idx=0;
        $.ajax({
            url: app._getOpenDataUrl(1),
            async: true,
            success: function (datas) {
                 var jsonStr=JSON.stringify(datas);
                   $.each(JSON.parse(jsonStr),function(i,v){
                    var g_lat=v.WGS84Lat.split(',')[0].toString()+'.'+v.WGS84Lat.split(',')[1]+v.WGS84Lat.split(',')[2].replace('.','');
                    var g_lon=v.WGS84Lon.split(',')[0]+'.'+v.WGS84Lon.split(',')[1]+v.WGS84Lon.split(',')[2].replace('.','');
                    m = app._getFlatternDistance(lat,lon,parseFloat(g_lat),parseFloat(g_lon));
                    if(here==0 || here > m){
                        here=m;
                        idx=i;
                    }        
                });
                alert(JSON.parse(jsonStr)[idx].County);
            }
        }); 
 
    },
    _getISPBandwidth:function(ajax_dir){
        $.ajax({
            dataType: 'json',
            url: ajax_dir + '/versionCheck',
            type: 'post',
            data:{ v:''},
            async: true,
            success: function (datas) {
              $('#bandwidth,#download,#download_2,#download_3').text(datas.bandwidth);
            }
        });   
    },
    _annListShow:function(ann,_annTitle,_annList,_annType,_annL){
        
        var domStr = '';
        var arr=[];
        var temp;

        $.each(ann.info, function (i, v) {
                if (i == 0) {
                    arr.push(v.e);
                    temp = v.e;
                } else {
                    if (temp != v.e) {
                        arr.push(v.e)
                    }
                }
                domStr += app._annListDom(v);
            });
            _annList.html(domStr);
            _annList.trigger('create');
            arr = app._removeDupes(arr);
            domStr = '<div class="swiper-slide"><i class="icon-ann_all cgy"></i>全部</div>';
            for (var a in arr) {
                domStr += '<div class="swiper-slide">';
                switch(arr[a]){
                    case '活動':
                        domStr+='<i class="icon-ann_active cgy"></i>';
                    break;
                    case '維修保養':
                        domStr+='<i class="icon-ann_fix cgy"></i>';
                    break;
                    case '會議':
                        domStr+='<i class="icon-ann_meeting cgy"></i>';
                    break;
                    case '一般':
                        domStr+='<i class="icon-ann_normal cgy"></i>';
                    break;
                    case '其他':
                        domStr+='<i class="icon-ann_other cgy"></i>';
                    break;
                    case '財務':
                        domStr+='<i class="icon-ann_financial cgy"></i>';
                    break;
                }
                domStr += arr[a];
                domStr +='</div>';
        
            }
            _annTitle.html(domStr);
            if(_annList.find('li').length==0){
                $('#sg_t').find('div:eq(0)').hide().siblings().show();
            }
            $('#sg_t,#sg_tb').show();

        var galleryThumbs = new Swiper('.gallery-thumbs', {
            spaceBetween: 10,
            centeredSlides: true,
            slidesPerView: 'auto',
            touchRatio: 0.5,
            initialSlide: _anninitialSlide,
            slideToClickedSlide: true,
            onTap: function(swiper){
                _htmlBody.animate({scrollTop:0},400);
            },
            onSlideChangeEnd: function(swiper){
                _anninitialSlide=_annL.find('div.swiper-slide-active').index();
                domStr='';
                sw=_annL.find('div.swiper-slide-active').text();
                $.each(ann.info, function (i, v) {  
                    if(sw=='全部'){
                          domStr += app._annListDom(v);
                    }else{
                       if (v.e == sw) {
                         domStr += app._annListDom(v);
                       } 
                    }       
                });
                _annList.html(domStr).trigger('refresh');
                _htmlBody.animate({scrollTop:0},400);
            }
        });

    },
    _feeList:function(fee,com_id){
          var domStr='';
        $.each(fee.info, function (i, v){
            if(fee.type!='A'){
               domStr +='<li>';
               domStr +='<a>';
               domStr +='<input type="hidden" value="'+ com_id +'" />';
               domStr +='<input type="hidden" value="'+ v.bank_id +'" />';
               domStr +='<input type="hidden" value="'+ v.user_id +'" />';
               domStr +='<input type="hidden" value="'+ fee.type +'" />';
               domStr +='<div class="info">';
               domStr +='<p>'+ v.community +' '+ v.tablet_note +'</p>';
               domStr +='<h4>'+ v.bank_ym;
               if(v.fee_list !=''){
               domStr+='(';
               $.each(JSON.parse(v.fee_list), function (idx, val){
                    domStr+= val.n;
                    if(idx+1< JSON.parse(v.fee_list).length){
                      domStr+='、';
                    }
               });
               domStr+=')';
               }
               domStr +='</h4>';
               if(v.is_payment=='1'){
                    domStr +='<div><span class="check">已完成繳費</span></div>';
               }else{
                    domStr +='<div><span>繳費期限 '+ v.due_date +'</span></div>';
               }               
               domStr +='</div>';
               domStr +='<i class="icon-chevron-right"></i>';
               domStr +='</a>';
               domStr +='</li>';
            }else{
               
            }
        });
        return domStr;
    },
    _getProfilePoint:function(c,t){
        var domStr='';
        var domID=$('#profilePoint');
        $.ajax({
               dataType: 'json',
               url: app._getWebApi('Tablet','getPointRecord'),
               type: 'get',
               data:{ com_id:c,tablet_id:t},
               async: true,
               complete:function(){app._loadingHide(400);},
               success: function (datas) {
                    $.each(datas, function (i, v) {
                     
                           if(i==0){
                           domID.find('span.tablet').text(v.community+' '+v.tablet_note);
                           domID.find('span.num').text(v.point);
                           }
                
                           domStr +='<li>';
                           domStr +='<div class="info">';
                           domStr +='<h4>'+ v.transfer_date +'</h4>';
                           
                           //<!-- 公設名稱限制 8字元 -->
                           
                           domStr +='<p class="status">';
                           if(v.pf_name !=''){
                                if(v.transfer=='預約扣點'){
                                    domStr +='公設預約:<span>'+ v.pf_name +'</span>';
                                }else{
                                    domStr +='公設使用:<span>'+ v.pf_name +'</span>';
                                }     
                           }else{
                                domStr +=v.transfer;
                           }
                        
                           domStr +='</p>';
                     
                           if(v.carrier_id !='' || v.user_id !=''){
                            domStr +='<p class="carrier"><span>';
                            if(v.carrier_id !=''){
                                domStr+='載具';
                            }
                            if(v.user_id !=''){
                                domStr+='手機條碼';
                            }
                            domStr +='</span></p>';
                           }
                           if(v.transfer=='點數使用' || v.transfer=='點數轉讓' || v.transfer=='點數過期' || v.transfer=='其它使用' || v.transfer=='預約扣點'){
                             domStr +='<i class="minus">-'+ v.transfer_point +'</i>';
                           }else{
                             domStr +='<i>+'+ v.transfer_point +'</i>';
                           }
                           domStr +='</div>';
                           domStr +='</li>';
                
                    });
         
               domID.find('div.base_info ul').append(domStr).trigger('create');
               if(domID.find('div.base_info ul li').length==0){
                    domID.find('div.base_info ul').append('<li><div class="info noData"><div><i class="icon-coin-pu"></i><span>尚無交易記錄</span></div></div></li>').trigger('create');
                    domID.find('span.num').text('0');
               }
            }
        });
    },
    _getTabletList:function(callback){
         $.ajax({
            dataType: 'json',
            url: app._getWebServiceMethod('getUserCommunityTabletList'),
            type: 'post',
            data:{code:app._getLocalStorageJson('code')},
            async: true,
            success: function (datas) {
                callback(JSON.stringify(datas));
            },error:function(){
                callback('fail');
            }
        });
    },
    _getGasMainStatus:function(com_id,tablet_id,callback){
       $.ajax({
            dataType: 'json',
            url: app._getWebServiceMethod('getGasMainList'),
            type: 'post',
            data:{com_id:com_id,tablet_id:tablet_id},
            async: true,
            success: function (datas) {
                callback(JSON.stringify(datas));
            },error:function(){
                callback('fail');
            }
        });
    },
    _getGasTabletInfo:function(com_id,data,tabletInfo,_gas,count,val){
        if(data=='fail'){
            app._dialog('連線錯誤，請在嘗試一次');
            _mobile.changePage('index.html', { changeHash: true, reverse: true });  
        }else{
            if(data=='[]'){
                _gas.querySelector('#gasUnopenDiv').style.display='block';
                _gas.querySelector('.alert-gas-content').style.display='block';
            }else{
                 var jsonStr=JSON.parse(data);
                  _gas.querySelector('#tablet').innerHTML=tabletInfo[val].tablet_note;
                  _gas.querySelector('#tabletId').value=tabletInfo[val].tablet_id;
                  if(count>1){
                    _gas.querySelector('#tablet').innerHTML+='<i class="icon-down-arrow"></i>';

                  }
                _gas.querySelector('#g_id').value=jsonStr[0].g_id;
                 _gas.querySelectorAll('.data ul li')[0].querySelector('span').innerText=jsonStr[0].pre=="首次登記" ? "無":jsonStr[0].pre
                 _gas.querySelector('#ym').innerText=jsonStr[0].ym+'期';
                 _gas.querySelectorAll('.data ul li')[1].querySelector('span').innerText=jsonStr[0].g_date==''? '尚未填寫':jsonStr[0].g_date;
                 _gas.querySelectorAll('.data ul li')[2].querySelector('span').innerText=jsonStr[0].due_date;
                 if(jsonStr[0].g_date==''){
                    _gas.querySelector('.icon-click').style.display='block';
                    _gas.querySelector('#in0').value='';
                    _gas.querySelector('#in1').value='';
                    _gas.querySelector('#in2').value='';
                    _gas.querySelector('#in3').value='';
                 }else{
                    _gas.querySelector('.icon-click').style.display='none';
                     var len=jsonStr[0].g_value.length;
                     var lenStart=0;
                     for(var i=0;i<4;i++){
                        if(i<4-len){
                            _gas.querySelector('#in'+i).value=0;
                        }else{
                            _gas.querySelector('#in'+i).value=jsonStr[0].g_value.substring(lenStart,lenStart+1);
                            lenStart++;
                        }
                     }
                 }              
            }
           

        }
    },
    _footerShow:function(p,id){
        var footerId=$('#'+id);
        var f_type=footerId.find('#f_type');
        
        if(p=='postal.html'){
            footerId.find('#f_postal').parent().attr('class','active');
            footerId.on('click','#footer ul li:eq(3) a',function(){
                app._ga_trackEvent('postal','profile','',1);
                _mobile.changePage("profile.html", { changeHash: true });
            });
        } else{
            if(_postalBadgeCount >0){
                footerId.find('#footer ul li:eq(1) a').append('<span class="badgeBig" >'+ _postalBadgeCount +'</span>');
            }
            if(p=='moreList.html'){
            footerId.on('click','#footer ul li:eq(3) a',function(){
                app._ga_trackEvent('postal','moreList','',1);
                _mobile.changePage("profile.html", { changeHash: true });
            });
            }
            footerId.on('click','#footer ul li:eq(1) a',function(){
                app._ga_trackEvent(id,'postal','',1);
                if(app._getLocalStorageJson('com_count')==0){
                     app._noLoginInfo();
                }else{
                    if (app._getLocalStorageJson('com_count') > 1) {
                        _mobile.changePage('communityList.html', { changeHash: true, data:{'paremeter':'postal.html'} });
                    } else {            
                        _mobile.changePage('postal.html', { changeHash: true, data: { 'paremeter': JSON.parse(app._getLocalStorage('comInfo')).info[0].id } });
                    } 
                }              
            });
        }
        footerId.on('click','#footer ul li:eq(0) a',function(){
            app._ga_trackEvent(id,'main','',1);
            _mobile.changePage("index.html", { changeHash: true, reverse: true });
        }).on('click','#footer ul li:eq(2) a',function(){
            app._ga_trackEvent(id,'login','',1);
            _mobile.changePage("login.html", { changeHash: true });
        }).on('click','#footer ul li:eq(4) a',function(){
            if(p !='moreList.html'){
                app._ga_trackEvent(id,'moreList','',1);
                _mobile.changePage("moreList.html", { changeHash: true });
            }          
        })

        switch(p){
            case 'postal.html':
                f_type.append('<i class="icon-men-admin-s"></i><div>個人資訊</div>').trigger('refresh');
            break;
            case 'announcement_v2.html':
                f_type.append('<i class="icon-ann"></i><div>社區公告</div>').trigger('refresh').parent().attr('class','active');
            break;
            case 'feedback.html':
                f_type.append('<i class="icon-feedback"></i><div>意見反映</div>').trigger('refresh').parent().attr('class','active');
            break;
            case 'reservation.html':
            case 'reservation_v2.html':
                f_type.append('<i class="icon-reservation"></i><div>公設預約</div>').trigger('refresh').parent().attr('class','active');
            break;
            case 'payment.html':
                f_type.append('<i class="icon-money"></i><div>管理費</div>').trigger('refresh').parent().attr('class','active');
            break;
            case 'communityGas.html':
                f_type.append('<i class="icon-gas-meter"></i><div>瓦斯抄表</div>').trigger('refresh').parent().attr('class','active');
            break;
             case 'collectionPayment.html':
                f_type.append('<i class="icon-collectionP"></i><div>寄放物品</div>').trigger('refresh').parent().attr('class','active');
            break;
        }
    }
}


var LunarDate = {

    madd: new Array(0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334),
    HsString: '甲乙丙丁戊己庚辛壬癸',
    EbString: '子丑寅卯辰巳午未申酉戌亥',
    NumString: "一二三四五六七八九十",
    MonString: "正二三四五六七八九十冬腊",
    CalendarData: new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95),
    Year: null,
    Month: null,
    Day: null,
    TheDate: null,
    GetBit: function(m, n){
        return (m >> n) & 1;
    },
    e2c: function(){
        this.TheDate = (arguments.length != 3) ? new Date(): new Date(arguments[0], arguments[1], arguments[2]);
        var total, m, n, k;
        var isEnd = false;
        var tmp = this.TheDate.getFullYear();
        total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + this.madd[this.TheDate.getMonth()] + this.TheDate.getDate() - 38;
        if (this.TheDate.getYear() % 4 == 0 && this.TheDate.getMonth() > 1) {
            total++;
        }
        for (m = 0; ; m++) {
            k = (this.CalendarData[m] < 0xfff) ? 11: 12;
            for (n = k; n >= 0; n--) {
                if (total <= 29 + this.GetBit(this.CalendarData[m], n)) {
                    isEnd = true;
                    break;
                }
            total = total - 29 - this.GetBit(this.CalendarData[m], n);
        }
        if (isEnd)
            break;
        }
        this.Year = 1921 + m;
        this.Month = k - n + 1;
        this.Day = total;
        if (k == 12) {
            if (this.Month == Math.floor(this.CalendarData[m] / 0x10000) + 1) {
                this.Month = 1 - this.Month;
            }
            if (this.Month > Math.floor(this.CalendarData[m] / 0x10000) + 1) {
                this.Month--;
            }
        }
    },
    GetcDateString: function(){
        var tmp = "";
        tmp += this.HsString.charAt((this.Year - 4) % 10);
        tmp += this.EbString.charAt((this.Year - 4) % 12);
        tmp += "年 ";
        if (this.Month < 1) {
            tmp += "(閏)";
            tmp += this.MonString.charAt(-this.Month - 1);
        } else {
            tmp += this.MonString.charAt(this.Month - 1);
        }
        tmp += "月";
        tmp += (this.Day < 11) ? "初": ((this.Day < 20) ? "十": ((this.Day < 30) ? "廿": "三十"));
        if (this.Day % 10 != 0 || this.Day == 10) {
            tmp += this.NumString.charAt((this.Day - 1) % 10);
        }
        return tmp;
    },
    GetLunarDay: function(solarYear, solarMonth, solarDay) {
        if (solarYear < 1921 || solarYear > 2020) {
            return "";
        } else {
            solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1): 11;
            this.e2c(solarYear, solarMonth, solarDay);
            return this.GetcDateString();
        }
    },
    SolarTerm: function(DateGL){
        var SolarTermStr = new Array("小寒", "大寒", "立春", "雨水", "驚蟄", "春分",
          "清明", "穀雨", "立夏", "小滿", "芒種",  "夏至",
          "小暑", "大暑", "立秋", "處暑", "白露",  "秋分",
          "寒露", "霜降", "立冬", "小雪", "大雪",  "冬至") ;
        var DifferenceInMonth=new Array(
            1272060,1275495,1281180,1289445,1299225,1310355,
            1321560,1333035,1342770,1350855,1356420,1359045,
            1358580,1355055,1348695,1340040,1329630,1318455,
            1306935,1297380,1286865,1277730,1274550,1271556);
        var DifferenceInYear=31556926;
        var BeginTime=new Date(1901/1/1);
        BeginTime.setTime(947120460000);
         for(;DateGL.getFullYear()<BeginTime.getFullYear();){
            BeginTime.setTime(BeginTime.getTime()-DifferenceInYear*1000);
         }
         for(;DateGL.getFullYear()>BeginTime.getFullYear();){
            BeginTime.setTime(BeginTime.getTime()+DifferenceInYear*1000);
         }
         for(var M=0;DateGL.getMonth()>BeginTime.getMonth();M++){
            BeginTime.setTime(BeginTime.getTime()+DifferenceInMonth[M]*1000);
         }
         if(DateGL.getDate()>BeginTime.getDate()){
            BeginTime.setTime(BeginTime.getTime()+DifferenceInMonth[M]*1000);
            M++;
         }
         if(DateGL.getDate()>BeginTime.getDate()){
            BeginTime.setTime(BeginTime.getTime()+DifferenceInMonth[M]*1000);
            M==23?M=0:M++;
         }
         var JQ='&nbsp;';
          if(DateGL.getDate()==BeginTime.getDate()){
            JQ=SolarTermStr[M];

          }

        return JQ;
        }

}; 