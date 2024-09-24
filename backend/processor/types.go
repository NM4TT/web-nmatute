package processor

type Data struct {
	Name  string                   `yaml:"section"`
	Items []map[string]interface{} `yaml:"items"`
}

type MailRequest struct {
	Sender  string `json:"sender"`
	Subject string `json:"subject"`
	Message string `json:"message"`
}

var MyData []Data

// string consts
const (
	CURRENTLY_STATUS = "Currently"
)
