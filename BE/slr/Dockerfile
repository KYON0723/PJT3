# FROM openjdk:11
# ARG JAR_FILE=*.jar
# COPY ${JAR_FILE} app.jar
# ENTRYPOINT ["java","-jar","/app.jar"]

FROM adoptopenjdk/openjdk11
ENV JAR_FILE=build/libs/slr-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
# ENTRYPOINT ["java","-jar","-Dspring.profiles.active=alpha app.jar"]


# FROM eclipse-temurin:17-jdk-alpine
# EXPOSE 8081
# VOLUME /tmp
# ARG JAR_FILE
# COPY ${JAR_FILE} app.jar
# ENTRYPOINT ["java","-jar","/app.jar"]

# FROM 
# FROM adoptopenjdk/openjdk11
# EXPOSE 8081
# VOLUME /tmp
# ARG JAR_FILE=target/*.jar
# COPY ${JAR_FILE} app.jar
# ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]

# FROM openjdk:18-ea-jdk-slim
# WORKDIR /var/jenkins_home/workspace/test/BE/slr/build/libs
# # VOLUME /tmp
# ARG JAR_FILE=./build/libs/*.jar
# COPY build/libs/slr-0.0.1-SNAPSHOT.jar app.jar
# ENTRYPOINT ["java","-jar","app.jar"]

# FROM openjdk:latest
# ARG 8081
# EXPOSE ${8081}
# COPY ./target/slr-0.0.1-SNAPSHOT.jar /usr/slr-0.0.1-SNAPSHOT.jar
# RUN chmod +x /usr/slr-0.0.1-SNAPSHOT.jar
# ENV slr 'Hello, slr !'
# WORKDIR /usr
# ENTRYPOINT ["java", "-jar", "slr-0.0.1-SNAPSHOT.jar"]