package kyh.api.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class Board extends BaseEntity {

  @Id
  @GeneratedValue
  @Column(name = "board_id")
  private Long id;

  private String tiltle;

  private String content;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;

}