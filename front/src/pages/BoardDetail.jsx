import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Loading from '../components/Loading';
import Textarea from '../components/Textarea';
import { DefaultButton } from '../styles/button';
import { getApi } from '../utils/Api';

const Header = styled.header`
border-bottom: .1rem solid dimgray;
margin-bottom: 1rem;
`;
const DetailInfo = styled.div`
margin: 1rem 0;
font-size: .9rem;
display: flex;
justify-content: space-between;
align-items: end;
`;
const UserName = styled.div`
font-weight: bolder;
`;
const CreatedDate = styled.div`
color: gray;
`;
const Content = styled.div`
white-space: pre-wrap;
margin: 1rem 0;
min-height: 10rem;
`;
const Hr = styled.hr`
margin: 1rem 0;
border: none;
border-bottom: .1rem solid dimgray;
`;
const WriteCommentGroup = styled.div`
display: flex;
flex-direction: column;
align-items: end;
gap: .5rem;
`;
const StyledTextarea = styled(Textarea)`
height: 5rem;
`;

const BoardDetail = () => {
  const { boardId } = useParams();
  const [board, setBoard] = useState();

  useEffect(() => {
    getApi(`/api/board/info/${boardId}`)
      .then(v => setBoard(v.body))
      .catch(console.error)
  }, []);

  if (board === undefined) return <Loading />;

  return <>
    <Header>
      <h2>{board?.title}</h2>
      <DetailInfo>
        <div>
          <UserName>{board?.userName}</UserName>
          <CreatedDate>{board?.createdDate}</CreatedDate>
        </div>
        <div>댓글수: 0</div>
      </DetailInfo>
    </Header>
    <section>
      <Content>{board?.content}</Content>
      <Hr />
      <WriteCommentGroup>
        <StyledTextarea placeholder='댓글을 남겨보세요.' />
        <DefaultButton>등록</DefaultButton>
      </WriteCommentGroup>
    </section>
  </>;
};

export default BoardDetail;