import styled from 'styled-components';

export const MapWrapper = styled.div`
  height: 200px;
  width: 100%;
`;

export const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const Heading = styled.h2`
  margin-top: 0;
`;

export const Key = styled.strong`
  font-weight: bold;
  margin-top: 20px;
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
  margin-bottom: 1em;

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
