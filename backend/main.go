package main

import (
	"crypto/tls"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"

	"nmatute.com/web-nmatute-backend/processor"
)

var port string = "80"
var dataPath string = "/app/data/data.yaml"

func init() {
	var err error
	godotenv.Load()
	http.
		DefaultTransport.(*http.Transport).
		TLSClientConfig = &tls.Config{InsecureSkipVerify: true}

	customDataPath := os.Getenv("DATA_PATH")
	if customDataPath != "" {
		dataPath = customDataPath
	}

	customPort := os.Getenv("PORT")
	if customPort != "" {
		port = customPort
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
		Addr:    fmt.Sprintf(":%s", port),
		Handler: handlers.CompressHandler(protectedRouter),
	}
	log.Println(fmt.Sprintf("*** UP at %s ***", port))
	log.Fatal(svc.ListenAndServe())
}
