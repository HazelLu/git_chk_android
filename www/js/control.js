var _dm = $(document);
var _tmpHeight;
var _mobile = $.mobile;
var timelock = 0;
var time = 0;
var _getBrightnessVal='';
var _loading=0;
var _swiper='no';
var _download;
var _downloadCheck;
var _anninitialSlide=0;
var _facCom; //預約社區
var _facPf;  //預約公設
var _facTime; //開放時間
var _maxmum; //人數限制
var _dayrule;
var exitCount;
var _openDataActivity;
var _map;
var _geoLat=0;
var _geoLon=0;
var _km=5;
var socket;
var _ver='1.3.0';
var _htmlBody;
var _swiperCalendar;
var _annBadge =new Array();
var _annBadgeCount;
var _postalBadgeCount;
var _msgBadgeCount;
var _timeCount=0;
var _restimeInfo;
var tempHeigh;
var tempStore;
var storePosition = {
    topCoordinate : null
}
var g_typeArr=[];
var g_typeName=[];
var g_total=0;
//預設值
        String.prototype.Right = function (n) {
        if (n <= 0)
            return "";
        else if (n > String(this).length)
            return this;
        else {
            var iLen = String(this).length;
            return String(this).substring(iLen, iLen - n);
        }
    }



var tempVal;
var tempVal2;
function _onBackPageLogin(){
     document.removeEventListener("backbutton", _onBackPageLogin, false);
  
     var temp1=tempVal;
     var temp2=tempVal2;
     tempVal='';
     tempVal2='';
     if(temp1 !='' && temp1 !='new'){    
        _mobile.changePage(temp1, { changeHash: true, reverse:true, data:{'paremeter':temp2} });
     }else{
        _mobile.changePage('index.html', { changeHash: true,reverse:true});
     }
}
function _onBackKeyDown() {
    if(exitCount==0){
        $('#index').find('.backTips').fadeIn(100);
        setTimeout(function(){ $('.backTips').fadeOut(100); exitCount=0; },1000);
        exitCount = 1;
    } else if(exitCount==1){
        navigator.app.exitApp();
    }
}
function _onBackPagePostal(){
    document.removeEventListener("backbutton", _onBackPagePostal, false);
    if(app._getLocalStorageJson('com_count') =='1')
     {
        _mobile.changePage("index.html", { changeHash: true, reverse: true });
     }else{           
        _mobile.changePage("communityList.html", { changeHash: true, reverse: true, data:{'paremeter':'postal.html'} });
     } 
}
function _onBackPageAnn(){
    document.removeEventListener("backbutton", _onBackPageAnn, false);
    if(app._getLocalStorageJson('com_count') =='1')
     {
        _mobile.changePage("index.html", { changeHash: true, reverse: true });
     }else{           
        _mobile.changePage("communityList.html", { changeHash: true, reverse: true, data:{'paremeter':'announcement_v2.html'} });
     } 
}
function _onBackPageFeed(){
    document.removeEventListener("backbutton", _onBackPageFeed, false);
    if(app._getLocalStorageJson('com_count') =='1')
     {
        _mobile.changePage("index.html", { changeHash: true, reverse: true });
     }else{           
        _mobile.changePage("communityList.html", { changeHash: true, reverse: true, data:{'paremeter':'feedback.html'} });
     } 
}
function _onBackPageMore(){
     document.removeEventListener("backbutton", _onBackPageMore, false);
    _mobile.changePage("index.html", { changeHash: true, reverse: true });
}

function _onBackPageList(){
     document.removeEventListener("backbutton", _onBackPageList, false);
    _mobile.changePage("index.html", { changeHash: true, reverse: true });
}

function _onBackPageAd(){
     document.removeEventListener("backbutton", _onBackPageAd, false);
     var temp1=tempVal;
     tempVal='';
     _mobile.changePage(temp1, { changeHash: true,reverse:true});
}
function _onBackPagePro(){
     document.removeEventListener("backbutton", _onBackPagePro, false);

     _mobile.changePage('index.html', { changeHash: true,reverse:true});
}
function _onBackPageSn(){
     document.removeEventListener("backbutton", _onBackPageSn, false);

     _mobile.changePage('login.html', { changeHash: true,reverse:true});
}
function _onBackPageGasPrice(){
    document.removeEventListener("backbutton", _onBackPageGasPrice, false);
    _mobile.changePage('easylife.html', { changeHash: true,reverse:true});
}
function _onBackPageGasList(){
    document.removeEventListener("backbutton", _onBackPageGasList, false);
    _mobile.changePage('easylife.html', { changeHash: true,reverse:true});
}
function _onBackPageEasy(){
    document.removeEventListener("backbutton", _onBackPageEasy, false);
    _mobile.changePage('index.html', { changeHash: true,reverse:true});
}

function _onBackPageIntro(){
     document.removeEventListener("backbutton", _onBackPageIntro, false);
     $('.detailWrap').hide();
     document.addEventListener("backbutton", _onBackPageRes, false);
}
function _onBackPageEvent(){
     document.removeEventListener("backbutton", _onBackPageEvent, false);
      document.querySelector('div.detailWrap').style.display='none';
     document.addEventListener("backbutton", _onBackPageCalendar, false);
}
function _onBackPageCalendar(){
    document.removeEventListener("backbutton", _onBackPageCalendar, false);
    _mobile.changePage('index.html', { changeHash: true,reverse:true});
}
function _onBackPageRes(){
    document.removeEventListener("backbutton", _onBackPageRes, false);
    if(app._getLocalStorageJson('com_count') =='1')
     {
        _mobile.changePage("index.html", { changeHash: true, reverse: true });
     }else{           
        _mobile.changePage("communityList.html", { changeHash: true, reverse: true, data:{'paremeter':'reservation.html'} });
     } 
}
function _onBackPageResV2(){
    document.removeEventListener("backbutton", _onBackPageResV2, false);
    if(app._getLocalStorageJson('com_count') =='1')
     {
        _mobile.changePage("index.html", { changeHash: true, reverse: true });
     }else{           
        _mobile.changePage("communityList.html", { changeHash: true, reverse: true, data:{'paremeter':'reservation_v2.html'} });
     } 
}
function _onBackPageV2Intro(){
     document.removeEventListener("backbutton", _onBackPageV2Intro, false);
      document.querySelector('#reservation_v2 .filterWrap').style.display='none';
     document.addEventListener("backbutton", _onBackPageResV2, false);
}
function _onBackPageV2ann(){
     document.removeEventListener("backbutton", _onBackPageV2ann, false);
      document.querySelector('#announcement_v2 .filterWrap').style.display='none';
     document.addEventListener("backbutton", _onBackPageAnn, false);
}
function _onBackPageV2History(){
  document.removeEventListener("backbutton", _onBackPageV2History, false);
   _mobile.changePage('reservation_v2.html', { changeHash: true, reverse:true, data:{'paremeter':temp1} });
}
function _onBackPageV2resDetailMain(){
  document.removeEventListener("backbutton", _onBackPageV2resDetailMain, false);
   _mobile.changePage('reservation_v2.html', { changeHash: true, reverse:true, data:{'paremeter':temp1} });
}

function _onBackPageV2resDetail(){
    document.removeEventListener("backbutton", _onBackPageV2resDetail, false);
    document.querySelector('#reservationDetail .openTimeWrap').style.display='none';
     document.addEventListener("backbutton", _onBackPageV2resDetailMain, false);

}
function _onBackPageV2resDateV2(){
    document.removeEventListener("backbutton", _onBackPageV2resDateV2, false);
    document.querySelector('#reservationD2 .reservationD2-content').style.height=tempHeigh+'px';
    document.querySelector('#reservationD2 .overlay').style.display='none';
    document.querySelector('#reservationD2 .selectTimeModal').style.display='none';
}

function _onBackPageCash(){
    document.removeEventListener("backbutton", _onBackPageCash, false);
      if(app._getLocalStorageJson('com_count') =='1')
     {
        _mobile.changePage("index.html", { changeHash: true, reverse: true });
     }else{           
        _mobile.changePage("communityList.html", { changeHash: true, reverse: true, data:{'paremeter':'payment.html'} });
     } 
}

function _onBackPageSystemMsg(){
    document.removeEventListener("backbutton", _onBackPageSystemMsg, false);
    _mobile.changePage("myMsg.html", { changeHash: true,reverse:true,data:{'paremeter':'system'}});
}
function _onBackPageUserMsg(){
   document.removeEventListener("backbutton", _onBackPageUserMsg, false);
    _mobile.changePage("myMsg.html", { changeHash: true,reverse:true});
}

function _onBackPageMsg(){
    document.removeEventListener("backbutton", _onBackPageMsg, false);
    _mobile.changePage("index.html", { changeHash: true,reverse:true});
}




