FROM golang:1.22-alpine AS builder 

WORKDIR /app

COPY ./hello-world.go .

RUN go build hello-world.go

FROM scratch
WORKDIR /app
COPY --from=builder /app/hello-world .
CMD [ "./hello-world" ]