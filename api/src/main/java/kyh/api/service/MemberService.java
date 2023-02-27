package kyh.api.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kyh.api.domain.dto.common.DataBox;
import kyh.api.domain.dto.common.DataBoxType;
import kyh.api.domain.dto.member.MemberInfo;
import kyh.api.domain.dto.member.SignUpForm;
import kyh.api.domain.entity.Authority;
import kyh.api.domain.entity.Member;
import kyh.api.domain.type.MemberRole;
import kyh.api.repository.AuthorityRepository;
import kyh.api.repository.MemberQueryRepository;
import kyh.api.repository.MemberRepository;
import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService implements UserDetailsService {

  private final AuthorityRepository authorityRepository;
  private final MemberRepository memberRepository;
  private final MemberQueryRepository memberQueryRepository;
  private final PasswordEncoder passwordEncoder;

  /** 회원 정보 */
  public MemberInfo info(MemberInfo memberInfo) {
    if (memberInfo == null) {
      Authority auth = authorityRepository.findWithMenuByRole(MemberRole.USER).orElseThrow();
      memberInfo = MemberInfo.create(auth);
    }
    return memberInfo;
  }

  /** 회원 가입 */
  @Transactional
  public DataBox<MemberInfo> signUp(SignUpForm form) {
    if (memberRepository.findByUsername(form.getUsername()).orElse(null) != null)
      return new DataBox<>(DataBoxType.FAILURE, "이미 존재하는 회원입니다.\n다른 아이디를 사용해주세요.");

    Authority auth = authorityRepository.findByRole(MemberRole.USER).orElseThrow();
    Member member = new Member(form.getUsername(), passwordEncoder.encode(form.getPassword()), auth);
    Member savedMember = memberRepository.save(member);
    MemberInfo memberInfo = MemberInfo.create(savedMember);

    return new DataBox<>(DataBoxType.SUCCESS, "회원가입에 성공하였습니다.", memberInfo);
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Member member = memberQueryRepository.findWithMenuByUsername(username);
    if (member == null)
      throw new UsernameNotFoundException("아이디를 찾을 수 없습니다.");
    // .orElseThrow(() -> new UsernameNotFoundException("아이디를 찾을 수 없습니다."));
    return MemberInfo.create(member);
  }

}
