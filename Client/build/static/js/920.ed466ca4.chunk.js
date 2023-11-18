"use strict";(self.webpackChunkchat=self.webpackChunkchat||[]).push([[920],{40:function(e,t,n){function o(e){var t=e.props,n=e.states,o=e.muiFormControl;return n.reduce((function(e,n){return e[n]=t[n],o&&"undefined"===typeof t[n]&&(e[n]=o[n]),e}),{})}n.d(t,{Z:function(){return o}})},1169:function(e,t,n){n.d(t,{rA:function(){return L},Ej:function(){return j},ZP:function(){return H},_o:function(){return N},Gx:function(){return F}});var o=n(9439),r=n(4942),a=n(3366),i=n(7462),l=n(6189),u=n(2791),s=n(8182),d=n(4419),c=n(4164),p=n(7563),m=n(7979),f=n(3981),h=n(5721),v=n(184),b=["onChange","maxRows","minRows","style","value"];function g(e,t){return parseInt(e[t],10)||0}var y={visibility:"hidden",position:"absolute",overflow:"hidden",height:0,top:0,left:0,transform:"translateZ(0)"};function Z(e){return void 0===e||null===e||0===Object.keys(e).length}var w=u.forwardRef((function(e,t){var n=e.onChange,r=e.maxRows,l=e.minRows,s=void 0===l?1:l,d=e.style,w=e.value,x=(0,a.Z)(e,b),S=u.useRef(null!=w).current,C=u.useRef(null),R=(0,p.Z)(t,C),B=u.useRef(null),A=u.useRef(0),k=u.useState({}),z=(0,o.Z)(k,2),M=z[0],W=z[1],I=u.useCallback((function(){var t=C.current,n=(0,m.Z)(t).getComputedStyle(t);if("0px"===n.width)return{};var o=B.current;o.style.width=n.width,o.value=t.value||e.placeholder||"x","\n"===o.value.slice(-1)&&(o.value+=" ");var a=n["box-sizing"],i=g(n,"padding-bottom")+g(n,"padding-top"),l=g(n,"border-bottom-width")+g(n,"border-top-width"),u=o.scrollHeight;o.value="x";var d=o.scrollHeight,c=u;return s&&(c=Math.max(Number(s)*d,c)),r&&(c=Math.min(Number(r)*d,c)),{outerHeightStyle:(c=Math.max(c,d))+("border-box"===a?i+l:0),overflow:Math.abs(c-u)<=1}}),[r,s,e.placeholder]),P=function(e,t){var n=t.outerHeightStyle,o=t.overflow;return A.current<20&&(n>0&&Math.abs((e.outerHeightStyle||0)-n)>1||e.overflow!==o)?(A.current+=1,{overflow:o,outerHeightStyle:n}):e},E=u.useCallback((function(){var e=I();Z(e)||W((function(t){return P(t,e)}))}),[I]);u.useEffect((function(){var e,t=(0,f.Z)((function(){A.current=0,C.current&&function(){var e=I();Z(e)||(0,c.flushSync)((function(){W((function(t){return P(t,e)}))}))}()})),n=(0,m.Z)(C.current);return n.addEventListener("resize",t),"undefined"!==typeof ResizeObserver&&(e=new ResizeObserver(t)).observe(C.current),function(){t.clear(),n.removeEventListener("resize",t),e&&e.disconnect()}})),(0,h.Z)((function(){E()})),u.useEffect((function(){A.current=0}),[w]);return(0,v.jsxs)(u.Fragment,{children:[(0,v.jsx)("textarea",(0,i.Z)({value:w,onChange:function(e){A.current=0,S||E(),n&&n(e)},ref:R,rows:s,style:(0,i.Z)({height:M.outerHeightStyle,overflow:M.overflow?"hidden":null},d)},x)),(0,v.jsx)("textarea",{"aria-hidden":!0,className:e.className,readOnly:!0,ref:B,tabIndex:-1,style:(0,i.Z)({},y,d,{padding:0})})]})})),x=n(627),S=n(40),C=n(1211),R=n(529),B=n(277),A=n(5513),k=n(9853),z=n(7933),M=n(3026),W=n(3928),I=n(7272),P=n(3890),E=["aria-describedby","autoComplete","autoFocus","className","color","components","componentsProps","defaultValue","disabled","disableInjectingGlobalStyles","endAdornment","error","fullWidth","id","inputComponent","inputProps","inputRef","margin","maxRows","minRows","multiline","name","onBlur","onChange","onClick","onFocus","onKeyDown","onKeyUp","placeholder","readOnly","renderSuffix","rows","size","startAdornment","type","value"],F=function(e,t){var n=e.ownerState;return[t.root,n.formControl&&t.formControl,n.startAdornment&&t.adornedStart,n.endAdornment&&t.adornedEnd,n.error&&t.error,"small"===n.size&&t.sizeSmall,n.multiline&&t.multiline,n.color&&t["color".concat((0,k.Z)(n.color))],n.fullWidth&&t.fullWidth,n.hiddenLabel&&t.hiddenLabel]},N=function(e,t){var n=e.ownerState;return[t.input,"small"===n.size&&t.inputSizeSmall,n.multiline&&t.inputMultiline,"search"===n.type&&t.inputTypeSearch,n.startAdornment&&t.inputAdornedStart,n.endAdornment&&t.inputAdornedEnd,n.hiddenLabel&&t.inputHiddenLabel]},j=(0,B.ZP)("div",{name:"MuiInputBase",slot:"Root",overridesResolver:F})((function(e){var t=e.theme,n=e.ownerState;return(0,i.Z)({},t.typography.body1,(0,r.Z)({color:(t.vars||t).palette.text.primary,lineHeight:"1.4375em",boxSizing:"border-box",position:"relative",cursor:"text",display:"inline-flex",alignItems:"center"},"&.".concat(P.Z.disabled),{color:(t.vars||t).palette.text.disabled,cursor:"default"}),n.multiline&&(0,i.Z)({padding:"4px 0 5px"},"small"===n.size&&{paddingTop:1}),n.fullWidth&&{width:"100%"})})),L=(0,B.ZP)("input",{name:"MuiInputBase",slot:"Input",overridesResolver:N})((function(e){var t,n=e.theme,o=e.ownerState,a="light"===n.palette.mode,l=(0,i.Z)({color:"currentColor"},n.vars?{opacity:n.vars.opacity.inputPlaceholder}:{opacity:a?.42:.5},{transition:n.transitions.create("opacity",{duration:n.transitions.duration.shorter})}),u={opacity:"0 !important"},s=n.vars?{opacity:n.vars.opacity.inputPlaceholder}:{opacity:a?.42:.5};return(0,i.Z)((t={font:"inherit",letterSpacing:"inherit",color:"currentColor",padding:"4px 0 5px",border:0,boxSizing:"content-box",background:"none",height:"1.4375em",margin:0,WebkitTapHighlightColor:"transparent",display:"block",minWidth:0,width:"100%",animationName:"mui-auto-fill-cancel",animationDuration:"10ms","&::-webkit-input-placeholder":l,"&::-moz-placeholder":l,"&:-ms-input-placeholder":l,"&::-ms-input-placeholder":l,"&:focus":{outline:0},"&:invalid":{boxShadow:"none"},"&::-webkit-search-decoration":{WebkitAppearance:"none"}},(0,r.Z)(t,"label[data-shrink=false] + .".concat(P.Z.formControl," &"),{"&::-webkit-input-placeholder":u,"&::-moz-placeholder":u,"&:-ms-input-placeholder":u,"&::-ms-input-placeholder":u,"&:focus::-webkit-input-placeholder":s,"&:focus::-moz-placeholder":s,"&:focus:-ms-input-placeholder":s,"&:focus::-ms-input-placeholder":s}),(0,r.Z)(t,"&.".concat(P.Z.disabled),{opacity:1,WebkitTextFillColor:(n.vars||n).palette.text.disabled}),(0,r.Z)(t,"&:-webkit-autofill",{animationDuration:"5000s",animationName:"mui-auto-fill"}),t),"small"===o.size&&{paddingTop:1},o.multiline&&{height:"auto",resize:"none",padding:0,paddingTop:0},"search"===o.type&&{MozAppearance:"textfield"})})),O=(0,v.jsx)(W.Z,{styles:{"@keyframes mui-auto-fill":{from:{display:"block"}},"@keyframes mui-auto-fill-cancel":{from:{display:"block"}}}}),T=u.forwardRef((function(e,t){var n=(0,A.Z)({props:e,name:"MuiInputBase"}),r=n["aria-describedby"],c=n.autoComplete,p=n.autoFocus,m=n.className,f=n.components,h=void 0===f?{}:f,b=n.componentsProps,g=void 0===b?{}:b,y=n.defaultValue,Z=n.disabled,B=n.disableInjectingGlobalStyles,W=n.endAdornment,F=n.fullWidth,N=void 0!==F&&F,T=n.id,H=n.inputComponent,U=void 0===H?"input":H,K=n.inputProps,D=void 0===K?{}:K,V=n.inputRef,G=n.maxRows,X=n.minRows,q=n.multiline,_=void 0!==q&&q,J=n.name,Q=n.onBlur,Y=n.onChange,$=n.onClick,ee=n.onFocus,te=n.onKeyDown,ne=n.onKeyUp,oe=n.placeholder,re=n.readOnly,ae=n.renderSuffix,ie=n.rows,le=n.startAdornment,ue=n.type,se=void 0===ue?"text":ue,de=n.value,ce=(0,a.Z)(n,E),pe=null!=D.value?D.value:de,me=u.useRef(null!=pe).current,fe=u.useRef(),he=u.useCallback((function(e){0}),[]),ve=(0,z.Z)(D.ref,he),be=(0,z.Z)(V,ve),ge=(0,z.Z)(fe,be),ye=u.useState(!1),Ze=(0,o.Z)(ye,2),we=Ze[0],xe=Ze[1],Se=(0,R.Z)();var Ce=(0,S.Z)({props:n,muiFormControl:Se,states:["color","disabled","error","hiddenLabel","size","required","filled"]});Ce.focused=Se?Se.focused:we,u.useEffect((function(){!Se&&Z&&we&&(xe(!1),Q&&Q())}),[Se,Z,we,Q]);var Re=Se&&Se.onFilled,Be=Se&&Se.onEmpty,Ae=u.useCallback((function(e){(0,I.vd)(e)?Re&&Re():Be&&Be()}),[Re,Be]);(0,M.Z)((function(){me&&Ae({value:pe})}),[pe,Ae,me]);u.useEffect((function(){Ae(fe.current)}),[]);var ke=U,ze=D;_&&"input"===ke&&(ze=ie?(0,i.Z)({type:void 0,minRows:ie,maxRows:ie},ze):(0,i.Z)({type:void 0,maxRows:G,minRows:X},ze),ke=w);u.useEffect((function(){Se&&Se.setAdornedStart(Boolean(le))}),[Se,le]);var Me=(0,i.Z)({},n,{color:Ce.color||"primary",disabled:Ce.disabled,endAdornment:W,error:Ce.error,focused:Ce.focused,formControl:Se,fullWidth:N,hiddenLabel:Ce.hiddenLabel,multiline:_,size:Ce.size,startAdornment:le,type:se}),We=function(e){var t=e.classes,n=e.color,o=e.disabled,r=e.error,a=e.endAdornment,i=e.focused,l=e.formControl,u=e.fullWidth,s=e.hiddenLabel,c=e.multiline,p=e.readOnly,m=e.size,f=e.startAdornment,h=e.type,v={root:["root","color".concat((0,k.Z)(n)),o&&"disabled",r&&"error",u&&"fullWidth",i&&"focused",l&&"formControl","small"===m&&"sizeSmall",c&&"multiline",f&&"adornedStart",a&&"adornedEnd",s&&"hiddenLabel",p&&"readOnly"],input:["input",o&&"disabled","search"===h&&"inputTypeSearch",c&&"inputMultiline","small"===m&&"inputSizeSmall",s&&"inputHiddenLabel",f&&"inputAdornedStart",a&&"inputAdornedEnd",p&&"readOnly"]};return(0,d.Z)(v,P.u,t)}(Me),Ie=h.Root||j,Pe=g.root||{},Ee=h.Input||L;return ze=(0,i.Z)({},ze,g.input),(0,v.jsxs)(u.Fragment,{children:[!B&&O,(0,v.jsxs)(Ie,(0,i.Z)({},Pe,!(0,x.Z)(Ie)&&{ownerState:(0,i.Z)({},Me,Pe.ownerState)},{ref:t,onClick:function(e){fe.current&&e.currentTarget===e.target&&fe.current.focus(),$&&$(e)}},ce,{className:(0,s.Z)(We.root,Pe.className,m),children:[le,(0,v.jsx)(C.Z.Provider,{value:null,children:(0,v.jsx)(Ee,(0,i.Z)({ownerState:Me,"aria-invalid":Ce.error,"aria-describedby":r,autoComplete:c,autoFocus:p,defaultValue:y,disabled:Ce.disabled,id:T,onAnimationStart:function(e){Ae("mui-auto-fill-cancel"===e.animationName?fe.current:{value:"x"})},name:J,placeholder:oe,readOnly:re,required:Ce.required,rows:ie,value:pe,onKeyDown:te,onKeyUp:ne,type:se},ze,!(0,x.Z)(Ee)&&{as:ke,ownerState:(0,i.Z)({},Me,ze.ownerState)},{ref:ge,className:(0,s.Z)(We.input,ze.className),onBlur:function(e){Q&&Q(e),D.onBlur&&D.onBlur(e),Se&&Se.onBlur?Se.onBlur(e):xe(!1)},onChange:function(e){if(!me){var t=e.target||fe.current;if(null==t)throw new Error((0,l.Z)(1));Ae({value:t.value})}for(var n=arguments.length,o=new Array(n>1?n-1:0),r=1;r<n;r++)o[r-1]=arguments[r];D.onChange&&D.onChange.apply(D,[e].concat(o)),Y&&Y.apply(void 0,[e].concat(o))},onFocus:function(e){Ce.disabled?e.stopPropagation():(ee&&ee(e),D.onFocus&&D.onFocus(e),Se&&Se.onFocus?Se.onFocus(e):xe(!0))}}))}),W,ae?ae((0,i.Z)({},Ce,{startAdornment:le})):null]}))]})})),H=T},3890:function(e,t,n){n.d(t,{u:function(){return r}});var o=n(1217);function r(e){return(0,o.Z)("MuiInputBase",e)}var a=(0,n(5878).Z)("MuiInputBase",["root","formControl","focused","disabled","adornedStart","adornedEnd","error","sizeSmall","multiline","colorSecondary","fullWidth","hiddenLabel","readOnly","input","inputSizeSmall","inputMultiline","inputTypeSearch","inputAdornedStart","inputAdornedEnd","inputHiddenLabel"]);t.Z=a},7272:function(e,t,n){function o(e){return null!=e&&!(Array.isArray(e)&&0===e.length)}function r(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return e&&(o(e.value)&&""!==e.value||t&&o(e.defaultValue)&&""!==e.defaultValue)}function a(e){return e.startAdornment}n.d(t,{B7:function(){return a},vd:function(){return r}})},3595:function(e,t,n){var o=n(4942),r=n(3433),a=n(3366),i=n(7462),l=n(2791),u=n(4419),s=n(2466),d=n(1169),c=n(277),p=n(5513),m=n(6880),f=n(184),h=["disableUnderline","components","componentsProps","fullWidth","inputComponent","multiline","type"],v=(0,c.ZP)(d.Ej,{shouldForwardProp:function(e){return(0,c.FO)(e)||"classes"===e},name:"MuiInput",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[].concat((0,r.Z)((0,d.Gx)(e,t)),[!n.disableUnderline&&t.underline])}})((function(e){var t,n=e.theme,r=e.ownerState,a="light"===n.palette.mode?"rgba(0, 0, 0, 0.42)":"rgba(255, 255, 255, 0.7)";return n.vars&&(a="rgba(".concat(n.vars.palette.common.onBackgroundChannel," / ").concat(n.vars.opacity.inputUnderline,")")),(0,i.Z)({position:"relative"},r.formControl&&{"label + &":{marginTop:16}},!r.disableUnderline&&(t={"&:after":{borderBottom:"2px solid ".concat((n.vars||n).palette[r.color].main),left:0,bottom:0,content:'""',position:"absolute",right:0,transform:"scaleX(0)",transition:n.transitions.create("transform",{duration:n.transitions.duration.shorter,easing:n.transitions.easing.easeOut}),pointerEvents:"none"}},(0,o.Z)(t,"&.".concat(m.Z.focused,":after"),{transform:"scaleX(1) translateX(0)"}),(0,o.Z)(t,"&.".concat(m.Z.error,":after"),{borderBottomColor:(n.vars||n).palette.error.main,transform:"scaleX(1)"}),(0,o.Z)(t,"&:before",{borderBottom:"1px solid ".concat(a),left:0,bottom:0,content:'"\\00a0"',position:"absolute",right:0,transition:n.transitions.create("border-bottom-color",{duration:n.transitions.duration.shorter}),pointerEvents:"none"}),(0,o.Z)(t,"&:hover:not(.".concat(m.Z.disabled,"):before"),{borderBottom:"2px solid ".concat((n.vars||n).palette.text.primary),"@media (hover: none)":{borderBottom:"1px solid ".concat(a)}}),(0,o.Z)(t,"&.".concat(m.Z.disabled,":before"),{borderBottomStyle:"dotted"}),t))})),b=(0,c.ZP)(d.rA,{name:"MuiInput",slot:"Input",overridesResolver:d._o})({}),g=l.forwardRef((function(e,t){var n=(0,p.Z)({props:e,name:"MuiInput"}),o=n.disableUnderline,r=n.components,l=void 0===r?{}:r,c=n.componentsProps,g=n.fullWidth,y=void 0!==g&&g,Z=n.inputComponent,w=void 0===Z?"input":Z,x=n.multiline,S=void 0!==x&&x,C=n.type,R=void 0===C?"text":C,B=(0,a.Z)(n,h),A=function(e){var t=e.classes,n={root:["root",!e.disableUnderline&&"underline"],input:["input"]},o=(0,u.Z)(n,m.l,t);return(0,i.Z)({},t,o)}(n),k={root:{ownerState:{disableUnderline:o}}},z=c?(0,s.Z)(c,k):k;return(0,f.jsx)(d.ZP,(0,i.Z)({components:(0,i.Z)({Root:v,Input:b},l),componentsProps:z,fullWidth:y,inputComponent:w,multiline:S,ref:t,type:R},B,{classes:A}))}));g.muiName="Input",t.Z=g},6880:function(e,t,n){n.d(t,{l:function(){return l}});var o=n(7462),r=n(1217),a=n(5878),i=n(3890);function l(e){return(0,r.Z)("MuiInput",e)}var u=(0,o.Z)({},i.Z,(0,a.Z)("MuiInput",["root","underline","input"]));t.Z=u},4565:function(e,t,n){n.d(t,{Z:function(){return y}});var o=n(3366),r=n(7462),a=n(2791),i=n(8182),l=n(8519),u=n(4419),s=n(277),d=n(5513),c=n(9853),p=n(1217);function m(e){return(0,p.Z)("MuiTypography",e)}(0,n(5878).Z)("MuiTypography",["root","h1","h2","h3","h4","h5","h6","subtitle1","subtitle2","body1","body2","inherit","button","caption","overline","alignLeft","alignRight","alignCenter","alignJustify","noWrap","gutterBottom","paragraph"]);var f=n(184),h=["align","className","component","gutterBottom","noWrap","paragraph","variant","variantMapping"],v=(0,s.ZP)("span",{name:"MuiTypography",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,n.variant&&t[n.variant],"inherit"!==n.align&&t["align".concat((0,c.Z)(n.align))],n.noWrap&&t.noWrap,n.gutterBottom&&t.gutterBottom,n.paragraph&&t.paragraph]}})((function(e){var t=e.theme,n=e.ownerState;return(0,r.Z)({margin:0},n.variant&&t.typography[n.variant],"inherit"!==n.align&&{textAlign:n.align},n.noWrap&&{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},n.gutterBottom&&{marginBottom:"0.35em"},n.paragraph&&{marginBottom:16})})),b={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",subtitle1:"h6",subtitle2:"h6",body1:"p",body2:"p",inherit:"p"},g={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},y=a.forwardRef((function(e,t){var n=(0,d.Z)({props:e,name:"MuiTypography"}),a=function(e){return g[e]||e}(n.color),s=(0,l.Z)((0,r.Z)({},n,{color:a})),p=s.align,y=void 0===p?"inherit":p,Z=s.className,w=s.component,x=s.gutterBottom,S=void 0!==x&&x,C=s.noWrap,R=void 0!==C&&C,B=s.paragraph,A=void 0!==B&&B,k=s.variant,z=void 0===k?"body1":k,M=s.variantMapping,W=void 0===M?b:M,I=(0,o.Z)(s,h),P=(0,r.Z)({},s,{align:y,color:a,className:Z,component:w,gutterBottom:S,noWrap:R,paragraph:A,variant:z,variantMapping:W}),E=w||(A?"p":W[z]||b[z])||"span",F=function(e){var t=e.align,n=e.gutterBottom,o=e.noWrap,r=e.paragraph,a=e.variant,i=e.classes,l={root:["root",a,"inherit"!==e.align&&"align".concat((0,c.Z)(t)),n&&"gutterBottom",o&&"noWrap",r&&"paragraph"]};return(0,u.Z)(l,m,i)}(P);return(0,f.jsx)(v,(0,r.Z)({as:E,ref:t,ownerState:P,className:(0,i.Z)(F.root,Z)},I))}))}}]);
//# sourceMappingURL=920.ed466ca4.chunk.js.map