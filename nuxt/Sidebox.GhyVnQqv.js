import{_ as ie,b as ce,u as le,O as re,c as _e,a6 as ue,J as de,N as M,r as pe,e as r,Z as me,o as he,y as a,g as c,j as l,s as d,i as s,F as N,n as g,h as e,m as q,M as B,l as p,C as R,k as _,p as L,t as y,R as ge,aE as ye,aF as ve,a5 as be,L as ke,x as D,A as fe,B as xe}from"./entry.JhK8AsVu.js";import"./swiper-bundle.rssrn7a9.js";import{W as Se}from"./WPCInfo.krtf_DMI.js";import{S as Ce}from"./swiper-core.Lw7Odmy1.js";const o=x=>(fe("data-v-356d44fd"),x=x(),xe(),x),we={key:0,class:"sidebox__gamestart"},Ne={class:"_gamestart__particle"},Re={class:"_gamestart__wrap"},Ie=o(()=>e("span",{class:"_gamestart__text"},"게임 시작",-1)),Me={class:"sidebox__profile"},Be={key:0,class:"sidebox__profile__content"},Le={class:"_header -box"},Ae=o(()=>e("h3",{class:"_title"},"커뮤니티 프로필",-1)),Ee=o(()=>e("i",{class:"i--visit"},null,-1)),Te={class:"_info"},Ue={class:"_thumb"},$e={class:"_info__wrap"},Ge={class:"_nickname"},Pe={class:"_wpc"},Oe={key:0,class:"sidebox__auth type--community"},Ve={key:1,class:"sidebox__auth type--nexon"},je=o(()=>e("p",null,"로그인을 해 주세요.",-1)),qe={class:"sidebox__profile__buttons"},De={class:"_wrap"},ze={key:0,class:"i--new"},Fe=o(()=>e("h3",{class:"_title"},"대표 캐릭터 프로필",-1)),He=o(()=>e("i",{class:"i--account-check -box"},null,-1)),We=[He],Ke={class:"_content"},Ye={class:"_thumb"},Je={class:"_detail"},Ze={class:"_charname"},Qe={class:"level-mark"},Xe={class:"_info"},es=o(()=>e("strong",null,"렐름",-1)),ss=o(()=>e("strong",null,"클래스",-1)),ts=o(()=>e("strong",null,"결사",-1)),ns=o(()=>e("div",{class:"_charname"},"대표 캐릭터가 없습니다.",-1)),as=o(()=>e("ul",{class:"_info"},[e("li",{class:"-empty"},[e("strong",null,"렐름"),e("span",null,"렐름 정보가 없습니다.")]),e("li",{class:"-empty"},[e("strong",null,"클래스"),e("span",null,"클래스 정보가 없습니다.")]),e("li",{class:"-empty"},[e("strong",null,"결사"),e("span",null,"결사 정보가 없습니다.")])],-1)),os={class:"sidebox__channel"},is=o(()=>e("i",{class:"i--logo-kakaochannel"},null,-1)),cs=o(()=>e("i",{class:"i--logo-youtube"},null,-1)),ls={class:"swiper-container"},rs={class:"swiper-wrapper"},_s={class:"swiper-slide"},us={class:"swiper-slide"},ds={class:"swiper-slide"},ps=o(()=>e("div",{class:"swiper-pagination"},null,-1)),ms={key:1,class:"sidebox__guide"},hs={class:"_header"},gs=o(()=>e("h3",{class:"_title"},"추천 가이드",-1)),ys=o(()=>e("span",{class:"_line"},null,-1)),vs=o(()=>e("i",{class:"i--plus"},null,-1)),bs={class:"container"},ks={class:"sidebox__guide__list"},fs={key:0,class:"ico-new -shadow"},xs={key:2,class:"sidebox__etc"},Ss=o(()=>e("p",{class:"sidebox__etc__title"},[_("PC와 모바일에서 "),e("br"),_("동시에 만나보세요!")],-1)),Cs=o(()=>e("span",{class:"sr-only"},"구글 플레이에서 다운로드",-1)),ws=o(()=>e("span",{class:"sr-only"},"앱스토어에서 다운로드 하기",-1)),Ns=o(()=>e("span",{class:"sr-only"},"PC버전 다운로드하기",-1)),Rs=0,Is=13,Ms={__name:"Sidebox",props:{type:{type:String,default:"community"}},setup(x){const A=x,b=ce(),n=le(),k=re(),S=_e(),I=ue();de();const z=M(null),U=M(null),$={characterRegistBanner:I.checkRelease(null,"2023-03-22 22:00"),registBanner:I.checkRelease(null,"2023-03-28 00:00"),registButtonEnd:I.checkRelease("2023-03-28 12:00")},u=pe({isSignInNexon:r(()=>b.isSignIn),isSigninCommunity:r(()=>{var t;return!!((t=n.user)!=null&&t.userId)}),isEmptyProfileImage:r(()=>{var t;return!((t=n.user)!=null&&t.profileImageUrl)}),isMain:r(()=>A.type==="main"),isShowSidebox:r(()=>S.screen.width>1200),isShowGameStart:r(()=>u.isMain&&u.isShowSidebox),isShowCharacterRegistBanner:r(()=>!u.isMain&&$.characterRegistBanner.isRelease),isShowRegistBanner:r(()=>$.registBanner.isRelease)}),E=r(()=>{var t;return((t=n.user)==null?void 0:t.badgeList)||[]}),F=r(()=>n.mainpage),H=r(()=>{var t,i;return(i=(t=b==null?void 0:b.profile)==null?void 0:t.local_profile_props)==null?void 0:i.nexon_name}),v=r(()=>n.user);r(()=>{var t;return(t=n==null?void 0:n.user)==null?void 0:t.wpc});const G=M(!1),W=r(()=>{var t;return me(I.serverDate).unix()<((t=E==null?void 0:E.value[0])==null?void 0:t.createDate)+86400}),T=r({get:()=>{var t,i;return(i=(t=n.user)==null?void 0:t.userActivity)==null?void 0:i.today},set:t=>{n.user.userActivity.today=t}}),K=()=>{b.gotoSignIn(),R("action",{actionType:"click-login"})},Y=()=>{k.open({type:"unique-set-community-user"})},J=t=>{const C=`${A.type==="main"?"main":"sub"}_Btn_type_${t}`;R(C)},Z=async()=>{if(T.value){k.open("이미 방문 인증이 완료되었습니다.");return}try{const t=await n.gradeAttend(),{ok:i,errorMessage:C}=t;i?(T.value=!0,k.open('<div style="max-width: 360px">오늘 방문 인증이 완료되었습니다.<br>나의 방문 인증 일 수는 <span style="color: rgba(171, 115, 60, 1)">마이 페이지 > 등급 히스토리</span>에서 확인하실 수 있습니다.</div>'),n.getCommunityUser()):k.open(C)}catch{k.open(errorMessage)}},Q=()=>{G.value=!0,te.value.map((t,i)=>{setTimeout(()=>{t.play()},i*50)})},X=()=>{G.value=!1},ee=()=>{b.startGame(),ye(null,"gameplay",null),R("main_Btn_gamestart"),R("GAMESTART")},se=()=>{k.open({type:"unique-set-character"})},te=M([]),ne=()=>{const t=U.value.querySelector(".swiper-container"),i=t.querySelector(".swiper-pagination");new Ce(t,{watchOverflow:!0,slidesPerView:1,spaceBetween:18,loop:!0,touchRatio:.5,speed:500,autoplay:{delay:5e3,pauseOnMouseEnter:!0,disableOnInteraction:!1},pagination:{el:i,type:"bullets",clickable:!0}})};return he(()=>{ne()}),(t,i)=>{const C=ve,ae=be,w=ke,m=D,P=D;return a(),c("div",{class:g(["sidebox",[`type--${A.type}`]])},[l(ae,null,{default:d(()=>[s(u).isShowGameStart?(a(),c("div",we,[e("button",{class:"_gamestart type--2",ref_key:"$gamestart",ref:z,onMouseenter:Q,onMouseleave:X,onClick:ee},[e("div",Ne,[(a(),c(N,null,q(Rs,(h,f)=>e("span",{key:h,class:g(`-p${f%Is+1}`)},null,2)),64))]),e("div",Re,[l(C,{frame:"72",x:"8",y:"9",fps:"15",image:s(B)("/global/sprite_gamestart_sidebox_ep2.jpg")},null,8,["image"])]),Ie],544)])):p("",!0)]),_:1}),p("",!0),l(ge,{rs:s(n).userRS,finally:"",initialPending:""},{default:d(()=>{var h,f,O,V,j;return[e("div",Me,[s(u).isSigninCommunity?(a(),c("div",Be,[e("div",Le,[Ae,e("button",{class:g(["_attend util-box",{"-visited":s(T)}]),onClick:i[1]||(i[1]=oe=>(Z(),s(R)("sub_Btn_visit")))},[Ee,_(" 방문 인증 ")],2)]),e("div",Te,[e("div",Ue,[e("div",{class:g(["profile-image",{"-empty":s(u).isEmptyProfileImage}])},[s(v).profileImageUrl?(a(),L(w,{key:0,src:s(v).profileImageUrl,alt:`${s(v).nickname}님의 프로필사진`},null,8,["src","alt"])):p("",!0)],2)]),e("div",$e,[e("div",Ge,[(h=s(v).grade)!=null&&h.iconUrl?(a(),L(w,{key:0,class:"_grade",src:(f=s(v).grade)==null?void 0:f.iconUrl,alt:""},null,8,["src"])):p("",!0),_(" "+y(s(v).nickname),1)]),e("div",Pe,[l(Se,{type:s(u).isMain?"box":"default",emptyNotice:s(u).isMain},null,8,["type","emptyNotice"])])])])])):(a(),c(N,{key:1},[s(u).isSignInNexon?(a(),c("div",Oe,[e("p",null,[e("strong",null,y(s(H)),1),_("님 ")]),e("button",{class:"_set-nickname button--basic",onClick:Y}," 커뮤니티 닉네임을 설정해주세요. ")])):(a(),c("div",Ve,[je,e("button",{class:"_login button--basic",onClick:K},"로그인")]))],64)),e("div",qe,[e("div",De,[s(u).isSigninCommunity?(a(),L(m,{key:0,class:"_mypage button--basic size--1",to:`/user/${(O=s(v))==null?void 0:O.userId}`},{default:d(()=>[_(" 마이 페이지 "),s(W)?(a(),c("i",ze)):p("",!0)]),_:1},8,["to"])):p("",!0),l(m,{class:"_account-type button--basic size--1",to:"/account/find-type",target:"_blank",onClick:i[2]||(i[2]=oe=>J("logout"))},{default:d(()=>[_(" 연동 계정 찾기 ")]),_:1})])])]),s(u).isSigninCommunity&&!s(u).isMain?(a(),c("div",{key:0,class:g(["sidebox__character",{"-ready":!s(n).user.mainCharacter}])},[e("div",{class:"_header -box"},[Fe,e("button",{class:"_change util-box",onClick:se},We)]),e("div",Ke,[e("div",Ye,[e("div",{class:g(["character-image",{"-empty":!s(n).user.mainCharacter}])},[s(n).user.mainCharacter?(a(),c("i",{key:0,class:g(["i--class-"+s(n).user.mainCharacter.strClassId])},null,2)):p("",!0)],2)]),e("div",Je,[s(n).user.mainCharacter?(a(),c(N,{key:0},[e("div",Ze,[e("span",Qe,"Lv. "+y(s(n).user.mainCharacter.n4Level),1),_(" "+y(s(n).user.mainCharacter.strName),1)]),e("ul",Xe,[e("li",null,[es,e("span",null,y(s(n).user.mainCharacter.strWorldName),1)]),e("li",null,[ss,e("span",null,y(s(n).user.mainCharacter.strClassName),1)]),e("li",{class:g({"-empty":!((j=(V=s(n).user)==null?void 0:V.mainCharacter)!=null&&j.strGuildName)})},[ts,e("span",null,y(s(n).user.mainCharacter.strGuildName||"결사 정보가 없습니다."),1)],2)])],64)):(a(),c(N,{key:1},[ns,as],64))])])],2)):p("",!0)]}),_:1},8,["rs"]),e("div",os,[l(m,{to:s(S).env.KAKAO_CHANNEL_URL,target:"_blank"},{default:d(()=>[is,_(" 카카오 채널 ")]),_:1},8,["to"]),l(m,{to:s(S).env.YOUTUBE_CHANNEL_URL,target:"_blank"},{default:d(()=>[cs,_(" 유튜브 채널 ")]),_:1},8,["to"])]),e("div",{class:"sidebox__banner",ref_key:"$banner",ref:U},[e("div",ls,[e("div",rs,[e("div",_s,[l(m,{to:"/records/roadmap",target:"_blank"},{default:d(()=>[l(w,{src:s(B)("/page/community/etc/img_banner_roadmap.png"),alt:"업데이트 로드맵"},null,8,["src"]),_(" 업데이트 로드맵 ")]),_:1})]),e("div",us,[l(m,{to:"/info/guide?headlineId=1618"},{default:d(()=>[l(w,{src:s(B)("/page/community/etc/img_banner_guide.png"),alt:"초보자 안내"},null,8,["src"]),_(" 초보자 안내 ")]),_:1})]),e("div",ds,[l(m,{to:"/info/guide?headlineId=1357"},{default:d(()=>[l(w,{src:s(B)("/page/community/etc/img_banner_dictionary.png"),alt:"프라시아 용어사전"},null,8,["src"]),_(" 프라시아 용어사전 ")]),_:1})])]),ps])],512),s(u).isMain?(a(),c("div",ms,[e("div",hs,[gs,ys,l(P,{class:"util-box",to:"/info/guide"},{default:d(()=>[vs,_(" 자세히 보기 ")]),_:1})]),e("div",bs,[e("ul",ks,[(a(!0),c(N,null,q(s(F).guide.listText,(h,f)=>(a(),c("li",{key:f},[l(P,{class:"hexatag -wide",href:h.strURL,target:h.strURLTarget},{default:d(()=>[_(y(h.strSubject),1)]),_:2},1032,["href","target"]),h.isNew==="1"?(a(),c("div",fs,"N")):p("",!0)]))),128))])])])):p("",!0),s(u).isMain?(a(),c("div",xs,[p("",!0),Ss,e("div",{class:g(["sidebox__etc__stores",{"-column":!0,"-regist":!1}])},[l(m,{class:"_playstore",to:s(S).env.PLAYSTORE_URL,target:"_blank"},{default:d(()=>[Cs]),_:1},8,["to"]),l(m,{class:"_appstore",to:s(S).env.APPSTORE_URL,target:"_blank"},{default:d(()=>[ws]),_:1},8,["to"]),(a(),L(m,{key:0,class:"_download",to:"/service/download"},{default:d(()=>[Ns]),_:1}))])])):p("",!0),p("",!0)],2)}}},Ts=ie(Ms,[["__scopeId","data-v-356d44fd"]]);export{Ts as S};
