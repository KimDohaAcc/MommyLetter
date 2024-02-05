package com.ssafy.A509.exception;

import lombok.Getter;

@Getter
public enum ErrorCode {

    /**
     * ******************************* Global Error CodeList ***************************************
     * HTTP Status Code
     * 400 : Bad Request
     * 401 : Unauthorized
     * 403 : Forbidden
     * 404 : Not Found
     * 500 : Internal Server Error
     * *********************************************************************************************
     */
    // 잘못된 서버 요청
    BAD_REQUEST_ERROR(400, "G001", "Bad Request Exception"),

    // @RequestBody 데이터 미 존재
    REQUEST_BODY_MISSING_ERROR(400, "G002", "Required request body is missing"),

    // 유효하지 않은 타입
    INVALID_TYPE_VALUE(400, "G003", " Invalid Type Value"),

    // Request Parameter 로 데이터가 전달되지 않을 경우
    MISSING_REQUEST_PARAMETER_ERROR(400, "G004", "Missing Servlet RequestParameter Exception"),

    // 입력/출력 값이 유효하지 않음
    IO_ERROR(400, "G005", "I/O Exception"),

    // com.fasterxml.jackson.core Processing Error
    JACKSON_PROCESS_ERROR(400, "G006", "com.fasterxml.jackson.core Exception"),

    // 권한이 없음
    FORBIDDEN_ERROR(403, "G007", "Forbidden Exception"),

    // 서버로 요청한 리소스가 존재하지 않음
    NOT_FOUND_ERROR(404, "G008", "Not Found Exception"),

    // NULL Point Exception 발생
    NULL_POINT_ERROR(404, "G009", "Null Point Exception"),

    // @RequestBody 및 @RequestParam, @PathVariable 값이 유효하지 않음
    NOT_VALID_ERROR(404, "G010", "Handle Validation Exception"),

    // @RequestBody 및 @RequestParam, @PathVariable 값이 유효하지 않음
    NOT_VALID_HEADER_ERROR(404, "G011", "Header에 데이터가 존재하지 않는 경우 "),

    // 서버가 처리 할 방법을 모르는 경우 발생
    INTERNAL_SERVER_ERROR(500, "G999", "Internal Server Error Exception"),

    //******************************* Custom Error CodeList ***************************************

    INSERT_ERROR(200, "1000", "Insert Transaction Error Exception"),

    UPDATE_ERROR(200, "1001", "Update Transaction Error Exception"),

    DELETE_ERROR(200, "1002", "Delete Transaction Error Exception"),

    NO_SUCH_DIARY(200, "1003", "DiaryId에 대응하는 Diary가 존재하지 않습니다"),

    NO_SUCH_ACCOUNT(200, "1004", "UserId에 대응하는 User가 존재하지 않습니다"),

    NO_SUCH_RESERVE(200, "1005", "ReserveId에 대응하는 Reserve가 존재하지 않습니다"),

    NO_SUCH_DOCTOR(200, "1006", "DoctorId에 대응하는 Doctor가 존재하지 않습니다"),

    NO_SUCH_PRESCRIPTION(200, "1007", "해당 경로에 Prescription이 존재하지 않습니다"),

    NO_SUCH_FILE_FROM_PATH(200, "1008", "해당 경로에 파일이 존재하지 않습니다"),

    NO_CONSULT_DETAIL(200, "1009", "CounselingId에 해당하는 의사 정보가 없습니다"),

    NO_PATIENT_INFO(200, "1010", "ReserveId에 해당하는 환자의 정보가 존재하지 않습니다"),

    ; // End


    //******************************* Error Code Constructor ***************************************

    // 에러 코드의 '코드 상태'를 반환한다.
    private final int status;

    // 에러 코드의 '코드간 구분 값'을 반환한다.
    private final String divisionCode;

    // 에러 코드의 '코드 메시지'를 반환한다.
    private final String message;

    // 생성자 구성
    ErrorCode(final int status, final String divisionCode, final String message) {
        this.status = status;
        this.divisionCode = divisionCode;
        this.message = message;
    }
}
