package processor

type Data struct {
	Name  string                   `yaml:"section"`
	Items []map[string]interface{} `yaml:"items"`
}

var MyData []Data

// string consts
const (
	CURRENTLY_STATUS = "Currently"
)
