import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 3rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  position: relative;
  border-radius: 30px;
  border: 1px solid ${({ theme }) => theme.colors.grey};
  background-color: white;
  cursor: pointer;

  &.small {
    height: 2.5rem;
    width: 25%;
    padding: 0 1%;
    justify-content: center;
    font-size: 0.9rem;
  }

  &.big {
    padding: 0 5%;
    justify-content: space-between;
  }
`;

const Ul = styled.ul`
  width: 85%;
  position: absolute;
  top: 3rem;

  &.small {
    width: 100%;
  }
`;

const Li = styled.li`
  padding: 0.7rem;
  background-color: ${({ theme }) => theme.colors.blue_light};

  &:last-child {
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.grey2};
  }

  &.small {
    padding: 0.5rem 0.4rem;
  }
`;

function DropdownCategory({ list, fillPostForm, width, small }) {
  const dropDownRef = useRef(null);
  const [category, setCategory] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  });

  const handleClickOutside = (event) => {
    if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const showCategoryList = () => {
    return list.map((obj) => {
      const { id, category } = obj;
      return (
        <Li
          key={id}
          className={small && 'small'}
          onClick={() => onCategoryClickHandler(id, category)}
        >
          {category}
        </Li>
      );
    });
  };

  const onCategoryClickHandler = (id, name) => {
    setCategory(name);
    console.log('here');
    fillPostForm && fillPostForm({ category: id });
  };

  return (
    <Wrapper
      ref={dropDownRef}
      onClick={() => setIsOpen(!isOpen)}
      className={small && 'small'}
    >
      <span>{category ? category : '카테고리'}</span>
      <span> ▼ </span>
      <Ul className={small && 'small'}>{isOpen && showCategoryList()}</Ul>
    </Wrapper>
  );
}

export default DropdownCategory;
