package processor_test

import (
	"path/filepath"
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
	"nmatute.com/web-nmatute-backend/processor"
)

const testPackage = "./testing/util"

func TestLoadData(t *testing.T) {
	filePath := filepath.Join(testPackage, "valid-data.yaml")
	invalidFilePath := filepath.Join(testPackage, "invalid-data.yaml")
	var data []processor.Data
	_, emptyErr := processor.LoadData("")
	assert.Error(t, emptyErr)
	_, readErr := processor.LoadData("invalid/path/data.yaml")
	assert.Error(t, readErr)
	_, parseErr := processor.LoadData(invalidFilePath)
	assert.Error(t, parseErr)
	data, err := processor.LoadData(filePath)
	assert.NoError(t, err)

	//validate data
	assert.Equal(t, "education", strings.ToLower(data[0].Name))
	assert.Equal(t, 2, len(data[0].Items))
	assert.Equal(t, "Universidad Tecnologica de Panama (UTP)", data[0].Items[0]["name"])
	assert.Equal(t, "www.example.com", data[0].Items[1]["url"])

}

func TestUnixToMonthYear(t *testing.T) {
	// Test cases with known outputs
	testCases := []struct {
		input    int64
		expected string
	}{
		{1577876400, "January 2020"},  // Unix timestamp for Jan 1, 2020
		{1609498800, "January 2021"},  // Unix timestamp for Jan 1, 2021
		{1643713200, "February 2022"}, // Unix timestamp for Feb 1, 2022
		{1667300400, "November 2022"}, // Unix timestamp for Nov 1, 2022
		{1709290800, "March 2024"},    // Unix timestamp for Mar 1, 2024
	}

	for _, tc := range testCases {
		t.Run(tc.expected, func(t *testing.T) {
			result := processor.UnixToShortDate(tc.input)
			assert.Equal(t, tc.expected, result)
		})
	}
}

func TestCalculateDateDifference(t *testing.T) {
	testCases := []struct {
		start    int64
		end      int64
		expected string
	}{
		{1609498800, 1612177200, "1 month"},  // Jan 1, 2021 to Feb 1, 2021
		{1609498800, 1614596400, "2 months"}, // Jan 1, 2021 to Mar 1, 2021
		{1609498800, 1625137200, "6 months"}, // Jan 1, 2021 to Jul 1, 2021
		{1609498800, 1641034800, "1 year"},   // Jan 1, 2021 to Jan 1, 2022
		{1609498800, 1767265200, "5 years"},  // Jan 1, 2021 to Jan 1, 2026
		{1609498800, 1609498800, ""},         // Same date
	}

	for _, tc := range testCases {
		t.Run(tc.expected, func(t *testing.T) {
			result := processor.CalculateDateDifference(tc.start, tc.end)
			assert.Equal(t, tc.expected, result)
		})
	}
}
