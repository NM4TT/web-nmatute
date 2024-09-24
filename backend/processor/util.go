package processor

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gopkg.in/yaml.v3"
)

func LoadData(filePath string) ([]Data, error) {
	if filePath == "" {
		return []Data{}, fmt.Errorf("error: LoadData,\tfilePath empty")
	}

	b, err := os.ReadFile(filePath)
	if err != nil {
		return []Data{}, fmt.Errorf("error: LoadData,\tfailed to read file: %w", err)
	}

	var output []Data
	err = yaml.Unmarshal(b, &output)
	if err != nil {
		return []Data{}, fmt.Errorf("error: LoadData,\tfailed to unmarshal YAML: %w", err)
	}

	return output, nil
}

func CheckDebugVariable(name string) string {
	godotenv.Load()
	return os.Getenv(name)
}

func AssertType(value interface{}) (string, int, []string, bool) {
	switch v := value.(type) {
	case string:
		return v, 0, nil, true
	case int:
		return "", v, nil, true
	case []interface{}:
		list := make([]string, 0)
		for _, val := range v {
			switch x := val.(type) {
			case string:
				list = append(list, x)
			default:
				log.Fatalf("unable to parse item %v", val)
			}
		}
		return "", 0, list, true
	default:
		log.Fatalf("unable to parse %v", value)
	}
	return "", 0, nil, false
}
