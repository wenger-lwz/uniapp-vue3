var provinces = []
$(function () {
  setTimeout(function () {
    $('.inputVal').blur()
  }, 100)
  $('.checkoutU_discount_btn').on('click', function (e) {
    e.preventDefault()
    var code = $(this)
      .parent('.checkoutU_discount')
      .children('.checkoutU_discountL')
      .children('.checkoutU_discount_val')
      .val()
    if (code == '') {
      return
    }
    var that = this
    $(that).find('.checkoutU_btn-text').fadeOut(10)
    $(that).find('.fa-circle-o-notch').fadeIn(10)
    $('.checkoutU_discount_tip').hide()
    var step = getUrlParam('step')
    $.ajax({
      url: shop_url + 'checkouts/discount_check',
      type: 'POST',
      data: { key_o: okey, code: code, step: step },
      datatype: 'json',
      success: function (json) {
        $(that).find('.checkoutU_btn-text').fadeIn(10)
        $(that).find('.fa-circle-o-notch').fadeOut(10)
        var discount_price = 0
        if (json.state == 'ok') {
          if (json.data.ctype == '2') {
            $('.checkoutU_detail .shipp_price').html('Free')
            setTimeout('window.location.reload()', 500)
          } else {
            $('.discount_box .discount_num').text(json.data.discount + '%OFF')
            discount_price = json.data.money
            $('.discount_box .discount_price').text(
              '- ' + cur_symbol + discount_price + cur_symbolr
            )
            $('.discount_box').removeClass('phide')
            $('.checkoutU_discount_tip').hide()
          }
        } else {
          $('.discount_box').addClass('phide')
          $('.checkoutU_discount_tip').show()
        }
        $('.discount_box .discount_price').attr(
          'discount_price',
          discount_price
        )
        var sprice = $('input[type=radio][name=shipping_method]:checked').attr(
          'price'
        )
        if (!sprice || sprice == 'undefined') {
          sprice = 0
        }
        var total = parseFloat(json.prices.total_price)
        var data_price = total
        if (step == 'contact_information') {
          var total =
            parseFloat(json.prices.total_price) -
            parseFloat(json.prices.shipp_price)
        } else if (step == 'shipping_method') {
          var total =
            parseFloat(json.prices.total_price) -
            parseFloat(json.prices.shipp_price) +
            parseFloat(sprice)
          data_price = parseFloat(json.prices.total_price)
        }
        $('.show_total').text(cur_symbol + total.toFixed(2) + cur_symbolr)
        $('.show_total').attr('data', data_price.toFixed(2))
      },
      error: function () {
        $('.discount_box').hide()
        $('.checkoutU_discount_tip').show()
        $(that).find('.checkoutU_btn-text').fadeIn(10)
        $(that).find('.fa-circle-o-notch').fadeOut(10)
      },
    })
  })

  $('.yfxissel').click(function () {
    var that = this
    setTimeout(function () {
      isinsurance($(that).hasClass('checkoutD_form_checkbox_active'))
    }, 500)
  })

  function isinsurance(isi) {
    var price = parseFloat($('.yfxissel').attr('price'))
    if (price <= 0) {
      return
    }
    var data_price = parseFloat($('.show_total').attr('data'))
    if (isi) {
      var insurance = 1
      data_price = data_price + price
      $('.insurance_boxs').removeClass('phide')
    } else {
      if (!$('.insurance_boxs').hasClass('phide')) {
        data_price = data_price - price
      }
      var insurance = 0
      $('.insurance_boxs').addClass('phide')
      $('.yfxissel').removeClass('checkoutD_form_checkbox_active')
    }
    $('.show_total').html(cur_symbol + data_price.toFixed(2) + cur_symbolr)
    $('.show_total').attr('data', data_price.toFixed(2))
    debouncex(function () {
      $.ajax({
        url: shop_url + 'payment/saveCheckout',
        type: 'POST',
        data: 'source=insurance&insurance=' + insurance + '&okey=' + okey,
        datatype: 'json',
      })
    }, 1000)
  }

  $('input[type=radio][name=shipping_method]').change(function () {
    var price = parseFloat($(this).attr('price'))
    var data = $('.show_total').attr('data')
    var shipp_price = $('.checkoutU_detail .shipp_price').attr('data')
    if (!shipp_price || shipp_price == 'undefined') {
      shipp_price = 0
    }
    if (price <= 0) {
      $('.shipp_price').html('Free')
    } else {
      $('.shipp_price').html(cur_symbol + price + cur_symbolr)
    }
    $('.show_total').html(
      cur_symbol +
        (parseFloat(data) - parseFloat(shipp_price) + price).toFixed(2) +
        cur_symbolr
    )
  })

  $('.checkoutD_service>a').on('click', function (e) {
    e.preventDefault()
    var title = $(this).html()
    var links = $(this).attr('href')
    get_text_by_link(title, links)
  })

  $('.check_article_close').click(function () {
    $('.check_article_box').hide()
  })
  $('.check_article').click(function (e) {
    e.stopPropagation()
  })
  $('.check_article_box').click(function () {
    $('.check_article_box').hide()
  })
  $('.checkoutU_discount_val').on('input propertychange', function () {
    if ($(this).val() == '') {
      $(this)
        .parents('.checkoutU_discount')
        .children('.checkoutU_discount_btn')
        .removeClass('checkoutU_btn_active')
    } else {
      $(this)
        .parents('.checkoutU_discount')
        .children('.checkoutU_discount_btn')
        .addClass('checkoutU_btn_active')
    }
  })

  $('.inputVal').on('input propertychange', function () {
    propertychange(this)
  })

  function propertychange(that) {
    if ($(that).val() == '') {
      $(that).css({
        'padding-top': '0px',
      })
      $(that).parent('.inputBox').children('.inputText').hide()
    } else {
      $(that)
        .parent('.inputBox')
        .children('.inputText')
        .fadeIn(function () {
          var n = 14
          if ($(that).hasClass('sinp')) {
            n = 22
          }
          $(that).css({
            'padding-top': n + 'px',
          })
        })

      if ($(that).attr('id') == 'expiracmy') {
        var z = $(that).attr('z')
        var yy = $(that).attr('yy')
        var v = $(that).val()
        var l = v.length
        if ((l != 3 && isNaN(v[l - 1])) || v[3] < yy[0]) {
          $(that).val(v.substring(0, l - 1))
          return
        }
        $(that).attr('z', l)
        if (l == 1) {
          if (parseInt(v) >= 2) {
            $(that).attr('z', 3)
            $(that).val('0' + v + '/')
          }
        } else if (l == 2) {
          if (parseInt(z) > l) {
            $(that).attr('z', 1)
            $(that).val(v[0])
          } else {
            if (parseInt(v) <= 12) {
              $(that).attr('z', 3)
              $(that).val(v + '/')
            } else {
              $(that).attr('z', 4)
              $(that).val('0' + v[0] + '/' + v[1])
            }
          }
        }
      }
    }
  }
  $('.inputVal').blur(function () {
    propertychange(this)
    $(this).removeClass('inputBox_active')
    $('.sdiv').removeClass('inputBox_active')
    $('i.select-down').removeClass('select-down-active')
    setTimeout(function () {
      debouncex(function () {
        $.ajax({
          url: shop_url + 'payment/saveCheckout',
          type: 'POST',
          data: $('#checkForm').serialize(),
          datatype: 'json',
        })
      }, 800)
    }, 200)
  })
  $('.inputVal').focus(function () {
    propertychange(this)
    if (
      this.id == 'country' ||
      this.id == 'bcountry' ||
      this.id == 'province' ||
      this.id == 'bprovince'
    ) {
      $('.sdiv').addClass('inputBox_active')
    } else if (this.id == 'expiracmy') {
      $('.sdivmark').show()
      $('.cexdiv').addClass('inputBox_active')
      $(this).parent('div.inputBox').find('.cexdiv').css('display', 'flex')
    }
    $(this).addClass('inputBox_active').removeClass('error')
    $('.respshow').html('').parents('div.shipping_box').hide()
    $('label#' + this.name + '-error').remove()
  })

  $('.checkoutD_form_checkbox').click(function () {
    if ($(this).hasClass('checkoutD_form_checkbox_active')) {
      $(this).removeClass('checkoutD_form_checkbox_active')
    } else {
      $(this).addClass('checkoutD_form_checkbox_active')
    }
  })

  $('.inputVal').outerHeight()

  $('.Phone_boxtop').click(function () {
    var Itme = $(this).find('.angle_down').css('display')
    if (Itme !== 'none') {
      $(this).find('.angle_down').css('display', 'none')
      $(this).find('.angle_up').css('display', 'block')
      $(this).next().stop().slideDown(500)
    } else {
      $(this).find('.angle_down').css('display', 'block')
      $(this).find('.angle_up').css('display', 'none')
      $(this).next().stop().slideUp(500)
    }
  })

  $('.query,.query1').on('mouseover', function () {
    $(this).find('.query_text').stop().fadeIn(1000)
    $('.query,.query1').mouseout(function () {
      $(this).find('.query_text').stop().fadeOut(1000)
    })
    return false
  })

  $('.tip_box_inputBox input').focus(function () {
    $(this).prev('.inputText').show()
    $(this).addClass('inputVal_tip_active')
    $('.tip_box_inputBox').addClass('tip_box_inputBox_active')
  })
  $('.tip_box_inputBox input').blur(function () {
    if ($(this).val() == '') {
      $(this).prev('.inputText').hide()
      $(this).removeClass('inputVal_tip_active')
      $(this)
        .parents('.tip_box_custom')
        .find('.custom_tip_btn')
        .removeClass('custom_tip_btn_active')
    } else {
      $(this)
        .parents('.tip_box_custom')
        .find('.custom_tip_btn')
        .addClass('custom_tip_btn_active')
    }
    $('.tip_box_inputBox').removeClass('tip_box_inputBox_active')
  })

  $('.inputVal_tip').on('input propertychange', function () {
    $('.tip_box_error').hide()
    $('.tip_box_inputBox').removeClass('error')
    if ($(this).val() == '') {
      $(this)
        .parents('.tip_box_custom')
        .find('.custom_tip_btn')
        .removeClass('custom_tip_btn_active')
      $('.tip_box_inputBox .inputText').hide()
    } else {
      $(this)
        .parents('.tip_box_custom')
        .find('.custom_tip_btn')
        .addClass('custom_tip_btn_active')
      $('.tip_box_inputBox .inputText').show()
    }
  })

  $('.tip_box_item').click(function () {
    $('.tip_box_item').removeClass('tip_box_item_active')
    $(this).addClass('tip_box_item_active')
    tip_price = $(this).find('.tip_box_item_price').text()
    updateTip(tip_price, okey)
  })

  $(document).on('click', '.custom_tip_btn_active', function () {
    var custom_price = $('.inputVal_tip').val()
    if (
      parseFloat($('.inputVal_tip').val()) >
      parseFloat($('.inputVal_tip').attr('data-max'))
    ) {
      $('.tip_box_error').show()
      $('.tip_box_inputBox').addClass('error')
    } else {
      $('.tip_box_item').removeClass('tip_box_item_active')
      updateTip($('.inputVal_tip').val(), okey)
    }
  })

  function updateTip(tip_price, okey) {
    tip_price = parseFloat(tip_price)
    if (tip_price > 0) {
      $('.tip_boxs').removeClass('phide')
      $('.custom_tip_btn').html('Update tip')
    } else {
      $('.tip_boxs').addClass('phide')
      $('.custom_tip_btn').html('Add tip')
    }

    var tip = $('.tip_boxs').attr('data')
    $('.tip_boxs').attr('data', tip_price)
    $('.tip_boxs .tip_box_price').html(
      cur_symbol + tip_price.toFixed(2) + cur_symbolr
    )
    var data = $('.show_total').attr('data')
    var total = parseFloat(data) - parseFloat(tip) + tip_price
    $('.show_total').html(
      cur_symbol + parseFloat(total).toFixed(2) + cur_symbolr
    )
    $('.show_total').attr('data', parseFloat(total).toFixed(2))
    $.ajax({
      url: shop_url + 'checkouts/tips',
      type: 'POST',
      data: { tips: tip_price, okey: okey },
      datatype: 'json',
    })
  }

  $(document).on('click', '.sdivmark', function () {
    $('.sdiv').hide()
    $('.cexdiv').hide()
    $('.sdivmark').hide()
    $('i.select-down').removeClass('select-down-active')
  })

  $(document).on('click', '.cexdiv li', function () {
    $(this).addClass('sel').siblings().removeClass('sel')
    var cexbox = $(this).parents('div.inputBox:eq(0)')
    var m = cexbox.find('ul.selul:eq(0)').find('li.sel')
    var isok = 0
    var ismy = ''
    if (m.length) {
      isok++
      ismy = m.attr('data-value') + '/'
    }
    var y = cexbox.find('ul.selul:eq(1)').find('li.sel')
    if (m.length && y.length) {
      isok++
      ismy += y.attr('data-value')
    }
    var inpobj = cexbox.find('#expiracmy')
    inpobj.val(ismy)
    if (isok > 1) {
      if (y.attr('data-value') == '20') {
        inpobj.focus()
      }
      $('.cexdiv').hide()
      $('.sdivmark').hide()
    }
  })

  function taxset(t, code) {
    var gscn = ''
    if (t == 'country') {
      gscn = 'G' + code
      var taxobj = $('.taxconfs .' + gscn)
    } else if (t == 'province') {
      gscn = 'G' + $('#country_code').val() + 'S' + code
      var taxobj = $('.taxconfs .' + gscn)
    } else {
      return
    }
    var issave = false
    if (taxobj.length > 0) {
      issave = true
      var np = parseFloat(taxobj.attr('p'))
      var op = parseFloat($('.tax_boxs').attr('data'))
      $('.tax_boxs').attr('data', np).removeClass('phide')
      $('.tax_boxs .checkoutU_detailL')
        .attr('onclick', "show_tax_tips('" + gscn + "')")
        .find('span')
        .text(taxobj.attr('t'))
      $('.tax_boxs .tax_box_price span').text(np)
      var data_price = parseFloat($('.show_total').attr('data'))
      data_price = data_price + np - op
      $('.show_total').html(cur_symbol + data_price.toFixed(2) + cur_symbolr)
      $('.show_total').attr('data', data_price.toFixed(2))
    } else {
      if (t == 'country') {
        issave = true
        $('.tax_boxs').attr('data', 0).addClass('phide')
      } else {
        taxset('country', $('#country_code').val())
      }
    }
  }

  $(document).on('click', '.sdiv li', function () {
    var val = $(this).attr('data-value')
    var code = $(this).attr('data-code')
    if (!val) {
      return
    }
    $(this).parents('.sdiv').hide()
    var select = $(this).parents('.sdiv')
    select.find('input.search').val('')
    select.hide()
    $('.sdivmark').hide()
    $(this)
      .parents('div.inputBox')
      .find('i.select-down')
      .removeClass('select-down-active')
    var t = select.attr('data-type')
    $('#' + t)
      .val(val)
      .css({ 'padding-top': '14px' })
      .parents('.inputBox')
      .children('.inputText')
      .fadeIn()
    $('#' + t + '_code').val(code)
    if (t == 'country' || t == 'bcountry') {
      var b = ''
      if (t == 'bcountry') {
        b = 'b'
      }
      var province_data = countrys_params[code]
      if (
        province_data &&
        province_data['states'] &&
        province_data['states'].length != 0
      ) {
        provinces = province_data['states']
        $('#' + b + 'country,#' + b + 'postal_val')
          .parent('div.inputBox')
          .removeClass('inputBox_half')
          .addClass('inputBox_third')
        $('#' + b + 'province')
          .parent('div.inputBox')
          .show()
      } else {
        $('#' + b + 'country,#' + b + 'postal_val')
          .parent('div.inputBox')
          .addClass('inputBox_half')
          .removeClass('inputBox_third')
        $('#' + b + 'province')
          .parent('div.inputBox')
          .hide()
      }
    }
    if (t == 'country') {
      var gjs = $('.yfx_box').attr('show_gjs')
      if (gjs && gjs != '') {
        if (gjs.indexOf(code) >= 0) {
          $('.yfx_box').removeClass('phide')
        } else {
          $('.yfx_box').addClass('phide')
          if (!$('.insurance_boxs').hasClass('phide')) {
            isinsurance(false)
          }
        }
      }
    }
    taxset(t, code)
  })
  $('.select_icon').click(function () {
    inpfocus(this)
  })
  $('.search').on('input propertychange', function (e) {
    var v = $(this).val().toUpperCase()
    var select = $(this).parent('.sdiv')
    var t = select.attr('data-type')
    var items = select.find('ul.selectItems')
    items.html('')
    var has = false
    if (t == 'country' || t == 'bcountry') {
      $.each(countrys_params, function (c, n) {
        if (
          c.substring(0, v.length).toUpperCase().indexOf(v) >= 0 ||
          n.name.substring(0, v.length).toUpperCase().indexOf(v) >= 0
        ) {
          items.append(
            '<li data-code="' +
              c +
              '" data-value="' +
              n['name'] +
              '">' +
              n['name'] +
              '</li>'
          )
          has = true
        }
      })
    } else if (t == 'province' || t == 'bprovince') {
      $.each(provinces, function (i, p) {
        if (
          i.substring(0, v.length).toUpperCase().indexOf(v) >= 0 ||
          p.substring(0, v.length).toUpperCase().indexOf(v) >= 0
        ) {
          items.append(
            '<li data-code="' + i + '" data-value="' + p + '">' + p + '</li>'
          )
          has = true
        }
      })
    }
    if (!has) {
      items.append('<li>No matches found</li>')
    }
    return false
  })

  var ccode = $('#country_code').val()
  if (typeof countrys_params != 'undefined' && ccode != '') {
    var province_data = countrys_params[ccode]
    if (
      province_data &&
      province_data['states'] &&
      province_data['states'].length != 0
    ) {
      $('#country')
        .val(province_data.name)
        .css({ 'padding-top': '14px' })
        .parent('.inputBox')
        .children('.inputText')
        .fadeIn()
      provinces = province_data['states']
    } else {
      $('#country,#postal_val')
        .parent('div.inputBox')
        .addClass('inputBox_half')
        .removeClass('inputBox_third')
      $('#province').parent('div.inputBox').hide()
    }
  }
})

