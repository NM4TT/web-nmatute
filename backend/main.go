package main

import (
	"crypto/tls"
	"log"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"

	"nmatute.com/web-nmatute-backend/processor"
)

var dataPath string = "/data/data.yaml"

func init() {
	var err error
	http.
		DefaultTransport.(*http.Transport).
		TLSClientConfig = &tls.Config{InsecureSkipVerify: true}

	debugPath := processor.CheckDebugVariable("DEBUG_DATAPATH")
	if debugPath != "" {
		dataPath = debugPath
	}

	processor.MyData, err = processor.LoadData(dataPath)
	if err != nil {
		log.Fatal(err)
	}
	err = processor.ParseDataToSchema()
	if err != nil {
		log.Fatal(err)
	}
}

func main() {
	router := mux.NewRouter()

	processor.ConfigureRoutes(router)

	svc := &http.Server{
		Addr:    ":8080",
		Handler: handlers.CompressHandler(router),
	}
	log.Println("*** UP ***")
	log.Fatal(svc.ListenAndServe())
}
