package kyh.api.domain.dto.comment;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class CommentListForm {

    @PositiveOrZero
    @NotNull
    private Long boardId;

    @PositiveOrZero
    @NotNull
    private Integer page;

}
