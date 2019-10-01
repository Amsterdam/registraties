import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
  justify-content: space-between;

  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    max-width: 1023px;
    margin: 0 auto !important;
  }

  @media screen and (max-width: 920px) {
    flex-direction: column;

    & > * {
      padding-top: 1em;
      max-width: 100vw !important;

      &:not(.no-print):first-child {
        border-top: 2px solid gray;
        margin-top: 30px;
      }
    }

    & > :not(.no-print):not(:last-child) {
      order: 2;
    }
  }

  @media screen and (min-width: 500px) and (max-width: 920px) {
    aside {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      & > section {
        flex: 0 1 48%;
        margin-bottom: 30px;

        h3 {
          margin-top: 0;
        }
      }
    }
  }
`;

export const Key = styled.strong`
  margin-top: 20px;
`;

export const Aside = styled.aside`
  padding-top: 50px;
`;

export const Textarea = styled.textarea`
  width: 100%;
  resize: vertical;
  min-height: 79px; // three lines of text + top and bottom padding
  max-height: 212px; // ten lines of text
`;

export const Label = styled.label`
  font-family: Avenir Next LT W01 Demi;
  font-weight: 400;

  @media print {
    display: block;
    margin-top: 1cm;
  }
`;

export const StelselpediaLink = styled.a`
  display: inline-block;
  width: 18px;
  height: 18px;
  text-align: center;
  line-height: 18px;
  border-radius: 50%;
  background-color: #b4b4b4;
  color: white;
  text-decoration: none;
  font-size: 12px;
  cursor: pointer;
  vertical-align: middle;
  margin-left: 15px;

  &:hover {
    background-color: #009dec;
    color: white;
  }

  @media print {
    display: none;
  }
`;

export const Small = styled.small`
  font-size: initial;
`;
