package kyh.api.service;

import javax.annotation.PostConstruct;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kyh.api.domain.entity.Board;
import kyh.api.domain.entity.User;
import kyh.api.domain.type.UserRole;
import kyh.api.repository.BoardRepository;
import kyh.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class DummyService {

  private final PasswordEncoder passwordEncoder;
  private final UserRepository userRepository;
  private final BoardRepository boardRepository;

  @PostConstruct
  @Transactional
  private void init() {
    User user = new User("이름1", passwordEncoder.encode("1234"), UserRole.USER);
    userRepository.save(user);

    for (int i = 0; i < 60; i++) {
      Board board = new Board("제목" + i, "내용" + i, user);
      boardRepository.save(board);
    }
  }

}
