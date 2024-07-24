import{j as n}from"./jsx-runtime-e669f2f5.js";import"./index-9d841d23.js";import"./_commonjsHelpers-de833af9.js";const x=({song:e,isSpinning:j})=>n.jsx("div",{className:"song-display","data-testid":"active-song",children:e?n.jsxs("div",{children:[n.jsxs("h1",{"data-testid":"song-name",children:[" Now playing: ",e.name]}),n.jsxs("h2",{"data-testid":"song-artist",children:[" By: ",e.artist]}),n.jsx("img",{src:e.image,alt:"song image cover",className:j?"rotating":"image-wrapper","data-testid":"song-image"})]}):n.jsx("p",{"data-testid":"no-song-playing",role:"contentinfo",children:"No song is playing..."})});x.__docgenInfo={description:"",methods:[],displayName:"CurrentSongDisplay",props:{song:{required:!0,tsType:{name:"union",raw:"Song | null",elements:[{name:"Song"},{name:"null"}]},description:""},isSpinning:{required:!0,tsType:{name:"boolean"},description:""}}};const L={title:"Components/CurrentSongDisplay",component:x,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{song:{control:"object"},isSpinning:{control:"boolean"}}},t={name:"Bohemian Rhapsody",artist:"Queen",image:"https://example.com/bohemian-rhapsody.jpg",uri:"spotify:track:6rqhFgbbKwnb9MLmUQDhG6",duration:354e3},s={args:{song:t,isSpinning:!0}},a={args:{song:t,isSpinning:!1}},r={args:{song:null,isSpinning:!1}},o={args:{song:{...t,name:"This is an Extremely Long Song Title That Might Cause Wrapping Issues",artist:"The Band with an Incredibly Long Name That Goes on Forever"},isSpinning:!0}};var i,g,p;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    song: sampleSong,
    isSpinning: true
  }
}`,...(p=(g=s.parameters)==null?void 0:g.docs)==null?void 0:p.source}}};var m,c,l;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    song: sampleSong,
    isSpinning: false
  }
}`,...(l=(c=a.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};var d,u,h;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    song: null,
    isSpinning: false
  }
}`,...(h=(u=r.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};var S,y,T;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    song: {
      ...sampleSong,
      name: "This is an Extremely Long Song Title That Might Cause Wrapping Issues",
      artist: "The Band with an Incredibly Long Name That Goes on Forever"
    },
    isSpinning: true
  }
}`,...(T=(y=o.parameters)==null?void 0:y.docs)==null?void 0:T.source}}};const v=["Playing","Paused","NoSong","LongTitles"];export{o as LongTitles,r as NoSong,a as Paused,s as Playing,v as __namedExportsOrder,L as default};
