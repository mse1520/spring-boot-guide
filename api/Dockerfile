FROM eclipse-temurin:17
WORKDIR /app
COPY . /app
RUN chmod a+x gradlew
CMD ./gradlew build && java -jar build/libs/api-1.0.0.jar