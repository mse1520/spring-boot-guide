package kyh.api.service;

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
    User user = new User("123", passwordEncoder.encode("123"), UserRole.USER);
    userRepository.save(user);

    Board board = new Board("제목", "내용", user);
    boardRepository.save(board);

    for (Integer i = 0; i < 65; i++) {
      Comment comment = new Comment("댓글" + i, board, user);
      commentRepository.save(comment);
    }
  }

}
