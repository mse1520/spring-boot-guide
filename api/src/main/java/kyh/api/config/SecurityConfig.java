package kyh.api.config;

import java.io.IOException;
import java.net.URLEncoder;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kyh.api.domain.type.UserRole;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    String unAuthMessage = URLEncoder.encode("인증되지 않은 사용자입니다.", "UTF-8");
    String accessDeniedMessage = URLEncoder.encode("접근 권한이 없습니다.", "UTF-8");

    return http
        .csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/comment/write", "/comment/info/*").authenticated()
            .requestMatchers(HttpMethod.POST, "/board/write", "/board/info/**").hasAnyRole(
                UserRole.SUPER.getValue(),
                UserRole.ADMIN.getValue())
            .anyRequest().permitAll())
        .exceptionHandling(exception -> exception
            .authenticationEntryPoint((request, response, authException) -> response
                .sendRedirect(request.getContextPath() + "/user/error?message=" + unAuthMessage))
            .accessDeniedHandler((request, response, accessDeniedException) -> response
                .sendRedirect(request.getContextPath() + "/user/error?message=" + accessDeniedMessage)))
        .formLogin(form -> form
            .loginProcessingUrl("/user/sign-in")
            .defaultSuccessUrl("/user/sign-in")
            .failureHandler(new CustomAuthFailureHandler()))
        .logout(logout -> logout
            .logoutUrl("/user/sign-out")
            .logoutSuccessUrl("/user/info")
            .deleteCookies("JSESSIONID"))
        .build();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return PasswordEncoderFactories.createDelegatingPasswordEncoder();
  }

  private static class CustomAuthFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
        AuthenticationException exception) throws IOException, ServletException {
      String errorMessage = "";

      if (exception instanceof UsernameNotFoundException)
        errorMessage = exception.getMessage();
      else if (exception instanceof BadCredentialsException)
        errorMessage = "회원 인증에 실패하였습니다.";
      else
        errorMessage = "알 수 없는 이유로 회원 인증에 실패하였습니다.";

      errorMessage = URLEncoder.encode(errorMessage, "UTF-8");
      setDefaultFailureUrl("/user/error?message=" + errorMessage);

      super.onAuthenticationFailure(request, response, exception);
    }

  }

}