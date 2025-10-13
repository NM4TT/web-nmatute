package main

import (
	"crypto/tls"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"

	"nmatute.com/web-nmatute-backend/processor"
)

var (
	port     = "80"
	dataPath = "/etc/app/data.yaml"
)

func init() {
	godotenv.Load()

	http.DefaultTransport.(*http.Transport).TLSClientConfig = &tls.Config{InsecureSkipVerify: true}

	if v := os.Getenv("DATA_PATH"); v != "" {
		dataPath = v
	}
	if v := os.Getenv("PORT"); v != "" {
		port = v
	}

	var err error
	processor.MyData, err = processor.LoadData(dataPath)
	if err != nil {
		log.Fatal(err)
	}
	if err = processor.ParseDataToSchema(); err != nil {
		log.Fatal(err)
	}
}

func main() {
	router := mux.NewRouter()
	processor.ConfigureRoutes(router)

	// Middlewares: compression -> router
	var h http.Handler = router
	h = handlers.CompressHandler(h)

	srv := &http.Server{
		Addr:              ":" + port,
		Handler:           h,
		ReadHeaderTimeout: 5 * time.Second,
		IdleTimeout:       60 * time.Second,
	}

	log.Printf("PORT=%s", port)
	log.Printf("DATA_PATH=%s", dataPath)
	log.Printf("*** UP at :%s ***", port)

	if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		log.Fatal(err)
	}
}
