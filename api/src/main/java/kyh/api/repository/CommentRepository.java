package kyh.api.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import kyh.api.domain.entity.Board;
import kyh.api.domain.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {

  @Query(//
      value = "select c from Comment c join fetch c.user m where c.board = :board order by c.createdDate asc", //
      countQuery = "select count(c.id) from Comment c where c.board = :board")
  Page<Comment> findWithUserByBoard(@Param("board") Board board, Pageable pageable);

  Optional<Comment> findWithUserById(@Param("id") Long id);

}
