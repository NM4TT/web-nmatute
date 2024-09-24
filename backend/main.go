package main

import (
	"crypto/tls"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"

	"nmatute.com/web-nmatute-backend/processor"
)

var dataPath string = "/data/data.yaml"

func init() {
	var err error
	godotenv.Load()
	http.
		DefaultTransport.(*http.Transport).
		TLSClientConfig = &tls.Config{InsecureSkipVerify: true}

	debugPath := os.Getenv("DATA_PATH")
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
	protectedRouter := processor.ConfigureCors(router)

	svc := &http.Server{
		Addr:    ":8080",
		Handler: handlers.CompressHandler(protectedRouter),
	}
	log.Println("*** UP ***")
	log.Fatal(svc.ListenAndServe())
}
