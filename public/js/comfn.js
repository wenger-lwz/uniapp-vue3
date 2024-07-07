$(function lazyload() {
  var screenHeight = $(window).height()
  $('body img.lazys').each(function () {
    if ($(this).offset().top < screenHeight) {
      var src = $(this).attr('data-src')
      if (src) {
        $(this).attr('src', src).attr('onload', 'imgload(this)').removeAttr('data-src')
      }
    } else {
      if (nopic != '') {
        $(this).attr('src', nopic)
      }
    }
  })
  window.addEventListener('scroll', function () {
    var img = $('img.lazys')
    if (img.length <= 0) {
      window.removeEventListener('scroll', arguments.callee)
      return false
    } else {
      var h = $(document).scrollTop() + screenHeight + 300
      setTimeout(function () {
        $('img.lazys').each(function () {
          if ($(this).offset().top < h) {
            var src = $(this).attr('data-src')
            if (src) {
              $(this).attr('src', src).attr('onload', 'imgload(this)').removeAttr('data-src').removeClass('lazys')
            }
          }
        })
      }, 50)
    }
  })
  window.imgError = function (_this) {
    _this.src = shop_url + 'public/image/nopic.png'
    _this.onerror = null
  }

  window.imgload = function (_this) {
    $(_this).removeClass('lazys showloading').removeAttr('onload')
  }

  $(document).on('click', '.vpwdbtn', function () {
    var pwd = $('.vpwdval').val()
    if (pwd && parseInt(pwd) == base_id) {
      $('.fc_vpwd_box').remove()
      setCookie('isvpwd', 'ok' + base_id, 1)
    } else {
      shake('fc_vpwd_box')
      $('.vpwdval').val('')
    }
  })
  $(document).on('click', 'img[data-href]', function () {
    var url = $(this).attr('data-href')
    if (url && url != '') {
      window.open(url)
    }
  })
  recentlyViews()
  if (getUrlParam('fbclid')) {
    var t = new Date().getTime()
    var img = new Image()
    img.src = base_url + 'home/unload?t=' + t + window.location.search.replace('?', '&')
  }
})
var tdeb = null
function debouncex(fn, wait) {
  wait = wait || 500
  tdeb && clearTimeout(tdeb)
  tdeb = setTimeout(fn, wait)
}
function ispostMessage() {
  return !!window.postMessage
}

function shake(o) {
  var $panel = $('.' + o)
  box_left = ($(window).width() - $panel.width()) / 2
  $panel.css({ left: box_left, position: 'absolute' })
  for (var i = 1; 4 >= i; i++) {
    $panel.animate({ left: box_left - (40 - 10 * i) }, 50)
    $panel.animate({ left: box_left + 2 * (40 - 10 * i) }, 50)
  }
}

function changeUrl(burl, domain) {
  if (burl != domain) {
    $('body a').each(function () {
      //遍历所有的a标签
      var href = $(this).attr('href') //替换成访问的域名
      if (href && href.indexOf(burl) >= 0) {
        $(this).attr('href', href.replace(burl, domain))
      }
    })
  }
}

function setCookie(name, value, days) {
  if (value) {
    if (!days) days = 10 //定义一天
    var exp = new Date()
    exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000)
    // 写入Cookie, toGMTString将时间转换成字符串
    document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString + ';path=/'
  }
}

function getCookie(name) {
  var arr,
    reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)') //匹配字段
  if ((arr = document.cookie.match(reg))) {
    return unescape(arr[2])
  } else {
    return null
  }
}

function load_pp_btn(pp_data, order_data, mchid) {
  if (!mchid) return //未绑定pp不显示按钮
  var script = document.createElement('script')
  var head = document.getElementsByTagName('head')[0]
  script.type = 'text/javascript'
  script.charset = 'UTF-8'
  script.async = 'async'
  script.onload = script.onreadystatechange = function () {
    if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
      load_paypal(pp_data, order_data)
      script.onload = script.onreadystatechange = null
    }
  }
  script.src =
    'https://www.paypal.com/sdk/js?client-id=' +
    pp_data.client_id +
    '&commit=true&currency=' +
    pp_data.currency_code +
    '&locale=en_US&intent=' +
    pp_data.intent +
    '&merchant-id=' +
    mchid +
    '&components=buttons,funding-eligibility'
  head.appendChild(script)
  fc_tips_box()
}

function fc_tips_box() {
  if ($('.tips_box').length > 0) return
  var tips_html = $(
    "<div class='tips_box'><div class='tips_article'><div class='tips_article_head'><div class='tips_article_title'></div><div class='check_article_close' onclick='hide_tips()'>X</div></div><div class='tips_article_con'></div></div></div><style type='text/css'>.tips_box{position:fixed;height:100%;overflow:auto;width:100vw;min-height:100vh;top:0;left:0;background:rgba(0,0,0,0.5);padding:80px 50px;z-index:9999;display:none}.tips_box .tips_article{background:white;border:1px solid #ccc;border-radius:10px;max-width:380px;margin:auto;min-height:calc(60vh - 120px)}.tips_box .tips_article_head{padding:12px 20px;display:flex;justify-content:space-between;font-size:24px;border-bottom:1px solid #ccc;color:#333}.tips_box .tips_article_head .tips_article_title{width:100%;text-align:center}.tips_box .tips_article_con{padding:30px;line-height:20px;font-size:16px;color:#545454;text-align:center;font-family:'Helvetica Neue',sans-serif}</style>"
  )
  $($('body')[0]).append(tips_html)
}
function show_tips(title, cont) {
  $('.tips_article_title').text(title)
  $('.tips_article_con').html(cont)
  $('.tips_box').show()
}

