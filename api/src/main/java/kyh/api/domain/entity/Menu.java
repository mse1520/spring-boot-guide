package kyh.api.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
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

    @Column
    private String imgPath;

    @Column(nullable = false)
    private Long seq;

    public Menu(String path, String text, String imgPath, long seq) {
        this.path = path;
        this.text = text;
        this.imgPath = imgPath;
        this.seq = seq;
    }

    public void changeData(String text, String imgPath, long seq) {
        this.text = text;
        this.imgPath = imgPath;
        this.seq = seq;
    }

}
