FROM golang:1.18-alpine

WORKDIR /app

COPY go.mod .

COPY go.sum .

RUN go mod download

COPY . .

ENV DOMAIN 0.0.0.0
ENV DBHOST host.docker.internal
ENV DBPORT 5432
ENV DBNAME tokens
ENV DBUSER root
ENV DBPASS password

EXPOSE 8080

CMD ["go", "run", "server.go"]
