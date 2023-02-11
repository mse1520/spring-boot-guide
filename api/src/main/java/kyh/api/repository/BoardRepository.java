package kyh.api.repository;

import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import kyh.api.domain.entity.Board;

public interface BoardRepository extends JpaRepository<Board, Long> {

  @Query("select b from Board b join fetch b.user order by b.createdDate desc")
  Slice<Board> findWithUserAll(Pageable pageable);

  @Query("select b from Board b join fetch b.user where b.id = :id")
  Optional<Board> findWithUserById(@Param("id") Long id);

}
