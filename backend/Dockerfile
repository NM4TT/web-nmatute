FROM golang:alpine AS builder
RUN apk add --no-cache git build-base; \
    adduser --system dummy -G root --system /bin/bash
WORKDIR /app

COPY go.mod go.sum main.go ./
COPY gqlgen.yml tools.go ./
COPY processor ./processor
COPY graph ./graph

ARG PORT
ENV PORT=${PORT}

RUN CGO_ENABLED=0 go build -v -o sillyapp; \
    go mod tidy && \
    go test -v ./...

FROM scratch
COPY --from=builder /etc/passwd /etc/passwd
COPY --from=builder /app/sillyapp /bin/sillyapp

USER dummy

ENTRYPOINT ["/bin/sillyapp"]