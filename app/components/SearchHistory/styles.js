import styled from 'styled-components';

export const SearchHistoryList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const SearchHistoryLabel = styled.p`
  margin: 8px 0;
`;

export const SearchHistoryWrapper = styled.div`
  min-width: 70px;
  max-width: 620px;
  margin: 0 auto;
  padding: 0 0 24px 0;

  @media (max-width: 650px) {
    max-width: calc(100vw - 30px);
  }
`;
