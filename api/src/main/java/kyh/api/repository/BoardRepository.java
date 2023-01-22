package kyh.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import kyh.api.domain.entity.Board;

public interface BoardRepository extends JpaRepository<Board, Long> {
  @Query("select b from Board b join fetch b.user order by b.createdDate desc")
  List<Board> findAllWithUser();
}
