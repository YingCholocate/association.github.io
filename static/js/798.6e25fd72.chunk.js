"use strict";(self.webpackChunkassociation=self.webpackChunkassociation||[]).push([[798],{6433:function(t,e,n){var o=n(1413),c=n(4446),r=n.n(c),i=n(8979),a=n(8560),s="Token\u8ba4\u8bc1\u5931\u8d25\uff0c\u8bf7\u91cd\u65b0\u767b\u5f55",u="\u7f51\u7edc\u5f02\u5e38\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u540e\u91cd\u8bd5",l=r().create({baseURL:"http://localhost:3000",timeout:8e3,headers:{"Content-Type":"application/json"}});function d(t){return t.method=t.method||"get","get"===t.method.toLowerCase()&&(t.params=t.data),l.defaults.baseURL={NODE_ENV:"production",PUBLIC_URL:"./login",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_ENV:"production"}.BASEURL,l(t)}l.interceptors.request.use((function(t){var e=t.headers;encodeURIComponent(t.params);var n=localStorage.getItem("token");return n&&(e.common.Authorization="Bearer ".concat(n)),t})),l.interceptors.response.use((function(t){var e=t.status,n=t.data;return 200===e?null!==a.c.match("/mock")?n:{data:n}:1005===e?(i.ZP.error(s),Promise.reject(s)):(i.ZP.error(u),Promise.reject(u))})),["get","post","put","delete","patch"].forEach((function(t){d[t]=function(e,n,c){return d((0,o.Z)({method:t,url:e,data:n},c))}})),e.Z=l},6242:function(t,e,n){n.d(e,{LO:function(){return i},l2:function(){return a},pw:function(){return r}});var o=n(6433),c=n(8560),r=function(t){return o.Z.post("".concat(c.c,"/resourcedata"),t)},i=function(t){return o.Z.get("".concat(c.c,"/resourcedata"),{params:{type:1,currentPage:t}})},a=function(t){return o.Z.post("".concat(c.c,"/resourcedata"),t)}},6808:function(t,e,n){n.d(e,{Z:function(){return v}});var o=n(9439),c=n(8381),r=n(3949),i=n(8979),a=n(5097),s=n(2247),u=n(3604),l=n(3308),d={active:"Upload_active__4+OHo",contentStyles:"Upload_contentStyles__DWM+U",contenttitle:"Upload_contenttitle__zFomX","steps-action":"Upload_steps-action__4RbGI",stepsAction:"Upload_stepsAction__t9L4F",submitstyle:"Upload_submitstyle__WRzww"},p=n(2524),m=n(6242),h=n(9343),f=r.Z.Step,_=[{title:"First",content:"\u9009\u62e9\u8981\u4e0a\u4f20\u7684\u7c7b\u578b"},{title:"Second",content:"\u8f93\u5165"}],Z=[{department:"Mishu",content:"\u63a8\u6587"},{department:"Mishu",content:"\u8d44\u6599\u6587\u4ef6"}];function v(t){var e=(0,p.s0)(),n=(0,c.useState)(0),v=(0,o.Z)(n,2),g=v[0],S=v[1],j=(0,c.useState)(""),y=(0,o.Z)(j,2)[1],x=(0,c.useState)(t.type),P=(0,o.Z)(x,2),k=P[0],C=P[1],T=function(t){y((function(){return t.target.value})),"mishu"===k&&"\u63a8\u6587"===t.target.value?C(1):"mishu"===k&&"\u8d44\u6599\u6587\u4ef6"===t.target.value&&C(4)},U=function(t){var n=new Date;(0,m.l2)({link:t.link,title:t.title,uploadtime:"".concat(n.getFullYear(),"-").concat(n.getMonth()+1,"-").concat(n.getDate()).toString(),type:k,method:"add"}).then((function(){i.ZP.success("\u4e0a\u4f20\u6210\u529f"),setTimeout((function(){e("/")}),2e3)})).catch((function(){var o={link:t.link,title:t.title,uploadtime:"".concat(n.getFullYear(),"-").concat(n.getMonth()+1,"-").concat(n.getDate()).toString(),type:k,id:0,method:"add"};localStorage.setItem("type".concat(k),JSON.stringify(o)),i.ZP.success("\u4e0a\u4f20\u6210\u529f"),setTimeout((function(){e("/")}),2e3)}))};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(r.Z,{current:g,children:_.map((function(t){return(0,h.jsx)(f,{title:t.title},t.title)}))}),(0,h.jsxs)("div",{className:"contentStyles",children:[(0,h.jsx)("div",{className:d.contenttitle,children:_[g].content}),(0,h.jsx)("div",{className:"contenthore",children:0===g?(0,h.jsx)(a.ZP.Group,{onChange:T,children:"mishu"===k||1===k||4===k?Z.map((function(t){return(0,h.jsx)(a.ZP.Button,{value:t.content,children:t.content},t.content)})):(0,h.jsx)(a.ZP.Button,{value:Z[1].content,children:Z[1].content})}):1===g?(0,h.jsxs)(s.Z,{onFinish:U,children:[(0,h.jsx)(s.Z.Item,{label:"\u94fe\u63a5",name:"link",rules:[{required:!0,message:"Please input your link!"}],children:(0,h.jsx)(u.Z,{placeholder:"input \u94fe\u63a5"})}),(0,h.jsx)(s.Z.Item,{label:"\u6807\u9898",name:"title",rules:[{required:!0,message:"Please input your title!"}],children:(0,h.jsx)(u.Z,{placeholder:"input \u6587\u7ae0\u6807\u9898"})}),(0,h.jsx)(s.Z.Item,{children:(0,h.jsx)(l.Z,{type:"primary",className:d.submitstyle,htmlType:"submit",children:"Submit"})})]}):""})]}),(0,h.jsxs)("div",{className:d.stepsAction,children:[g<_.length-1&&(0,h.jsx)(l.Z,{type:"primary",onClick:function(){S(g+1)},children:"Next"}),g>0&&(0,h.jsx)(l.Z,{className:d.previesStyle,onClick:function(){S(g-1)},children:"Previous"})]})]})}},1798:function(t,e,n){n.r(e),n.d(e,{default:function(){return r}});n(8381);var o=n(6808),c=n(9343);function r(){return(0,c.jsx)(o.Z,{type:"2"})}},8560:function(t,e,n){n.d(e,{c:function(){return o}});var o="/mock"}}]);