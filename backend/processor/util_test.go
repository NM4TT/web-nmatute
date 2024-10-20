package processor_test

import (
	"path/filepath"
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
	"nmatute.com/web-nmatute-backend/processor"
)

const util_testPackage = "./testing/util"

func TestLoadData(t *testing.T) {
	filePath := filepath.Join(util_testPackage, "valid-data.yaml")
	invalidFilePath := filepath.Join(util_testPackage, "invalid-data.yaml")
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

func TestAssertType(t *testing.T) {
	tests := []struct {
		input          interface{}
		expectedResult string
		expectedNumber int
		expectedList   []string
		expectedBool   bool
	}{
		{
			input:          "hello",
			expectedResult: "hello",
			expectedNumber: 0,
			expectedList:   nil,
			expectedBool:   true,
		},
		{
			input:          42,
			expectedResult: "",
			expectedNumber: 42,
			expectedList:   nil,
			expectedBool:   true,
		},
		{
			input:          []interface{}{"item1", "item2", "item3"},
			expectedResult: "",
			expectedNumber: 0,
			expectedList:   []string{"item1", "item2", "item3"},
			expectedBool:   true,
		},
	}

	for _, tt := range tests {
		t.Run("", func(t *testing.T) {
			result, number, list, _ := processor.AssertType(tt.input)
			assert.Equal(t, tt.expectedResult, result)
			assert.Equal(t, tt.expectedNumber, number)
			assert.Equal(t, tt.expectedList, list)
		})
	}
}
