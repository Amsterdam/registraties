import { createGlobalStyle } from 'styled-components';
import 'amsterdam-stijl/dist/css/ams-stijl.css';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  p, li {
    line-height: 25px;
  }

  a, a:hover {
    color: #004699;
  }

  a:hover::before {
    background-image: url("~amsterdam-stijl/dist/images/svg/caret-left-blue.svg") !important;
  }

  h3 {
    font-size: 1.25rem !important;
    line-height: 1.4em !important;
  }

  ul li {
    margin: 0;
    padding: 0;
    line-height: 26px;
    text-indent: 0;
  }

  ul {
    padding-left: 18px;
  }

  dd {
    margin: 0;
  }

  @supports (display: flow-root) {
    .cf {
      display: flow-root;
    }
  }

  @supports not (display: flow-root) {
    .cf:before,
    .cf:after {
      content: " ";
      display: table;
    }

    .cf:after {
      clear: both;
    }
  }

  .visuallyhidden {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  .no-screen {
    @media screen {
      display: none;
    }
  }

  picture, main {
    display: block;
  }

  #app {
    min-height: 100%;
    min-width: 100%;

    .content.container, .content.container-fluid {
      padding-bottom: 20px;
      min-height: 60vh;
      margin-top: 20px;

      @media screen and (max-width: 576px) {
        margin-top: 0;
      }
    }

    .app-container {
      padding: 0;
      background-color: $ams-wit;
    }

    .container {
      width: 100%;
    }
  }


  @media print {
    html, body {height: 100%;}

    @page {
      size: A4;
      margin-left: 1cm;
      margin-right: 1cm;
    }

    // Reset the flex model to allow printig on more than one page
    .row {
      display: block;
    }

    .no-print {
      display: none !important;
    }

    .page-break {
      page-break-after: always;
    }
  }
`;

export default GlobalStyle;
