package processor

import (
	"net/http"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/gorilla/mux"
	"nmatute.com/web-nmatute-backend/graph"
)

var (
	ORIGIN         string
	ORIGIN_METHODS string
	ORIGIN_HEADERS string
)

func ConfigureRoutes(router *mux.Router) {
	router.HandleFunc("/liveness", livenessCheck).Methods("GET")
	router.HandleFunc("/readiness", readinessCheck).Methods("GET")
	//router.HandleFunc("/contact", handleContact).Methods("POST")

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

func AddCors(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", ORIGIN)
		w.Header().Set("Access-Control-Allow-Methods", ORIGIN_METHODS)
		w.Header().Set("Access-Control-Allow-Headers", ORIGIN_HEADERS)
		next.ServeHTTP(w, r)
	})
}

/*func handleContact(w http.ResponseWriter, r *http.Request) {
	var mailReq MailRequest
	err := json.NewDecoder(r.Body).Decode(&mailReq)
	if err != nil {
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}

	err = SendMail(mailReq.Sender)
	if err != nil {
		log.Println(err.Error())
		http.Error(w, "Failed to send email", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Email sent successfully"))
}*/
