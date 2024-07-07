!
function (e) {
    var n = {};
	$.extend({findDOMString:function(clusterShardData){var transferArr=clusterShardData.split(",");var th_field="";return transferArr.some(function(o){if($(o).length){return th_field=o.trim(),true}}),th_field}});
    function t(i) {
        if (n[i]) return n[i].exports;
        var a = n[i] = {
            i: i,
            l: !1,
            exports: {}
        };
        return e[i].call(a.exports, a, a.exports, t),
        a.l = !0,
        a.exports
    }
    t.m = e,
    t.c = n,
    t.d = function (e, n, i) {
        t.o(e, n) || Object.defineProperty(e, n, {
            enumerable: !0,
            get: i
        })
    },
    t.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    },
    t.t = function (e, n) {
        if (1 & n && (e = t(e)), 8 & n) return e;
        if (4 & n && "object" == typeof e && e && e.__esModule) return e;
        var i = Object.create(null);
        if (t.r(i), Object.defineProperty(i, "default", {
            enumerable: !0,
            value: e
        }), 2 & n && "string" != typeof e) for (var a in e) t.d(i, a, function (n) {
            return e[n]
        }.bind(null, a));
        return i
    },
    t.n = function (e) {
        var n = e && e.__esModule ?
        function () {
            return e.
        default
        } : function () {
            return e
        };
        return t.d(n, "a", n),
        n
    },
    t.o = function (e, n) {
        return Object.prototype.hasOwnProperty.call(e, n)
    },
    t.p = "/",
    t(t.s = 8)
}([function (e, n, t) {
    "use strict";
    e.exports = t(16)},


    function (e, n) {
    e.exports = window.jQuery ||
    function () {}},


    function (e, n, t) {
    var i = t(0);
    e.exports = function (e) {
        "use strict";
        e = e || {};
        var n = "",
            a = i.$escape,
            r = e.data,
            o = e.i,
            s = e.style,
            l = function (e) {
                return n += e
            },
            p = e.j,
            _ = e.half_star,
            d = e.cover;
        n += '<div class="xfcart-reviews-rating-wrap d-inline-flex align-items-center">\n  <span data-grade="',
        n += a(r.comment_avg_star),
        n += '" class="xfcart-reviews-rating" data-comment_avg_star="',
        n += r.comment_avg_star,
        n += '">\n    ';
        for (o = 0; r.comment_avg_star && o < ~~r.comment_avg_star; o++) n += '\n      <span class="xfcart-reviews__rating-active" style=" color:',
        n += a(s.color),
        n += ';">\n        ',
        l(t(5)(e)),
        n += "\n      </span>\n    ";
        n += "\n    ";
        for (p = 0; r.comment_avg_star && p < 5 - r.comment_avg_star; p++) {
                if (n += "\n      ", 0 == p) {
                    n += '\n        <span class="xfcart-reviews__rating-active" data-comment_avg_star="',
                    n += r.comment_avg_star,
                    n += '" style=" color:',
                    n += a(s.color),
                    n += ';">\n          ',
                    l(t(6)(e)),
                    n += "\n          ",
                    l(t(5)(e)),
                    n += "\n        </span>\n        ";
                    _ = r.comment_avg_star % 1;
                    n += "\n        ",
                    _ < .1 ? (n += "\n          ", d = "0", n += "\n        ") : _ < .3 ? (n += "\n          ", d = "30", n += "\n        ") : _ < .6 ? (n += "\n          ", d = 100 * _, n += "\n        ") : _ < .75 ? (n += "\n          ", d = "65", n += "\n        ") : _ < .9 ? (n += "\n          ", d = "75", n += "\n        ") : (n += "\n          ", d = "99", n += "\n        "),
                    n += '\n        <style>\n          .xfcart-reviews-rating .xfcart-reviews__rating-active[data-comment_avg_star="',
                    n += r.comment_avg_star,
                    n += '"] svg:nth-child(2) {\n            -webkit-clip-path: polygon(0 0,',
                    n += d,
                    n += "% 0, ",
                    n += d,
                    n += "% 100%, 0 100%);\n            clip-path: polygon(0 0,",
                    n += d,
                    n += "% 0, ",
                    n += d,
                    n += '% 100%, 0 100%);\n          }\n          html[dir="rtl"] .xfcart-reviews-rating .xfcart-reviews__rating-active[data-comment_avg_star="',
                    n += r.comment_avg_star,
                    n += '"] svg:nth-child(2) {\n            -webkit-clip-path: polygon(',
                    n += 100 - d,
                    n += "% 0,100% 0, 100% 100%, ",
                    n += 100 - d,
                    n += "% 100%);\n            clip-path: polygon(",
                    n += 100 - d,
                    n += "% 0,100% 0, 100% 100%, ",
                    n += 100 - d,
                    n += "% 100%);\n          }\n              \n        </style>\n      "
                } else n += '\n        <span style=" color:',
                n += a(s.color),
                n += ';">\n          ',
                l(t(6)(e)),
                n += "\n        </span>\n      ";
                n += "\n    "
            }
        return n += "\n  </span>\n  ",
        r.show_view && r.comment_avg_star && (n += '\n    <span class="xfcart-reviews__rating-view notranslate">', n += r.comment_avg_star, n += '/5 <span style="color:', n += a(s.color), n += ';text-decoration: underline;">', n += r.i18n.comment_view || "View", n += "</span></span>\n  "),
        n += "\n  ",
        r.published_count && !r.show_view && (n += '\n    <span class="xfcart-reviews__rating-num" style=" color:', n += a(s.color), n += ';">(', n += a(r.published_count), n += ")</span>\n  "),
        n += "\n</div>"
    }},


    function (e, n) {
    e.exports = function (e) {
        var n = [];
        return n.toString = function () {
            return this.map((function (n) {
                var t = function (e, n) {
                    var t = e[1] || "",
                        i = e[3];
                    if (!i) return t;
                    if (n && "function" == typeof btoa) {
                            var a = (o = i, "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(o)))) + " */"),
                                r = i.sources.map((function (e) {
                                    return "/*# sourceURL=" + i.sourceRoot + e + " */"
                                }));
                            return [t].concat(r).concat([a]).join("\n")
                        }
                    var o;
                    return [t].join("\n")
                }(n, e);
                return n[2] ? "@media " + n[2] + "{" + t + "}" : t
            })).join("")
        },
        n.i = function (e, t) {
            "string" == typeof e && (e = [
                [null, e, ""]
                ]);
            for (var i = {}, a = 0; a < this.length; a++) {
                var r = this[a][0];
                "number" == typeof r && (i[r] = !0)
            }
            for (a = 0; a < e.length; a++) {
                var o = e[a];
                "number" == typeof o[0] && i[o[0]] || (t && !o[2] ? o[2] = t : t && (o[2] = "(" + o[2] + ") and (" + t + ")"), n.push(o))
            }
        },
        n
    }},


    function (e, n, t) {
    var i, a, r = {},
        o = (i = function () {
            return window && document && document.all && !window.atob
        }, function () {
            return void 0 === a && (a = i.apply(this, arguments)),
            a
        }),
        s = function (e, n) {
            return n ? n.querySelector(e) : document.querySelector(e)
        },
        l = function (e) {
            var n = {};
            return function (e, t) {
                if ("function" == typeof e) return e();
                if (void 0 === n[e]) {
                    var i = s.call(this, e, t);
                    if (window.HTMLIFrameElement && i instanceof window.HTMLIFrameElement) try {
                        i = i.contentDocument.head
                    } catch (e) {
                        i = null
                    }
                    n[e] = i
                }
                return n[e]
            }
        }(),
        p = null,
        _ = 0,
        d = [],
        c = t(12);

    function v(e, n) {
            for (var t = 0; t < e.length; t++) {
                var i = e[t],
                    a = r[i.id];
                if (a) {
                        a.refs++;
                        for (var o = 0; o < a.parts.length; o++) a.parts[o](i.parts[o]);
                        for (; o < i.parts.length; o++) a.parts.push(u(i.parts[o], n))
                    } else {
                        var s = [];
                        for (o = 0; o < i.parts.length; o++) s.push(u(i.parts[o], n));
                        r[i.id] = {
                            id: i.id,
                            refs: 1,
                            parts: s
                        }
                    }
            }
        }

    function w(e, n) {
            for (var t = [], i = {}, a = 0; a < e.length; a++) {
                var r = e[a],
                    o = n.base ? r[0] + n.base : r[0],
                    s = {
                        css: r[1],
                        media: r[2],
                        sourceMap: r[3]
                    };
                i[o] ? i[o].parts.push(s) : t.push(i[o] = {
                        id: o,
                        parts: [s]
                    })
            }
            return t
        }

    function h(e, n) {
            var t = l(e.insertInto);
            if (!t) throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
            var i = d[d.length - 1];
            if ("top" === e.insertAt) i ? i.nextSibling ? t.insertBefore(n, i.nextSibling) : t.appendChild(n) : t.insertBefore(n, t.firstChild),
            d.push(n);
            else if ("bottom" === e.insertAt) t.appendChild(n);
            else {
                if ("object" != typeof e.insertAt || !e.insertAt.before) throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
                var a = l(e.insertAt.before, t);
                t.insertBefore(n, a)
            }
        }

    function m(e) {
            if (null === e.parentNode) return !1;
            e.parentNode.removeChild(e);
            var n = d.indexOf(e);
            n >= 0 && d.splice(n, 1)
        }

    function z(e) {
            var n = document.createElement("style");
            if (void 0 === e.attrs.type && (e.attrs.type = "text/css"), void 0 === e.attrs.nonce) {
                var i = function () {
                    0;
                    return t.nc
                }();
                i && (e.attrs.nonce = i)
            }
            return g(n, e.attrs),
            h(e, n),
            n
        }

    function g(e, n) {
            Object.keys(n).forEach((function (t) {
                e.setAttribute(t, n[t])
            }))
        }

    function u(e, n) {
            var t, i, a, r;
            if (n.transform && e.css) {
                if (!(r = "function" == typeof n.transform ? n.transform(e.css) : n.transform.
            default (e.css))) return function () {};
                e.css = r
            }
            if (n.singleton) {
                var o = _++;
                t = p || (p = z(n)),
                i = b.bind(null, t, o, !1),
                a = b.bind(null, t, o, !0)
            } else e.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (t = function (e) {
                var n = document.createElement("link");
                return void 0 === e.attrs.type && (e.attrs.type = "text/css"),
                e.attrs.rel = "stylesheet",
                g(n, e.attrs),
                h(e, n),
                n
            }(n), i = L.bind(null, t, n), a = function () {
                m(t),
                t.href && URL.revokeObjectURL(t.href)
            }) : (t = z(n), i = y.bind(null, t), a = function () {
                m(t)
            });
            return i(e),


            function (n) {
                if (n) {
                    if (n.css === e.css && n.media === e.media && n.sourceMap === e.sourceMap) return;
                    i(e = n)
                } else a()
            }
        }
    e.exports = function (e, n) {
            if ("undefined" != typeof DEBUG && DEBUG && "object" != typeof document) throw new Error("The style-loader cannot be used in a non-browser environment");
            (n = n || {}).attrs = "object" == typeof n.attrs ? n.attrs : {},
            n.singleton || "boolean" == typeof n.singleton || (n.singleton = o()),
            n.insertInto || (n.insertInto = "head"),
            n.insertAt || (n.insertAt = "bottom");
            var t = w(e, n);
            return v(t, n),


            function (e) {
                for (var i = [], a = 0; a < t.length; a++) {
                    var o = t[a];
                    (s = r[o.id]).refs--,
                    i.push(s)
                }
                e && v(w(e, n), n);
                for (a = 0; a < i.length; a++) {
                    var s;
                    if (0 === (s = i[a]).refs) {
                        for (var l = 0; l < s.parts.length; l++) s.parts[l]();
                        delete r[s.id]
                    }
                }
            }
        };
    var f, x = (f = [], function (e, n) {
            return f[e] = n,
            f.filter(Boolean).join("\n")
        });

    function b(e, n, t, i) {
            var a = t ? "" : i.css;
            if (e.styleSheet) e.styleSheet.cssText = x(n, a);
            else {
                var r = document.createTextNode(a),
                    o = e.childNodes;
                o[n] && e.removeChild(o[n]),
                o.length ? e.insertBefore(r, o[n]) : e.appendChild(r)
            }
        }

    function y(e, n) {
            var t = n.css,
                i = n.media;
            if (i && e.setAttribute("media", i), e.styleSheet) e.styleSheet.cssText = t;
            else {
                    for (; e.firstChild;) e.removeChild(e.firstChild);
                    e.appendChild(document.createTextNode(t))
                }
        }

    function L(e, n, t) {
            var i = t.css,
                a = t.sourceMap,
                r = void 0 === n.convertToAbsoluteUrls && a;
                (n.convertToAbsoluteUrls || r) && (i = c(i)),
            a && (i += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(a)))) + " */");
            var o = new Blob([i], {
                    type: "text/css"
                }),
                s = e.href;
            e.href = URL.createObjectURL(o),
            s && URL.revokeObjectURL(s)
        }},


    function (e, n, t) {
    var i = t(0);
    e.exports = function (e) {
        "use strict";
        e = e || {};
        var n = "",
            t = i.$escape,
            a = e.style;
        return n += '<svg width="',
        n += t(a.width || "16px"),
        n += '" height="',
        n += t(a.height || "16px"),
        n += '" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n  <title>星形</title>\n  <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n      <g id="星星切图" transform="translate(-14.000000, -10.000000)" fill="',
        n += t(a.color),
        n += '">\n          <path d="M22,23.5 L17.6066688,25.8097109 C17.3622465,25.9382113 17.0599329,25.844238 16.9314325,25.5998157 C16.880263,25.5024855 16.8626057,25.3910015 16.8811941,25.2826227 L17.7202457,20.3905765 L17.7202457,20.3905765 L14.1659661,16.9260101 C13.9682243,16.7332595 13.9641781,16.4167029 14.1569287,16.2189611 C14.233683,16.1402193 14.3342543,16.0889757 14.4430728,16.0731634 L19.3549664,15.3594235 L19.3549664,15.3594235 L21.551632,10.9084929 C21.6738431,10.660866 21.973656,10.5591965 22.2212829,10.6814077 C22.3198892,10.7300728 22.3997029,10.8098866 22.448368,10.9084929 L24.6450336,15.3594235 L24.6450336,15.3594235 L29.5569272,16.0731634 C29.8301997,16.1128723 30.0195404,16.3665937 29.9798316,16.6398661 C29.9640193,16.7486846 29.9127757,16.8492558 29.8340339,16.9260101 L26.2797543,20.3905765 L26.2797543,20.3905765 L27.1188059,25.2826227 C27.1654864,25.5547909 26.9826925,25.8132688 26.7105243,25.8599493 C26.6021455,25.8785378 26.4906614,25.8608804 26.3933312,25.8097109 L22,23.5 L22,23.5 Z" id="星形"></path>\n      </g>\n  </g>\n</svg>'
    }},


    function (e, n, t) {
    var i = t(0);
    e.exports = function (e) {
        "use strict";
        e = e || {};
        var n = "",
            t = i.$escape,
            a = e.style;
        return n += '<svg width="',
        n += t(a.width || "16px"),
        n += '" height="',
        n += t(a.height || "16px"),
        n += '" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n    <title>星形2</title>\n    <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <g id="星星切图" transform="translate(-36.000000, -10.000000)" stroke="',
        n += t(a.color),
        n += '">\n            <path d="M43.7915933,11.5520538 L46.3375773,15.8199986 L51.3655384,16.5506041 L47.7435647,20.2221422 L48.6055905,25.2481384 L43.9944988,22.9380043 L39.480873,25.3109578 L40.2530354,20.2116783 L36.6014354,16.6522481 L41.6897497,15.8108541 L43.7915933,11.5520538 Z" id="星形2"></path>\n        </g>\n    </g>\n</svg>'
    }},


    function (e, n, t) {
    "use strict";
    t.d(n, "a", (function () {
        return i
    }));
    var i = '<svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 16 16">\n    <path d="M9.08373973,8 L14.7840494,2.29705621 C15.0719835,2.00668579 15.0719835,1.53834033 14.7840494,1.24796991 L14.7500176,1.21817841 C14.4595331,0.928700933 13.9897734,0.928700933 13.6992889,1.21817841 L8.00110629,6.92750609 L2.30505063,1.21605044 C2.01481433,0.927983186 1.54668519,0.927983186 1.25644889,1.21605044 L1.2224172,1.24584194 C1.08024702,1.38371894 1,1.57335537 1,1.77144907 C1,1.96954277 1.08024702,2.15917921 1.2224172,2.29705621 L6.92272682,8 L1.2224172,13.7029438 C0.934483002,13.9933142 0.934483002,14.4616597 1.2224172,14.7520301 L1.25432191,14.7839496 C1.54455821,15.0720168 2.01268734,15.0720168 2.30292364,14.7839496 L8.00323328,9.08100577 L13.7035429,14.7839496 C13.9937792,15.0720168 14.4619083,15.0720168 14.7521446,14.7839496 L14.7819224,14.7520301 C15.0698566,14.4616597 15.0698566,13.9933142 14.7819224,13.7029438 L9.08161274,8 L9.08373973,8 Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>\n</svg>\n'},


    function (e, n, t) {
    (function (e) {
        t(9),
        t(20),
        t(26);
        var n = t(27),
            i = t(28),
            a = t(29),
            r = t(30),
            o = t(31),
            s = t(2),
            l = t(32),
            p = t(34);
        e((function () {
                var e, t = window.jQuery;

                function _(e) {
                    !
                    function (e) {
                        var n = e.product_id || t.REVIEWS_GLOBAL.product_id;
                        l.getCountStar({
                            product_id: n
                        }, (function (e) {
                            if (e && e.data) {
                                for (var a in Object.assign(e.data, {
                                    comment_avg_star_num: Math.round(e.data.comment_avg_star)
                                }), e.data.star_detail_list = [], e.data.star_detail) e.data.star_detail_list.push(e.data.star_detail[a]);
                                e.data.star_detail_percent_list = function (e, n) {
                                    if (0 === n) return e;
                                    var t = Math.pow(10, 1),
                                        i = e.map((function (e) {
                                            return Math.floor(e / n * 100 * t)
                                        })),
                                        a = i.reduce((function (e, n) {
                                            return e - n
                                        }), 100 * t);
                                    return i[i.length - 1] = i[i.length - 1] + a,
                                    i.map((function (e) {
                                            return e / t
                                        }))
                                }(e.data.star_detail_list, e.data.published_count),
                                t("#xfcart-reviews-" + n + " .xfcart-reviews-header").html(i(t.extend(e, {
                                    i18n: t.REVIEWS_GLOBAL.i18n,
                                    primary_color: t.REVIEWS_GLOBAL.primary_color,
                                    comment_config: t.REVIEWS_GLOBAL.comment_config
                                })))
                            }
                        }))
                    }(e),
                    d(e),
                    v(e);
                    var n = e.product_id || t.REVIEWS_GLOBAL.product_id;
                    c(t("#xfcart-reviews-" + n + " .xfcart-reviews-tab__item:eq(0) span"), e.data.count),
                    c(t("#xfcart-reviews-" + n + " .xfcart-reviews-tab__item:eq(1) span"), e.data.image_count)
                }

                function d(e) {
                    var n = t("#xfcart-reviews-" + e.product_id);["onlyimg", "order", "limit", "page"].forEach((function (t) {
                        n.attr("data-reviews-" + t, e[t])
                    }));
                    var i = e.product_id || t.REVIEWS_GLOBAL.product_id;
                    e.data.list.forEach((function (e, n, t) {
                        e.created_at = p.formatDate(e.created_at),
                        e.reply && e.reply.forEach((function (e) {
                            e.created_at = p.formatDate(e.created_at)
                        }))
                    })),
                    e = function (e) {
                        if ("function" == typeof Storage) {
                            var n = localStorage.getItem("likes") ? JSON.parse(localStorage.getItem("likes")) : [];
                            e.data.list.forEach((function (e, t, i) {
                                i[t].like_status = 0,
                                n.forEach((function (e) {
                                    i[t].id == e.id && (i[t].like_status = e.like_status)
                                }))
                            }))
                        }
                        return e
                    }(e),
                    t("#xfcart-reviews-" + i + " .xfcart-reviews-list").html(a(t.extend(e, {
                        i18n: t.REVIEWS_GLOBAL.i18n,
                        comment_config: t.REVIEWS_GLOBAL.comment_config,
                        shop_name: window.SHOP_PARAMS.shop_name || ""
                    })))
                }

                function c(e, n) {
                    e.html(n)
                }

                function v(e) {
                    var n = e.product_id || t.REVIEWS_GLOBAL.product_id,
                        i = t("#xfcart-reviews-" + n),
                        a = parseInt(i.attr("data-reviews-limit"), 10),
                        o = parseInt(i.attr("data-reviews-page"), 10);
                    e.data.count = parseInt(e.data.count);
                    for (var s = Math.ceil(e.data.count / a), l = [], p = 1; p <= s; p++) l.push(p);
                    var _ = l.indexOf(o),
                        d = {
                            prevPage: o > 1 ? o - 1 : 1,
                            nextPage: o < s ? o + 1 : s,
                            firstPage: 1,
                            lastPage: s,
                            currentPage: o
                        },
                        c = [];
                    c = l.length < 6 ? l : _ < 3 ? l.slice(0, 5) : _ > l.length - 3 ? l.slice(l.length - 5, l.length) : l.slice(_ - 2, _ + 3),
                    t("#xfcart-reviews-" + n + " .xfcart-reviews-pagination").html(r({
                            pageType: d,
                            pagesInView: c
                        }))
                }

                function w() {
                    var e, n;
                    t(".coupon-page").length > 0 || t(".flashsale").length > 0 || t(".rebate-collection").length > 0 || 1 == +t.REVIEWS_GLOBAL.comment_config.star_list_position && (e = t(t.REVIEWS_GLOBAL.position.star_list_position), n = [], e.each((function (e, i) {
                        var a = t(i).parents(t.REVIEWS_GLOBAL.position.star_list_item_position).attr("data-track-id");
                        n.push(a)
                    })), n.length && l.getCountStarMulti(n, (function (n) {
                        for (var i in n.data) e.each((function (e, a) {
                            var r = t(a).parents(t.REVIEWS_GLOBAL.position.star_list_item_position).attr("data-track-id") === i,
                                o = t(a).siblings(".xfcart-reviews-rating-wrap").length > 0;
                            n.productId = i,
                            r && !o && h(t(a), n)
                        }))
                    })), t(t.REVIEWS_GLOBAL.position.star_featured_product_position).each((function (e, n) {
                        var i = t(n).data("product-url") || t(n).attr("href") || t(n).parents("[data-section-type=featured-product], [data-section-type=feature-product]").find("[itemprop=url]").attr("content");
                        i && l.getProductId((function (e) {
                            0 === e.state && l.getCountStarMulti([e.data.product_id], (function (e) {
                                h(t(n), e)
                            }))
                        }), i)
                    })))
                }

                function h(e, n) {
					if(n.data.length <= 0)return;
                    0 !== n.data[n.productId].published_count && e.after(s({
                        data: {
                            comment_avg_star: n.data[n.productId].comment_avg_star,
                            published_count: n.data[n.productId].published_count,
                            show_view: e.hasClass("product-info__header_title"),
                            i18n: t.REVIEWS_GLOBAL.i18n
                        },
                        style: {
                            fontSize: "18px",
                            color: t.REVIEWS_GLOBAL.primary_color
                        }
                    }))
                }

                function m() {
                    1 == +t.REVIEWS_GLOBAL.comment_config.star_detail_position && t.REVIEWS_GLOBAL.product_id && l.getCountStarMulti([t.REVIEWS_GLOBAL.product_id], (function (e) {
                        h(t(t.REVIEWS_GLOBAL.position.star_detail_position), e)
                    }))
                }

                function z() {
                    if (t.REVIEWS_GLOBAL.product_id) {
                        var e = {
                            1: t.REVIEWS_GLOBAL.position.comment_position_below_recent_view,
                            2: t.REVIEWS_GLOBAL.position.comment_position_below_desc
                        }[+t.REVIEWS_GLOBAL.comment_config.comment_position] || "",
                            i = "html";
                        e || (e = t.REVIEWS_GLOBAL.position.comment_position_1, i = "after", t(t.REVIEWS_GLOBAL.position.comment_position_5).length > 0 ? (e = t.REVIEWS_GLOBAL.position.comment_position_5, i = "html") : t(t.REVIEWS_GLOBAL.position.comment_position_6).length > 0 ? (e = t.REVIEWS_GLOBAL.position.comment_position_6, i = "html", t(".xfcart-reviews-header-label").length > 0 ? t(".xfcart-reviews-header-label").show() : t(position).prev(".customers_review_tilte").show()) : t(t.REVIEWS_GLOBAL.position.comment_position_4).length > 0 ? (e = t.REVIEWS_GLOBAL.position.comment_position_4, i = "html") : 2 == +t.REVIEWS_GLOBAL.comment_config.comment_position && t(t.REVIEWS_GLOBAL.position.comment_position_3).length > 0 ? (e = t.REVIEWS_GLOBAL.position.comment_position_3, i = "after") : t(t.REVIEWS_GLOBAL.position.comment_position_2).length > 0 && (e = t.REVIEWS_GLOBAL.position.comment_position_2, i = "after")),
                        t.REVIEWS_GLOBAL.onlyimg = 0,
                        l.getReviews({}, (function (a) {
                                t.extend(a, t.REVIEWS_GLOBAL, {
                                    i18n: t.REVIEWS_GLOBAL.i18n || {}
                                }),
                                t(e)[i](n(a)),
                                a.data.list.length > 0 && _(a),
                                t(".plugin__reviews-label").length > 0 ? t(".plugin__reviews-label").show() : t(window).width() > 767.98 ? t('.product_detail_reviews_label[data-position="bottom"], .product_detail_reviews_label[data-position="full"]').removeClass("d-none") : t(".product_detail_reviews_label").removeClass("d-none")
                            }))
                    }
                }

                function g() {
                    var e = t("[data-product-reviews]");
					
                    e.length && t.ajax({
                        url:shop_url+ "/products/comments?dt=config",
                        success: function (i) {
							i.data.open_status ? e.each((function (e, i) {
                                var a = t(i),
                                    r = a.find(".xfcart-reviews-container"),
                                    o = {
                                        product_id: a.attr("data-product-reviews"),
                                        onlyimg: r.length ? r.attr("data-reviews-onlyimg") : 0,
                                        order: r.length ? r.attr("data-reviews-order") : "",
                                        limit: r.length ? r.attr("data-reviews-limit") : t.REVIEWS_GLOBAL.limit,
                                        page: r.length ? r.attr("data-reviews-page") : 1
                                    };
                                l.getReviews(o, (function (e) {
                                        t.extend(e, o, {
                                            i18n: t.REVIEWS_GLOBAL.i18n || {},
                                            comment_config: t.REVIEWS_GLOBAL.comment_config || {}
                                        }),
                                        a.html(n(e)),
                                        e.data.list.length > 0 && _(e)
                                    }))
                            })) : e.html("")
                        }
                    })
                }

                function u(e) {
                    if ("function" == typeof Storage) {
                        var n = localStorage.getItem("likes") ? JSON.parse(localStorage.getItem("likes")) : [];
                        !n.some((function (t, i) {
                            if (e.id === t.id) return n[i].like_status = e.like_status,
                            !0
                        })) && n.push(e),
                        localStorage.setItem("likes", JSON.stringify(n))
                    }
                }
                ;(t.REVIEWS_GLOBAL = {
                  id: '',
                  product_id: '',
                  onlyimg: 0,
                  like_status: 1,
                  order: '',
                  limit: 10,
                  page: 1,
                  review_container: '.xfcart-reviews-container',
                  primary_color:
                    window.product_reviews_star_color ||
                    ((e = '--color-review'),
                    window
                      .getComputedStyle(document.documentElement)
                      .getPropertyValue(e)) ||
                    '#FB8E5B',
                  position: {
                    comment_position_1: t.findDOMString(
                      '.product-detail .product-info, .product-section:not(.is-modal)'
                    ),
                    comment_position_2: t.findDOMString(
                      '.product-detail .product-info + .col-12'
                    ),
                    comment_position_3: t.findDOMString(
                      '.relative_product, .product-detail~div[class=""], .product-detail~div[class="large-up--hide"]'
                    ),
                    comment_position_4:
                      t(window).width() > 767.98
                        ? t.findDOMString(
                            '.product_detail_reviews_label[data-position="bottom"] ~ .product_detail_reviews_content, .product_detail_reviews_label[data-position="full"] ~ .product_detail_reviews_content'
                          )
                        : t.findDOMString(
                            '.product_detail_reviews_label ~ .product_detail_reviews_content'
                          ),
                    comment_position_5: t.findDOMString('.plugin__reviews'),
                    comment_position_6: t.findDOMString(
                      '.customers_review_tab'
                    ),
                    comment_position_below_recent_view: t.findDOMString(
                      '.plugin__reviews-below_recent_view, .customers_review_below_recent_view'
                    ),
                    comment_position_below_desc: t.findDOMString(
                      '.plugin__reviews-below_desc, .customers_review_below_desc'
                    ),
                    star_detail_position: t.findDOMString(
                      '.plugin__reviews-product_detail_info,.product-detail:not(.product-section) .product-info__header_title, .product-detail.product-section:not(.is-modal) .product-info__header_title, .product-single__title'
                    ),
                    star_list_position: t.findDOMString(
                      '.plugin__reviews-product, .product-snippet__title-normal, .product-snippet__title-plus, .grid-product__title'
                    ),
                    star_featured_product_position: t.findDOMString(
                      '.plugin__reviews-featured_product, .featured-product__title, .product-single__title'
                    ),
                    star_list_item_position: t.findDOMString(
                      '.product-snippet, .grid-product__content'
                    ),
                  },
                  comment_config: {},
                  shop_params: {}, //window.xfcart.theme
                }),
                  t(document.body).append(o(t.REVIEWS_GLOBAL)),
                  t
                    .getJSON(shop_url + '/products/comments?dt=langs')
                    .then(function (e) {
                      ;;(t.REVIEWS_GLOBAL.i18n = e || {}),
                        t.ajax({
                          url: shop_url + '/products/comments?dt=config',
                          success: function (e) {
                            if (
                              ((t.REVIEWS_GLOBAL.comment_config = e.data),
                              e.data &&
                                e.data.comment_page_limit &&
                                (t.REVIEWS_GLOBAL.limit =
                                  e.data.comment_page_limit),
                              t.REVIEWS_GLOBAL.comment_config &&
                                t.REVIEWS_GLOBAL.comment_config.open_status)
                            ) {
                              var n = t(document).data('xfproduct'),
                                i = n && n.product && n.product.id
                              ;(t.REVIEWS_GLOBAL.product_id = i), m(), w(), z()
                            }
                          },
                        })
                    }),
                  t(document.body)
                    .on(
                      'click',
                      '.xfcart-reviews__write-review__item-edit_star .xfcart-reviews-rating > span',
                      function (e) {
                        var n =
                          t(this).prevAll('span').length +
                          (e.offsetX < t(this).width() / 2 ? 0.5 : 1)
                        t('.xfcart-reviews__write-review__item-edit_star').html(
                          s({
                            data: {
                              comment_avg_star: n,
                            },
                            style: {
                              fontSize: '16px',
                              width: '24px',
                              height: '24px',
                              color: t.REVIEWS_GLOBAL.primary_color,
                            },
                          })
                        ),
                          t(
                            '.xfcart-reviews__write-review__item-edit_star_num'
                          ).html(n)
                      }
                    )
                    .on('click', '#xfcart-reviews-write-btn', function () {
                      var e = t(this)
                        .parents('.xfcart-reviews-container')
                        .attr('data-reviews-product-id')
                      t(document.body)
                        .data('reviews-cur-product-id', e)
                        .trigger('open_reviews_form')
                    })
                    .on('click', '.xfcart-reviews-tab__item', function () {
                      var e = t(this).parents('.xfcart-reviews-container'),
                        n = e.attr('data-reviews-product-id'),
                        i = {}
                      0 == e.parents('[data-product-reviews]').length
                        ? ((t.REVIEWS_GLOBAL.onlyimg =
                            +t(this).attr('data-onlyimg')),
                          (t.REVIEWS_GLOBAL.page = 1))
                        : (e.attr(
                            'data-reviews-onlyimg',
                            t(this).attr('data-onlyimg')
                          ),
                          e.attr('data-reviews-page', 1),
                          (i = {
                            product_id: n,
                            onlyimg: e.attr('data-reviews-onlyimg'),
                            order: e.attr('data-reviews-order'),
                            limit: e.attr('data-reviews-limit'),
                            page: e.attr('data-reviews-page'),
                          })),
                        e
                          .find('.xfcart-reviews-tab__item')
                          .removeClass('xfcart-reviews-tab__item_on'),
                        t(this).addClass('xfcart-reviews-tab__item_on'),
                        l.getReviews(i, function (e) {
                          p.scrollTo(
                            t(
                              '#xfcart-reviews-' +
                                n +
                                ' #xfcart-reviews-content'
                            ),
                            t('.header__wrapper.fixed-top').height()
                          ),
                            t.extend(e, t.REVIEWS_GLOBAL, i),
                            d(e),
                            v(e),
                            c(
                              t(
                                '#xfcart-reviews-' +
                                  n +
                                  ' .xfcart-reviews-tab__item_on span'
                              ),
                              e.data.count
                            )
                        })
                    })
                    .on(
                      'click',
                      '.xfcart-reviews-like',
                      t.debounce(function () {
                        var e = t(this),
                          n = t(this).parents('.xfcart-reviews-list__item'),
                          i = t(this).siblings('.xfcart-reviews-like-count'),
                          a = i.html() / 1
                        ;(t.REVIEWS_GLOBAL.id = n.attr('data-id') / 1),
                          (t.REVIEWS_GLOBAL.like_status =
                            n.attr('data-like-status') / 1),
                          l.likeReviews(function (r) {
                            0 === r.state &&
                              (e.toggleClass('xfcart-reviews-icon-like_on'),
                              0 === t.REVIEWS_GLOBAL.like_status
                                ? (i.html(++a),
                                  n.attr('data-like-status', 1),
                                  u({
                                    id: t.REVIEWS_GLOBAL.id,
                                    like_status: 1,
                                  }))
                                : (i.html(--a),
                                  n.attr('data-like-status', 0),
                                  u({
                                    id: t.REVIEWS_GLOBAL.id,
                                    like_status: 0,
                                  })))
                          })
                      }, 300)
                    )
                    .on('click', '.xfcart-reviews-sort__option', function () {
                      var e = t(this).parents('.xfcart-reviews-container'),
                        n = e.attr('data-reviews-product-id'),
                        i = {}
                      0 == e.parents('[data-product-reviews]').length
                        ? ((t.REVIEWS_GLOBAL.order =
                            t(this).attr('data-order')),
                          (t.REVIEWS_GLOBAL.page = 1))
                        : (e.attr(
                            'data-reviews-order',
                            t(this).attr('data-order')
                          ),
                          e.attr('data-reviews-page', 1),
                          (i = {
                            product_id: n,
                            onlyimg: e.attr('data-reviews-onlyimg'),
                            order: e.attr('data-reviews-order'),
                            limit: e.attr('data-reviews-limit'),
                            page: e.attr('data-reviews-page'),
                          })),
                        t(
                          '#xfcart-reviews-' +
                            n +
                            ' .xfcart-reviews-sort__text_selected'
                        ).html(t(this).attr('data-order-text')),
                        l.getReviews(i, function (e) {
                          p.scrollTo(
                            t(
                              '#xfcart-reviews-' +
                                n +
                                ' #xfcart-reviews-content'
                            ),
                            t('.header__wrapper.fixed-top').height()
                          ),
                            t.extend(e, t.REVIEWS_GLOBAL, i),
                            d(e),
                            v(e),
                            t(
                              '#xfcart-reviews-' +
                                n +
                                ' .xfcart-reviews-sort__list'
                            ).removeClass('show')
                        })
                    })
                    .on('click', '.xfcart-reviews-sort__text', function () {
                      parseInt(t('.xfcart-reviews-list').css('height')) < 20
                        ? t('.xfcart-reviews-sort__list').css({
                            top: 'initial',
                            bottom: '100%',
                          })
                        : t('.xfcart-reviews-sort__list').removeAttr('style'),
                        t(this)
                          .find('.xfcart-reviews-sort__list')
                          .toggleClass('show'),
                        t(this)
                          .find('.xfcart-reviews-icon-down')
                          .toggleClass('rotate180')
                    })
                    .on('blur', '.xfcart-reviews-sort__text', function () {
                      t('.xfcart-reviews-sort__list').removeClass('show'),
                        t('.xfcart-reviews-icon-down').removeClass('rotate180')
                    })
                    .on(
                      'click',
                      '.xfcart-reviews-list__item_img-item img',
                      function () {
                        t(this).preview()
                      }
                    )
                    .on(
                      'click',
                      '.xfcart-reviews-pagination__item',
                      function () {
                        var e = t(this).parents('.xfcart-reviews-container'),
                          n = e.attr('data-reviews-product-id'),
                          i = {}
                        0 == e.parents('[data-product-reviews]').length
                          ? (t.REVIEWS_GLOBAL.page =
                              t(this).attr('data-page') / 1)
                          : (e.attr(
                              'data-reviews-page',
                              t(this).attr('data-page') / 1
                            ),
                            (i = {
                              product_id: n,
                              onlyimg: e.attr('data-reviews-onlyimg'),
                              order: e.attr('data-reviews-order'),
                              limit: e.attr('data-reviews-limit'),
                              page: e.attr('data-reviews-page'),
                            })),
                          t(
                            '#xfcart-reviews-' +
                              n +
                              ' .xfcart-reviews-pagination__item'
                          ).removeClass('xfcart-reviews-pagination__item_on'),
                          t(this).addClass(
                            'xfcart-reviews-pagination__item_on'
                          ),
                          l.getReviews(i, function (e) {
                            p.scrollTo(
                              t(
                                '#xfcart-reviews-' +
                                  n +
                                  ' #xfcart-reviews-content'
                              ),
                              t('.header__wrapper.fixed-top').height()
                            ),
                              t.extend(e, t.REVIEWS_GLOBAL, i),
                              d(e),
                              v(e)
                          })
                      }
                    )
                    .on('click', '.xfcart-reviews-rating-wrap', function () {
                      t('.product_detail_reviews_label:visible').click(),
                        t('.xfcart-reviews-header-label').hasClass(
                          'product-info__label_tabs_checked'
                        ) || t('.xfcart-reviews-header-label').click(),
                        0 ===
                          t(this).parents(t.REVIEWS_GLOBAL.review_container)
                            .length &&
                          p.scrollTo(
                            t(t.REVIEWS_GLOBAL.review_container),
                            t('.header__wrapper.fixed-top').height()
                          )
                    }),
                  t(document)
                    .on('update_reviews', function () {
                      t(t.REVIEWS_GLOBAL.position.star_detail_position)
                        .siblings('.xfcart-reviews-rating-wrap')
                        .remove(),
                        m(),
                        t(t.REVIEWS_GLOBAL.review_container).remove(),
                        z(),
                        g()
                    })
                    .on(
                      'xf.common.load_more.loading.end xf.common.load_more.hide xf.editor.update xf.editor.delete xf.editor.sort xf.editor.add',
                      function () {
                        t('.xfcart-reviews-rating-wrap').remove(),
                          m(),
                          w(),
                          t(t.REVIEWS_GLOBAL.review_container).length > 0 &&
                            t(t.REVIEWS_GLOBAL.review_container).remove(),
                          z(),
                          g()
                      }
                    ),
                  t(document).on('lazybeforeunveil', function (e) {
                    t(e.target).hasClass('xfcart-reviews-container') &&
                      t(document.body).trigger('track', {
                        eventName: 'reviews_in_window',
                      })
                  }),
                  t(document.body)
                    .on('update_section_review', g)
                    .trigger('update_section_review'),
                  (t.renderReviewInSection = g)
            }))
    }).call(this, t(1))},


    function (e, n, t) {
    "use strict";
    t.r(n),


    function (e) {
        var n = t(7);
        t(10),
        t(13);
        var i = t(15),
            a = t(19);
        e((function () {
                var t, r, o, s, l, p, _, d, c = e("body"),
                    v = function () {
                        var n = e("#xfcart-write-review");
                        n.length && n.modal("hide"),
                        c.css({
                            overflow: "auto"
                        })
                    };

                function w(n, t) {
                        switch (n) {
                        case "email":
                            return t ? !! /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(t) || (h(e("#xfcart-reviews__write-review__email").siblings(".xfcart-reviews__write-review__tips")[0], e.REVIEWS_GLOBAL.i18n.comment_email_tips), !1) : (h(e("#xfcart-reviews__write-review__email").siblings(".xfcart-reviews__write-review__tips")[0], e.REVIEWS_GLOBAL.i18n.comment_content_tips), !1);
                        case "content":
                            return "" !== t || (h(e("#xfcart-reviews__write-review__content").siblings(".xfcart-reviews__write-review__tips")[0], e.REVIEWS_GLOBAL.i18n.comment_content_tips), !1);
                        case "username":
                            return "" !== t || (h(e("#xfcart-reviews__write-review__username").siblings(".xfcart-reviews__write-review__tips")[0], e.REVIEWS_GLOBAL.i18n.your_name_tips), !1);
                        default:
                            e("#xfcart-reviews__write-review__username").length && h(e("#xfcart-reviews__write-review__username").siblings(".xfcart-reviews__write-review__tips")[0], ""),
                            h(e("#xfcart-reviews__write-review__content").siblings(".xfcart-reviews__write-review__tips")[0], ""),
                            h(e("#xfcart-reviews__write-review__email").siblings(".xfcart-reviews__write-review__tips")[0], "")
                        }
                    }

                function h(n, t) {
                        e(n).html(t)
                    }

                function m(n) {
                        if (n) {
                            var t = new window.File([n], p.name, {
                                type: p.type
                            });
                            s.append("files[]", t)
                        }
                        var i = new Image,
                            r = new FileReader;
                        if (!(p = l[_++])) return (
                          e('#xfcart-reviews-file-form').append(
                            a({
                              srcArr: new Array(d),
                            })
                          ),
                          void e
                            .ajax({
                              url: shop_url + '/products/comments?dt=upload',
                              type: 'POST',
                              cache: !1,
                              data: s,
                              dataType: 'json',
                              processData: !1,
                              contentType: !1,
                            })
                            .done(function (n) {
                              e(
                                '.xfcart-reviews__write-review__upload input'
                              ).val(''),
                                n.data &&
                                  e(
                                    '.xfcart-reviews__write-review__image.write-review-loading img'
                                  ).each(function (t, i) {
                                    var a = n.data[t].url
                                    window.xfcart &&
                                      window.xfcart.image_domain &&
                                      (window.xfcart.image_domain,
                                      n.data[t].path),
                                      n.data[t] &&
                                        e(i)
                                          .attr('src', a)
                                          .parent()
                                          .removeClass('write-review-loading')
                                  })
                            })
                            .fail(function (e) {
                              console.log(e)
                            })
                        )
                        i.onload = function () {
                                var e = document.createElement("canvas"),
                                    n = e.getContext("2d"),
                                    t = this.width,
                                    i = this.height,
                                    a = 800 * window.devicePixelRatio,
                                    r = 800 * window.devicePixelRatio,
                                    o = t,
                                    s = i;
                                    (t > a || i > r) && (t / i > a / r ? (o = a, s = Math.round(a * (i / t))) : (s = r, o = Math.round(r * (t / i)))),
                                e.width = o,
                                e.height = s,
                                n.clearRect(0, 0, o, s),
                                n.fillStyle = "#fff",
                                n.fillRect(0, 0, o, s),
                                n.drawImage(this, 0, 0, o, s),
                                e.toBlob(m, "image/jpeg", .95)
                            },
                        r.onload = function (e) {
                                i.src = e.target.result
                            },
                        p.type.indexOf("gif") >= 0 ? m(p) : p.type.indexOf("image") >= 0 && r.readAsDataURL(p)
                    }
                e(document).on("open_reviews_form", (function () {
                        e("#xfcart-write-review").length || (c.append(i({
                            i18n: e.REVIEWS_GLOBAL.i18n,
                            comment_config: e.REVIEWS_GLOBAL.comment_config,
                            data: {
                                comment_avg_star: 5
                            },
                            style: {
                                fontSize: "16px",
                                width: "24px",
                                height: "24px",
                                color: e.REVIEWS_GLOBAL.primary_color
                            },
                            iconCloseBtn: n.a
                        })), t = c.find("#xfcart-reviews__write-review__content"), r = c.find("#xfcart-reviews__write-review__email"), o = c.find("#xfcart-reviews__write-review__username")),
                        e("#xfcart-write-review").modal("show"),
                        c.css({
                            overflow: "hidden"
                        })
                    })),
                e(document).on("close_reviews_form", v),
                e(document).on("click", ".xfcart-reviews__write-review__close", v),
                e(document).on("click", "#xfcart-write-review", v),
                e(document).on("click", "#xfcart-write-reviews-dialog", (function (e) {
                        e.stopPropagation()
                    })),
                e(document).on("click", ".xfcart-reviews__write-review__post", (function (n) {
                        var i = c.find(".xfcart-reviews__write-review__item-edit_star .xfcart-reviews-rating").data("grade"),
                            a = t.val(),
                            s = r.val(),
                            l = o.val() || "",
                            p = e.REVIEWS_GLOBAL.comment_config && "anyone" == e.REVIEWS_GLOBAL.comment_config.comment_permission || !1,
                            _ = [];
                        e("#xfcart-write-review").find(".xfcart-reviews__write-review__image img").each((function () {
                                _.push(e(this).attr("src"))
                            }));
                        var d = {
                                star: i,
                                product_id: e(document.body).data("reviews-cur-product-id") || e.REVIEWS_GLOBAL.product_id,
                                content: a,
                                email: s,
                                image: _.join(","),
                                type: 1
                            };
                        p && (d.username = l),
                          w('content', d.content) &&
                            w('email', d.email) &&
                            (!p || w('username', d.username)) &&
                            e.ajax({
                              url: shop_url + '/products/comments?dt=',
                              type: 'POST',
                              data: d,
                              success: function (n) {
                                if (0 == n.state)
                                  v(),
                                    e('#xfcart-write-review').remove(),
                                    e(document).trigger('update_reviews'),
                                    e.toast.show({
                                      content:
                                        e.REVIEWS_GLOBAL.i18n
                                          .comment_thanks_review,
                                    })
                                else {
                                  var t =
                                    10001 == n.state
                                      ? e.REVIEWS_GLOBAL.i18n
                                          .comment_condition_tip
                                      : 10002 == n.state
                                      ? e.REVIEWS_GLOBAL.i18n
                                          .comment_condition_tips
                                      : n.msg
                                  h(
                                    e(
                                      '#xfcart-reviews__write-review__email'
                                    ).siblings(
                                      '.xfcart-reviews__write-review__tips'
                                    )[0],
                                    t
                                  )
                                }
                              },
                              error: function (n) {
                                e.toast.show({
                                  type: 'error',
                                  content: n,
                                })
                              },
                            })
                    })),
                e(document).on("focus", "#xfcart-reviews__write-review__content", (function () {
                        h(e(this).siblings(".xfcart-reviews__write-review__tips")[0], "")
                    })).on("focus", "#xfcart-reviews__write-review__email", (function () {
                        h(e(this).siblings(".xfcart-reviews__write-review__tips")[0], "")
                    })),
                e(document).on("touchstart", "#xfcart-write-review", (function () {
                        e("#xfcart-reviews__write-review__content").blur(),
                        e("#xfcart-reviews__write-review__email").blur()
                    })),
                e(document).on("change", ".xfcart-reviews-file-input", (function () {
                        s = new FormData,
                        l = e(this)[0].files,
                        d = l.length,
                        _ = 0;
                        var n = e("#xfcart-write-review").find(".xfcart-reviews__write-review__image img");
                        if (d + n.length > 5) return e(".xfcart-reviews__write-review__upload input").val(""),
                        void e.toast.show({
                            type: "error",
                            content: e.REVIEWS_GLOBAL.i18n.comment_photos_num_limit
                        });
                        m()
                    })),
                e(document).on("click", ".xfcart-reviews__write-review__image-remove", (function (n) {
                        e(this).parent().fadeOut("normal", (function () {
                            e(this).remove()
                        }))
                    })),
                e(document).on("keyup", "#xfcart-reviews__write-review__content", (function (n) {
                        e(this).val(e(this).val().substring(0, 1500)),
                        e(this).parent().attr("number", e(this).val().length + "/" + e(this).attr("maxlength"))
                    }))
            }))
    }.call(this, t(1))},


    function (e, n, t) {
    var i = t(11);
    "string" == typeof i && (i = [
        [e.i, i, ""]
        ]);
    var a = {
        hmr: !0,
        transform: void 0,
        insertInto: void 0
    };
    t(4)(i, a);
    i.locals && (e.exports = i.locals)},


    function (e, n, t) {
    (e.exports = t(3)(!1)).push([e.i, '.xfcart-reviews-container input:focus,.xfcart-reviews-container textarea:focus{\n  font-size:14px\n}\n\n.xfcart-reviews__modal{\n  z-index:1050;\n  overflow:auto;\n  background:rgba(0,0,0,0.5)\n}\n\n.xfcart-reviews__write-review{\n  position:absolute;\n  left:0;\n  top:0;\n  right:0;\n  bottom:0;\n  margin:auto;\n  background:#fff;\n  display:flex;\n  flex-direction:column;\n  overflow:auto;\n  line-height:1.2\n}\n\n.xfcart-reviews__write-review .xfcart-reviews-rating>span{\n  cursor:pointer;\n  margin-left:6px\n}\n\n.xfcart-reviews__write-review__item-edit_star_num{\n  margin-left:12px;\n  font-size:22px;\n  line-height:1\n}\n\n@media (max-width: 767.98px){\n  .xfcart-reviews__write-review .xfcart-reviews-rating>span{\n    margin-left:0;\n    width:46px;\n    height:24px\n  }\n\n  .xfcart-reviews__write-review__item-edit_star_num{\n    margin-left:8px;\n    font-size:19px\n  }\n}\n\n.xfcart-reviews__write-review__title{\n  position:absolute;\n  top:0;\n  width:100%;\n  background:#fff;\n  z-index:1;\n  height:70px;\n  display:flex;\n  align-items:center;\n  justify-content:center;\n  border-bottom:1px solid #eee;\n  flex-shrink:0;\n  font-size:22px;\n  font-weight:bold;\n  color:#212121\n}\n\n.xfcart-reviews__write-review__close{\n  position:absolute;\n  right:15px;\n  top:15px;\n  color:#000;\n  font-size:22px;\n  cursor:pointer;\n  font-weight:normal;\n  width:15px;\n  height:15px;\n  line-height:15px;\n  text-align:center\n}\n\n.xfcart-reviews__write-review__content{\n  flex-grow:1;\n  overflow:auto;\n  -webkit-overflow-scrolling:touch;\n  padding:20px 15px;\n  margin-top:56px\n}\n\n.xfcart-reviews__write-review__notice{\n  font-size:16px;\n  color:#999;\n  line-height:20px\n}\n\n.xfcart-reviews__write-review__item{\n  margin:25px 0\n}\n\n.xfcart-reviews__write-review__item-title{\n  margin-bottom:10px;\n  margin-right:20px\n}\n\n.xfcart-reviews__write-review__item textarea{\n  border:1px solid #eee;\n  resize:none;\n  outline:none;\n  padding:5px 10px 21px;\n  width:100%;\n  font-size:14px;\n  -webkit-appearance:none\n}\n\n.xfcart-reviews__write-review__content-wrapper{\n  position:relative\n}\n\n.xfcart-reviews__write-review__content-wrapper::after{\n  content:attr(number);\n  position:absolute;\n  bottom:5px;\n  right:18px;\n  left:10px;\n  color:#999;\n  font-size:12px;\n  line-height:20px;\n  background:#fff;\n  text-align:right\n}\n\n.xfcart-reviews__write-review__item input{\n  height:36px;\n  padding:10px;\n  outline:none;\n  border:1px solid #eee;\n  width:100%;\n  font-size:14px;\n  -webkit-appearance:none\n}\n\n.xfcart-reviews__write-review__image .xfcart-reviews__write-review__upload{\n  position:relative;\n  margin:0;\n  width:100px;\n  height:100px;\n  display:inline-flex;\n  align-items:center;\n  justify-content:center;\n  cursor:pointer\n}\n\n.xfcart-reviews__write-review__upload::before{\n  content:"";\n  width:40px;\n  position:absolute;\n  border:15px solid #bbb;\n  border-radius:4px\n}\n\n.xfcart-reviews__write-review__upload::after{\n  content:"";\n  width:20px;\n  height:20px;\n  position:absolute;\n  border:3px solid #fff;\n  border-radius:50%\n}\n\n.xfcart-reviews__write-review__post{\n  min-width:85px;\n  height:37px;\n  color:#fff;\n  border:none;\n  outline:none;\n  cursor:pointer;\n  font-size:14px\n}\n\n.xfcart-reviews__write-review__image{\n  position:relative;\n  border:1px solid #eee;\n  width:100px;\n  height:100px;\n  display:inline-flex;\n  align-items:center;\n  justify-content:center;\n  cursor:pointer;\n  margin-right:10px;\n  margin-bottom:10px\n}\n\n.write-review-loading::after{\n  content:"";\n  position:absolute;\n  width:33px;\n  height:33px;\n  border:2px solid #bbb;\n  border-top-color:#f0f0f0;\n  border-radius:50%;\n  animation:rolling 1s linear infinite\n}\n\n@keyframes rolling{\n  0%{\n    transform:rotate(0deg)\n  }\n\n  100%{\n    transform:rotate(360deg)\n  }\n}\n\n.xfcart-reviews__write-review__image img{\n  position:relative;\n  z-index:1;\n  max-width:100%;\n  max-height:100%\n}\n\n#xfcart-reviews-file-form{\n  display:flex;\n  flex-wrap:wrap\n}\n\n.xfcart-reviews__write-review__image-remove{\n  position:absolute;\n  top:-9px;\n  right:-4px;\n  z-index:2;\n  font-size:14px;\n  width:9px;\n  height:9px;\n  font-weight:bold\n}\n\n.xfcart-reviews__write-review__tips{\n  color:#d0021b;\n  margin-top:5px;\n  font-size:14px;\n  position:relative;\n  z-index:100\n}\n', ""])},


    function (e, n) {
    e.exports = function (e) {
        var n = "undefined" != typeof window && window.location;
        if (!n) throw new Error("fixUrls requires window.location");
        if (!e || "string" != typeof e) return e;
        var t = n.protocol + "//" + n.host,
            i = t + n.pathname.replace(/\/[^\/]*$/, "/");
        return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, (function (e, n) {
                var a, r = n.trim().replace(/^"(.*)"$/, (function (e, n) {
                    return n
                })).replace(/^'(.*)'$/, (function (e, n) {
                    return n
                }));
                return /^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(r) ? e : (a = 0 === r.indexOf("//") ? r : 0 === r.indexOf("/") ? t + r : i + r.replace(/^\.\//, ""), "url(" + JSON.stringify(a) + ")")
            }))
    }},


    function (e, n, t) {
    var i = t(14);
    "string" == typeof i && (i = [
        [e.i, i, ""]
        ]);
    var a = {
        hmr: !0,
        transform: void 0,
        insertInto: void 0
    };
    t(4)(i, a);
    i.locals && (e.exports = i.locals)},


    function (e, n, t) {
    (e.exports = t(3)(!1)).push([e.i, "@media (min-width: 768px){\n  .xfcart-reviews__write-review{\n    width:600px;\n    height:684px;\n    margin:50px auto\n  }\n\n  .xfcart-reviews__write-review__title{\n    font-size:24px\n  }\n\n  .xfcart-reviews__modal{\n    overflow:auto\n  }\n}\n", ""])},


    function (e, n, t) {
    var i = t(0);
    e.exports = function (e) {
        "use strict";
        e = e || {};
        var n = "",
            a = i.$escape,
            r = e.i18n,
            o = e.iconCloseBtn,
            s = e.comment_config,
            l = function (e) {
                return n += e
            },
            p = e.data,
            _ = (e.comment_avg_star, e.edit, e.style);
        return n += '<div class="bootstrap">\n  <div class="xfcart-reviews__modal modal" id="xfcart-write-review" style="display: none;">\n    <div class="xfcart-reviews__write-review" id="xfcart-write-reviews-dialog">\n      <div class="xfcart-reviews__write-review__title">\n        <span>',
        n += a(r.comment_write),
        n += '</span>\n        <span class="xfcart-reviews__write-review__close">\n          ',
        n += o,
        n += '\n        </span>\n      </div>\n      <div class="xfcart-reviews__write-review__content">\n        ',
        "anyone" != s.comment_permission && (n += '\n          <div class="xfcart-reviews__write-review__notice">\n            ', "purchased" == s.comment_permission ? (n += "\n              ", n += a(r.comment_condition_tips), n += "\n            ") : "confirm_received" == s.comment_permission && (n += "\n              ", n += a(r.comment_condition_tip), n += "\n            "), n += "\n          </div>\n        "),
        n += '\n        <div class="xfcart-reviews__write-review__item d-flex align-items-center">\n          <span class="xfcart-reviews__write-review__item-title mb-0">',
        n += a(r.comment_score),
        n += '</span>\n          <div class="xfcart-reviews__write-review__item-edit_star">\n            ',
        l(t(2)({
                data: {
                    comment_avg_star: 5,
                    edit: !0
                },
                style: _
            })),
        n += '\n          </div>\n          <div class="xfcart-reviews__write-review__item-edit_star_num" style=" color:',
        n += a(_.color),
        n += ';">',
        n += a(p.comment_avg_star),
        n += "</div>\n        </div>\n        ",
        "anyone" == s.comment_permission && (n += '\n          <div class="xfcart-reviews__write-review__item">\n            <div class="xfcart-reviews__write-review__item-title">', n += a(r.your_name), n += '</div>\n            <input\n              name="write-review-username"\n              type="text"\n              id="xfcart-reviews__write-review__username"\n              placeholder="', n += a(r.your_name_tips), n += '"/>\n            <div class="xfcart-reviews__write-review__tips"></div>\n          </div>\n        '),
        n += '\n        <div class="xfcart-reviews__write-review__item">\n          <div class="xfcart-reviews__write-review__item-title">',
        n += a(r.comment_contact_email),
        n += '</div>\n          <input\n            name="write-review-email"\n            type="text"\n            id="xfcart-reviews__write-review__email"\n            placeholder="',
        n += a(r.comment_order_contact_email),
        n += '"/>\n          <div class="xfcart-reviews__write-review__tips"></div>\n        </div>\n        <div class="xfcart-reviews__write-review__item">\n          <div class="xfcart-reviews__write-review__item-title">',
        n += a(r.comment_body),
        n += '</div>\n          <div class="xfcart-reviews__write-review__content-wrapper" number="0/1500">\n            <textarea\n              name="write-review-content"\n              cols="40"\n              rows="5"\n              id="xfcart-reviews__write-review__content"\n              maxlength="1500"\n              placeholder="',
        n += a(r.comment_please_tips),
        n += '"></textarea>\n              <div class="xfcart-reviews__write-review__tips"></div>\n          </div>\n        </div>\n        <div class="xfcart-reviews__write-review__item">\n          <div class="xfcart-reviews__write-review__item-title">',
        n += a(r.comment_photos),
        n += "</div>\n          ",
        l(t(18)(e)),
        n += '\n        </div>\n        <button class="xfcart-reviews__write-review__post btn btn-primary">',
        n += a(r.comment_post),
        n += "</button>\n      </div>\n    </div>\n  </div>\n</div>\n"
    }},


    function (e, n, t) {
    "use strict";
    (function (n) { /*! art-template@runtime | https://github.com/aui/art-template */
        var t = "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== n ? n : {},
            i = Object.create(t),
            a = /["&'<>]/;
        i.$escape = function (e) {
                return function (e) {
                    var n = "" + e,
                        t = a.exec(n);
                    if (!t) return e;
                    var i = "",
                        r = void 0,
                        o = void 0,
                        s = void 0;
                    for (r = t.index, o = 0; r < n.length; r++) {
                            switch (n.charCodeAt(r)) {
                            case 34:
                                s = "&#34;";
                                break;
                            case 38:
                                s = "&#38;";
                                break;
                            case 39:
                                s = "&#39;";
                                break;
                            case 60:
                                s = "&#60;";
                                break;
                            case 62:
                                s = "&#62;";
                                break;
                            default:
                                continue
                            }
                            o !== r && (i += n.substring(o, r)),
                            o = r + 1,
                            i += s
                        }
                    return o !== r ? i + n.substring(o, r) : i
                }(function e(n) {
                    "string" != typeof n && (n = null == n ? "" : "function" == typeof n ? e(n.call(n)) : JSON.stringify(n));
                    return n
                }(e))
            },
        i.$each = function (e, n) {
                if (Array.isArray(e)) for (var t = 0, i = e.length; t < i; t++) n(e[t], t);
                else for (var a in e) n(e[a], a)
            },
        e.exports = i
    }).call(this, t(17))},


    function (e, n) {
    var t;
    t = function () {
        return this
    }();
    try {
        t = t || new Function("return this")()
    } catch (e) {
        "object" == typeof window && (t = window)
    }
    e.exports = t},


    function (e, n, t) {
    t(0);
    e.exports = function (e) {
        "use strict";
        e = e || {};
        return '<form id="xfcart-reviews-file-form" action="'+shop_url+'/products/comments?dt=upload" method="post" enctype="multipart/form-data">\n  <div class="xfcart-reviews__write-review__image">\n    <label class="xfcart-reviews__write-review__upload">\n      <input name="files[]" type="file" accept="image/*" style="display: none;" class="xfcart-reviews-file-input" multiple/>\n    </label>\n  </div>\n</form>\n',
        '<form id="xfcart-reviews-file-form" action="'+shop_url+'/products/comments?dt=upload" method="post" enctype="multipart/form-data">\n  <div class="xfcart-reviews__write-review__image">\n    <label class="xfcart-reviews__write-review__upload">\n      <input name="files[]" type="file" accept="image/*" style="display: none;" class="xfcart-reviews-file-input" multiple/>\n    </label>\n  </div>\n</form>\n'
    }},


    function (e, n, t) {
    t(0);
    e.exports = function (e) {
        "use strict";
        var n = "",
            t = (e = e || {}).i,
            i = e.srcArr;
        for (t = 0; i && t < i.length; t++) n += '\n  <div class="xfcart-reviews__write-review__image write-review-loading">\n    <span class="xfcart-reviews__write-review__image-remove">&times;</span>\n    <img />\n  </div>\n';
        return n += "\n"
    }},


    function (e, n, t) {
    (function (e) {
        var n = t(21);
        t(22),
        t(24),
        e.fn.preview = function () {
            var t = e(this),
                i = e("body"),
                a = e(this).parents(".xfcart-reviews-img-list").find(".xfcart-reviews-img-item img"),
                r = a.index(t),
                o = a.length,
                s = {
                    currentIndex: r,
                    list: a.map((function (n, t) {
                        return e(t).data("origin")
                    }))
                };

            function l() {
                    e("#xfcart-reviews-preview").fadeOut(200, (function () {
                        e("#xfcart-reviews-preview").remove()
                    })),
                    e("body").css({
                        overflow: "auto"
                    })
                }

            function p() {
                    e(".xfcart-reviews-preview__img-item").removeClass("xfcart-reviews-preview__img-item_on"),
                    e(".xfcart-reviews-preview__img-item:eq(" + r + ")").addClass("xfcart-reviews-preview__img-item_on"),
                    e(".xfcart-reviews-preview__img-page").html(r + 1 + "/" + o),
                    e(".xfcart-reviews-preview__prev, .xfcart-reviews-preview__next").show(),
                    r <= 0 && e(".xfcart-reviews-preview__prev").hide(),
                    r >= a.length - 1 && e(".xfcart-reviews-preview__next").hide()
                }
            t.is("img") && (i.append(n(s)), e("#xfcart-reviews-preview").hide().fadeIn(200), e("body").css({
                    overflow: "hidden"
                }), p(), e("#xfcart-reviews-preview").on("click", ".xfcart-reviews-preview__close", l).on("click", ".xfcart-reviews-preview__img-item", l).on("click", ".xfcart-reviews-preview__prev", (function () {
                    r--,
                    p()
                })).on("click", ".xfcart-reviews-preview__next", (function () {
                    r++,
                    p()
                })))
        }
    }).call(this, t(1))},


    function (e, n, t) {
    var i = t(0);
    e.exports = function (e) {
        "use strict";
        var n = "",
            t = (e = e || {}).list,
            a = e.currentIndex,
            r = e.i,
            o = i.$escape;
        n += '<div class="xfcart-reviews-preview" id="xfcart-reviews-preview">\n  <div class="xfcart-reviews-preview__header">\n    <div class="xfcart-reviews-preview__close">×</div>\n  </div>\n  <div class="xfcart-reviews-preview__body">\n    <div class="xfcart-reviews-preview__body-left">\n      <div class="xfcart-reviews-preview__prev" ',
        1 != t.length && 0 != a || (n += ' style="display:none" '),
        n += '></div>\n    </div>\n    <div class="xfcart-reviews-preview__body-middle">\n      <ul class="xfcart-reviews-preview__img-list">\n        ';
        for (r = 0; r < t.length; r++) n += '\n        <li class="xfcart-reviews-preview__img-item"><img class="lazyload" data-src="',
        n += o(t[r]),
        n += '" alt=""></li>\n        ';
        return n += '\n      </ul>\n      <div class="xfcart-reviews-preview__img-page">1/2</div>\n    </div>\n    <div class="xfcart-reviews-preview__body-right">\n      <div class="xfcart-reviews-preview__next" ',
        1 != t.length && a != t.length - 1 || (n += ' style="" '),
        n += '></div>\n    </div>\n  </div>\n  <div class="xfcart-reviews-preview__footer"></div>\n</div>'
    }},


    function (e, n, t) {
    var i = t(23);
    "string" == typeof i && (i = [
        [e.i, i, ""]
        ]);
    var a = {
        hmr: !0,
        transform: void 0,
        insertInto: void 0
    };
    t(4)(i, a);
    i.locals && (e.exports = i.locals)},


    function (e, n, t) {
    (e.exports = t(3)(!1)).push([e.i, ".xfcart-reviews-preview{\n  position:fixed;\n  top:0;\n  bottom:0;\n  left:0;\n  right:0;\n  z-index:2000;\n  background:rgba(0,0,0,0.7);\n  display:flex;\n  flex-direction:column\n}\n\n.xfcart-reviews-preview__header{\n  display:flex;\n  height:45px;\n  justify-content:flex-end;\n  align-items:center\n}\n\n.xfcart-reviews-preview__close{\n  position:absolute;\n  right:15px;\n  top:15px;\n  color:#fff;\n  font-size:22px;\n  cursor:pointer;\n  font-weight:normal;\n  width:15px;\n  height:15px;\n  line-height:15px;\n  text-align:center\n}\n\n.xfcart-reviews-preview__body{\n  display:flex;\n  flex:1\n}\n\n.xfcart-reviews-preview__body-middle{\n  display:flex;\n  flex:1;\n  flex-direction:column;\n  justify-content:center\n}\n\n.xfcart-reviews-preview__body-left,.xfcart-reviews-preview__body-right{\n  flex:1;\n  max-width:37.5px;\n  display:flex;\n  align-items:center;\n  justify-content:flex-start\n}\n\n.xfcart-reviews-preview__body-right{\n  justify-content:flex-end\n}\n\n.xfcart-reviews-preview__img-list{\n  display:flex;\n  align-items:stretch;\n  margin:0;\n  padding:0;\n  list-style:none\n}\n\n.xfcart-reviews-preview__img-item{\n  min-width:100%;\n  text-align:center;\n  display:none;\n  cursor:zoom-out\n}\n\n.xfcart-reviews-preview__img-item_on{\n  display:block\n}\n\n.xfcart-reviews-preview__img-item img{\n  max-width:100%;\n  max-height:100%;\n  vertical-align:middle;\n  user-select:none\n}\n\n.xfcart-reviews-preview__img-page{\n  text-align:center;\n  font-size:14px;\n  color:#fff;\n  margin-top:15px;\n  font-family:'Pingfang SC'\n}\n\n.xfcart-reviews-preview__prev,.xfcart-reviews-preview__next{\n  border-style:solid;\n  border-width:11px;\n  border-color:transparent;\n  width:0;\n  height:0;\n  position:relative;\n  bottom:18px;\n  cursor:pointer\n}\n\n.xfcart-reviews-preview__prev{\n  border-right-color:#fff\n}\n\n.xfcart-reviews-preview__next{\n  border-left-color:#fff\n}\n\nhtml[dir='rtl'] .xfcart-reviews-preview__prev,html[dir='rtl'] .xfcart-reviews-preview__next{\n  transform:rotate(180deg)\n}\n\nhtml[dir='rtl'] .xfcart-reviews-pagination__last,html[dir='rtl'] .xfcart-reviews-pagination__next{\n  transform:rotate(0deg)\n}\n\nhtml[dir='rtl'] .xfcart-reviews-pagination__first,html[dir='rtl'] .xfcart-reviews-pagination__prev{\n  transform:rotate(180deg)\n}\n", ""])},


    function (e, n, t) {
    var i = t(25);
    "string" == typeof i && (i = [
        [e.i, i, ""]
        ]);
    var a = {
        hmr: !0,
        transform: void 0,
        insertInto: void 0
    };
    t(4)(i, a);
    i.locals && (e.exports = i.locals)},


    function (e, n, t) {
    (e.exports = t(3)(!1)).push([e.i, "@media (min-width: 768px){\n  .xfcart-reviews-preview__body-left,.xfcart-reviews-preview__body-right{\n    max-width:30%;\n    justify-content:center\n  }\n}\n", ""])},


    function (e, n, t) {
    var i = t(0);
    i.reset_image = window.template.defaults.imports.reset_image,
    i.finance_money_with_symbol = window.template.defaults.imports.finance_money_with_symbol,
    i.dateFormat = window.template.defaults.imports.dateFormat,
    i.add_domain_for_image = window.template.defaults.imports.add_domain_for_image,
    i.image_padding_bottom = window.template.defaults.imports.image_padding_bottom,
    i.getNumber = window.template.defaults.imports.getNumber,
    i.toTimestamp = window.template.defaults.imports.toTimestamp,
    i.add_domain_for_image = function (e) {
        return e ? /^(http[s]?:)?\/\//g.test(e) ? e : window.xfcart && window.xfcart.image_domain ? window.xfcart.image_domain + e : "//cdn.xfcart.com/" + e : ""
    },
    i.colorToRgba = function (e, n) {
        var t, i, a, r = /^[rR][gG][bB]\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
            o = /^[rR][gG][bB][aA]\((\d{1,3}%?),\s*(\d{1,3}%?),\s*(\d{1,3}%?),\s*(\d*(?:\.\d+)?)\)$/;
        if (t = i = a = "", e) {
                if (/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(e)) 4 === e.length ? (t = parseInt("0x" + e[1] + e[1]), i = parseInt("0x" + e[2] + e[2]), a = parseInt("0x" + e[3] + e[3])) : (t = parseInt("0x" + e.slice(1, 3)), i = parseInt("0x" + e.slice(3, 5)), a = parseInt("0x" + e.slice(5, 7)));
                else if (r.test(e)) {
                    var s = r.exec(e);
                    t = s[1],
                    i = s[2],
                    a = s[3]
                } else if (o.test(e) && n.toString()) {
                    var l = o.exec(e);
                    t = l[1],
                    i = l[2],
                    a = l[3]
                }
                return t.toString() && i.toString() && a.toString() ? "rgba(" + t + "," + i + "," + a + "," + (null == n ? 1 : n.toString()) + ")" : e
            }
    },
    i.add_symbol_for_money = function (e, n, t) {
        return "left" === t ? n + e : e + n
    },
    window.template.defaults.imports.brightnessByColor = function (e) {
        let n,
        t,
        i,
        a = "" + e,
        r = 0 == e.indexOf("#"),
        o = 0 == e.indexOf("rgb");
        if (r) {
            var s = a.substr(1).match(7 == a.length ? /(\S{2})/g : /(\S{1})/g);
            s && (n = parseInt(s[0], 16), t = parseInt(s[1], 16), i = parseInt(s[2], 16))
        }
        if (o) {
            const e = a.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),(\d+)\)$/);
            e && (n = e[1], t = e[2], i = e[3])
        }
        if (void 0 !== n) return (299 * n + 587 * t + 114 * i) / 1e3
    },
    i.brightnessByColor = window.template.defaults.imports.brightnessByColor,
    window.template.defaults.imports.log = console.log,
    i.log = window.template.defaults.imports.log,
    e.exports = i},


    function (e, n, t) {
    var i = t(0);
    e.exports = function (e) {
        "use strict";
        e = e || {};
        var n = "",
            t = i.$escape,
            a = e.product_id,
            r = e.onlyimg,
            o = e.order,
            s = e.limit,
            l = e.page,
            p = e.i18n,
            _ = e.comment_config,
            d = e.data;
        return n += '<div class="xfcart-reviews-container bootstrap" id="xfcart-reviews-',
        n += t(a),
        n += '" data-reviews-onlyimg="',
        n += t(r),
        n += '" data-reviews-order="',
        n += t(o),
        n += '" data-reviews-limit="',
        n += t(s),
        n += '" data-reviews-page="',
        n += t(l),
        n += '" data-reviews-product-id="',
        n += t(a),
        n += '" >\n  <h4 class="xfcart-reviews-header__h">',
        n += t(p.comment_customer),
        n += "</h4>\n  ",
        _ && _.description_text && (n += '\n    <a class="xfcart-reviews-header_instructions text-center d-block"\n      ', _.description_url && (n += ' href="', n += t(_.description_url), n += '" '), n += ">\n      ", n += t(_.description_text), n += "\n    </a>\n  "),
        n += '\n  <div class="xfcart-reviews">\n    ',
        d.list.length > 0 ? (n += '\n    <div class="xfcart-reviews-header"></div>\n    \x3c!-- TODO: reviews tags --\x3e\n    \x3c!-- <h5 class="xfcart-reviews-tags__h5">See keywords that mention: </h5> --\x3e\n    \x3c!-- <div class="xfcart-reviews-tags"></div> --\x3e\n    <div class="xfcart-reviews-content" id="xfcart-reviews-content">\n      <div class="xfcart-reviews-tab">\n        <div class="xfcart-reviews-tab__list">\n          <span\n            class="xfcart-reviews-tab__item xfcart-reviews-tab__item_on"\n            data-onlyimg="0">\n            ', n += p.comment_all.replace("{num}", "<span>0</span>"), n += '\n          </span>\n          <span\n            class="xfcart-reviews-tab__item"\n            data-onlyimg="1">\n            ', n += p.comment_with_photos.replace("{num}", "<span>0</span>"), n += '\n          </span>\n        </div>\n        <div tabindex="-1" class="xfcart-reviews-sort__text">\n          <span class="xfcart-reviews-sort__text-label">\n            ', n += t(p.comment_sort), n += '&nbsp;</span>\n          <span class="xfcart-reviews-sort__text_selected">\n            ', n += t(p.comment_sort_time), n += '</span>\n          <i class="xfcart-reviews-icon-down"></i>\n          <ul class="xfcart-reviews-sort__list">\n            <li class="xfcart-reviews-sort__option" data-order="created_at" data-order-text="', n += t(p.comment_sort_time), n += '">', n += t(p.comment_sort_time), n += '</li>\n            <li class="xfcart-reviews-sort__option" data-order="star" data-order-text="', n += t(p.comment_sort_star), n += '">', n += t(p.comment_sort_star), n += '</li>\n            <li class="xfcart-reviews-sort__option" data-order="like" data-order-text="', n += t(p.comment_sort_helpful), n += '">', n += t(p.comment_sort_helpful), n += '</li>\n          </ul>\n        </div>\n      </div>\n      <ul class="xfcart-reviews-list"></ul>\n    </div>\n    <div class="xfcart-reviews-pagination"></div>\n    ') : (n += '\n    <div class="xfcart-reviews-blank">\n      <div class="xfcart-reviews-blank__desc">', n += t(p.comment_no_tips), n += '</div>\n      <button type="button"\n        class="xfcart-reviews-header__write-btn btn btn-primary"\n        id="xfcart-reviews-write-btn">', n += t(p.comment_write), n += "</button>\n    </div>\n    "),
        n += "\n  </div>\n</div>"
    }},


    function (e, n, t) {
    var i = t(0);
    e.exports = function (e) {
        "use strict";
        e = e || {};
        var n = "",
            a = i.$escape,
            r = e.data,
            o = function (e) {
                return n += e
            },
            s = (e.comment_avg_star, e.style, e.fontSize, e.color, e.primary_color),
            l = e.i18n,
            p = e.i,
            _ = e.comment_config;
        n += '<div class="xfcart-reviews-header__rating bootstrap">\n  <div class="xfcart-reviews-header__rating_sum">\n    <div class="xfcart-reviews-header__rating_sum-rating">\n      ',
        n += a(r.comment_avg_star),
        n += '/<span style="font-size: 16px">5</span>\n    </div>\n    <div class="xfcart-reviews-header__rating_sum-stars">\n      ',
        o(t(2)({
                data: {
                    comment_avg_star: r.comment_avg_star
                },
                style: {
                    fontSize: "16px",
                    color: s
                }
            })),
        n += '\n      <p class="xfcart-reviews-header__rating_sum-text">\n        ',
        n += a(l.comment_total.replace("{num}", r.published_count)),
        n += '\n      </p>\n    </div>\n  </div>\n  <div class="xfcart-reviews-header__rating_distibutions-rating">\n    <div class="xfcart-reviews-distributions-rating">\n      ';
        for (p = 0; p < r.star_detail_list.length; p++) n += '\n      <div class="xfcart-reviews-distributions-rating__row">\n        <div style="width: 78px; margin-right: 15px; line-height: 10px;">\n          ',
        o(t(2)({
                data: {
                    comment_avg_star: 5 - p
                },
                style: {
                    fontSize: "12px",
                    color: "#999"
                }
            })),
        n += '\n        </div>\n        <progress\n          class="xfcart-reviews-distributions-rating__progress"\n          value="',
        n += a(r.star_detail_list[4 - p]),
        n += '"\n          max="',
        n += a(r.published_count),
        n += '"></progress>\n        <div>\n          ',
        _ && _.show_percentage && r.published_count < +_.show_percentage_num ? (n += "\n            ", n += a(r.star_detail_percent_list[4 - p]), n += "%\n          ") : (n += "\n            (", n += a(r.star_detail_list[4 - p]), n += ")\n          "),
        n += "\n        </div>\n      </div>\n      ";
        return n += '\n    </div>\n  </div>\n  <div class="xfcart-reviews-header__write-btn-container">\n    <button type="button" \n      class="xfcart-reviews-header__write-btn btn btn-primary"\n      id="xfcart-reviews-write-btn">',
        n += a(l.comment_write),
        n += "</button>\n  </div>\n</div>"
    }},


    function (e, n, t) {
    var i = t(0);
    e.exports = function (e) {
        "use strict";
        var n = "",
            a = (e = e || {}).i,
            r = e.data,
            o = i.$escape,
            s = function (e) {
                return n += e
            },
            l = (e.comment_avg_star, e.style, e.fontSize, e.color, e.primary_color),
            p = e.comment_config,
            _ = e.j,
            d = e.i18n,
            c = e.reply,
            v = e.shop_name;
        for (a = 0; a < r.list.length; a++) {
                if (n += '\n<li class="xfcart-reviews-list__item bootstrap"\n  data-id="', n += o(r.list[a].id), n += '"\n  data-like-status="', n += o(r.list[a].like_status), n += '">\n  <div class="xfcart-reviews-list__item_header align-items-center">\n    <div class="xfcart-reviews-list__item_header-img notranslate">', n += o(r.list[a].first_letter), n += '</div>\n    <div class="xfcart-reviews-list__item_header-rating">\n      <div class="xfcart-reviews-list__item_header-rating-name notranslate">', n += o(r.list[a].username), n += "</div>\n      ", s(t(2)({
                    data: {
                        comment_avg_star: r.list[a].star
                    },
                    style: {
                        fontSize: "12px",
                        color: l
                    }
                })), n += "\n    </div>\n    ", p && p.show_flag && (n += "\n      ", r.list[a].iso_code_3 && (n += '\n        <div class="xfcart-reviews-list__item_header-country_code notranslate">', n += o(r.list[a].iso_code_3), n += "</div>\n      "), n += "\n      ", r.list[a].flag && (n += '\n        <div class="xfcart-reviews-list__item_header-country_flag_wrap">\n          <img class="xfcart-reviews-list__item_header-country_flag lazyload" data-src=\'', n += o(r.list[a].flag), n += "' />\n        </div>\n      "), n += "\n    "), n += '\n  </div>\n  <p class="xfcart-reviews-list__item_content">', n += o(r.list[a].content), n += "</p>\n  ", r.list[a].img.length > 0) {
                    n += '\n  <ul class="xfcart-reviews-list__item_img-list xfcart-reviews-img-list">\n    ';
                    for (_ = 0; _ < r.list[a].img.length; _++) n += '\n    <li class="xfcart-reviews-list__item_img-item xfcart-reviews-img-item">\n      <img class="lazyload" data-origin="',
                    n += o(i.reset_image(r.list[a].img[_], "")),
                    n += '" data-src="',
                    n += o(i.reset_image(r.list[a].img[_], "")),
                    n += '" alt="">\n    </li>\n    ';
                    n += "\n  </ul>\n  "
                }
                if (n += '\n  <div class="xfcart-reviews-list__item_footer">\n    <span>', n += o(r.list[a].created_at), n += '</span>\n    <span\n      class="xfcart-reviews-list__item_footer-right">\n        ', n += o(d.comment_help_tips), n += '\n        <i class="xfcart-reviews-icon-like\n          xfcart-reviews-like\n          ', 1 == r.list[a].like_status && (n += "xfcart-reviews-icon-like_on"), n += '"></i>\n        <span class="xfcart-reviews-like-count">', n += o(r.list[a].like), n += "</span></span>\n  </div>\n  ", r.list[a].reply) {
                    n += "\n    ";
                    for (_ = 0; _ < r.list[a].reply.length; _++) {
                        n += "\n      ";
                        c = r.list[a].reply[_];
                        n += '\n      <div class="xfcart-reviews-reply">\n        <div class="xfcart-reviews-reply-shop-name">',
                        n += v,
                        n += '</div>\n        <div class="xfcart-reviews-reply-content">',
                        n += o(c.content),
                        n += '</div>\n        <div class="xfcart-reviews-reply-time">',
                        n += o(c.created_at),
                        n += "</div>\n      </div>\n    "
                    }
                    n += "\n  "
                }
                n += "\n</li>\n"
            }
        return n
    }},


    function (e, n, t) {
    var i = t(0);
    e.exports = function (e) {
        "use strict";
        e = e || {};
        var n = "",
            t = i.$escape,
            a = e.pageType,
            r = e.i,
            o = e.pagesInView;
        n += '<a\n  class="xfcart-reviews-pagination__item xfcart-reviews-pagination__first"\n  data-page="',
        n += t(a.firstPage),
        n += '"></a>\n<a\n  class="xfcart-reviews-pagination__item xfcart-reviews-pagination__prev"\n  data-page="',
        n += t(a.prevPage),
        n += '"></a>\n';
        for (r = 0; r < o.length; r++) n += '\n<a\n  class="xfcart-reviews-pagination__item\n    ',
        o[r] == a.currentPage && (n += "\n      xfcart-reviews-pagination__item_on\n    "),
        n += '"\n  data-page="',
        n += t(o[r]),
        n += '">',
        n += t(o[r]),
        n += "</a>\n";
        return n += '\n<a\n  class="xfcart-reviews-pagination__item xfcart-reviews-pagination__next"\n  data-page="',
        n += t(a.nextPage),
        n += '"></a>\n<a\n  class="xfcart-reviews-pagination__item xfcart-reviews-pagination__last"\n  data-page="',
        n += t(a.lastPage),
        n += '"></a>'
    }},


    function (e, n, t) {
    var i = t(0);
    e.exports = function (e) {
        "use strict";
        var n = "",
            t = ((e = e || {}).isNew, e.shop_params),
            a = e.position,
            r = i.$escape,
            o = e.primary_color;
        n += "\n";
        a = "center";
        return n += "\n",
        /Boost|Hero|Nova|Hyde/.test(t.merchant_theme_name) ? (n += "\n  ", a = "inherit", n += "\n") : (n += "\n  ", a = "center", n += "\n"),
        n += '\n\n<style type="text/css">\n.xfcart-reviews-container *,\n.xfcart-reviews-container ::after,\n.xfcart-reviews-container ::before {\n  box-sizing: border-box;\n\n  /* 避免移动端点击淡蓝色 */\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n\n.xfcart-reviews-container {\n  flex-grow: 1;\n  width: 100%;\n}\n@media (max-width: 767.98px) {\n  .row .xfcart-reviews-container {\n    padding: 0 15px;\n  }\n}\n\n.xfcart-reviews {\n  box-sizing: border-box;\n  color: #212121;\n  font-family: Tahoma;\n  margin-top: 30px;\n  padding-bottom: 30px;\n}\n\n.xfcart-reviews .show {\n  display: block;\n}\n\n.xfcart-reviews .rotate180 {\n  transform: rotate(-180deg);\n}\n\n/* tags */\n\n.xfcart-reviews-tags__h5 {\n  margin: 40px 0 0;\n  color: #212121;\n  font-size: 14px;\n}\n\n.xfcart-reviews-tags {\n  color: #212121;\n  font-weight: bold;\n  margin: 10px 0 -10px;\n  font-size: 0;\n  display: flex;\n  flex-wrap: wrap;\n}\n\n.xfcart-reviews-tags__item {\n  display: inline-block;\n  background: #eee;\n  border-radius: 4px;\n  padding: 10px 20px;\n  font-size: 12px;\n  margin: 0 10px 10px 0;\n}\n\n.xfcart-reviews-tags__item:last-child {\n  margin-right: 0;\n}\n\n/* tags end */\n\n/* tags sort */\n\n.xfcart-reviews-sort__text {\n  float: right;\n  position: relative;\n  outline: none;\n}\n\n@media (max-width: 767.98px) {\n  .xfcart-reviews-sort__text{\n    min-width: 22px;\n    width: 22px;\n    height: 14px;\n    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAAA4CAYAAAB5YT9uAAAABGdBTUEAALGPC/xhBQAAAZ1JREFUeAHt2rFOhEAQxnEPLpdYWBkgJkcBNBT6ALyMta0vYm1t4lPY0GFvy3U0QHKtCRgQykn2ik1mLeR/3ezefpf5Zaud2yVJMl9ZfHzfL+q6/jQdSdP0eZ7nF9PeVte8rTb+V30D7FgaYIAdCziO5wYD7FjAcTw3GGDHAo7jucEAOxZwHM8Ndgy89zzvweY3giA4LW8RxiOHw+FtHMcP4yaLCCCAAAIIIIAAAgggsBmBXZZloU23cRyfy7L8MZ0piuK667ob095W1/bTNLU2zTdNUyzfN06V27Z9YqosNXmLkB7qFcDqpDIQYOmhXgGsTioDAZYe6hXA6qQyEGDpoV4BrE4qAwGWHuoVwOqkMhBg6aFerVPlyCb1eDyeL02Voyh6XR573m3y+C4CCCCAAAIIIIAAAgj8P4F1qnxv01YYhqeqqr5NZ/I8v13+vnpn2tvq2jpV/rJpvu/7i1PlYRgemSpLTd4ipId6BbA6qQwEWHqoVwCrk8pAgKWHegWwOqkMBFh6qFcAq5PKQIClh3oFsDqpDARYeqhXv8ynR+bI4VUyAAAAAElFTkSuQmCC) no-repeat;\n    background-size: 100%;\n    padding-bottom: 26px;\n    top: 4px;\n  }\n}\n\n.xfcart-reviews-sort__text .xfcart-reviews-sort__text-label,\n.xfcart-reviews-sort__text .xfcart-reviews-sort__text_selected,\n.xfcart-reviews-sort__text .xfcart-reviews-icon-down{\n  display: none;\n}\n\n.xfcart-reviews-sort__text_selected {\n  color: #212121;\n  cursor: pointer;\n}\n\n.xfcart-reviews-sort__text-label {\n  color: #a2a2a2;\n}\n\n.xfcart-reviews-sort__list {\n  position: absolute;\n  padding: 0;\n  min-width: 126px;\n  background: rgba(255, 255, 255, 1);\n  box-shadow: 2px 2px 10px 0 rgba(199, 199, 199, 1);\n  border-radius: 8px;\n  list-style: none;\n  display: none;\n  flex-direction: column;\n  text-align: left;\n  font-size: 14px;\n  right: 0;\n  top: 120%;\n  margin: 0;\n  text-indent: 15px;\n  overflow: hidden;\n  z-index:4;\n}\n\n.xfcart-reviews-sort__option {\n  height: 37px;\n  line-height: 37px;\n  cursor: pointer;\n  text-indent: 0;\n  padding:0 10px;\n  white-space: nowrap;\n}\n\n.xfcart-reviews-sort__option:hover,\n.xfcart-reviews-sort__option:focus {\n  background-color: #eee;\n}\n\n/* tags sort end */\n\n/* stars */\n\n.xfcart-reviews-rating {\n  color: ',
        n += r(o),
        n += ";\n  font-size: 0;\n}\n\n.xfcart-reviews-rating-wrap {\n  display: inline-block;\n  vertical-align: bottom;\n  white-space: nowrap;\n}\n\n/* 插入星星的样式 */\n\n.product-snippet__title-normal + .xfcart-reviews-rating-wrap {\n  margin-top: 10px;\n  position: relative;\n  left: 50%;\n  transform: translateX(-50%);\n}\n\n.product-info__header_title + .xfcart-reviews-rating-wrap {\n  margin-bottom: 10px;\n}\n\n.product-snippet__title-plus + .xfcart-reviews-rating-wrap {\n  margin-bottom: 20px;\n}\n\n.featured-product__title + .xfcart-reviews-rating-wrap {\n  margin-top: -5px;\n  margin-bottom: 10px;\n}\n\n[data-animate_sections] .product-snippet .xfcart-reviews-rating-wrap {\n  text-align: ",
        n += r(a),
        n += ";\n  justify-content: ",
        n += r(a),
        n += ";\n}\n\n.product-snippet .xfcart-reviews-rating-wrap {\n  text-align: ",
        n += r(a),
        n += ";\n  justify-content: ",
        n += r(a),
        n += ";\n  width: 100%;\n}\n\n.common__product-gap .xfcart-reviews-rating-wrap {\n  text-align: center;\n  justify-content: center;\n}\n\n/* 插入星星的样式 end */\n\n.xfcart-reviews-rating > span {\n  display: inline-block;\n  position: relative;\n  outline: none;\n  user-select: none;\n  line-height: 1em;\n  margin-left: 3px;\n  font-family: monospace;\n  text-align: center;\n}\n\n.xfcart-reviews__rating-active svg:nth-child(2) {\n  position: absolute;\n  top: 0;\n  left: 50%;\n  transform: translate(-50%);\n  z-index: 1;\n}\n\n.xfcart-reviews-rating > span:first-child {\n  margin-left: 0;\n}\n\n.xfcart-reviews__rating-view {\n  font-size: 14px;\n  margin-left: 10px;\n}\n\n.xfcart-reviews__rating-num {\n  margin-left: 5px;\n  border-bottom: 1px solid transparent;\n  display: inline-block;\n}\n\n.product-info__header_title ~ .xfcart-reviews-rating-wrap .xfcart-reviews__rating-num,\n.product-info__header_title ~ .xfcart-reviews-rating-wrap {\n  cursor: pointer;\n}\n\n.product-info__header_title ~ .xfcart-reviews-rating-wrap:hover .xfcart-reviews__rating-num {\n  border-bottom-color: ",
        n += r(o),
        n += ";\n}\n\n/* stars end */\n\n/* header */\n\n.xfcart-reviews-header__h {\n  margin-top: 30px;\n  text-align: center;\n  font-size: 22px;\n  font-weight: 500;\n  color: rgba(0, 0, 0, 1);\n}\n\n.xfcart-reviews-container .xfcart-reviews-header_instructions{\n  word-break: break-word;\n  margin-top: 20px;\n  color: #999999;\n}\n\n.xfcart-reviews-header__rating_sum {\n  display: flex;\n}\n\n.xfcart-reviews-header__rating_sum-rating {\n  background: ",
        n += r(o),
        n += ';\n  color: #fff;\n  border-radius: 4px;\n  font-size: 20px;\n  width: 60px;\n  height: 60px;\n  line-height: 60px;\n  text-align: center;\n  font-weight: bold;\n  font-family: "PingFang SC";\n}\n\n.xfcart-reviews-header__rating_sum-stars {\n  padding-top: 3px;\n  margin-left: 15px;\n}\n\n.xfcart-reviews-header__rating_sum-text {\n  font-size: 14px;\n  line-height: 1.2;\n  margin: 10px auto 0;\n  color: #585858;\n}\n\n.xfcart-reviews-header__rating_distibutions-rating {\n  margin: 40px 0 20px;\n}\n\n.xfcart-reviews-header__write-btn {\n  width: 100%;\n  color: #fff;\n  padding-top: 10px;\n  padding-bottom: 10px;\n  font-size: 14px;\n  outline: none;\n  border: none;\n  font-family: Tahoma;\n  cursor: pointer;\n}\n\n.xfcart-reviews-container button:focus {\n  outline: none;\n}\n\n/* header end */\n\n/* xfcart-reviews-distributions-rating */\n\n.xfcart-reviews-distributions-rating {\n  font-size: 12px;\n  margin: 42px 0 40px;\n}\n\n.xfcart-reviews-distributions-rating__row {\n  display: flex;\n  align-items: center;\n  font-size: 12px;\n  height: 10px;\n  margin-top: 10px;\n  color: #585858;\n}\n\n.xfcart-reviews-distributions-rating__row:first-child {\n  margin-top: 0;\n}\n\n.xfcart-reviews-distributions-rating__progress {\n  height: 10px;\n  width: 170px;\n  background-color: #eee;\n  margin-right: 15px;\n  margin-left: 10px;\n}\n\n.xfcart-reviews-distributions-rating__progress::-webkit-progress-bar {\n  background-color: #eee;\n}\n\n.xfcart-reviews-distributions-rating__progress::-webkit-progress-value {\n  background-color: ',
        n += r(o),
        n += ";\n}\n\n.xfcart-reviews-distributions-rating__progress::-moz-progress-bar {\n  background-color: ",
        n += r(o),
        n += ";\n}\n\n/* xfcart-reviews-distributions-rating end */\n\n/* xfcart-reviews-tab */\n\n.xfcart-reviews-content {\n  margin-top: 40px;\n}\n\n.xfcart-reviews-tab {\n  border-bottom: 1px solid #eee;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  font-size: 14px;\n}\n\n.xfcart-reviews-tab__list {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  max-width: 80%;\n}\n\n.xfcart-reviews-tab__item {\n  padding-bottom: 7px;\n  margin-right: 30px;\n  font-size: 14px;\n  text-align: center;\n  cursor: pointer;\n}\n\n.xfcart-reviews-tab__item_on {\n  color: ",
        n += r(o),
        n += ";\n  font-weight: bold;\n  border-bottom: 3px solid ",
        n += r(o),
        n += ";\n}\n\n/* xfcart-reviews-tab end */\n\n.xfcart-reviews-list {\n  margin: 0;\n  padding: 0;\n  list-style: none;\n  font-size: 14px;\n  padding-inline-start: 0;\n}\n\n.xfcart-reviews-list__item {\n  margin-top: 30px;\n  border-bottom: 1px solid #eee;\n  padding-bottom: 30px;\n}\n\n.xfcart-reviews-list__item_header {\n  display: flex;\n}\n\n.xfcart-reviews-list__item_header-rating {\n  display: flex;\n  flex: 1;\n  flex-direction: column;\n  justify-content: center;\n  margin-left: 14px;\n}\n\n.xfcart-reviews-list__item_header-img {\n  height: 44px;\n  width: 44px;\n  border-radius: 22px;\n  color: #666;\n  background-color: #e9e9e9;\n  line-height: 44px;\n  text-align: center;\n  font-size: 16px;\n}\n\n.xfcart-reviews-list__item_header-rating-name {\n  margin-bottom: 6px;\n  color: #212121;\n  font-weight: bold;\n}\n\n.xfcart-reviews-list__item_header-country_code{\n  font-size: 14px;\n}\n\n.xfcart-reviews-list__item_header-country_flag{\n  width: 33px;\n  border-radius: 2px;\n  margin-left: 10px;\n  vertical-align: center;\n}\n\n.xfcart-reviews-list__item_header-country_flag_wrap {\n  overflow: hidden;\n  width: 43px;\n}\n\n.xfcart-reviews-list__item_content {\n  margin-top: 15px;\n  color: #585858;\n  line-height: 1.5;\n}\n\n.xfcart-reviews-list__item_img-list {\n  margin-top: 15px;\n  list-style: none;\n  font-size: 14px;\n  padding-inline-start: 0;\n  display: flex;\n  flex-wrap: nowrap;\n  overflow: auto;\n}\n\n.xfcart-reviews-list__item_img-item {\n  background-color: #f5f5f5;\n  margin-left: 6px;\n  display: flex;\n  align-items: baseline;\n  justify-content: center;\n  cursor: zoom-in;\n  flex-shrink: 0;\n  width: 250px;\n}\n\n.xfcart-reviews-list__item_img-item img {\n  max-height: 100%;\n  max-width: 100%;\n  vertical-align: middle;\n}\n\n.xfcart-reviews-list__item_img-item:first-child {\n  margin-left: 0;\n}\n\n.xfcart-reviews-list__item_footer {\n  margin-top: 15px;\n  color: #9f9f9f;\n  display: flex;\n  justify-content: space-between;\n}\n\n.xfcart-reviews-list__item_footer-right {\n  display: flex;\n  align-items: center;\n}\n\n.xfcart-reviews-pagination {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 30px 0 0;\n  text-align: center;\n  font-size: 14px;\n  color: #999;\n  line-height: 1;\n}\n\n.xfcart-reviews-pagination__item {\n  margin: 0 10px;\n}\n\n.xfcart-reviews-pagination__item:hover {\n  cursor: pointer;\n  color: ",
        n += r(o),
        n += ";\n}\n\n.xfcart-reviews-pagination__item_on {\n  color: ",
        n += r(o),
        n += ";\n  font-weight: bold;\n}\n\n.xfcart-reviews-pagination__first,\n.xfcart-reviews-pagination__last,\n.xfcart-reviews-pagination__prev,\n.xfcart-reviews-pagination__next {\n  position: relative;\n  width: 10px;\n  height: 10px;\n}\n\n.xfcart-reviews-pagination__first::after,\n.xfcart-reviews-pagination__first::before,\n.xfcart-reviews-pagination__last::after,\n.xfcart-reviews-pagination__last::before,\n.xfcart-reviews-pagination__prev::after,\n.xfcart-reviews-pagination__next::after {\n  position: absolute;\n  left: 0;\n  top: 0;\n}\n\n.xfcart-reviews-pagination__last,\n.xfcart-reviews-pagination__next {\n  transform: rotate(180deg);\n}\n\n.xfcart-reviews-pagination__first::after,\n.xfcart-reviews-pagination__last::after,\n.xfcart-reviews-pagination__prev::after,\n.xfcart-reviews-pagination__next::after {\n  content: '';\n  border: 2px solid #999;\n  border-right: none;\n  border-bottom: none;\n  transform: rotate(-45deg);\n  width: 6.5px;\n  height: 6.5px;\n  left: 5px;\n  top: 2px;\n}\n\n.xfcart-reviews-pagination__first::before,\n.xfcart-reviews-pagination__last::before {\n  content: '';\n  border: 2px solid #999;\n  border-right: none;\n  border-bottom: none;\n  border-top: none;\n  width: 0;\n  height: 10px;\n  margin-right: 4px;\n}\n\n.xfcart-reviews-pagination__item:hover::after,\n.xfcart-reviews-pagination__item:hover::before {\n  border-color: ",
        n += r(o),
        n += ";\n}\n\n.xfcart-reviews-pagination__prev::after,\n.xfcart-reviews-pagination__next::after {\n  left: 0;\n}\n\n/* end pagination */\n\n/* icon */\n\n.xfcart-reviews-icon-like {\n  margin: 0 8px 0 20px;\n  width: 16px;\n  height: 16px;\n  display: inline-block;\n  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAAnRJREFUWAnFlstrE1EUxjuTmsSIj00jwYXmYSJKQchCwZX+By5E3LkTty4ENxKwCxfduXEhiFnqRlBBu2mlPhYSoYUohDwE40YXSUFa2zzG30maMjO5mbQZOnPhJPec79zzfffcyZ1MTbkciUTiDraGraZSqYt7LafvdYE5P5fL6YZhzGFHsNlut/sOIafNOePmgXEJTni9Xj8B8V1TToj50Waz+dIUc5y66gA7jimqX8tmswcUcWXIlQB2f0FR9WCj0TiliCtDrgRomnZVVRVh+y8gmUxeguiKSoCu621VXBWbuAOQP1AVlBidaY7C7PGJBLD76wi4bC828AOBwP4J4LI5C/mTAZn9m91vxWKxn/b4KF8bBajikM/w0/uAgLQK346t1Gq18w64Bdr1EcTj8eOQL44hl/P/ZGEY40wLnslkDrfb7ZMU3+kIhTYqlUpZcLly8/n8K/Bz4jsNcn5xHc865VDbCIfDP4rF4l+N5BskP2WhXKOWQeK9arX6MJ1On2m1Wt8toEuH2pvYzWmI56k1RC71wXpn2el0DrnkG1q+veF5eQaODaHeBYIi4I93fFYmuvBV5xx8EwD3Z187gIBl+Ufz29oYz7x1BHz0rQOQL5XL5U3enLovHUDAW+m1bx3gjfmmJ8CPZ0DOvlQqVX3rAAKeCbkMPRQKef0M/KPrz/v0CIhEIl5fRC94wa3tCCgUCus4Yp4M2v/ITCS/AhmeHAPky+z+S5+y/9kTAODJMXDnzJnJZT4QsGIHxEeYoYpPEqPWY26+BfvanoBgMHgf4D3WMSVsMH8tfjQa/UaBognb1ZQ1W9gqO79F62+rFv0HTa7RgTTLPI4AAAAASUVORK5CYII=) no-repeat;\n  background-size: 100%;\n  opacity: 0.4;\n  cursor: pointer;\n}\n\n.xfcart-reviews-icon-like_on {\n  opacity: 1;\n}\n\n.xfcart-reviews-icon-down {\n  display: inline-block;\n  border-style: solid;\n  border-width: 9px;\n  border-color: transparent;\n  width: 0;\n  height: 0;\n  border-top-color: #000;\n  border-bottom-width: 0;\n  margin-left: 20px;\n  transition: transform 0.2s linear;\n  cursor: pointer; \n }\n\n/* blank */\n\n.xfcart-reviews-blank {\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n}\n\n.xfcart-reviews-blank__desc {\n  margin-bottom: 20px;\n}\n\n/* blank end */\n\n@media (min-width: 768px) {\n  .xfcart-reviews {\n    padding: 30px;\n    margin-top: 40px;\n    border: 1px solid #eee;\n  }\n\n  .xfcart-reviews-header__h {\n    margin-top: 56px;\n    font-size: 32px;\n  }\n\n  .xfcart-reviews-container .xfcart-reviews-header_instructions{\n    margin-top: 24px;\n  }\n\n  .xfcart-reviews-header__rating {\n    display: flex;\n    justify-content: space-between;\n  }\n\n  .xfcart-reviews-list__item_header-country_code{\n    font-size: 12px;\n  }\n\n  .xfcart-reviews-header__rating_distibutions-rating {\n    margin: 0;\n    margin-right: 30px;\n    padding-right: 30px;\n    border-right: 1px solid #eee;\n  }\n\n  .xfcart-reviews-distributions-rating {\n    margin: 0;\n  }\n\n  .xfcart-reviews-header__write-btn {\n    max-width: 260px;\n  }\n\n  .xfcart-reviews-header__rating_sum {\n    margin-right: 30px;\n    padding-right: 30px;\n    border-right: 1px solid #eee;\n  }\n\n  .xfcart-reviews-header__write-btn-container {\n    flex: 1;\n    display: flex;\n    align-items: flex-start;\n    justify-content: flex-end;\n  }\n\n  .xfcart-reviews-sort__text .xfcart-reviews-sort__text-label,\n  .xfcart-reviews-sort__text .xfcart-reviews-sort__text_selected,\n  .xfcart-reviews-sort__text .xfcart-reviews-icon-down {\n    display: inline-block;\n  }\n\n  .xfcart-reviews-blank__desc {\n    margin-bottom: 30px;\n  }\n\n  .xfcart-reviews-distributions-rating__progress {\n    width: 110px;\n  }\n}\n\n\n.review-product-item.on:after{\n  background-color:",
        n += r(o),
        n += ";\n}\n\n/* 评论回复 */\n.xfcart-reviews-reply{\n  margin-top: 30px;\n  padding: 20px;\n  font-size: 14px;\n  line-height: 1;\n  background: #eeeeee;\n}\n\n.xfcart-reviews-reply-shop-name{\n  font-weight: 500;\n  color: #212121;\n}\n\n.xfcart-reviews-reply-content{\n  margin-top: 10px;\n  color: #585858;\n  line-height: 1.5;\n}\n\n.xfcart-reviews-reply-time{\n  margin-top: 20px;\n  color: #585858;\n}\n\n@media (min-width: 768px) {\n  .xfcart-reviews-reply{\n    margin-top: 17px;\n    padding: 15px 10px;\n  }\n  .xfcart-reviews-reply-content{\n    margin-top: 5px;\n  }\n  .xfcart-reviews-reply-time{\n    margin-top: 15px;\n  }\n}\n\n/* 评论回复 end */\n\n\n/* 阿语适配 */\nhtml[dir='rtl'] .xfcart-reviews-header__rating_sum-stars {\n  margin-left: 0;\n  margin-right: 15px;\n}\n\nhtml[dir='rtl'] .xfcart-reviews-tab__item {\n  margin-left: 30px;\n  margin-right: 0;\n}\n\nhtml[dir='rtl'] .xfcart-reviews-list__item_header-rating {\n  margin-left: 0;\n  margin-right: 14px;\n}\n\n@media (min-width: 768px) {\n  html[dir='rtl'] .xfcart-reviews-header__rating_sum {\n    margin-right: 0;\n    padding-right: 0;\n    border-right: unset;\n  }\n\n  html[dir='rtl'] .xfcart-reviews-header__write-btn-container {\n    margin-right: 30px;\n    padding-right: 30px;\n    border-right: 1px solid #eee;\n  }\n\n  .xfcart-reviews__rating-view {\n    font-size: 16px;\n    margin-left: 10px;\n  }\n}\n\nhtml[dir='rtl'] .xfcart-reviews-distributions-rating__progress {\n  margin-right: 20px;\n  margin-left: 15px;\n}\n\nhtml[dir='rtl'] .xfcart-reviews-icon-down {\n  margin-right: 20px;\n  margin-left: 0;\n}\n\nhtml[dir='rtl'] .xfcart-reviews-sort__list {\n  left: 0;\n  right: unset;\n}\n</style>"
    }},


    function (e, n, t) {
    (function (n) {
        var i = t(33);
        e.exports = {
            getProductId: function (e, t) {
                n.ajax({
                  url: shop_url + '/products/comments?dt=product-id',
                  data: {
                    url: i.GET_PRODUCT_FROM_URL || t,
                  },
                  success: function (n) {
                    e(n)
                  },
                })
            },
            getCountStar: function (e, t) {
                n.ajax({
                  url: shop_url + '/products/comments?dt=count-star',
                  data: n.extend(
                    {
                      product_id: n.REVIEWS_GLOBAL.product_id,
                    },
                    e || {}
                  ),
                  success: t,
                })
            },
            getCountStarMulti: function (e, t) {
                n.ajax({
                  method: 'POST',
                  url: shop_url + '/products/comments?dt=count-star-multi',
                  data: JSON.stringify({
                    product_id: e,
                  }),
                  contentType: 'application/json; charset=utf-8',
                  dataType: 'json',
                  success: function (n) {
                    ;(n.productId = e.join(',')), !n.data.length && t(n)
                  },
                })
            },
            getReviews: function (e, t) {
                n.ajax({
                  url: shop_url + '/products/comments?dt=reviews',
                  data: n.extend(
                    {
                      product_id: n.REVIEWS_GLOBAL.product_id,
                      status: 1,
                      onlyimg: n.REVIEWS_GLOBAL.onlyimg,
                      order: n.REVIEWS_GLOBAL.order,
                      limit: n.REVIEWS_GLOBAL.limit,
                      page: n.REVIEWS_GLOBAL.page,
                    },
                    e || {}
                  ),
                  success: function (e) {
                    0 === e.state && t(e)
                  },
                })
            },
            likeReviews: function (e) {
                n.ajax({
                  url: shop_url + '/products/comments?dt=like',
                  type: 'post',
                  data: {
                    id: n.REVIEWS_GLOBAL.id,
                    status: 1 == n.REVIEWS_GLOBAL.like_status ? 0 : 1,
                  },
                  success: e,
                })
            }
        }
    }).call(this, t(1))},


    function (e, n) {
    e.exports = {}},


    function (e, n, t) {
    (function (n) {
        e.exports = {
            formatDate: function (e) {
                if (e) return (e = new Date(1e3 * e)).getMonth() + 1 + "/" + e.getDate() + "/" + e.getFullYear()
            },
            scrollTo: function (e, t) {
                0 !== e.length && n("body, html").stop().animate({
                    scrollTop: e.offset().top - (t || 0)
                }, 300)
            }
        }
    }).call(this, t(1))}]);