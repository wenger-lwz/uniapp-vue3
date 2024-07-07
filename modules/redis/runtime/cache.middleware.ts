import { options } from '#elastic-cache-options'
import crypto from 'crypto'
import { fromNodeMiddleware } from 'h3'
import { storageFactory } from './factory.storage'
import { matchPage } from './matcher'

const customKey = options.key ? eval(options.key) : null

export default fromNodeMiddleware(async (req, res) => {
  const key = customKey ? customKey(req, crypto) : req.url

  const isCacheable = matchPage(req.url)

  if (isCacheable && key && typeof key === 'string') {
    const storage = await storageFactory(options)
    const cachedRes = await storage.get(key)

    if (cachedRes) {
      const md5Key = crypto.createHash('md5').update(key).digest('hex')
      if ('W/' + `"${md5Key}"` == req.headers['if-none-match']) {
        res.writeHead(304)
        res.end()
      } else {
        res.writeHead(200, {
          ...(cachedRes as any).headers,
          'x-ssr-cache': 'HIT',
          'Cache-Control': 'max-age=60',
          Etag: 'W/' + `"${md5Key}"`,
        })
        res.end((cachedRes as any).body)
      }
    } else {
      res.setHeader('x-ssr-cache', 'MISS')
    }
  }
})
