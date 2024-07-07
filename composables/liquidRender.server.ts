import fs from 'fs'
import { Liquid } from 'liquidjs'

export default async function liquidRender(dataTemplate, fullPath) {
  const dirName = process.env.NODE_ENV === 'production' ? '../public/themes/' : './public/themes/'
  console.log(process.env.NODE_ENV)
  const langs = fs.readFileSync(
    `${dirName}${dataTemplate.data.template.key}/locales/${dataTemplate.data.shop.locale}.json`
  )
  dataTemplate.data.langs = JSON.parse(langs.toString())
  const res = dataTemplate.data
  const pages = dataTemplate.pages
  const engine = new Liquid({
    globals: { title: res.template.name },
    root: [dirName + res.template.key + '/', dirName + res.template.key + '/sections/'],
    partials: dirName + res.template.key + '/snippets/',
    extname: '.liquid',
    cache: true,
  })
  /** 模板标签注册 */
  engine.registerTag('schema', {
    parse(tagToken, remainTokens) {
      while (remainTokens.length) {
        let token = remainTokens.shift()
        if (token.name === 'endschema') {
          break
        }
      }
    },
    *render(context, emitter) {
      return ''
    },
  })
  engine.registerTag('stylesheet', {
    parse(tagToken, remainTokens) {
      while (remainTokens.length) {
        let token = remainTokens.shift()
        if (token.name === 'endstylesheet') {
          break
        }
      }
    },
    *render(context, emitter) {
      emitter.write("<div class='style'><style>")
      yield this.liquid.renderer.renderTemplates(this.tpls, context, emitter)
      emitter.write('</style></div>')
    },
  })

  engine.registerTag('javascript', {
    parse(tagToken, remainTokens) {
      this.tpls = []
      let closed = false
      while (remainTokens.length) {
        let token = remainTokens.shift()
        if (token.name === 'endjavascript') {
          closed = true
          break
        }
        let tpl = this.liquid.parser.parseToken(token, remainTokens)
        this.tpls.push(tpl)
      }
      if (!closed) throw new Error(`tag ${tagToken.getText()} not closed`)
    },
    *render(context, emitter) {
      emitter.write("<div class='card_script'><script type='text/javascript'>")
      yield this.liquid.renderer.renderTemplates(this.tpls, context, emitter)
      emitter.write('</script></div>')
    },
  })
  engine.registerFilter('money_with_symbol', (val) => val)
  engine.registerFilter('img_url', (e, t, i) => e)
  engine.registerFilter('plus', (a, b) => a + b)
  engine.registerFilter('t', (val, kvs) => {
    if (kvs != null && Object.values(kvs).length) {
      var vals = Object.values(kvs)
      val = (val + '').replace('{{ ' + vals[0] + ' }}', vals[1])
    }
    return val ? val : null
  })
  engine.registerFilter('image_padding_bottom', (e, t, i) => {
    if (e != '' && e > 0 && t > 0) {
      var n = e / t
      if ('limit' == i) {
        if (n < 0.62) return '62%'
        if (1.6 < n) return '160%'
      }
      return parseInt(100 * n) + '%'
    }
    return '100%'
  })
  /**
 * 
 * 
 * 
  @example  
    public static function json($value,$str='') {
	    if(!empty($str)){
	        $arr = explode(',',$str);
	        foreach ($arr as $k){
	            if(isset($value[$k])){
        	        unset($value[$k]);
        	    }
	        }
	    }
		return json_encode($value,320);
	}
 * 
 */

  engine.registerFilter('json', (value, str) => {
    if (str) {
      const arr = str.split(',')
      arr.forEach((k) => {
        if (value.hasOwnProperty(k)) {
          delete value[k]
        }
      })
    }
    value = JSON.stringify(value)
    return value ? value : '[]'
  })
  engine.registerFilter('color_modify', (hex, b, opacity) => {
    return (
      'rgba(' +
      parseInt('0x' + hex.slice(1, 3)) +
      ',' +
      parseInt('0x' + hex.slice(3, 5)) +
      ',' +
      parseInt('0x' + hex.slice(5, 7)) +
      ',' +
      opacity +
      ')'
    )
  })
  engine.registerFilter('color_to_hex', (hex, opacity) => {
    return (
      'rgba(' +
      parseInt('0x' + hex.slice(1, 3)) +
      ',' +
      parseInt('0x' + hex.slice(3, 5)) +
      ',' +
      parseInt('0x' + hex.slice(5, 7)) +
      ',' +
      opacity +
      ')'
    )
  })

  let content_for_layout = ''
  pages.content_for_page.forEach((i) => {
    const section = pages.sections[i]
    section.id = i
    res.section = section
    res.REQUEST_URI = fullPath
    //
    if (section.conturi && section.content) {
      content_for_layout += section.content
    } else if (section.type) {
      const content = engine.renderFileSync('./sections/' + section.type, res)
      content_for_layout +=
        '<div id="xfcart-section-' +
        i +
        '" class="xfcart-section" data-section-id="' +
        i +
        '" data-section-type="' +
        section.type +
        '" data-section-style="">' +
        content +
        '</div>'
    }
  })
  res.content_for_layout = content_for_layout
  res.content_for_header = ''
  res.content_for_js = ''
  res.section = []
  res.REQUEST_URI = fullPath
  const html = await engine.renderFileSync('./theme', res)
  return html
}
