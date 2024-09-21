package processor

import (
	"fmt"
	"os"
	"time"

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

func UnixToShortDate(unixTime int64) string {
	t := time.Unix(unixTime, 0)
	return fmt.Sprintf("%s %d", t.Month().String(), t.Year())
}

func CalculateDateDifference(unixTimeA, unixTimeB int64) string {
	start := time.Unix(unixTimeA, 0)
	end := time.Unix(unixTimeB, 0)

	if start.After(end) {
		start, end = end, start // Ensure start is before end
	}

	years := end.Year() - start.Year()
	months := int(end.Month()) - int(start.Month())

	// Adjust the month difference based on year difference
	if months < 0 {
		years--
		months += 12
	}

	// If the difference is less than a month, return an empty string
	if years == 0 && months == 0 {
		return ""
	}

	result := ""
	if years > 0 {
		result += fmt.Sprintf("%d year%s", years, pluralize(years))
	}
	if months > 0 {
		if result != "" {
			result += ", "
		}
		result += fmt.Sprintf("%d month%s", months, pluralize(months))
	}

	return result
}

func pluralize(count int) string {
	if count == 1 {
		return ""
	}
	return "s"
}
