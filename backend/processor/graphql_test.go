package processor_test

import (
	"path/filepath"
	"testing"

	"github.com/stretchr/testify/assert"
	"nmatute.com/web-nmatute-backend/graph"
	"nmatute.com/web-nmatute-backend/graph/model"
	"nmatute.com/web-nmatute-backend/processor"
)

const graphql_testPackage = "./testing/graphql"

func TestParseDataToSchema(t *testing.T) {
	sectionMap := make(map[string]model.DataSection)
	filePath := filepath.Join(graphql_testPackage, "data.yaml")
	data, loadErr := processor.LoadData(filePath)
	assert.NoError(t, loadErr)
	assert.NotEmpty(t, data)
	processor.MyData = data

	parseErr := processor.ParseDataToSchema()
	assert.NoError(t, parseErr)

	for _, section := range graph.DataSections {
		sectionMap[section.Name] = section
	}

	assert.Equal(t, 2, len(sectionMap["languages"].Items[0].Keywords)) //2 languages
}
