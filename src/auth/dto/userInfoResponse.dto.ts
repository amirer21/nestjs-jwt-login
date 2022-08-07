export class UserInfoResponseDto {
  returnCode: number; // 0(성공 또는 실패번호)
  returnMsg: string; // 관련 메세지
  id: string;
  email: string;
}
