!function(a,b){var c=function(b,c){var h=1===b.nodeType?b:document.querySelector(b),i=[].filter.call(h.children,function(a){return"SCRIPT"!==a.nodeName}),j=i[0],k={},l=function(a,b){i[a]&&(q("deactivate",r(j,b)),j=i[a],i.map(m),q("activate",r(j,b)),f(j,"active"),g(j,"inactive"))},m=function(a,b){var c=b-i.indexOf(j),d=c>0?"after":"before";["before(-\\d+)?","after(-\\d+)?","active","inactive"].map(g.bind(null,a)),a!==j&&["inactive",d,d+"-"+Math.abs(c)].map(f.bind(null,a))},n=function(a,b){return arguments.length?void(q("slide",r(i[a],b))&&l(a,b)):i.indexOf(j)},o=function(a,b){var c=i.indexOf(j)+a;q(a>0?"next":"prev",r(j,b))&&l(c,b)},p=function(a,b){return(k[a]||(k[a]=[])).push(b),function(){k[a]=k[a].filter(function(a){return a!==b})}},q=function(a,b){return(k[a]||[]).reduce(function(a,c){return a&&c(b)!==!1},!0)},r=function(a,b){return b=b||{},b.index=i.indexOf(a),b.slide=a,b},s={on:p,fire:q,slide:n,next:o.bind(null,1),prev:o.bind(null,-1),parent:h,slides:i};f(h,"parent"),i.map(function(a){f(a,"slide")});for(var t in c){if(!e[t])throw Error("Missing plugin: "+a+"-"+t);c[t]!==!1&&e[t](s,c[t])}return l(0),d.push(s),s},d=[],e={},f=function(b,c){b.classList.add(a+"-"+c)},g=function(b,c){b.className=b.className.replace(RegExp(a+"-"+c+"(\\s|$)","g")," ").trim()},h=function(a){return function(){var b=arguments;d.map(function(c){c[a].apply(null,b)})}};b[a]={from:c,slide:h("slide"),next:h("next"),prev:h("prev"),plugins:e}}("bespoke",window),bespoke.plugins.keys=function(a,b){var c=b===!0||"horizontal"==b;document.addEventListener("keydown",function(b){(34==b.which||32==b.which||c&&39==b.which||!c&&40==b.which)&&a.next(),(33==b.which||c&&37==b.which||!c&&38==b.which)&&a.prev()})},!function(a){a.plugins.scale=function(a,b){var c=a.parent,d=a.slides[0],e=d.offsetHeight,f=d.offsetWidth,g="zoom"===b||"zoom"in c.style&&"transform"!==b,h=function(a){var b=document.createElement("div");return b.className="bespoke-scale-parent",c.insertBefore(b,a),b.appendChild(a),b},i=g?a.slides:a.slides.map(h),j=function(a){var b="Moz Webkit O ms".split(" ");return b.reduce(function(b,d){return d+a in c.style?d+a:b},a.toLowerCase())}("Transform"),k=g?function(a,b){b.style.zoom=a}:function(a,b){b.style[j]="scale("+a+")"},l=function(){var a=c.offsetWidth/f,b=c.offsetHeight/e;i.forEach(k.bind(null,Math.min(a,b)))};window.addEventListener("resize",l),l()}}(bespoke),!function(a){a.plugins.progress=function(a,b){var c=document.createElement("div"),d=document.createElement("div"),e="vertical"===b?"height":["horizontal",!0].indexOf(b)+1?"width":void 0;e&&(c.className="bespoke-progress-parent",d.className="bespoke-progress-bar",c.appendChild(d),a.parent.appendChild(c),a.on("activate",function(b){d.style[e]=100*b.index/(a.slides.length-1)+"%"}))}}(bespoke),function(a){a.plugins.state=function(a){var b=function(b,c){var d=c.slide.getAttribute("data-bespoke-state");d&&d.split(" ").forEach(function(c){c&&a.parent.classList[b](c)})};a.on("activate",b.bind(null,"add")),a.on("deactivate",b.bind(null,"remove"))}}(bespoke),window.Modernizr=function(a,b,c){function d(a){s.cssText=a}function e(a,b){return typeof a===b}function f(a,b){return!!~(""+a).indexOf(b)}function g(a,b){for(var d in a){var e=a[d];if(!f(e,"-")&&s[e]!==c)return"pfx"==b?e:!0}return!1}function h(a,b,d){for(var f in a){var g=b[a[f]];if(g!==c)return d===!1?a[f]:e(g,"function")?g.bind(d||b):g}return!1}function i(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),f=(a+" "+v.join(d+" ")+d).split(" ");return e(b,"string")||e(b,"undefined")?g(f,b):(f=(a+" "+w.join(d+" ")+d).split(" "),h(f,b,c))}var j,k,l,m="2.6.2",n={},o=!0,p=b.documentElement,q="modernizr",r=b.createElement(q),s=r.style,t=({}.toString," -webkit- -moz- -o- -ms- ".split(" ")),u="Webkit Moz O ms",v=u.split(" "),w=u.toLowerCase().split(" "),x={},y=[],z=y.slice,A=function(a,c,d,e){var f,g,h,i,j=b.createElement("div"),k=b.body,l=k||b.createElement("body");if(parseInt(d,10))for(;d--;)h=b.createElement("div"),h.id=e?e[d]:q+(d+1),j.appendChild(h);return f=["&#173;",'<style id="s',q,'">',a,"</style>"].join(""),j.id=q,(k?j:l).innerHTML+=f,l.appendChild(j),k||(l.style.background="",l.style.overflow="hidden",i=p.style.overflow,p.style.overflow="hidden",p.appendChild(l)),g=c(j,a),k?j.parentNode.removeChild(j):(l.parentNode.removeChild(l),p.style.overflow=i),!!g},B={}.hasOwnProperty;l=e(B,"undefined")||e(B.call,"undefined")?function(a,b){return b in a&&e(a.constructor.prototype[b],"undefined")}:function(a,b){return B.call(a,b)},Function.prototype.bind||(Function.prototype.bind=function(a){var b=this;if("function"!=typeof b)throw new TypeError;var c=z.call(arguments,1),d=function(){if(this instanceof d){var e=function(){};e.prototype=b.prototype;var f=new e,g=b.apply(f,c.concat(z.call(arguments)));return Object(g)===g?g:f}return b.apply(a,c.concat(z.call(arguments)))};return d}),x.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:A(["@media (",t.join("touch-enabled),("),q,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=9===a.offsetTop}),c},x.cssanimations=function(){return i("animationName")},x.csstransitions=function(){return i("transition")};for(var C in x)l(x,C)&&(k=C.toLowerCase(),n[k]=x[C](),y.push((n[k]?"":"no-")+k));return n.addTest=function(a,b){if("object"==typeof a)for(var d in a)l(a,d)&&n.addTest(d,a[d]);else{if(a=a.toLowerCase(),n[a]!==c)return n;b="function"==typeof b?b():b,"undefined"!=typeof o&&o&&(p.className+=" "+(b?"":"no-")+a),n[a]=b}return n},d(""),r=j=null,function(a,b){function c(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function d(){var a=r.elements;return"string"==typeof a?a.split(" "):a}function e(a){var b=q[a[o]];return b||(b={},p++,a[o]=p,q[p]=b),b}function f(a,c,d){if(c||(c=b),k)return c.createElement(a);d||(d=e(c));var f;return f=d.cache[a]?d.cache[a].cloneNode():n.test(a)?(d.cache[a]=d.createElem(a)).cloneNode():d.createElem(a),f.canHaveChildren&&!m.test(a)?d.frag.appendChild(f):f}function g(a,c){if(a||(a=b),k)return a.createDocumentFragment();c=c||e(a);for(var f=c.frag.cloneNode(),g=0,h=d(),i=h.length;i>g;g++)f.createElement(h[g]);return f}function h(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return r.shivMethods?f(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+d().join().replace(/\w+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(r,b.frag)}function i(a){a||(a=b);var d=e(a);return r.shivCSS&&!j&&!d.hasCSS&&(d.hasCSS=!!c(a,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),k||h(a,d),a}var j,k,l=a.html5||{},m=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,n=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,o="_html5shiv",p=0,q={};!function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",j="hidden"in a,k=1==a.childNodes.length||function(){b.createElement("a");var a=b.createDocumentFragment();return"undefined"==typeof a.cloneNode||"undefined"==typeof a.createDocumentFragment||"undefined"==typeof a.createElement}()}catch(c){j=!0,k=!0}}();var r={elements:l.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:l.shivCSS!==!1,supportsUnknownElements:k,shivMethods:l.shivMethods!==!1,type:"default",shivDocument:i,createElement:f,createDocumentFragment:g};a.html5=r,i(b)}(this,b),n._version=m,n._prefixes=t,n._domPrefixes=w,n._cssomPrefixes=v,n.testProp=function(a){return g([a])},n.testAllProps=i,n.testStyles=A,n.prefixed=function(a,b,c){return b?i(a,b,c):i(a,"pfx")},p.className=p.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(o?" js "+y.join(" "):""),n}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==q.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=r.shift();s=1,a?a.t?o(function(){("c"==a.t?m.injectCss:m.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):s=0}function i(a,c,d,e,f,i,j){function k(b){if(!n&&g(l.readyState)&&(t.r=n=1,!s&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&o(function(){v.removeChild(l)},50);for(var d in A[c])A[c].hasOwnProperty(d)&&A[c][d].onload()}}var j=j||m.errorTimeout,l=b.createElement(a),n=0,q=0,t={t:d,s:c,e:f,a:i,x:j};1===A[c]&&(q=1,A[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,q)},r.splice(e,0,t),"img"!=a&&(q||2===A[c]?(v.insertBefore(l,u?null:p),o(k,j)):A[c].push(l))}function j(a,b,c,d,f){return s=0,b=b||"j",e(a)?i("c"==b?x:w,a,b,this.i++,c,d,f):(r.splice(this.i++,0,a),1==r.length&&h()),this}function k(){var a=m;return a.loader={load:j,i:0},a}var l,m,n=b.documentElement,o=a.setTimeout,p=b.getElementsByTagName("script")[0],q={}.toString,r=[],s=0,t="MozAppearance"in n.style,u=t&&!!b.createRange().compareNode,v=u?n:p.parentNode,n=a.opera&&"[object Opera]"==q.call(a.opera),n=!!b.attachEvent&&!n,w=t?"object":n?"script":"img",x=n?"script":w,y=Array.isArray||function(a){return"[object Array]"==q.call(a)},z=[],A={},B={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}};m=function(a){function b(a){var b,c,d,a=a.split("!"),e=z.length,f=a.pop(),g=a.length,f={url:f,origUrl:f,prefixes:a};for(c=0;g>c;c++)d=a[c].split("="),(b=B[d.shift()])&&(f=b(f,d));for(c=0;e>c;c++)f=z[c](f);return f}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(A[i.url]?i.noexec=!0:A[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),A[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(l=function(){var a=[].slice.call(arguments);m.apply(this,a),n()}),g(a,l,b,0,j);else if(Object(a)===a)for(i in h=function(){var b,c=0;for(b in a)a.hasOwnProperty(b)&&c++;return c}(),a)a.hasOwnProperty(i)&&(!c&&!--h&&(d(l)?l=function(){var a=[].slice.call(arguments);m.apply(this,a),n()}:l[i]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),n()}}(m[i])),g(a[i],l,b,i,j))}else!c&&n()}var h,i,j=!!a.test,k=a.load||a.both,l=a.callback||f,m=l,n=a.complete||f;c(j?a.yep:a.nope,!!k),k&&c(k)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(y(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):y(j)?m(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},m.addPrefix=function(a,b){B[a]=b},m.addFilter=function(a){z.push(a)},m.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",l=function(){b.removeEventListener("DOMContentLoaded",l,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k,l,n=b.createElement("script"),e=e||m.errorTimeout;n.src=a;for(l in d)n.setAttribute(l,d[l]);c=j?h:c||f,n.onreadystatechange=n.onload=function(){!k&&g(n.readyState)&&(k=1,c(),n.onload=n.onreadystatechange=null)},o(function(){k||(k=1,c(1))},e),i?n.onload():p.parentNode.insertBefore(n,p)},a.yepnope.injectCss=function(a,c,d,e,g,i){var j,e=b.createElement("link"),c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(p.parentNode.insertBefore(e,p),o(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))},BespokeFx={init:function(a,b){this.deck=a,this.direction=b.direction?b.direction:"horizontal",this.default_axis=this.getAxisFromDirection(this.direction),this.animEndEventName=this.animEndEventNames[Modernizr.prefixed("animation")],this.transition=b.transition?b.transition:"move",this.reverse=b.reverse?b.reverse:!1},getAxisFromDirection:function(a){return"vertical"==a?"Y":"X"},fx:{move:{X:{next:"move-to-left-from-right",prev:"move-to-right-from-left"},Y:{next:"move-to-top-from-bottom",prev:"move-to-bottom-from-top"}},"move-fade":{X:{next:"fade-from-right",prev:"fade-from-left"},Y:{next:"fade-from-bottom",prev:"fade-from-top"}},"move-both-fade":{X:{next:"fade-left-fade-right",prev:"fade-right-fade-left"},Y:{next:"fade-top-fade-bottom",prev:"fade-bottom-fade-top"}},"move-different-easing":{X:{next:"different-easing-from-right",prev:"different-easing-from-left"},Y:{next:"different-easing-from-bottom",prev:"different-easing-from-top"}},"scale-down-out-move-in":{X:{next:"scale-down-from-right",prev:"move-to-right-scale-up"},Y:{next:"scale-down-from-bottom",prev:"move-to-bottom-scale-up"}},"move-out-scale-up":{X:{next:"move-to-left-scale-up",prev:"scale-down-from-left"},Y:{next:"move-to-top-scale-up",prev:"scale-down-from-top"}},"scale-up-up":{X:{next:"scale-up-scale-up",prev:"scale-down-scale-down"},Y:{next:"scale-up-scale-up",prev:"scale-down-scale-down"}},"scale-down-up":{X:{next:"scale-down-scale-up",prev:"scale-down-scale-up"},Y:{next:"scale-down-scale-up",prev:"scale-down-scale-up"}},glue:{X:{next:"glue-left-from-right",prev:"glue-right-from-left"},Y:{next:"glue-top-from-bottom",prev:"glue-bottom-from-top"}},flip:{X:{next:"flip-left",prev:"flip-right"},Y:{next:"flip-top",prev:"flip-bottom"}},fall:{X:{next:"fall",prev:"fall"},Y:{next:"fall",prev:"fall"}},newspaper:{X:{next:"newspaper",prev:"newspaper"},Y:{next:"newspaper",prev:"newspaper"}},push:{X:{next:"push-left-from-right",prev:"push-right-from-left"},Y:{next:"push-top-from-bottom",prev:"push-bottom-from-top"}},pull:{X:{next:"push-left-pull-right",prev:"push-right-pull-left"},Y:{next:"push-bottom-pull-top",prev:"push-top-pull-bottom"}},fold:{X:{next:"fold-left-from-right",prev:"move-to-right-unfold-left"},Y:{next:"fold-bottom-from-top",prev:"move-to-top-unfold-bottom"}},unfold:{X:{next:"move-to-left-unfold-right",prev:"fold-right-from-left"},Y:{next:"move-to-bottom-unfold-top",prev:"fold-top-from-bottom"}},room:{X:{next:"room-to-left",prev:"room-to-right"},Y:{next:"room-to-bottom",prev:"room-to-top"}},cube:{X:{next:"cube-to-left",prev:"cube-to-right"},Y:{next:"cube-to-bottom",prev:"cube-to-top"}},carousel:{X:{next:"carousel-to-left",prev:"carousel-to-right"},Y:{next:"carousel-to-bottom",prev:"carousel-to-top"}},sides:{X:{next:"sides",prev:"sides"},Y:{next:"sides",prev:"sides"}},slide:{X:{next:"slide",prev:"slide"},Y:{next:"slide",prev:"slide"}}},animations:{"move-to-left-from-right":{id:1,group:"move",label:"Move to left / from right",outClass:"fx-slide-moveToLeft",inClass:"fx-slide-moveFromRight",reverse:"move-to-right-from-left"},"move-to-right-from-left":{id:2,group:"move",label:"Move to right / from left",outClass:"fx-slide-moveToRight",inClass:"fx-slide-moveFromLeft",reverse:"move-to-left-from-right"},"move-to-top-from-bottom":{id:3,group:"move",label:"Move to top / from bottom",outClass:"fx-slide-moveToTop",inClass:"fx-slide-moveFromBottom",reverse:"move-to-bottom-from-top"},"move-to-bottom-from-top":{id:4,group:"move",label:"Move to bottom / from top",outClass:"fx-slide-moveToBottom",inClass:"fx-slide-moveFromTop",reverse:"move-to-top-from-bottom"},"fade-from-right":{id:5,group:"fade",label:"Fade / from right",outClass:"fx-slide-fade",inClass:"fx-slide-moveFromRight fx-slide-ontop",reverse:"fade-from-left"},"fade-from-left":{id:6,group:"fade",label:"Fade / from left",outClass:"fx-slide-fade",inClass:"fx-slide-moveFromLeft fx-slide-ontop",reverse:"fade-from-right"},"fade-from-bottom":{id:7,group:"fade",label:"Fade / from bottom",outClass:"fx-slide-fade",inClass:"fx-slide-moveFromBottom fx-slide-ontop",reverse:"fade-from-top"},"fade-from-top":{id:8,group:"fade",label:"Fade / from top",outClass:"fx-slide-fade",inClass:"fx-slide-moveFromTop fx-slide-ontop",reverse:"fade-from-bottom"},"fade-left-fade-right":{id:9,group:"fade",label:"Fade left / Fade right",outClass:"fx-slide-moveToLeftFade",inClass:"fx-slide-moveFromRightFade",reverse:"fade-right-fade-left"},"fade-right-fade-left":{id:10,group:"fade",label:"Fade right / Fade left",outClass:"fx-slide-moveToRightFade",inClass:"fx-slide-moveFromLeftFade",reverse:"fade-left-fade-right"},"fade-top-fade-bottom":{id:11,group:"fade",label:"Fade top / Fade bottom",outClass:"fx-slide-moveToTopFade",inClass:"fx-slide-moveFromBottomFade",reverse:"fade-bottom-fade-top"},"fade-bottom-fade-top":{id:12,group:"fade",label:"Fade bottom / Fade top",outClass:"fx-slide-moveToBottomFade",inClass:"fx-slide-moveFromTopFade",reverse:"fade-top-fade-bottom"},"different-easing-from-right":{id:13,group:"different-easing",label:"Different easing / from right",outClass:"fx-slide-moveToLeftEasing fx-slide-ontop",inClass:"fx-slide-moveFromRight",reverse:"different-easing-from-left"},"different-easing-from-left":{id:14,group:"different-easing",label:"Different easing / from left",outClass:"fx-slide-moveToRightEasing fx-slide-ontop",inClass:"fx-slide-moveFromLeft",reverse:"different-easing-from-right"},"different-easing-from-bottom":{id:15,group:"different-easing",label:"Different easing / from bottom",outClass:"fx-slide-moveToTopEasing fx-slide-ontop",inClass:"fx-slide-moveFromBottom",reverse:"different-easing-from-top"},"different-easing-from-top":{id:16,group:"different-easing",label:"Different easing / from top",outClass:"fx-slide-moveToBottomEasing fx-slide-ontop",inClass:"fx-slide-moveFromTop",reverse:"different-easing-from-bottom"},"scale-down-from-right":{id:17,group:"scale",label:"Scale down / from right",outClass:"fx-slide-scaleDown",inClass:"fx-slide-moveFromRight fx-slide-ontop",reverse:"move-to-right-scale-up"},"scale-down-from-left":{id:18,group:"scale",label:"Scale down / from left",outClass:"fx-slide-scaleDown",inClass:"fx-slide-moveFromLeft fx-slide-ontop",reverse:"move-to-left-scale-up"},"scale-down-from-bottom":{id:19,group:"scale",label:"Scale down / from bottom",outClass:"fx-slide-scaleDown",inClass:"fx-slide-moveFromBottom fx-slide-ontop",reverse:"move-to-bottom-scale-up"},"scale-down-from-top":{id:20,group:"scale",label:"Scale down / from top",outClass:"fx-slide-scaleDown",inClass:"fx-slide-moveFromTop fx-slide-ontop",reverse:"move-to-top-scale-up"},"scale-down-scale-down":{id:21,group:"scale",label:"Scale down / scale down",outClass:"fx-slide-scaleDown",inClass:"fx-slide-scaleUpDown fx-slide-delay300",reverse:"scale-up-scale-up"},"scale-up-scale-up":{id:22,group:"scale",label:"Scale up / scale up",outClass:"fx-slide-scaleDownUp",inClass:"fx-slide-scaleUp fx-slide-delay300",reverse:"scale-down-scale-down"},"move-to-left-scale-up":{id:23,group:"scale",label:"Move to left / scale up",outClass:"fx-slide-moveToLeft fx-slide-ontop",inClass:"fx-slide-scaleUp",reverse:"scale-down-from-left"},"move-to-right-scale-up":{id:24,group:"scale",label:"Move to right / scale up",outClass:"fx-slide-moveToRight fx-slide-ontop",inClass:"fx-slide-scaleUp",reverse:"scale-down-from-right"},"move-to-top-scale-up":{id:25,group:"scale",label:"Move to top / scale up",outClass:"fx-slide-moveToTop fx-slide-ontop",inClass:"fx-slide-scaleUp",reverse:"scale-down-from-top"},"move-to-bottom-scale-up":{id:26,group:"scale",label:"Move to bottom / scale up",outClass:"fx-slide-moveToBottom fx-slide-ontop",inClass:"fx-slide-scaleUp",reverse:"scale-down-from-bottom"},"scale-down-scale-up":{id:27,group:"scale",label:"Scale down / scale up",outClass:"fx-slide-scaleDownCenter",inClass:"fx-slide-scaleUpCenter fx-slide-delay400",reverse:"scale-down-scale-up"},"glue-left-from-right":{id:28,group:"rotate:glue",label:"Glue left / from right",outClass:"fx-slide-rotateRightSideFirst",inClass:"fx-slide-moveFromRight fx-slide-delay200 fx-slide-ontop",reverse:"glue-right-from-left"},"glue-right-from-left":{id:29,group:"rotate:glue",label:"Glue right / from left",outClass:"fx-slide-rotateLeftSideFirst",inClass:"fx-slide-moveFromLeft fx-slide-delay200 fx-slide-ontop",reverse:"glue-left-from-right"},"glue-bottom-from-top":{id:30,group:"rotate:glue",label:"Glue bottom / from top",outClass:"fx-slide-rotateTopSideFirst",inClass:"fx-slide-moveFromTop fx-slide-delay200 fx-slide-ontop",reverse:"glue-top-from-bottom"},"glue-top-from-bottom":{id:31,group:"rotate:glue",label:"Glue top / from bottom",outClass:"fx-slide-rotateBottomSideFirst",inClass:"fx-slide-moveFromBottom fx-slide-delay200 fx-slide-ontop",reverse:"glue-bottom-from-top"},"flip-right":{id:32,group:"rotate:flip",label:"Flip right",outClass:"fx-slide-flipOutRight",inClass:"fx-slide-flipInLeft fx-slide-delay500",reverse:"flip-left"},"flip-left":{id:33,group:"rotate:flip",label:"Flip left",outClass:"fx-slide-flipOutLeft",inClass:"fx-slide-flipInRight fx-slide-delay500",reverse:"flip-right"},"flip-top":{id:34,group:"rotate:flip",label:"Flip top",outClass:"fx-slide-flipOutTop",inClass:"fx-slide-flipInBottom fx-slide-delay500",reverse:"flip-bottom"},"flip-bottom":{id:35,group:"rotate:flip",label:"Flip bottom",outClass:"fx-slide-flipOutBottom",inClass:"fx-slide-flipInTop fx-slide-delay500",reverse:"flip-top"},fall:{id:36,group:"rotate",label:"Fall",outClass:"fx-slide-rotateFall fx-slide-ontop",inClass:"fx-slide-scaleUp",reverse:"fall"},newspaper:{id:37,group:"rotate",label:"Newspaper",outClass:"fx-slide-rotateOutNewspaper",inClass:"fx-slide-rotateInNewspaper fx-slide-delay500",reverse:"newspaper"},"push-left-from-right":{id:38,group:"rotate:push-pull",label:"Push left / from right",outClass:"fx-slide-rotatePushLeft",inClass:"fx-slide-moveFromRight",reverse:"push-right-from-left"},"push-right-from-left":{id:39,group:"rotate:push-pull",label:"Push right / from left",outClass:"fx-slide-rotatePushRight",inClass:"fx-slide-moveFromLeft",reverse:"push-left-from-right"},"push-top-from-bottom":{id:40,group:"rotate:push-pull",label:"Push top / from bottom",outClass:"fx-slide-rotatePushTop",inClass:"fx-slide-moveFromBottom",reverse:"push-bottom-from-top"},"push-bottom-from-top":{id:41,group:"rotate:push-pull",label:"Push bottom / from top",outClass:"fx-slide-rotatePushBottom",inClass:"fx-slide-moveFromTop",reverse:"push-top-from-bottom"},"push-left-pull-right":{id:42,group:"rotate:push-pull",label:"Push left / pull right",outClass:"fx-slide-rotatePushLeft",inClass:"fx-slide-rotatePullRight fx-slide-delay180",reverse:"push-right-pull-left"},"push-right-pull-left":{id:43,group:"rotate:push-pull",label:"Push right / pull left",outClass:"fx-slide-rotatePushRight",inClass:"fx-slide-rotatePullLeft fx-slide-delay180",reverse:"push-left-pull-right"},"push-top-pull-bottom":{id:44,group:"rotate:push-pull",label:"Push top / pull bottom",outClass:"fx-slide-rotatePushTop",inClass:"fx-slide-rotatePullBottom fx-slide-delay180",reverse:"push-bottom-pull-top"},"push-bottom-pull-top":{id:45,group:"rotate:push-pull",label:"Push bottom / pull top",outClass:"fx-slide-rotatePushBottom",inClass:"fx-slide-rotatePullTop fx-slide-delay180",reverse:"push-top-pull-bottom"},"fold-left-from-right":{id:46,group:"rotate:fold-unfold",label:"Fold left / from right",outClass:"fx-slide-rotateFoldLeft",inClass:"fx-slide-moveFromRightFade",reverse:"move-to-right-unfold-left"},"fold-right-from-left":{id:47,group:"rotate:fold-unfold",label:"Fold right / from left",outClass:"fx-slide-rotateFoldRight",inClass:"fx-slide-moveFromLeftFade",reverse:"move-to-left-unfold-right"},"fold-top-from-bottom":{id:48,group:"rotate:fold-unfold",label:"Fold top / from bottom",outClass:"fx-slide-rotateFoldTop",inClass:"fx-slide-moveFromBottomFade",reverse:"move-to-bottom-unfold-top"},"fold-bottom-from-top":{id:49,group:"rotate:fold-unfold",label:"Fold bottom / from top",outClass:"fx-slide-rotateFoldBottom",inClass:"fx-slide-moveFromTopFade",reverse:"move-to-top-unfold-bottom"},"move-to-right-unfold-left":{id:50,group:"rotate:fold-unfold",label:"Move to right / unfold left",outClass:"fx-slide-moveToRightFade",inClass:"fx-slide-rotateUnfoldLeft",reverse:"fold-left-from-right"},"move-to-left-unfold-right":{id:51,group:"rotate:fold-unfold",label:"Move to left / unfold right",outClass:"fx-slide-moveToLeftFade",inClass:"fx-slide-rotateUnfoldRight",reverse:"fold-right-from-left"},"move-to-bottom-unfold-top":{id:52,group:"rotate:fold-unfold",label:"Move to bottom / unfold top",outClass:"fx-slide-moveToBottomFade",inClass:"fx-slide-rotateUnfoldTop",reverse:"fold-top-from-bottom"},"move-to-top-unfold-bottom":{id:53,group:"rotate:fold-unfold",label:"Move to top / unfold bottom",outClass:"fx-slide-moveToTopFade",inClass:"fx-slide-rotateUnfoldBottom",reverse:"fold-bottom-from-top"},"room-to-left":{id:54,group:"rotate:room",label:"Room to left",outClass:"fx-slide-rotateRoomLeftOut fx-slide-ontop",inClass:"fx-slide-rotateRoomLeftIn",reverse:"room-to-right"},"room-to-right":{id:55,group:"rotate:room",label:"Room to right",outClass:"fx-slide-rotateRoomRightOut fx-slide-ontop",inClass:"fx-slide-rotateRoomRightIn",reverse:"room-to-left"},"room-to-top":{id:56,group:"rotate:room",label:"Room to top",outClass:"fx-slide-rotateRoomTopOut fx-slide-ontop",inClass:"fx-slide-rotateRoomTopIn",reverse:"room-to-bottom"},"room-to-bottom":{id:57,group:"rotate:room",label:"Room to bottom",outClass:"fx-slide-rotateRoomBottomOut fx-slide-ontop",inClass:"fx-slide-rotateRoomBottomIn",reverse:"room-to-top"},"cube-to-left":{id:58,label:"Cube to left",outClass:"fx-slide-rotateCubeLeftOut fx-slide-ontop",inClass:"fx-slide-rotateCubeLeftIn",reverse:"cube-to-right"},"cube-to-right":{id:59,label:"Cube to right",outClass:"fx-slide-rotateCubeRightOut fx-slide-ontop",inClass:"fx-slide-rotateCubeRightIn",reverse:"cube-to-left"},"cube-to-top":{id:60,label:"Cube to top",outClass:"fx-slide-rotateCubeTopOut fx-slide-ontop",inClass:"fx-slide-rotateCubeTopIn",reverse:"cube-to-bottom"},"cube-to-bottom":{id:61,label:"Cube to bottom",outClass:"fx-slide-rotateCubeBottomOut fx-slide-ontop",inClass:"fx-slide-rotateCubeBottomIn",reverse:"cube-to-top"},"carousel-to-left":{id:62,group:"rotate:carousel",label:"Carousel to left",outClass:"fx-slide-rotateCarouselLeftOut fx-slide-ontop",inClass:"fx-slide-rotateCarouselLeftIn",reverse:"carousel-to-right"},"carousel-to-right":{id:63,group:"rotate:carousel",label:"Carousel to right",outClass:"fx-slide-rotateCarouselRightOut fx-slide-ontop",inClass:"fx-slide-rotateCarouselRightIn",reverse:"carousel-to-left"},"carousel-to-top":{id:64,group:"rotate:carousel",label:"Carousel to top",outClass:"fx-slide-rotateCarouselTopOut fx-slide-ontop",inClass:"fx-slide-rotateCarouselTopIn",reverse:"carousel-to-bottom"},"carousel-to-bottom":{id:65,group:"rotate:carousel",label:"Carousel to bottom",outClass:"fx-slide-rotateCarouselBottomOut fx-slide-ontop",inClass:"fx-slide-rotateCarouselBottomIn",reverse:"carousel-to-top"},sides:{id:66,group:"rotate",label:"Sides",outClass:"fx-slide-rotateSidesOut",inClass:"fx-slide-rotateSidesIn fx-slide-delay200",reverse:"sides"},slide:{id:67,label:"Slide",outClass:"fx-slide-rotateSlideOut",inClass:"fx-slide-rotateSlideIn",reverse:"slide"}},animEndEventNames:{WebkitAnimation:"webkitAnimationEnd",OAnimation:"oAnimationEnd",msAnimation:"MSAnimationEnd",animation:"animationend"},addClassNames:function(a,b){for(var c=b.split(" "),d=0;d<c.length;d++)a.classList.add(c[d])},removeClassNames:function(a,b){for(var c=b.split(" "),d=0;d<c.length;d++)a.classList.remove(c[d])},prev:function(a){if(a.index>0&&!a.transition_complete){var b=a.slide,c=this.deck.slides[a.index-1];this.doTransition(b,c,"prev")}},next:function(a){if(a.index<this.deck.slides.length-1){var b=a.slide,c=this.deck.slides[a.index+1];this.doTransition(b,c,"next")}},slide:function(a){if(a.slide){var b=this.deck.slide(),c=this.deck.slides[b],d=a.index,e=a.slide,f=d>b?"next":"prev";this.doTransition(c,e,f)}},doTransition:function(a,b,c){var d=b.getAttribute("data-bespoke-fx-direction")?this.getAxisFromDirection(b.getAttribute("data-bespoke-fx-direction")):this.default_axis;(this.reverse||"true"===b.getAttribute("data-bespoke-fx-reverse"))&&(c="next"===c?"prev":"next");var e=b.getAttribute("data-bespoke-fx-transition"),f=e?this.fx[e][d]:this.fx[this.transition][d],g=f[c],h=this.animations[g].outClass,i=this.animations[g].inClass,j=this;a.addEventListener(this.animEndEventName,function(a){j.removeClassNames(a.target,h+" fx-transitioning-out")}),b.addEventListener(this.animEndEventName,function(a){j.removeClassNames(a.target,i+" fx-transitioning-in")}),this.addClassNames(a,h+" fx-transitioning-out"),this.addClassNames(b,i+" fx-transitioning-in")}},function(a,b){a.plugins.fx=function(a,c){b.init(a,c),a.on("next",b.next.bind(b)),a.on("prev",b.prev.bind(b)),a.on("slide",b.slide.bind(b))}}(bespoke,BespokeFx),function(a){a.plugins.bullets=function(a,b){var c,d,e=a.slides.map(function(a){return[].slice.call(a.querySelectorAll("string"==typeof b?b:"[data-bespoke-bullet]"),0)}),f=function(){var a=c+1;return i(1)?(h(c,d+1),!1):void(e[a]&&h(a,0))},g=function(){var a=c-1;return i(-1)?(h(c,d-1),!1):void(e[a]&&h(a,e[a].length-1))},h=function(a,b){c=a,d=b,e.forEach(function(c,d){c.forEach(function(c,e){c.classList.add("bespoke-bullet"),a>d||d===a&&b>=e?(c.classList.add("bespoke-bullet-active"),c.classList.remove("bespoke-bullet-inactive")):(c.classList.add("bespoke-bullet-inactive"),c.classList.remove("bespoke-bullet-active"))})})},i=function(a){return void 0!==e[c][d+a]};a.on("next",f),a.on("prev",g),a.on("slide",function(a){h(a.index,0)}),h(0,0)}}(bespoke);var self="undefined"!=typeof window?window:{},Prism=function(){var a=/\blang(?:uage)?-(?!\*)(\w+)\b/i,b=self.Prism={util:{encode:function(a){return a instanceof c?new c(a.type,b.util.encode(a.content)):"Array"===b.util.type(a)?a.map(b.util.encode):a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(a){return Object.prototype.toString.call(a).match(/\[object (\w+)\]/)[1]},clone:function(a){var c=b.util.type(a);switch(c){case"Object":var d={};for(var e in a)a.hasOwnProperty(e)&&(d[e]=b.util.clone(a[e]));return d;case"Array":return a.slice()}return a}},languages:{extend:function(a,c){var d=b.util.clone(b.languages[a]);for(var e in c)d[e]=c[e];return d},insertBefore:function(a,c,d,e){e=e||b.languages;var f=e[a],g={};for(var h in f)if(f.hasOwnProperty(h)){if(h==c)for(var i in d)d.hasOwnProperty(i)&&(g[i]=d[i]);g[h]=f[h]}return e[a]=g},DFS:function(a,c){for(var d in a)c.call(a,d,a[d]),"Object"===b.util.type(a)&&b.languages.DFS(a[d],c)}},highlightAll:function(a,c){for(var d,e=document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'),f=0;d=e[f++];)b.highlightElement(d,a===!0,c)},highlightElement:function(d,e,f){for(var g,h,i=d;i&&!a.test(i.className);)i=i.parentNode;if(i&&(g=(i.className.match(a)||[,""])[1],h=b.languages[g]),h){d.className=d.className.replace(a,"").replace(/\s+/g," ")+" language-"+g,i=d.parentNode,/pre/i.test(i.nodeName)&&(i.className=i.className.replace(a,"").replace(/\s+/g," ")+" language-"+g);var j=d.textContent;if(j){var k={element:d,language:g,grammar:h,code:j};if(b.hooks.run("before-highlight",k),e&&self.Worker){var l=new Worker(b.filename);l.onmessage=function(a){k.highlightedCode=c.stringify(JSON.parse(a.data),g),b.hooks.run("before-insert",k),k.element.innerHTML=k.highlightedCode,f&&f.call(k.element),b.hooks.run("after-highlight",k)},l.postMessage(JSON.stringify({language:k.language,code:k.code}))}else k.highlightedCode=b.highlight(k.code,k.grammar,k.language),b.hooks.run("before-insert",k),k.element.innerHTML=k.highlightedCode,f&&f.call(d),b.hooks.run("after-highlight",k)}}},highlight:function(a,d,e){var f=b.tokenize(a,d);return c.stringify(b.util.encode(f),e)},tokenize:function(a,c){var d=b.Token,e=[a],f=c.rest;if(f){for(var g in f)c[g]=f[g];delete c.rest}a:for(var g in c)if(c.hasOwnProperty(g)&&c[g]){var h=c[g],i=h.inside,j=!!h.lookbehind,k=0;h=h.pattern||h;for(var l=0;l<e.length;l++){var m=e[l];
if(e.length>a.length)break a;if(!(m instanceof d)){h.lastIndex=0;var n=h.exec(m);if(n){j&&(k=n[1].length);var o=n.index-1+k,n=n[0].slice(k),p=n.length,q=o+p,r=m.slice(0,o+1),s=m.slice(q+1),t=[l,1];r&&t.push(r);var u=new d(g,i?b.tokenize(n,i):n);t.push(u),s&&t.push(s),Array.prototype.splice.apply(e,t)}}}}return e},hooks:{all:{},add:function(a,c){var d=b.hooks.all;d[a]=d[a]||[],d[a].push(c)},run:function(a,c){var d=b.hooks.all[a];if(d&&d.length)for(var e,f=0;e=d[f++];)e(c)}}},c=b.Token=function(a,b){this.type=a,this.content=b};if(c.stringify=function(a,d,e){if("string"==typeof a)return a;if("[object Array]"==Object.prototype.toString.call(a))return a.map(function(b){return c.stringify(b,d,a)}).join("");var f={type:a.type,content:c.stringify(a.content,d,e),tag:"span",classes:["token",a.type],attributes:{},language:d,parent:e};"comment"==f.type&&(f.attributes.spellcheck="true"),b.hooks.run("wrap",f);var g="";for(var h in f.attributes)g+=h+'="'+(f.attributes[h]||"")+'"';return"<"+f.tag+' class="'+f.classes.join(" ")+'" '+g+">"+f.content+"</"+f.tag+">"},!self.document)return self.addEventListener?(self.addEventListener("message",function(a){var c=JSON.parse(a.data),d=c.language,e=c.code;self.postMessage(JSON.stringify(b.tokenize(e,b.languages[d]))),self.close()},!1),self.Prism):self.Prism;var d=document.getElementsByTagName("script");return d=d[d.length-1],d&&(b.filename=d.src,document.addEventListener&&!d.hasAttribute("data-manual")&&document.addEventListener("DOMContentLoaded",b.highlightAll)),self.Prism}();"undefined"!=typeof module&&module.exports&&(module.exports=Prism),Prism.languages.markup={comment:/<!--[\w\W]*?-->/g,prolog:/<\?.+?\?>/,doctype:/<!DOCTYPE.+?>/,cdata:/<!\[CDATA\[[\w\W]*?]]>/i,tag:{pattern:/<\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+))?\s*)*\/?>/gi,inside:{tag:{pattern:/^<\/?[\w:-]+/i,inside:{punctuation:/^<\/?/,namespace:/^[\w-]+?:/}},"attr-value":{pattern:/=(?:('|")[\w\W]*?(\1)|[^\s>]+)/gi,inside:{punctuation:/=|>|"/g}},punctuation:/\/?>/g,"attr-name":{pattern:/[\w:-]+/g,inside:{namespace:/^[\w-]+?:/}}}},entity:/\&#?[\da-z]{1,8};/gi},Prism.hooks.add("wrap",function(a){"entity"===a.type&&(a.attributes.title=a.content.replace(/&amp;/,"&"))}),Prism.languages.css={comment:/\/\*[\w\W]*?\*\//g,atrule:{pattern:/@[\w-]+?.*?(;|(?=\s*{))/gi,inside:{punctuation:/[;:]/g}},url:/url\((["']?).*?\1\)/gi,selector:/[^\{\}\s][^\{\};]*(?=\s*\{)/g,property:/(\b|\B)[\w-]+(?=\s*:)/gi,string:/("|')(\\?.)*?\1/g,important:/\B!important\b/gi,punctuation:/[\{\};:]/g,"function":/[-a-z0-9]+(?=\()/gi},Prism.languages.markup&&Prism.languages.insertBefore("markup","tag",{style:{pattern:/<style[\w\W]*?>[\w\W]*?<\/style>/gi,inside:{tag:{pattern:/<style[\w\W]*?>|<\/style>/gi,inside:Prism.languages.markup.tag.inside},rest:Prism.languages.css}}}),Prism.languages.clike={comment:{pattern:/(^|[^\\])(\/\*[\w\W]*?\*\/|(^|[^:])\/\/.*?(\r?\n|$))/g,lookbehind:!0},string:/("|')(\\?.)*?\1/g,"class-name":{pattern:/((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/gi,lookbehind:!0,inside:{punctuation:/(\.|\\)/}},keyword:/\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/g,"boolean":/\b(true|false)\b/g,"function":{pattern:/[a-z0-9_]+\(/gi,inside:{punctuation:/\(/}},number:/\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g,operator:/[-+]{1,2}|!|<=?|>=?|={1,3}|&{1,2}|\|?\||\?|\*|\/|\~|\^|\%/g,ignore:/&(lt|gt|amp);/gi,punctuation:/[{}[\];(),.:]/g},Prism.languages.javascript=Prism.languages.extend("clike",{keyword:/\b(break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|function|get|if|implements|import|in|instanceof|interface|let|new|null|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/g,number:/\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?|NaN|-?Infinity)\b/g}),Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:/(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,lookbehind:!0}}),Prism.languages.markup&&Prism.languages.insertBefore("markup","tag",{script:{pattern:/<script[\w\W]*?>[\w\W]*?<\/script>/gi,inside:{tag:{pattern:/<script[\w\W]*?>|<\/script>/gi,inside:Prism.languages.markup.tag.inside},rest:Prism.languages.javascript}}}),function(){if(self.Prism&&self.document&&document.querySelector){var a={js:"javascript",html:"markup",svg:"markup",xml:"markup",py:"python"};Array.prototype.slice.call(document.querySelectorAll("pre[data-src]")).forEach(function(b){var c=b.getAttribute("data-src"),d=(c.match(/\.(\w+)$/)||[,""])[1],e=a[d]||d,f=document.createElement("code");f.className="language-"+e,b.textContent="",f.textContent="Loading…",b.appendChild(f);var g=new XMLHttpRequest;g.open("GET",c,!0),g.onreadystatechange=function(){4==g.readyState&&(g.status<400&&g.responseText?(f.textContent=g.responseText,Prism.highlightElement(f)):f.textContent=g.status>=400?"✖ Error "+g.status+" while fetching file: "+g.statusText:"✖ Error: File does not exist or is empty")},g.send(null)})}}();var deck=bespoke.from("article");bespoke.from("article",{keys:!0,scale:!0,progress:!0,state:!0,bullets:".bullet",fx:{direction:"horizontal",transition:"fall",reverse:!0}});