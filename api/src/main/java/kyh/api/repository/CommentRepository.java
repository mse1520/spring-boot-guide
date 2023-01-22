package kyh.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import kyh.api.domain.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
