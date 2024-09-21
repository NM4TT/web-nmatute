package processor_test

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gorilla/mux"
	"github.com/stretchr/testify/assert"
	"nmatute.com/web-nmatute-backend/processor"
)

func TestHealthCheck(t *testing.T) {
	// Create a new router
	router := mux.NewRouter()
	processor.ConfigureRoutes(router)

	// Create a new request to the health check endpoint
	req, err := http.NewRequest("GET", "/healthz", nil)
	assert.NoError(t, err)

	// Create a response recorder to capture the response
	rr := httptest.NewRecorder()

	// Serve the request
	router.ServeHTTP(rr, req)

	// Check the status code
	assert.Equal(t, http.StatusOK, rr.Code)

	// Check the response body
	assert.Equal(t, "OK", rr.Body.String())
}