function show_alert(cont) {
  var alert_html = $(
    "<div class='alert_html'><div class='alert_conts'><div class='alert_title'>" +
      cont +
      "</div></div></div><style type='text/css'>.alert_html{position:fixed;height:100%;overflow:auto;width:100vw;min-height:100vh;top:0;left:0;background:rgba(0,0,0,0.5);padding:20% 50px;z-index:9999;}.alert_html .alert_conts{background:white;border:1px solid #ccc;border-radius:15px;max-width:380px;margin:auto}.alert_html .alert_title{padding:12px 20px;font-size:20px;width:100%;text-align:center}</style>"
  )
  $($('body')[0]).append(alert_html)
  setTimeout(function () {
    $('.alert_html').remove()
  }, 2000)
}

function fc_page_loading() {
  var loading_html = $(
    "<div class='fc-loading'><style>.fc-loading{position:fixed;top:0;left:0;z-index:1060;display:flex;align-items:center;justify-content:center;width:100%;height:100%;background:rgba(255,255,255,.8)}.fc-loading_content,.fc-loading_content::after{width:3em;height:3em;border-radius:50%}.fc-loading_content{position:relative;font-size:10px;border-top:.16em solid #f0f0f0;border-right:.16em solid #f0f0f0;border-bottom:.16em solid #f0f0f0;border-left:.16em solid #c4c4c4;transform:translateZ(0);animation:load 1.1s infinite linear}@keyframes load{ 0%{ transform:rotate(0)} 100%{ transform:rotate(360deg)} }</style><div class='fc-loading_content'></div></div>"
  )
  $($('body')[0]).append(loading_html)
  setTimeout(function () {
    $('.fc-loading').remove()
  }, 15000)
}

function fc_loading_hide() {
  setTimeout(function () {
    $('.fc-loading').remove()
  }, 800)
}

function hide_tips() {
  $('.tips_box').hide()
}

function pp_style() {
  var pstyle = { layout: 'horizontal', size: 'responsive', shape: 'pill', fundingicons: false, tagline: false, height: 40 }
  return pstyle
}

function load_paypal(pp_data, order_data) {
  paypal.getFundingSources().forEach(function (fundingSource) {
    if (pp_data.funding == 'all' || fundingSource === pp_data.funding) {
      var button = paypal.Buttons({
        env: pp_data.env,
        commit: true,
        style: pp_data.style,
        fundingSource: fundingSource,
        createOrder: function () {
          fc_page_loading()
          var formData
          if (typeof order_data === 'function') {
            formData = order_data()
          } else {
            formData = order_data
          }
          if (!formData) {
            return
          }
          var source = formData.get('source')
          var curls = pp_data.burl + 'api/payment/createOrder'
          if (source == 'product_pp') {
            curls = pp_data.burl + 'api/cart/buy_now'
          } else if (source == 'checkout_pp') {
            curls = pp_data.burl + 'api/cart/checkout'
          }
          formData.append('funding', fundingSource)
          dLayers.push({ event: 'create_order', label: 'paypal-okey:' + pp_data.okey })
          return fetch(curls, { method: 'POST', body: formData })
            .then(function (response) {
              //console.log(response);
              var res = response.json()
              //console.log(res.ack);
              fc_loading_hide()
              return res
            })
            .then(function (resJson) {
              return resJson.data.id
            })
        },
        onApprove: function (data, actions) {
          var cont = '<img style="width:100px;margin:0 auto" src="' + pp_data.burl + 'public/image/loading.svg"/><br/><br/>'
          show_tips('In processing!', cont + '<p>Your order is being confirmed ... </p>')
          var approveOk = function (details) {
            show_tips('Payment succeeded!', cont + '<p>Your order is payment succeeded ... </p>')
            var amount = details.purchase_units[0].amount.value
            var osn = details.purchase_units[0].invoice_id
            var oData = new FormData()
            oData.append('order_id', details.id)
            oData.append('key_o', pp_data.okey)
            /*dLayers.push({'event':'pay_success','eid':osn,'label':details.id,'content_name':osn,'price':amount,'currency':details.purchase_units[0].amount.currency_code});*/
            return fetch(pp_data.burl + 'api/payment/getOrderDetail', { method: 'POST', body: oData })
              .then(function (res) {
                return res.json()
              })
              .then(function (res) {
                window.location.href = '/orders/' + details.id + '/' + pp_data.okey
              })
          }
          if (pp_data.intent == 'authorize') {
            return actions.order.authorize().then(function (details) {
              approveOk(details)
            })
          } else {
            return actions.order.capture().then(function (details) {
              approveOk(details)
            })
          }
        },
      })
      if (button.isEligible()) {
        button.render(pp_data.render_btn)
      }
    }
  })
}

