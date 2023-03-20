# Spring Boot
최소한의 구성으로 스프링프레임워크 어플리케이션을 구성할 수 있는 별도의 프레임워크입니다.

## 프로젝트 생성방법
다음의 사이트에서 부트 프로젝트를 생상합니다. ([https://start.spring.io/](https://start.spring.io/))

## Gradle
gradle은 `빌드 자동화 툴`이고 각종 명령어를 통해 빌드할 수 있습니다

gradlew는 gradle을 설치하지 않고 명령어를 실행하며 프로젝트를 만든 시점의 gradle버전이 유지되기에 gradlew를 사용해야 합니다
- `./gradlew bootRun`: 프로젝트 실행
- `./gradlew build`: 프로젝트 빌드
- `./gradlew jar`: 프로젝트 패키징
- `./gradlew clean`: 빌드파일을 초기화 합니다
- `./gradlew dependencies`: 설치된 패키지 정보를 보여줍니다

## 의존성

#### 웹어플리케이션을 쉽게 만들 수 있도록 도와주는 패키지
- `org.springframework.boot:spring-boot-starter-web`

#### 스프링 공식 탬플릿엔진
- `org.springframework.boot:spring-boot-starter-thymeleaf`

#### 유효성 검사를 도와주는 패키지
- `org.springframework.boot:spring-boot-starter-validation`

#### 단순 반복되는 코드를 쉽게 줄이도록 도와주는 패키지
- `org.projectlombok:lombok`

#### 개발 편의를 위한 패키지
- `org.springframework.boot:spring-boot-devtools`

#### 보안관련 기술을 쉽게 적용할 수 있도록 도와주는 패키지
- `org.springframework.boot:spring-boot-starter-security`

#### 데이터베이스 드라이버 패키지
- `org.postgresql:postgresql`

#### 데이터를 쉽게 다룰 수 있도록 도와주는 패키지(JPA, Mybatis)
- `org.springframework.boot:spring-boot-starter-data-jpa`
- `org.mybatis.spring.boot:mybatis-spring-boot-starter:3.0.0`

### 테스트 코드를 작성하기위한 패키지
- `org.springframework.boot:spring-boot-starter-test`
- `org.springframework.security:spring-security-test`

#### 쿼리를 좀더 유연하고 안정성있는 자바코드로 사용할 수 있도록 도와주는 패키지
- `com.querydsl:querydsl-jpa`
- `com.querydsl:querydsl-apt`

## 웹 애플리케이션 계층구조
- `controller`: http 요청과 응답을 담당
- `service`: 핵심 비즈니스 로직
- `domain`: 비즈니스 객체
- `repository`: 데이터베이스에 점근

## `Mybatis`와 `Spring Data JPA`의 특징
`Mybatis`는 SQL을 별도(xml)의 파일로 분리하여 코드를 작성하여 자바소스와 맵핑하며
별도의 패러다임을 배우지 않고도 쉽게 적용할 수 있고, 동적인 쿼리작성이 편하다는 장점이 있습니다.  
다만, 일일히 작성해야하는 단순 반복적인 코드가 많고 SQL 쿼리문을 문자열로 작성하다보니 에디터의 자동완성 등의 기술 지원을 받기 어려우며, 컴파일 시점에 코드의 에러를 찾기 어렵습니다.

`Spring Data JPA`의 경우 별도의 패러다임과 사용법을 학습해야하는 단점이 존재하나, 불필요한 반복적인 코드 작성이 줄고, QueryDSL과 사용시 컴파일 시점에서 대부분의 에러를 차단할 수 있는 장점이 있습니다.