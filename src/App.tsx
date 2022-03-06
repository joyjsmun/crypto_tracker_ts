import React, { useState } from 'react';
import Router from './routes/Router';
import styled, {createGlobalStyle, ThemeProvider} from "styled-components";
import { ReactQueryDevtools } from "react-query/devtools";
import { lightTheme,darkTheme } from './theme';


const GlobalStyle = createGlobalStyle`
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

body {
  font-weight: 300;
  font-family: 'Source Sans Pro', sans-serif;
  background-color:${(props) => props.theme.bgColor};
  color:${(props) => props.theme.textColor};
  line-height: 1.2;
}

a{
  text-decoration: none;
  color:inherit;
}
`

const ModeButton= styled.button`
  
  border: none;
  color: white;
  padding: 10px 12px;
  border-radius: 20px;
  text-align: center;
  text-decoration: none;
  margin-right: 20px ;
`


function App() {
  const [isDark,setDark] = useState(false);
  const onClick = () => setDark((current) => !current);
  return (
  
    //ghost componet could make not to use parent component
    <>
     <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
    <GlobalStyle/>
    <ModeButton onClick={onClick} >Change Mode &#8617;</ModeButton>
    <Router />
    <ReactQueryDevtools initialIsOpen={true}/>
    </ThemeProvider>
    </>
  );
}

export default App;
