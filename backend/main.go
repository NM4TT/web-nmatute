package main

import (
	"crypto/tls"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"

	"nmatute.com/web-nmatute-backend/processor"
)

var port string = "80"
var dataPath string = "/app/data/data.yaml"

func init() {
	godotenv.Load()
	http.
		DefaultTransport.(*http.Transport).
		TLSClientConfig = &tls.Config{InsecureSkipVerify: true}
}

func refreshData() {
	var err error
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

	customDataPath := os.Getenv("DATA_PATH")
	if customDataPath != "" {
		dataPath = customDataPath
	}

	customPort := os.Getenv("PORT")
	if customPort != "" {
		port = customPort
	}

	svc := &http.Server{
		Addr:    fmt.Sprintf(":%s", port),
		Handler: handlers.CompressHandler(protectedRouter),
	}
	log.Printf("\n*** UP at %s ***\n", port)
	log.Fatal(svc.ListenAndServe())

	ticker := time.NewTicker(5 * time.Minute)
	defer ticker.Stop()

	refreshData()
	for range ticker.C {
		refreshData()
	}
}
