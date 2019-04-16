import { createGlobalStyle } from 'styled-components';
import 'amsterdam-stijl/dist/css/ams-stijl.css';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: AvenirNextLTW01-Regular, Helvetica Neue, Helvetica, Arial, sans-serif;
  }

  p {
    line-height: 26px;
  }

  a, a:hover {
    color: #004699 !important;
  }

  a:hover::before {
    background-image: url("~amsterdam-stijl/dist/images/svg/caret-left-blue.svg") !important;
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

  #app {
    min-height: 100%;
    min-width: 100%;
    background-color: $ams-background-sidebars;

    .content.container, .content.container-fluid {
      padding-bottom: 20px;
      min-height: 60vh;
      margin-top: 20px;

      @media screen and (max-width:576px) {
        margin-top: 0;
      }
    }

    .app-container {
      padding: 0;
      background-color: $ams-wit;
    }

    .container {
      width: auto;
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
