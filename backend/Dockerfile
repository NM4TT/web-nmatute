FROM golang:alpine AS builder
RUN apk add --no-cache git build-base
RUN adduser --system dummy -G root --system /bin/bash
WORKDIR /app

COPY ./processor ./processor
COPY ./graph ./graph
COPY ./go.mod ./go.mod
COPY ./go.sum ./go.sum
COPY ./gqlgen.yml ./gqlgen.yml
COPY ./tools.go ./tools.go
COPY ./main.go ./main.go

RUN go mod tidy
RUN go mod download && go test -v ./...
RUN CGO_ENABLED=0 go build -v -o sillyapp

FROM scratch
COPY --from=builder /etc/passwd /etc/passwd
COPY --from=builder /app/sillyapp /bin/sillyapp

USER dummy
EXPOSE 80
ENTRYPOINT ["/bin/sillyapp"]