import styled, { css } from 'styled-components';

export const MapWrapper = styled.div`
  height: 200px;
  width: 100%;
`;

export const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const ArticleHeading = styled.h2`
  ${({ marginCollapse }) =>
    marginCollapse &&
    css`
      margin-top: 0;
    `}

  ${({ small }) =>
    small &&
    css`
      font-size: 20px;
    `}
`;

export const SectionHeading = styled.h3`
  margin-top: 30px;
  ${({ marginCollapse }) =>
    marginCollapse &&
    css`
      margin-top: 0;
    `}
`;

export const Key = styled.strong`
  font-weight: bold;
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

export const Ul = styled.ul`
  padding: 0;
  list-style: none;
  padding-bottom: 30px;

  &:not(:first-child) {
    border-bottom: 4px solid #767676;
  }

  & li:last-of-type ul {
    padding-bottom: 0;
  }

  *:last-of-type > *:last-of-type ul:last-of-type {
    border: 0;
  }

  li {
    padding-left: 23px;
    position: relative;

    &:before {
      content: '';
      position: absolute;
      left: 0;
      width: 8px;
      height: 8px;
      margin-top: 7px;
      background-color: #767676;
    }
  }

  & & li {
    padding-left: 0;

    &:before {
      content: unset;
    }
  }
`;

export const Tabs = styled.nav.attrs({
  className: 'cf',
})`
  flex-basis: 100;
  width: 100%;
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
