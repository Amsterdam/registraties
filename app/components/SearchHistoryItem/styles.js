import styled from 'styled-components';

export const SearchHistoryItem = styled.li`
  margin: 0 8px 8px 0;
  padding: 0;
  display: inline-block;

  &:after {
    content: ',';
  }

  &:last-child:after {
    content: '';
  }
`;
