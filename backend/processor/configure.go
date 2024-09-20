package processor

import (
	"net/http"

	"github.com/gorilla/mux"
)

func ConfigureRoutes(router *mux.Router) {
	router.HandleFunc("/healthz", healthCheck).Methods("GET")
}

func healthCheck(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("OK"))
}
