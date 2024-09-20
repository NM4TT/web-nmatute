package processor

import (
	"fmt"
	"os"

	"gopkg.in/yaml.v3"
)

func LoadData(filePath string) error {
	if filePath == "" {
		return fmt.Errorf("error: LoadData,\tfilePath empty")
	}

	b, err := os.ReadFile(filePath)
	if err != nil {
		return fmt.Errorf("error: LoadData,\tfailed to read file: %w", err)
	}

	err = yaml.Unmarshal(b, MyStuff)
	if err != nil {
		return fmt.Errorf("error: LoadData,\tfailed to unmarshal YAML: %w", err)
	}

	return nil
}