function inpfocus(obj) {
  var select = $(obj).parent('div.inputBox').find('.sdiv')
  var t = select.attr('data-type')
  var items = select.find('ul.selectItems')
  items.html('')
  var sel = $('#' + t + '_code').val()
  if (t == 'country' || t == 'bcountry') {
    $.each(countrys_params, function (c, n) {
      var s = ''
      if (sel == c) {
        s = 'class="sel"'
      }
      var item =
        '<li ' +
        s +
        ' data-code="' +
        c +
        '" data-value="' +
        n['name'] +
        '">' +
        n['name'] +
        '</li>'
      items.append(item)
    })
  } else if (t == 'province' || t == 'bprovince') {
    $.each(provinces, function (key, item) {
      var c = ''
      if (sel == key) {
        c = 'class="sel"'
      }
      items.append(
        '<li ' +
          c +
          ' data-code="' +
          key +
          '" data-value="' +
          item +
          '">' +
          item +
          '</li>'
      )
    })
  }
  select.show()
  $('.sdivmark').show()
  $(obj)
    .parent('div.inputBox')
    .find('i.select-down')
    .addClass('select-down-active')
  event.stopPropagation() //闃绘鍐掓场
}

function get_text_by_link(title, links) {
  $('.check_article_box').show()
  $.ajax({
    url: links,
    type: 'get',
    data: { result: 'text' },
    dataType: 'html',
    async: false,
    success: function (json) {
      $('.check_article_title').text(title)
      $('.check_article_con').html(json)
      $('.check_article_box').show()
    },
    error: function () {
      console.log('failed')
    },
  })
}
function show_tax_tips(gscode) {
  $('.check_article_box').show()
  $('.check_article_title').text($('.taxtiptt').html())
  $('.check_article_con').html($('.' + gscode).html())
  $('.check_article_box').show()
}

function validform() {
  var formobj = $('#checkForm')
  if (formobj.length <= 0) {
    return true
  }
  if (formobj.is(':hidden')) {
    return true
  }
  var errnum = 0
  var applabel = function (inpobj, name) {
    inpobj
      .addClass('error')
      .after(
        '<label id="' +
          name +
          '-error" class="error" for="' +
          name +
          '">' +
          inpobj.attr('err') +
          '</label>'
      )
  }
  $('#checkForm [name][required]').each(function () {
    var val = $(this).val()
    var name = $(this).attr('name')
    $('#' + name + '-error').remove()
    if (!$(this).is(':hidden')) {
      if (val == '') {
        errnum++
        applabel($(this), name)
      } else {
        if (name == 'email') {
          var myreg = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
          if (!myreg.test(val)) {
            errnum++
            applabel($(this), name)
          }
        } else if (name == 'phone' && val.length < 7) {
          errnum++
          applabel($(this), name)
        } else if (name == 'addr' && val.length < 5) {
          errnum++
          applabel($(this), name)
        }
      }
    }
  })
  if (errnum > 0) {
    return false
  }
  return true
}
