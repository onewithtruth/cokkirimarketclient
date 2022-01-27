import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
import DropdownCategory from './common/DropdownCategory';
import Indicator from './common/Indicator';

function PostFormData({ fillPostForm, categoryList, postForm }) {
  const fileRef = useRef(null);
  const priceRef = useRef(null);
  const [preview, setPreview] = useState('');
  const [isImgLoading, setIsImgLoading] = useState(false);

  const previewUploader = (e) => {
    const uploadFile = e.target.files[0];
    getCloudUrl(uploadFile);
    setIsImgLoading(true);
  };

  const previewHandler = (e) => {
    if (!preview) {
      if (isImgLoading) {
        return <Indicator type='postForm'>로딩중</Indicator>;
      } else if (postForm.image_src) {
        return <PreviewImg src={postForm.image_src}></PreviewImg>;
      } else {
        return <Indicator type='postForm'>이미지를 등록해주세요</Indicator>;
      }
    } else {
      return <PreviewImg src={preview}></PreviewImg>;
    }
  };

  const priceHandler = (e) => {
    const price = e.target.value;
    if (price.length > 12) {
      priceRef.current.value = postForm.price;
    } else fillPostForm({ price });
  };

  const getCloudUrl = (uploadFile) => {
    const options = {
      method: 'post',
      url: `https://api.cokkirimarket.xyz/image/geturl`,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    axios(options)
      .then((res) => {
        const { uploadURL } = res.data.data;
        uploadCloudImg(uploadFile, uploadURL);
      })
      .catch(console.log);
  };

  const uploadCloudImg = (file, url) => {
    let bodyFormData = new FormData();
    bodyFormData.append('file', file);

    const options = {
      method: 'post',
      url,
      data: bodyFormData,
      headers: { 'Content-Type': 'multipart/form-data' }
    };

    axios(options)
      .then((res) => {
        const image_src = res.data.result.variants[0];
        fillPostForm({ image_src });
        setPreview(image_src);
        setIsImgLoading(false);
        console.log(preview);
      })
      .catch(console.log);
  };

  console.log(postForm);

  /* 
  A. 이미지가 없ㅇ르 때 
    1. 없다고 알려주는 컴포넌트 반환
    2. 대체 링크로 코끼리 전송
  B. 이미지 수정시에 postForm.image_src에서 내려 받아서 띄워주기
    <PreviewImg src={postForm.image_src}></PreviewImg>
*/

  return (
    <FormWrapper>
      <ImgWrapper>
        <PreviewDiv onClick={() => fileRef.current.click()}>
          {previewHandler()}
        </PreviewDiv>
        <FileInput
          type='file'
          ref={fileRef}
          accept='.jpeg, .jpg, .png'
          onChange={previewUploader}
        />
      </ImgWrapper>
      <SingleInput
        type='text'
        placeholder='제목을 입력하세요'
        onChange={(e) => {
          console.log(e.target.value);
          fillPostForm({ title: e.target.value });
        }}
        defaultValue={postForm.title}
      />
      <DropdownCategory
        list={categoryList}
        fillPostForm={fillPostForm}
        width='85%'
        size='large'
      ></DropdownCategory>
      <SingleInput
        type='number'
        ref={priceRef}
        placeholder='가격을 입력하세요'
        onChange={priceHandler}
        defaultValue={postForm.price}
      />
      <Textarea
        placeholder='내용을 입력하세요'
        onChange={(e) => fillPostForm({ contents: e.target.value })}
        defaultValue={postForm.contents}
      ></Textarea>
    </FormWrapper>
  );
}

const FormWrapper = styled.div`
  width: 100%;
  height: 90vh;
  padding: 2rem 0;
  margin: 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImgWrapper = styled.div`
  width: 100%;
  margin: 3rem 0 1rem 0;
  display: flex;
  justify-content: center;
`;

const preview = css`
  background-color: white;
  border-radius: 1rem;
`;

const PreviewDiv = styled.div`
  ${preview};
  width: 60%;
  height: 12rem;
  border: 1px solid ${({ theme }) => theme.colors.grey};
`;

const PreviewImg = styled.img`
  ${preview}
  width:100%;
  height: 100%;
`;

const SingleInput = styled.input`
  width: 85%;
  height: 3rem;
  padding: 0 5%;
  margin-bottom: 1rem;
  border-radius: 30px;
  border: 1px solid ${({ theme }) => theme.colors.grey};
`;

const FileInput = styled(SingleInput)`
  display: none;
`;

const Textarea = styled.textarea`
  width: 85%;
  height: 15rem;
  padding: 5%;
  border-radius: 30px;
  border: 1px solid ${({ theme }) => theme.colors.grey};
  border-radius: 30px;
`;

export default PostFormData;
