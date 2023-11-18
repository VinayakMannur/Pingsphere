"use strict";(self.webpackChunkchat=self.webpackChunkchat||[]).push([[697],{2697:function(e,n,t){t.r(n),t.d(n,{default:function(){return z}});var r=t(4162),o=t(228),i=t(4565),s=t(2791),l=t(9439),a=t(1413),c=t(2232),u=t(788),d=t(464),h=t(8440),x=t(2986),p=t(2262),g=t(7323),f=t(997),j=t(6283),m=t(3811),k=t(1872),Z=t(4142),b=t(703),w=t(2602),v=t(7120),y=new Map;y.set("bold",(function(e){return s.createElement(s.Fragment,null,s.createElement("line",{x1:"40",y1:"128",x2:"216",y2:"128",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"24"}),s.createElement("line",{x1:"128",y1:"40",x2:"128",y2:"216",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"24"}))})),y.set("duotone",(function(e){return s.createElement(s.Fragment,null,s.createElement("line",{x1:"40",y1:"128",x2:"216",y2:"128",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}),s.createElement("line",{x1:"128",y1:"40",x2:"128",y2:"216",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}))})),y.set("fill",(function(){return s.createElement(s.Fragment,null,s.createElement("path",{d:"M216,120H136V40a8,8,0,0,0-16,0v80H40a8,8,0,0,0,0,16h80v80a8,8,0,0,0,16,0V136h80a8,8,0,0,0,0-16Z"}))})),y.set("light",(function(e){return s.createElement(s.Fragment,null,s.createElement("line",{x1:"40",y1:"128",x2:"216",y2:"128",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"12"}),s.createElement("line",{x1:"128",y1:"40",x2:"128",y2:"216",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"12"}))})),y.set("thin",(function(e){return s.createElement(s.Fragment,null,s.createElement("line",{x1:"40",y1:"128",x2:"216",y2:"128",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"8"}),s.createElement("line",{x1:"128",y1:"40",x2:"128",y2:"216",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"8"}))})),y.set("regular",(function(e){return s.createElement(s.Fragment,null,s.createElement("line",{x1:"40",y1:"128",x2:"216",y2:"128",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}),s.createElement("line",{x1:"128",y1:"40",x2:"128",y2:"216",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}))}));var C=function(e,n){return(0,w._)(e,n,y)},E=(0,s.forwardRef)((function(e,n){return s.createElement(v.Z,Object.assign({ref:n},e,{renderPath:C}))}));E.displayName="Plus";var L=E,F=(t(5391),t(7579)),W=t(7174),S=t(1622),I=t(8685),_=t(9434),A=t(4984),M=t(5798),N=t(6026),G=t(184),O=s.forwardRef((function(e,n){return(0,G.jsx)(c.Z,(0,a.Z)({direction:"up",ref:n},e))})),R=function(e){var n=e.open,t=e.handleClose,o=(0,_.I0)(),c=(0,s.useState)(""),j=(0,l.Z)(c,2),m=j[0],k=j[1],Z=(0,s.useState)([]),b=(0,l.Z)(Z,2),w=b[0],v=b[1],y=window.localStorage.getItem("user_id");(0,s.useEffect)((function(){o((0,N.$J)())}),[]);var C=(0,_.v9)((function(e){return e.app})).friends;return(0,G.jsxs)(u.Z,{open:n,TransitionComponent:O,keepMounted:!0,onClose:t,"aria-describedby":"alert-dialog-slide-description",children:[(0,G.jsx)(d.Z,{children:"Create Group"}),(0,G.jsx)(h.Z,{children:(0,G.jsx)("div",{id:"alert-dialog-slide-description",children:(0,G.jsxs)(r.Z,{mt:2,spacing:3,sx:{width:500},children:[(0,G.jsx)(i.Z,{variant:"body2",children:"Enter the group name and the members"}),(0,G.jsx)(x.Z,{required:!0,id:"groupname",label:"Group Name",variant:"outlined",onChange:function(e){return k(e.target.value)}}),(0,G.jsx)(p.Z,{multiple:!0,id:"tags-outlined",options:C,getOptionLabel:function(e){return"".concat(e.firstName," ").concat(e.lastName)},filterSelectedOptions:!0,onChange:function(e,n){return v(n)},renderInput:function(e){return(0,G.jsx)(x.Z,(0,a.Z)((0,a.Z)({},e),{},{label:"Add Members to your group",placeholder:"Add Members"}))}})]})})}),(0,G.jsxs)(g.Z,{children:[(0,G.jsx)(f.Z,{onClick:t,children:"Close"}),(0,G.jsx)(f.Z,{type:"submit",onClick:function(){M.W.emit("create_group",{groupName:m,selectedMembers:w,user_id:parseInt(y)}),t()},variant:"contained",children:"Create"})]})]})},T=function(){var e=(0,Z.Z)(),n=(0,s.useState)(!1),t=(0,l.Z)(n,2),c=t[0],u=t[1],d=(0,I.Z)("between","md","xs","sm"),h=(0,_.v9)((function(e){return e.conversation.group_chat})).groupList;return(0,G.jsxs)(o.Z,{sx:{position:"relative",width:d?"100%":320,backgroundColor:"light"===e.palette.mode?"#F8FAFF":e.palette.background.paper,boxShadow:"0px 0px 2px rgba(0, 0, 0, 0.5)"},children:[(0,G.jsxs)(r.Z,{p:3,spacing:2,sx:{height:"100vh"},children:[(0,G.jsx)(r.Z,{direction:"row",alignItems:"center",justifyContent:"space-between",children:(0,G.jsx)(i.Z,{variant:"h5",children:"Group Chats"})}),(0,G.jsx)(r.Z,{sx:{width:"100%"},children:(0,G.jsxs)(W.ol,{children:[(0,G.jsx)(W.cB,{children:(0,G.jsx)(b.Z,{color:"#709CE6"})}),(0,G.jsx)(W.el,{placeholder:"Search..."})]})}),(0,G.jsxs)(r.Z,{spacing:1,children:[(0,G.jsxs)(r.Z,{direction:"row",alignItems:"center",justifyContent:"space-between",children:[(0,G.jsx)(i.Z,{variant:"body2",component:j.Z,children:"Create new group"}),(0,G.jsx)(m.Z,{onClick:function(){u(!0)},children:(0,G.jsx)(L,{size:20,style:{color:e.palette.primary.main}})})]}),(0,G.jsx)(k.Z,{})]}),(0,G.jsx)(r.Z,{direction:"column",spacing:1.2,sx:{height:"100%",flexGrow:1,overflowY:"scroll",scrollbarWidth:"thin","&::-webkit-scrollbar":{width:"0.4em"},"&::-webkit-scrollbar-track":{background:"#f1f1f1"},"&::-webkit-scrollbar-thumb":{backgroundColor:"#888"},"&::-webkit-scrollbar-thumb:hover":{background:"#555"}},children:(0,G.jsx)(F.l,{timeout:500,clickOnTrack:!1,children:(0,G.jsxs)(r.Z,{spacing:1,children:[(0,G.jsx)(i.Z,{variant:"subtitle2",sx:{color:"#767676"},children:"All Groups"}),h.filter((function(e){return!e.pinned})).map((function(e,n){return(0,G.jsx)(S.Z,(0,a.Z)({},e),n)}))]})})})]}),c&&(0,G.jsx)(R,{open:c,handleClose:function(){u(!1)}})]})},H=t(2016),P=t(8462),D=t(4572),V=t(5764),q=t(3201),z=function(){var e=(0,Z.Z)(),n=(0,_.I0)(),t=window.localStorage.getItem("user_id"),l=(0,_.v9)((function(e){return e.app})),a=l.sidebar,c=l.chat_type,u=(0,_.v9)((function(e){return e.app.mobile})),d=u.group,h=u.contact,x=(0,_.v9)((function(e){return e.conversation.group_chat})).groupId;(0,s.useEffect)((function(){n((0,N.kP)()),M.W.emit("get_group_list",{user_id:t},(function(e){n((0,A.uF)(e))}))}),[]);var p=(0,I.Z)("between","md","xs","sm");return(0,G.jsx)(G.Fragment,{children:(0,G.jsxs)(r.Z,{direction:"row",sx:{width:"100%"},children:[p&&"group"===c&&"chats"===d?(0,G.jsx)(T,{}):(0,G.jsx)(G.Fragment,{}),!p&&(0,G.jsx)(T,{}),p&&"group"===c&&null===h&&"conversation"===d?(0,G.jsx)(o.Z,{sx:{height:p?"100vh":"100%",width:"100%",backgroundColor:"light"===e.palette.mode?"#F0F4FA":e.palette.background.default},children:null!==x&&"group"===c?(0,G.jsx)(H.Z,{}):(0,G.jsxs)(r.Z,{spacing:2,sx:{height:"100%",width:"100%"},alignItems:"center",justifyContent:"center",children:[(0,G.jsx)(P.Z,{}),(0,G.jsx)(i.Z,{variant:"subtitle2",children:"Select a conversation or start a new one"})]})}):(0,G.jsx)(G.Fragment,{}),!p&&(0,G.jsx)(o.Z,{sx:{height:"100%",width:a.open?"calc(100vw - 720px)":"calc(100vw - 405px)",backgroundColor:"light"===e.palette.mode?"#F0F4FA":e.palette.background.default},children:null!==x&&"group"===c?(0,G.jsx)(H.Z,{}):(0,G.jsxs)(r.Z,{spacing:2,sx:{height:"100%",width:"100%"},alignItems:"center",justifyContent:"center",children:[(0,G.jsx)(P.Z,{}),(0,G.jsx)(i.Z,{variant:"subtitle2",children:"Select a conversation or start a new one"})]})}),!p||"onetoone"!==h&&"group"!==h?(0,G.jsx)(G.Fragment,{}):(0,G.jsx)(q.Z,{}),!p&&a.open&&function(){switch(a.type){case"CONTACT":return(0,G.jsx)(q.Z,{});case"STARRED":return(0,G.jsx)(D.Z,{});case"SHARED":return(0,G.jsx)(V.Z,{})}}()]})})}}}]);
//# sourceMappingURL=697.4bc8a42c.chunk.js.map