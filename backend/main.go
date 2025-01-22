package main

import (
	"crypto/tls"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"

	"nmatute.com/web-nmatute-backend/processor"
)

var (
	port          string = "80"
	dataPath      string = "/app/data/data.yaml"
	origin        string = "nmatute.com"
	originMethods string = "GET"
	originHeaders string = "Accept, Content-Type"
)

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
	customOrigin := os.Getenv("ORIGIN")
	customOriginMethods := os.Getenv("ORIGIN_METHODS")
	customOriginHeaders := os.Getenv("ORIGIN_HEADERS")
	if customOrigin != "" {
		origin = customOrigin
	}
	if customOriginMethods != "" {
		originMethods = strings.ToUpper(customOriginMethods)
	}
	if customOriginHeaders != "" {
		originHeaders = customOriginHeaders
	}
}

func main() {
	processor.ORIGIN = origin
	processor.ORIGIN_HEADERS = originHeaders
	processor.ORIGIN_METHODS = originMethods

	router := mux.NewRouter()
	processor.ConfigureRoutes(router)

	svc := &http.Server{
		Addr:    fmt.Sprintf(":%s", port),
		Handler: processor.AddCors(handlers.CompressHandler(router)),
	}
	log.Printf("ORIGIN: %s", origin)
	log.Printf("ORIGIN_METHODS: %s", originMethods)
	log.Printf("ORIGIN_HEADERS: %s", originHeaders)
	log.Printf("*** UP at %s ***", port)
	log.Fatal(svc.ListenAndServe())
}
