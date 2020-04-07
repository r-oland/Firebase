// Components==============
import React, { useEffect, useState } from "react";
import styled from "styled-components";
// =========================

const Wrapper = styled.div`
  background: ${({ theme: { white } }) => white};
  padding: ${({ theme: { spacing } }) => `${spacing.s4} ${spacing.s4}`};
  box-shadow: ${({ theme: { shadow } }) => shadow.small};
  margin-bottom: ${({ theme: { spacing } }) => spacing.s4};
  position: relative;
`;

const TopLine = styled.div`
  display: flex;
  p {
    margin-right: ${({ theme: { spacing } }) => spacing.s4};
    color: ${({ theme: { gray } }) => gray.s7};
    font-weight: ${({ theme: { fontWeight } }) => fontWeight.bold};
  }
`;

const Message = styled.p`
  padding-top: ${({ theme: { spacing } }) => spacing.s4};
`;

const Delete = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
`;

const VoteWrap = styled.button`
  background: ${({ theme: { primary } }) => primary.s4};
  width: 25px;
  height: 25px;
  border-radius: 50%;
  position: absolute;
  bottom: 12.5px;
  right: 8.5px;
`;

export default function Comment({ firebase, user }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase.getMessages((results) => {
      let arr = [];

      results.docs.forEach((r) => {
        arr.push({ ...r.data(), id: r.id });
      });
      setData(arr);
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [firebase]);

  const CommentMap = data.map((edge) => {
    const date = edge.date.toDate().toDateString();

    const increment = () => {
      const inc = firebase.increment1;
      firebase.db
        .collection("comments")
        .where("message", "==", edge.message)
        .limit(1)
        .get()
        .then((snapshot) => {
          return snapshot.forEach((doc) => {
            doc.ref.update({ votes: inc });
          });
        });
    };

    return (
      <Wrapper key={edge.id}>
        <TopLine>
          <p>{edge.name}</p>
          <p>{date}</p>
        </TopLine>
        <Message>{edge.message}</Message>
        {user !== null && (
          <>
            <VoteWrap onClick={increment}>{edge.votes}</VoteWrap>
            <Delete
              onClick={() => {
                firebase.deleteMessage(edge.id);
              }}
            >
              X
            </Delete>
          </>
        )}
      </Wrapper>
    );
  });

  return CommentMap;
}