function getUrlParam(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}

function TarckArray(fb, gg, url, tracks, shop) {
  this.fb = fb
  this.gg = gg
  this.url = url
  this.shop = shop
  this.tracks = tracks
  this.push = function (arg) {
    arg.shops = this.shop
    if (this.fb != '') {
      var events = { view_product: 'ViewContent', add_cart: 'AddToCart', checkout: 'InitiateCheckout', remove_from_cart: 'RemoveCart', create_order: 'AddPaymentInfo', pay_success: 'Purchase' }
      var evs = {}
      if (arg.eid) {
        evs.eventID = arg.eid
      }
      if (arg.content_name) {
        arg.content_name = this.shop + '=' + arg.content_name
      } else {
        arg.content_name = this.shop
      }
      fbq('track', events[arg.event], arg, evs)
    }
    if (this.gg != '') {
      gtag('event', arg.event, {
        event_category: 'ecommerce',
        event_label: arg.label,
        value: arg.price,
      })
    }
    if (arg.event != 'view_product') {
      var act = arg.event + '&'
      delete arg['event']
      for (var i in arg) {
        act += i + '=' + arg[i] + '&'
      }
      add_logs(this.url, 'event', act)
    }
    this.tracks(arg)
  }
}

function add_logs(base_url, ctl, act) {
  var t = new Date().getTime()
  var userid = getCookie('userid')
  if (userid) {
    t += '&sessionid=' + userid
  }
  var url = base_url + 'home/tasks?sctl=' + ctl + '&sact=' + act + '&uri=' + encodeURIComponent(window.location.pathname.substr(1)) + '&t=' + t + window.location.search.replace('?', '&')
  if (navigator.sendBeacon) {
    var j = navigator.sendBeacon(url + '&ss=navigator')
    if (j) {
      return
    }
  }
  var img = new Image()
  img.src = url
}

function formatMoney(symbol_code, number, places, thousand, decimal) {
  number = number || 0
  if (symbol_code == 'VND') {
    places = 0
    thousand = '.'
    decimal = ''
  } else {
    places = !isNaN((places = Math.abs(places))) ? places : 2
    thousand = thousand || ','
    decimal = decimal || '.'
  }
  var negative = number < 0 ? '-' : '',
    i = parseInt((number = Math.abs(+number || 0).toFixed(places)), 10) + '',
    j = (j = i.length) > 3 ? j % 3 : 0
  return (
    negative +
    (j ? i.substr(0, j) + thousand : '') +
    i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) +
    (places
      ? decimal +
        Math.abs(number - i)
          .toFixed(places)
          .slice(2)
      : '')
  )
}

function fc_vpwd_box() {
  var vpwd_html = $(
    "<div class='fc_vpwd_box' style='position:fixed;top:0;right:-100px;bottom:0;left:-100px;z-index: 1040;background-color:#000000;opacity:0.5;text-align:center'><div style='margin:100px auto;padding:60px 10px 40px 30px;min-height:300px;max-width:600px;background:#ffffff; border:1px solid #DFDFDF; border-radius:3px;font-size:14px'><h3>试用期间请输入店号继续访问店铺</h3><br/><input style='height:35px;line-height:35px;width:60%;border-radius:3px;padding-left:10px;display:inline-block' class='vpwdval'/><input type='button' value='确定' style='height: 35px;line-height:35px;background-color:#3a3a3a;color:#fff;border:none;padding:0 20px;font-weight:bold;cursor:pointer;display:inline-block' class='vpwdbtn'/></div></div>"
  )
  if (getCookie('isvpwd') != 'ok' + base_id) $($('body')[0]).append(vpwd_html)
}

var recentlyViewName = 'recentlyCookie'
function recentlyViews() {
  var N = 10
  var proid = $('#productid').val()
  if (proid == null || proid == '') {
    return
  }
  var proids = getCookie(recentlyViewName)
  if (proids == null) {
    setCookie(recentlyViewName, proid, 10)
  } else {
    var proids_arr = proids.split(',')
    proids = proid
    for (var i = 0; i < proids_arr.length; i++) {
      if (proids_arr[i] != proid) {
        proids = proids + ',' + proids_arr[i]
        if (i >= N - 1) {
          break
        }
      }
    }
    setCookie(recentlyViewName, proids, 10)
  }
}

function isMobile() {
  var uAgent = navigator.userAgent
  var agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
  var ismobile = false
  for (var v = 0; v < agents.length; v++) {
    if (uAgent.indexOf(agents[v]) > 0) {
      ismobile = true
      break
    }
  }
  if (!ismobile) {
    var w = window.screen.width
    var h = window.screen.height
    if (w < 500 && h < 800) {
      ismobile = true
    }
  }
  return ismobile
}
var key_o = getCookie('okey')
if (!key_o) {
  key_o = Math.random().toString(8).substr(2)
  if (key_o.length > 16) {
    key_o = key_o.substr(0, 16)
  }
  setCookie('okey', key_o, 10)
}
