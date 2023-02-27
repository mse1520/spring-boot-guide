package kyh.api.service;

import java.util.Arrays;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kyh.api.domain.entity.Authority;
import kyh.api.domain.entity.Board;
import kyh.api.domain.entity.Comment;
import kyh.api.domain.entity.Member;
import kyh.api.domain.type.MemberRole;
import kyh.api.repository.AuthorityRepository;
import kyh.api.repository.BoardRepository;
import kyh.api.repository.MemberRepository;
import kyh.api.repository.CommentRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DummyDataService {

  private final PasswordEncoder passwordEncoder;
  private final AuthorityRepository authorityRepository;
  private final MemberRepository memberRepository;
  private final BoardRepository boardRepository;
  private final CommentRepository commentRepository;

  @Transactional
  public void make() {
    Authority authSuper = authorityRepository.findByRole(MemberRole.SUPER).orElseThrow();
    Authority authUser = authorityRepository.findByRole(MemberRole.USER).orElseThrow();

    Member member1 = new Member("123", passwordEncoder.encode("123"), authSuper);
    Member member2 = new Member("test2", passwordEncoder.encode("123"), authUser);
    memberRepository.saveAll(Arrays.asList(member1, member2));

    for (Integer i = 0; i < 65; i++) {
      Board board = new Board("제목" + i, "내용" + i, member1);
      boardRepository.save(board);
    }

    Board board1 = new Board("테스트 게시글1", "테스트 게시글 내용1", member1);
    Board board2 = new Board("테스트 게시글2", "테스트 게시글 내용2", member2);
    boardRepository.saveAll(Arrays.asList(board1, board2));

    for (Integer i = 0; i < 33; i++) {
      Comment comment1 = new Comment("댓글" + i, board1, member1);
      Comment comment2 = new Comment("댓글" + i, board1, member2);
      commentRepository.saveAll(Arrays.asList(comment1, comment2));
    }

    for (Integer i = 0; i < 33; i++) {
      Comment comment1 = new Comment("댓글" + i, board2, member1);
      Comment comment2 = new Comment("댓글" + i, board2, member2);
      commentRepository.saveAll(Arrays.asList(comment1, comment2));
    }
  }

}
