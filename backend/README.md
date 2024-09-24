Had to run these to run generate command:

go run github.com/99designs/gqlgen init

printf '// +build tools\npackage tools\nimport (_ "github.com/99designs/gqlgen"\n _ "github.com/99designs/gqlgen/graphql/introspection")' | gofmt > tools.go

go run github.com/99designs/gqlgen generate


useful links

https://www.unixtimestamp.com/