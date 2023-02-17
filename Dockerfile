FROM openjdk:8-jdk-alpine
ENV MYSQL_HOST=mysqldb
VOLUME /tmp
# ARG JAR_FILE
COPY ./target/*.jar app.jar
ENTRYPOINT ["java","-Dspring.profiles.active=dockerembbed,oauth-security","-jar","/app.jar"]