import { List } from "src/components/list/List";
import styled from "styled-components";
import { useEffect } from "react";
import axios from "axios";
import { useQuery, useMutation } from "react-query";
import { baseImageData } from "@utils/client/baseImage";
import Image from "next/image";
import { useState } from "react";
import Router from "next/router";
import Swal from "sweetalert2";
import { MyVideoList } from "src/components/mypage/MyVideoList";
import Link from "next/link";
import { useRouter } from "next/router";

export default function MyPage() {
  const router = useRouter();
  const getMyInfo = async () => {
    const { data } = await axios.get(`/api/users/me`);
    console.log(data);
    return data?.profile;
  };

  const { data } = useQuery({
    queryKey: ["getMyInfo"],
    queryFn: getMyInfo,
  });
  console.log(data);

  const baseImage = baseImageData(data?.id);

  //userImage 업로드

  const [testSend, setTestSend] = useState("");

  const postImage = async () => {
    let formData = new FormData();
    formData.append("file", testSend);

    const {
      data: { id, uploadURL },
    } = await axios.get("/api/image");
    // console.log("data", data);
    // console.log(uploadURL, id);

    const {
      data: {
        result: { variants },
      },
    } = await axios.post(uploadURL, formData);

    await axios.post("/api/users/me", {
      // email,
      avatar: variants[1],
      // nickname,
    });

    // setEdit(false);
  };

  const imageMutate = useMutation(postImage);

  const addImage = async () => {
    imageMutate.mutate();
    closeModal();
    // Router.push("/mypage");
  };

  //정보 수정 모달 창
  const [edit, setEdit] = useState(false);

  console.log(edit);

  //클릭하면 모달 창이 열린다.
  const editHandler = (e: any) => {
    e.preventDefault();
    setEdit(true);
  };

  const closeModal = () => {
    setEdit(false);
  };

  //프로필 이미지 미리보기

  const [imgSrc, setImgSrc] = useState<string | any>("");

  // 미리보기 로직 - input의 onChange에 넣어줄 함수
  const fileChange = (fileBlob: any) => {
    let maxSize = 5 * 1024 * 1024; // 1024 byte * 1024 = 1MB
    let fileSize = fileBlob.size;
    if (fileSize > maxSize) {
      Swal.fire({
        title: "업로드할 이미지는 5MB 이하로 선택해주세요",
        icon: "warning",
        confirmButtonColor: "#A9653B",
        confirmButtonText: "알겠어용",
      }).then(result => {
        if (result.value) {
        }
      });
    } else {
      setTestSend(fileBlob);
      const reader = new FileReader();
      reader.readAsDataURL(fileBlob);
      return new Promise(resolve => {
        reader.onload = () => {
          setImgSrc(reader.result);
          resolve();
        };
      });
    }
  };

  //모달창 함수화
  const profileModal = () => {
    return (
      <STModalBackground onClick={closeModal}>
        <STModalContainer onClick={e => e.stopPropagation()}>
          <label htmlFor="inputFile">
            <Image
              src={require("../../src/images/cookieCamera.png")}
              alt="https://icons8.com/icons/set/camera Upload to Cloud icon by https://icons8.com Icons8"
              width={40}
              height={40}
            />
          </label>
          <input
            id="inputFile"
            type="file"
            name="file"
            accept="image/*" // input을 이미지를 받는 버튼으로 변경(type="file")
            style={{ display: "none" }} // 기본 이미지는 못생겼으니 숨기고 label로 style 주기
            onChange={(e: any) => {
              fileChange(e.target.files[0]);
            }}
          />
          <Image
            className="userImage"
            src={
              imgSrc === "" ? (data?.avatar ? data?.avatar : baseImage) : imgSrc
            }
            style={imgSrc === "" ? { display: "none" } : { display: "block" }}
            alt={data?.avatar}
            width={90}
            height={90}
            unoptimized={true}
          />
          <button onClick={addImage} type="button">
            사진 업로드
          </button>
        </STModalContainer>
      </STModalBackground>
    );
  };

  return (
    <STMypageContainer>
      <STTopBar>
        <STMenu
          onClick={() => {
            router.push("/mypage");
          }}
        >
          MyVideos
        </STMenu>
      </STTopBar>
      <STProfile>
        <STAvatarBox>
          {edit ? (
            profileModal()
          ) : (
            <>
              <STProfileImageBox>
                <Image
                  src={data?.avatar ? data?.avatar : baseImage}
                  alt="프로필사진"
                  width={60}
                  height={60}
                  unoptimized={true}
                />
              </STProfileImageBox>
              <Image
                onClick={editHandler}
                className="editbutton"
                src={require("../../src/images/cookieEdit.png")}
                alt="https://icons8.com/icon/WLubF9R6RUtV/upload-to-cloud Upload to Cloud icon by https://icons8.com Icons8"
                width={25}
                height={25}
              />
            </>
          )}
        </STAvatarBox>
        <span className="nickname">{data?.name}</span>
        <div>
          <span>구독자 10명 ∙ 동영상 10개</span>
        </div>
      </STProfile>
      <MyVideoList />
    </STMypageContainer>
  );
}

const STMypageContainer = styled.div`
  height: 100vh;
`;

const STTopBar = styled.div`
  margin-top: 43px;
  height: 40px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #a9653b;
  border-bottom: 1px solid #a9653b;
`;

const STMenu = styled.div`
  cursor: pointer;
  font-size: 21px;
  transition: 0.3s;
  color: ${props => props.theme.mainFontColor};
`;

const STProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  & div {
  }
  .nickname {
    font-size: 28px;
  }
  & span {
    transition: 0.3s;
    color: ${props => props.theme.mainFontColor};
  }
`;

const STAvatarBox = styled.span`
  display: flex;
  position: relative;
  .editbutton {
    position: absolute;
    bottom: 0;
    right: -28px;
  }
`;

const STProfileImageBox = styled.div`
  border-radius: 50%;
  width: 70px;
  height: 70px;
  overflow: hidden;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const STProfileImg = styled.img``;

const STModalBackground = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;

const STModalContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 25px;
  width: 70vw;
  height: 50vh;
  position: fixed;
  top: 90px;
  left: 50px;
  background-color: white;
  & label {
    border: 1px solid #a9653b;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 120px;
    z-index: 100;
    border-radius: 50%;
  }
  & img {
  }
  .userImage {
    position: absolute;
    top: 26px;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
  }
  & button {
    background-color: #a9653b;
    border: none;
    padding: 7px;
    border-radius: 5px;
    margin-top: 20px;
    color: white;
  }
`;
