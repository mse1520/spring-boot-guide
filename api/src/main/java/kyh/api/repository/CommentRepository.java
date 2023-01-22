package kyh.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import kyh.api.domain.entity.Board;
import kyh.api.domain.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {

  @Query("select c from Comment c join fetch c.user where c.board = :board order by c.createdDate asc")
  List<Comment> findWithUserByBoard(@Param("board") Board board);

}
