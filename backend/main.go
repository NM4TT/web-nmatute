package main

import (
	"crypto/tls"
	"log"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"

	"nmatute.com/web-nmatute-backend/processor"
)

func init() {
	var err error
	http.
		DefaultTransport.(*http.Transport).
		TLSClientConfig = &tls.Config{InsecureSkipVerify: true}
	processor.MyData, err = processor.LoadData("/data/data.yaml")
	if err != nil {
		log.Fatal(err)
	}
}

func main() {
	router := mux.NewRouter()

	processor.ConfigureRoutes(router)
	svc := &http.Server{
		Addr:    "8080",
		Handler: handlers.CompressHandler(router),
	}
	log.Println("server up...")
	log.Fatal(svc.ListenAndServe())
}
