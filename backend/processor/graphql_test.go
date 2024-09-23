package processor_test

import (
	"path/filepath"
	"testing"

	"github.com/stretchr/testify/assert"
	"nmatute.com/web-nmatute-backend/graph"
	"nmatute.com/web-nmatute-backend/processor"
)

const graphql_testPackage = "./testing/graphql"

func TestParseDataToSchema(t *testing.T) {
	filePath := filepath.Join(graphql_testPackage, "data.yaml")
	data, loadErr := processor.LoadData(filePath)
	assert.NoError(t, loadErr)
	assert.NotEmpty(t, data)
	processor.MyData = data

	parseErr := processor.ParseDataToSchema()
	assert.NoError(t, parseErr)
	assert.Equal(t, 2, len(graph.DataSections[3].Items[0].Keywords)) //2 languages
}
