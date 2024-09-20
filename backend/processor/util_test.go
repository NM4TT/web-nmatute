package processor_test

import (
	"os"
	"path/filepath"
	"testing"

	"github.com/stretchr/testify/assert"
)

const testPackage = "./testing/util"

func TestLoadConfig(t *testing.T) {
	filePath := filepath.Join(testPackage, "data.yaml")
	b, readErr := os.ReadFile(filePath)
	assert.NoError(t, readErr)
	assert.NotEmpty(t, b)
}