//預設值
$(function () {
    $.mobile.defaultHomeScroll = 0;
    $.support.cors= true;
    $.mobile.allowCrossDomainPages = true; 
    $.mobile.buttonMarkup.hoverDelay = false;
    $.mobile.defaultPageTransition = "none";
    $.mobile.touchOverflowEnabled = true;
    app.initialize();
    app._setLocalStorageJson('nav', '');
    app._setLocalStorage('annNews','');
    app._setLocalStorage('fee','');
    app._setLocalStorage('facilities','');//公設初始值
    window.localStorage.removeItem('msgList');
    //window.localStorage.removeItem('profileInfo');
   // window.localStorage.removeItem('activeMsg');

   
    _tmpHeight=_dm.height();
    _htmlBody=$('html,body');
    //首頁
    $('#alertdo').on('click', function(){
        $('#alert_box').hide();
    });
    $('#openApp').on('click', function(){
        $('#alert_box,#no_login_info').hide();
        _mobile.changePage('login.html', { changeHash: true, data:{'valid':'new'}});
    });
}).on('pagebeforehide', '#snLogin', function (e) {
    document.removeEventListener("backbutton",_onBackPageSn, false);
}).on('pageinit', '#snLogin', function (e) {
    document.addEventListener("backbutton",_onBackPageSn, false);
    var snLogin=$(this);
    snLogin.find('#snLoginCont').attr("style", "height:" + _dm.height() + "px;");
    snLogin.find('.box-area').attr("style", "margin-top:-" + (_dm.height() / 2/2) + "px;");
    $('.overlayBG').attr("style", "height:" + _dm.height() + "px;");
    app._registerLabelInput($(this));
    var _loginSn = snLogin.find('#login_sn'); 
    snLogin.on('click', '#login_btn', function () {
      if(this.innerText=='立即開通'){
        this.innerText='驗證中．．．';
        //立即開通
        _loginSn.val(_loginSn.val().toUpperCase());
        if (_loginSn.val() == '立即開通') {
            app._dialog('未輸入登入序號');
            this.innerText='立即開通';
            return false;
        } else {
            if (_loginSn.val().length != 8) {
                app._dialog('序號長度錯誤');
                this.innerText='立即開通';
                return false;
            }
        }        
       setTimeout(function(){
            $.ajax({
                dataType: 'json',
                url: app._getWebServiceMethod('serialSnLogin'),
                type: 'post',
                data: { code: app._getLocalStorageJson('code'), sn: _loginSn.val() },
                async: false,
                complete: function () { app._loadingHide(); },
                success: function (datas) {
                  document.getElementById('snLogin').querySelector('#login_btn').innerText='立即開通';
                    if (datas.status == true) {
                        //app._dialog('開通成功!');
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
                                                         //app._safari(data.link,true); 
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
                        //app._getUserCommunityList('main');
                    } else {
                        app._dialog('驗證碼錯誤');
                        return false;
                    }
                }, error: function (e) {
                   document.getElementById('snLogin').querySelector('#login_btn').innerText='立即開通';
                    //無網路環境或是WEB API異常
                    app._connectionDialog();
                    return false;
                }
            });
        },1000);
  }
    }).on('click','#login_back',function(){
        _mobile.changePage('login.html', { changeHash: true,reverse:true });
    }).on('click','.help a',function(){
        _mobile.changePage('more-qa.html', { changeHash: true,data:{'paremeter':'snLogin.html'} });
    });

}).on('pageshow', '#snLogin', function (e) {
   app._loadingHide();
   app._ga_trackView('snLogin','');
}).on('pagebeforehide', '#login', function (e) {
    document.removeEventListener("backbutton",_onBackPageLogin, false);
    app._setBrightness(_getBrightnessVal);
}).on('pageshow', '#login', function (e) {
    var login=$(this);
    if(app._getLocalStorageJson('code') !=''){
        //Barcode 初始化
        app._setBarcode(login.find('#code3'), app._getLocalStorageJson('code'));
        //QR Code 初始化
        app._setQrCode(login.find('#qr'), app._qrCodeHeader() + app._getLocalStorageJson('code') + app._qrCodeFooter());
    }else{
        login.find('#scanDiv').hide();
        login.find('#no_online').show();
        login.find('#no_online .msg-box').attr("style", "margin-top:" + (login.find('#scanarea').height() /4) + "px;");
    }
    if(app._getUrlParameters(login.data("url"),'valid')=='new'){
        login.find('.guide-content').show();
    }else{
         app._setBrightness(1);
    }
    app._loadingHide();
    app._ga_trackView('login','');
}).on('pageinit', '#login', function (e) {
    var _login=$(this);
    var pare=app._getUrlParameters(_login.data("url"),'paremeter');
    var community=app._getUrlParameters(_login.data("url"),'next');
    tempVal=pare;
    tempVal2=community;
    document.addEventListener("backbutton",_onBackPageLogin, false);
    _login.find('.top_area').attr("style", "height:" + (_tmpHeight*0.35) + "px;");
    _login.find('.logo-area').attr("style", "height:" + (_tmpHeight*0.3) + "px;");
    _login.find('#scanLogin').attr("style", "height:" + _tmpHeight + "px;");
    _login.find('.scan_area').attr("style", "height:" + (_tmpHeight * 0.65) + "px;");
    var _showTab = 0;
    var $defaultDi = $('div.navbar a').eq(_showTab).addClass('active');
    $($defaultDi.attr('href')).siblings().hide();

    _login.find('#scanDiv').on('swipeleft',function(){
        var active=_login.find('div.navbar a.active').attr('href');  
        _login.find('div.navbar a').eq(0).removeClass('active');
        if(active=='#tab1'){
             _login.find('div.navbar a').eq(1).addClass('active');
            _login.find(active).stop(false, true).hide().siblings().show();
        }        
       
    });
    _login.find('#scanDiv').on('swiperight',function(){
           var active=_login.find('div.navbar a.active').attr('href');   
            _login.find('div.navbar a').eq(1).removeClass('active');
        if(active=='#tab2'){
            _login.find('div.navbar a').eq(0).addClass('active');
            _login.find(active).stop(false, true).hide().siblings().show();
        }    
    });

    _login.on('click','div.navbar a:not(.out)',function () {
        $('div.navbar a').removeClass('active');
        var $this = $(this),
        _clickTab = $this.attr('href');
        $this.addClass('active');      
        $(_clickTab).stop(false, true).show().siblings().hide();
        return false;
    }).on('click', '.otherBtn', function () {
        app._setBrightness(_getBrightnessVal);
        _mobile.changePage('snLogin.html', { changeHash: true });
    }).on('click','#bright_cbx',function(){//設定發亮
        if ($(this).is(":checked") == true) {
            app._setBrightness(1);
        }else{
            app._setBrightness(_getBrightnessVal);
        }
    }).on('click','#loginDown', function(){
         app._setBrightness(_getBrightnessVal);
         if(pare !='' && pare !='new'){

              _mobile.changePage(pare, { changeHash: true, reverse:true, data:{'paremeter':community} });
         }else{
              _mobile.changePage('index.html', { changeHash: true,reverse:true});
         }  
    }).on('click','#gc', function(){
          app._setBrightness(1);
          $(this).hide();
    });
}).on('pagebeforehide','#index',function(e) {
    document.removeEventListener("backbutton",_onBackKeyDown, false);
     g_typeName=[];
     g_typeArr=[];
     g_total=0;
     storePosition.topCoordinate = 0;
}).on('pageinit', '#index', function (e) {  
    var _index=$(this);
    app._loadingShow();
    app._setLocalStorageJson('nav', '');
    _index.find('.icon-close').show();
    if(app._getLocalStorageJson('register') == 'yes')
    {
        _index.find('.guide').remove();
        app._getUserCommunityList('');
        app._getBrickTag($(this)); 
        if(app._getLocalStorage('deviceName') ==null){
             app._getProfileIsSet();  
        }
    }else{
        _index.find('#guide_close').hide();
        //$('.updateLoading').show();
        _index.find('#profile_btn i').show();
    }
    _index.find('#alert_box,#navi,#index,#main,.guide').attr("style", "height:" + _dm.height() + "px;");
    _index.find('.logo-area').attr("style", "height:" + (_dm.height()*0.3) + "px;");
    _index.find('.panel-area').attr("style", "height:" + (_dm.height()*0.7)-48 + "px;");

    if(_dm.height() > 500){  _index.find('.guide-b').attr("style", "margin-top:30px;");}
  
    _index.on('click', '.guide .swiper-container a,#guide_close', function () {
         _index.find('.guide').fadeOut();
          if(app._getLocalStorageJson('com_count')==0){
           setTimeout(function(){
            _index.find('.guide-myBarcode-content').show();
           },400);
         }
    }).on('click','.guide-myBarcode-content',function(){
      this.style.display='none';
    }).on('click','.guide-myBarcode-content .container',function(){
      this.style.display='none';
      _mobile.changePage('login.html', { changeHash: true,data:{'valid':'new'}});
    }).on('click', '.subAD', function () { 
      var id=$(this).find('input').val();
      _mobile.changePage('adDetail.html', { changeHash: true, data: { 'paremeter':id,'next':'index.html' }});

    }).on('click', '#announcement_btn', function () { 
        app._ga_trackEvent('master','announcement','公告',1);
        if(app._getLocalStorageJson('com_count')==0){
           app._noLoginInfo();
        } else {
            //$(this).find('span').hide();
            if (app._getLocalStorageJson('com_count') > 1) {
                _mobile.changePage('communityList.html', { changeHash: true, data:{'paremeter':'announcement_v2.html'} });
            } else {           
                _mobile.changePage('announcement_v2.html', { changeHash: true, data: { 'paremeter': JSON.parse(app._getLocalStorage('comInfo')).info[0].id } });
            }
        }        
    }).on('click','#cashflow_btn',function(){
         app._ga_trackEvent('master','cashflow','金流',1);
        if(app._getLocalStorageJson('com_count')==0){
            app._noLoginInfo();
        }else{
          if(app._getLocalStorage('bc') !=null && app._getLocalStorage('bc') !=""){
            var options=new Object();
            options.title='請選擇取用模式?';
            options.addCancelButtonWithLabel='取消';
            options.androidEnableCancelButton=true;
            options.addDestructiveButtonWithLabel='清除條碼記錄';
            options.buttonLabels=new Array();
            $.each(JSON.parse(app._getLocalStorage('bc')).items, function (i, v) {
                   options.buttonLabels.push(v.community+' '+ v.tablet_note);
            });
            options.buttonLabels.push('管理費清單');
            window.plugins.actionsheet.show(options, app._onActionSheetFee);
          }else{
            if (app._getLocalStorageJson('com_count') > 1) {
                _mobile.changePage('communityList.html', { changeHash: true, data:{'paremeter':'payment.html'} });
            }else{
                _mobile.changePage('payment.html', { changeHash: true, data: { 'paremeter': JSON.parse(app._getLocalStorage('comInfo')).info[0].id } });
            }
          }

        }
    }).on('click','.textSlider li',function(){
        var type=this.querySelectorAll('input')[0].value;
        var link=this.querySelectorAll('input')[1].value;
        if(type==0){
            _mobile.changePage('adDetail.html', { changeHash: true, data: { 'paremeter':link,'next':'index.html' }});
        }else{
            var ref= window.open(link, "_blank");
        }
    }).on('click','#postal_btn',function(){
        app._ga_trackEvent('master','postal','郵務',1);
        if(app._getLocalStorageJson('com_count')==0){
            app._noLoginInfo();
        }else{
            if (app._getLocalStorageJson('com_count') > 1) {
                _mobile.changePage('communityList.html', { changeHash: true, data:{'paremeter':'postal.html'} });
            } else {            
                _mobile.changePage('postal.html', { changeHash: true, data: { 'paremeter': JSON.parse(app._getLocalStorage('comInfo')).info[0].id } });
            }   
        }  
    }).on('click','#feedback_btn',function(){       
        if(_checkService=='run'){
          app._ga_trackEvent('master','feedback','意見回饋',1);
          if(app._getLocalStorageJson('com_count')==0){
              app._noLoginInfo();
          }else{
              if (app._getLocalStorageJson('com_count') > 1) {
                  _mobile.changePage('communityList.html', { changeHash: true, data:{'paremeter':'feedback.html'} });
              } else {            
                  _mobile.changePage('feedback.html', { changeHash: true, data: { 'paremeter': JSON.parse(app._getLocalStorage('comInfo')).info[0].id } });
              }
          }  
        }else{
           app._ga_trackEvent('master','more-qa','QA',1);
           _mobile.changePage('more-qa.html', { changeHash: true, data:{'paremeter':'index.html'} });
        }
    }).on('click','#main_scan',function(){
         app._ga_trackEvent('master','barcode','開通頁面',1);

           if(app._getLocalStorageJson('com_count')==0){
                _mobile.changePage('login.html', { changeHash: true,data:{'valid':'new'}});
           }else{
       
                _mobile.changePage('login.html', { changeHash: true});
           }
    }).on('click','#calendar_btn',function(){
      if(app._getLocalStorageJson('com_count')==0){
           app._noLoginInfo();
          }else{
        _mobile.changePage('calendar.html', { changeHash: true,data:{'paremeter':'index.html'}});
      }
    }).on('click','#reservation',function(){
         app._ga_trackEvent('master','reservation','公設預約',1);
        if(app._getLocalStorageJson('com_count')==0){
            app._noLoginInfo();
        }else{
if (app._getLocalStorageJson('com_count') > 1) {
                 _mobile.changePage('communityList.html', { changeHash: true, data:{'paremeter':'reservation_v2.html'} });
            } else{

                _mobile.changePage('reservation_v2.html', { changeHash: true, data: { 'paremeter': JSON.parse(app._getLocalStorage('comInfo')).info[0].id }});
            }
          /*
            if (app._getLocalStorageJson('com_count') > 1) {
                 _mobile.changePage('communityList.html', { changeHash: true, data:{'paremeter':'reservation.html'} });
            } else{
                _mobile.changePage('reservation.html', { changeHash: true, data: { 'paremeter': JSON.parse(app._getLocalStorage('comInfo')).info[0].id }});
            }
            */
        }
    }).on('click','#mymsg_btn',function(){
       if(app._getLocalStorageJson('com_count')==0){
            app._noLoginInfo();
        }else{
        _mobile.changePage('myMsg.html', { changeHash: true, data:{ 'paremeter':'index.html'}});
      }
    }).on('click','#collection_btn',function(){
       if(app._getLocalStorageJson('com_count')==0){
            app._noLoginInfo();
        }else{
        _mobile.changePage('collectionPayment.html', { changeHash: true, data:{ 'paremeter':'index.html'}});
        }
    }).on('click','.howto2',function(){
        _mobile.changePage("more-qa.html", { changeHash: true, data:{'paremeter':'collectionPayment.html','next':community}  });   
    }).on('click','#gas_btn',function(){
       if(app._getLocalStorageJson('com_count')==0){
            app._noLoginInfo();
        }else{
         if (app._getLocalStorageJson('com_count') > 1) {
              _mobile.changePage('communityList.html', { changeHash: true, data:{'paremeter':'communityGas.html'} });
          } else {            
              _mobile.changePage('communityGas.html', { changeHash: true, data: { 'paremeter': JSON.parse(app._getLocalStorage('comInfo')).info[0].id } });
          } 
        }
    }).on('click','#profile_btn',function(){
         app._ga_trackEvent('master','profile','個人基本資料',1);
        _mobile.changePage('profile.html', { changeHash: true});
    }).on('click','#easylife_btn', function(){
         app._ga_trackEvent('master','easylife','生活便利通',1);
         _mobile.changePage('easylife.html', { changeHash: true});
    }).on('click','#more',function(){
         _mobile.changePage('moreList.html', { changeHash: true});
    }).on('click','#main .swiper-slide a',function(){
        if(this.id==''){
            var val=this.querySelector('input').value;
            app._ga_trackEvent('master','adDetail',val,1);
            if(val !=''){
                _mobile.changePage('adDetail.html', { changeHash: true, data: { 'paremeter':val,'next':'index.html' }});
            }  
        }
    });


}).on('pageshow', '#index', function (e) {
      exitCount=0;
      var _index=$(this);
     document.addEventListener("backbutton",_onBackKeyDown, false);
    _index.find('.backTips').hide();
    if(_swiper=='no'){
        var _wraph=$('.logo-area').height()/4;
        var _wrapw=$('.logo-area').width()/2;
        _index.find('.imgWrap').attr("style", "margin-top:-" + _wraph + "px;margin-left:-"+ _wrapw+'px;');
        _swiper='yes';
        app._swiperInit();
    }
    if(_loading==1){
         app._loadingHide();
    }  
    _loading=1;
    if(app._getLocalStorage('bc') !='' && app._getLocalStorage('bc') !=null){
      if(JSON.parse(app._getLocalStorage('bc')).items.length>0)
      _index.find('#cashflow_btn span').text(JSON.parse(app._getLocalStorage('bc')).items.length).show();
    }
    if(_annBadgeCount >0){
        _index.find('#announcement_btn span').text(_annBadgeCount).show();
    }else{
        if(_annBadgeCount==-1){
            _index.find('#announcement_btn span').text('N').show();
        }else{
            _index.find('#announcement_btn span').hide(); 
        }     
    }
    if(_msgBadgeCount >0){
        _index.find('#feedback_btn span').text(_msgBadgeCount).show();
    }else{
         _index.find('#feedback_btn span').text('').hide();
    }
    setTimeout(function(){$('.swiper-pagination').fadeIn();},500);
    app._loadingHide();
    if(inApp=='yes' || inApp=='no'){
      app._ga_trackView('main');
    }
    
}).on('pagebeforehide','#collectionPayment',function(){
  document.removeEventListener('backbutton',_onBackPageList,false);
}).on('pageinit','#collectionPayment',function(){
   document.addEventListener('backbutton',_onBackPageList,false);
   app._footerShow('collectionPayment.html',this.id);
    app._loadingShow();
   var col=this;
   var jqcol=$(this);
   var $defaultDi = jqcol.find('div.navbar li a').eq(0).addClass('active');
   var sa=col.querySelector('#segmented-div-a ul');
   var sb=col.querySelector('#segmented-div-b ul');
   var sc=col.querySelector('#segmented-div-c ul');
    jqcol.on('click','#header a:eq(0)',function(){
        _mobile.changePage("index.html", { changeHash: true, reverse: true }); 
    }).on('click','#segmented-div-b ul li',function(){
        navigator.notification.confirm(
            '將前往我的條碼頁面進行寄放物品領取(提醒您系統會自動調整頁面亮度)', // message
            function (idx) {
                if(idx==1){
                    _mobile.changePage("login.html", { changeHash: true, data:{'paremeter':'collectionPayment.html','next':'B'} });
                }                 
            },
            '領取寄放物品?',
            ["立即領取","稍後領取"]
        );
    }).on('click','div.navbar li a:not(.out)',function () {
      col.querySelector('.empty').style.display='none';
        jqcol.find('div.navbar li a').removeClass('active');
        var $this = $(this),
        _clickTab = $this.attr('href');
        $this.addClass('active');        
        $(_clickTab).stop(false, true).show().siblings().hide();
        if($(_clickTab).find('ul li').length==0){
          col.querySelector(_clickTab).style.display='none';
          col.querySelector('.subtitle').style.display='none';
          col.querySelector('.empty').style.display='block';

        } else{
          col.querySelector('.subtitle').style.display='block';
        }
        return false;
    });



    jqcol.on('swipeleft',function(){
        var active=jqcol.find('div.navbar a.active').attr('href');      
        if(active=='#segmented-div-a'){
            jqcol.find('div.navbar ul li a').removeClass('active');
            jqcol.find('#segmented-div-b').stop(false, true).show().siblings().hide();
            jqcol.find('div.navbar ul li:eq(1) a').addClass('active');   
            
            if(jqcol.find('#segmented-div-b ul li').length==0){
                col.querySelector('#segmented-div-b').style.display='none';
                col.querySelector('.subtitle').style.display='none';
                col.querySelector('.empty').style.display='block';
            }else{
                col.querySelector('.subtitle').style.display='block';
            }
            
        }else if(active=='#segmented-div-b'){
            jqcol.find('div.navbar ul li a').removeClass('active');
            jqcol.find('#segmented-div-c').stop(false, true).show().siblings().hide();
            jqcol.find('div.navbar ul li:eq(2) a').addClass('active'); 
              if(jqcol.find('#segmented-div-c ul li').length==0){
                col.querySelector('#segmented-div-c').style.display='none';
                col.querySelector('.subtitle').style.display='none';
                col.querySelector('.empty').style.display='block';
            }else{
                col.querySelector('.subtitle').style.display='block';
            }
        }        
       
    });
    jqcol.on('swiperight',function(){
        var active=jqcol.find('div.navbar a.active').attr('href');     
        if(active=='#segmented-div-b'){
            jqcol.find('div.navbar ul li a').removeClass('active');
            jqcol.find('#segmented-div-a').stop(false, true).show().siblings().hide();  
             jqcol.find('div.navbar ul li:eq(0) a').addClass('active'); 
               if(jqcol.find('#segmented-div-a ul li').length==0){
                col.querySelector('#segmented-div-a').style.display='none';
                col.querySelector('.subtitle').style.display='none';
                col.querySelector('.empty').style.display='block';
            }else{
                col.querySelector('.subtitle').style.display='block';
            }
        }else if(active=='#segmented-div-c'){
            jqcol.find('div.navbar ul li a').removeClass('active');
            jqcol.find('#segmented-div-b').stop(false, true).show().siblings().hide(); 
            jqcol.find('div.navbar ul li:eq(1) a').addClass('active'); 
              if(jqcol.find('#segmented-div-b ul li').length==0){
                col.querySelector('#segmented-div-b').style.display='none';
                col.querySelector('.subtitle').style.display='none';
                col.querySelector('.empty').style.display='block';
            }else{
                col.querySelector('.subtitle').style.display='block';
            }
        }
    });

   

}).on('pageshow','#collectionPayment',function(){
    var colCount=0;
    var radio=app._getUrlParameters($(this).data("url"),'');
    var col=this;
    var sa=col.querySelector('#segmented-div-a ul');
    var sb=col.querySelector('#segmented-div-b ul');
    var sc=col.querySelector('#segmented-div-c ul');
    app._getCollectionPaymentList(function(datas){
        var domStr;
        if(datas=='error'){
            app._dialog('資訊取得失敗，請稍候再試');
            _mobile.changePage("index.html", { changeHash: true, reverse: true }); 
        }else{
          $.each(datas, function (i, v){
            if(v.is_end=='no'){
                domStr='<li>';
                domStr+='<div class="wrap">';
                domStr+='<div class="info">';
                domStr+='<div class="svg-area">';
                domStr+='<i class="icon-package"></i>';
                domStr+='</div>';
                domStr+='<h4>';
                domStr+='<span class="timestamp"><span>'+ v.date +'</span>';
                domStr+= v.mode=='A' ?'寄件':'收件';
                domStr+='</span>';
                // <!-- 5個小時前 -->
                domStr+='<span class="tag">';
                domStr+= v.mode=='A' ?'對方尚未領':'您尚未領取';           
                domStr+='</span>';
                domStr+='</h4>';
                domStr+='<div class="txt">';
                if(v.mode=='B')
                {
                    domStr+='<p>';
                    domStr+='<span class="th1">寄件人：</span>';
                    domStr+='<span class="name">'+v.from_name;
                    domStr+='<span>'+v.from_tablet+'</span></span>';
                    domStr+='</p>';
                }
                domStr+='<p>';
                domStr+='<span class="th1">';
                domStr+='收件人：';     
                domStr+='</span>';
                domStr+='<span class="name">'+v.to_name+'<span>'+v.to_tablet+'</span></span>';
                domStr+='</p>';
                domStr+='<p>';
                domStr+='<span class="th1">內　容：</span>';
                domStr+='<span class="cgy">';
                if(v.c_dtype==''){
                  domStr+='現金$'+ v.c_money+'元';
                }else{
                  domStr+=v.c_dtype;
                  if(v.c_type=='1'){
                    domStr+='(冷藏)';
                  }else if(v.c_type=='2'){
                    domStr+='(冷凍)';
                  }                  
                }
                domStr+='</span>';
                domStr+='</p>';
                domStr+='</div>';
                //<!-- 有寄放備註時增加該div -->
                if(app._getLocalStorageJson('com_count') >1){
                  domStr+= v.note !=''?'<div class="memo"><span>社區：'+ v.community +'<br/>備註：</span>'+ v.note +'</div>':'<div class="memo"><span>社區：</span>'+ v.community +'</div>';
                 }else{
                  domStr+= v.note !=''?'<div class="memo"><span>備註：</span>'+ v.note +'</div>':'';
                 }
                 // <!-- /有寄放備註時增加該div -->
                domStr+='</div>';                          
                domStr+='</div>';
                domStr+='</li>';
                if(v.mode=='A'){
                    sa.innerHTML+=domStr;
                }else{
                    sb.innerHTML+=domStr;
                }  
                colCount++;            
            }else{
                 domStr='<li>';
                 domStr+='<div class="wrap">';
                 domStr+='<div class="top-box">';
                 domStr+='<div class="status">';
                 domStr+= v.mode=='A' ? '<span>已完成寄放物品</span>':'<span>已完成領取</span>';
                 domStr+='</div>';
                 domStr+='<div style="position:relative;">';
                 domStr+='<div class="info">';
                 domStr+='<div class="svg-area">';
                 domStr+='<i class="icon-package"></i>';
                 domStr+='</div>';
                 domStr+='<div class="txt">';
                 domStr+='<p>';
                 domStr+='<span class="th1">寄件人：</span>';
                 domStr+='<span class="name">'+v.from_name+'<span>'+v.from_tablet+'</span></span>';
                 domStr+='</p>';
                 domStr+='<p>';
                 domStr+='<p>';
                 domStr+='<span class="th1">收件人：</span>';
                 domStr+='<span class="name">'+v.to_name+'<span>'+v.to_tablet+'</span></span>';
                 domStr+='</p>';
                 domStr+='<p>';
                 domStr+='<span class="th1">內　容：</span>';
                 domStr+='<span class="cgy">';
                if(v.c_dtype==''){
                  domStr+='現金$'+ v.c_money+'元';
                }else{
                  domStr+=v.c_dtype;
                  if(v.c_type=='1'){
                    domStr+='(冷藏)';
                  }else if(v.c_type=='2'){
                    domStr+='(冷凍)';
                  }                  
                }
                domStr+='</span>';
                 domStr+='</p>';
                 domStr+='</div>';
                 //<!-- 有寄放備註時增加該div -->
                 if(app._getLocalStorageJson('com_count') >1){
                  domStr+= v.note !=''?'<div class="memo"><span>社區：'+ v.community +'<br/>備註：</span>'+ v.note +'</div>':'<div class="memo"><span>社區：</span>'+ v.community +'</div>';
                 }else{
                  domStr+= v.note !=''?'<div class="memo"><span>備註：</span>'+ v.note +'</div>':'';
                 }
                 
                 //<!-- /有寄放備註時增加該div -->
                 domStr+='</div>';
                 domStr+='</div>';
                 domStr+='</div>';
                 domStr+='<div class="bottom-box">';
                 domStr+='<div>';
                 domStr+='<p>物品寄放時間</p>';
                 domStr+='<p>'+v.sdate+'</p>';
                 domStr+='</div>';
                 domStr+='<div>';
                 domStr+='<p>物品領取完成</p>';
                 domStr+='<p>'+v.ddate+'</p>';
                 domStr+='</div>';
                 domStr+='</div>';
                 domStr+='</div>';
                 domStr+='</li>';
                 sc.innerHTML+=domStr;
            }
          });
            if(radio=='B'){
                sa.parentNode.style.display='none';
                col.querySelector('.empty').style.display='none';
                //col.querySelector('#sc-1-2').checked = true;
                col.querySelectorAll('div.navbar li')[0].querySelector('a').className='';
                col.querySelectorAll('div.navbar li')[1].querySelector('a').className='active';
                if(sb.children.length>0){
                    sb.parentNode.style.display='block';
                }else{
                    col.querySelector('.empty').style.display='block';
                } 
            }
        }
        if(colCount>0){
           document.getElementById('index').querySelector('#collection_btn span').innerText=colCount;
         document.getElementById('index').querySelector('#collection_btn span').style.display='block';
        }else{
             document.getElementById('index').querySelector('#collection_btn span').style.display='none';


        }
       
        if(sa.children.length>0){
            col.querySelectorAll('span.badge')[0].style.display='block';
        }else{
           sa.parentNode.style.display='none';
           col.querySelector('.subtitle').style.display='none';
           col.querySelector('.empty').style.display='block';

        }
        if(sb.children.length>0){
            col.querySelectorAll('span.badge')[1].style.display='block';
        }    
        if(sc.children.length>0){
        }
         app._loadingHide();
    });
   app._ga_trackView('collectionPayment','');
}).on('pagebeforecreate','#myMsg',function(e){
    app._loadingShow();
}).on('pagebeforehide','#myMsg',function(e){
    document.removeEventListener('backbutton',_onBackPageMsg,false);
}).on('pageinit','#myMsg',function(e){
     
    var tempPush1;
    var tempPush2;
    var _showTab = 0;
    var mymsg=$(this);


    var msg_active=this;
    var activeType;
    socket.emit('get_active',{
        'uuid':device.uuid,
        'type':'info'
    });
     socket.on('sendActive_'+device.uuid,function(data) {

        if(data.mininote !=undefined){
          var atinfo=msg_active.querySelectorAll('.activeTopInfo');
          activeType=data.type;          
          atinfo[0].querySelector('img').src=data.image;
          atinfo[1].querySelector('img').src=data.image;
          atinfo[0].querySelector('span.cgy').innerHTML=decodeURI(data.cgy);
          atinfo[1].querySelector('span.cgy').innerHTML=decodeURI(data.minicgy);
          atinfo[0].querySelector('h4').innerHTML=decodeURI(data.note);
          atinfo[1].querySelector('h5').innerHTML=decodeURI(data.mininote);
          atinfo[0].querySelector('input').value=data.link;
            if(app._getLocalStorage('activeMsg') != data.type){
              atinfo[0].style.display='block';
          }else{
              atinfo[1].style.display='block';
          } 
        }         
     });


    var s=app._getUrlParameters(mymsg.data("url"),'');
    if(s=='system'){
        _showTab=1;
        app._editNotificationIsRead('D'); 
    }else{
       // app._editNotificationIsRead('C');   
    }
    mymsg.on('click','#header a:eq(0)',function(){

        _mobile.changePage('index.html', { changeHash: true,reverse:true});
    }).on('click','i.icon-close',function(){//折價卷關閉
         app._setLocalStorage('activeMsg',activeType);
        msg_active.querySelectorAll('.activeTopInfo')[0].style.display='none';
        msg_active.querySelectorAll('.activeTopInfo')[1].style.display='block';
    }).on('click','div.morebtn span,.activeTopInfo a',function(){ //我的息訊折價卷連結
        app._setLocalStorage('activeMsg',activeType);
        msg_active.querySelectorAll('.activeTopInfo')[0].style.display='none';
        msg_active.querySelectorAll('.activeTopInfo')[1].style.display='block';    
         var ref= window.open(msg_active.querySelectorAll('.activeTopInfo')[0].querySelector('input').value, "_blank");
    }).on('click','#header a:eq(1)',function(){
        /*
        this.style.display='none';
        app._loadingShow();
        mymsg.find('div.empty').hide();
        mymsg.find('div.navbar ul li a').removeClass('active').eq(0).addClass('active'); 
        _clickTab = mymsg.find('div.navbar ul li a').eq(0).attr('href');
        mymsg.find(_clickTab).stop(false, true).fadeIn().siblings().hide();
        window.localStorage.removeItem('msgList');       
        app._getNotificationRecord(mymsg,app._getUrlParameters(mymsg.data("url"),''));
        */
        _mobile.changePage('myMsg.html', { changeHash: true,reloadPage: true  });
    }).on('click','#segmented-div-a ul li',function(){
          var fileBtn=$(this);
          var type=fileBtn.find('input:eq(0)').val();
          if(fileBtn.find('.file-tag').length>0){
            mymsg.find('.file-attached').attr('style','display:none;');
            fileBtn.find('.file-attached').slideDown(300);
          }else if(fileBtn.text().indexOf('點數異動') != -1){
            document.removeEventListener('backbutton',_onBackPageMsg,false);
            _mobile.changePage('profile.html',{changeHash:true,data:{'paremeter':'myMsg.html'}});
          }else{
            if(type=='ad'){
             var linkType=fileBtn.find('input:eq(1)').val();

             if(linkType ==0){
                if(fileBtn.find('input:eq(2)').val() !=""){
                    window.open('tel:'+fileBtn.find('input:eq(2)').val(), '_system');
                }
             }else{
                if(linkType==3){
                    _mobile.changePage('adDetail.html', { changeHash: true, data: { 'paremeter':fileBtn.find('input:eq(2)').val(),'next':'myMsg.html' }});
                }else{
                    var ref= window.open(fileBtn.find('input:eq(2)').val(), "_blank");
                }   
             }
             }
          }
          return false;
    }).on('click','#segmented-div-b ul li',function(){  
        var thisDom=$(this);
        if(thisDom.text().indexOf('預約公設') !=-1){
          document.removeEventListener('backbutton',_onBackPageMsg,false);
           document.addEventListener('backbutton',_onBackPageSystemMsg,false);
           _mobile.changePage("reservationHistory.html", { changeHash: true,data:{'paremeter':thisDom.find('input').val(),'next':'myMsg.html_system'}});
        }
    }).on('click','div.file-attached i',function(){
        mymsg.find('.file-attached').attr('style','display:none;');
        return false;
    }).on('click','div.file-attached ul li a',function(){
        var _a=$(this);
        var url='http://202.39.212.221/CHK/';
        //var img=_a.find('input').val().split('@')[0].split('.')[1].toUpperCase();
        if(_a.find('input').val().split('@')[1]=='null'){
            url+="notify/"+_a.find('input').val().split('@')[0]; 
        }else{         
            url+= _a.find('input').val().split('@')[1]+"/notify/"+_a.find('input').val().split('@')[0];         
               
        }
        app._openFile(url);
        /*
        if(img =='PNG' || img =='JPG')
        {
            var ref = window.open(url, '_blank', 'location=no');
        }else{
            var ref = window.open('https://docs.google.com/viewer?url='+ encodeURI(url), '_blank', 'location=no');
        } 
        */
    });

     mymsg.on('swipeleft',function(){
        var active=mymsg.find('div.navbar a.active').attr('href');  
        mymsg.find('div.navbar a').eq(0).removeClass('active');
        if(active=='#segmented-div-a'){
             mymsg.find('div.navbar a').eq(1).addClass('active');
            mymsg.find(active).stop(false, true).hide().siblings().show();
            if(mymsg.find('#segmented-div-b ul li').length==0){
              mymsg.find('div.empty').show();
            }else{
              mymsg.find('div.empty').hide();
            } 
        }        
    });
    mymsg.on('swiperight',function(){
           var active=mymsg.find('div.navbar a.active').attr('href');   
            mymsg.find('div.navbar a').eq(1).removeClass('active');
        if(active=='#segmented-div-b'){
            mymsg.find('div.navbar a').eq(0).addClass('active');
            mymsg.find(active).stop(false, true).hide().siblings().show();
            if(mymsg.find('#segmented-div-a ul li').length==0){
              mymsg.find('div.empty').show();
            }else{
              mymsg.find('div.empty').hide();
            }  
        }

    });

    var $defaultDi = $('div.navbar ul li a').eq(_showTab).addClass('active');  
    $($defaultDi.attr('href')).siblings().hide();
    mymsg.find('div.navbar ul li a:not(.out)').click(function () {
        mymsg.find('div.empty').hide();
        var $this = $(this),
        _clickTab = $this.attr('href');
        mymsg.find('div.navbar ul li a').removeClass('active');    
        $this.addClass('active');
        switch(_clickTab){
            case '#segmented-div-a':  
              
                if(tempPush1!='yes'){  
                     app._editNotificationIsRead('C');              
                    tempPush1='yes'; 
                }       
            break;
            case '#segmented-div-b':
               if(tempPush2!='yes'){
                    app._editNotificationIsRead('D');
                    tempPush2='yes'; 
                }             
            break;
        }
        $(_clickTab).stop(false, true).fadeIn().siblings().hide();
        if($(_clickTab).find('ul li').length==0){
            if(_clickTab =='#segmented-div-a' && mymsg.find('input').val()!=''){
               $(_clickTab).stop(false, true).show();
            }else{
              mymsg.find('div.empty').show();
            }
            
        }
        return false;
    });
}).on('pageshow','#myMsg',function(){
    document.addEventListener('backbutton',_onBackPageMsg,false);
    app._footerShow('myMsg.html',this.id);
    var mymsg=$(this);
    app._getNotificationRecord(mymsg,app._getUrlParameters(mymsg.data("url"),''));
     app._ga_trackView('myMsg','');
}).on('pagebeforehide', '#moreList', function (e) {
     document.removeEventListener('backbutton',_onBackPageMore,false);
}).on('pagebeforecreate', '#moreList', function (e) {
    //app._loadingShow();
}).on('pageinit', '#moreList', function (e) {

    app._footerShow('moreList.html',this.id);
    document.addEventListener('backbutton',_onBackPageMore,false);
    $(this).on('click','#header a:eq(0)',function(){
        _mobile.changePage('index.html', { changeHash: true,reverse:true});
    }).on('click','#aboutBtn',function(){
        _mobile.changePage('more-about.html', { changeHash: true}); 
    }).on('click','#ispBtn',function(){
        _mobile.changePage('more-k.html', { changeHash: true}); 
    }).on('click','#selectBtn',function(){
         _mobile.changePage('more-ks.html', { changeHash: true}); 
     }).on('click','#myCommunity',function(){
         _mobile.changePage('myCommunity.html', { changeHash: true}); 
    }).on('click','#qa',function(){
         _mobile.changePage('more-qa.html', { changeHash: true,data:{'paremeter':'moreList.html'}}); 
    }).on('click','#pushRecord',function(){
         _mobile.changePage('myMsg.html', { changeHash: true }); 
    }).on('click','#sysfeedback',function(){
         _mobile.changePage('template.html', { changeHash: true,data:{'paremeter':'googleforms'}});          
    }).on('click','#googleForms',function(){
        var ref = window.open('https://docs.google.com/forms/d/e/1FAIpQLSec1K8wngV3gvfBjmLIX_cYhS8eL81isIzR4R5m65EgYQfX1Q/viewform', '_blank', 'location=no,enableViewportScale=yes'); 
    }).on('click','#plusBtn',function(){
        window.plugins.googleplus.login(
        {
            'scopes': 'profile email', 
          'webClientId': '', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required. 
          'offline': true, // optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server 
        },
        function (obj) {
          alert(JSON.stringify(obj)); // do something useful instead of alerting 
        },
        function (msg) {
          alert('error: ' + msg);
        });

    }).on('click','#flBtn',function(){
             facebookConnectPlugin.login( ["email"],
                    function (response) { alert(JSON.stringify(response)) },
                    function (response) { alert(JSON.stringify(response)) });

             //https://graph.facebook.com/1868200993417437/picture?type=square
    }).on('click','#fcBtn',function(){
                   facebookConnectPlugin.getLoginStatus( 
            function (response) { app._dialog(JSON.stringify(response)) },
            function (response) { alert(JSON.stringify(response)) });
    }).on('click','#logutBtn',function(){
         facebookConnectPlugin.logout(function(){}, function(){})
    }).on('click','#copy',function(){
 /* 複制連結*/
 var text = "連結";

cordova.plugins.clipboard.copy(text);
app._dialog('已複制連結');

    }).on('click','#nice',function(){
         var ref = window.open('https://play.google.com/store/apps/details?id=chk.kingnet.app&hl=zh_TW', '_system', 'location=yes'); 
    }).on('click','#ad_slide div a',function(){
        var val=$(this);
        if(val.find('input[type^=hidden]:eq(1)').val() ==""){
            var ref=window.open(val.find('input[type^=hidden]:eq(0)').val(),val.find('input[type^=hidden]:eq(2)').val());
        }else{
             _mobile.changePage('adDetail.html', { changeHash: true,data:{'paremeter':val.find('input[type^=hidden]:eq(1)').val(),'next':'moreList.html' } }); 
        }
    }).on('click','#calendarBtn',function () {
         _mobile.changePage('calendar.html', { changeHash: true}); 
    });
    app._tagProfileIsSet();
}).on('pageshow', '#moreList', function (e) {
    app._getAdInfo();
    app._getNotificationRecordTotal($(this).find('#pushRecord'));
    app._loadingHide();
      app._ga_trackView('moreList','');
}).on('pageinit','#template',function(){
  app._loadingShow();
  $(this).on('click','#header a',function(){
        _mobile.changePage('moreList.html', { changeHash: true,reverse:true});
    });
}).on('pageshow','#template',function(){
 // var val=app._getUrlParameters($(this).data("url"),'paremeter');
       // this.querySelector('h1').innerText='系統回饋';
       //$(this).find('h1').text('系統回饋');
    var iframe=document.getElementById('ifram');

  iframe.onload = function() { 
      document.querySelector('.loadingBG').style.display='none';
      document.querySelector('.loading').style.display='none';
  };
  iframe.src='https://docs.google.com/forms/d/e/1FAIpQLSec1K8wngV3gvfBjmLIX_cYhS8eL81isIzR4R5m65EgYQfX1Q/viewform';
  iframe.style.height=_tmpHeight-this.querySelector('#header').offsetHeight +'px';
}).on('pagebeforecreate','#more-about',function(){
  app._loadingShow();

}).on('pageshow', '#more-about,#more-ks', function (e) {
  if(this.id=='more-about'){
   var iframe=document.getElementById('aboutfram');
  iframe.onload = function() { 
      document.querySelector('.loadingBG').style.display='none';
      document.querySelector('.loading').style.display='none';
  };
  iframe.style.height=_tmpHeight-this.querySelector('#header').offsetHeight +'px';
  app._ga_trackView('more-about','');
  }
  app._ga_trackView('more-ks','');
}).on('pageinit', '#more-about,#more-k,#more-ks', function (e) {
    var more=$(this);
    var val=app._getUrlParameters(more.data("url"),'paremeter');
    var next=app._getUrlParameters(more.data("url"),'next');
    more.on('click','#header a:eq(0)',function(){
        if(next =='adDetail.html' && val !=''){

            _mobile.changePage(next, { changeHash: true,reverse:true,data:{'paremeter':val,'next':'index.html'}});
        }else{
            _mobile.changePage('moreList.html', { changeHash: true,reverse:true});
        }         
    }).on('click','#header a:eq(1)',function(){
      app._ga_trackEvent('more-k','ISP','分享',1);
        app._socialsharing(more);
    });
    if(this.id=='more-k'){
        var ajax_dir = "https://www.kingnet-select.com.tw/App_service/app_service.asmx";
        app._getISPAd(ajax_dir);
        app._getISPBandwidth(ajax_dir);
        var _showTab = 0;
        var $defaultDi = more.find('.navbar ul li a').eq(_showTab).addClass('active');
        more.find('.navbar ul li a:not(.out)').click(function () {
            var $this = $(this),
            _clickTab = $this.attr('href');
            // v1.2修改為三個tab
            // if(this.id=='t1'){
            //     $this.addClass('active');
            //     $('#t2').removeClass('active');
            // }else{
            //     $this.addClass('active');
            //     $('#t1').removeClass('active');
            // }
            $('.active').removeClass('active');
            $this.addClass('active');
            // /v1.2修改為三個tab
            $(_clickTab).stop(false, true).show().siblings().hide();
            return false;
        }).focus(function () {
            this.blur();
        });
        more.on('click','#qk_link',function(){
                // var ref = window.open('http://www.kingnet.net.tw/web/rates.aspx', '_system', 'location=yes');                
            app._ga_trackEvent('more-k','ISP','我要諮詢',1);
            navigator.notification.confirm(
                '請選擇居住區域',
                function (idx) {
                    if(idx ==1 || idx ==2)
                    app._inputPhoneDialogISP(idx);
                 },
                 '網路服務諮詢',
                 ['台中','台北']
            );
        }).on('click','#fb_post',function(){
          app._ga_trackEvent('more-k','ISP','用戶好評',1);
            var ref = window.open('https://www.facebook.com/kingnet.net/posts_to_page/', '_system', 'location=yes'); 
        }).on('click','#fb',function(){
             var ref = window.open('https://zh-tw.facebook.com/kingnet.net/', '_system', 'location=yes'); 
        });
    }else if(this.id=='more-ks'){
        more.on('click','#ksBtn',function(){
            var ref = window.open('https://www.kingnet-select.com.tw/mobile', '_system', 'location=yes'); 
        });
    }
}).on('pageshow','#more-k',function(e){
    var more=$(this);
    more.find('.more-k-content').attr({'min-height': (parseInt(_tmpHeight)- parseInt(more.find('#header').height())-parseInt(more.find('#footer').height())) +'px;'});
    app._ga_trackView('more-k','');
}).on('pagebeforecreate', '#more-qa', function (e) {
  app._loadingShow();
    var more=$(this);
      var backpage=app._getUrlParameters(more.data("url"),'paremeter');
    if(backpage=='snLogin.html'){
        more.find('.qaWrap div:eq(1)').attr('data-collapsed','false').trigger('create');
    }
    else if(backpage=='postal.html')
    {
         more.find('.qaWrap div:eq(3)').attr('data-collapsed','false').trigger('create');
    }

}).on('pageshow', '#more-qa', function (e) {
         var iframe=document.getElementById('qafram');

  iframe.onload = function() { 
      document.querySelector('.loadingBG').style.display='none';
      document.querySelector('.loading').style.display='none';
  };
  iframe.style.height=_tmpHeight-this.querySelector('#header').offsetHeight +'px';
}).on('pageinit', '#more-qa', function (e) {

    var more=$(this);
    var backpage=app._getUrlParameters(more.data("url"),'paremeter');
    var val=app._getUrlParameters(more.data("url"),'next');
    more.on('click','#header a',function(){
        if(backpage=='postal.html'){
            _mobile.changePage(backpage, { changeHash: true,data:{'paremeter':val}}); 
        }else{
            _mobile.changePage(backpage, { changeHash: true}); 
        }
    });
}).on('pageinit', '#postal_scan', function (e) {
    var page=$(this);
    var backpage=app._getUrlParameters(page.data("url"),'paremeter');
    var community='';
    backpage= backpage =='' ? 'index.html':backpage;

    if(backpage!='index.html'){
        community=app._getUrlParameters(page.data("url"),'next');
    }

    page.on('click', '#header a', function () {
        if(backpage=='index.html'){
             _mobile.changePage(backpage, { changeHash: true, reverse: true }); 
        }else{
            _mobile.changePage(backpage, { changeHash: true, reverse: true, data:{'paremeter':community} }); 
        }
    });
}).on('pagebeforehide', '#adDetail', function (e) { 
     document.removeEventListener('backbutton',_onBackPageAd,false);
}).on('pagebeforecreate', '#adDetail', function (e) { 
    $(this).find('.detail-h').hide();
    app._loadingShow();
}).on('pageinit', '#adDetail', function (e) { 
    var page=$(this);
    var next=app._getUrlParameters(page.data("url"),'next');
    var s_ad=app._getUrlParameters(page.data("url"),'paremeter');
    tempVal=next;
    document.addEventListener('backbutton',_onBackPageAd,false);
    page.on('click','#header a:eq(0)',function(){
        if(next=='index.html'){
             _mobile.changePage('index.html', { changeHash: true, reverse: true });
        }else{
             _mobile.changePage(next, { changeHash: true, reverse: true });
        }     
    }).on('click','#header a:eq(1)',function(){ 
      app._socialsharing(page);
//window.plugins.socialsharing.share('370/月，70M', null, null, 'http://www.kingnet.net.tw/userfiles/0519-%E8%B3%87%E8%B2%BB%E8%88%87%E6%9C%8D%E5%8B%99-01%20(1).png')
    }).on('click','#qk_link div',function(){
        var val=$(this).find('input[type^=hidden]:eq(1)').val();
        if(val=='isp'){
          app._ga_trackEvent('adDetail','ISP','我要諮詢',1);
            navigator.notification.confirm(
                '請選擇居住區域',
                function (idx) {
                    if(idx ==1 || idx ==2)
                    app._inputPhoneDialogISP(idx);
                 },
                 '網路服務諮詢',
                 ['台中','台北']
            );
        }else if(val=='more-k'){
          app._ga_trackEvent('adDetail','ISP','看更多',1);
           _mobile.changePage('more-k.html', { changeHash: true, reverse: false, data:{'paremeter':s_ad,'next':'adDetail.html'} });
        }else{
           var ref = window.open(val,$(this).find('input[type^=hidden]:eq(0)').val() , ''); 
       }        
    });

}).on('pageshow', '#adDetail', function (e) { 
   var val = app._getUrlParameters($(this).data("url"),'paremeter');
   app._getBrickDetailAdInfo($(this),val);
     app._ga_trackView('adDetail','');
}).on('pageshow', '#postal_scan', function (e) {    
    //Barcode 初始化
    app._setBarcode($('#code_scan'), app._getLocalStorageJson('code'));
    //QR Code 初始化
    app._setQrCode($('#qr_scan'), app._qrCodeHeader() + app._getLocalStorageJson('code')+ app._qrCodeFooter());
    var _showTab = 0;
    var $defaultDi = $(this).find('div.navbar a').eq(_showTab).addClass('active');
    $($defaultDi.attr('href')).siblings().hide();
    $(this).on('click','div.navbar a:not(.out)',function () {
        $('div.navbar a').removeClass('active');
        var $this = $(this),
        _clickTab = $this.attr('href');
        $this.addClass('active');      
        $(_clickTab).stop(false, true).show().siblings().hide();
        return false;
    });
    app._loadingHide();
}).on('pagebeforehide', '#postal_scan', function (e) {
    app._loadingShow();
}).on('pagebeforehide', '#postal', function (e) {
    document.removeEventListener('backbutton',_onBackPagePostal,false);
}).on('pagebeforecreate', '#postal', function (e) {
    app._loadingShow();
}).on('pageshow', '#postal', function (e) {
    var community = app._getUrlParameters($(this).data("url"), '');
    app._getPostalInfo(community,'');
    app._getReturnPostalInfo(community);
    app._editPostalNotificationIsRead(community);
    app._ga_trackView('postal','');
   
}).on('pageinit', '#postal', function (e) {
    var postal=$(this);
    var community = app._getUrlParameters(postal.data("url"), '');
    app._footerShow('postal.html',this.id);
    document.addEventListener('backbutton',_onBackPagePostal,false);
    postal.on('click', '#header a:eq(0)', function () {
         if(app._getLocalStorageJson('com_count') =='1')
         {
            _mobile.changePage("index.html", { changeHash: true, reverse: true });
         }else{           
            _mobile.changePage("communityList.html", { changeHash: true, reverse: true, data:{'paremeter':'postal.html'} });
         } 
    }).on('click','.guide-postal-content',function(){
      this.style.display='none';
    }).on('click','#footer ul li:eq(1) a',function(){
        _htmlBody.animate({scrollTop:0},400);
    }).on('click','#header a:eq(1)',function(){
        _mobile.changePage("login.html", { changeHash: true, data:{'paremeter':'postal.html','next':community}  });
    }).on('click','.howto',function(){
        _mobile.changePage("more-qa.html", { changeHash: true, data:{'paremeter':'postal.html','next':community}  });
    }).on('click','#updateBtn',function(){
        //app._loadingShow();
        //app._getPostalInfo(community);     
    }).on('click','#postalList li,#pushBag',function(){
        var _a=$(this);
        var dev=device.version.split('.');
        var arr=[];
        var str='';
        if(_a.find('div.privacy-tag').length>0){
            if(dev.length>0){
                if(dev[0]>=5){
                    arr.push('立即領取');
                    arr.push('解除私人');
                    arr.push('稍後領取');
                }else{
                    arr=['立即領取','暫時先不用','解除私人'];
                    //arr=['暫時先不用','立即領取','解除私人'];
                }
            }                 
            str='\n\n●解除私人鎖定，該包裏將開放家人進行領取。';
        }else{
            arr=['立即領取','暫時先不用'];
            //arr=['暫時先不用','立即領取'];
        }
          navigator.notification.confirm(
                '將前往個人識別條碼頁面進行包裹領取(提醒您系統會自動調整頁面亮度)'+str, // message
                function (idx) {
                    if(idx==1){
                        _mobile.changePage("login.html", { changeHash: true, data:{'paremeter':'postal.html','next':community } });
                    }else{
                        if(arr[arr.length-1]=='解除私人'){ // < 5 version && privacy
                            if(idx==3){
                                app._cancelPostalPrivacy(community,_a);
                            }
                        }else{
                            if(arr.length==3){ // > 5 version && privacy
                                if(idx==2){
                                    app._cancelPostalPrivacy(community,_a);
                                }
                            }
                        }                    
                    }                 
                },
                '領取包裹?',
                arr
            );
    });


    var _showTab=postal.find('div.navbar ul li a').eq(0).attr('href');
    var $defaultDi = postal.find('div.navbar ul li a').eq(0).addClass('active'); 
    
    postal.on('swipeleft',function(){
        var active=postal.find('div.navbar a.active').attr('href');      
        if(active=='#segmented-div-a'){
            postal.find('div.navbar ul li a').removeClass('active');
            postal.find('#segmented-div-b').stop(false, true).show().siblings().hide();
            postal.find('div.navbar ul li:eq(1) a').addClass('active');   
            if(postal.find('#segmented-div-b ul li').length==0){
                postal.find('div.empty').show();
            }
        }else if(active=='#segmented-div-b'){
            postal.find('div.navbar ul li a').removeClass('active');
            postal.find('#segmented-div-c').stop(false, true).show().siblings().hide();
            postal.find('div.navbar ul li:eq(2) a').addClass('active'); 
            if(postal.find('#segmented-div-c ul li').length==0){
                postal.find('div.empty').show();
            }
        }        
       
    });
    postal.on('swiperight',function(){
        var active=postal.find('div.navbar a.active').attr('href');     
        if(active=='#segmented-div-b'){
            postal.find('div.navbar ul li a').removeClass('active');
            postal.find('#segmented-div-a').stop(false, true).show().siblings().hide();  
             postal.find('div.navbar ul li:eq(0) a').addClass('active'); 
             if(postal.find('#segmented-div-a ul li').length==0){
                postal.find('div.empty').show();
            } 
        }else if(active=='#segmented-div-c'){
            postal.find('div.navbar ul li a').removeClass('active');
            postal.find('#segmented-div-b').stop(false, true).show().siblings().hide(); 
            postal.find('div.navbar ul li:eq(1) a').addClass('active'); 
            if(postal.find('#segmented-div-b ul li').length==0){
                postal.find('div.empty').show();
            }
        }
    });
 

    $($defaultDi.attr('href')).siblings().hide();
    postal.find('div.navbar ul li a:not(.out)').click(function () {
        postal.find('div.empty').hide();
        var $this = $(this),
        _clickTab = $this.attr('href');

        postal.find('div.navbar ul li a').removeClass('active');    
        $this.addClass('active');
        $(_clickTab).stop(false, true).fadeIn().siblings().hide();
        if($(_clickTab).find('ul li').length==0){
            postal.find('div.empty').show();
        }
        if(_showTab!=_clickTab){
            _showTab=_clickTab;
        }    
          _htmlBody.animate({scrollTop:0},400); 
        return false;
    });


    app._tagProfileIsSet();
}).on('pagebeforehide', '#communityList', function (e) {
    document.removeEventListener("backbutton", _onBackPageList, false);
    g_typeName=[];
    g_typeArr=[];
    g_total=0;
    storePosition.topCoordinate = 0;
}).on('pageinit', '#communityList', function (e) {
    var page=$(this);
    document.addEventListener("backbutton", _onBackPageList, false);
    var domStr = '';
    var _userList = page.find('#user_list');
    var nextPage = app._getUrlParameters(page.data("url"), '');
        //讀取社區明細表
    $.each(JSON.parse(app._getLocalStorage('comInfo')).info, function (i, v) {
        domStr+=app._comList('',v);
    });
    _userList.html(domStr);
    _userList.trigger('create');
    page.on('click', '#user_list a', function () {
        _mobile.changePage(nextPage, { changeHash: true, data: { 'paremeter': $(this).find('input[type^=hidden]').val() } });
    }).on('click', '#header a', function () {
        _mobile.changePage("index.html", { changeHash: true, reverse: true });
    });

}).on('pageshow', '#communityList', function (e) {
    var domStr = '';
    var page=$(this);
    var _userList = page.find('#user_list');
    var nextPage = app._getUrlParameters(page.data("url"), '');
    app._footerShow(nextPage,this.id);
    if($('#user_list li').length==0){
        $.each(JSON.parse(app._getLocalStorage('comInfo')).info, function (i, v) {
            domStr+=app._comList('',v);
        });
         _userList.html(domStr);
        _userList.trigger('create');
    } 
    app._commnityAnnouncement(_userList,nextPage);
    app._tagProfileIsSet();
    app._loadingHide();
    app._ga_trackView('communityList','');
}).on('pagebeforecreate', '#announcement_v2', function () {
  app._loadingShow();
}).on('pagebeforehide', '#announcement_v2', function () { 
document.removeEventListener("backbutton",_onBackPageAnn, false);
}).on('pageinit', '#announcement_v2', function () {  
    var page=$(this);
    var com_id=app._getUrlParameters(page.data("url"), 'paremeter');
    var _ann=this;
    var change=g_typeArr.length;
    var scroll=0;
    var arr=['other','normal','meeting','financial','fix','active'];
    $(document).scroll(function () {
       scroll=$(this).scrollTop();      
    });
    page.on('click', '#header a:eq(0)', function () {
         if(app._getLocalStorageJson('com_count') =='1')
         {
            _mobile.changePage("index.html", { changeHash: true, reverse: true });
         }else{           
            _mobile.changePage("communityList.html", { changeHash: true, reverse: true, data:{'paremeter':'announcement_v2.html'} });
         }
    }).on('click', '#ann_list li a', function () {

        var val=$(this).find('input[type^=hidden]').val();
        storePosition.topCoordinate = scroll;
       
        if(this.querySelector('span.new') && _annBadgeCount >0){
            _annBadgeCount--;      
        }
        _ann.querySelector('#ann_list').innerHTML='';
         app._loadingShow();
        setTimeout(function(){
            _mobile.changePage("announcementDetail.html", { changeHash: true, data: { 'paremeter': val,'com': com_id} });
        },300);    
    }).on('click','#header a:eq(1)',function(){
        app._setLocalStorage('annNews','');
        g_typeName=[];
        g_typeArr=[];
        g_total=0;
        app._loadingShow();
        _mobile.changePage('announcement_v2.html', { changeHash: true,reloadPage: true , data: { 'paremeter': com_id } });
    }).on('click','.filterTips .clear',function(){
        g_typeName=[];
        g_typeArr=[];
        g_total=0;
        change=0;
        _ann.querySelectorAll('.selected').className='filterItem';
        page.find('.filterItem').removeClass('selected');
       _ann.querySelector('.filterTips').style.display='none';
       page.find('#ann_list li').show();  
       _ann.querySelector('.content').className='content';
        _ann.querySelector('.filterContent h3 span').innerHTML='所有分類';
         _ann.querySelector('.wrapFooter span').innerText=JSON.parse(app._getLocalStorage('annNews')).info.length;
         _htmlBody.animate({scrollTop:0},200);
    }).on('click','.wrapFooter',function(){
        document.removeEventListener('backbutton',_onBackPageV2ann,false);
         document.addEventListener('backbutton',_onBackPageAnn,false);
      var tipStr='';
      var fc=JSON.parse(app._getLocalStorage('annNews')).info.length;
      if(g_total !=0 && fc !=g_total){
        page.find('#ann_list li').hide();
        for(var i=0;i<g_typeArr.length;i++){
          page.find('#ann_list li.'+g_typeArr[i]).show();     
          tipStr+= g_typeName[i] +','; 
        }
        tipStr=tipStr.substring(0,tipStr.length-1);
        _ann.querySelector('#ftips').innerHTML='<i class="icon-controls"></i>'+tipStr;
        _ann.querySelector('.content').className='content pushDiv';
        _ann.querySelector('.filterTips').style.display='block';
      } else{
          page.find('#ann_list li').show();   
          _ann.querySelector('.filterTips').style.display='none';
           _ann.querySelector('.content').className='content';
      }    
      setTimeout(function(){ _ann.querySelector('.filterWrap').style.display='none';
            _htmlBody.animate({scrollTop:0},200);
        },100);
    }).on('click','.filtertType .filterItem',function(){
      var idx=$(this);
      if (this.className.replace(/[\n\t]/g, "").indexOf("selected") > -1 ){
          this.className ='filterItem';
          change--;
          for(var i=0;i<g_typeArr.length;i++){
              if(g_typeArr[i]==this.querySelectorAll('input')[0].value){
                  g_typeArr.splice(i, 1);
                  g_typeName.splice(i, 1);
              }
          }     
      }else{
          change++;
          this.className ='filterItem selected';
          g_typeArr.push(this.querySelectorAll('input')[0].value);
          g_typeName.push(this.querySelectorAll('input')[1].value);
      }
      if(change==0){
          _ann.querySelector('.filterContent h3 span').innerHTML='所有分類';
      }else{
          _ann.querySelector('.filterContent h3 span').innerHTML='已選擇了<span>'+ change +'</span>個分類';
      }
      g_total=0;
      $.each(JSON.parse(app._getLocalStorage('annNews')).info, function (i, v) {
          if(g_typeArr.indexOf(arr[v.type]) !=-1){
            g_total++;
          }
      });
      _ann.querySelector('.wrapFooter span').innerText=g_total ==0 ? JSON.parse(app._getLocalStorage('annNews')).info.length:g_total;
    
    }).on('click', '.close', function () {
       document.removeEventListener('backbutton',_onBackPageV2ann,false);
       _ann.querySelector('.filterWrap').style.display='none';
         document.addEventListener('backbutton',_onBackPageAnn,false);
       if(page.find('#ann_list li:visible').length==page.find('#ann_list li').length){
          //_ann.querySelector('.filterContent h3 span').innerHTML='所有分類';
          change=0;
       }else{
            var typeArr=[]
           for(var i=0;i<page.find('#ann_list li:visible').length;i++){
                if(typeArr.indexOf(page.find('#ann_list li:visible:eq('+ i +')').attr('class')) ==-1)
                {
                    typeArr.push(page.find('#ann_list li:visible:eq('+ i +')').attr('class'))

                }           
           } 
            g_typeArr=typeArr;
           change=typeArr.length;
         // _ann.querySelector('.filterContent h3 span').innerHTML='已選擇了<span>'+ typeArr.length +'</span>個分類';
       }


    }).on('click', '.filterBtn', function () {
       document.removeEventListener('backbutton',_onBackPageAnn,false);
       _ann.querySelector('.filterWrap').style.display='block';
       document.addEventListener('backbutton',_onBackPageV2ann,false);
       if(page.find('#ann_list li:visible').length!=page.find('#ann_list li').length){
       var typeArr=[]
       var typeName=[];
       page.find('.filterItem').removeClass('selected');
       for(var i=0;i<page.find('#ann_list li:visible').length;i++){
            if(typeArr.indexOf(page.find('#ann_list li:visible:eq('+ i +')').attr('class')) ==-1)
            {
                typeArr.push(page.find('#ann_list li:visible:eq('+ i +')').attr('class'));
                page.find('.filterItem input[value="'+ page.find('#ann_list li:visible:eq('+ i +')').attr('class') +'"]').parent().addClass('selected');
                typeName.push(page.find('#ann_list li:visible:eq('+ i +') p').text().split(' ')[1]);

            }           
       } 
       g_typeArr=[];
       g_typeArr=typeArr;
       if(page.find('#ann_list li:visible').length==page.find('#ann_list li').length){
          _ann.querySelector('.filterContent h3 span').innerHTML='所有分類';
       }else{
          _ann.querySelector('.filterContent h3 span').innerHTML='已選擇了<span>'+ typeArr.length +'</span>個分類';
       }
       
       _ann.querySelector('.wrapFooter span').innerText= page.find('#ann_list li:visible').length;

       }
       
    });
}).on('pageshow', '#announcement_v2', function () {
    document.addEventListener("backbutton",_onBackPageAnn, false);
    app._footerShow('announcement_v2.html',this.id);
   var page=$(this);
   var _ann=this;
   var com_id=app._getUrlParameters(page.data("url"), 'paremeter');
    var arr=['other','normal','meeting','financial','fix','active'];
   if(app._getLocalStorage('annNews')=='' || JSON.parse(app._getLocalStorage('annNews')).com !=com_id){ 
     app._getAnnouncementList(com_id,function(data){
        if(data=='error'){
          app._connectionDialog();
          if(app._getLocalStorageJson('com_count') =='1')
           {
              _mobile.changePage("index.html", { changeHash: true, reverse: true });
   
           }else{           
              _mobile.changePage("communityList.html", { changeHash: true, reverse: true, data:{'paremeter':'announcement_v2.html'} });
           }
        }else{
          if(data.length==0){
            //開啟無公告資訊、關閉篩選btn
            _ann.querySelector('.empty').style.display='block';
            _ann.querySelector('.filterBtn').style.display='none';
          }else{
            storePosition.topCoordinate=0;
            var annJson = '{"com":"'+ com_id +'","info":' + JSON.stringify(data) + '}';
            app._setLocalStorage('annNews',annJson);
            _ann.querySelector('.wrapFooter span').innerText=JSON.parse(annJson).info.length;
            app._formatAnnouncementDom(annJson,function(dom,filterDom,filter){
              _ann.querySelector('#ann_list').innerHTML=dom;
              if(filter<=1){
                 _ann.querySelector('.filterBtn').style.display='none';
              }else{
                 _ann.querySelector('.filtertType').innerHTML=filterDom;
              }
            });
          }
        }
        setTimeout(function(){
          //$.mobile.silentScroll(storePosition.topCoordinate);
          _htmlBody.animate({scrollTop:storePosition.topCoordinate},200);
          app._loadingHide(100);
        },300);
     }); 
   }else{
      g_total=0;
      _ann.querySelector('.wrapFooter span').innerText=JSON.parse(app._getLocalStorage('annNews')).info.length;
      app._formatAnnouncementDom(app._getLocalStorage('annNews'),function(dom,filterDom,filter){
          _ann.querySelector('#ann_list').innerHTML=dom;
          if(filter<=1){
             _ann.querySelector('.filterBtn').style.display='none';
          }else{
            _ann.querySelector('.filtertType').innerHTML=filterDom;

              if(g_typeName.length==0){
                  _ann.querySelector('.filterContent h3 span').innerHTML='所有分類';
              }else{
                  _ann.querySelector('.filterContent h3 span').innerHTML='已選擇了<span>'+ g_typeName.length +'</span>個分類';
              
              page.find('#ann_list li').hide();  
              var tipStr='';
              $.each(JSON.parse(app._getLocalStorage('annNews')).info, function (i, v) {
                  var idx=g_typeArr.indexOf(arr[v.type]);
                  if(idx !=-1){
                    tipStr=tipStr.replace(g_typeName[idx] +',','');
                    tipStr+= g_typeName[idx] +','; 
                    page.find('#ann_list li.'+arr[v.type]).show();  
                    g_total++;
                  }
              });

            tipStr=tipStr.substring(0,tipStr.length-1);
            _ann.querySelector('#ftips').innerHTML='<i class="icon-controls"></i>'+tipStr;
            _ann.querySelector('.content').className='content pushDiv';
            _ann.querySelector('.filterTips').style.display='block';
              _ann.querySelector('.wrapFooter span').innerText=g_total ==0 ? JSON.parse(app._getLocalStorage('annNews')).info.length:g_total;
            }  
          }
      });
  
      setTimeout(function(){
          //$.mobile.silentScroll(storePosition.topCoordinate);
           _htmlBody.animate({scrollTop:storePosition.topCoordinate},200);
          app._loadingHide(100);
        },300);

   }  
}).on('pagebeforehide', '#announcement', function (e) {
        
}).on('pagebeforecreate', '#announcement', function (e) {
    app._loadingShow();
}).on('pageinit', '#announcement', function () {
    var page=$(this);
    app._footerShow('announcement.html',this.id);
    var com_id=app._getUrlParameters(page.data("url"), 'paremeter');

    page.on('click', '#header a:eq(0)', function () {
         if(app._getLocalStorageJson('com_count') =='1')
         {
            _mobile.changePage("index.html", { changeHash: true, reverse: true });
 
         }else{           
            _mobile.changePage("communityList.html", { changeHash: true, reverse: true, data:{'paremeter':'announcement.html'} });
         }
    }).on('click', '#header a:eq(1)', function () {
       app._setLocalStorage('annNews',''); 
        _mobile.changePage('announcement.html', { changeHash: true,reloadPage: true , data: { 'paremeter': com_id } });
        /*
        this.style.display='none';
        app._loadingShow();
        app._setLocalStorage('annNews',''); 
          var _annL=page;
          var _annTitle = _annL.find('#ann_title');
          var _annList = _annL.find('#ann_list');
          var _annType = _annL.find('#ann_type');
          setTimeout(function(){
              if(app._getLocalStorage('annNews')=='' || JSON.parse(app._getLocalStorage('annNews')).com !=com_id){ 
                _anninitialSlide=0;
                  $.ajax({
                      url: app._getWebServiceMethod('getAnnouncementInfo'),
                      data: { 'com_id': app._getUrlParameters(_annL.data("url"), ''),'code':app._getLocalStorageJson('code') },
                      type: 'post',
                      async: true,
                      success: function (datas) {
                          page.find('#ann_list').html('');
                          var annJson = '{"com":"'+ com_id +'","info":' + datas + '}';
                          app._setLocalStorage('annNews',annJson);
                          ann = JSON.parse(app._getLocalStorage('annNews'));
                          app._annListShow(ann,_annTitle,_annList,_annType,_annL);
                          $.mobile.silentScroll(0);
                          app._loadingHide(100);
                          //alert(annJson);
                      },error:function(){
                          app._dialog('更新失敗，請稍候再試');
                      }
                  });            
              }  
          },300);
      */
    }).on('click', '#ann_list a', function () {
        var val=$(this).find('input[type^=hidden]').val();
        storePosition.topCoordinate = $(this).offset().top;
        app._loadingShow();
        if(this.querySelector('span.new') && _annBadgeCount >0){
            _annBadgeCount--;      
        }
        page.find('#ann_list').remove();
        setTimeout(function(){
            _mobile.changePage("announcementDetail.html", { changeHash: true, data: { 'paremeter': val,'com': com_id} });
        },300);    
    }).on('click','#footer ul li:eq(3) a',function(){
        _htmlBody.animate({scrollTop:0},400);
    });
}).on('pageshow', '#announcement', function () {
      document.addEventListener("backbutton",_onBackPageAnn, false);
    var _annL=$(this);
    var com_id=app._getUrlParameters(_annL.data("url"), 'paremeter');
    var pageHeight=app._getUrlParameters(_annL.data("url"), 'height');   
    var _annTitle = _annL.find('#ann_title');
    var _annList = _annL.find('#ann_list');
    var _annType = _annL.find('#ann_type');
    var domStr = '';
    var sw; 
    var ann;

    setTimeout(function(){
        if(app._getLocalStorage('annNews')=='' || JSON.parse(app._getLocalStorage('annNews')).com !=com_id){ 
            _anninitialSlide=0;
            $.ajax({
                url: app._getWebServiceMethod('getAnnouncementInfo'),
                data: { 'com_id': app._getUrlParameters(_annL.data("url"), ''),'code':app._getLocalStorageJson('code') },
                type: 'post',
                async: true,
                success: function (datas) {
                    var annJson = '{"com":"'+ com_id +'","info":' + datas + '}';
                    app._setLocalStorage('annNews',annJson);
                    ann = JSON.parse(app._getLocalStorage('annNews'));
                    app._annListShow(ann,_annTitle,_annList,_annType,_annL);
                    storePosition.topCoordinate=0;
                    app._loadingHide(100);
                }
            });
        }else{
             ann = JSON.parse(app._getLocalStorage('annNews'));
             app._annListShow(ann,_annTitle,_annList,_annType,_annL);
        
        }  
            if(storePosition.topCoordinate !== null) {
               if(app._getLocalStorage('annNews')=='' || JSON.parse(app._getLocalStorage('annNews')).com !=com_id){ 
                setTimeout(function(){
                    $.mobile.silentScroll(storePosition.topCoordinate-150);
                         app._loadingHide(100);
                },1000);
              }else{
                setTimeout(function(){
                   $.mobile.silentScroll(storePosition.topCoordinate-150);
                         app._loadingHide(100);
                },400);
               
              }
            }
    },300);
    /*

    */
    app._ga_trackView('announcement','');
}).on('pagebeforecreate', '#announcementDetail,#feedback,#feedbackEdit_v2,#feedbackDetail', function (e) {
      app._loadingShow();
}).on('pagebeforehide','#feedbackEdit,#feedbackDetail', function (e){
      app._loadingShow();
}).on('pagebeforehide','#announcementDetail', function (e){
      app._loadingShow();
}).on('pageshow','#feedbackEdit_v2', function (e){
      app._loadingHide();
        app._ga_trackView('feedbackEdit','');
}).on('pageshow','#announcementDetail', function (e){  
      var page=$(this);
      var com_id=app._getUrlParameters(page.data("url"), 'com');
      var detail_id=app._getUrlParameters(page.data("url"), 'paremeter');  
      var image;
      var _fileWrap=page.find('.fileWrap ul');
      var _annPic=page.find('#annDetail_pic');
      page.on('click','#annDetail_pic',function(){
        //var ref = window.open(image, '_blank', 'location=no');
        app._openFile(image);
      }).on('click','div.detail-c-pic',function(e){
        if(this.id !='annDetail_pic'){
            //var ref = window.open($(this).find('img').prop('src'), '_blank', 'location=no,enableViewportScale=yes');
            app._openFile($(this).find('img').prop('src'));
        }
      });
      var _badge='0';
      if(_annBadge.length>0){
        for(var key in _annBadge){ 
            if(detail_id==_annBadge[key])
                _badge='1';
        }
      }
      if(_badge=='0'){
        _annBadge.push(detail_id);
      }
    
      $.ajax({
        url: app._getWebServiceMethod('getAnnouncementDetailInfo'),
        type: 'post',
        dataType:'json',
        data: { 'com_id': com_id,'id':detail_id,'code':app._getLocalStorageJson('code') },
        async: true,
        complete:function(){app._loadingHide();},
        success: function(datas){
            $.each(datas, function (i, v) {
               $('#annDetail_title').text(v.title);
               $('#annDetail_sub').text(v.create_date +' '+ v.type);
               $('#annDetail_txt').html(v.detail);
               if(v.image!=''){
                    image=v.image;
                    _annPic.find('img').attr({'src':image});
                    _annPic.find('.zoomin').show();
               }else{
                    _annPic.remove();
               }
                if(v.attached_file !='' && v.attached_file !='[]'){
                    var img_url='';
                    $.each(JSON.parse(v.attached_file),function(idx,val){
                        if(val.i !=undefined){
                            if(img_url==''){
                                img_url= v.image.replace(val.i,'');
                            }
                            if(val.i != v.image.Right(9)){
                               var ds='<div class="detail-c-pic">';
                                ds+='<img src="'+ img_url+''+val.i +'" />';
                                ds+='<div class="zoomin" style="display:block;">';
                                ds+='<i class="icon icon-dateline"></i>放大瀏覽';
                                ds+='</div></div>';
                               $('div.detail-c').append(ds).trigger('refresh');
                            }                        
                        }                      
                    });
               }
               if(v.upload_1 !=''){
                _fileWrap.find('li:eq(0)').show().find('a input[type^=hidden]').val(v.upload_1);      
               }
               if(v.upload_2 !=''){
               _fileWrap.find('li:eq(1)').show().find('a input[type^=hidden]').val(v.upload_2);     
               }
               if(v.upload_3 !=''){
                _fileWrap.find('li:eq(2)').show().find('a input[type^=hidden]').val(v.upload_3);      
               }
               if(v.upload_1 =='' && v.upload_2 =='' && v.upload_3 ==''){
                    page.find('.fileWrap').hide();
               }
            });
        },
        error:function(exc){
        }
      });   
    app._ga_trackView('announcementDeatil','');

}).on('pageinit', '#announcementDetail', function (e) {
    app._footerShow('announcementDetail.html',this.id);
    var page=$(this);
      var com_id=app._getUrlParameters(page.data("url"), 'com'); 
      page.on('click', '#header a,#backBtn', function () {
        app._loadingShow();
        page.find('.detailWrap').remove();
        _mobile.changePage("announcement_v2.html", { changeHash: true,reverse:true, data: { 'paremeter': com_id } });
       }).on('click','#file_ul li a', function (e) {
         app._openFile($(this).find('input[type^="hidden"]').val());
         //var ref = window.open('https://docs.google.com/viewer?url='+ encodeURI($(this).find('input[type^="hidden"]').val()), '_blank', 'location=no');
      });
}).on('pageinit','#feedbackDetail',function(e){
     app._footerShow('feedbackDetail.html',this.id);
    var com=app._getUrlParameters($(this).data("url"), 'com'); 
    $(this).on('click', '#header a', function () {
        _mobile.changePage("feedback.html", { changeHash: true,reverse:true, data: { 'paremeter': com } });
    }).on('click','.detail-c-pic',function(){
         app._openFile(this.querySelector('input').value);
         //var ref = window.open(this.querySelector('input').value, '_blank', 'location=no');
         //return false;
    })

}).on('pageshow','#feedbackDetail',function(e){
    var msg;
    var fbd=this;
    var page=$(this);
    var com=app._getUrlParameters(page.data("url"), 'com'); 
    var msg_id=app._getUrlParameters(page.data("url"), 'paremeter'); 
    page.on('click','#readMore',function(){
        page.find('#msg_d_txt').html(msg);
        this.style.display='none';
       // $(this).hide();
    });

     $.ajax({
        dataType: 'json',
        url: app._getWebApi('Message','getMessageInfo'),
        data:'comId='+com+'&msg_id='+msg_id+'&code='+app._getLocalStorageJson('code'),
        type: 'get',
        async: true,
        success: function(v){
            _msgBadgeCount--;
                if(v.msg.length>50){   
                   page.find('#msg_d_txt').html(v.msg.substring(0,50)+'... <span id="readMore" class="rMoreShow">繼續閱讀</span>');
                   msg=v.msg;
                }else{
                   page.find('#msg_d_txt').text(v.msg); 

                }
                fbd.querySelector('.tag').innerText=v.msg_type;
                page.find('#feedback_time').text('提交時間 '+ v.create_date);
                if(v.fb_date!=''){
                    page.find('.user-info span').text(v.fb_name);
                    page.find('.txt p').text(v.feedback);
                    page.find('.time span').html('回覆於 <span>'+v.fb_date+'</span>');
                }
                if(v.photo !=''){
                    var _div=document.createElement('div');
                    _div.className='act-image';
                    _div.setAttribute('style','background:url('+ v.photo +') no-repeat center center; background-size: cover;position:relative;')
                    var _divd=document.createElement('div');
                    _divd.className='zoomin';
                    _divd.innerText='放大瀏覽';
                    _div.appendChild(_divd);  
                    _divd=document.createElement('input');
                    _divd.type='hidden';
                    _divd.value=v.photo;
                    _div.appendChild(_divd); 
                    fbd.querySelector('#msgDiv .detail-c-pic').appendChild(_div);
                    page.find('#msgDiv .detail-c-pic').show();
                }
                if(v.fb_photo !='' && v.fb_photo != undefined){
                    var _div=document.createElement('div');
                    _div.className='act-image';
                    _div.setAttribute('style','background:url('+ v.fb_photo +') no-repeat center center; background-size: cover;position:relative;')
                    var _divd=document.createElement('div');
                    _divd.className='zoomin';
                    _divd.innerText='放大瀏覽';
                    _div.appendChild(_divd);
                    _divd=document.createElement('input');
                    _divd.type='hidden';
                    _divd.value=v.fb_photo;
                    _div.appendChild(_divd); 
                    fbd.querySelector('#replyDiv .detail-c-pic').appendChild(_div);
                    page.find('#replyDiv .detail-c-pic').show();
                }
            app._loadingHide(500);
        },error:function(e){
            app._connectionDialog();
            return false;
        }
    });
  app._ga_trackView('feedbackDetail','');
}).on('pagebeforehide','#feedback',function(e) { 
    document.removeEventListener('backbutton',_onBackPageFeed,false);
}).on('pageinit','#feedback',function(e) {  
    app._footerShow('feedback.html',this.id);
    document.addEventListener('backbutton',_onBackPageFeed,false);
    var par=app._getUrlParameters($(this).data("url"), ''); 
    /*
    socket.emit('close_service',{
            'com_id':'15121601',
            'service':'1',
            'uuid':
    });
    socket.on('closeService_'+device.uuid,function(data) {
        alert(data);
    });
    */
      $(this).on('click', '#header a:eq(0)', function () {
         if(app._getLocalStorageJson('com_count') =='1')
         {
            _mobile.changePage("index.html", { changeHash: true, reverse: true });
 
         }else{           
            _mobile.changePage("communityList.html", { changeHash: true, reverse: true, data:{'paremeter':'feedback.html'} });
         } 
      }).on('click','#header a:eq(1),.empty a',function(){
            _mobile.changePage("feedbackEdit_v2.html", { changeHash: true, data:{'paremeter':par} });
      }).on('click','.feedback-content ul li a',function(){
            _mobile.changePage("feedbackDetail.html", { changeHash: true, data:{'paremeter':$(this).find('input[type^=hidden]').val(),'com':par} });
      });

}).on('pageshow','#feedback',function(e) { 
    var page=$(this);
    var par=app._getUrlParameters($(this).data("url"), ''); 
    var domStr='';
    $.ajax({
         url: app._getWebApi('Message','getMessageList'),
        data:'comId='+par+'&code='+app._getLocalStorageJson('code'),
        type: 'get',
        dataType: 'json',
        async: true,
        success: function(datas){
            $.each(datas, function (i, v) {
                domStr += app._messageList(v);
            });
            if(domStr !=''){
                page.find('.feedback-content ul').html(domStr).trigger('create');
            }else{
                page.find('.empty').show();
            }
            app._loadingHide(500);
        },error:function(e){
            app._connectionDialog();
            return false;
        }
    });
    app._ga_trackView('feedback','');
}).on('pagebeforecreate','#reservationDate',function(e) { 
    app._loadingShow(); 
}).on('pageinit','#reservationDate',function(e) { 
    app._footerShow('reservationDate.html',this.id);
    var page=$(this);
    var pageData=page.data("url");
    var com_id=app._getUrlParameters(pageData, 'paremeter');
    var day=app._getUrlParameters(pageData, 'd');
    var pf_id=app._getUrlParameters(pageData, 'pf');
    var start=app._getUrlParameters(pageData, 'start');
    var due=app._getUrlParameters(pageData, 'due');
    var max=app._getUrlParameters(pageData, 'max');
    $.each(JSON.parse(app._getLocalStorage('facilities')).info, function (i, v) {
        if(v.pf_id==pf_id){
           page.find('#pf_name').text(v.pf_name);
           page.find('.open-time span:eq(0)').text(v.open_day);
            page.find('.open-time span:eq(1)').text(v.start !='' ? v.start.substring(0,5) +'~'+ v.due.substring(0,5):'全天候開放');
        }
    });
    page.find('#pf_week').text(day +' '+app._getWeekDay(day));  
    page.on('click', '#header a:eq(0)', function () {
        _mobile.changePage("reservation.html", { changeHash: true,reverse:true, data:{'paremeter':com_id}}); 
    }).on('click','#calendar',function(){
        _facCom=com_id;
        _facPf=pf_id;
        _facTime=start +'_'+ due;
         var options = {
            date: new Date(app._getFormatDate(page.find('#pf_week').text().split(' ')[0])),
            mode: 'date',
            androidTheme:4
        };
        datePicker.show(options, app._onPickerGetToday);       
    }).on('click', 'input[type=checkbox]', function () {   
        var exh = page.find('#' + this.id.replace('chk_h', 'exh')).val();
        var ex =  page.find('#' + this.id.replace('chk_h', 'ex') + '');
        var count = page.find('#' + this.id.replace('chk', 'count') + '');
        var sp = page.find('#' + this.id.replace('h_', '') + ' span');

        if ($(this).is(":checked") != true) {
            var config=new Object();
            config.title='請選擇預約人數';
            config.items=new Array();
            for(var i=0;i<=exh;i++){
                var item=new Object();
                item.text= i != 0 ? i+ '人':'取消預約';
                item.value= i != 0 ? i : 'cancel';
                config.items.push(item); 
            }

            window.plugins.listpicker.showPicker(config, 
                $.proxy(function(item) { 
                    if(item=='cancel'){
                        $(this).prop('checked', false);
                        sp.html('可約');
                        ex.text(exh);
                        if(page.find('input[name^=chk_h]:checked').length==0){
                            page.find('#header a:eq(1) span').removeClass('submit');
                        }
                    }else{
                        $(this).prop('checked', true);
                        count.val(item);
                        sp.html(item +'人');
                        ex.text(parseInt(exh)-parseInt(item));
                    }
                },this),
                $.proxy(function() { 
                    $(this).prop('checked', true);
                },this)
            );
        } else {
            $(this).prop('checked', true);
            ex.text(parseInt(exh)-1);
            count.val('1');
            sp.html('1人');
            page.find('#header a:eq(1) span').addClass('submit');
        }
    }).on('click','#save_btn',function(){
        var val=parseInt(start);
        var pros=new Object();
        pros.com_id= com_id;
        pros.pf_id= pf_id;
        pros.day= page.find('#pf_week').text().split(' ')[0];
        pros.sn = app._getLocalStorageJson('code');
        pros.items=new Array();
        while(val < parseInt(due)){    
            if (page.find('#chk_h_' + val).is(":checked") == true) {
                var obj=new Object();
                obj.checktime=page.find('#chk_h_'+val).val();
                obj.people=page.find('#count_h_'+val).val();
                pros.items.push(obj);
            }
            if(val%100==0){
                val+=30;
            }else{
                val+=70;
            }
        }
        if(pros.items.length>0){
            app._loadingShow();
         setTimeout(function(){app._insertReservation(JSON.stringify(pros),com_id);},500);
            
        }else{
            app._dialog('請選擇預約時間與人數!');
            $('#reservationDate').find('#header a:eq(1) span').removeClass('submit');
            return false;
        }  
    });
    
    var _showTab = 0;
    var $defaultDi = page.find('div.navbar ul li a').eq(_showTab).addClass('active');  
    page.find($defaultDi.attr('href')).siblings().hide();
    page.find('div.navbar ul li a:not(.out)').click(function () {
        var $this = $(this),
        _clickTab = $this.attr('href');
        if(this.id=='ambtn'){
                $this.addClass('active');
                page.find('#pmbtn').removeClass('active');
            }else{
                $this.addClass('active');
                page.find('#ambtn').removeClass('active');
            }       
        $(_clickTab).stop(false, true).fadeIn().siblings().hide();
        return false;
    });
}).on('pagebeforehide','#reservationDate',function(e) { 
    app._loadingShow();
}).on('pageshow','#reservationDate',function(e) { 
    var page=$(this);
    var pageData=page.data("url");
    var com_id=app._getUrlParameters(pageData, 'paremeter');
    var pf_id=app._getUrlParameters(pageData, 'pf');
    var day=app._getUrlParameters(pageData, 'd');
    var start=app._getUrlParameters(pageData, 'start');
    var due=app._getUrlParameters(pageData, 'due');
    var maximum=app._getUrlParameters(pageData, 'max');
    var rule=app._getUrlParameters(pageData, 'rule');
    var max=maximum;
    var val;
    if(start.substring(0,1)=='0'){
        val=parseInt(start.substring(1,start.length));
    }else{
        val=parseInt(start);
    }
    var people;
    var pros=new Object();
    pros.pf_id=pf_id;
    pros.date=day;
    $.ajax({
        dataType:'json',
        url: app._getWebServiceMethod('getReservationInfo'),
        type: 'post',
        data: { jsonVal:JSON.stringify(pros) },
        async: true,
        complete:function(){},
        success: function (datas) {
            people=datas;    
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
                max=maximum;
                $.each(people,function(i,v){
                    if(start==v.time){
                        max= max-v.count;     
                    }
                });
                start= String(start).substring(0,2);
                var s= val % 100 == 0 ? 30:70;
                app._reservationList(start,val,max,s,day);
                val+=s;
             }
             if(page.find('#am .h li').length==0){
                page.find('#am .h').hide();
                page.find('#am .empty').show();
             }
             if(page.find('#pm .h li').length==0){
                page.find('#pm .h').hide();
                page.find('#pm .empty').show();
             }
             app._loadingHide(500);
        }
    });
 app._ga_trackView('reservationDate','');
}).on('pageinit','#reservationD2',function(e){
  app._loadingShow();
  var res_jq=$(this);
  var res=this;
  var com_id=app._getUrlParameters(res_jq.data("url"), 'paremeter');
  var pf_id=app._getUrlParameters(res_jq.data("url"), 'next');
  var tempStart;
  var tempDue;
  var tempPeople;
  var tempHour=1;

  res_jq.on('click','#startBtn,#dueBtn',function(){  
      var reload=tempStart== undefined || tempStart ==res.querySelector('#hiddenStart').value ? 'no' :'yes';
      tempPeople=res.querySelector('#hiddenPeople').value;
      tempStart=res.querySelector('#hiddenStart').value;
      res.querySelector('#res_start2').innerText=tempStart;
      res.querySelectorAll('.timeConfirm span')[0].innerText=tempStart; 
      
      if(tempStart !=''){     
        res.querySelector('.reservationD2-content').style.height=_tmpHeight-res.querySelector('#header').offsetHeight-res.querySelector('#footer').offsetHeight+'px';
        document.addEventListener("backbutton", _onBackPageV2resDateV2, false);
        if(reload=='yes'){
            $.each(_restimeInfo, function (idx, val) {      
              if(val.timeStr==tempStart){
                  res.querySelector('.endTime').innerHTML='';
                  for(var j=0;j<val.endTime.length;j++){
                      _div=document.createElement('div');
                      _div.className='option';
                      _val=document.createElement('input');
                      _val.type='hidden';
                      _val.value= val.endTime[j].timeStr;
                      _div.appendChild(_val);   
                      _val=document.createElement('input');
                      _val.type='hidden';
                      _val.value= val.endTime[j].people;
                      _div.appendChild(_val);          
                      _p=document.createElement('p');
                      _p.className='clockTime';
                      _p.innerText=val.endTime[j].timeStr;
                      _div.appendChild(_p);
                      _p=document.createElement('p');
                      _p.className='surplus';
                      if(val.people>0){
                        _p.innerHTML='剩餘<span>'+ val.endTime[j].people; +'</span>位';
                      }else{
                        _div.className='option numberFull';
                        _p.innerText='已額滿';
                      }
                      _div.appendChild(_p);                 
                      res.querySelector('.endTime').appendChild(_div);
                  }
              }
          });        
        }
        tempDue=res.querySelector('#hiddenEnd').value;
        res.querySelector('#res_due2').innerText=tempDue;
        res.querySelectorAll('.timeConfirm span')[1].innerText=tempDue; 
        res.querySelector('.overlay').style.display='block';
        res.querySelector('.selectTimeModal').style.display='block';
        res_jq.find('.active').removeClass('active');
        if(this.id=='startBtn'){
          res.querySelector('.selectArrow').className='selectArrow startActive';
          res_jq.find('.startWrap,.startTime').addClass('active');
          res_jq.find('.startTime').show().siblings().hide();
          for(var i=0;i<res.querySelectorAll('.startTime div.option').length;i++){
              res.querySelectorAll('.startTime div.option')[i].className='option';
              if(tempStart==res.querySelectorAll('.startTime div.option')[i].querySelector('input').value){
                res.querySelectorAll('.startTime div.option')[i].className='option selected';
              }
          }
        }else{
                res.querySelector('.selectArrow').className='selectArrow endActive';
                res_jq.find('.endWrap,.endTime').addClass('active');
                res_jq.find('.endTime').show().siblings().hide();
                res.querySelector('#res_due2').innerText=tempDue;
                res.querySelectorAll('.timeConfirm span')[1].innerText=tempDue; 
          for(var i=0;i<res.querySelectorAll('.endTime div.option').length;i++){
              res.querySelectorAll('.endTime div.option')[i].className='option';                
              if(tempDue==res.querySelectorAll('.endTime div.option')[i].querySelector('input').value){
                res.querySelectorAll('.endTime div.option')[i].className='option selected';
                res.querySelector('.timeConfirm').className='timeConfirm active';
              }
          }    

        }
      }
   
   }).on('click','#header a',function(){  
   _mobile.changePage('reservationDetail.html', { changeHash: true,reverse:true, data:{'paremeter':com_id,'next':pf_id} });
  }).on('click','#footer',function(){  
    var footerBtn=this.querySelector('p');
    if(footerBtn.innerText=='確定預約'){
      footerBtn.innerText='預約中...';
      var start=res.querySelector('#res_start').innerText.split(':');
      var due=res.querySelector('#res_due').innerText.split(':');
      var obj=new Object();
      obj.com_id=com_id;
      obj.tablet_id=res.querySelector('#hiddenTablet').value;
      obj.pf_id=pf_id;
      obj.code=app._getLocalStorageJson('code');
      obj.day=res.querySelector('#hiddenDay').value;
      obj.start_hour=parseInt(start[0]);
      obj.start_min=parseInt(start[1]);
      obj.due_hour=parseInt(due[0]);
      obj.due_min=parseInt(due[1]);
      obj.user=parseInt(res.querySelector('#hiddenUser').value);
      /*日曆資訊*/
      var todayS=new Date(res.querySelector('#hiddenDay').value+' '+res.querySelector('#res_start').innerText);
      var todayD;
      if(res.querySelector('#res_due').innerText=='24:00'){
        todayD=new Date(res.querySelector('#hiddenDay').value+' 23:59'); 
      }else{
        todayD=new Date(res.querySelector('#hiddenDay').value+' '+res.querySelector('#res_due').innerText);       
      }
      var desc='預約戶別：'+ res.querySelector('#tablet_note').innerText +'。\n';
      var c_point=parseInt(res.querySelector('#this_point').innerText);
      var f_point=parseInt(res.querySelector('#f_point').innerText);
      if(c_point==0){
        desc+='【本公設免扣點】';
      }else{
        desc+=res.querySelector('.pointBtn').innerText='採入場扣點制' ? '【入場扣點制】':'【預約扣點制】';
        if(res.querySelector('.pointBtn').innerText='採入場扣點制'){
          desc+='\n本次使用點數'+c_point+'點。';
          if(f_point <0){
            desc+='\n(提醒您，您目前的點數不足本次使用點數，請至管理室辦理儲值點數)'
          }
        }else{
          desc+='\n本次使用點數'+c_point+'點。';
        }
        desc+='\n使用後剩餘點數'+f_point+'點。';
        desc+='\n(點數資料以社區實際登記為主)';
      }
       /*日曆資訊*/      
      if(parseInt(res.querySelector('#f_point').innerText) < 0){
        navigator.notification.confirm(
            '提醒您，您的點數不足，是否仍要預約？',
            function (idx) {
                if(idx==1){
                    app._sendReservation(JSON.stringify(obj),function(datas){
                      if(datas.status=='success'){

                         navigator.notification.confirm(
                            '您已完成預約'+ res.querySelector('h2').innerText + '，請記得準時前往。\n\n是否加入個人行事曆?',
                            function (idx) {
                                if(idx==1){
                                   window.plugins.calendar.createEvent(
                                    '今網行動管家_公設預約提醒',
                                    res.querySelector('h2').innerText,
                                    '預約人數：'+ res.querySelector('#hiddenUser').value +'人。\n'+desc+'\n今網行動管家團隊關心您',
                                    todayS,
                                    todayD,function(){},function(){}
                                  );
                                  _mobile.changePage('reservationHistory_v2.html', { changeHash: true,reverse:true, data:{'paremeter':com_id} }); 
                                }else{
                                  _mobile.changePage('reservationHistory_v2.html', { changeHash: true,reverse:true, data:{'paremeter':com_id} });         
                                }
                            },
                            '預約成功',
                            ['加入行事曆','不需要']
                        );
                        /*
                        navigator.notification.alert(
                            '您已完成預約'+ res.querySelector('h2').innerText + '，請記得準時前往。',
                             // '您已完成預約'+ res.querySelector('h2').innerText + ' ' +obj.day+' '+ res.querySelector('#res_start').innerText +'至'+ res.querySelector('#res_due').innerText +'，記得準時前往。',
                             function () {
                                window.plugins.calendar.createEvent(
                                  '今網行動管家_公設預約提醒',
                                  res.querySelector('h2').innerText,
                                  '預約人數：'+ res.querySelector('#hiddenUser').value +'人。\n'+desc+'\n今網行動管家團隊關心您',
                                  todayS,
                                  todayD,function(){},function(){}
                                );
                                _mobile.changePage('reservationHistory_v2.html', { changeHash: true,reverse:true, data:{'paremeter':com_id} });         
                             },
                             '預約成功',
                             '確認'
                        );
                        */
                      }else{
                            footerBtn.innerText='確定預約';
                            app._dialog(datas.msg);
                            _mobile.changePage('reservationDetail.html', { changeHash: true,reverse:true, data:{'paremeter':com_id,'next':pf_id} });
                      }
                    });
                }else{
                  footerBtn.innerText='確定預約';
                  app._loadingHide();
                }
             },
             '確定預約',
             ['預約','稍候']
        );
      }else{
         app._sendReservation(JSON.stringify(obj),function(datas){
            if(datas.status=='success'){
                navigator.notification.confirm(
                    '您已完成預約'+ res.querySelector('h2').innerText + '，請記得準時前往。\n\n是否加入個人行事曆?',
                    function (idx) {
                        if(idx==1){
                           window.plugins.calendar.createEvent(
                            '今網行動管家_公設預約提醒',
                            res.querySelector('h2').innerText,
                            '預約人數：'+ res.querySelector('#hiddenUser').value +'人。\n'+desc+'\n今網行動管家團隊關心您',
                            todayS,
                            todayD,function(){},function(){}
                          );
                          _mobile.changePage('reservationHistory_v2.html', { changeHash: true,reverse:true, data:{'paremeter':com_id} }); 
                        }else{
                          _mobile.changePage('reservationHistory_v2.html', { changeHash: true,reverse:true, data:{'paremeter':com_id} });         
                        }
                    },
                    '預約成功',
                    ['加入行事曆','不需要']
                );

                /*
                 navigator.notification.alert(
                     '您已完成預約'+ res.querySelector('h2').innerText + '，請記得準時前往。',
                     // '您於'+obj.day+' '+ res.querySelector('#res_start').innerText +'至'+ res.querySelector('#res_due').innerText +'預約'+ res.querySelector('h2').innerText +'，記得準時前往。',
                     function () {
                        window.plugins.calendar.createEvent(
                          '今網行動管家_公設預約提醒',
                          res.querySelector('h2').innerText,
                          '預約人數：'+ res.querySelector('#hiddenUser').value +'人。\n'+desc+'\n\n\n今網行動管家團隊關心您',
                          todayS,
                          todayD,function(){},function(){}
                        );
                        footerBtn.innerText='確定預約';
                        _mobile.changePage('reservationHistory_v2.html', { changeHash: true,reverse:true, data:{'paremeter':com_id} });         
                     },
                     '預約成功',
                     '確認'
                );
                */
            }else{
                app._dialog(datas.msg);
                _mobile.changePage('reservationDetail.html', { changeHash: true,reverse:true, data:{'paremeter':com_id,'next':pf_id} });
            }
         });
      }
      
    }
    

  }).on('click','.startWrap',function(){
      res_jq.find('.active').removeClass('active');
      res.querySelector('.selectArrow').className='selectArrow startActive';
      res_jq.find('.startWrap,.startTime').addClass('active');
      res_jq.find('.startTime').show().siblings().hide();
  }).on('click','.endWrap',function(){
        res_jq.find('.active').removeClass('active');
        res.querySelector('.selectArrow').className='selectArrow endActive';
        res_jq.find('.endWrap,.endTime').addClass('active');
        res_jq.find('.endTime').show().siblings().hide();
        for(var i=0;i<res.querySelectorAll('.endTime div.option').length;i++){
              res.querySelectorAll('.endTime div.option')[i].className='option';  
               if(tempDue==res.querySelectorAll('.endTime div.option')[i].querySelector('input').value){
                res.querySelectorAll('.endTime div.option')[i].className='option selected';
                  res.querySelector('.timeConfirm').className='timeConfirm active';
              }
        }
  }).on('click','.startTime div.option',function(){
      tempDue=0;
      tempPeople=0;
      var st=this.querySelector('input').value;
      res_jq.find('.startTime div').removeClass('selected');
      this.className='option selected';
      res.querySelectorAll('.timeConfirm span')[0].innerText=st;  
      res.querySelector('#res_start2').innerText=st;
      res.querySelector('#res_due2').innerText='請選擇';

      tempStart=st;
      $.each(_restimeInfo, function (idx, val) {      
          if(val.timeStr==st){
              res.querySelector('.endTime').innerHTML='';
              if(val.endTime.length==1){
                  res.querySelectorAll('.timeConfirm span')[1].innerText=val.endTime[0].timeStr;
                  tempDue=val.endTime[0].timeStr;
                  tempPeople=val.endTime[0].people;
                  res.querySelector('#res_due2').innerText=val.endTime[0].timeStr;
                  res.querySelectorAll('.timeConfirm span')[1].innerText=val.endTime[0].timeStr;  
              } 
              for(var j=0;j<val.endTime.length;j++){
                  _div=document.createElement('div');
                  _div.className= val.endTime.length==1 ? 'option selected' : 'option';
                  _val=document.createElement('input');
                  _val.type='hidden';
                  _val.value= val.endTime[j].timeStr;
                  _div.appendChild(_val);   
                  _val=document.createElement('input');
                  _val.type='hidden';
                  _val.value= val.endTime[j].people;
                  _div.appendChild(_val);          
                  _p=document.createElement('p');
                  _p.className='clockTime';
                  _p.innerText=val.endTime[j].timeStr;
                  _div.appendChild(_p);
                  _p=document.createElement('p');
                  _p.className='surplus';
                  if(val.people>0){
                    _p.innerHTML='剩餘<span>'+ val.endTime[j].people; +'</span>位';
                  }else{
                    _div.className='option numberFull';
                    _p.innerText='已額滿';
                  }
                  _div.appendChild(_p);                 
                  res.querySelector('.endTime').appendChild(_div);
              }
              setTimeout(function(){
                res_jq.find('.active').removeClass('active');
                res.querySelector('.selectArrow').className='selectArrow endActive';
                res_jq.find('.endWrap,.endTime').addClass('active');
                res_jq.find('.endTime').show().siblings().hide();
                if(val.endTime.length==1){
                    res.querySelector('.timeConfirm').className='timeConfirm active';
                }
              },300);
          }
      });
  }).on('click','#res_date',function(){

      var options = {
          date: new Date(res.querySelector('#hiddenDay').value),
          mode: 'date',
          androidTheme:4
      };
      datePicker.show(options, function(date){
         var d;
         var dayopen;
         if(date == undefined){
              d=encodeURI(app._getTimeZone());
         }else{
              d=encodeURI(date.getFullYear() +'-'+ (date.getMonth()+1) +'-'+ date.getDate());
         }
        if ((Date.parse(d)).valueOf() >= (Date.parse(app._getTimeZone())).valueOf()){         
           $.each(JSON.parse(app._getLocalStorage('facilities')), function (i, v) {
                if(v.pf_id==pf_id){
                    switch(app._getWeekDay(d)){
                      case '星期一':
                        dayopen=v.w_mon;
                      break;
                      case '星期二':
                        dayopen=v.w_tue;
                      break;
                      case '星期三':
                        dayopen=v.w_wed;
                      break;
                      case '星期四':
                        dayopen=v.w_thu;
                      break;
                      case '星期五':
                        dayopen=v.w_fri;
                      break;
                      case '星期六':
                        dayopen=v.w_sat;
                      break;
                      case '星期日':
                        dayopen=v.w_sun;
                      break;
                    }
                }
           });
           if(dayopen=='none'){
            app._dialog(d+'('+app._getWeekDay(d)+')未開放');
           }else{
              app._getReservationInfo(pf_id,d,function(datas){
              res.querySelector('#res_date').innerHTML=app._getTimeZoneCH(d)+' <span>'+ app._getWeekDay(d) +'</span>';   
              res.querySelector('#hiddenDay').value=d;
              _restimeInfo=datas;
              var sumPoint;
              var totalPoint;
              tempHour=datas.length==0 ? 0 : 1;
              if(res.querySelector('#peopleBtn span').innerText=='0' && tempHour==1){
                  res.querySelector('#peopleBtn span').innerText='1';
                  res.querySelector('#hiddenUser').value='1';
              }
              switch(res.querySelector('#hiddenPointRule').value){
                //不扣點、以戶扣點
                case '0':
                case '1':
                  sumPoint=res.querySelector('#hiddenPoint').value;              
                break;
                //戶數時*時數
                case '2':
                  sumPoint=res.querySelector('#hiddenPoint').value*tempHour;
                break;
                //人數*點數        
                case '3':
                 sumPoint=res.querySelector('#hiddenPoint').value*res.querySelector('#hiddenUser').value;
                break;
                case '4':
                  sumPoint=res.querySelector('#hiddenPoint').value* tempHour *res.querySelector('#hiddenUser').value;
                break;
              }
              res_jq.find('.lihour').text(tempHour);
              res_jq.find('.liuser').text(res.querySelector('#hiddenUser').value);
              res_jq.find('.lisum').text(sumPoint);
              totalPoint=parseInt(res.querySelector('#my_point').innerText)-sumPoint;
              res.querySelector('#this_point').innerText=sumPoint;
              res.querySelector('#f_point').innerText=totalPoint;

              if(totalPoint < 0){
                 res.querySelector('#f_point').className='point none';
                if(res.querySelector('#hiddenImmed').value=='1'){
                  res.querySelector('#footer').className='none-reservation';
                  res.querySelector('#footer p').innerText='點數不足無法預約';
                }else{
                  res.querySelector('#footer').className='';
                  res.querySelector('#footer p').innerText='確定預約';
                }  
              }else{
                res.querySelector('#f_point').className='point';
                res.querySelector('#footer').className='';
                res.querySelector('#footer p').innerText='確定預約';
              }

                  if(datas.length==0){

                    res.querySelector('#hiddenStart').value='';
                     res.querySelector('#res_start').innerText="無時段";
                     res.querySelector('#res_due').innerText="無時段";
                     res.querySelector('#peopleBtn span').innerText='0';
                     res.querySelector('#f_point').innerText=res.querySelector('#my_point').innerText;
                     res.querySelector('#this_point').innerText='0';
                     res.querySelector('#footer').className='none-reservation';
                     res.querySelector('#footer p').innerText='今日已無可預約時段';
                     res.querySelector('#hiddenPeople').value='0';
                  }else{
                   
                  $.each(datas, function (idx, val) {

                      if(idx==0){
                        res.querySelector('.startTime').innerHTML='';
                        res.querySelector('#hiddenStart').value=val.timeStr;
                        res.querySelector('#hiddenEnd').value=val.endTime[0].timeStr;
                        res.querySelector('#res_start').innerText=val.timeStr;
                        res.querySelectorAll('.timeConfirm span')[0].innerText=val.timeStr;
                        res.querySelectorAll('.timeConfirm span')[1].innerText=val.endTime[0].timeStr;
                        res.querySelector('#res_due').innerText=val.endTime[0].timeStr;
                        res.querySelector('#res_start2').innerText=val.timeStr;
                        res.querySelector('#res_due2').innerText=val.endTime[0].timeStr;
                        /*初始化結束時間*/
                        for(var j=0;j<val.endTime.length;j++){
                          if(j==0){
                            res.querySelector('#hiddenPeople').value=val.endTime[j].people;
                            res.querySelector('.endTime').innerHTML='';
                          }
                          _div=document.createElement('div');
                          _div.className= j==0 ? 'option selected':'option';  
                          _val=document.createElement('input');
                          _val.type='hidden';
                          _val.value= val.endTime[j].timeStr;
                          _div.appendChild(_val);  
                          _val=document.createElement('input');
                          _val.type='hidden';
                          _val.value= val.endTime[j].people;
                          _div.appendChild(_val);         
                          _p=document.createElement('p');
                          _p.className='clockTime';
                          _p.innerText=val.endTime[j].timeStr;
                          _div.appendChild(_p);
                          _p=document.createElement('p');
                          _p.className='surplus';
                          if(val.people>0){
                            _p.innerHTML='剩餘<span>'+ val.endTime[j].people; +'</span>位';
                          }else{
                            _div.className='option numberFull';
                            _p.innerText='已額滿';
                          }
                          _div.appendChild(_p);
                            res.querySelector('.endTime').appendChild(_div);
                        }

                         /*初始化結束時間*/
                      }
                      /*初始化起始時間*/
                      _div=document.createElement('div');
                      _div.className= idx==0 ? 'option selected':'option'; 
                      _val=document.createElement('input');
                      _val.type='hidden';
                      _val.value= val.timeStr;
                      _div.appendChild(_val);       
                      _p=document.createElement('p');
                      _p.className='clockTime';
                      _p.innerText=val.timeStr;
                      _div.appendChild(_p);
                      _p=document.createElement('p');
                      _p.className='surplus';
                      if(val.people>0){
                        _p.innerHTML='剩餘<span>'+ val.people +'</span>位';
                      }else{
                        _div.className='option numberFull';
                        _p.innerText='已額滿';
                      }
                      _div.appendChild(_p);
                      res.querySelector('.startTime').appendChild(_div);
                      /*初始化起始時間*/
                   
                  });
                    
                  }
              });
           } 
        }else{
            app._dialog('請選擇正確認日期');
        }
      });
    
  }).on('click','.confirmBtn',function(){
    document.removeEventListener("backbutton", _onBackPageV2resDateV2, false);
    res.querySelector('.reservationD2-content').style.height=tempHeigh+'px';
      if(tempDue!=0 && tempPeople!=0){
      if(parseInt(res.querySelector('#hiddenUser').value) > tempPeople){
          res.querySelector('#hiddenUser').value='1';
          res.querySelector('#peopleBtn span').innerText='1';
      }
      var sumPoint;
      var totalPoint;
      switch(res.querySelector('#hiddenPointRule').value){
        //不扣點、以戶扣點
        case '0':
        case '1':
          sumPoint=res.querySelector('#hiddenPoint').value;
      
        break;
        //戶數時*時數
        case '2':
          sumPoint=res.querySelector('#hiddenPoint').value*tempHour;
        break;
        //人數*點數        
        case '3':
         sumPoint=res.querySelector('#hiddenPoint').value*res.querySelector('#hiddenUser').value;
        break;
        case '4':
          sumPoint=res.querySelector('#hiddenPoint').value* tempHour *res.querySelector('#hiddenUser').value;
        break;
      }
      res_jq.find('.lihour').text(tempHour);
      res_jq.find('.liuser').text(res.querySelector('#hiddenUser').value);    
      totalPoint=parseInt(res.querySelector('#my_point').innerText)-sumPoint;
      res.querySelector('#this_point').innerText=sumPoint;
      res.querySelector('#f_point').innerText=totalPoint;
      res_jq.find('.lisum').text(sumPoint);
      res.querySelector('#hiddenStart').value=tempStart;
      res.querySelector('#hiddenPeople').value=tempPeople;
      res.querySelector('#hiddenEnd').value=tempDue;
      res.querySelector('#res_start').innerText=tempStart;
      res.querySelector('#res_due').innerText=tempDue;

        if(totalPoint < 0){
           res.querySelector('#f_point').className='point none';
          if(res.querySelector('#hiddenImmed').value=='1'){
            res.querySelector('#footer').className='none-reservation';
            res.querySelector('#footer p').innerText='點數不足無法預約';
          }else{
             res.querySelector('#footer').className='';
            res.querySelector('#footer p').innerText='確定預約';
          }  
        }else{
          res.querySelector('#f_point').className='point';
          res.querySelector('#footer').className='';
          res.querySelector('#footer p').innerText='確定預約';
        }

       setTimeout(function(){
        res.querySelector('.overlay').style.display='none';
        res.querySelector('.selectTimeModal').style.display='none';
      },200);

        }
  
    }).on('click','.icon-questions-circular',function(){
      if(res.querySelector('.yellow-tips').className=='yellow-tips close'){
        res.querySelector('.yellow-tips').className='yellow-tips open';
      }else{
        res.querySelector('.yellow-tips').className='yellow-tips close';
      }
      
  }).on('click','.overlay',function(){
      document.removeEventListener("backbutton", _onBackPageV2resDateV2, false);
     res.querySelector('.reservationD2-content').style.height=tempHeigh+'px';
     setTimeout(function(){
        res.querySelector('.overlay').style.display='none';
        res.querySelector('.selectTimeModal').style.display='none';
      },200);
  }).on('click','.endTime div.option',function(){
      tempHour=$(this).index()+1;
      res_jq.find('.endTime div').removeClass('selected');
      this.className='option selected';   
      tempDue=this.querySelectorAll('input')[0].value;
      tempPeople=this.querySelectorAll('input')[1].value;
      res.querySelector('#res_due2').innerText=this.querySelectorAll('input')[0].value;
      res.querySelectorAll('.timeConfirm span')[0].innerText=tempStart;
      res.querySelectorAll('.timeConfirm span')[1].innerText=this.querySelectorAll('input')[0].value;  
      res.querySelector('.timeConfirm').className='timeConfirm active';
   }).on('click','#peopleBtn',function(){
      if(tempStart !=''){


        var val=this.querySelector('span');
        var config=new Object();
        config.title='請選擇預約人數';
        config.selectedValue=res.querySelector('#hiddenUser').value;
        config.items=new Array();
        for(var i=1;i<=res.querySelector('#hiddenPeople').value;i++){
            var item=new Object();
            item.text= i+ '人';
            item.value= i ;
            config.items.push(item); 
        }
        window.plugins.listpicker.showPicker(config, 
            function(item) { 
              res.querySelector('#hiddenUser').value=item;  
              val.innerText=item;
              var sumPoint;
              var totalPoint;
              switch(res.querySelector('#hiddenPointRule').value){
                //不扣點、以戶扣點
                case '0':
                case '1':
                  sumPoint=res.querySelector('#hiddenPoint').value;
              
                break;
                //戶數時*時數
                case '2':
                  sumPoint=res.querySelector('#hiddenPoint').value*tempHour;
                break;
                //人數*點數        
                case '3':
                 sumPoint=res.querySelector('#hiddenPoint').value*res.querySelector('#hiddenUser').value;
                break;
                case '4':
                  sumPoint=res.querySelector('#hiddenPoint').value* tempHour *res.querySelector('#hiddenUser').value;
                break;
              }
              res_jq.find('.lihour').text(tempHour);
              res_jq.find('.liuser').text(item);

              totalPoint=parseInt(res.querySelector('#my_point').innerText)-sumPoint;
              res.querySelector('#this_point').innerText=sumPoint;
              res.querySelector('#f_point').innerText=totalPoint;
              res_jq.find('.lisum').text(sumPoint);
              if(totalPoint < 0){
                 res.querySelector('#f_point').className='point none';
                if(res.querySelector('#hiddenImmed').value=='1'){
                  res.querySelector('#footer').className='none-reservation';
                  res.querySelector('#footer p').innerText='點數不足無法預約';
                }else{
                   res.querySelector('#footer').className='';
                  res.querySelector('#footer p').innerText='確定預約';
                }  
              }else{
                res.querySelector('#f_point').className='point';
                res.querySelector('#footer').className='';
                res.querySelector('#footer p').innerText='確定預約';
              }
            },
            function() { 
                
            }
        );
 }
  });
}).on('pageshow','#reservationD2',function(e){
   var res=this;
   var res_jq=$(this);
   var com_id=app._getUrlParameters(res_jq.data("url"), 'paremeter');
   var pf_id=app._getUrlParameters(res_jq.data("url"), 'next');
   var date=app._getUrlParameters(res_jq.data("url"), 'par2');
   var config;
   res_jq.on('click','#tablet_note',function(){
      config.selectedValue=res.querySelector('#tablet_note').innerText+';'+res.querySelector('#hiddenTablet').value+';'+ res.querySelector('#my_point').innerText;
        window.plugins.listpicker.showPicker(config, 
            function(item) { 
              res.querySelector('#hiddenTablet').value=item.split(';')[1];
              res.querySelector('#tablet_note').innerText=item.split(';')[0];
              res.querySelector('#my_point').innerText=item.split(';')[2];
              res.querySelector('#f_point').innerText=item.split(';')[2]-parseInt(res.querySelector('#this_point').innerText);
              if(res.querySelector('#res_start').innerText!='無時段'){

              if(item.split(';')[2]-parseInt(res.querySelector('#this_point').innerText) <0){
                res.querySelector('#f_point').className='point none';
                if(res.querySelector('#hiddenImmed').value=='1'){
                  res.querySelector('#footer').className='none-reservation';
                  res.querySelector('#footer p').innerText='點數不足無法預約';
                }else{
                   res.querySelector('#footer').className='';
                  res.querySelector('#footer p').innerText='確定預約';
                }  
              }else{
                  res.querySelector('#f_point').className='point';
                   res.querySelector('#footer').className='';
                  res.querySelector('#footer p').innerText='確定預約';
              }

              }
            },function(){});
   });
   var _div;
   var _p;
   var _val;
   var ruleDom;
    $.each(JSON.parse(app._getLocalStorage('facilities')), function (i, v) {
        if(v.pf_id==pf_id){
          if(v.point==0){
            res.querySelector('.pointCompute').style.display='none';
          }
          res.querySelector('#this_point').innerText=v.point;
          res.querySelector('#hiddenPoint').value=v.point;
          res.querySelector('#hiddenPointRule').value=v.res_pointRule;
          res.querySelector('.pointBtn').innerText=v.immed_point=='1' ? '採預約扣點制' : '採入場扣點制' ;
          res.querySelector('#hiddenImmed').value = v.immed_point;
          res.querySelector('h2').innerText =v.pf_name;
          res.querySelector('.facilityImg').className='facilityImg icon-r-'+ app._getFacilitiesType(v.pf_type);
          res.querySelector('#res_date').innerHTML=app._getTimeZoneCH(date)+' <span>'+ app._getWeekDay(date) +'</span>';            
          res.querySelector('#hiddenDay').value=date;
        /*公設扣點規則*/
          ruleDom='<span style="display:block;font-weight:700;">使用點數計算方式：</span>';
          switch(v.res_pointRule){
                case '2':
                  ruleDom+='<span>'+v.point+'</span>(單次扣點)';
                  ruleDom+='<span class="mark">x</span>';
                  ruleDom+='<span class="lihour">1</span>(時數)';
                break;     
                case '3':
                  ruleDom+='<span>'+v.point+'</span>(單次扣點)';
                  ruleDom+='<span class="mark">x</span>';
                  ruleDom+='<span class="liuser">1</span>(人數)';
                break;
                case '4':
                  ruleDom+='<span>'+v.point+'</span>(單次扣點)';
                  ruleDom+='<span class="mark">x</span>';
                  ruleDom+='<span class="liuser">1</span>(人數)';
                  ruleDom+='<span class="mark">x</span>';
                  ruleDom+='<span class="lihour">1</span>(時數)';
                break;
                default:
                  res.querySelector('.icon-questions-circular').style.display='none';
                break;
         }
          ruleDom+='<span class="mark">=</span><span class="lisum">'+ v.point +'</span>點';
         res.querySelector('#pointRule').innerHTML=ruleDom;
          app._getTabletAndPointList(com_id,function(datas){
              res.querySelector('#hiddenTablet').value=datas[0].tablet_id;
              res.querySelector('#tablet_note').innerText=datas[0].tablet_note;
              res.querySelector('#my_point').innerText=datas[0].point;
              res.querySelector('#f_point').innerText=datas[0].point - v.point;
              if(datas[0].point - v.point < 0){
                res.querySelector('#f_point').className='point none';
                if(v.immed_point=='1'){
                  res.querySelector('#footer').className='none-reservation';
                  res.querySelector('#footer p').innerText='點數不足無法預約';
                }              
              }
              if(datas.length >1){
                  res.querySelector('.only').className='option';
                  config=new Object();
                  config.title='請選擇戶號';
                  config.selectedValue=datas[0].tablet_id;
                  config.items=new Array();
                  for(var i=0;i< datas.length;i++){
                      var item=new Object();
                      item.text= datas[i].tablet_note+' [點數：'+ datas[i].point +']';
                      item.value= datas[i].tablet_note+';'+datas[i].tablet_id+';'+ datas[i].point;
                      config.items.push(item); 
                  }
              }
              app._getReservationInfo(pf_id,date,function(datas){
                _restimeInfo=datas;
                if(datas.length==0){
                   res.querySelector('#res_start').innerText="無時段";
                   res.querySelector('#res_due').innerText="無時段";
                   res.querySelector('#peopleBtn span').innerText='0';
                   res.querySelector('#hiddenUser').value='0';
                   res.querySelector('#footer').className='none-reservation';
                   res.querySelector('#footer p').innerText='今日已無可預約時段';
                   res.querySelector('#this_point').innerText='0';
                   res.querySelector('#f_point').innerText=res.querySelector('#my_point').innerText;
                }else{
                   res.querySelector('#hiddenUser').value='1';
                   res.querySelector('#peopleBtn span').innerText='1';
                $.each(datas, function (idx, val) {
                    if(idx==0){
                      res.querySelector('#hiddenStart').value=val.timeStr;
                      res.querySelector('#hiddenEnd').value=val.endTime[0].timeStr;
                      res.querySelector('#res_start').innerText=val.timeStr;
                      res.querySelectorAll('.timeConfirm span')[0].innerText=val.timeStr;
                      res.querySelectorAll('.timeConfirm span')[1].innerText=val.endTime[0].timeStr;
                      res.querySelector('#res_due').innerText=val.endTime[0].timeStr;
                      res.querySelector('#res_start2').innerText=val.timeStr;
                      res.querySelector('#res_due2').innerText=val.endTime[0].timeStr;
                      
                      /*初始化結束時間*/
                      for(var j=0;j<val.endTime.length;j++){
                        if(j==0){
                          res.querySelector('#hiddenPeople').value=val.endTime[j].people;
                        }
                        _div=document.createElement('div');
                        _div.className= j==0 ? 'option selected':'option';  
                        _val=document.createElement('input');
                        _val.type='hidden';
                        _val.value= val.endTime[j].timeStr;
                        _div.appendChild(_val);  
                        _val=document.createElement('input');
                        _val.type='hidden';
                        _val.value= val.endTime[j].people;
                        _div.appendChild(_val);         
                        _p=document.createElement('p');
                        _p.className='clockTime';
                        _p.innerText=val.endTime[j].timeStr;
                        _div.appendChild(_p);
                        _p=document.createElement('p');
                        _p.className='surplus';
                        if(val.people>0){
                          _p.innerHTML='剩餘<span>'+ val.endTime[j].people; +'</span>位';
                        }else{
                          _div.className='option numberFull';
                          _p.innerText='已額滿';
                        }
                        _div.appendChild(_p);
                          res.querySelector('.endTime').appendChild(_div);
                      }

                       /*初始化結束時間*/
                    }
                    /*初始化起始時間*/
                    _div=document.createElement('div');
                    _div.className= idx==0 ? 'option selected':'option'; 
                    _val=document.createElement('input');
                    _val.type='hidden';
                    _val.value= val.timeStr;
                    _div.appendChild(_val);       
                    _p=document.createElement('p');
                    _p.className='clockTime';
                    _p.innerText=val.timeStr;
                    _div.appendChild(_p);
                    _p=document.createElement('p');
                    _p.className='surplus';
                    if(val.people>0){
                      _p.innerHTML='剩餘<span>'+ val.people +'</span>位';
                    }else{
                      _div.className='option numberFull';
                      _p.innerText='已額滿';
                    }
                    _div.appendChild(_p);
                    res.querySelector('.startTime').appendChild(_div);
                    /*初始化起始時間*/
                 
                });
                  
                }
                tempHeigh=res.querySelector('.reservationD2-content').offsetHeight+res.querySelector('#footer').offsetHeight;
                app._loadingHide();
            });
          });
        }
    });
}).on('pagebeforehide','#reservationDetail',function(e){

    document.removeEventListener("backbutton", _onBackPageV2resDetailMain, false);
    temp1='';
}).on('pageinit','#reservationDetail',function(e){

  app._loadingShow();
 var res_jq=$(this);
 var res=this;
 var com_id=app._getUrlParameters(res_jq.data("url"), 'paremeter');
  var pf_id=app._getUrlParameters(res_jq.data("url"), 'next');
  document.addEventListener("backbutton", _onBackPageV2resDetailMain, false);
  temp1=com_id;
  res_jq.on('click','#res_back', function (e) {
      _mobile.changePage('reservation_v2.html', { changeHash: true,reverse:true, data:{'paremeter':com_id} });
  }).on('click','.detailItem:eq(2) .infoCollapseWrap',function(e){ 
    if(this.querySelector('span').innerText!='關閉'){
     this.querySelector('i').className='icon-down-arrow active';
      res.querySelector('.introWrap').style.height=res.querySelector('#descHeight').value+'px';
      this.querySelector('span').innerText='關閉';
    }else{
       this.querySelector('i').className='icon-down-arrow';
   
      res.querySelector('.introWrap').style.height='65px';
      this.querySelector('span').innerText='顯示更多';
    }
      
  }).on('click','#similar div a',function(){
     _mobile.changePage('reservationDetail.html', { changeHash: true, data:{'paremeter': com_id,'next':this.querySelector('input').value} });  
  }).on('click','#heartBtn',function(){
        var val= app._getLocalStorage('resHeart') != null ? JSON.parse(app._getLocalStorage('resHeart')): [];
        var arr=[];
        var check=0;
        if(val.length==0){
          arr.push(pf_id);
        }else{
          for(var i=0;i<val.length;i++){
              if(val[i]!=pf_id){
                arr.push(val[i]);
              }else{
                  check=1;
              }
          }
          if(check==0){
          arr.push(pf_id);
          } 
        }       
        app._setLocalStorage('resHeart',JSON.stringify(arr));
        if(check==1){
           res.querySelector('.copySuccess i').className='icon-heart-nonfull';
           res.querySelector('.copySuccess .txt').innerText='取消常用公設';
           res.querySelector('#heartBtn i').className='icon-heart';
              res.querySelector('#heartBtn i').innerHTML='<span class="path1"></span><span class="path2"></span>';
        }else{
          res.querySelector('.copySuccess i').className='icon-heart-full';
          res.querySelector('.copySuccess .txt').innerText='已加入 常用公設';
        
          res.querySelector('#heartBtn i').className='icon-heart-full';
          res.querySelector('#heartBtn i').innerHTML='';
        }
          res.querySelector('.copySuccess').style.display='block';
          res.querySelector('.favorite').style.display='block';
          setTimeout(function(){
             res.querySelector('.copySuccess').style.display='none';
               res.querySelector('.favorite').style.display='none';
          },1000);

  }).on('click','.timeList',function(){
       document.removeEventListener("backbutton", _onBackPageV2resDetailMain, false);
      document.addEventListener('backbutton',_onBackPageV2resDetail,false);
      res.querySelector('.openTimeWrap').style.display='block';
  }).on('click','.close',function(){

      res.querySelector('.openTimeWrap').style.display='none';
          document.removeEventListener('backbutton',_onBackPageV2resDetail,false);
           document.addEventListener("backbutton", _onBackPageV2resDetailMain, false);
  }).on('click','#toReservation',function(){
      var options = {
          date: new Date(),
          mode: 'date',
          androidTheme:4
      };
      datePicker.show(options, function(date){
         var d;
         var dayopen;
         if(date == undefined){
              d=encodeURI(app._getTimeZone());
         }else{
              d=encodeURI(date.getFullYear() +'-'+ (date.getMonth()+1) +'-'+ date.getDate());
         }
         if ((Date.parse(d)).valueOf() >= (Date.parse(app._getTimeZone())).valueOf()){ 
         $.each(JSON.parse(app._getLocalStorage('facilities')), function (i, v) {
              if(v.pf_id==pf_id){
                  switch(app._getWeekDay(d)){
                    case '星期一':
                      dayopen=v.w_mon;
                    break;
                    case '星期二':
                      dayopen=v.w_tue;
                    break;
                    case '星期三':
                      dayopen=v.w_wed;
                    break;
                    case '星期四':
                      dayopen=v.w_thu;
                    break;
                    case '星期五':
                      dayopen=v.w_fri;
                    break;
                    case '星期六':
                      dayopen=v.w_sat;
                    break;
                    case '星期日':
                      dayopen=v.w_sun;
                    break;
                  }
              }
         });
         if(dayopen=='none'){
          app._dialog(d+'('+app._getWeekDay(d)+')該公設未開放');
         }else{
          _mobile.changePage('reservationDate_v2.html', { changeHash: true, data:{'paremeter': com_id,'next':pf_id,'par2': d} });   
         }  
       }else{
          app._dialog('請選擇正確日期')
       }
      });
      
    });


    $(document).scroll(function () {
       if ($(this).scrollTop() > 125){
        res_jq.find('#header').addClass('active');
       }
       else{
        res_jq.find('#header').removeClass('active');
       }
    });

}).on('pageshow','#reservationDetail',function(e){
 var res_jq=$(this);
 var pf_id=app._getUrlParameters(res_jq.data("url"), 'next');
 var res=this;
 var domSlide='';
 var pf_type;
 $.each(JSON.parse(app._getLocalStorage('facilities')), function (i, v) {
    if(v.pf_id==pf_id){
        pf_type=v.pf_type;
    }
 });
 $.each(JSON.parse(app._getLocalStorage('facilities')), function (i, v) {
      if(v.pf_id==pf_id){
        //我的最愛
        if(app._getLocalStorage('resHeart') !=null){
          var heart=JSON.parse(app._getLocalStorage('resHeart'))
          for(var hi=0;hi<heart.length;hi++)
          {
            if(heart[hi]==pf_id){
             // app._dialog('我的最愛');
             res.querySelector('#heartBtn i').className='icon-heart-full';
              res.querySelector('#heartBtn i').innerHTML='';

              break;
            }
          }
        }
        
        if(v.pf_pic !='' && v.pf_pic !='[]'){
            $.each(JSON.parse(v.pf_pic),function(idx,val){            
                 //var _div = document.createElement("div");
                // _div.className='swiper-slide';
                 //_div.style.backgroundImage = "url('http://"+ v.url +"/CHK/"+ v.com_id +"/facilities/"+ v.pf_id +"/"+ val +"')";               
                var _dom='<div data-background="http://'+ v.url +'/CHK/'+ v.com_id +'/facilities/'+ v.pf_id +'/'+ val +'"" class="swiper-slide swiper-lazy">';
                _dom+='<div class="swiper-lazy-preloader"></div>';
                res_jq.find('#pf_img_slide').append(_dom);
               // res.querySelector('#pf_img_slide').appendChild(_div);
            });
            if(JSON.parse(v.pf_pic).length !=1){
              var swiper = new Swiper('#reservationDetail .swiper-container', {
                 preloadImages: false,
                 lazyLoading: true,
                 autoplay: 3500,
                 autoplayDisableOnInteraction: false,
                 loop: true
              });   
            }else{
              var swiper = new Swiper('#reservationDetail .swiper-container', {
                 preloadImages: false,
                 lazyLoading: true
               });
            }      
            
        }else{
           var _div = document.createElement("div");
           _div.className='swiper-slide';
           _div.style.backgroundImage = "url('http://"+ v.url +"/CHK_APP/r-temp/r-photo-default2.jpg')";
           res.querySelector('#pf_img_slide').appendChild(_div);
        }
        res.querySelectorAll('.titleName div')[0].innerHTML +=v.pf_name;
        res.querySelector('#header h1').innerText =v.pf_name;
        res.querySelector('#tableName').innerText =v.pf_name;
        res.querySelector('.titleName div span').innerHTML =v.pf_type_format;
        res.querySelector('.titleName .titleIcon').className= 'icon-r-'+ app._getFacilitiesType(v.pf_type); 
        res.querySelector('.titleItem span').innerText= v.point;
        res.querySelector('.detailItem p.day').innerHTML += app._getFacilitiesOpenStr(v.w_sun,v.w_mon,v.w_tue,v.w_wed,v.w_thu,v.w_fri,v.w_sat);
        res.querySelector('#point').innerText=v.point;       
        if(v.res_pointRule=='0'){
          res.querySelector('.moreWrap .subDetail').innerText='不扣點';        
        }else{
            if(v.point>0){
              res.querySelector('.resPoint').innerText= v.immed_point==0 ? '入場扣點' : '預約扣點';
              res.querySelector('.resPoint').style.display='block';
            }
            res.querySelector('#point_rule').innerText= app._getPointRuleStr(v.res_pointRule);
        }

        // if(v.immed_point=='1'){
        //     res.querySelector('.notes').style.display='block';
        // }
        res.querySelector('#min_hour').innerText= v.res_limitTime > 30 ? Math.floor(v.res_limitTime/60) :'30';
        if((v.res_limitTime%60) !=0 && v.res_limitTime > 30 ){
            res.querySelector('#min_hour_rule').innerText='小時30分鐘';
        }else{
          if(v.res_limitTime <= 30){
            res.querySelector('#min_hour_rule').innerText='分鐘';
          }
        }
        if(v.res_limitDay==0 && v.res_limitCount ==0 ){
            res.querySelector('#resRule').style.display='none';
        }else{
            res.querySelector('#min_day').innerText= v.res_limitDay;
            res.querySelector('#min_count').innerText= v.res_limitCount;
        }

        res.querySelector('#pf_desc').innerText=v.pf_desc;

        if(res.querySelector('.introWrap').offsetHeight < 67){
          res.querySelector('.infoCollapseWrap').style.display='none';
        }else{
           res.querySelector('#descHeight').value=res.querySelector('.introWrap').offsetHeight;
            res.querySelector('.introWrap').style.height='67px';
        }

        res.querySelector('#max_people').innerText=v.res_attendLimit;
        res.querySelector('#max_res').innerText=v.maximum_people;
        if(v.res_cancelTime>0){
          if(v.res_cancelTime >30){
            if((v.res_cancelTime%60)==0){
              res.querySelector('#cancel_time').innerText= (v.res_cancelTime/60)+"小時";
              res.querySelector('#cancel_time2').innerText= (v.res_cancelTime/60)+"小時";
            }else{
              res.querySelector('#cancel_time').innerText= Math.floor(v.res_cancelTime/60)+"小時30分鐘";
              res.querySelector('#cancel_time2').innerText= Math.floor(v.res_cancelTime/60)+"小時30分鐘";
            }          
          }else{
            res.querySelector('#cancel_time').innerText="30分鐘";
            res.querySelector('#cancel_time2').innerText="30分鐘";
          }
          res.querySelector('.case01').style.display='block';
        }else{
          res.querySelector('.case02').style.display='block';
        }
        if(v.is_reservation=='1'){
          res.querySelector('#footer').style.display='block';
        }else{
          res.querySelectorAll('.detailItem')[3].querySelectorAll('p')[1].style.display='none';
          res.querySelectorAll('.detailItem')[4].style.display='none';
        }
        if(res.querySelectorAll('.detailItem')[2].querySelector('.moreWrap').offsetHeight <67){
 
          //res.querySelectorAll('.detailItem')[2].querySelector('.infoCollapseWrap').style.display='none';
        }else{
  
          //res.querySelectorAll('.detailItem')[2].style.height='65px';
        }
        /*
          var introWrap = $('.introWrap');
          if (introWrap.height() < 65) {
              introWrap.siblings('.infoCollapseWrap').css('display', 'none');
          } else {
              introWrap.css('height', '65px');
          } 
          */
        /*時間表*/
        var _table=document.createElement("table");
        var _tbody=document.createElement("tbody");
        var timeTable=v.time_table.split(';');
        for(var j=0;j<timeTable.length-1;j++){
         // alert(j);
          var arr=timeTable[j].split(',');
          var _tr=document.createElement("tr");
          for(var x=0;x<arr.length;x++){
            //alert(x);
              var _td;
              if(x==0){
                _td=document.createElement("td");
                if(j==0){
                  _td.style.visibility='hidden';
                }               
                _td.innerText= j < 10 ? '0'+j+":00":j+":00";
                _tr.appendChild(_td);
                
              }
              _td=document.createElement("td");
              if(arr[x]=='1'){
                  _td.className='active';
              }
              _tr.appendChild(_td);
          }
          _tbody.appendChild(_tr);
        }
        _table.appendChild(_tbody);
        res.querySelector('.openTimeContent').appendChild(_table);
      }else{
          if(pf_type==v.pf_type){
            domSlide+='<div class="swiper-slide" >';
            domSlide+='<a><input type="hidden" value="'+ v.pf_id +'"/>';
            if(v.pf_pic !='' && v.pf_pic !='[]'){
                domSlide+="<div class='imgBox swiper-lazy' data-background='http://"+ v.url +"/CHK/"+ v.com_id +"/facilities/"+ v.pf_id +"/"+ JSON.parse(v.pf_pic)[0] +"'><div class='swiper-lazy-preloader'></div></div>";
            }else{
                domSlide+="<div class='imgBox swiper-lazy' data-background='http://"+ v.url +"/CHK_APP/r-temp/r-photo-default2.jpg'><div class='swiper-lazy-preloader'></div></div>";                
            }
          
            domSlide+='<div class="imgName">';
            domSlide+='<h5>'+ v.pf_name +'</h5>';
            domSlide+='<div>';
            domSlide+='<p>'+app._getFacilitiesOpenStr(v.w_sun,v.w_mon,v.w_tue,v.w_wed,v.w_thu,v.w_fri,v.w_sat)+'</p>';
            domSlide+='<span class="subPoint"><span>'+ v.point +'</span>點</span>';
            domSlide+='</div>';
            domSlide+='</div></a>';
            domSlide+='</div>';                      
        }
      }
 });
  if(domSlide !=''){
    res.querySelector('.similarItem').style.display='block';
    res.querySelector('#similar').innerHTML=domSlide;  
    var mySwiper2 = new Swiper('#reservationDetail .swiper-container-2',{
        preloadImages: false,
        lazyLoading: true,
        slidesPerView: 1,
        spaceBetween: 15,
        paginationClickable: true
    }); 
  }
  app._loadingHide(300);

}).on('pagebeforehide','#reservation_v2',function(e){
  document.removeEventListener('backbutton',_onBackPageResV2,false);
}).on('pageinit','#reservation_v2',function(e){
   app._footerShow('reservation_v2.html',this.id);
  document.addEventListener('backbutton',_onBackPageResV2,false);
  app._loadingShow();
  var res_jq=$(this);
  var com_id=app._getUrlParameters(res_jq.data("url"), '');
  var res=this;
  var change=0;
  var totalFa=0;
  var typeArr=[];
  var typeName=[];

  //var arr=['common','meeting','read','kid','KTV','gym','movie','computer','swim'];
  var arr=['other','sport','leisure','public','movie','learn','foods'];

  res_jq.on('click', '#header a:eq(0)', function () {
    if (app._getLocalStorageJson('com_count') > 1) {
         _mobile.changePage('communityList.html', { changeHash: true,reverse:true, data:{'paremeter':'reservation_v2.html'} });
    } else{
         _mobile.changePage("index.html", { changeHash: true,reverse:true});
    }
  }).on('click','#res_history',function(){
       _mobile.changePage('reservationHistory_v2.html', { changeHash: true, data:{'paremeter':com_id} });
  }).on('click','#resDomList li a,#heartDomList li a',function(){
    app._loadingShow();
    res.querySelector('#resDomList').innerHTML='';
    _mobile.changePage('reservationDetail.html', { changeHash: true,data:{'paremeter': com_id,'next':this.querySelector('input').value} });
  }).on('click','.filterTips .clear',function(){
      res.querySelector('.filterTips').style.display='none';
      res_jq.find('#resDomList li,#heartDomList li').show();  
      res.querySelector('.content').className='content';
      res.querySelector('#favCount').innerText= res_jq.find('#heartDomList li:not(:hidden)').length;
      res.querySelector('#norCount').innerText= res_jq.find('#resDomList li:not(:hidden)').length;  
  }).on('click','.filterBtn',function(){
     document.removeEventListener('backbutton',_onBackPageResV2,false);
      res.querySelector('.filterWrap').style.display='block';
       document.addEventListener('backbutton',_onBackPageV2Intro,false);
  }).on('click','.wrapHeader .close',function(){
    document.removeEventListener('backbutton',_onBackPageV2Intro,false);
     res.querySelector('.filterWrap').style.display='none';
     document.addEventListener('backbutton',_onBackPageResV2,false);
  }).on('click','.favoriteList .subtitle',function(){

    this.querySelector('i').className='icon-chevron-down active';
    //alert(this.querySelector('i').className);
  }).on('click','.normalList .subtitle',function(){
       this.querySelector('i').className='icon-chevron-down active';
  }).on('click','.wrapFooter',function(){
    document.removeEventListener('backbutton',_onBackPageV2Intro,false);
     document.addEventListener('backbutton',_onBackPageResV2,false);

      res.querySelector('.normalList').style.display='block';
    var tipStr='';
    var fc=JSON.parse(app._getLocalStorage('facilities')).length;
      if(totalFa!=0 && fc !=totalFa){
        res_jq.find('#resDomList li,#heartDomList li').hide();
        for(var i=0;i<typeArr.length;i++){
          res_jq.find('#resDomList li.'+typeArr[i]+',#heartDomList li.'+typeArr[i]).show();     
          tipStr+= typeName[i] +', '; 
        }
        tipStr=tipStr.substring(0,tipStr.length-1);
        res.querySelector('#ftips').innerHTML='<i class="icon-controls"></i>'+tipStr;
        res.querySelector('.content').className='content pushDiv';
        res.querySelector('.filterTips').style.display='block';
      } else{
          res_jq.find('#resDomList li,#heartDomList li').show();   
          res.querySelector('.filterTips').style.display='none';
           res.querySelector('.content').className='content';
      }   
      res.querySelector('#favCount').innerText= res_jq.find('#heartDomList li:not(:hidden)').length;
      if(res_jq.find('#heartDomList li:not(:hidden)').length){
         res.querySelector('.favoriteList').style.display='block';
      }

      res.querySelector('#norCount').innerText= res_jq.find('#resDomList li:not(:hidden)').length;   

      setTimeout(function(){ res.querySelector('.filterWrap').style.display='none';},100);
    
  }).on('click','.filtertType .filterItem',function(){
    var idx=$(this);
    if (this.className.replace(/[\n\t]/g, "").indexOf("selected") > -1 ){
        this.className ='filterItem';
        change--;
        for(var i=0;i<typeArr.length;i++){
            if(typeArr[i]==this.querySelectorAll('input')[0].value){
                typeArr.splice(i, 1);
                typeName.splice(i, 1);
            }
        }     
    }else{
        change++;
        this.className ='filterItem selected';
        typeArr.push(this.querySelectorAll('input')[0].value);
         typeName.push(this.querySelectorAll('input')[1].value);
    }
    if(change==0){
        res.querySelector('.filterContent h3 span').innerHTML='所有分類';
    }else{
        res.querySelector('.filterContent h3 span').innerHTML='已選擇了<span>'+ change +'</span>個分類';
    }
    totalFa=0;
    $.each(JSON.parse(app._getLocalStorage('facilities')), function (i, v) {
        if(typeArr.indexOf(arr[v.pf_type]) !=-1){
          totalFa++;
        }
    });
    res.querySelector('.wrapFooter span').innerText=totalFa ==0 ? JSON.parse(app._getLocalStorage('facilities')).length:totalFa;
  });
}).on('pageshow','#reservation_v2',function(e){
  var com_id=app._getUrlParameters($(this).data("url"), '');
  var dom='';
  var filterDom='';
  var res=this;
  var arr=['other','sport','leisure','public','movie','learn','foods'];

  var typeArr=[];
  var check;
  var heartDom='';
  var fc=0;
  var nc=0;
  app._getReservationList(com_id,function(datas){
      var typeCheck;
      res.querySelector('.wrapFooter span').innerText=datas.length;
      $.each(datas, function (i, v) {
        check=0;
        if(app._getLocalStorage('resHeart') !=null){
          var heart=JSON.parse(app._getLocalStorage('resHeart'))
          for(var hi=0;hi<heart.length;hi++)
          {
            if(heart[hi]==v.pf_id){
              check=1;
              break;
            }
          }
        }
        if(check==1){
          fc=fc+1;
          heartDom+='<li class="'+ arr[v.pf_type] +'">';
          heartDom+='<a>';
          heartDom+='<input type="hidden" value="'+ v.pf_id +'">';
          heartDom+='<div class="name">';
          heartDom+='<div style="width:100%;">';
        }else{
          nc=nc+1;
          dom+='<li class="'+ arr[v.pf_type] +'">';
          dom+='<a>';
          dom+='<input type="hidden" value="'+ v.pf_id +'">';
          dom+='<div class="name">';
          dom+='<div style="width:100%;">';
        }
          
          if(i !=0 && typeCheck != v.pf_type){
            if(typeArr.indexOf(arr[v.pf_type]) ==-1){
              typeArr.push(arr[v.pf_type]);
              filterDom+='<div class="filterItem">';
              filterDom+='<input type="hidden" value="'+ arr[v.pf_type] +'">';
              filterDom+='<input type="hidden" value="'+ v.pf_type_format+'">';
              filterDom+='<div class="filterIcon">';
              filterDom+='<div class="icon-circle-check">';
              filterDom+='<i class="icon-check-mark"></i>';
              filterDom+='</div>';
              filterDom+='<i class="icon-r-'+ arr[v.pf_type] +'"></i>';
              filterDom+='</div>';
              filterDom+='<p>'+ v.pf_type_format +'</p>';
              filterDom+='</div>';
            }
            res.querySelector('.filterBtn').style.display='block';
          }else{
            if(i==0){
              typeArr.push(arr[v.pf_type]);
              filterDom+='<div class="filterItem">';
              filterDom+='<input type="hidden" value="'+ arr[v.pf_type] +'">';
              filterDom+='<input type="hidden" value="'+ v.pf_type_format+'">';
              filterDom+='<div class="filterIcon">';
              filterDom+='<div class="icon-circle-check">';
              filterDom+='<i class="icon-check-mark"></i>';
              filterDom+='</div>';
              filterDom+='<i class="icon-r-'+ arr[v.pf_type] +'"></i>';
              filterDom+='</div>';
              filterDom+='<p>'+ v.pf_type_format +'</p>';
              filterDom+='</div>';
            }
          }
          typeCheck=v.pf_type;
          if(check==1){
            heartDom+='<i class="icon-r-'+ arr[v.pf_type] +' sty1"></i>';
            heartDom+='<div class="info">';
            heartDom+='<h4>'+ v.pf_name +'</h4>';         
            heartDom+='<p>'+ app._getFacilitiesOpenStr(v.w_sun,v.w_mon,v.w_tue,v.w_wed,v.w_thu,v.w_fri,v.w_sat) +'</p>';
            heartDom+='</div>';
            heartDom+= v.is_reservation=='1' ? '<span class="tag">開放預約</span>':'';       
            heartDom+='</div>';
            heartDom+='</div>';
            heartDom+='</a>';
            heartDom+='</li>';
          }else{
            dom+='<i class="icon-r-'+ arr[v.pf_type] +' sty1"></i>';
            dom+='<div class="info">';
            dom+='<h4>'+ v.pf_name +'</h4>';         
            dom+='<p>'+ app._getFacilitiesOpenStr(v.w_sun,v.w_mon,v.w_tue,v.w_wed,v.w_thu,v.w_fri,v.w_sat) +'</p>';
            dom+='</div>';
            dom+= v.is_reservation=='1' ? '<span class="tag">開放預約</span>':'';       
            dom+='</div>';
            dom+='</div>';
            dom+='</a>';
            dom+='</li>';
          }      
      });
      if(dom =='' && heartDom ==''){
          res.querySelector('.closedWrap').style.display='block';
          res.querySelector('.filterBtn').style.display='none';
          res.querySelector('#res_history').style.display='none';
          res.querySelector('.normalList').style.display='none';
          res.querySelector('#res_online').style.display='block';
          res.querySelector('.closedWrap').style.height=_tmpHeight-res.querySelector('#header').offsetHeight-res.querySelector('#footer').offsetHeight;
      }else{
          if(heartDom !=''){
            res.querySelector('#heartDomList').innerHTML=heartDom;
            res.querySelector('.favoriteList').style.display='block';
          }
          res.querySelector('#favCount').innerHTML=fc;
          res.querySelector('#norCount').innerHTML=nc;
          res.querySelector('#resDomList').innerHTML=dom;
          res.querySelector('.filtertType').innerHTML=filterDom;
            res.querySelector('.content').style.height=_tmpHeight-res.querySelector('#header').offsetHeight - res.querySelector('#footer').offsetHeight +'px';

      }
      app._loadingHide();
    
  });
}).on('pagebeforecreate','#reservation',function(e) {   
    app._loadingShow();
}).on('pageinit','#reservation',function(e) { 
    document.addEventListener('backbutton',_onBackPageRes,false);
    var com_id=app._getUrlParameters($(this).data("url"), '');
    var res=$(this);
    res.on('click', '#header a:eq(0)', function () {
        if (app._getLocalStorageJson('com_count') > 1) {
             _mobile.changePage('communityList.html', { changeHash: true,reverse:true, data:{'paremeter':'reservation.html'} });
        } else{
             _mobile.changePage("index.html", { changeHash: true,reverse:true});
        }
    }).on('click','#res_history',function(){       
          _mobile.changePage("reservationHistory.html", { changeHash: true,data:{'paremeter':com_id}});
    }).on('click','#reservation_list .more',function(){
        document.removeEventListener('backbutton',_onBackPageRes,false);
        var pf_id=$('#'+ this.id +' input[type^=hidden]').val();
        var arr=['common','meeting','read','kid','KTV','gym','movie','computer','swim'];
        $.each(JSON.parse(app._getLocalStorage('facilities')).info, function (i, v) {          
            if(v.pf_id==pf_id){
                res.find('.top-area').find('i').attr('class','icon-r-'+ arr[v.pf_type]);
                res.find('#res_name').text(v.pf_name);
                if(v.point != 0){
                 res.find('#res_count').text(v.point+' 點'); 
                }
                if(v.is_reservation=='1'){
                    res.find('#res_btn').text('我要預約').attr({'class':'btn-act ui-link'});
                    _facPf=v.pf_id;
                    _facTime=v.start.substring(0,5) +'_'+ v.due.substring(0,5);
                    _maxmum=v.maximum_people;
                    _dayrule=v.day_rule;
                }else{
                    res.find('#res_btn').text('不需預約').attr({'class':'btn-default ui-link'});
                }
                res.find('.bottom-area').find('div:eq(0)').text();

                if(v.start !=''){
                    res.find('.bottom-area').find('div:eq(0)').html(v.open_day +'<br/>'+ v.start.substring(0,5) +'-'+ v.due.substring(0,5));
                }else{
                    res.find('.bottom-area').find('div:eq(0)').html(v.open_day +'<br/>全天候開放');
                }
                res.find('.bottom-area').find('div:eq(1)').text(v.maximum_people +' 人');
                res.find('.bottom-area').find('div:eq(2)').html(v.pf_desc.replace(/\r\n/g,"<br />"));
            }
        });
        res.find('.detailWrap').show();
        document.addEventListener('backbutton',_onBackPageIntro,false);
    }).on('click','#res_btn',function(){
        if(this.innerText=='我要預約'){
            _facCom=com_id;
            var options = {
                date: new Date(),
                mode: 'date',
                androidTheme:4
            };
            datePicker.show(options, app._onPickerGetToday);
        }       
    }).on('click','.detailWrap i',function(){
        document.removeEventListener('backbutton',_onBackPageIntro,false);
        document.addEventListener('backbutton',_onBackPageRes,false);
        res.find('.detailWrap').hide();
    }).on('click','#reservation_list .query',function(){
        _facCom=com_id;
        _facPf=res.find('#'+ this.id +' input[type^=hidden]:eq(0)').val();
        _facTime = res.find('#'+ this.id +' input[type^=hidden]:eq(1)').val();
        _maxmum= res.find('#'+ this.id +' input[type^=hidden]:eq(2)').val();
        _dayrule= res.find('#'+ this.id +' input[type^=hidden]:eq(3)').val();
        if(_facTime !='no'){
            var options = {
                date: new Date(),
                mode: 'date',
                androidTheme:4
            };
            datePicker.show(options, app._onPickerGetToday);
        }else{
            app._dialog('該公設無需預約!');
        }
    }).on('click','#footer ul li:eq(0) a',function(){
        _mobile.changePage("index.html", { changeHash: true, reverse: true });
    }).on('click','#footer ul li:eq(2) a',function(){
        _mobile.changePage("login.html", { changeHash: true });
    }).on('click','#footer ul li:eq(4) a',function(){
        _mobile.changePage("moreList.html", { changeHash: true });
    }).on('click','#footer ul li:eq(1) a',function(){
        if (app._getLocalStorageJson('com_count') > 1) {
            _mobile.changePage('communityList.html', { changeHash: true, data:{'paremeter':'postal.html'} });
        } else {            
            _mobile.changePage('postal.html', { changeHash: true, data: { 'paremeter': JSON.parse(app._getLocalStorage('comInfo')).info[0].id } });
        } 
    });
     
}).on('pageshow','#reservation',function(e) { 
    var com_id=app._getUrlParameters($(this).data("url"), '');
    app._getCommunityReservation(com_id);

     app._ga_trackView('reservation','');
}).on('pagebeforehide', '#reservation', function (e) {
     document.removeEventListener("backbutton", _onBackPageRes, false);
}).on('pagebeforecreate','#reservationHistory',function(e) {
    app._loadingShow();
}).on('pageinit','#reservationHistory',function(e) { 
  var resHistory=$(this);
    var com_id=app._getUrlParameters(resHistory.data("url"), 'paremeter');
    var backpage=app._getUrlParameters(resHistory.data("url"), 'next');
    app._footerShow('reservationHistory.html',this.id);
    resHistory.on('click','#header a:eq(0)',function(){
      if(backpage==com_id){
          _mobile.changePage("reservation.html", { changeHash: true,reverse:true,data:{'paremeter':com_id}});
      }else{
        document.removeEventListener('backbutton',_onBackPageSystemMsg,false);
        _mobile.changePage("myMsg.html", { changeHash: true,reverse:true,data:{'paremeter':backpage.split('_')[1]}});
      }
        
    }).on('click','#header a:eq(1)',function(){
        _mobile.changePage("profilePoint.html", { changeHash: true,data:{'paremeter':com_id,'next':'reservationHistory.html'}});
    }).on('change','input[type^=radio]',function(){
          if(this.id=='sc-3-1-1'){
            resHistory.find('#segmented-div-b').hide();
            resHistory.find('#segmented-div-a').show();
          }else{
            resHistory.find('#segmented-div-a').hide();
            resHistory.find('#segmented-div-b').show();
          }
    }).on('click','#segmented-div-a ul li',function(){
         var val=this.querySelector('input').value;
         navigator.notification.confirm(
          '確認您是否要取消該筆公設預約資料', // message
              function (idx) {  
                if(idx==1){
                  app._loadingShow();
                  app._editReservationInfo(val,0,function(status){
                      if(status=='success'){
                          app._dialog('取消預約成功');
                          if(backpage==com_id){
                              _mobile.changePage("reservation.html", { changeHash: true,reverse:true,data:{'paremeter':com_id}});
                          }else{
                            document.removeEventListener('backbutton',_onBackPageSystemMsg,false);
                            _mobile.changePage("myMsg.html", { changeHash: true,reverse:true,data:{'paremeter':backpage.split('_')[1]}});
                          }
                      }else{
                        app._dialog('取消預約失敗，請稍候再嘗試');
                      }
                      app._loadingHide();
                  });
                }              
              },        
              '取消公設預約?',
              ['是','否'] 
          ); 
    });

    var _showTab = 0;
    var $defaultDi = resHistory.find('div.navbar ul li a').eq(_showTab).addClass('active');  
    resHistory.find($defaultDi.attr('href')).siblings().hide();
    resHistory.find('div.navbar ul li a:not(.out)').click(function () {
        var $this = $(this),
        _clickTab = $this.attr('href');
        resHistory.find('div.navbar ul li a').removeClass('active');    
        $this.addClass('active');
        resHistory.find(_clickTab).stop(false, true).fadeIn().siblings().hide();
        return false;
    });
}).on('pagebeforecreate','#reservationHistory_v2',function(e) {
  app._loadingShow();
}).on('pagebeforehide','#reservationHistory_v2',function(e) {
  document.removeEventListener("backbutton", _onBackPageV2History, false);
  temp1='';
}).on('pageinit','#reservationHistory_v2',function(e) { 
  document.addEventListener("backbutton", _onBackPageV2History, false);
    var resHistory=$(this);
      var com_id=app._getUrlParameters(resHistory.data("url"), 'paremeter');
         var nav=app._getUrlParameters(resHistory.data("url"), 'next');
      temp1=com_id;
    var res=this;
    var _showTab = 0;
    if(nav=='record'){
      _showTab=1;
    }
    var $defaultDi = resHistory.find('div.navbar ul li a').eq(_showTab).addClass('active');
    resHistory.on('click','#segmented-div-a .list-wrap .r-cancel',function(){
      var resId=this.querySelector('input').value;
        navigator.notification.confirm(
        '確定取消此筆預約?\n(小提醒：已扣除之點數將不自動回補，請洽管理室協助回補點數服務)', // message
            function (idx) {                         
                if(idx==1){
                  app._setCancelReservation(resId,function(msg){
                    if(msg=='success'){
                        app._dialog('取消預約成功');
                        _mobile.changePage('reservationHistory_v2.html', { changeHash: true ,reloadPage:true, data:{'paremeter':com_id,'next':'record'} });
                    }                    
                  });
                }               
            },        
            '今網行動管家訊息',
            ['確定','否'] 
        );         
    }).on('click','#header a',function(){
        _mobile.changePage('reservation_v2.html', { changeHash: true, reverse: true, data:{'paremeter':com_id} });
    });
     
    resHistory.find($defaultDi.attr('href')).show().siblings().hide();
    resHistory.find('div.navbar ul li a:not(.out)').click(function () {
        var $this = $(this),
        _clickTab = $this.attr('href');
        resHistory.find('div.navbar ul li a').removeClass('active');    
        $this.addClass('active');
        resHistory.find(_clickTab).stop(false, true).show().siblings().hide();
        return false;
    })
    resHistory.find('#segmented-div-a').on('swipeleft',function(){
        resHistory.find('div.navbar ul li:eq(0) a').removeClass('active');
        resHistory.find('div.navbar ul li:eq(1) a').addClass('active');
        resHistory.find('#segmented-div-b').stop(false, true).show().siblings().hide(); 
     });
    resHistory.find('#segmented-div-b').on('swiperight',function(){
        resHistory.find('div.navbar ul li:eq(1) a').removeClass('active');
        resHistory.find('div.navbar ul li:eq(0) a').addClass('active'); 
        resHistory.find('#segmented-div-a').stop(false, true).show().siblings().hide(); 
    })
}).on('pageshow','#reservationHistory_v2',function(e) {   
    app._footerShow('reservationHistory_v2.html',this.id);
   var res_jq=$(this);
   var res=this; 
   var dom='';
   var hisDom='';
   var id;
   var com_id=app._getUrlParameters(res_jq.data("url"), 'paremeter');
   var h=_tmpHeight-$('#header').height()-$('#footer').height() - ($('.section-inner').height()*2);
   var Today=new Date();
   Today=new Date(Today.getFullYear() +'/'+ (Today.getMonth()+1)+'/'+ Today.getDate() +' '+ Today.getHours()+':'+ Today.getMinutes());
   var j=0;
   var x=0;
   var hisId;
   app._getResHistory(com_id,function(datas){
    if(datas.length>0){
        $.each(datas,function(i,v){
          var d=new Date(v.res_start);
          if(d.getTime() > Today.getTime() && v.res_status=='1'){
            if(j==0 || id != v.tablet_id){
               if(j != 0){
                dom+='</ul>';
                dom+='</div>';
               }
               dom+='<div class="list-group">';
               dom+='<div class="houseTitle">';
               dom+=v.tablet_note;
               //dom+='<i class="icon-chevron-down active"></i>';
               dom+='</div>';
               dom+='<ul>';
            }   
            id=v.tablet_id;     
            dom+='<li>';
            dom+='<div class="info">';
            dom+='<h4><span>'+ v.res_start.split(' ')[0] +' ('+v.week+')</span><span class="clock">'+v.res_start.split(' ')[1]+'-'+ v.res_due +'</span></h4>';
            dom+='<p>';
            if(((d.getTime()/1000) - (Today.getTime()/1000))/60 > v.res_cancelTime){
              dom+='<i class="r-cancel icon-more-detail-2">';
              dom+='<input type="hidden" value="'+v.res_id+'" />';
              dom+='<input type="hidden" value="'+v.tablet_id+'" />';
              dom+='</i>';
            }
            if(((d.getTime()/1000) - (Today.getTime()/1000))/60 <=60){
              dom+='<span class="tag"><i class="icon-r-time"></i>';
              dom+='<span>'+(((d.getTime()/1000) - (Today.getTime()/1000))/60).toFixed(0)+'分鐘後</span>';            
              dom+='</span>';
            }
            dom+='<span class="pin">'+v.pf_name+'</span>';
            dom+='<span class="r-num">人數:<span>'+ v. people+'</span>人</span>';
            dom+='<span class="r-point">點數:<span>'+v.point+'</span>點</span>';
            dom+='<i class="r-bgIcon icon-r-'+app._getFacilitiesType(v.pf_type)+'"></i>';
            dom+='</p>';
            dom+='</div>';
            dom+='</li>';   
            j++;
          }else{
            if(x==0 || hisId != v.tablet_id){
               if(j != 0){
                hisDom+='</ul>';
                hisDom+='</div>';
               }
               hisDom+='<div class="list-group" >';
               hisDom+='<div class="houseTitle">';
               hisDom+=v.tablet_note;
               //hisDom+='<i class="icon-chevron-down active"></i>';
               hisDom+='</div>';
               hisDom+='<ul>';
            }   
            hisId=v.tablet_id;     
            hisDom+='<li>';
            hisDom+='<div class="info">';
            hisDom+='<h4><span>'+ v.res_start.split(' ')[0] +' ('+v.week+')</span><span class="clock">'+v.res_start.split(' ')[1]+'-'+ v.res_due +'</span></h4>';
            hisDom+='<p>';
            if(v.res_status=='1'){
              hisDom+='<span class="tag overtime"><span>逾時未到</span></span>';
            }else{
              if(v.res_status=='0'){
                  hisDom+='<span class="tag noReturn"><span>取消預約</span></span>';
              }else{
                if(v.lend=='1'){
                  hisDom+='<span class="tag noReturn"><span>物品未還</span></span>';
                }
              }
            }
            hisDom+='<span class="pin">'+v.pf_name+'</span>';
            hisDom+='<span class="r-num">人數:<span>'+ v. people+'</span>人</span>';
            hisDom+='<span class="r-point">點數:<span>'+v.point+'</span>點</span>';
            hisDom+='<i class="r-bgIcon icon-r-'+app._getFacilitiesType(v.pf_type)+'"></i>';
            hisDom+='</p>';
            hisDom+='</div>';
            hisDom+='</li>';   
            x++;
          }                   
      });
      if(dom !=''){
        dom+='</ul>';
        dom+='</div>';
        res.querySelector('#segmented-div-a .list-wrap').innerHTML= dom+res.querySelector('#segmented-div-a .list-wrap').innerHTML;
      }else{
          res.querySelector('#segmented-div-a .empty').style.display='block';
          res.querySelector('#segmented-div-a .list-wrap').style.display='none';
      }
      if(hisDom !=''){
        hisDom+='</ul>';
        hisDom+='</div>';
        res.querySelector('#segmented-div-b .list-wrap').innerHTML= hisDom+res.querySelector('#segmented-div-b .list-wrap').innerHTML;
      }else{
          res.querySelector('#segmented-div-b .empty').style.display='block';
          res.querySelector('#segmented-div-b .list-wrap').style.display='none';
      }     
    }else{
      res.querySelector('#segmented-div-a .empty').style.display='block';
      res.querySelector('#segmented-div-a .list-wrap').style.display='none';
    }
    res.querySelector('#segmented-div-a').style.height=h+'px'; 
    res.querySelector('#segmented-div-b').style.height=h+'px'; 
        app._loadingHide(300);
   });
}).on('pageshow','#reservationHistory',function(e) { 
    var com_id=app._getUrlParameters($(this).data("url"), 'paremeter');
    var domStr='';
    var recordDom='';
    var tag_badge;
    var Today=new Date();
    Today=new Date(Today.getFullYear() +'/'+ (Today.getMonth()+1)+'/'+ Today.getDate() +' '+ Today.getHours()+':'+ Today.getMinutes());
    var _sda=$('#segmented-div-a');
    var _sdb=$('#segmented-div-b');
    var h=_tmpHeight-$('#header').height()-$('#footer').height() - ($('.section-inner').height()*2);
    $.ajax({
        dataType:'json',
        url: app._getWebServiceMethod('getReservationRecordList'),
        data: { 'com_id': com_id,'code': app._getLocalStorageJson('code')},
        type: 'post',
        async: true,
        complete: function(){app._loadingHide(400)},
        success: function (datas) {
             $.each(datas, function (i, v){
                var d=new Date(v.res_time +' '+ v.start);
                if(d.getTime() > Today.getTime()){
                    domStr+='<li>';
                    domStr+='<input type="hidden" value="'+v.res_id+'" />'
                    domStr+='<div class="info">';          
                    domStr+='<h4><span>'+ v.res_time +'</span><span>('+app._getWeekDayStr(v.res_time)+')</span><span>'+ v.start +'-'+ v.due +'</span></h4>';
                    domStr+='<p>';
                    if(((d.getTime()/1000) - (Today.getTime()/1000))/60 <=60){
                        tag_badge='yes';
                        domStr+='<span class="tag"><i class="icon-r-time"></i><span>'+ (((d.getTime()/1000) - (Today.getTime()/1000))/60).toFixed(0) +'分鐘後</span></span>'; 
                    }                                              
                    domStr+='<span class="pin">'+ v.pf_name +'</span><span class="r-num"><i class="icon-user"></i>'+ v.people +'</span><span class="r-point"><i class="icon-r-point"></i>'+ v.point +'</span></p>';
                    domStr+='</div>';
                    domStr+='</li>'; 
                }else{
                    recordDom+='<li>';
                    recordDom+='<div class="info">';
                    recordDom+='<h4><span>'+ v.res_time +'</span><span>('+app._getWeekDayStr(v.res_time)+')</span><span>'+ v.start +'-'+ v.due +'</span></h4>';
                    recordDom+='<p><span class="pin">'+ v.pf_name +'</span><span class="r-num"><i class="icon-user"></i>'+ v.people +'</span><span class="r-point"><i class="icon-r-point"></i>'+ v.point +'</span></p>';
                    recordDom+='</div>';
                    recordDom+='</li>';
                }
            });
           if(domStr !=''){
                if(tag_badge=='yes'){
                    $('#sc-1-1').find('span').append('<span class="badge"></span>');
                }
                _sda.find('ul:eq(0)').append(domStr);
           }
           if(recordDom !=''){
                _sdb.find('ul:eq(0)').append(recordDom);
           }

                 if( _sda.find('ul:eq(0) li').length==0){
                _sda.find('.list-wrap').hide();
                _sda.find('.empty').show();
                _sda.attr('style','height:'+ h +'px;');
              }
              if( _sdb.find('ul:eq(0) li').length==0){
                _sdb.find('.list-wrap').hide();
                _sdb.find('.empty').show();
                _sdb.attr('style','height:'+ h +'px;');
              }
              
            _sda.show();
        }
    });
app._ga_trackView('reservationHistory','');
}).on('pagebeforehide','#reservationHistory',function(e) {
    app._loadingShow();
}).on('pagebeforehide','#calendar',function(e) {
     document.removeEventListener('backbutton',_onBackPageCalendar,false);
        app._loadingShow();
}).on('pageinit','#calendar',function(){
     document.addEventListener('backbutton',_onBackPageCalendar,false);
        _swiperCalendar='';
    var ca =this;
     var calend=$(this);
    app._loadingShow();

     calend.on('click', '#header a',function(){
        _mobile.changePage('index.html', { changeHash: true, reverse: true });
    }).on('click','#calendar_year',function(){
          var year=new Date();
          year=year.getFullYear();
          var i=-1;
          var options=new Object();
              options.title='請選擇年份';
              options.addCancelButtonWithLabel='取消';
              options.androidEnableCancelButton=true;
              options.buttonLabels=new Array();   
         
          while(i<2){
            if(year + i >=2016){
              options.buttonLabels.push((year+i));
            }
            i++;
          }
              
          window.plugins.actionsheet.show(options, function(buttonIndex){
              if(options.buttonLabels[buttonIndex-1] != undefined){
              
                if(ca.querySelector('.year').innerText!=options.buttonLabels[buttonIndex-1]+'年'){
                    app._loadingShow();
                  ca.querySelector('.year').innerHTML=options.buttonLabels[buttonIndex-1]+'年<i class="icon-down-arrow"></i>';
                  app._getCalendarDom(ca);

                }

                //alert(options.buttonLabels[buttonIndex-1]);
              }
              
          });
    }).on('click','.section-inner2 span label',function(){ 
        var radio=this;
        var lw;       
        if(this.querySelector('input').id=='sc-1-1'){
              var Today=new Date();

            if(Today.getFullYear()==ca.querySelector('.year').innerText.replace('年', '')){

                calend.find('span.month span').text((Today.getMonth()+1)).parent().show();
            }else{
                calend.find('span.month span').text('1').parent().show();
            }
        
            var sc1=ca.querySelector('#segmented-div-a');
            sc1.style.display='block';
            var sc2=ca.querySelector('#segmented-div-b');
            sc2.style.display='none';

            if(_swiperCalendar==undefined || _swiperCalendar==''){
                _swiperCalendar = new Swiper('#calendar .swiper-container', {
                    initialSlide:(parseInt(calend.find('span.month span').text())-1),
                    preventClicks : false,
                    //direction: 'vertical',
                    onSlideChangeEnd: function(swiper){ 
                      calend.find('.month span').text((swiper.activeIndex+1));
                    }
                });
            }else{
                if(Today.getFullYear()==ca.querySelector('.year').innerText.replace('年', '')){
                    _swiperCalendar.slideTo(Today.getMonth());
                }else{
                  _swiperCalendar.slideTo(0);
                }
            }

        }else{
            calend.find('span.month span').parent().hide();
            var sc2=ca.querySelector('#segmented-div-b');
            sc2.style.display='block';
            var sc1=ca.querySelector('#segmented-div-a');
            sc1.style.display='none';
        }
        lw=_tmpHeight-ca.querySelector('#header').offsetHeight - ca.querySelector('#footer').offsetHeight;      
        ca.querySelector('#segmented-div-a').style.height=lw +'px';
        lw=lw-ca.querySelector('.calendar-mode').offsetHeight-ca.querySelector('.full-day-show').offsetHeight;
        ca.querySelector('.lunarWrap').style.height=lw+'px';
         this.querySelector('input').checked=true;

    }).on('click','#timelineDom ul li,#calendarViewList li',function(){
        document.removeEventListener('backbutton',_onBackPageCalendar,false);
        var count=0;
        var val=this.querySelector('input').value.split('_')[0];
        var valDate=this.querySelector('input').value.split('_')[1];
        var tempData=JSON.parse(ca.querySelector('#calendarVal').value);
       
        for(var i=0;i<tempData.length;i++){
            if(tempData[i].id==val && valDate==tempData[i].start_date){
                var sd,ed;
                if(parseInt(tempData[i].start_time.split(':')[0]) < 12){
                    sd='上午';
                }else{
                    sd='下午'
                }
                 if(parseInt(tempData[i].end_time.split(':')[0]) < 12){
                    ed='上午';
                }else{
                    ed='下午'
                }
                   //calend.find('div.detailWrap').attr('style','display:block;');
                var detailWrap=calend.find('div.detailWrap');
                //alert(detailWrap.html());
                detailWrap.find('div:eq(0)').attr('class','theme-'+ app._getCalendarType(tempData[i].type));
                detailWrap.find('span:eq(0)').text(tempData[i].title);
                detailWrap.find('ul li:eq(0) input:eq(0)').val(tempData[i].start_date);
                detailWrap.find('ul li:eq(0) input:eq(1)').val(tempData[i].start_time);
                detailWrap.find('ul li:eq(0) input:eq(2)').val(tempData[i].end_time);
                detailWrap.find('ul li:eq(0) input:eq(3)').val(tempData[i].com_id);
                detailWrap.find('ul li:eq(0) p:eq(0)')
                .text(tempData[i].start_date.split('/')[1]+'月'+tempData[i].start_date.split('/')[2]+'日 星期'+ app._getWeekDayIdx(tempData[i].week))
                detailWrap.find('ul li:eq(0) p:eq(1)').text(sd +' '+ tempData[i].start_time +' - '+ ed +' '+tempData[i].end_time).siblings().show();

                detailWrap.find('ul li:eq(1) p').text(tempData[i].loc);
                detailWrap.find('ul li:eq(2) p').text(tempData[i].desc);
                detailWrap.find('ul li:eq(3) ul').html('');
                $.each(JSON.parse(tempData[i].files), function (idx, v) { 
                    detailWrap.find('ul li:eq(3) ul').append('<li><input type="hidden" value="'+v.f+'" />附檔'+idx+'.'+ v.f.split('.')[1] +'</li>');
                });
                calend.find('div.detailWrap').attr('style','display:block;');
                detailWrap.find('span.addtoCal-tag').hide();
                var calYMD= new Date(tempData[i].start_date);
                var calTime=tempData[i].start_time.split(':');
                var calDue=tempData[i].end_time.split(':');
                var startDate = new Date(calYMD.getFullYear(),calYMD.getMonth(),calYMD.getDate(),parseInt(calTime[0]),parseInt(calTime[1]),0,0,0); 
                var endDate = new Date(calYMD.getFullYear(),calYMD.getMonth(),calYMD.getDate(),parseInt(calDue[0]),parseInt(calDue[1]),0,0,0);
                window.plugins.calendar.listEventsInRange(startDate,endDate,function(txt){
                  for(var j=0;j<txt.length;j++){
                    if(txt[j].eventLocation==tempData[i].title){
                      ca.querySelector('p.addtoCal-tag').style.display='none';
                      detailWrap.find('span.addtoCal-tag').text('已加入行事曆').show();                     
                      break;
                    }
                  }
                },function(){});
                break;
            }
        }
         document.addEventListener('backbutton',_onBackPageEvent,false);
}).on('click','.detailWrap ul li:eq(0)',function(){ //加入行事曆
    var cal=this;
    var calValue=this.querySelectorAll('input');
    var calYMD= new Date(calValue[0].value);
    var calTime=calValue[1].value.split(':');
    var calDue=calValue[2].value.split(':');
    var startDate = new Date(calYMD.getFullYear(),calYMD.getMonth(),calYMD.getDate(),parseInt(calTime[0]),parseInt(calTime[1]),0,0,0); 
    var endDate = new Date(calYMD.getFullYear(),calYMD.getMonth(),calYMD.getDate(),parseInt(calDue[0]),parseInt(calDue[1]),0,0,0);
     Date.prototype.addHours = function(h) {    
       this.setTime(this.getTime() + (h*60*60*1000)); 
       return this;   
    }
    var title = ca.querySelector('.title').innerText;
    var eventLocation = ca.querySelectorAll('.detailWrap ul li')[1].innerText;
    var notes = ca.querySelectorAll('.detailWrap ul li')[2].innerText;
    var success = function(msg) { 
       // cal.querySelector('.addtoCal-tag').style.display='none';
     };
    var error = function(message) { app._dialog('加入行事曆失敗…'); };
    window.plugins.calendar.createEventInteractively(title,eventLocation,notes,startDate.addHours(-8),endDate.addHours(-8),success,error);

}).on('click','.detailWrap i.close',function(){

        calend.find('div.detailWrap').attr('style','display:none;');
         document.removeEventListener('backbutton',_onBackPageEvent,false);
              document.addEventListener('backbutton',_onBackPageCalendar,false);
 }).on('click','.fileWrap ul li',function(){
      var link='http://202.39.212.221/CHK/'+ document.getElementById('calendar').querySelector('#com').value +'/calendar/';
      var val=this.querySelector('input').value;
      app._openFile(link+val);
      /*
      var fn=val.split('.')[1];
      if(fn=='jpg' || fn=='jpeg' || fn=='png' || fn=='gif'){
        var ref = window.open(link+val, '_blank', 'location=no');
      }else{
        var ref = window.open('https://docs.google.com/viewer?url='+ encodeURI(link+val), '_blank', 'location=no');
      }
      */
}).on('click','.swiper-wrapper .day-contents',function(event){
       var dateview=ca.querySelectorAll('.full-day-show span');
       var monthSpan=ca.querySelector('span.month span');

       var date=this.innerText.split('\n')[0];
       calend.find('.swiper-slide').find('.focus').removeClass('focus');
       if(this.parentNode.className!='day today focus-today')
       {
            dateview[2].innerText='';
            this.parentNode.className='day past focus';
       }else{
            dateview[2].innerText='(今天)';
       }
       //alert(ca.querySelector('#calendar_year').innerText.replace('年','')+'__'+  ca.querySelector('span.month span').innerText);
       dateview[0].innerText=parseInt(monthSpan.innerText) <10 ? '0'+monthSpan.innerText:monthSpan.innerText;
       dateview[0].innerText+='月';
       dateview[0].innerText+=parseInt(date) <10 ? '0'+date:date;
       dateview[0].innerText+='日';
       var thisDate=new Date(ca.querySelector('#calendar_year').innerText.replace('年','')+'/'+ monthSpan.innerText +'/'+date);
       dateview[1].innerText='星期'+ app._getWeekDayStr(thisDate);
       //alert(LunarDate.GetLunarDay(ca.querySelector('#calendar_year').innerText.replace('年',''), monthSpan.innerText , date)+'&nbsp;'+ LunarDate.SolarTerm(thisDate));
       dateview[4].innerHTML= LunarDate.GetLunarDay(ca.querySelector('#calendar_year').innerText.replace('年',''), monthSpan.innerText , date)+'&nbsp;'+ LunarDate.SolarTerm(thisDate); 
       //dateview[5].innerHTML='<span>農曆</span><p>'+LunarDate.GetLunarDay()+'</p><p>'+ LunarDate.SolarTerm(thisDate) +'</p>';
       // LunarDate.GetLunarDay(thisYear, monthCount, _day)
       
        if(ca.querySelector('#calendarVal').value !=""){
            var calendarJson=JSON.parse(ca.querySelector('#calendarVal').value);
            if(calendarJson.length>0){ 

              var dayBtn=this;
                       app._getCalendarFind(ca,calendarJson,dayBtn); 
                       /*
              window.plugins.calendar.findAllEventsInNamedCalendar('行動管家_社區事務',function(msg){
                    app._getCalendarFind(ca,calendarJson,dayBtn,msg);          
                },function(){
                     app._getCalendarFind(ca,calendarJson,dayBtn,msg);
                });           
               */
            }
        }
        
        
    });
}).on('pageshow','#calendar',function(){
     app._footerShow('calValue.html',this.id);
     var Today=new Date();

        this.querySelector('#calendar_year').innerHTML=Today.getFullYear()+'年<i class="icon-down-arrow"></i>';


    app._getCalendarDom(this);
    app._ga_trackView('calendar','');
}).on('pageshow','#profile',function(e) { 
    app._getProfileInfo($(this))
     app._ga_trackView('profile','');
}).on('pagebeforehide','#profile',function(e) {  
    document.removeEventListener('backbutton',_onBackPagePro,false);
    document.removeEventListener('backbutton',_onBackPageUserMsg,false);
}).on('pageinit','#profile',function(e) { 
    var profile=$(this);
    app._loadingShow();
    var backpage=app._getUrlParameters(profile.data("url"), 'paremeter');
    app._footerShow('profile.html',this.id);
    if(backpage ==''){
       document.addEventListener('backbutton',_onBackPagePro,false);
     }else{
       document.addEventListener('backbutton',_onBackPageUserMsg,false);
     }
     //確認是否已登記姓名，直接快取
     if(app._getLocalStorage('deviceName') !=null){
        profile.find('.mark_txt').text(app._getLocalStorage('deviceName')).addClass('done');
     }
     //確認手機是否開啟推播，非支援所有手機
     PushNotification.hasPermission(function(data) {
        if (data.isEnabled) {
            profile.find('li:eq(2) a p span').text('訊息通知開啟中');
        }else{
            profile.find('li:eq(2) a p span').addClass('alert').text('訊息通知關閉中');
        }
     });
   
    profile.on('click', '.listview:eq(0) ul li', function () {
        app._inputNameDialog();
    }).on('click','.listview:eq(2) ul li',function(){
      if (window.cordova && window.cordova.plugins.settings) {
          window.cordova.plugins.settings.open("application_details", function() {},function () {});
      }
    }).on('click','.gotoQA',function(){
        _mobile.changePage('more-qa.html', { changeHash: true,data:{'paremeter':'profile.html'} });
    }).on('click','#privacy_btn',function(){
        if(app._getLocalStorage('deviceName')==null){
            app._dialog('隱私設定需要登記姓名，管理員才知道是您的包裹哦!');
        }else{        
              //alert(profile.find('#privacy_btn span').text());
              if(profile.find('#privacy_btn span').text()=='尚未啟用'){
                   navigator.notification.confirm(
                '您的包裹將僅限於本人持手機個人識別條碼領取，無法由他人代領；包裹相關等資料也僅顯示於您本人手機。', // message
                    function (idx) {  
                                 
                        if(idx==1){
                            app._editUserIsPrivacy("1",function(status){
                                if(status !='fail'){
                                    //window.localStorage.removeItem('profileInfo');
                                    profile.find('#privacy_btn').removeClass('off').addClass('on').find('span').text('已啟用');

                                }
                            });
                        }       
                 
                    },        
                    '啟用隱私設定',
                    ['確定','取消'] 
                ); 
              }else{
                    navigator.notification.confirm(
                  '取消隱私設定後，您近三日的歷史私人包裹相關資訊將於其他已開通手機顯示。如要針對單一包裹取消隱私，請至「我的包裹」列表中取消特定包裹隱私，謝謝。', // message
                    function (idx) { 
                                
                        if(idx==1){
                            app._editUserIsPrivacy("0",function(status){
                                if(status !='fail'){
                                    //window.localStorage.removeItem('profileInfo');
                                   profile.find('#privacy_btn').removeClass('on').addClass('off').find('span').text('尚未啟用');
                                }
                            });
                        }  
                           
                    },        
                    '取消隱私設定',
                    ['確定','取消'] 
                ); 
              }
              
        }
    }).on('click', '#p_community a',function(){
        //_mobile.changePage('profilePoint.html', { changeHash: true, data:{'paremeter': $(this).find('input[type=hidden]:eq(0)').val(),'next': $(this).find('input[type=hidden]:eq(1)').val()} });    
        if(this.id=='no_login'){
            _mobile.changePage('login.html', { changeHash: true});
        }else{
           //app._dialog('功能尚未開放。'); 
           _mobile.changePage('profilePoint.html', { changeHash: true, data:{'paremeter': $(this).find('input[type=hidden]:eq(0)').val(),'next': $(this).find('input[type=hidden]:eq(1)').val(),'name':$(this).find('span.communityN').text(),'back':'profile.html'} });
        }
    }).on('click', '#header a',function(){
        if(backpage !=''){
          _mobile.changePage(backpage, { changeHash: true, reverse: true });
        }else{
          _mobile.changePage('index.html', { changeHash: true, reverse: true });
        }
         
    });
    if(app._getLocalStorageJson('user') =='' || app._getLocalStorageJson('user')=='undefined'){
        $('#profile_info').addClass('focus');
    }
    app._tagProfileIsSet();
}).on('pagebeforehide','#profilePoint',function(e){
    app._loadingShow();

}).on('pageinit','#profilePoint',function(e) {
    var pp=$(this);
    app._loadingShow();
    app._footerShow('profile.html',this.id);
    var com_id=app._getUrlParameters(pp.data("url"), 'paremeter');
    var tablet=app._getUrlParameters(pp.data("url"), 'next');
    var back=app._getUrlParameters(pp.data("url"), 'back');
    var name=app._getUrlParameters(pp.data("url"), 'name');
    var domStr='';    
    pp.on('click', '#header a',function(){
         _mobile.changePage('profile.html', { changeHash: true, reverse: true });
    })
    pp.find('span.tablet').text(decodeURI(name));
 
}).on('pageshow','#profilePoint',function(e) {
        var com_id=app._getUrlParameters($(this).data("url"), 'paremeter');
    var tablet=app._getUrlParameters($(this).data("url"), 'next');
    app._getProfilePoint(com_id,tablet);
    app._ga_trackView('profilePoint','');
    //app._loadingHide();
}).on('pageshow','#easylife2',function(e) { 
    app._getAQXInfo();
     app._getUVInfo(24.16519,120.669912);

    var swiper2 = new Swiper("#ezCgy .swiper-container", {
        pagination: "#ezCgy .swiper-pagination",
        slidesPerView: 3,
        paginationClickable: true,
        spaceBetween: 30
    });
    var swiper = new Swiper("#choiceArt .swiper-container", {
        pagination: "#choiceArt .swiper-pagination",
        slidesPerView: 3,
        paginationClickable: true,
        spaceBetween: 5,
        freeMode: true
    });
}).on('pagebeforehide','#easylife2',function(e) { 
     document.removeEventListener("backbutton",_onBackPageEasy, false);
}).on('pageinit','#easylife2',function(e) { 
    document.addEventListener("backbutton",_onBackPageEasy, false);
   $(this).on('click','#header a:eq(0)',function(){
         _mobile.changePage('index.html', { changeHash: true, reverse: true });
    }).on('click','#gasPrice',function(){
        _mobile.changePage('gasStationPrice.html', { changeHash: true });  
    }).on('click','#gas',function(){
         _mobile.changePage('gasStationList.html', { changeHash: true });
    }).on('click','#iculture_btn',function(){
         _mobile.changePage('iculture.html', { changeHash: true });
    }).on('click','#calender',function(){

    }).on('click','#scan',function(){
        app._loadingShow();
        setTimeout(function(){
            cordova.plugins.barcodeScanner.scan(
              function (result) {
                   app._loadingHide();
                   
                  alert("We got a barcode\n" +
                        "Result: " + result.text + "\n" +
                        "Format: " + result.format + "\n" +
                        "Cancelled: " + result.cancelled);

              }, 
              function (error) {
                  alert("Scanning failed: " + error);
              },
              {
                 "formats" : "QR_CODE,CODE_39",
                 "prompt" : "請對準掃描須要開通裝置之條碼或QRCode",
                 "orientation" : "landscape" 
              }
           );
        },500);         
    });
}).on('pageinit','#iculture',function(e) { 
    $(this).on('click','#header a:eq(0)',function(){
        _mobile.changePage('easylife2.html', { changeHash: true, reverse: true  });
    });
}).on('pageshow','#iculture',function(e) { 
        var checkTouch=0;

    $(this).find('#iculture_title').append(app._getActivityType());
    var galleryThumbs = new Swiper('#iculture .gallery-thumbs2', {
        slidesPerView: 3,
        paginationClickable: true,
        spaceBetween: 5,
        freeMode: true
    });
}).on('pagebeforehide','#gasStationPrice',function(){ 
    document.removeEventListener("backbutton",_onBackPageGasPrice, false);
}).on('pagebeforecreate','#gasStationPrice',function(){  
    app._loadingShow();  
    $(this).find('.gasStationPrice-content').attr('style','height:'+ (_tmpHeight-51) +'px;');
}).on('pageinit','#gasStationPrice',function(){
     document.addEventListener("backbutton",_onBackPageGasPrice, false);
    $(this).on('click','#header a:eq(0)',function(){
         _mobile.changePage('easylife.html', { changeHash: true, reverse: true });
    }).on('click','#header a:eq(1)',function(){
         _mobile.changePage('gasStationList.html', { changeHash: true });
    });
}).on('pageshow','#gasStationPrice',function(){

      app._getCPCMainPrice($(this));
      app._ga_trackView('gasStationPrice','');
}).on('pagebeforehide','#gasStationList',function(e){
    document.removeEventListener("backbutton",_onBackPageGasList, false);
}).on('pageinit','#gasStationList',function(e){
    document.addEventListener("backbutton",_onBackPageGasList, false);
    var temph=0;
    var gsl=$(this);
    gsl.on('click','#header a:eq(0)',function(){
         _mobile.changePage('easylife.html', { changeHash: true, reverse: true }); 
    }).on('click','#station_list li a',function(){
        app._loadingShow();
        var id=$(this);
        var idarr =id.find('input').val().split(':');
        var sn=idarr[0];
        var lat=idarr[1];
        var lon=idarr[2];
        //gsl.find('#station_list').remove();
        _mobile.changePage('gasStationPin.html', { changeHash: true ,data:{sn:sn,lat:lat,lon:lon,h:document.body.scrollTop,name:id.find('span.title').text()}});
    //取消篩選
    //}).on('click','#header a:eq(1) i:eq(0)',$.proxy(function(e){
        // $(this).find('.view-filter').show().siblings().hide();
    //},this))
    }).on('click','.load-more',$.proxy(function(e){
        var id=$(e.currentTarget);
        _km=10;
        id.find('span').text('載入中...');
        id.find('.s-loading').show();
        setTimeout(function(){
            app._getCPCMainStationList(_geoLat,_geoLon,document.body.scrollTop,'list');
            id.hide();

            //$(id).find('span').text('點擊載入更多…');
            //$(id).find('.s-loading').hide();
        },500);
    
    },this)).on('click','#header a:eq(1)',$.proxy(function(e){
        var id=$(e.currentTarget);
        if(id.find('i').attr('class')=='icon-map-location'){

            temph= document.body.scrollTop;
            id.find('i').attr('class','icon-gas-list');
            id.find('span').text('列表');
            if(gsl.find('#temp_json').val().length>0){
            app._loadingShow();
            gsl.find('#listMap').show().siblings().hide();
             var mapDiv = document.getElementById("listMap");
              const lm = new plugin.google.maps.LatLng(_geoLat,_geoLon);
              _map = plugin.google.maps.Map.getMap(mapDiv, {
                'camera': {
                  'latLng': lm,
                  'zoom': 14
                }           
            });
            _map.addEventListener(plugin.google.maps.event.MAP_READY, function() {
                var gas=JSON.parse(gsl.find('#temp_json').val());
                 _map.animateCamera({
                    'target': lm,
                    'zoom': 14,
                    'duration':500
                  }, function() { 
                    _map.addMarker({
                      'position': lm,
                      'title': "目前位置"
                      //'draggable': true
                  },function(marker){
                     marker.showInfoWindow();
                     marker.addEventListener(plugin.google.maps.event.MARKER_DRAG_END, function(marker) {
                        marker.getPosition(function(latLng) {
                          app._loadingShow();
                          app._getCPCMainStationList(latLng.toUrlValue().split(',')[0],latLng.toUrlValue().split(',')[1],0,'map');                           
                          marker.setTitle(latLng.toUrlValue());
                          marker.showInfoWindow();
                        });
                      });
                  });
                });
                $.each(gas.info, function (i, v) { 
                    if(v.km < _km){
                    ma = new plugin.google.maps.LatLng(v.latitude,v.longitude);
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
                           marker.getPosition(function(latLng) {                          
                          navigator.notification.confirm(
                            '是否啟用導行模式', // message
                                function (idx) {                
                                    if(idx==1){
                                         plugin.google.maps.external.launchNavigation({
                                          "from": lm,
                                          "to": latLng.toUrlValue()
                                        });
                                    }          
                                },        
                                '今網行動管家訊息',
                                ['導航','關閉',] 
                            ); 
                           });
                      }
                    },function(marker){
                    });
                    }
                });
                 app._loadingHide(500);
            });
}
        }else{
            _map.clear();
            _map.off();
            id.find('i').attr('class','icon-map-location');
            id.find('span').text('地圖');
            gsl.find('.view-list').show().siblings().hide();
            $('html, body').animate({scrollTop:temph},400); 
        }
        return false;
    },this));
}).on('pagebeforehide','#gasStationList',function(e) { 
    app._loadingShow();
    if(_map!=undefined){
       _map.clear();
       _map.off();
    }
}).on('pageshow','#gasStationList',function(e) { 
    var gsl=$(this);
    var h=app._getUrlParameters(gsl.data("url"), 'h');
    //gsl.find('#listMap').attr('style','height:'+ (_tmpHeight-51) +'px;').find('div.locator').show().siblings().hide();
    gsl.find('#listMap').attr('style','height:'+ (_tmpHeight-51) +'px;');
    gsl.find('.load-more').show();
    navigator.geolocation.getCurrentPosition(function(position){
        _geoLat=position.coords.latitude;
        _geoLon=position.coords.longitude;
        app._setLocalStorage('glat',_geoLat);
        app._setLocalStorage('glon',_geoLon);
        app._getCPCMainStationList(_geoLat,_geoLon,h,'list');
    }, function(){
        gsl.find('div.locator').show();
        if(app._getLocalStorage('glat') !=undefined && app._getLocalStorage('glon') != undefined){
            app._dialog('請開啟手機定位功能，以便獲得更佳使用體驗。');
            app._getCPCMainStationList(app._getLocalStorage('lat'),app._getLocalStorage('lon'),h,'list');
        }else{
            app._dialog('請開啟手機定位功能。');
        }

    });    
    app._ga_trackView('gasStationList','');
}).on('pagebeforehide','#gasStationPin',function(){
  _map.setClickable(true); 
    _map.clear();
    _map.off();
}).on('pageinit','#gasStationPin',function(){
    var gsp=$(this);
    var name=app._getUrlParameters(gsp.data("url"), 'name');
    var h=app._getUrlParameters(gsp.data("url"), 'h');  
    gsp.find('#pagename').text(decodeURI(name));
    gsp.on('click','#header a:eq(0)',function(){
        _mobile.changePage('gasStationList.html', { changeHash: true, reverse: true,data:{h:h} });

    }).on('click','#stn_add',function(){
        if(app._getLocalStorage('glat') !=undefined && app._getLocalStorage('glon') != undefined){
            navigator.notification.confirm(
            '是否啟用導行模式', // message
                function (idx) {                
                    if(idx==1){
                         plugin.google.maps.external.launchNavigation({
                          "from": _geoLat+','+_geoLon,
                          "to": $('#stn_add').find('input').val()
                        });
                    }          
                },        
                '今網行動管家訊息',
                ['導航','關閉'] 
            ); 
        }else{
            var ref=window.open("http://maps.google.com/?q="+$(this).find('input').val(), '_system');
        }
    });
}).on('pageshow','#gasStationPin',function(){   
    var gsp=$(this);
    var map_touch=false; 
    var sn=app._getUrlParameters(gsp.data("url"), 'sn');
    var lat=app._getUrlParameters(gsp.data("url"), 'lat');
    var lon=app._getUrlParameters(gsp.data("url"), 'lon');
    gsp.find('.gasStationPin-content').attr('style','height:'+ (_tmpHeight-51) +'px;');
    gsp.find('#map_canvas').attr('style','height:'+ (_tmpHeight-127) +'px;')
    gsp.on('click','div.map-info',function(e){
          var container = gsp.find("#stn_add");
        var container2 = gsp.find("#stn_t");
        if ((!container.is(e.target) 
            && container.has(e.target).length === 0) && (!container2.is(e.target) 
            && container2.has(e.target).length === 0))
        {
            if(gsp.find(".more-ul").is(':hidden')==true){       
                  gsp.find(".more-ul").toggle();   
                  var tops=gsp.find(".map-info").offset();  
                  app._mapRenew(mapDiv,stn,(tops.top-51));
                  _map.animateCamera({
                    'target': stn,
                    'zoom': 13,
                    'duration':500
                  }, function(marker) { 
                    map_touch=true;
                    marker.showInfoWindow();
                  });
                _map.setClickable(false); 
                
             }else{

                app._mapRenew(mapDiv,stn,(_tmpHeight-127));
                _map.setClickable(true);                               
                map_touch=false; 
                gsp.find(".more-ul").toggle();  
             }  
             

        }
    }).on('click','#map_canvas',function(e){

        if(gsp.find(".more-ul").is(':hidden')==false && map_touch==true){
            app._mapRenew(mapDiv,stn,(_tmpHeight-127));
            _map.setClickable(true);                 
            gsp.find(".more-ul").toggle();
            map_touch=false; 
        }
    });
    var mapDiv = document.getElementById("map_canvas");
      const stn = new plugin.google.maps.LatLng(lat,lon);
      _map = plugin.google.maps.Map.getMap(mapDiv, {
        'camera': {
          'latLng': stn,
          'zoom': 13
        }
    });
      _map.addEventListener(plugin.google.maps.event.MAP_READY, function() {
         
        _map.animateCamera({
            'target': stn,
            'zoom': 13,
            'duration':500
          }, function() { 
            if(_geoLat!=0 && _geoLon!=0){
                const latlon = new plugin.google.maps.LatLng(_geoLat,_geoLon);
                _map.addMarker({
                  'position': latlon,
                  'title': "目前位置",
                  'icon':'red'
                }, function(marker) {
                });
            }
            _map.addMarker({
                'position': stn,
                'icon': 'blue'
            }, function(marker) {
              app._gasStationPinInfo(marker,sn,gsp,lat,lon);
            });              
        });

      });
      app._ga_trackView('gasStationPin','');
}).on('pageinit','#easylife',function(e) { 
      document.addEventListener("backbutton",_onBackPageEasy, false);
      var easylife=$(this);
    easylife.on('click','#header a:eq(0)',function(){
         _mobile.changePage('index.html', { changeHash: true, reverse: true });
    }).on('click','#easy_gas',function(){  
       app._ga_trackEvent('easyLife','gasPrice','油價',1);
            _mobile.changePage('gasStationPrice.html', { changeHash: true });
    }).on('click','#easy_map',function(){  
       app._ga_trackEvent('easyLife','gasMapList','油價',1);
         _mobile.changePage('gasStationList.html', { changeHash: true });  
    }).on('click','#df',function(){  
       app._ga_trackEvent('easyLife','df','大豐環保',1);
        _mobile.changePage('adDetail.html', { changeHash: true, data: { 'paremeter':'17020101','next':'easylife.html' }});
    }).on('click','.easylife-content ul li a',function(){
        /*
        app._loadingShow();
        var category=$(this).find('input[type=hidden]').val();
        $.getJSON(app._getActivityOpenData(category), function( data ) {
            _openDataActivity=data;
             var pros =new Object();
            pros.items=new Array();
            var returnedData = $.grep(_openDataActivity, function (ele, index) {
                var getCity =$.grep(_openDataActivity[index].showInfo,function(val,idx){
                    return val.location.indexOf('台中') != -1;
                });
                if(getCity !=''){
                    var ep=new Object();
                    ep.version=ele.version//版本
                    ep.UID=ele.UID;//活動id
                    ep.title=ele.title;//活動名稱
                    ep.category=ele.category;//活動類別
                    ep.showInfo=ele.showInfo;
                    ep.showUnit=ele.showUnit;//演出單位
                    ep.discountInfo=ele.discountInfo;//折扣資訊
                    ep.descriptionFilterHtml=ele.descriptionFilterHtml;//簡介說明
                    ep.imageUrl=ele.imageUrl;//代表圖片url
                    ep.masterUnit=ele.masterUnit;//主辦單位
                    ep.subUnit=ele.subUnit;//協辦單位
                    ep.supportUnit=ele.supportUnit;//贊助單位
                    ep.otherUnit=ele.otherUnit;//其它單位
                    ep.webSales=ele.webSales;//售票網址
                    ep.sourceWebPromote=ele.sourceWebPromote;//推廣網址
                    ep.comment=ele.comment;//備註
                    ep.editModifyDate=ele.editModifyDate;//編輯時間
                    ep.sourceWebName=ele.sourceWebName;//來源網站名稱
                    ep.startDate=ele.startDate;//活動起始日期
                    ep.endDate=ele.endDate;//活動結束日期
                    ep.status=ele.status;//狀態
                    ep.total=ele.total;//總筆數
                    ep.hitRate=ele.hitRate;//點閱率
                    pros.items.push(ep);
                }                   
            });   
           // alert(JSON.stringify(pros));  
            app._loadingHide(400);

        }).fail(function( jqxhr, textStatus, error) {     
            _openDataActivity=[];
            app._loadingHide(400);
        });
          */
           
    });
    if(tempStore ==undefined){       
         socket.emit('get_store',{
            'uuid':device.uuid,
            'type':'info'
        }).on('sendStore_'+device.uuid,function(data) {
            tempStore=data;
            app._getStroesDomList(tempStore,function(dom){
                easylife.find('ul.list').html(dom+easylife.find('ul.list').html());
            });
         });
    }else{
          app._getStroesDomList(tempStore,function(dom){
            easylife.find('ul.list').html(dom+easylife.find('ul.list').html());
        });
    }
    app._loadingShow();
}).on('pagebeforehide','#easylife',function(e){
      document.removeEventListener("backbutton",_onBackPageEasy, false);
   //_map.clear();
   //_map.off();
}).on('pageshow','#easylife',function(e) { 
    app._footerShow('easylife.html',this.id);
    /*
    var jsonArr = new Array();
    var jsonObj =new Object();
    jsonObj.city='台中市';
    jsonObj.area='潭子區';
    jsonObj.lat=0.0;
    jsonObj.lon=0.0;
    jsonObj.km=0;
    jsonArr = jsonArr.concat(jsonObj);
    //alert(JSON.stringify(jsonArr));
    $.ajax({
        dataType: 'json',
        url: app._getWebServiceMethod('getSTNStation'),
        data:{val:JSON.stringify(jsonArr)},
        type: 'post',
        async: true,
        complete: function(){app._loadingHide();},
        success: function (datas) {
            $.each(datas,function(i,v){
              //  alert(i);
            });
        }
    });



  var mapDiv = document.getElementById("map_canvas");
navigator.geolocation.getCurrentPosition(function(position){
     const latLng = new plugin.google.maps.LatLng(position.coords.latitude,position.coords.longitude);
          var lat=position.coords.latitude;
          var lon=position.coords.longitude;
          _map = plugin.google.maps.Map.getMap(mapDiv, {
            'camera': {
              'latLng': latLng,
              'zoom': 14
            }
          });
$.getJSON(app._getActivityOpenDataByLat(position.coords.latitude,position.coords.longitude), function( data ) {
        var arr = new Array();
        $.each( data, function( key, val ) {
           var title=val.title;
            $.each(val.showInfo,function(idx,v){
                if(idx==0){
                    var obj=new Object();
                    obj.lat=position.coords.latitude;
                    obj.long=position.coords.longitude;
                    obj.title='您目前所在位置';
                    arr = arr.concat(obj);
                }
                 var obj=new Object();
                 obj.lat=v.latitude;
                 obj.long=v.longitude;
                 obj.uid=val.UID;
                 obj.title=[title, '位置：'+v.locationName,'地址：'+v.location].join("\n");
                 obj.snippet='活動日期：'+ v.time.split(' ')[0]+'~'+ v.endTime.split(' ')[0]+'\n開放時間：'+ v.time.split(' ')[1]+'~'+ v.endTime.split(' ')[1]+'\n票價：'+ v.price.replace('\r\n','');
                 arr = arr.concat(obj);
            });
            
        });
        var locatonList = arr;
        latLng = new plugin.google.maps.LatLng(position.coords.latitude,position.coords.longitude);
        var lat=position.coords.latitude;
        var lon=position.coords.longitude;
          _map = plugin.google.maps.Map.getMap(mapDiv, {
            'camera': {
              'latLng': latLng,
              'zoom': 14
            }
          });

                _map.addEventListener(plugin.google.maps.event.MAP_READY, function() {

                    for(var locIndex = 0;locIndex<locatonList.length;locIndex++){
                            var locObj = new plugin.google.maps.LatLng(locatonList[locIndex].lat,locatonList[locIndex].long);
                            _map.addMarker({
                                   'position': locObj,
                                   'title': locatonList[locIndex].title,
                                   'uid':locatonList[locIndex].uid,
                                   'snippet': locatonList[locIndex].snippet,
                                    'infoClick': function(marker) {
                                        alert(marker.getHashCode());
                                        marker.remove();
                                    }
                            }, function(marker) {
                                 // marker.showInfoWindow(); // Show infowindow
                            });
                    }
                });
    });
}, function(){});

    app._getCPCMainProdListPrice($(this));
    $.getJSON(app._getActivityOpenDataMeta(), function( data ) {
        $.each( data, function( key, val ) {
            $('.easylife-content ul').append("<li><a id='moc_"+ val.categoryCode +"'><input type='hidden' value='"+val.categoryCode+"' />"+val.categoryName+"</a></li>");

        });
    });
*/
    app._loadingHide(400); 
    app._ga_trackView('easylife',''); 
}).on('pageinit','#paymentFee',function(e) { 
    app._footerShow('paymentFee.html',this.id);
}).on('pageshow','#paymentFee',function(e) { 
    app._loadingHide();
}).on('pagebeforehide','#paymentFee,#payment',function(e) { 
    if(this.id=='payment'){
        document.removeEventListener('backbutton',_onBackPageCash,false);
    }
    app._loadingShow();
}).on('pagebeforecreate','#payment',function(e) {
    app._loadingShow();
}).on('pageinit','#payment',function(e) {    
    app._footerShow('payment.html',this.id);
    document.addEventListener('backbutton',_onBackPageCash,false);
    $(this).on('click','#header a:eq(0)',function(){
        if(app._getLocalStorageJson('com_count') =='1')
        {
            _mobile.changePage("index.html", { changeHash: true, reverse: true });
        }else{
            _mobile.changePage("communityList.html", { changeHash: true, reverse: true, data:{'paremeter':'payment.html'} });
        }
    }).on('click','#payment_list li a',function(){
          var com_id=this.querySelectorAll('input')[0].value;
          var bank_id=this.querySelectorAll('input')[1].value;
          var user_id=this.querySelectorAll('input')[2].value;
          var expired=0;
          $.each(JSON.parse(app._getLocalStorage('fee')).info, function (i, v){
              if(bank_id==v.bank_id && v.date_check=='expired'){
                expired=1;
              }
          });

          switch(this.querySelectorAll('input')[3].value){
            case 'B':
            if(expired==1){
               navigator.notification.confirm(
                '提醒您，管理費已過繳費期限，請先與管理室確認繳費事宜。\n\n繼續前往繳費頁面?', // message
                function(idx){
                    if(idx==1){
                      _mobile.changePage("paymentCvs.html", { changeHash: true, data:{com:com_id,bank:bank_id,user:user_id} });
                    }
                 },
                '今網行動客服訊息',
                ['確定','取消']
               )
            }else{
              _mobile.changePage("paymentCvs.html", { changeHash: true, data:{com:com_id,bank:bank_id,user:user_id} });
            }       
            break;
            default:
                app._dialog('尚未開放');
            break;
          }
          return false;
    });
}).on('pageshow','#payment',function(e) {
    var pay=$(this);
    var payThis=this;
    var com_id=app._getUrlParameters(pay.data("url"), '');
    var domStr='';
    if(app._getLocalStorage('fee')=='' || JSON.parse(app._getLocalStorage('fee')).com !=com_id){
      $.ajax({
        url: app._getWebServiceMethod('getCommunityFeeList'),
        data: { 'com_id': com_id,'code': app._getLocalStorageJson('code')},
        type: 'post',
        async: true,
        complete: function(){app._loadingHide(400)},
        success: function (datas) {
           var status=datas.status;
           if(status=='no_use'){
                app._setLocalStorage('fee','{"com":"'+ com_id +'","status":"'+ status +'"}');
                pay.find('.closedWrap,#header a:eq(1)').show();
           }else{
                app._setLocalStorage('fee','{"com":"'+ com_id +'","status":"'+ status +'","type":"'+ datas.type +'","info":'+ datas.info +'}');
                pay.find('#payment_list').html(app._feeList(JSON.parse(app._getLocalStorage('fee')),com_id)).trigger('create');
                pay.find('.listWrap').show();
                if(pay.find('#payment_list').html()==''){
                    pay.find('.desc_txt,#payment_list,.tips-date').hide();
                    pay.find('.empty').attr('style','height:'+ _tmpHeight-payThis.querySelector('#header').offsetHeight - payThis.querySelector('#footer').offsetHeight +'px;').show();
                }
           }
        }
      });
    }else{
      var fee=JSON.parse(app._getLocalStorage('fee'));
      if(fee.status=='no_use'){
        pay.find('.closedWrap,#header a:eq(1)').show();
      }else{
        pay.find('#payment_list').html(app._feeList(fee,com_id)).trigger('create');
         pay.find('.listWrap').show();
        if(pay.find('#payment_list').html()==''){
           pay.find('.desc_txt,#payment_list,.tips-date').hide();
           pay.find('.empty').attr('style','height:'+ _tmpHeight-payThis.querySelector('#header').offsetHeight - payThis.querySelector('#footer').offsetHeight +'px;').show();
        }
      }
      app._loadingHide();
    }
    if(document.getElementById('index').querySelector('#cashflow_btn span').innerText=='!'){
        document.getElementById('index').querySelector('#cashflow_btn span').style.display='none';
    }
     app._ga_trackView('payment','');
}).on('pageinit','#paymentCvs',function(e){
    var payCvs=$(this);
     var com_id=app._getUrlParameters(payCvs.data("url"), 'com');
     var bank_id=app._getUrlParameters(payCvs.data("url"), 'bank');
     var user_id=app._getUrlParameters(payCvs.data("url"), 'user');
     var save=app._getUrlParameters(payCvs.data("url"), 'save');
     var domStr='';
    var _showTab = 0;
    var $defaultDi = payCvs.find('div.navbar a').eq(_showTab).addClass('active');

    //$($defaultDi.attr('href')).siblings().hide();
    payCvs.on('click','div.navbar a:not(.out)',function () {

        $('div.navbar a').removeClass('active');
        var $this = $(this),
        _clickTab = $this.attr('href');
        $this.addClass('active');      
        var h=(_tmpHeight-payCvs.find('.desc_txt').height()-payCvs.find('.navbar').height()-payCvs.find('#header').height());
        $(_clickTab).stop(false, true).show().siblings().hide();
        if($(_clickTab).height() < h){
          $(_clickTab).attr('style','height:'+ h +'px;');
        }
        return false;
    }).on('click', '#header a:eq(0)', function () {
                if(save !=''){
            _mobile.changePage('index.html', { changeHash: true, reverse: true});    
                }else{
           _mobile.changePage('payment.html', { changeHash: true, reverse: true, data: { 'paremeter': com_id } });
                }
    }).on('click', '#header a:eq(1)', function () {
           $.each(jsonVal, function (i, v){
                if(v.bank_id==bank_id && v.user_id==user_id){
                  payCvs.find('#fee_name').text(v.bank_ym+' 管理費明細');
                  payCvs.find('#fee_tablet').text(v.community+'-'+v.tablet_note);
                  payCvs.find('#fee_list').html('');
                  $.each(JSON.parse(v.fee_list), function (idx, val){
                     payCvs.find('#fee_list').append('<li>'+ val.n +'<span>'+val.f+'</span></li>');
                  });
                  payCvs.find('.num').text(v.fee);
                  payCvs.find('.num').prepend('<span>NT$</span>');
                }
            });
          payCvs.find('.alert-p-content').show();
           payCvs.find('.alert-p-content div.container').attr('style','margin-top:-'+ ((payCvs.find('.alert-p-content').height()/2/2)+35) +'px;');
          
     }).on('click','#alertdo',function(){
          payCvs.find('.alert-p-content').hide(); 
     }).on('click','#bright_cbx',function(){//設定發亮
        if ($(this).is(":checked") == true) {
            app._setBrightness(1);
        }else{
            app._setBrightness(_getBrightnessVal);
        };
     }).on('click','#saveCode',function(){
        var pros =new Object();
        var count=0;
        pros.items=new Array();
        //加入最新的一筆記錄
        $.each(JSON.parse(app._getLocalStorage('fee')).info, function (i, v){
            if(v.bank_id==bank_id && v.user_id==user_id){
                var ep=new Object();
                ep.community=v.community;
                ep.com_id=com_id;
                ep.tablet_note=v.tablet_note;
                ep.bank_ym=v.bank_ym;
                ep.code1=v.code1;
                ep.code2=v.code2;
                ep.code3=v.code3;
                ep.bank_code1=v.bank_code1;
                ep.bank_code2=v.bank_code2;
                ep.bank_code3=v.bank_code3;
                ep.bank_sn=v.bank_sn;
                ep.bank_tel=v.bank_tel;
                ep.bank_address=v.bank_address;
                ep.atm_note=v.atm_note;
                ep.mm_banksn=v.mm_banksn;
                ep.mm_tobank=v.mm_tobank;
                ep.atm=v.atm;
                ep.note=v.note;
                ep.mm_bank=v.mm_bank;
                ep.due_date=v.due_date;
                ep.date_check=v.date_check;
                ep.bank_charge=v.bank_charge;
                ep.bank_id=v.bank_id;
                ep.user_id=v.user_id;
                ep.fee=v.fee;
                ep.fee_list=v.fee_list;
                pros.items.push(ep);
            }
        });
        //原記錄保留最近兩筆
        if(app._getLocalStorage('bc')!=null && app._getLocalStorage('bc')!=''){
           $.each(JSON.parse(app._getLocalStorage('bc')).items, function (i, v){
                if(count<2 && v.bank_id!=bank_id && v.user_id!=user_id){
                  var ep=new Object();
                  ep.community=v.community;
                  ep.com_id=com_id;
                  ep.tablet_note=v.tablet_note;
                  ep.bank_ym=v.bank_ym;
                  ep.code1=v.code1;
                  ep.code2=v.code2;
                  ep.code3=v.code3;
                  ep.bank_code1=v.bank_code1;
                  ep.bank_code2=v.bank_code2;
                  ep.bank_code3=v.bank_code3;
                  ep.bank_sn=v.bank_sn;
                  ep.bank_tel=v.bank_tel;
                  ep.bank_address=v.bank_address;
                  ep.atm_note=v.atm_note;
                  ep.mm_banksn=v.mm_banksn;
                  ep.mm_tobank=v.mm_tobank;
                  ep.atm=v.atm;
                  ep.note=v.note;
                  ep.mm_bank=v.mm_bank;
                  ep.due_date=v.due_date;
                  ep.date_check=v.date_check;
                  ep.bank_charge=v.bank_charge;
                  ep.bank_id=v.bank_id;
                  ep.user_id=v.user_id;
                  ep.fee=v.fee;
                  ep.fee_list=v.fee_list;
                  pros.items.push(ep);
                  count++
                }
           });
        }
        app._setLocalStorage('bc',JSON.stringify(pros));
       // $('#index').find('#cashflow_btn span').text(JSON.stringify(pros).length).show();
        document.getElementById('index').querySelector('#cashflow_btn span').innerText=JSON.stringify(pros).length;
        document.getElementById('index').querySelector('#cashflow_btn span').style.display='block'
        //document.querySelectorAll('#index #cashflow_btn span').style.display='block';
        app._dialog('繳費條碼已儲存，可於無網路環境狀態下開啟');
     });
      var jsonVal;
      if(save=='yes'){
        payCvs.find('#saveCode').hide();//儲存條碼來源無需在出現
        jsonVal=JSON.parse(app._getLocalStorage('bc')).items;
      }else{
        jsonVal=JSON.parse(app._getLocalStorage('fee')).info;
      }
      if(jsonVal.length > 0){
            $.each(jsonVal, $.proxy(function (i, v){
                if(v.bank_id==bank_id && v.user_id==user_id){
                     var _code=$(this);
                    _code.find('div.desc_txt h5 span').text(v.bank_ym);
                    _code.find('.amount,#cvs_total').text(v.fee);
                    _code.find('#bk_due,#bk_due2').text(v.due_date);
                    _code.find('.dateline').text('(繳費期限 '+v.due_date+')');
                    _code.find('#bk_name,#bk_name2').text(v.mm_bank);
                    _code.find('div.note ul li:eq(0)').text(v.bank_charge);
                    app._setBarcode($('#barcode1'), v.code1);
                    app._setBarcode($('#barcode2'), v.code2);
                    app._setBarcode($('#barcode3'), v.code3);
                    app._setBarcode($('#code1'), v.bank_code1);
                    app._setBarcode($('#code2'), v.bank_code2);
                    _code.find('#cvs_code1').text(v.bank_code1);
                    _code.find('#cvs_code2').text(v.bank_code2);
                    if(v.bank_code3 !='')
                    {
                        app._setBarcode($('#code3'), v.bank_code3);
                        _code.find('#cvs_code3').text(v.bank_code3);
                        _code.find('#is_code3').show();
                    }
                    if(v.mm_tobank =='0'){
                        if(v.mm_banksn ==''){
                           _code.find('div .navbar').hide();
                        }else{
                           _code.find('div .navbar ul li:eq(1)').hide();
                        }
                            
                    }

                    for(var x=0;x<v.note.split('\r\n').length;x++){
                       _code.find('#tab1 div.note ul').append('<li>'+v.note.split('\r\n')[x]+'</li>');
                    }
                    if(v.is_payment=='1'){
                      payCvs.find('.empty-check').addClass('open');
                      payCvs.find('#bank_barcode,.atmWrap,.atmNotes,.note').hide();
                      payCvs.find('.desc_txt_02 div.cvs').hide();
                    }else{
                      if(v.date_check=='expired'){
                          payCvs.find('div.empty').addClass('open');
                          if(v.bank_code1!=''){
                               payCvs.find('div.navbar a').removeClass('active');
                               _clickTab=payCvs.find('div.navbar a:eq(1)');
                               _clickTab.addClass('active');
                               $(_clickTab.attr('href')).stop(false, true).show().siblings().hide();
                          }
                      }else{
                        payCvs.find('.cvs-barcode').addClass('open');
                      }
                    }  
                    //不顯示條碼期限                                   
                    //_code.find('.cvs_due').text(v.code1.substring(2,4)+'/'+ v.code1.substring(4,6));
                    _code.find('#cvs_sn').text(v.code1.substring(6,9));
                    _code.find('#cvs_market').text(v.code2.substring(2,7));
                    _code.find('#cvs_cust').text(v.code2.substring(7,16));
                    _code.find('#cvs_code').text(v.code3.substring(4,6));
                    _code.find('#atm_sn').text(v.mm_banksn);
                    _code.find('#atm_name').text(v.mm_bank);
                    _code.find('#atm_account').text(v.atm);
                    if(v.bank_sn !=''){
                    _code.find('#tab3 div.note ul').append('<li>主辦分行：'+ v.bank_sn +' '+ v.bank_tel +'<br/>'+v.bank_address+'</li>');
                    }
                    if(v.atm_note !=''){
                    _code.find('.atmNotes').html(v.atm_note);
                    }
                                    
                    if(v.mm_banksn !=''){
                        if(v.mm_tobank=='1'){
                             _code.find('.col-2').attr('class','col-3').show();
                        }else{
                            _code.find('div .navbar ul li:eq(2)').show();
                                   
                                   
                         }
                       
                    }
                }
            },this));
      }
     
}).on('pageshow','#paymentCvs',function(e){
      app._loadingHide();
      app._setBrightness(1);
       app._ga_trackView('paymentCvs','');
}).on('pagebeforehide','#paymentCvs',function(e) {
    app._setBrightness(_getBrightnessVal);
}).on('pagebeforecreate','#communityGas',function(e){
  app._loadingShow();
}).on('pageinit','#communityGas',function(e){
    app._footerShow('communityGas.html',this.id);
    var com_id=app._getUrlParameters($(this).data("url"), '');
    var _gas=$(this);
    var _gasEvent=this;
    _gas.on('click','#header a:eq(0)',function(){
         if(app._getLocalStorageJson('com_count') =='1')
         {
            _mobile.changePage("index.html", { changeHash: true, reverse: true });
         }else{           
            _mobile.changePage("communityList.html", { changeHash: true, reverse: true, data:{'paremeter':'communityGas.html'} });
         } 
    }).on('keyup','input',function(e){
        var keyval=$(this).parent().next().val();
        _gas.find('#gasEdit').hide();
          app._checkMaxInput($(this),$('#len_limit'),1);
        if(this.value==''){
            this.parentNode.parentNode.querySelector('label').innerHTML='<i class="icon-cursor"></i>';
        }else{
            this.parentNode.parentNode.querySelector('label').innerHTML='';
            _gas.find('#in'+keyval).prop("disabled", false).focus();
        }
         if(this.id=='in3' && this.value.length==1){
             var r  =  /^[0-9]+$/
            if(_gas.find('#in0').val()=='' || r.test(_gas.find('#in0').val())==false){
                _gas.find('.fill-in').addClass('error');
            }else if(_gas.find('#in1').val()=='' || r.test(_gas.find('#in1').val())==false){
                _gas.find('.fill-in').addClass('error');
            }else if(_gas.find('#in2').val()=='' || r.test(_gas.find('#in2').val())==false){
                _gas.find('.fill-in').addClass('error');
            }else if(_gas.find('#in3').val()=='' || r.test(_gas.find('#in3').val())==false){
                _gas.find('.fill-in').addClass('error');
            }else{
                _gas.find('.fill-in').removeClass('error');
                _gas.find('#gasEdit').show();
            }
        }
    }).on('keydown','input',function(e){
        app._checkMaxInput($(this),$('#len_limit'),1);
        var keyval=$(this).parent().next().val();
        _gas.find('#gasEdit').hide();
         if(this.value==''){
            this.parentNode.parentNode.querySelector('label').innerHTML='<i class="icon-cursor"></i>';
        }else{
            this.parentNode.parentNode.querySelector('label').innerHTML='';     
            _gas.find('#in'+keyval).prop("disabled", false).focus();
         }
        if(this.id=='in3' && this.value.length==1){
            var r  =  /^[0-9]+$/
            if(_gas.find('#in0').val()=='' || r.test(_gas.find('#in0').val())==false){
                _gas.find('.fill-in').addClass('error');
            }else if(_gas.find('#in1').val()=='' || r.test(_gas.find('#in1').val())==false){
                _gas.find('.fill-in').addClass('error');
            }else if(_gas.find('#in2').val()=='' || r.test(_gas.find('#in2').val())==false){
                _gas.find('.fill-in').addClass('error');
            }else if(_gas.find('#in3').val()=='' || r.test(_gas.find('#in3').val())==false){
                _gas.find('.fill-in').removeClass('error');
            }else{
                _gas.find('#gasEdit').show();
            }
            
        }
    }).on('focus','input',function(){
      if(this.id!='in0'){
       
    
        if(_gas.find('#in0').val()==''){
          _gasEvent.querySelectorAll('label').innerHTML='';
          _gas.find('#in0').focus();

        }
        
      }
         _gas.find('.icon-click,#gasEdit').hide();
           var keyval=$(this).parent().next().val();
           for(var i=keyval-1;i<4;i++){
              _gas.find('#in'+i).val('');
           }
          this.value='';
      if(this.id!='in0' && _gas.find('#in0').val()==''){
      }else{
        this.parentNode.parentNode.querySelector('label').innerHTML='<i class="icon-cursor"></i>';
      }
    }).on('blur','input',function(){
        if(this.value==''){
            _gas.find('.icon-click').show();
            this.parentNode.parentNode.querySelector('label').innerHTML='';
        }
    }).on('click','#alertdo',function(){
        _gasEvent.querySelector('#gasUnopenDiv').style.display='none';
        _gasEvent.querySelector('.alert-gas-content').style.display='none';
        if(app._getLocalStorageJson('com_count') =='1')
         {
            _mobile.changePage("index.html", { changeHash: true, reverse: true });
         }else{           
            _mobile.changePage("communityList.html", { changeHash: true, reverse: true, data:{'paremeter':'communityGas.html'} });
         } 
    }).on('click','#gasEdit',function(){
        app._loadingShow();
        var val1=_gasEvent.querySelector('#in0').value;
        var val2=_gasEvent.querySelector('#in1').value;
        var val3=_gasEvent.querySelector('#in2').value;
        var val4=_gasEvent.querySelector('#in3').value;
        var r  =  /^[0-9]+$/
        for(var i=0;i<4;i++){
              if(_gasEvent.querySelector('#in'+i).value =='' || r.test(_gasEvent.querySelector('#in'+i).value)==false){
                _gas.find('.fill-in').addClass('error');
                app._loadingHide();
                return false;
              }
        }
        var obj=new Object();
        obj.device_sn=app._getLocalStorageJson('code');
        obj.com_id=com_id;
        obj.tablet_id=_gasEvent.querySelector('#tabletId').value;
        obj.g_id=_gasEvent.querySelector('#g_id').value;
        obj.g_value=val1+val2+val3+val4;
        if(_gasEvent.querySelectorAll('.data ul li')[0].querySelector('span').innerText !='無'){
          if( parseInt(obj.g_value)<parseInt(_gasEvent.querySelectorAll('.data ul li')[0].querySelector('span').innerText)){
              app._dialog('登記參數不可低於'+_gasEvent.querySelectorAll('.data ul li')[0].querySelector('span').innerText);
              app._loadingHide();
              return false;
          }
        }
        $.ajax({
            dataType: 'json',
            url: app._getWebServiceMethod('editGasValue'),
            type: 'post',
            data:{ jsonStr:'['+JSON.stringify(obj)+']'},
            async: true,
            complete: function(){app._loadingHide();},
            success: function (datas) {
              if(datas.status=='success'){
                app._dialog('已完成登記');
                _gas.find('#gasEdit').hide();
              }else{
                app._dialog('登記失敗，請稍後再嘗試');
              }
            }
        });


    });

}).on('pageshow','#communityGas',function(e){
   // var tabletInfo=app._getLocalStorage('tablet_list');
    //if(tabletInfo==null || tabletInfo==''){
        var _gas=this;
        var com_id=app._getUrlParameters($(this).data("url"), '');
        var tabletInfo;
        var count=0;

        $(this).on('click','#tablet',function(){

            if(count>1){  
              var options=new Object();
              options.title='請選擇您的戶別號碼';
              options.addCancelButtonWithLabel='取消';
              options.androidEnableCancelButton=true;
              options.buttonLabels=new Array();

              $.each(tabletInfo, function (i, v) {
                  if(v.id==com_id){
                      options.buttonLabels.push(v.tablet_note);
                  }
              });

              window.plugins.actionsheet.show(options, function(buttonIndex){

                  var total=0;
                  $.each(tabletInfo, function (i, v) {
                      if(v.id==com_id){
                          total++;
                          if(total==buttonIndex){
                              app._loadingShow();
                               app._getGasMainStatus(com_id,tabletInfo[buttonIndex-1].tablet_id,function(data){
                                   app._getGasTabletInfo(com_id,data,tabletInfo,_gas,count,buttonIndex-1);
                                
                                 
                                  app._loadingHide();
                              });
                          }

                      }
                  });
              });
            }
        });
        app._getTabletList(function(datas){
            if(datas !='fail' && datas !='[]'){
                tabletInfo=JSON.parse(datas);
                var objarr=[];
              
                $.each(tabletInfo,function(i,v){
                    if(com_id==v.id){
                        var obj=new Object();
                      obj.id=v.id;
                      obj.city=v.city;
                      obj.community=v.community;
                      obj.tablet_note=v.tablet_note;
                      obj.tablet_id=v.tablet_id;
                      objarr.push(obj);
                      count++;
                    }
                })
                tabletInfo=objarr;
                objarr=null;
                app._getGasMainStatus(com_id,tabletInfo[0].tablet_id,function(data){
                    app._getGasTabletInfo(com_id,data,tabletInfo,_gas,count,0);
                    app._loadingHide();
                });
            }else{
              app._loadingHide();
               app._dialog('連線錯誤，請在嘗試一次');
               _mobile.changePage('index.html', { changeHash: true, reverse: true });   
            }  
        });
    app._ga_trackView('communityGas','');
}).on('pageinit','#feedbackEdit_v2',function(e) { 
    var fb=$(this);
    var fbe=this;
    var arr=['其他建議','公設異常','檢舉申訴','居家報修','社區管理建議','App問題與建議'];
    var par=app._getUrlParameters(fb.data("url"), ''); 
        app._footerShow('feedbackEdit.html',this.id);
       app._registerLabelInput(fb);
    fb.on('click', '#header a:eq(0)', function () {
        _mobile.changePage('feedback.html', { changeHash: true, reverse: true, data: { 'paremeter': par } });  
     }).on('keyup','#msg',function(){
        app._checkMaxInput($(this),$('#len_limit'),250);
          if($(this).val() !=''){
            $('#submitBtn span').attr('class','submit');
          }else{
              $('#submitBtn span').attr('class','');
          }
          this.style.cssText = 'height:auto; padding:0';
          this.style.cssText = 'height:' + this.scrollHeight + 'px';
    }).on('keydown','#msg',function(){
        app._checkMaxInput($(this),$('#len_limit'),250);
          if($(this).val() !=''){
            $('#submitBtn').attr('class','btn-act');
          }else{
            $('#submitBtn span').attr('class','');
          }
          this.style.cssText = 'height:auto; padding:0';
          this.style.cssText = 'height:' + this.scrollHeight + 'px';
    }).on('click','#attach_img',function(){

         var ref = window.open('data:image/jpeg;base64,'+ this.querySelector('input').value, '_blank', 'location=no');
         return false;
    }).on('click','#attach_del',function(){

          var attaImg=document.getElementById('attachmentShow');
          var attaBtn=document.getElementById('attachmentAdd');
          var image = document.getElementById('attach_img');
          attaImg.className = "info attatchPhotoView";
          attaBtn.style.display = "block";
          image.setAttribute('style','');
          image.querySelector('input').value='';
    }).on('click','#attachmentAdd',function(){
        if(this.querySelector('.s-loading').style.display !='block'){
            var options = { 
                'title': '請選擇取用模式?',
                'buttonLabels': ['拍照', '選擇照片'],
                'addCancelButtonWithLabel': '取消' 
            };       
            window.plugins.actionsheet.show(options, app._onActionSheet);
        }
   
    }).on('click','.cgyOption',function(){

        var config=new Object();
         config.selectedValue=fbe.querySelector('#hiddenType').value;
        config.title='請選擇類別';
        config.items=new Array();
        for(var i=0;i<arr.length;i++){
            var item=new Object();
            item.text= arr[i];
            item.value= i;
            config.items.push(item); 
        }

        window.plugins.listpicker.showPicker(config, 
            function(item) { 
               fbe.querySelector('#hiddenType').value=item;
               fbe.querySelector('.cgyOption span').innerText=arr[item];
               fbe.querySelector('.cgyTips').innerText=app._feedbackDesc(parseInt(item));
               fbe.querySelector('.cgyTips').className='cgyTips show';
            },
            function() { 
               
            }
        );
            
    }).on('click','#submitBtn',function(){
          if(fb.find('#msg').val()==''){
          app._dialog('請輸入意見回饋!');
          return false;
          }
          app._loadingShow();
          var base64_str=document.getElementById('attach_img').querySelector('input').value;
          var obj=new Object();
          obj.comId=par;
          obj.code=app._getLocalStorageJson('code');
          obj.msg=fb.find('#msg').val();
          obj.img=base64_str;
          obj.msgType=fbe.querySelector('#hiddenType').value;
          app._sendMesaage(JSON.stringify(obj),function(datas){
                var str;
                if(datas.status=='success'){
                    str='謝謝您的建議，管委會將盡快回覆!';
                    if(datas.msg=='file'){
                        str=str+'\n附檔照片上傳成功。';
                    }
                }else{
                    if(base64_str!=''){
                        str=str+'\n\n很抱歉，附檔照片上傳失敗，可能問題為：\n';
                        str=str+'1.請檢查網路環境。\n';
                        str=str+'2.伺服器繁忙，請稍後在試一次。\n'
                    }else{
                        str='您的建議傳送失敗。';
                    }
                }
                app._dialog(str,'message',par);
          });        
    });

});


