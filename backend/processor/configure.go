package processor

import (
	"log"
	"net/http"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"nmatute.com/web-nmatute-backend/graph"
)

func ConfigureRoutes(router *mux.Router) {
	router.HandleFunc("/liveness", livenessCheck).Methods("GET")
	router.HandleFunc("/readiness", readinessCheck).Methods("GET")

	//graphql
	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{}}))
	router.Handle("/graphql", playground.Handler("GraphQL playground", "/query"))
	router.Handle("/query", srv)
}

func livenessCheck(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("OK"))
}

func readinessCheck(w http.ResponseWriter, r *http.Request) {
	if len(graph.DataSections) == 0 {
		w.WriteHeader(http.StatusServiceUnavailable)
		w.Write([]byte("Data issue"))
	}
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("OK"))
}

func ConfigureCors(router *mux.Router) http.Handler {
	corsOrigin := "nmatute.com"
	debugOrigin := CheckDebugVariable("DEBUG_ORIGIN")
	if debugOrigin != "" {
		corsOrigin = debugOrigin
	}
	corsHandler := cors.New(cors.Options{
		AllowedOrigins: []string{corsOrigin},
		AllowedMethods: []string{"GET"},
		//AllowedHeaders:   []string{"Content-Type", "Authorization"},
		//AllowCredentials: true,
		//Debug:            true,
	})
	log.Printf("\nORIGIN %s\n", corsOrigin)
	return corsHandler.Handler(router)
}
