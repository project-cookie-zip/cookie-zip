import styled from "styled-components";
import Image from "next/image";

export default function DetailPost() {
  return (
    <div>
      <div>
        <video src=""></video>
      </div>
      <div>
        <div>제목</div>
        <div>
          <div>조회수 00회</div>
          <div>1일 전</div>
        </div>
      </div>
      <div>
        <div>
          <Image src="" alt="프로필사진" />
          <div>작성자명</div>
          <div>구독자수(0만)</div>
          <button>구독</button>
        </div>
      </div>
      <div>내용 - 클릭 시 내용 노출</div>
      <div>
        <button>좋아요</button>
        <button>싫어요</button>
      </div>
    </div>
  );
}

const container = styled.div``;
