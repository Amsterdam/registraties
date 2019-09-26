import styled from 'styled-components';

export const SearchHistoryItemWrapper = styled.li`
  margin: 0 8px 4px 0;
  padding: 0;
  display: inline-block;
  font-size: 14px;
  line-height: 1.25;

  &:after {
    content: ',';
  }

  &:last-child:after {
    content: '';
  }
`;
