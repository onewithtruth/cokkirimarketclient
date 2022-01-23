import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
import DropdownCategory from './common/DropdownCategory';

const FormWrapper = styled.div`
  width: 100%;
  height: 90vh;
  padding: 2rem 0;
  margin: 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.grey_light};
`;

const ImgWrapper = styled.div`
  width: 100%;
  margin: 3rem 0 1rem 0;
  display: flex;
  justify-content: center;
`;

const preview = css`
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.grey};
  border-radius: 1rem;
  box-shadow: 1px 1px 10px -5px ${({ theme }) => theme.colors.blue_base};
`;

const PreviewDiv = styled.div`
  ${preview};
  width: 60%;
  height: 12rem;
`;

const PreviewImg = styled.img`
  ${preview}
  width:100%;
  height: 100%;
`;

export const SingleInput = styled.input`
  width: 85%;
  height: 3rem;
  padding: 0 5%;
  margin-bottom: 1rem;
  border-radius: 30px;
  border: 1px solid ${({ theme }) => theme.colors.grey};
  box-shadow: 1px 1px 10px -5px ${({ theme }) => theme.colors.blue_base};
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
  box-shadow: 1px 1px 10px -5px ${({ theme }) => theme.colors.blue_base};
`;

function PostFormData({ fillPostForm, categoryList }) {
  const fileRef = useRef(null);
  const [preview, setPreview] = useState('');

  const previewHandler = (e) => {
    const uploadFile = e.target.files[0];
    getCloudUrl(uploadFile);
  };

  const getCloudUrl = (uploadFile) => {
    const options = {
      method: 'post',
      url: `https://dev.cokkiriserver.xyz/image/geturl`,
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
        console.log(preview);
      })
      .catch(console.log);
  };

  return (
    <FormWrapper>
      <ImgWrapper>
        <PreviewDiv onClick={() => fileRef.current.click()}>
          {preview && <PreviewImg src={preview}></PreviewImg>}
        </PreviewDiv>
        <FileInput
          type='file'
          ref={fileRef}
          accept='.jpeg, .jpg, .png'
          onChange={previewHandler}
        />
      </ImgWrapper>
      <SingleInput
        type='text'
        placeholder='제목을 입력하세요'
        onChange={(e) => fillPostForm({ title: e.target.value })}
      />
      <DropdownCategory
        list={categoryList}
        fillPostForm={fillPostForm}
        width='85%'
      ></DropdownCategory>
      <SingleInput
        type='number'
        placeholder='가격을 입력하세요'
        onChange={(e) => fillPostForm({ price: e.target.value })}
      />
      <Textarea
        placeholder='내용을 입력하세요'
        onChange={(e) => fillPostForm({ contents: e.target.value })}
      ></Textarea>
    </FormWrapper>
  );
}

export default PostFormData;
