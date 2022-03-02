import React, { useState } from 'react';
import Router from './routes/Router';
import styled, {createGlobalStyle} from "styled-components";
import { ReactQueryDevtools } from "react-query/devtools";


const GlobalStyle = createGlobalStyle<{darkMode:boolean}>`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');

*/
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
*{
  box-sizing: border-box;
}

body{
  font-family: 'Source Sans Pro', sans-serif;
  background-color: ${(props) => props.darkMode ? props.theme.bgColor: props.theme.lightBgColor};
  color:${(props) => props.darkMode ? props.theme.textColor: props.theme.lightTextColor};
}

a{
  text-decoration: none;
  color:inherit;
}
`

const ModeButton= styled.button<{darkMode:boolean}>`
  background-color: ${(props) => props.darkMode ? props.theme.accentColor: props.theme.lightAccentColor};
  border: none;
  color: white;
  padding: 10px 12px;
  border-radius: 20px;
  text-align: center;
  text-decoration: none;
  margin-right: 20px ;
`

interface IMode{
    darkMode:boolean;
}


function App() {
  const [darkMode,setDark] = useState(true);
  const onClick = () => {
      if(darkMode === true){
          setDark(false);
      }else{
          setDark(true);   
      }
  }
  return (
    //ghost componet could make not to use parent component
    <>
    <GlobalStyle darkMode={darkMode}/>
    <ModeButton onClick={onClick} darkMode={darkMode}>{darkMode? `Light` : `Dark`} Mode &#8617;</ModeButton>
    <Router />
    <ReactQueryDevtools initialIsOpen={true}/>
    </>
  );
}

export default App;
