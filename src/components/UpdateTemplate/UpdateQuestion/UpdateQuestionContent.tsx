import styled from '@emotion/styled';
import { useState } from 'react';

import { recordQuestionsType } from '@/types/recordDetail.interface';

type QuestionContentProps = {
  onChange: (
    order: number,
    valueKey: string,
    value: string | string[] | boolean
  ) => void;
  question: recordQuestionsType;
  isCheckOut: boolean;
};

export default function QuestionContent({
  onChange,
  question,
  isCheckOut,
}: QuestionContentProps) {
  const [currentTitle, setCurrentTitle] = useState(question.title);
  const [currentDescription, setCurrentDescription] = useState(
    question.description
  );
  return (
    <QuestionContentContainer>
      <StyledLabel htmlFor="questionTitle">문항 제목</StyledLabel>
      <StyledInput
        type="text"
        name="questionTitle"
        id="questionTitle"
        placeholder="문항 제목을 적어주세요. (최대 50자)"
        style={{
          height: '2.5rem',
          margin: '0.4rem 0 0.4rem 0',
        }}
        onChange={e => {
          setCurrentTitle(e.target.value);
        }}
        onBlur={e => {
          onChange(question.order, 'title', e.target.value);
        }}
        value={currentTitle}
        disabled={isCheckOut}
      />
      <StyledLabel htmlFor="questionDescription">문항 설명</StyledLabel>
      <StyledTextArea
        name="questionDescription"
        id="questionDescription"
        placeholder="문항 설명을 적어주세요. (생략 가능)"
        style={{
          height: '4.2rem',
          margin: '0.4rem 0 0.4rem 0',
        }}
        onChange={e => {
          setCurrentDescription(e.target.value);
        }}
        onBlur={e => {
          onChange(question.order, 'description', e.target.value);
        }}
        value={currentDescription}
        disabled={isCheckOut}
      />
    </QuestionContentContainer>
  );
}

const QuestionContentContainer = styled('div')`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0 1rem 0;
`;

const StyledLabel = styled('label')`
  font-size: 0.8rem;
`;

const StyledInput = styled('input')`
  font-size: 0.8rem;
  border: 0.2px solid #cfcfcf;
  border-radius: 10px 10px 10px 10px;
  padding: 0.5rem;
  text-align: top;
  &::placeholder {
    color: #cfcfcf;
    font-size: 0.8rem;
  }
`;

const StyledTextArea = styled('textarea')`
  font-size: 0.8rem;
  border: 0.2px solid #cfcfcf;
  border-radius: 10px 10px 10px 10px;
  padding: 0.5rem;
  &::placeholder {
    color: #cfcfcf;
    font-size: 0.8rem;
  }
`;