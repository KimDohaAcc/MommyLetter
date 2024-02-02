package com.ssafy.A509.board.controller;

import com.ssafy.A509.board.dto.BoardResponse;
import com.ssafy.A509.board.dto.BoardSimpleResponse;
import com.ssafy.A509.board.dto.CreateBoardRequest;
import com.ssafy.A509.board.dto.UpdateBoardRequest;
import com.ssafy.A509.board.model.Category;
import com.ssafy.A509.board.service.BoardService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/boards")
@Tag(name = "Board", description = "Board API")
public class BoardController {

	private final BoardService boardService;

	@PostMapping
	public ResponseEntity<URI> createBoard(@Valid @RequestBody CreateBoardRequest boardRequest) {
		Long boardId = boardService.createBoard(boardRequest);
		return ResponseEntity.created(URI.create("/" + boardId)).build();
	}

	/*
	Access가 All, Follwer 인 모든 피드를 최신순으로 반환
	로그인 전용
	 */
	@GetMapping("/list/{userId}")
	public ResponseEntity<List<BoardSimpleResponse>> getAllBoardByUser(@PathVariable Long userId) {
		return ResponseEntity.ok(boardService.getAllBoardByUser(userId));
	}

	/*
	회원의 게시물 전체를 조회]
	미리보기 타입
	 */
	@GetMapping("/user/{userId}")
	public ResponseEntity<List<BoardSimpleResponse>> getUserBoard(@NotNull @PathVariable Long userId) {
		return ResponseEntity.ok(boardService.getUserBoard(userId));
	}

	/*
	게시물 하나 조회
	 */
	@GetMapping("/{boardId}")
	public ResponseEntity<BoardResponse> getBoard(@NotNull @PathVariable Long boardId) {
		return ResponseEntity.ok(boardService.getBoard(boardId));
	}

	/*
	카테고리 별 게시물 조회
	 */
	@GetMapping("/cate/{category}")
	public ResponseEntity<List<BoardSimpleResponse>> getBoardsByCategory(@NotNull @PathVariable Category category) {
		return ResponseEntity.ok(boardService.findAllByCategory(category));
	}

	/*
	게시글 업데이트
	 */
	@PatchMapping("/{boardId}")
	public ResponseEntity<Void> updateBoard(@NotNull @PathVariable Long boardId,
		@Valid @RequestBody UpdateBoardRequest boardRequest) {
		boardService.updateBoard(boardId, boardRequest);
		return ResponseEntity.ok().build();
	}

	/*
	게시물 삭제
	 */
	@DeleteMapping("/{boardId}")
	public ResponseEntity<Void> deleteBoard(@NotNull @PathVariable Long boardId) {
		boardService.deleteBoard(boardId);
		return ResponseEntity.noContent().build();
	}
}
