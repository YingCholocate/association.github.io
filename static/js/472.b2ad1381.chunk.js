"use strict";(self.webpackChunkassociation=self.webpackChunkassociation||[]).push([[472],{5044:function(e,n){n.Z={logo:"sandbox_logo__+35qp",root:"sandbox_root__chouc",layoutbody:"sandbox_layoutbody__xE0we",sider:"sandbox_sider__xQbVF",openstyle:"sandbox_openstyle__LXgUC",menustyle:"sandbox_menustyle__Affer",banvisible:"sandbox_banvisible__0BoZT"}},245:function(e,n,t){t.d(n,{a$:function(){return c},fp:function(){return u},h8:function(){return l},v0:function(){return i}});var o=t(4165),s=t(5861),r=t(6433),a=t(8560),i=function(){var e=(0,s.Z)((0,o.Z)().mark((function e(n){var t;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r.Z.get("".concat(a.c,"/users"),{params:{method:"getone",number:n.number,password:n.password}});case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),l=function(e){return r.Z.post("".concat(a.c,"/users"),e)},c=function(e){return r.Z.post("".concat(a.c,"/users"),{username:e.username,number:e.number,password:e.password,roleName:e.residence})},u=function(){return r.Z.get("".concat(a.c,"/users"),{params:{method:"getall"}})}},6433:function(e,n,t){var o=t(1413),s=t(4446),r=t.n(s),a=t(8979),i=t(8560),l="Token\u8ba4\u8bc1\u5931\u8d25\uff0c\u8bf7\u91cd\u65b0\u767b\u5f55",c="\u7f51\u7edc\u5f02\u5e38\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u540e\u91cd\u8bd5",u=r().create({baseURL:"http://localhost:3000",timeout:8e3,headers:{"Content-Type":"application/json"}});function d(e){return e.method=e.method||"get","get"===e.method.toLowerCase()&&(e.params=e.data),u.defaults.baseURL={NODE_ENV:"production",PUBLIC_URL:"./login",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_ENV:"production"}.BASEURL,u(e)}u.interceptors.request.use((function(e){var n=e.headers;encodeURIComponent(e.params);var t=localStorage.getItem("token");return t&&(n.common.Authorization="Bearer ".concat(t)),e})),u.interceptors.response.use((function(e){var n=e.status,t=e.data;return 200===n?null!==i.c.match("/mock")?t:{data:t}:1005===n?(a.ZP.error(l),Promise.reject(l)):(a.ZP.error(c),Promise.reject(c))})),["get","post","put","delete","patch"].forEach((function(e){d[e]=function(n,t,s){return d((0,o.Z)({method:e,url:n,data:t},s))}})),n.Z=u},7352:function(e,n,t){t.d(n,{s:function(){return S}});var o=t(9439),s=t(8381),r=t(5958),a=t(7314),i=t(7528),l=t(1919),c=t(3308),u=t(2524),d=t(8118),f=t(5361),m=t(8759),h=t(4969),p=t(1026),x=t(5044),g=t(440),y=t(41),j=t(2535),b=t(7821),Z=t(9343),v=r.Z.Sider,S=[{key:"/association.github.io",label:"\u9996\u9875",icon:(0,Z.jsx)(d.Z,{}),roles:["admin","member","shuziStaff","jishuStaff","mishuStaff","yanceStaff"]},{key:"/resource",label:"\u4e0a\u4f20\u8d44\u6e90",icon:(0,Z.jsx)(f.Z,{}),children:[{key:"/resource/Shuzi",label:"\u6570\u8d44\u90e8",icon:(0,Z.jsx)(m.Z,{}),roles:["admin","shuziStaff"]},{key:"/resource/Jishu",label:"\u6280\u672f\u90e8",icon:(0,Z.jsx)(m.Z,{}),roles:["admin","jishuStaff"]},{key:"/resource/Mishu",label:"\u79d8\u4e66\u5904",icon:(0,Z.jsx)(d.Z,{}),children:[{key:"/resource/Mishu/arrange",label:"\u7ba1\u7406",icon:(0,Z.jsx)(d.Z,{})},{key:"/resource/Mishu/upload",label:"\u4e0a\u4f20",icon:(0,Z.jsx)(m.Z,{})}],roles:["admin","mishuStaff"]},{key:"/resource/Yance",label:"\u7814\u7b56\u90e8",icon:(0,Z.jsx)(m.Z,{}),roles:["admin","yanceStaff"]}]},{key:"/schedule",label:"\u8bfe\u8868\u5c55\u793a",icon:(0,Z.jsx)(h.Z,{}),roles:["admin","shuziStaff","jishuStaff","mishuStaff","yanceStaff"]}],k=[{key:"/association.github.io",label:"\u9996\u9875",icon:(0,Z.jsx)(d.Z,{}),roles:["admin","member","shuziStaff","jishuStaff","mishuStaff","yanceStaff"]}];n.Z=(0,g.$j)((function(e){return{isCollapsed:e.CollapsedReducer.isCollapsed}}))((function(e){var n=(0,j.Z)().getAccess,t=(0,b.a)().user?n():k,r=(0,u.s0)(),d=function(e){r(e.key)},f=(0,s.useState)(!1),m=(0,o.Z)(f,2),h=m[0],g=m[1],S=(0,s.useState)(""),C=(0,o.Z)(S,2),_=C[0],w=C[1];return(0,s.useEffect)((function(){e.isCollapsed?w(x.Z.banvisible):w("")}),[e.isCollapsed]),(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(v,{className:"sider",trigger:null,collapsible:!0,collapsed:e.isCollapsed,children:(0,Z.jsxs)("div",{style:{display:"flex",height:"100%",flexDirection:"column"},children:[(0,Z.jsxs)("div",{className:x.Z.logo,children:[(0,Z.jsx)("img",{src:y}),(0,Z.jsx)("span",{className:_,children:"\u793e\u56e2\u7ba1\u7406"})]}),(0,Z.jsx)("div",{style:{flex:1,overflow:"auto"},children:(0,Z.jsx)(a.Z,{theme:"dark",mode:"inline",defaultSelectedKeys:["1"],items:t,onClick:d})})]})}),(0,Z.jsx)(i.Z,{placement:"left",width:220,onClose:function(){g(!1)},open:h,bodyStyle:{backgroundColor:"#001529",padding:"0"},headerStyle:{display:"none"},children:(0,Z.jsxs)("div",{style:{display:"flex",height:"100%",flexDirection:"column"},children:[(0,Z.jsx)("div",{className:x.Z.logo,children:"\u793e\u56e2\u7ba1\u7406"}),(0,Z.jsx)("div",{style:{flex:1,overflow:"auto"},children:(0,Z.jsx)(a.Z,{theme:"dark",mode:"inline",defaultSelectedKeys:["1"],items:t,onClick:d})})]})}),(0,Z.jsx)(l.Z,{title:"\u6253\u5f00\u83dc\u5355",placement:"bottomRight",children:(0,Z.jsx)(c.Z,{className:x.Z.openstyle,onClick:function(){g(!0)},children:(0,Z.jsx)(p.Z,{style:{color:"white",fontSize:"20px"}})})})]})}))},2535:function(e,n,t){t.d(n,{Z:function(){return i}});var o,s=t(7352),r=t(8979),a=t(2524);function i(){var e=localStorage.getItem("userInfo"),n=(0,a.s0)(),t=e?JSON.parse(e):null;return{getAccess:function(){if(!t)return r.ZP.error("\u8fd8\u672a\u767b\u5f55"),void n("/login");var e=t.role&&t.role[0].rolevalue;return s.s.map((function(n){var t;return n.roles&&n.roles.includes(o[e])?n:{key:n.key,label:n.label,icon:n.icon,children:null===(t=n.children)||void 0===t?void 0:t.filter((function(n){return n.roles.includes(o[e])}))}}))},showOrNotByRule:function(){if(!t)return r.ZP.error("\u8fd8\u672a\u767b\u5f55"),void n("/login");var e=t.role&&t.role[0].rolevalue;return"\u79d8\u4e66\u5904\u5de5\u4f5c\u4eba\u5458"===e||"admin"===e}}}!function(e){e.admin="",e["\u4f1a\u5458"]="member",e["\u6570\u8d44\u90e8\u5de5\u4f5c\u4eba\u5458"]="shuziStaff",e["\u6280\u672f\u90e8\u5de5\u4f5c\u4eba\u5458"]="jishuStaff",e["\u79d8\u4e66\u5904\u5de5\u4f5c\u4eba\u5458"]="mishuStaff",e["\u7814\u7b56\u90e8\u5de5\u4f5c\u4eba\u5458"]="yanceStaff"}(o||(o={}))},7472:function(e,n,t){t.r(n),t.d(n,{default:function(){return b}});t(8381);var o=t(2524),s=t(7352),r=t(5958),a=t(8979),i=t(3266),l=t(5280),c=t(440),u=t(5044),d=t(9282),f=t(1026),m=t(8118),h=t(245),p=t(7821),x=t(9343);function g(){var e=(0,p.a)();return e.user?(0,x.jsxs)("span",{style:{margin:"10px"},children:["\u6b22\u8fce",(0,x.jsx)("span",{style:{color:"lightblue"},children:e.user.username}),"\u56de\u6765"]}):(0,x.jsx)("span",{style:{margin:"10px"},children:"\u60a8\u8fd8\u6ca1\u6709\u767b\u5f55"})}var y=(0,c.$j)((function(e){return{isCollapsed:e.CollapsedReducer.isCollapsed}}),{changeCollapsed:function(){return{type:"change_collapsed"}}})((function(e){var n,t=r.Z.Header,s=(0,o.s0)();if(!localStorage.getItem("token")){localStorage.setItem("token",JSON.stringify({department:0,number:"67890",password:"3456",role:[{id:0,rolevalue:"\u79d8\u4e66\u5904\u5de5\u4f5c\u4eba\u5458"}],username:"admin"}))}var c=null===(n=(0,p.a)().user)||void 0===n?void 0:n.number,y=function(){e.changeCollapsed()},j=function(){localStorage.removeItem("token"),s("/login")},b=[{key:2,danger:!0,onClick:function(){(0,h.h8)(c).then((function(){a.ZP.success("\u6ce8\u9500\u6210\u529f"),setTimeout((function(){return j()}),3e3)}))},label:"\u6ce8\u9500"},{key:3,danger:!0,onClick:function(){j()},label:"\u9000\u51fa"}];return(0,x.jsxs)(t,{className:"site-layout-background",style:{padding:"0 12px"},children:[e.isCollapsed?(0,x.jsx)(d.Z,{className:u.Z.menustyle,style:{color:"white"},onClick:y}):(0,x.jsx)(f.Z,{className:u.Z.menustyle,style:{color:"white"},onClick:y}),(0,x.jsxs)("div",{style:{float:"right",color:"white",marginRight:"5px"},children:[(0,x.jsx)(g,{}),(0,x.jsx)(i.Z,{menu:{items:b},children:(0,x.jsx)(l.C,{size:"large",icon:(0,x.jsx)(m.Z,{})})})]})]})})),j=t(4543);var b=(0,c.$j)((function(e){return{isLoading:e.LoadingReducer.isLoading}}))((function(e){var n=r.Z.Content;return(0,x.jsxs)(r.Z,{className:"layoutbody",children:[(0,x.jsx)(s.Z,{}),(0,x.jsxs)(r.Z,{className:"site-layout",children:[(0,x.jsx)(y,{}),(0,x.jsx)(n,{className:"site-layout-background",style:{margin:"24px 16px",padding:24,minHeight:280},children:(0,x.jsx)(j.Z,{spinning:e.isLoading,children:(0,x.jsx)(o.j3,{})})})]})]})}))},8560:function(e,n,t){t.d(n,{c:function(){return o}});var o="/mock"},41:function(e,n,t){e.exports=t.p+"static/media/photologo.f7fe9ffa7e57282f4d16.png"}}]);