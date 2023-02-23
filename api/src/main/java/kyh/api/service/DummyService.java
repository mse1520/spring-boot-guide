package kyh.api.service;

import java.util.Arrays;

import javax.annotation.PostConstruct;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kyh.api.domain.entity.Board;
import kyh.api.domain.entity.Comment;
import kyh.api.domain.entity.User;
import kyh.api.domain.type.UserRole;
import kyh.api.repository.BoardRepository;
import kyh.api.repository.UserRepository;
import kyh.api.repository.CommentRepository;
import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class DummyService {

  private final PasswordEncoder passwordEncoder;
  private final UserRepository userRepository;
  private final BoardRepository boardRepository;
  private final CommentRepository commentRepository;

  @PostConstruct
  @Transactional
  private void init() {
    User user1 = new User("test1", passwordEncoder.encode("123"), UserRole.SUPER);
    User user2 = new User("test2", passwordEncoder.encode("123"), UserRole.USER);
    userRepository.saveAll(Arrays.asList(user1, user2));

    for (Integer i = 0; i < 65; i++) {
      Board board = new Board("제목" + i, "내용" + i, user1);
      boardRepository.save(board);
    }

    Board board1 = new Board("테스트 게시글1", "테스트 게시글 내용1", user1);
    Board board2 = new Board("테스트 게시글2", "테스트 게시글 내용2", user2);
    boardRepository.saveAll(Arrays.asList(board1, board2));

    for (Integer i = 0; i < 33; i++) {
      Comment comment1 = new Comment("댓글" + i, board1, user1);
      Comment comment2 = new Comment("댓글" + i, board1, user2);
      commentRepository.saveAll(Arrays.asList(comment1, comment2));
    }

    for (Integer i = 0; i < 33; i++) {
      Comment comment1 = new Comment("댓글" + i, board2, user1);
      Comment comment2 = new Comment("댓글" + i, board2, user2);
      commentRepository.saveAll(Arrays.asList(comment1, comment2));
    }
  }

}
