package kyh.api.domain.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Menu extends BaseEntity {

    @Id
    @GeneratedValue
    @Column(name = "menu_id")
    private Long id;

    @Column(unique = true, nullable = false)
    private String path;

    @Column(nullable = false)
    private String text;

    @Column(nullable = false)
    private Long seq;

    public Menu(String path, String text, long seq) {
        this.path = path;
        this.text = text;
        this.seq = seq;
    }

    public void changeTextAndSeq(String text, long seq) {
        this.text = text;
        this.seq = seq;
    }

}
